import express from "express";
import { 
  getResume,
  getResumeStats,
  updateEducation,
  updateExperience,
  updateSummary,
  generateAISummary,
  previewAISummary
} from "../controllers/resume.controller.js";
import { generatePDF } from "../controllers/pdf.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Basic resume operations
router.get("/", verifyJWT, getResume);
router.get("/stats", verifyJWT, getResumeStats);

// Manual summary management
router.put("/summary", verifyJWT, updateSummary); // Update summary manually

// AI-powered summary generation
router.post("/generate-summary", verifyJWT, generateAISummary); // Generate and save AI summary
router.post("/preview-summary", verifyJWT, previewAISummary); // Preview AI summary without saving

// Education and experience management
router.put("/education", verifyJWT, updateEducation); // Update education array
router.put("/experience", verifyJWT, updateExperience); // Update experience array

// PDF Export
router.get("/pdf", verifyJWT, generatePDF); // Generate and download resume PDF

export default router;
