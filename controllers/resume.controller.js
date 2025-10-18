import { Resume } from "../models/resume.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.model.js";
import { Achievement } from "../models/achievement.model.js";
import { Skill } from "../models/skill.model.js";
import { generateResumeSummary, generateSummaryVariations } from "../utils/ai-service.js";

export const getResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ user: req.user._id })
    .populate("projects")
    .populate("achievements")
    .populate("skills");

  return res
    .status(200)
    .json(new ApiResponse(200, resume, "Resume fetched successfully"));
});



export const updateSummary = asyncHandler(async (req, res) => {
  const { summary } = req.body;

  const resume = await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $set: { summary, updatedAt: new Date() } },
    { new: true }
  );

  if (!resume) throw new ApiError("Resume not found", 404);
  return res.status(200).json(new ApiResponse(200, resume, "Summary updated successfully"));
});

// Update Education
export const updateEducation = asyncHandler(async (req, res) => {
  const { education } = req.body; // array of education objects

  const resume = await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $set: { education, updatedAt: new Date() } },
    { new: true }
  );

  if (!resume) throw new ApiError("Resume not found", 404);
  return res.status(200).json(new ApiResponse(200, resume, "Education updated successfully"));
});

// Update Experience
export const updateExperience = asyncHandler(async (req, res) => {
  const { experience } = req.body; // array of experience objects

  const resume = await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $set: { experience, updatedAt: new Date() } },
    { new: true }
  );

  if (!resume) throw new ApiError("Resume not found", 404);
  return res.status(200).json(new ApiResponse(200, resume, "Experience updated successfully"));
});

export const getResumeStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [projects, achievements, skills] = await Promise.all([
    Project.find({ user: userId }),
    Achievement.find({ user: userId }),
    Skill.find({ user: userId }),
  ]);

  const stats = {
    totalProjects: projects.length,
    verifiedProjects: projects.filter((p) => p.verified).length,
    totalAchievements: achievements.length,
    verifiedAchievements: achievements.filter((a) => a.verified).length,
    totalSkills: skills.length,
    verifiedSkills: skills.filter((s) => s.verified).length,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, stats, "Resume stats fetched successfully"));
});

// AI-powered summary generation
export const generateAISummary = asyncHandler(async (req, res) => {
  console.log(`[${new Date().toISOString()}] /generate-summary called`);

  const { variations = false, count = 3 } = req.query;

  // Fetch resume with all relevant populated fields
  const resume = await Resume.findOne({ user: req.user._id })
    .populate("projects")
    .populate("achievements")
    .populate("skills")
    .populate("education")
    .populate("experience");

  console.log(`[${new Date().toISOString()}] Resume fetched`);

  if (!resume) {
    console.log(`[${new Date().toISOString()}] Resume not found`);
    throw new ApiError("Resume not found", 404);
  }

  // Check if user has enough data for summary generation
  const hasData = resume.projects.length > 0 ||
                  resume.achievements.length > 0 ||
                  resume.skills.length > 0 ||
                  resume.education.length > 0 ||
                  resume.experience.length > 0;

  if (!hasData) {
    console.log(`[${new Date().toISOString()}] Insufficient data`);
    throw new ApiError(
      "Insufficient data to generate summary. Please add projects, skills, achievements, education, or experience first.",
      400
    );
  }

  try {
    if (variations === 'true') {
      console.log(`[${new Date().toISOString()}] Generating multiple variations`);

      const summaryVariations = await generateSummaryVariations(resume, parseInt(count));

      console.log(`[${new Date().toISOString()}] Variations generated`);

      return res
        .status(200)
        .json(new ApiResponse(
          200,
          {
            variations: summaryVariations,
            generatedAt: new Date()
          },
          "AI summary variations generated successfully"
        ));
    } else {
      console.log(`[${new Date().toISOString()}] Generating single AI summary`);

      const generatedSummary = await generateResumeSummary(resume);

      console.log(`[${new Date().toISOString()}] AI summary generated`);

      const updatedResume = await Resume.findOneAndUpdate(
        { user: req.user._id },
        { 
          $set: { 
            summary: generatedSummary, 
            updatedAt: new Date() 
          } 
        },
        { new: true }
      );

      console.log(`[${new Date().toISOString()}] Resume updated with summary`);

      return res
        .status(200)
        .json(new ApiResponse(
          200,
          {
            summary: generatedSummary,
            resume: updatedResume,
            generatedAt: new Date()
          },
          "AI summary generated and saved successfully"
        ));
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] AI Summary Generation Error:`, error);
    throw error;
  }
});


// Preview AI summary without saving
export const previewAISummary = asyncHandler(async (req, res) => {
  try {
    // Fetch complete resume data with populated references
    const resume = await Resume.findOne({ user: req.user._id })
      .populate("projects")
      .populate("achievements")
      .populate("skills");

    if (!resume) {
      throw new ApiError("Resume not found", 404);
    }

    // Check if user has sufficient data for AI generation
    const hasData = resume.projects?.length > 0 || 
                   resume.skills?.length > 0 || 
                   resume.education?.length > 0 || 
                   resume.experience?.length > 0 || 
                   resume.achievements?.length > 0;

    if (!hasData) {
      throw new ApiError("Insufficient data for AI summary generation. Please add projects, skills, education, or experience first.", 400);
    }

    // Generate AI summary (preview only - not saved)
    const aiSummary = await generateResumeSummary(resume);

    return res.status(200).json(
      new ApiResponse(200, {
        currentSummary: resume.summary,
        previewSummary: aiSummary,
        hasChanges: resume.summary !== aiSummary
      }, "AI summary preview generated successfully")
    );

  } catch (error) {
    console.error("AI Summary Preview Error:", error);
    
    // Handle specific AI service errors
    if (error.message?.includes('rate limit') || error.message?.includes('Rate limit')) {
      throw new ApiError("AI service is currently busy. Please try again in a few moments.", 429);
    }
    
    if (error.message?.includes('quota') || error.message?.includes('Quota')) {
      throw new ApiError("AI service quota exceeded. Please try again later.", 503);
    }
    
    if (error.message?.includes('model') || error.message?.includes('Model')) {
      throw new ApiError("AI model temporarily unavailable. Please try again later.", 503);
    }
    
    if (error.message?.includes('unauthorized') || error.message?.includes('Unauthorized')) {
      throw new ApiError("AI service configuration error. Please contact support.", 500);
    }
    
    // Re-throw ApiError instances
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Generic error fallback
    throw new ApiError("Failed to generate AI summary preview. Please try again.", 500);
  }
});

