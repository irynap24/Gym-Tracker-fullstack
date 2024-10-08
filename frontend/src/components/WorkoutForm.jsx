import { useState } from "react";

function WorkoutForm({ addWorkout }) {
  const [workout, setWorkout] = useState({ type: "", duration: "", date: "" });
  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(workout);
    setWorkout({ type: "", duration: "", date: "" });
  };
}

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
      <label>Date: </label>
      <input
        type="date"
        name="date"
        value={wprkout.date}
        onChange={handleChange}
        required
      />
    </div>
    <button type="submit">Add workout</button>
  </form>
);

export default WorkoutForm;
