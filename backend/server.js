import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import authRoutes from './authRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js'; // Make sure the path is correct
import 'dotenv/config';
import connectDB from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes); // Ensure this route is set up

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
