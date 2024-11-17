// models / exerciseModel.js
import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    equipment: { type: String, required: true },
    img: { type: String, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;


