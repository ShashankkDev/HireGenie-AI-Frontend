import React from "react";
import { Link } from "react-router";
import "./auth.scss";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <main className="auth-page">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="auth-left__overlay">
          <Link to="/login" className="back-btn">
            HireGenie AI
          </Link>

          <div className="auth-left__content">
            <h2>Optimize Your Resume for Every Role You Apply</h2>
            <h1>Analyze. Optimize. Get Hired.</h1>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-card">
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>

          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
