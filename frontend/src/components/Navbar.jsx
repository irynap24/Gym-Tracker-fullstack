import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu
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

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle hamburger menu open/close state
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Gym Workout Tracker</h1>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/workouts" onClick={toggleMenu}>
                  Log Workout
                </Link>
              </li>
              <li>
                <Link to="/exercises" onClick={toggleMenu}>
                  Exercises
                </Link>
              </li>
              <li>
                <Link to="/history" onClick={toggleMenu}>
                  History
                </Link>
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
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
      </div>
    </nav>
  );
}

export default Navbar;
