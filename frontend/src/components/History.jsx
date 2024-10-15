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

  // Function to group workouts by date
  const groupWorkoutsByDate = (workouts) => {
    return workouts.reduce((acc, workout) => {
      const date = new Date(workout.date).toLocaleDateString(); // Format date as needed
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(workout);
      return acc;
    }, {});
  };

  const groupedWorkouts = groupWorkoutsByDate(workouts);

  // State to manage expanded workouts for each date
  const [expandedDates, setExpandedDates] = useState({});

  // Function to toggle expanded workouts for a specific date
  const toggleExpand = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date], // Toggle the expand state for the date
    }));
  };

  return (
    <div>
      <h2>Workout History</h2>
      {error && <p>{error}</p>}
      {Object.keys(groupedWorkouts).length === 0 ? (
        <p>No workouts logged yet.</p>
      ) : (
        <div>
          {Object.entries(groupedWorkouts).map(([date, workouts]) => (
            <div key={date}>
              <h3>{date}</h3>
              <ul>
                {workouts.slice(0, 4).map(
                  (
                    workout // Show first 4 workouts
                  ) => (
                    <li key={workout._id}>
                      {workout.exerciseType}: {workout.sets} sets,{" "}
                      {workout.reps} reps, {workout.weight} lbs
                    </li>
                  )
                )}
                {workouts.length > 4 &&
                  !expandedDates[date] && ( // Show Expand button
                    <button onClick={() => toggleExpand(date)}>Expand</button>
                  )}
                {expandedDates[date] &&
                  workouts.slice(4).map(
                    (
                      workout // Show remaining workouts if expanded
                    ) => (
                      <li key={workout._id}>
                        {workout.exerciseType}: {workout.sets} sets,{" "}
                        {workout.reps} reps, {workout.weight} lbs
                      </li>
                    )
                  )}
                {expandedDates[date] && ( // Show Collapse button if expanded
                  <button onClick={() => toggleExpand(date)}>Collapse</button>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
