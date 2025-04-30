import express from "express";
import { getFolderAndSubfolders, getImages } from "../controllers/driveController.js";

const router = express.Router();

router.get('/folder', getFolderAndSubfolders);
router.get('/images', getImages);

export default router;
