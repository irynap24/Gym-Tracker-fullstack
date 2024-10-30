import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ExerciseLibrary.css";

function ExerciseLibrary() {
  const { bodyPart } = useParams(); // Get bodyPart from URL parameters
  const [exercises, setExercises] = useState([]); // State to store exercises
  // const [loading, setLoading] = useState(true); // State to manage loading
  // const [categories, setCategories] = useState([]); // State to store exercise categories
  const apiKey = process.env.REACT_APP_NINJAS_API_KEY;

  // Updated Body Parts List for Ninja Exercise API
  const bodyParts = [
    { name: "abdominals", display: "Core/Ab Work" },
    { name: "biceps", display: "Arms:Biceps" },
    { name: "back", display: "Back" },
    { name: "calves", diplay: "Calves" },
    { name: "cardio", display: "Cardio" },
    { name: "chest", display: "Chest" },
    { name: "glutes", display: "Legs" },
    { name: "shoulders", display: "Shoulders" },
  ];

  // Fetch exercise categories from the API
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://wger.de/api/v2/exercisecategory/"
  //     );
  //     if (Array.isArray(response.data.results)) {
  //       setCategories(response.data.results);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching exercise categories:", error);
  //   }
  // };

  // Fetch exercises from the Ninja API based on the body part
  const fetchExercises = async (part) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/exercises`,
        params: {muscle:part},
        headers:{
          "X-Api-Key":apiKey
        });

        if (Array.isArray(response.data)){
          setExercises(response.data); // Set exercises if response is an array
        }
        else{
          console.error("Unexpected response structure:", response.data);
          setExercises([]); // Reset exercises if the response is not an array
        }
    }
        catch(error){
          console.error("Error fetching exercises:", error);
          setExercises([]); // Reset exericises on error
        }
        finally{
          setLoading(false); // Stop loading
        }
  useEffect(() => {
    if (bodyPart) {
      fetchExercises(bodyPart); // Fetch exercises based on selected bodyPart 
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
