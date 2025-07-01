import express from "express";
import { getAllStaff, getStaffDetails } from "../controllers/staffController.js";

const router = express.Router();

router.get('/all', getAllStaff);
router.get('/details', getStaffDetails);

export default router;
