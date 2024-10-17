import express from 'express';
import axios from 'axios';

const router = express.Router();

// Fetch all exercises
router.get('/exercises', async (req, res) => {
    try {
        const response = await axios.get('https://wger.de/api/v2/exercise/?language=2', {
            headers: {
                Accept: 'application/json',
            },
        });
        res.json(response.data.results); // Send the exercise data back to the client
    } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({ error: 'Failed to fetch exercises' });
    }
});

// Fetch exercises by body part
router.get('/exercises/bodyPart/:bodyPart', async (req, res) => {
    const { bodyPart } = req.params;

    try {
        // Fetch exercises by body part from Wger API
        const response = await axios.get(`https://wger.de/api/v2/exercise/?language=2&category=${bodyPart}`, {
            headers: {
                Accept: 'application/json',
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

// Fetch exercise details by ID
router.get('/exercises/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`https://wger.de/api/v2/exercise/${id}/`, {
            headers: {
                Accept: 'application/json',
            },
        });
        res.json(response.data); // Send exercise details back to the client
    } catch (error) {
        console.error('Error fetching exercise details:', error);
        res.status(500).json({ error: 'Failed to fetch exercise details' });
    }
});

export default router;
