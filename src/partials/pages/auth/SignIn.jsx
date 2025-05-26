import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setStatus("");
  };

  const isFormValid = formData.email && formData.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setStatus("Please fill in Email & Password.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Submitting...");

    try {
      const response = await fetch("https://ventixeauthserviceprovider-e6fshpfqfpemcgdz.swedencentral-01.azurewebsites.net/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = { message: "Unexpected server response." };
      }

      if (response.ok) {
        setStatus("Login successful!");
        navigate("/dashboard");
      } else {
        setStatus(result.message || "Wrong email or password.");
      }
    } catch (error) {
      setStatus("Error connecting to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required/>

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Enter your password" value={formData.password}onChange={handleChange} required/>

        <button type="submit" disabled={!isFormValid || isSubmitting}> {isSubmitting ? "Signing In..." : "Sign In"} </button>

        <p className="status-message">{status}</p>
        <p className="signin-link">Forgotten password? <Link to="/reset">Reset it</Link> </p>
        <p className="signin-link"> Don't have an account yet? <Link to="/signup">Sign up</Link> </p>
      </form>
    </div>
  );
};
export default SignIn;
