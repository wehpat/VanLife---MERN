import express from "express";
import { createVan, test } from "../controllers/van.controller.js";

const router = express.Router();

router.get('/van', test)
router.post('/createVan', createVan)

export default router;