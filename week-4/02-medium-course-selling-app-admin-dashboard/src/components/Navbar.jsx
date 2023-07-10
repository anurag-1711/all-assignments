import { Button, Typography, AppBar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const res = await fetch("http://localhost:3000/admin/me", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    // console.log(data);
    setUsername(data.username);
  };

  return (
    <AppBar
      position="static"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        border: "2px solid black",
      }}
    >
      <div>
        <Typography variant="h4">Coursera</Typography>
      </div>
      <div style={{ display: "flex" }}>
        {username ? (
          <Typography variant="h5" style={{ marginRight: "15px" }}>
            {username}
          </Typography>
        ) : (
          <Button
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => navigate("/register")}
          >
            Signup
          </Button>
        )}
        {username ? (
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
              localStorage.setItem("token", null);
              setUsername(null);
            }}
          >
            Logout
          </Button>
        ) : (
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </AppBar>
  );
};

export default Navbar;
