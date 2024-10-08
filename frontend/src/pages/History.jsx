function History({ workouts }) {
  return (
    <div>
      <h2>Workout History</h2>
      <ul>
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <li key={index}>
              <strong>{workout.type}</strong> - {workout.duration} minutes on{" "}
              {workout.date}
            </li>
          ))
        ) : (
          <p>No workouts logged yet.</p>
        )}
      </ul>
    </div>
  );
}

export default History;
