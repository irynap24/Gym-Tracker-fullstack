import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true, // Required for logging workouts
    },
    exerciseType: {
        type: String,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, { collection: 'workouts' }); // Specify the collection name

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
