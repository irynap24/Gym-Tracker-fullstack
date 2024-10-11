import express from "express";
import mongoose from "mongoose";
import Workout from "../models/workoutModel.js"; // Importing the Workout model

const router = express.Router();

// Route to get all workouts for a user
router.get("/", async (req, res) => {
    try {
        // Assuming userId is available from authentication (you may need to adjust this)
        const workouts = await Workout.find({ userId: req.user.id });
        res.json(workouts);
    } catch (err) {
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
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

// Export the router for use in other parts of the application
export default router;
