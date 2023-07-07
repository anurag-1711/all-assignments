import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h2>Welcome to the home page of the course selling app for users!</h2>
      <h3>
        <Link to={"/signup"}>Signup</Link>
      </h3>
      <h3>
        <Link to={"/login"}>Login</Link>
      </h3>
    </>
  );
};

export default Home;
