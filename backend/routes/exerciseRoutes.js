import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ExerciseLibrary() {
    const { bodyPart } = useParams(); // Get bodyPart from URL parameters
    const [exercises, setExercises] = useState([]); // State to store exercises
    const [loading, setLoading] = useState(true); // State to manage loading
    const isAllExercises = !bodyPart; // Determine if all exercises should be displayed

    // Fetch exercises from the API based on the body part or all exercises
    const fetchExercises = async () => {
        try {
            const endpoint = isAllExercises
                ? `https://exercisedb.p.rapidapi.com/exercises`
                : `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;

            const response = await axios.get(endpoint, {
                headers: {
                    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
                    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
                },
            });

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

    useEffect(() => {
        fetchExercises(); // Fetch exercises on component mount
    }, [bodyPart]);

    // Render the component
    return (
        <div>
            {/* Navigation Bar */}
            <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px", backgroundColor: "#f8f9fa" }}>
                <Link to="/">Home</Link>
                <Link to="/workouts">Workouts</Link>
                <Link to="/exercises">All Exercises</Link>
                <Link to="/exercises/bodyPart/back">Back Exercises</Link>
                <Link to="/exercises/bodyPart/legs">Leg Exercises</Link>
                <Link to="/exercises/bodyPart/chest">Chest Exercises</Link>
            </nav>

            <h1>
                {isAllExercises
                    ? "All Exercises"
                    : bodyPart
                        ? `${bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Exercises`
                        : "Exercises"}
            </h1>
            {loading ? (
                <p>Loading exercises...</p>
            ) : exercises.length > 0 ? (
                <ul>
                    {exercises.map((exercise) => (
                        <li key={exercise.id || exercise.exerciseId}>
                            <h2>{exercise.name}</h2>
                            <p>{exercise.equipment || "No equipment specified"}</p>
                            {exercise.gifUrl && <img src={exercise.gifUrl} alt={exercise.name} style={{ width: "200px" }} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No exercises found.</p>
            )}
        </div>
    );
}

export default ExerciseLibrary;
