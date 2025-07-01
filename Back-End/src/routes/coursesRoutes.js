import express from "express";
import { getPreSchool, getPrimaryEducation, getSports, getMusic, getLanguageTraining, getLanguageTrainingDetails, 
         getVocationalTraining, getVocationalTrainingDetails, submitCourseApplication
} from "../controllers/coursesController.js"

const router = express.Router();

router.get('/pre-school', getPreSchool);
router.get('/primary-education', getPrimaryEducation);
router.get('/sports', getSports);
router.get('/music', getMusic);
router.get('/language-training', getLanguageTraining);
router.get('/language-training/details', getLanguageTrainingDetails);
router.get('/vocational-training', getVocationalTraining);
router.get('/vocational-training/details', getVocationalTrainingDetails);
router.post('/application/submit', submitCourseApplication);

export default router;