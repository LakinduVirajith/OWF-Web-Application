import express from "express";
import { getPreSchool, getPrimaryEducation } from "../controllers/coursesController.js"

const router = express.Router();

router.get('/pre-school', getPreSchool);
router.get('/primary-education', getPrimaryEducation);

export default router;