import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log(data);
    alert(data.message);
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <form>
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /> <br />
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <br />
      <button onClick={() => handleSubmit()}>Signup</button>
    </div>
  );
};

export default Signup;
