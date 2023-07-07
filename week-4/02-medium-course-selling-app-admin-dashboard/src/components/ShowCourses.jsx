import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <h1>Show Course Page</h1>
      <div style={{ display: "flex", flexFlow: "row", alignItems: "center" }}>
        {courses.map((c) => (
          <Link to={`/course/${c._id}`} key={c._id}>
            <Course {...c} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function Course({ title, description, price }) {
  return (
    <div
      style={{ marginRight: "20px", border: "1px solid black", width: "150px" }}
    >
      <h2>{title}</h2>
      <h3>{description}</h3>
      <h4>Price: {price}</h4>
    </div>
  );
}

export default ShowCourses;
