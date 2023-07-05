import { useState } from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, price, imageLink, published }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Create Course Page</h1>
      <div>
        Title:{" "}
        <input
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        Description:{" "}
        <input
          type={"text"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br />
      <div>
        Price:{" "}
        <input
          type={"text"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <br />
      <div>
        Image Link:{" "}
        <input
          type={"text"}
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
      </div>
      <br />
      <div>
        Published:{" "}
        <input
          type={"text"}
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => handleSubmit()}>Create Course</button>
    </div>
  );
}
export default CreateCourse;
