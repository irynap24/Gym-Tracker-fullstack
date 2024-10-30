import express from 'express';
import axios from 'axios';

const router = express.Router();
const NINJAS_API_KEY = process.env.NINJAS_API_KEY;
// Route to get all workouts for a user (this also serves as the history route)
router.get("/exercises", async (req, res) => {
    try {
        // Fetch all exercises from the Ninjas Exercise API
        const response = await axios.get('https://api.api-ninjas.com/v1/exercises',
            {
                headers: {
                    'X-Api-Key': NINJAS_API_KEY
                }
            })

        // Get the full list of exercises
        const exercises = response.data;

        // Helper function to get random elements from an array
        const getRandomExercises = (arr, num = 5) => {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num); // Return 'num' random exercises
        }

        // Get a random subset of exercises
        const randomExercises = getRandomExercises(exercises, 5)
        res.json(randomExercises) // Sends the random exercises to the client

    } catch (error) {
        console.error("Error fetching exercises:", error)
        res.status(500).json({ error: "Failed to fetch exercises" })
    }
});

// Fetch exercises by body part
router.get('/exercises/bodyPart/:bodyPart', async (req, res) => {
    const { bodyPart } = req.params;

    try {
        // Fetch exercises by body part fNinja Exercise API
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${bodyPart}`, {
            headers: {
                'X-Api-Key': NINJAS_API_KEY
            },
        });

        // If exercises are found, send them back to the client
        if (Array.isArray(response.data.results) && response.data.results.length > 0) {
            res.json(response.data.results);
        } else {
            res.status(404).json({ message: 'No exercises found for this body part.' });
        }
    } catch (error) {
        console.error('Error fetching exercises by body part:', error);
        res.status(500).json({ error: 'Failed to fetch exercises for the specified body part' });
    }
});


export default router;
