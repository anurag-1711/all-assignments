import { useState } from "react";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
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
    // console.log(localStorage.getItem("token"));
  };

  return (
    <div>
      <h1>Register to the website</h1>
      <br />
      <div style={{}}>
        Username
        <input
          style={{ marginLeft: "10px" }}
          type={"text"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        Password
        <input
          style={{ marginLeft: "10px" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => handleSubmit()}>Submit</button>
      <br />
      <br />
      <div>
        Already a user? <a href="/login">Login</a>
      </div>
    </div>
  );
}

export default Register;
