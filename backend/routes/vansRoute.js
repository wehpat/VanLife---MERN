import express from "express"
import { Van } from "../model/vanModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const van = await Van.findById(id)
        return res.status(200).json(van)
        
    } catch (err) {
        console.log(err)
        res.status(500).send({messsage: err.messsage})
    }
})

export default router;