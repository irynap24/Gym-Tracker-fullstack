import React from "react";
import "./Login.css";
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
        <div className="login-link">
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <span onClick={handleRegisterClick} className="register-text">
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
