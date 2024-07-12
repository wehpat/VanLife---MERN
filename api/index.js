import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;




mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDB is connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port 3000`);
        });
    })
    .catch((err) => {
        console.log(err);
    })