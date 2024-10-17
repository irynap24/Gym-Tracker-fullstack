// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { UserContext } from "../contexts/UserContext";
// import "./WorkoutForm.css";

// function WorkoutForm() {
//   const { userId } = useContext(UserContext);
//   const [bodyParts, setBodyParts] = useState([]);
//   const [exercises, setExercises] = useState([]);
//   const [selectedBodyPart, setSelectedBodyPart] = useState("");
//   const [workouts, setWorkouts] = useState([]);
//   const [workoutData, setWorkoutData] = useState({
//     exerciseType: "",
//     sets: "",
//     reps: "",
//     weight: "",
//     minutes: "",
//     date: formatDateToLocal(new Date()), // Use local date formatting function
//   });
//   const [showSummary, setShowSummary] = useState(false);

//   // Function to format the date in MM/DD/YYYY
//   function formatDateToLocal(date) {
//     const offsetDate = new Date(
//       date.getTime() - date.getTimezoneOffset() * 60000
//     );
//     return offsetDate.toISOString().split("T")[0];
//   }

//   // Fetch body parts from the API
//   useEffect(() => {
//     const fetchBodyParts = async () => {
//       try {
//         const response = await axios.get(
//           "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
//           {
//             headers: {
//               "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//               "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
//             },
//           }
//         );
//         setBodyParts(response.data);
//       } catch (error) {
//         console.error("Error fetching body parts:", error);
//       }
//     };
//     fetchBodyParts();
//   }, []);

//   // Fetch exercises when a body part is selected
//   useEffect(() => {
//     const fetchExercises = async () => {
//       if (selectedBodyPart) {
//         try {
//           const response = await axios.get(
//             `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`,
//             {
//               headers: {
//                 "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//                 "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
//               },
//             }
//           );
//           setExercises(response.data);
//         } catch (error) {
//           console.error("Error fetching exercises:", error);
//         }
//       }
//     };
//     fetchExercises();
//   }, [selectedBodyPart]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
//   };

//   // Handle adding a workout
//   const handleAddWorkout = () => {
//     if (workoutData.exerciseType && workoutData.sets && workoutData.reps) {
//       const newWorkout = {
//         ...workoutData,
//         bodyPart: selectedBodyPart,
//       };
//       setWorkouts((prev) => [...prev, newWorkout]);
//       clearInputs();
//     }
//   };

//   const clearInputs = () => {
//     setWorkoutData({
//       exerciseType: "",
//       sets: "",
//       reps: "",
//       weight: "",
//       minutes: "",
//       date: formatDateToLocal(new Date()), // Reset to local today's date
//     });
//   };

//   // Handle done logging
//   const handleDoneLogging = async () => {
//     if (workouts.length === 0) {
//       return; // Exit early if there are no workouts
//     }

//     try {
//       for (const workout of workouts) {
//         const workoutPayload = {
//           userId,
//           bodyPart: workout.bodyPart,
//           date: workout.date, // Use the selected date
//           exerciseType: workout.exerciseType,
//           sets: workout.sets || 0,
//           reps: workout.reps || 0,
//           weight: workout.weight || 0,
//           minutes: workout.minutes || 0,
//         };

//         await axios.post("http://localhost:5000/api/workouts", workoutPayload);
//       }

//       setShowSummary(true);
//       setSelectedBodyPart("");
//     } catch (error) {
//       console.error("Error logging workouts:", error.response.data);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={(e) => e.preventDefault()}>
//         {/* Body Part Dropdown */}
//         <select
//           name="bodyPart"
//           value={selectedBodyPart}
//           onChange={(e) => setSelectedBodyPart(e.target.value)}
//           required
//         >
//           <option value="">Select Body Part</option>
//           {bodyParts.map((part) => (
//             <option key={part} value={part}>
//               {part.charAt(0).toUpperCase() + part.slice(1)}
//             </option>
//           ))}
//         </select>

//         {/* Exercise Dropdown */}
//         {selectedBodyPart && (
//           <select
//             name="exerciseType"
//             value={workoutData.exerciseType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Exercise</option>
//             {exercises.map((exercise) => (
//               <option key={exercise.id} value={exercise.name}>
//                 {exercise.name}
//               </option>
//             ))}
//           </select>
//         )}

//         {/* Input fields for workouts */}
//         {selectedBodyPart !== "cardio" ? (
//           <>
//             <input
//               type="number"
//               name="sets"
//               placeholder="Sets"
//               value={workoutData.sets}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="number"
//               name="reps"
//               placeholder="Reps"
//               value={workoutData.reps}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="number"
//               name="weight"
//               placeholder="Weight"
//               value={workoutData.weight}
//               onChange={handleChange}
//             />
//           </>
//         ) : (
//           <input
//             type="number"
//             name="minutes"
//             placeholder="Minutes"
//             value={workoutData.minutes}
//             onChange={handleChange}
//             required
//           />
//         )}

//         {/* Date Input */}
//         <input
//           type="date"
//           name="date"
//           value={workoutData.date}
//           onChange={handleChange}
//           required
//         />
//         <button type="button" onClick={handleAddWorkout}>
//           Add Workout
//         </button>
//         <button type="button" onClick={handleDoneLogging}>
//           Done Logging
//         </button>
//       </form>

//       {/* Show summary only after clicking done logging */}
//       {showSummary && workouts.length > 0 && (
//         <div>
//           <h3>Today's Workouts Summary</h3>
//           <ul>
//             {workouts.map((workout, index) => (
//               <li key={index}>
//                 {workout.exerciseType}: {workout.sets} sets x {workout.reps}{" "}
//                 reps
//                 {workout.weight && ` (${workout.weight} lbs)`}
//                 {workout.minutes && ` (${workout.minutes} minutes)`}
//                 <span>
//                   {" "}
//                   on{" "}
//                   {new Date(workout.date).toLocaleDateString("en-US", {
//                     timeZone: "UTC",
//                   })}
//                 </span>{" "}
//                 {/* Fix date display */}
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={() => {
//               setShowSummary(false);
//               setWorkouts([]); // Clear workouts after showing the summary
//             }}
//           >
//             Log More Workouts
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default WorkoutForm;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import "./WorkoutForm.css";

function WorkoutForm() {
  const { userId } = useContext(UserContext);
  const [bodyParts, setBodyParts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [workoutData, setWorkoutData] = useState({
    exerciseType: "",
    sets: "",
    reps: "",
    weight: "",
    minutes: "",
    date: formatDateToLocal(new Date()), // Use local date formatting function
  });
  const [showSummary, setShowSummary] = useState(false);

  // Function to format the date in MM/DD/YYYY
  function formatDateToLocal(date) {
    const offsetDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return offsetDate.toISOString().split("T")[0];
  }

  // Fetch body parts from the Wger API
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await axios.get("https://wger.de/api/v2/muscle/");
        // Assuming the response structure includes a 'results' array
        setBodyParts(response.data.results);
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
            `https://wger.de/api/v2/exercise/?muscles=${selectedBodyPart}&language=2`
          );
          setExercises(response.data.results); // Set exercises based on the response
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

  // Handle adding a workout
  const handleAddWorkout = () => {
    if (workoutData.exerciseType && workoutData.sets && workoutData.reps) {
      const newWorkout = {
        ...workoutData,
        bodyPart: selectedBodyPart,
      };
      setWorkouts((prev) => [...prev, newWorkout]);
      clearInputs();
    }
  };

  const clearInputs = () => {
    setWorkoutData({
      exerciseType: "",
      sets: "",
      reps: "",
      weight: "",
      minutes: "",
      date: formatDateToLocal(new Date()), // Reset to local today's date
    });
  };

  // Handle done logging
  const handleDoneLogging = async () => {
    if (workouts.length === 0) {
      return; // Exit early if there are no workouts
    }

    try {
      for (const workout of workouts) {
        const workoutPayload = {
          userId,
          bodyPart: workout.bodyPart,
          date: workout.date, // Use the selected date
          exerciseType: workout.exerciseType,
          sets: workout.sets || 0,
          reps: workout.reps || 0,
          weight: workout.weight || 0,
          minutes: workout.minutes || 0,
        };

        await axios.post("http://localhost:5000/api/workouts", workoutPayload);
      }

      setShowSummary(true);
      setSelectedBodyPart("");
    } catch (error) {
      console.error("Error logging workouts:", error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Body Part Dropdown */}
        <select
          name="bodyPart"
          value={selectedBodyPart}
          onChange={(e) => setSelectedBodyPart(e.target.value)}
          required
        >
          <option value="">Select Body Part</option>
          {bodyParts.map((part) => (
            <option key={part.id} value={part.id}>
              {part.name.charAt(0).toUpperCase() + part.name.slice(1)}
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

        {/* Input fields for workouts */}
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

        {/* Date Input */}
        <input
          type="date"
          name="date"
          value={workoutData.date}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleAddWorkout}>
          Add Workout
        </button>
        <button type="button" onClick={handleDoneLogging}>
          Done Logging
        </button>
      </form>

      {/* Show summary only after clicking done logging */}
      {showSummary && workouts.length > 0 && (
        <div>
          <h3>Today's Workouts Summary</h3>
          <ul>
            {workouts.map((workout, index) => (
              <li key={index}>
                {workout.exerciseType}: {workout.sets} sets x {workout.reps}{" "}
                reps
                {workout.weight && ` (${workout.weight} lbs)`}
                {workout.minutes && ` (${workout.minutes} minutes)`}
                <span>
                  {" "}
                  on{" "}
                  {new Date(workout.date).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </span>{" "}
                {/* Fix date display */}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setShowSummary(false);
              setWorkouts([]); // Clear workouts after showing the summary
            }}
          >
            Log More Workouts
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkoutForm;
