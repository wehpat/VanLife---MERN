import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import vanRouter from "./route/van.route.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use('/api', vanRouter)

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