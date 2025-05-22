import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordsMatch = formData.password === formData.confirmPassword;
  const allFieldsFilled =
    formData.email && formData.password && formData.confirmPassword;
  const isFormValid = passwordsMatch && allFieldsFilled;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setStatus("Please complete the form correctly.");
      return;
    }

    setStatus("Submitting...");

    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Signup successful!");
      } else {
        setStatus(result.message || "Signup failed.");
      }
    } catch (error) {
      setStatus("Error connecting to server.");
    }
  };

  return (
    <div className="auth-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <p className={`password-warning ${passwordsMatch ? "hidden" : ""}`}>
          Passwords do not match.
        </p>

        <button type="submit" disabled={!isFormValid}>
          Register
        </button>

        <p className="status-message">{status}</p>

         <p className="signin-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
