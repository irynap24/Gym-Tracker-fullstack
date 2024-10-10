// Workouts.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import WorkoutForm from "../components/WorkoutForm"; // Adjust the path if necessary

function Workouts() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set true if user is logged in
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <WorkoutForm />
      ) : (
        <h2>Please log in to track your workouts</h2>
      )}
    </div>
  );
}

export default Workouts;
