import express from 'express'
import { registerUser, loginUser } from './auth.js'

const router = express.Router()

// Register route
router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;  // Extract all fields from the request body
    try {
        // Register user with email and password (using Firebase auth service)
        const user = await registerUser(email, password);

        // Save additional information to  database (for user profile table/collection)
        await saveUserProfile(user.uid, { firstName, lastName, username, email });

        // Return success response
        res.status(201).json({ message: 'User registered successfully!', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Login route

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password)
        res.status(200).json({ message: "User logged in sucessfully", user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

export default router;