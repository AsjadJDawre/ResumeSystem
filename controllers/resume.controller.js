import { Resume } from "../models/resume.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.model.js";
import { Achievement } from "../models/achievement.model.js";
import { Skill } from "../models/skill.model.js";

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

