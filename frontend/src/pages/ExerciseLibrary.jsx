import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ExerciseLibrary.css"; // Import your CSS file for styling

function ExerciseLibrary() {
  const { bodyPart } = useParams(); // Get bodyPart from URL parameters
  const [exercises, setExercises] = useState([]); // State to store exercises
  const [loading, setLoading] = useState(true); // State to manage loading
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

  // Fetch exercises from the API based on the body part or all exercises
  const fetchExercises = async (part) => {
    try {
      const endpoint = part
        ? `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${part}`
        : `https://exercisedb.p.rapidapi.com/exercises`;

      const response = await axios.get(endpoint, {
        headers: {
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
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
    fetchExercises(bodyPart); // Fetch exercises based on bodyPart from the URL
  }, [bodyPart]);

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
          <Link key={part} to={`/exercises/${part}`} className="body-part-link">
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </Link>
        ))}
      </div>

      {loading ? (
        <p>Loading exercises...</p>
      ) : exercises.length > 0 ? (
        <div className="exercise-grid">
          {exercises.map((exercise) => (
            <div
              key={exercise.id || exercise.exerciseId}
              className="exercise-card"
            >
              <img
                src={exercise.gifUrl}
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
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ExerciseLibrary = () => {
//   const [exercises, setExercises] = useState({
//     Back: [],
//     Cardio: [],
//     Chest: [],
//     Core: [],
//     Legs: [],
//     Shoulders: [],
//   });
//   const [selectedExercise, setSelectedExercise] = useState(null);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         // Fetch exercises for each collection
//         const collections = [
//           "Back",
//           "Cardio",
//           "Chest",
//           "Core",
//           "Legs",
//           "Shoulders",
//         ];
//         const promises = collections.map(async (collection) => {
//           const response = await axios.get(
//             `http://localhost:5000/api/exercises/${collection}`
//           );
//           return { collection, data: response.data };
//         });

//         const results = await Promise.all(promises);

//         // Organize exercises by collection
//         const exercisesData = {};
//         results.forEach(({ collection, data }) => {
//           exercisesData[collection] = data;
//         });
//         setExercises(exercisesData);
//       } catch (error) {
//         console.error("Error fetching exercises:", error);
//       }
//     };

//     fetchExercises();
//   }, []);

//   const handleExerciseClick = (exercise) => {
//     setSelectedExercise(exercise);
//   };

//   return (
//     <div>
//       {Object.keys(exercises).map((collection) => (
//         <div key={collection}>
//           <h2>
//             {collection.charAt(0).toUpperCase() + collection.slice(1)} Exercises
//           </h2>
//           {exercises[collection].length > 0 ? (
//             exercises[collection].map((exercise) => (
//               <button
//                 key={exercise._id}
//                 onClick={() => handleExerciseClick(exercise)}
//               >
//                 {exercise.name}
//               </button>
//             ))
//           ) : (
//             <p>No exercises found for {collection}.</p>
//           )}
//         </div>
//       ))}

//       {selectedExercise && (
//         <div className="exercise-detail">
//           <h3>{selectedExercise.name}</h3>
//           <img src={selectedExercise.img} alt={selectedExercise.name} />
//           <p>Equipment: {selectedExercise.equipment}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExerciseLibrary;
