import express from 'express';
import { getAllEvents, getEventsDetails, updateViewCount } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/all', getAllEvents);
router.get('/details', getEventsDetails);
router.patch('/view', updateViewCount);

export default router;
