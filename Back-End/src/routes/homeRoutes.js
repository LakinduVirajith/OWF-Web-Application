import express from "express";
import { getHomeCarousel, getHomeCourses, getHomeStaff, PostContactUs, getHomeEvents } from "../controllers/homeController.js";

const router = express.Router();

router.get('/carousel', getHomeCarousel);
router.get('/courses', getHomeCourses);
router.get('/staff', getHomeStaff);
router.post('/contact', PostContactUs);
router.get('/events', getHomeEvents);

export default router;
