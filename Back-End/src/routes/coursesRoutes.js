import express from "express";
import { getPreSchool, getPrimaryEducation, getSports, getMusic } from "../controllers/coursesController.js"

const router = express.Router();

router.get('/pre-school', getPreSchool);
router.get('/primary-education', getPrimaryEducation);
router.get('/sports', getSports);
router.get('/music', getMusic);

export default router;