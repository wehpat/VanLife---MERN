import express from "express"
import { PORT, mongoURL } from "./config.js"
import mongoose from "mongoose";
import { Van } from "../backend/model/vanModel.js"

const app = express();

app.get("/", (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to my VanLIFE project")
})

app.get("/vans", async (req, res) => {
    try {
        const vans = await Van.find({});

        return res.status(200).json({
            count: vans.length,
            data: vans
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({messsage: err.messsage})
    }
})

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("App is connected to mongoDB");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((err) => {
        console.log(err);
    })

