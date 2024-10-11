import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext"; // Import UserContext

function WorkoutForm() {
  const { userId } = useContext(UserContext); // Get userId from context
  const [workoutData, setWorkoutData] = useState({
    bodyPart: "",
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    date: new Date().toISOString().split("T")[0], // Default to today
    duration: "", // For cardio minutes
  });

  const [exercises, setExercises] = useState([]); // State for exercises based on body part
  const bodyParts = [
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ]; // Body parts list

  // Fetch exercises based on selected body part
  const fetchExercises = async (part) => {
    if (part && part !== "cardio") {
      try {
        const response = await axios.get(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${part}`,
          {
            headers: {
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
              "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            },
          }
        );
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    } else {
      setExercises([]); // Clear exercises if "cardio" is selected
    }
  };

  useEffect(() => {
    fetchExercises(workoutData.bodyPart); // Fetch exercises when bodyPart changes
  }, [workoutData.bodyPart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const dataToSubmit = {
      userId, // Use userId from context
      ...workoutData,
      ...(workoutData.bodyPart === "cardio"
        ? { sets: "", reps: "", weight: "" }
        : {}), // Clear irrelevant fields for cardio
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/workouts",
        dataToSubmit
      );
      console.log("Workout logged:", response.data);
      // Reset form or give feedback here if needed
      setWorkoutData({
        bodyPart: "",
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
        date: new Date().toISOString().split("T")[0],
        duration: "",
      });
    } catch (error) {
      console.error("Error logging workout:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="bodyPart" onChange={handleChange} required>
        <option value="">Select Body Part</option>
        {bodyParts.map((part) => (
          <option key={part} value={part}>
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </option>
        ))}
      </select>

      <select name="exercise" onChange={handleChange} required>
        <option value="">Select Exercise</option>
        {exercises.map((exercise) => (
          <option
            key={exercise.id || exercise.exerciseId}
            value={exercise.name}
          >
            {exercise.name}
          </option>
        ))}
      </select>

      {workoutData.bodyPart === "cardio" ? (
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={workoutData.duration}
          onChange={handleChange}
          required
        />
      ) : (
        <>
          <input
            type="number"
            name="sets"
            placeholder="Sets"
            value={workoutData.sets}
            onChange={handleChange}
          />
          <input
            type="number"
            name="reps"
            placeholder="Reps"
            value={workoutData.reps}
            onChange={handleChange}
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={workoutData.weight}
            onChange={handleChange}
          />
        </>
      )}

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
