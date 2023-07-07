import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    const user_token = localStorage.getItem("user-token");
    const res = await fetch(`http://localhost:3000/users/courses/${courseId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${user_token}`,
      },
    });

    const data = await res.json();
    setCourse(data);
    console.log(data);
  };

  const handlePurchase = async () => {
    const user_token = localStorage.getItem("user-token");
    const res = await fetch(`http://localhost:3000/users/courses/${courseId}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${user_token}`,
      },
    });

    const data = await res.json();
    alert(data.message);
  };

  if (!course) {
    return;
  }

  return (
    <div>
      <h2>Course Page</h2>
      <h3>Title: {course.title}</h3>
      <h4>Course: {course.description}</h4>
      <h4>Price: {course.price}</h4>
      <button onClick={() => handlePurchase()}>Purchase this course</button>
    </div>
  );
};

export default CoursePage;
