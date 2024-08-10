import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  let Router = useNavigate();
  const [credential, setcredential] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    setcredential((cred) => {
      return { ...cred, [e.target.name]: e.target.value };
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      console.log(data.authToken);
      localStorage.setItem("authToken", data.authToken);

      Router("/");
      props.showAlert("Logged In Your Account", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  return (
    <form onSubmit={handlesubmit}>
      <div className="mb-3">
        <label for="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={handlechange}
          value={credential.email}
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange={handlechange}
          value={credential.password}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Login;
