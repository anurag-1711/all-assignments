const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SECRET_KEY = 'SECRET_KEY';

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageLink: { type: String },
  published: { type: Boolean, default: false }
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

const authenticateJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, SECRET_KEY);
      if (payload) {
        req.user = payload;
        return next();
      } else {
        return res.status(403).json({ message: 'Invalid token' });
      }
    }
    return res.status(401).json({ message: 'Unauthorized' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Authentication failed", name: error.name, explanation: error.message });
  }
};


mongoose.connect('mongodb+srv://anurag:anurag@cluster0.spqvxyc.mongodb.net/course-selling-app',
  { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
  .once('open', () => console.log("MongoDb connected successfully"))
  .on('error', () => console.log("MongoDB connection failed"))


app.post('/admin/signup', async (req, res) => {
  try {
    const admin = await Admin.findOne(req.body);
    if (admin) {
      return res.status(403).json({ message: 'Admin already exists' });
    }

    const newAdmin = await Admin.create(req.body);
    const token = jwt.sign({ username: newAdmin.username, role: 'Admin' }, SECRET_KEY, { expiresIn: '1d' });

    res.json({ message: 'Admin created successfully', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup failed", name: error.name, explanation: error.message });
  }
});

app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username: admin.username, role: 'Admin' }, SECRET_KEY, { expiresIn: '1d' });
      return res.json({ message: 'Logged in successfully', token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed", name: error.name, explanation: error.explanation });
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(403).json({ message: 'Admin not found' });
    }

    const course = await Course.create(req.body);
    return res.json({ message: 'Course created successfully', courseId: course.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Course creation failed", name: error.name, explanation: error.message });
  }
});

app.get('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(403).json({ message: 'Admin not found' });
    }

    const course = await Course.findOne({ _id: req.params.courseId });
    if (course) {
      return res.json(course);
    }

    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Course retrieval failed", name: error.name, explanation: error.message });
  }
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(403).json({ message: 'Admin not found' });
    }

    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      return res.json({ message: 'Course updated successfully' });
    }

    return res.status(404).json({ message: 'Course not found' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Course updation failed", name: error.name, explanation: error.message });
  }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      return res.status(403).json({ message: 'Admin not found' });
    }

    const courses = await Course.find();
    return res.json({ courses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Course updation failed" });
  }
});

// User routes
app.post('/users/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET_KEY, { expiresIn: '1d' });
    return res.json({ message: 'User created successfully', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup failed", name: error.name, explanation: error.message });
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET_KEY, { expiresIn: '1d' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed", name: error.name, explanation: error.explanation });
  }
});

app.get('/users/courses', authenticateJwt, async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Courses retrieval failed", name: error.name, explanation: error.message });
  }
});

app.get('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Course retrieval failed", name: error.name, explanation: error.message });
  }
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    user.purchasedCourses.push(course);
    await user.save();

    return res.json({ message: 'Course purchased successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Course purchase failed", name: error.name, explanation: error.message });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    // console.log(user); 
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    return res.json({ purchasedCourses: user.purchasedCourses || [] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Purchased courses retrieval failed", name: error.name, explanation: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
