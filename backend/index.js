import express from "express"
import { PORT, mongoURL } from "./config.js"
import mongoose from "mongoose";
import vansRoute from "./routes/vansRoute.js"
import { Van } from "./model/vanModel.js";
import hostRoute from "./routes/hostRoute.js"

import cors from "cors";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to my VanLIFE project")
})

app.use(cors())

app.use('/vans', vansRoute)
app.use('/host', hostRoute)

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

