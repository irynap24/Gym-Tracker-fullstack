import { useState } from "react";

function WorkoutForm({ addWorkout }) {
  //   console.log("WorkoutForm rendered"); // to see if the form renders

  const [workout, setWorkout] = useState({ type: "", duration: "", date: "" });

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(workout);
    setWorkout({ type: "", duration: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Workout Type: </label>
        <input
          type="text"
          name="type"
          value={workout.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Duration (minutes): </label>
        <input
          type="number"
          name="duration"
          value={workout.duration}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date: </label>
        <input
          type="date"
          name="date"
          value={workout.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Workout</button>
    </form>
  );
}

export default WorkoutForm;
