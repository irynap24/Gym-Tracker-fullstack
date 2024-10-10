import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext"; // Import UserContext

function WorkoutForm() {
  const { userId } = useContext(UserContext); // Get userId from context
  const [workoutData, setWorkoutData] = useState({
    exerciseType: "",
    sets: 0,
    reps: 0,
    weight: 0,
    date: new Date().toISOString().split("T")[0], // Default to today
  });

  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/workouts", {
        userId, // Use userId from context
        ...workoutData,
      });
      console.log("Workout logged:", response.data);
      // Reset form or give feedback
    } catch (error) {
      console.error("Error logging workout:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="exerciseType"
        placeholder="Exercise Type"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="sets"
        placeholder="Sets"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight"
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={workoutData.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Log Workout</button>
    </form>
  );
}

export default WorkoutForm;
