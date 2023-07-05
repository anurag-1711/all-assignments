import { useState } from "react";
import { Link } from "react-router-dom";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
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
    // console.log(res);
  };

  return (
    <div>
      <h1>Login to admin dashboard</h1>
      <br />
      <div>
        Username -{" "}
        <input
          type={"text"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        Password -{" "}
        <input
          type={"text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => handleLogin()}>Login</button>
      <br />
      <br />
      <div>
        New here? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
