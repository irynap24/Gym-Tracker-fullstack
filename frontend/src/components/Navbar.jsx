// Contains links to Home, Workouts, History, Login, and Register.
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // user is logged in
      } else {
        setIsLoggedIn(false); // user is logged out
      }
    });

    return () => unsubscribe();
  }, []);

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
            <button className="logout-btn" onClick={() => auth.signOut()}>
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
