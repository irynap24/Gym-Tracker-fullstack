import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import authRoutes from './authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import 'dotenv/config';
import connectDB from "./db.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


