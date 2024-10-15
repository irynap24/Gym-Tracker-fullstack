// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MainExerciseLibrary = () => {
//   const [exercises, setExercises] = useState([]);
//   const [selectedExercise, setSelectedExercise] = useState(null);

//   useEffect(() => {
//     // Fetch exercises from your MongoDB collections
//     const fetchExercises = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/exercises"); // Make sure this endpoint is set up in your server
//         setExercises(response.data); // Adjust according to the structure of your response
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
//       <h2>Exercise Library</h2>
//       <div className="exercise-buttons">
//         {exercises.map((exercise) => (
//           <button
//             key={exercise._id}
//             onClick={() => handleExerciseClick(exercise)}
//           >
//             {exercise.name}
//           </button>
//         ))}
//       </div>

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

// export default MainExerciseLibrary;
