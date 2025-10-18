import { Resume } from "../models/resume.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { generateResumePDF } from "../utils/pdf-generator.js";

export const generatePDF = asyncHandler(async (req, res) => {
  // Use the authenticated user's ID from JWT token (already decoded by middleware)
  const userId = req.user._id;

  // Fetch user data
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  // Fetch resume with populated data
  const resume = await Resume.findOne({ user: userId })
    .populate("projects")
    .populate("achievements")
    .populate("skills");

  if (!resume) {
    throw new ApiError("Resume not found for this user", 404);
  }

  // Check if user has sufficient data for PDF generation
  const hasData = resume.projects?.length > 0 || 
                 resume.achievements?.length > 0 || 
                 resume.skills?.length > 0 || 
                 resume.education?.length > 0 || 
                 resume.experience?.length > 0;

  if (!hasData) {
    return res.status(400).json(
      new ApiResponse(400, {
        message: "Insufficient data for PDF generation",
        suggestion: "Please add at least one of the following: projects, skills, achievements, education, or experience before generating your resume PDF.",
        requiredFields: ["projects", "skills", "achievements", "education", "experience"]
      }, "Cannot generate PDF - insufficient resume data")
    );
  }

  // Generate PDF
  const pdfBuffer = await generateResumePDF(user, resume);

  // Set response headers for PDF download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="resume_${user.name.replace(/\s+/g, "_")}.pdf"`
  );
  res.setHeader("Content-Length", pdfBuffer.length);

  // Send PDF
  res.send(pdfBuffer);
});
