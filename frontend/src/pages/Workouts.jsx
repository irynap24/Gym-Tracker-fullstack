import { useState } from "react";
import WorkoutForm from "../components/WorkoutForm";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <div>
      <h2>Track Your Workouts</h2>
      <WorkoutForm addWorkout={addWorkout} />

      <h3>Your Logged Workouts</h3>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <strong>{workout.type}</strong> - {workout.duration} minutes on{" "}
            {workout.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
