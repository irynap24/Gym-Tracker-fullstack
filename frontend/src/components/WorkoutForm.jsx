import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import "./WorkoutForm.css";

function WorkoutForm() {
  const { userId } = useContext(UserContext); // Get userId from context

  // State to manage body parts and exercises
  const [bodyParts, setBodyParts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [workoutData, setWorkoutData] = useState({
    exerciseType: "",
    sets: "", // Changed from 0 to empty string
    reps: "", // Changed from 0 to empty string
    weight: "", // Changed from 0 to empty string
    minutes: "", // Changed from 0 to empty string
    date: new Date().toISOString().split("T")[0], // Default to today
  });

  // Fetch body parts from the API
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await axios.get(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          {
            headers: {
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
              "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
            },
          }
        );
        setBodyParts(response.data);
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
    };
    fetchBodyParts();
  }, []);

  // Fetch exercises when a body part is selected
  useEffect(() => {
    const fetchExercises = async () => {
      if (selectedBodyPart) {
        try {
          const response = await axios.get(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
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
      }
    };
    fetchExercises();
  }, [selectedBodyPart]);

  // Handle input changes
  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const workoutPayload = {
        userId,
        bodyPart: selectedBodyPart,
        ...workoutData,
      };
      const response = await axios.post(
        "http://localhost:5000/api/workouts",
        workoutPayload
      );
      console.log("Workout logged:", response.data);
      // Reset form or provide feedback
    } catch (error) {
      console.error("Error logging workout:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Body Part Dropdown */}
      <select
        name="bodyPart"
        value={selectedBodyPart}
        onChange={(e) => setSelectedBodyPart(e.target.value)}
        required
      >
        <option value="">Select Body Part</option>
        {bodyParts.map((part) => (
          <option key={part} value={part}>
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </option>
        ))}
      </select>

      {/* Exercise Dropdown */}
      {selectedBodyPart && (
        <select
          name="exerciseType"
          value={workoutData.exerciseType}
          onChange={handleChange}
          required
        >
          <option value="">Select Exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </select>
      )}

      {/* Conditionally show reps, sets, weight for non-cardio */}
      {selectedBodyPart !== "cardio" ? (
        <>
          <input
            type="number"
            name="sets"
            placeholder="Sets"
            value={workoutData.sets}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="reps"
            placeholder="Reps"
            value={workoutData.reps}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={workoutData.weight}
            onChange={handleChange}
            required
          />
        </>
      ) : (
        <input
          type="number"
          name="minutes"
          placeholder="Minutes"
          value={workoutData.minutes}
          onChange={handleChange}
          required
        />
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
