import React from "react";

import "./Login.css"; //
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <i className="bx bxs-lock-alt"></i>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <button onClick={handleRegisterClick} className="register-btn">
              Register
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
