import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <Typography variant="h3">Welcome to course selling website!</Typography>
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          //   border: "2px solid black",
          //   flexDirection: "column",
        }}
      >
        <Link to="/register">
          <Typography variant="h4">Register</Typography>
        </Link>

        <Link to="/login">
          <Typography variant="h4">Login</Typography>
        </Link>
      </div>
    </>
  );
}

export default Landing;
