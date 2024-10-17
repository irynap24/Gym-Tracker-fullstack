import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ExerciseLibrary.css";

function ExerciseLibrary() {
  const { bodyPart } = useParams(); // Get bodyPart from URL parameters
  const [exercises, setExercises] = useState([]); // State to store exercises
  const [loading, setLoading] = useState(true); // State to manage loading
  const [categories, setCategories] = useState([]); // State to store exercise categories

  // Updated Body Parts List
  const bodyParts = [
    { name: "abs", id: 10 },
    { name: "arms", id: 8 },
    { name: "back", id: 12 },
    { name: "calves", id: 14 },
    { name: "cardio", id: 15 },
    { name: "chest", id: 11 },
    { name: "legs", id: 9 },
    { name: "shoulders", id: 13 },
  ]; // Body parts list with IDs

  // Fetch exercise categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://wger.de/api/v2/exercisecategory/"
      );
      if (Array.isArray(response.data.results)) {
        setCategories(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching exercise categories:", error);
    }
  };

  // Fetch exercises from the Wger API based on the body part ID
  const fetchExercises = async (partId) => {
    try {
      const response = await axios.get(
        `https://wger.de/api/v2/exercise/?category=${partId}&language=2`
      );

      if (Array.isArray(response.data.results)) {
        const exercisesWithImages = await Promise.all(
          response.data.results.map(async (exercise) => {
            const imageResponse = await axios.get(
              `https://wger.de/api/v2/exerciseimage/?exercise=${exercise.id}`
            );
            const image =
              imageResponse.data.results.length > 0
                ? imageResponse.data.results[0].image
                : null; // Get the first image for the exercise
            return {
              ...exercise,
              image, // Add the image URL to the exercise data
            };
          })
        );
        setExercises(exercisesWithImages); // Set exercises if response is an array
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

  useEffect(() => {
    fetchCategories(); // Fetch exercise categories on mount
  }, []);

  useEffect(() => {
    const selectedBodyPart = bodyParts.find((part) => part.name === bodyPart);
    if (selectedBodyPart) {
      fetchExercises(selectedBodyPart.id); // Fetch exercises based on selected bodyPart ID
    }
  }, [bodyPart]); // Re-run if bodyPart changes

  // Render the component
  return (
    <div>
      <h1>
        {bodyPart
          ? `${bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Exercises`
          : "All Exercises"}
      </h1>

      {/* Body Parts Links */}
      <div className="body-parts">
        {bodyParts.map((part) => (
          <Link
            key={part.name}
            to={`/exercises/${part.name}`}
            className="body-part-link"
          >
            {part.name.charAt(0).toUpperCase() + part.name.slice(1)}
          </Link>
        ))}
      </div>

      {loading ? (
        <p>Loading exercises...</p>
      ) : exercises.length > 0 ? (
        <div className="exercise-grid">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <img
                src={exercise.image || "placeholder_image_url"} // Use a placeholder if no image is available
                alt={exercise.name}
                className="exercise-image"
              />
              <h2>{exercise.name}</h2>
              <p>{exercise.equipment || "No equipment specified"}</p>
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
