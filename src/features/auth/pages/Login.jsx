// import React,{useState} from 'react'
// import { useNavigate, Link } from 'react-router'
// import "../auth.form.scss"
// import { useAuth } from '../hooks/useAuth'

// const Login = () => {

//     const { loading, handleLogin } = useAuth()
//     const navigate = useNavigate()

//     const [ email, setEmail ] = useState("")
//     const [ password, setPassword ] = useState("")

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         await handleLogin({email,password})
//         navigate('/')
//     }

//     if(loading){
//         return (<main><h1>Loading.......</h1></main>)
//     }

//     return (
//         <main>
//             <div className="form-container">
//                 <h1>Login</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             onChange={(e) => { setEmail(e.target.value) }}
//                             type="email" id="email" name='email' placeholder='Enter email address' />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             onChange={(e) => { setPassword(e.target.value) }}
//                             type="password" id="password" name='password' placeholder='Enter password' />
//                     </div>
//                     <button className='button primary-button' >Login</button>
//                 </form>
//                 <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
//             </div>
//         </main>
//     )
// }

// export default Login

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
    navigate("/");
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
