// // server.js
// import express from "express";
// import cors from "cors";
// import bodyParser from 'body-parser';
// import authRoutes from './authRoutes.js';
// import workoutRoutes from './routes/workoutRoutes.js'; // Import the workout routes
// import exerciseRoutes from './routes/exerciseRoutes.js';
// import 'dotenv/config';
// import connectDB from "./db.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB();

// // Middleware
// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend URL in production
// }));

// app.use(bodyParser.json()); // Parse incoming JSON requests

// // Define routes
// app.use('/api/auth', authRoutes);
// app.use('/api/workouts', workoutRoutes); // This handles the history route too
// app.use('/api/exercises', exerciseRoutes);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on PORT ${PORT}`);
// });
// server.js
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

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
