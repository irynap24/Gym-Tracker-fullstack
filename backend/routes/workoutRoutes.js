import express from 'express';
import Workout from '../models/workoutModel.js'; // Ensure the path is correct

const router = express.Router();

// POST /api/workouts
router.post('/', async (req, res) => {
    const { userId, exerciseType, sets, reps, weight, date } = req.body;

    // Validate input
    if (!userId || !exerciseType || sets === undefined || reps === undefined || weight === undefined || !date) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Create a new workout instance
        const newWorkout = new Workout({
            userId,
            exerciseType,
            sets,
            reps,
            weight,
            date,
        });

        // Save the workout to the database
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        console.error('Error saving workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
