import express from "express";
import Workout from "../models/workoutModel.js";

const router = express.Router();

// Route to get all workouts for a user (this also serves as the history route)
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query; // Get userId from query parameters

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        // Fetch workouts for the user
        const workouts = await Workout.find({ userId });

        // If no workouts found, respond accordingly
        if (workouts.length === 0) {
            return res.status(404).json({ message: "No workouts found for this user." });
        }

        res.json(workouts); // Send the workouts back
    } catch (err) {
        console.error("Error fetching workouts:", err);
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

// Route to log a new workout
router.post("/", async (req, res) => {
    const { userId, exerciseType, sets, reps, weight, date } = req.body;

    // Validation (ensure userId and other fields are present)
    if (!userId || !exerciseType || !sets || !reps || !weight || !date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newWorkout = new Workout({
            userId,
            exerciseType,
            sets,
            reps,
            weight,
            date,
        });

        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout); // Return created status
    } catch (err) {
        console.error("Error logging workout:", err);
        res.status(500).json({ error: "Error logging workout: " + err.message });
    }
});

// Route to delete a workout by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        if (!deletedWorkout) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.json({ message: "Workout deleted", deletedWorkout });
    } catch (err) {
        console.error("Error deleting workout:", err);
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

export default router;
