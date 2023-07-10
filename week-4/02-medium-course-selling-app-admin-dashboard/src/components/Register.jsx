import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      // console.log(data);
      const token = data.token;
      localStorage.setItem("token", token);
      alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLoginButton = () => {
    useNavigate("/login");
  };

  return (
    <div style={{}}>
      <div
        style={{
          paddingTop: "100px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Welcome. Signup below</Typography>
      </div>

      <Card
        variant="outlined"
        style={{
          // border: "1px solid black",
          width: 400,
          padding: 20,
          margin: "auto",
        }}
      >
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />
        <Button size="large" variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
        <br />
        <br />
        <div>
          <Typography>
            Already a user? <Link to={"/login"}> Login</Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Register;
