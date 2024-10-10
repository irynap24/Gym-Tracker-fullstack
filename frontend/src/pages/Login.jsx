import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../contexts/UserContext"; // Import UserContext

function Login() {
  const { setUserId } = useContext(UserContext); // Access setUserId from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);

      // Store user ID in localStorage and context
      const userId = userCredential.user.uid; // Get the user ID from Firebase
      localStorage.setItem("userId", userId); // Save user ID to localStorage
      setUserId(userId); // Update user ID in context

      navigate("/workouts"); // Redirect to workouts page
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
            <span
              onClick={() => navigate("/register")}
              className="register-text"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
