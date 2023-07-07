import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        username,
        password,
      },
    });

    const data = await res.json();
    console.log(data);
    localStorage.setItem("user-token", data.token);
    alert(data.message);
  };

  return (
    <div>
      <h2>Login Page</h2>
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
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  );
};

export default Login;
