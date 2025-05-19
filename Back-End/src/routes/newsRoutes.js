import express from "express";
import { getAllNews, getNewsDetails, updateViewCount } from "../controllers/newsController.js"

const router = express.Router();

router.get('/all', getAllNews);
router.get('/details', getNewsDetails);
router.patch('/view', updateViewCount);

export default router;
