import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;

