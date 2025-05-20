import express from "express";
import { getPreSchool } from "../controllers/coursesController.js"

const router = express.Router();

router.get('/pre-school', getPreSchool);

export default router;