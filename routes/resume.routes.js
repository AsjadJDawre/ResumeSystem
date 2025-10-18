import express from "express";
import { getResume,getResumeStats,updateEducation,updateExperience,updateSummary } from "../controllers/resume.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verifyJWT, getResume);
router.put("/summary", verifyJWT, updateSummary); // Update summary
router.put("/education", verifyJWT, updateEducation); // Update education array
router.put("/experience", verifyJWT, updateExperience); // Update experience array

router.get("/stats", verifyJWT, getResumeStats);

export default router;
