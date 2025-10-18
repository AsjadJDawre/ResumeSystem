import { Skill } from "../models/skill.model.js";
import { Resume } from "../models/resume.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

// Create a new Skill
export const createSkill = asyncHandler(async (req, res) => {
  const { name, level } = req.body;

  if (!name) throw new ApiError("Skill name is required", 400);

  //  Create Skill document
  const skill = await Skill.create({
    user: req.user._id,
    name,
    level: level || "beginner",
  });

  // Update Resume to include this skill
  await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $push: { skills: skill._id }, $set: { updatedAt: new Date() } },
    { new: true, upsert: true } // safety: creates resume if missing
  );

  // 3Return response
  return res
    .status(201)
    .json(new ApiResponse(201, skill, "Skill added successfully"));
});

//  Get all skills for current user
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({ user: req.user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

// update a skill
export const updateSkill = asyncHandler(async (req, res) => {
  const { skillId } = req.params;
  const updateData = req.body;

  const skill = await Skill.findOneAndUpdate(
    { _id: skillId, user: req.user._id },
    updateData,
    { new: true }
  );

  if (!skill) throw new ApiError("Skill not found", 404);

  await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $set: { updatedAt: new Date() } }
  );

  return res.status(200).json(new ApiResponse(200, skill, "Skill updated successfully"));
});

// Delete Skill
export const deleteSkill = asyncHandler(async (req, res) => {
  const { skillId } = req.params;

  const skill = await Skill.findOneAndDelete({ _id: skillId, user: req.user._id });
  if (!skill) throw new ApiError("Skill not found", 404);

  await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { skills: skill._id }, $set: { updatedAt: new Date() } }
  );

  return res.status(200).json(new ApiResponse(200, null, "Skill deleted successfully"));
});
