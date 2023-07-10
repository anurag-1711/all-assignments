import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const CoursePage = () => {
  // const [course, setCourse] = useState({});
  const setCourse = useSetRecoilState(courseState);

  useEffect(() => {
    getCourse();
  }, []);

  const { courseId } = useParams();

  const getCourse = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCourse(data);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Course />
      <EditCourse _id={courseId} />
    </div>
  );
};

const Course = () => {
  const course = useRecoilValue(courseState);
  const { title, description, price } = course;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: 345 }} style={{ margin: "20px" }}>
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
            <Typography variant="body1" color="text">
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
};

const EditCourse = ({ _id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState("");

  const [course, setCourse] = useRecoilState(courseState);

  const handleEdit = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/admin/courses/${_id}`, {
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
      setCourse({ title, description, price, imageLink, published });
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
        <Typography variant="h4">Edit Course</Typography>
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

        <Button variant="contained" onClick={() => handleEdit(_id)}>
          Edit Course
        </Button>
      </Card>
    </div>
  );
};

export default CoursePage;

const courseState = atom({
  key: "courseState",
  default: "",
});
