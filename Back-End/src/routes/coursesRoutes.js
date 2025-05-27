import express from "express";
import { getPreSchool, getPrimaryEducation, getSports, 
    getMusic, getLanguageTraining, getLanguageTrainingDetails 
} from "../controllers/coursesController.js"

const router = express.Router();

router.get('/pre-school', getPreSchool);
router.get('/primary-education', getPrimaryEducation);
router.get('/sports', getSports);
router.get('/music', getMusic);
router.get('/language-training', getLanguageTraining);
router.get('/language-training/details', getLanguageTrainingDetails);

export default router;