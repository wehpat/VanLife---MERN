import express from "express";
import { test, createVan, getVans, getVan } from "../controllers/van.controller.js";

const router = express.Router();

router.get('/van', test)
router.post('/createVan', createVan)
router.get('/getVans', getVans)
router.get('/getVan/:vanId', getVan )

export default router;