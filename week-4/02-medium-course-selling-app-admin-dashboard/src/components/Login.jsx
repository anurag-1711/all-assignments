import { Typography, Card, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          username,
          password,
        },
      });
      const res = await data.json();
      const { token } = res;
      localStorage.setItem("token", token);
      alert(res.message);
      navigate("/courses");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
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
        <Typography variant="h4">Login to admin dashboard</Typography>
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
          type={"text"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <Button size="large" variant="contained" onClick={() => handleLogin()}>
          Login
        </Button>
        <br />
        <br />
        <div>
          <Typography>
            New here? <Link to="/register"> Register</Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Login;
