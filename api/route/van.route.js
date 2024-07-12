import express from "express";
import { test } from "../controllers/van.controller.js";

const router = express.Router();

router.get('/van', test)

export default router;