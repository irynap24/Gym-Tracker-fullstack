// Navbar.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set true if user is logged in
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/"); // Redirect to home or login page
    } catch (error) {
      console.error("Logout error:", error); // Handle error gracefully
    }
  };

  return (
    <nav className="navbar">
      <h1>Gym Workout Tracker</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/workouts">Workouts</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
          </>
        )}
        {isLoggedIn ? (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
