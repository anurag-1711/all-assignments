import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Landing from "./components/Landing";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import ShowCourses from "./components/ShowCourses";
import CoursePage from "./components/CoursePage";
import Navbar from "./components/Navbar";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  return (
    <div
      style={{
        // width: "100vw",
        height: "100vh",
        backgroundColor: "lavender",
      }}
    >
      <RecoilRoot>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<CreateCourse />} />
            <Route path="/courses" element={<ShowCourses />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
