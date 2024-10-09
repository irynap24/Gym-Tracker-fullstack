import express from "express";
import bodyParser from 'body-parser';
import authRoutes from './authRoutes.js';

const app = express()
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);

})