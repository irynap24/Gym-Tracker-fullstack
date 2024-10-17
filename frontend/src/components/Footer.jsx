import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/exercises">Exercises</Link>
        <Link to="/history">History</Link>
        <Link to="/workouts">Log Workout</Link>
      </div>
    </footer>
  );
}

export default Footer;
