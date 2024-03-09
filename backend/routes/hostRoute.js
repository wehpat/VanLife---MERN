import express from "express"
import { Van } from "../model/vanModel.js"

const router = express.Router()

router.get('/vans', async (req, res) => {
    try {
        const hostVans = await Van.find({hostID:"123"})
        return res.status(200).json({
            count: hostVans.length,
            data: hostVans
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({message: err.message})
    }
})

router.get('/vans/:id', async (req, res) => {
    try {
        const { id } = req.params
        const hostVan = await Van.find({_id: id})
        return res.status(200).json({hostVan})

    } catch (err) {
        console.log(err)
        res.status(500).send({message: err.message})
    }
})

export default router;