import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Auth.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const allFieldsFilled = formData.email && formData.password;
  const isFormValid = allFieldsFilled;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setStatus("Please complete the form correctly.");
      return;
    }

    setStatus("Submitting...");

    try {
      const response = await fetch("http://localhost:5001/api/auth/signin", {
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
        <h2>Sign In</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={!isFormValid}>
          Sign In
        </button>

        <p className="signin-link">Forgotten Password? <Link to="/denied">Reset Password</Link></p>
        <p className="signin-link">Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default SignIn;
