const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('MONGODB_CONNECTION_STRING', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
