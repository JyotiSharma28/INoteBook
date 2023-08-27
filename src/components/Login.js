import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const host = process.env.REACT_APP_BASE_URL;

const Login = props => {

  const [credential, setCredential] = useState({ email: "", password: "" });
  const history = useNavigate();

  const handleChange = e => {
    setCredential(prevCredential => ({
      ...prevCredential,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${host}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credential.email,
            password: credential.password
          })
        }
      );

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Logged in Successfully", "success");
        history("/");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      props.showAlert("Error logging in. Please try again later.", "danger");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credential.email}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credential.password}
            id="exampleInputPassword1"
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br />
      <p>
        Don't have an account? <Link to="/signup">Register</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
