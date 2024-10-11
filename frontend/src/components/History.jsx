import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const History = () => {
  const { userId } = useContext(UserContext); // Get userId from context
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!userId) {
        console.error("User ID is not available");
        return; // Exit if userId is not available
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/workouts`, {
          params: { userId },
        });
        setWorkouts(response.data);
      } catch (err) {
        console.error("Error fetching workout history:", err);
        setError(err.message);
      }
    };

    fetchWorkouts();
  }, [userId]); // Dependency array includes userId

  return (
    <div>
      <h2>Workout History</h2>
      {error && <p>{error}</p>}
      {workouts.length === 0 ? (
        <p>No workouts logged yet.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              {new Date(workout.date).toLocaleDateString()} -{" "}
              {workout.exerciseType}: {workout.sets} sets, {workout.reps} reps,{" "}
              {workout.weight} lbs
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
