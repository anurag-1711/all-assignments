import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const user_token = localStorage.getItem("user-token");
    const res = await fetch("http://localhost:3000/users/courses", {
      method: "GET",
      headers: {
        authorization: `Bearer ${user_token}`,
      },
    });

    const data = await res.json();
    console.log(data);
    setCourses(data.courses);
  };

  return (
    <div>
      <h2>Courses Page</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {courses.map((course) => (
          <Link key={course._id} to={`${course._id}`}>
            <h3>{course.title}</h3>
            <h4>{course.description}</h4>
            <h4>{course.price}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
