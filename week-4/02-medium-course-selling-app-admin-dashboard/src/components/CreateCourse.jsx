import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
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
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/admin/courses", {
        method: "POST",
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
      alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h4">Create a Course</Typography>
      </div>
      <br />

      <Card
        variant="outlined"
        style={{ width: "400px", margin: "auto", padding: "10px" }}
      >
        <TextField
          style={{ marginBottom: "10px" }}
          fullWidth
          variant="outlined"
          label="Title"
          type={"text"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <TextField
          style={{ marginBottom: "10px" }}
          fullWidth
          variant="outlined"
          label="Description"
          type={"text"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />

        <TextField
          style={{ marginBottom: "10px" }}
          fullWidth
          variant="outlined"
          label="Price"
          type={"number"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />

        <TextField
          style={{ marginBottom: "10px" }}
          fullWidth
          variant="outlined"
          label="Image Link"
          type={"text"}
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />

        <br />

        <TextField
          style={{ marginBottom: "10px" }}
          fullWidth
          variant="outlined"
          label="Published"
          type={"text"}
          value={published}
          onChange={(e) => setPublished(e.target.value)}
        />

        <br />

        <Button variant="contained" onClick={() => handleSubmit()}>
          Create Course
        </Button>
      </Card>
    </div>
  );
}
export default CreateCourse;
