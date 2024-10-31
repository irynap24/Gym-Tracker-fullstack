import React, { useState } from "react";
import axios from "axios";
import "./ExerciseLibrary.css";

function ExerciseLibrary() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_NINJAS_API_KEY;

  // Updated Body Parts List for Ninja Exercise API
  const bodyParts = [
    { name: ["abdominals"], display: "Abs" },
    { name: ["biceps", "forearms", "triceps"], display: "Arms" },
    {
      name: ["lower_back", "middle_back", "neck", "traps", "lats"],
      display: "Back",
    },
    {
      name: ["calves", "quadriceps", "hamstrings", "abductors", "adductors"],
      display: "Legs & Glutes",
    },
    { name: "chest", display: "Chest" },
    { name: "shoulders", display: "Shoulders" },
  ];
  // Fetch exercises for multiple muscle names if needed
  const fetchExercises = async (muscleGroup) => {
    setLoading(true);
    setExercises([]); // Clear previous exercises

    try {
      const allExercises = await Promise.all(
        muscleGroup.map(async (muscle) => {
          const response = await axios.get(
            `https://api.api-ninjas.com/v1/exercises`,
            {
              params: { muscle },
              headers: { "X-Api-Key": apiKey },
            }
          );
          return Array.isArray(response.data) ? response.data : [];
        })
      );
      // Flatten results and set exercises
      setExercises(allExercises.flat());
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exercise-library">
      {exercises.length === 0 ? (
        <div className="landing-page">
          <h1>Welcome to the Exercise Library</h1>
          <p>Select a muscle group to see targeted exercises.</p>
          <div className="body-parts">
            {bodyParts.map((part) => (
              <button
                key={part.display}
                onClick={() => fetchExercises(part.name)}
                className="body-part-link"
              >
                {part.display}
              </button>
            ))}
          </div>
        </div>
      ) : loading ? (
        <p>Loading exercises...</p>
      ) : (
        <div className="exercise-grid">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <h2>{exercise.name}</h2>
              <p>{exercise.equipment || "No equipment specified"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExerciseLibrary;
