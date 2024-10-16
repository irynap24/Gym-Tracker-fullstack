import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import "./History.css";

const History = () => {
  const { userId } = useContext(UserContext); // Get userId from context
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [updateData, setUpdateData] = useState({
    sets: "",
    reps: "",
    weight: "",
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!userId) {
        console.error("User ID is not available");
        return; // Exit if userId is not available
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/workouts`, {
          params: { userId },
        });
        setWorkouts(response.data);
      } catch (err) {
        console.error("Error fetching workout history:", err);
        setError(err.message);
      }
    };

    fetchWorkouts();
  }, [userId]); // Dependency array includes userId

  // Function to group workouts by date
  const groupWorkoutsByDate = (workouts) => {
    return workouts.reduce((acc, workout) => {
      // Parse the date as UTC, adjust to the local time zone
      const workoutDate = new Date(workout.date);
      const localDate = new Date(
        workoutDate.getTime() + workoutDate.getTimezoneOffset() * 60000
      );

      const formattedDate = localDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(workout);
      return acc;
    }, {});
  };

  const groupedWorkouts = groupWorkoutsByDate(workouts);

  // State to manage expanded workouts for each date
  const [expandedDates, setExpandedDates] = useState({});

  // Function to toggle expanded workouts for a specific date
  const toggleExpand = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date], // Toggle the expand state for the date
    }));
  };

  // Handle delete workout
  const handleDeleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workouts/${id}`);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  // Start editing a workout
  const handleEditWorkout = (workout) => {
    setIsEditing(true);
    setEditingWorkout(workout);
    setUpdateData({
      sets: workout.sets || "",
      reps: workout.reps || "",
      weight: workout.weight || "",
    });
  };

  // Handle update workout
  const handleUpdateWorkout = async () => {
    try {
      const updatedWorkout = {
        ...editingWorkout,
        sets: updateData.sets,
        reps: updateData.reps,
        weight: updateData.weight,
      };

      await axios.put(
        `http://localhost:5000/api/workouts/${editingWorkout._id}`,
        updatedWorkout
      );
      setWorkouts(
        workouts.map((workout) =>
          workout._id === editingWorkout._id ? updatedWorkout : workout
        )
      );
      setIsEditing(false);
      setEditingWorkout(null);
      setUpdateData({
        sets: "",
        reps: "",
        weight: "",
      });
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  return (
    <div className="history-container">
      <h2>Workout History</h2>
      {error && <p className="error">{error}</p>}
      {Object.keys(groupedWorkouts).length === 0 ? (
        <p>No workouts logged yet.</p>
      ) : (
        <div>
          {Object.entries(groupedWorkouts).map(([date, workouts]) => (
            <div key={date} className="workout-date">
              <h3 className="date-header">{date}</h3>
              <ul className="workout-list">
                {workouts.slice(0, 4).map((workout) => (
                  <li key={workout._id} className="workout-item">
                    {isEditing && editingWorkout._id === workout._id ? (
                      <div className="edit-workout">
                        <input
                          type="number"
                          placeholder="Sets"
                          value={updateData.sets}
                          onChange={(e) =>
                            setUpdateData({
                              ...updateData,
                              sets: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="Reps"
                          value={updateData.reps}
                          onChange={(e) =>
                            setUpdateData({
                              ...updateData,
                              reps: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="Weight"
                          value={updateData.weight}
                          onChange={(e) =>
                            setUpdateData({
                              ...updateData,
                              weight: e.target.value,
                            })
                          }
                        />
                        <button onClick={handleUpdateWorkout}>Update</button>
                        <button onClick={() => setIsEditing(false)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <span>{workout.exerciseType}: </span>
                        <span>{workout.sets} sets, </span>
                        <span>{workout.reps} reps, </span>
                        <span>{workout.weight} lbs</span>
                        <div className="button-group">
                          <button
                            className="edit-button"
                            onClick={() => handleEditWorkout(workout)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteWorkout(workout._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
                {workouts.length > 4 &&
                  !expandedDates[date] && ( // Show Expand button
                    <button
                      className="expand-button"
                      onClick={() => toggleExpand(date)}
                    >
                      Expand
                    </button>
                  )}
                {expandedDates[date] &&
                  workouts.slice(4).map((workout) => (
                    <li key={workout._id} className="workout-item">
                      <span>{workout.exerciseType}: </span>
                      <span>{workout.sets} sets, </span>
                      <span>{workout.reps} reps, </span>
                      <span>{workout.weight} lbs</span>
                      <div className="button-group">
                        <button
                          className="edit-button"
                          onClick={() => handleEditWorkout(workout)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteWorkout(workout._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                {expandedDates[date] && ( // Show Collapse button if expanded
                  <button
                    className="collapse-button"
                    onClick={() => toggleExpand(date)}
                  >
                    Collapse
                  </button>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
