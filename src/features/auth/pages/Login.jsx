import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";
import { useAuth } from "../hooks/useAuth";
import "./auth.scss";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    // navigate("/");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <AuthLayout
      title="Welcome"
      subtitle="Login to continue building your resume"
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn">Login</button>

        <p className="switch-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
