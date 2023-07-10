import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function ShowCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/admin/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCourses(data.courses);
  };

  // Add code to fetch courses from the server
  // and set it in the courses state variable.

  if (!courses.length) {
    return;
  }

  return (
    <div>
      <Typography
        variant="h4"
        component="div"
        style={{
          textAlign: "center",
        }}
      >
        Courses
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {courses.map((c) => (
          <Link to={`/course/${c._id}`} key={c._id} style={{ margin: "20px" }}>
            <Course {...c} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function Course({ title, description, price }) {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://source.unsplash.com/random"
            alt="Course"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default ShowCourses;
