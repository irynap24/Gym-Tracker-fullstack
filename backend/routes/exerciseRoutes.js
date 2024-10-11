import express from 'express';
import axios from 'axios';

const router = express.Router();

// Fetch all exercises
router.get('/exercises', async (req, res) => {
    try {
        const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
            headers: {
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Ensure you have this in your .env file
            },
        });
        res.json(response.data); // Send the response data back to the client
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
});

// Fetch exercises by body part
router.get('/exercises/bodyPart/:bodyPart', async (req, res) => {
    const { bodyPart } = req.params;
    try {
        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
            headers: {
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Ensure you have this in your .env file
            },
        });
        res.json(response.data); // Send the response data back to the client
    } catch (error) {
        console.error('Error fetching exercises by body part:', error);
        res.status(500).json({ error: 'Failed to fetch exercises for the specified body part' });
    }
});

export default router;
