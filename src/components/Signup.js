import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const host = process.env.REACT_APP_BASE_URL;


function Signup(props) {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  const history = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setCredential(prevCredential => ({
      ...prevCredential,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { name, email, password, confirmpassword } = credential;

    if (password !== confirmpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const response = await fetch(
        `${host}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        }
      );

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        history("/login");
        props.showAlert("Account created Successfully", "success");
      } else {
        props.showAlert("Invalid details", "danger");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      props.showAlert(
        "Error creating account. Please try again later.",
        "danger"
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br />
      <p>
        Have an account? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
}

export default Signup;
