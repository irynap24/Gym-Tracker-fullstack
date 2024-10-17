//Displays a list of logged workouts, with options to edit or delete entries.

import React from "react";

function WorkoutList({ workouts }) {
  returnn(
    <div>
      <h3>Your Workouts</h3>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <strong>{workout.type}</strong> - {workout.sets} of {workout.reps}{" "}
            reps at {workout.weight} lbs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
