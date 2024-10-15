models / exerciseModel.js
import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    equipment: { type: String, required: true },
    img: { type: String, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
routes / exerciseRoutes.js
// import express from "express";
// import Exercise from "../models/exerciseModel.js"; // Update this path as needed

// const router = express.Router();

// // Route to get all exercises from a specific collection
// router.get("/:collection", async (req, res) => {
//     const { collection } = req.params;

//     try {
//         const exercises = await Exercise.find({ collection }); // Update query to fetch from the correct collection
//         res.json(exercises);
//     } catch (err) {
//         console.error("Error fetching exercises:", err);
//         res.status(500).json({ error: "Server error: " + err.message });
//     }
// });

// export default router;
