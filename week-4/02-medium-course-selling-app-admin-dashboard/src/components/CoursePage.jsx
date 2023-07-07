import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(false);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getCourse();
  }, []);

  const { courseId } = useParams();
  //   console.log);

  const getCourse = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    const res = await fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCourse(data);
    setTitle(data.title);
    setDescription(data.description);
    setPrice(data.price);
    setImageLink(data.imageLink);
    setPublished(data.published);
    console.log(data.published);
  };

  const handleEdit = async () => {
    setEditMode(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink,
        published,
      }),
    });

    const data = await res.json();
    console.log(data);

    getCourse();

    setEditMode(false);
  };

  return (
    <div>
      <h2>
        Title:{" "}
        {!editMode ? (
          course.title
        ) : (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}
      </h2>
      <h3>
        Description:{" "}
        {!editMode ? (
          course.description
        ) : (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      </h3>
      <h3>
        Price:{" "}
        {!editMode ? (
          course.price
        ) : (
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        )}
      </h3>
      <h3>
        ImageLink:{" "}
        {!editMode ? (
          course.imageLink
        ) : (
          <input
            type="text"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
        )}
      </h3>
      <h3>
        Published:{" "}
        {!editMode ? (
          course.published
        ) : (
          <input
            type="text"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        )}
      </h3>

      {!editMode ? (
        <button onClick={() => handleEdit()}>Edit</button>
      ) : (
        <button onClick={() => handleSubmit()}>Submit</button>
      )}
    </div>
  );
};

export default CoursePage;
