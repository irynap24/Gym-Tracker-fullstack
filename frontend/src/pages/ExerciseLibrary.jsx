import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ExerciseLibrary.css";

function ExerciseLibrary() {
  const { bodyPart } = useParams();
  const [exercises, setExercises] = useState([]); // State to store exercises
  const [loading, setLoading] = useState(false); // State to manage loading
  const apiKey = import.meta.env.VITE_NINJAS_API_KEY;
  // Load API key from environment variables

  // Updated Body Parts List for Ninja Exercise API
  const bodyParts = [
    { name: "abdominals", display: "Abs" },
    { name: "biceps", display: "Arms" },
    { name: "lower_back", display: "Lower Back & Legs" },
    { name: "middle_back", display: "Mid Back" },
    { name: "calves", display: "Calves" },
    { name: "cardio", display: "Cardio" },
    { name: "chest", display: "Chest" },
    { name: "glutes", display: "Legs" },
    { name: "shoulders", display: "Shoulders" },
  ];

  // Fetch exercises from the Ninja Exercise API based on the body part
  const fetchExercises = async (part) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/exercises`,
        {
          params: { muscle: part },
          headers: {
            "X-Api-Key": apiKey,
          },
        }
      );

      if (Array.isArray(response.data)) {
        setExercises(response.data); // Set exercises if response is an array
      } else {
        console.error("Unexpected response structure:", response.data);
        setExercises([]); // Reset exercises if the response is not an array
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setExercises([]); // Reset exercises on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Render the component
  return (
    <div>
      <h1>
        {bodyPart
          ? `${
              bodyParts.find((part) => part.name === bodyPart)?.display ||
              bodyPart
            } Exercises`
          : "All Exercises"}
      </h1>

      {/* Body Parts Links */}
      <div className="body-parts">
        {bodyParts.map((part) => (
          <button
            key={part.name}
            onClick={() => fetchExercises(part.name)}
            className="body-part-link"
          >
            {part.display}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading exercises...</p>
      ) : exercises.length > 0 ? (
        <div className="exercise-grid">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <img
                src={exercise.image || "placeholder_image_url"} // Placeholder if no image is available
                alt={exercise.name}
                className="exercise-image"
              />
              <h2>{exercise.name}</h2>
              <p>{exercise.equipment || "No equipment specified"}</p>
              <p>Type: {exercise.type}</p> {/* Display type of exercise */}
              <p>Difficulty: {exercise.difficulty}</p>{" "}
              {/* Display difficulty level */}
            </div>
          ))}
        </div>
      ) : (
        <p>No exercises found.</p>
      )}
    </div>
  );
}

export default ExerciseLibrary;
