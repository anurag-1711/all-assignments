import React from "react";
import { useEffect, useState } from "react";

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const user_token = localStorage.getItem("user-token");
    const res = await fetch("http://localhost:3000/users/purchasedCourses", {
      method: "GET",
      headers: {
        authorization: `Bearer ${user_token}`,
      },
    });

    const data = await res.json();
    setCourses(data.purchasedCourses);
    console.log(courses);
  };

  if (!courses) {
    return;
  }

  return (
    <div>
      <h2>Purchased Courses</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {courses.map((course) => (
          <div key={course._id}>
            <h3>{course.title}</h3>
            <h4>{course.description}</h4>
            <h4>{course.price}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedCourses;
