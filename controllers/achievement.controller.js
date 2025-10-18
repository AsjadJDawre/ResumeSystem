import { Achievement } from "../models/achievement.model.js";
import { Resume } from "../models/resume.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

//create an achivemnt
export const createAchievement = asyncHandler(async (req, res) => {
  const { type, title, organization, certificateLink } = req.body;

  if (!type || !title)
    throw new ApiError("Type and title are required", 400);

  const achievement = await Achievement.create({
    user: req.user._id,
    type,
    title,
    organization,
    certificateLink,
  });

 await Resume.findOneAndUpdate(
  { user: req.user._id },
  { $push: { achievements: achievement._id }, $set: { updatedAt: new Date() } },
  { new: true, upsert: true }
);


  return res
    .status(201)
    .json(new ApiResponse(201, achievement, "Achievement added successfully"));
});

// get them
export const getUserAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({ user: req.user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, achievements, "Achievements fetched"));
});

// update an achievment
export const updateAchievement = asyncHandler(async (req, res) => {
  const { achievementId } = req.params;
  const updateData = req.body;

  const achievement = await Achievement.findOneAndUpdate(
    { _id: achievementId, user: req.user._id },
    updateData,
    { new: true }
  );

  if (!achievement) throw new ApiError("Achievement not found", 404);

  await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $set: { updatedAt: new Date() } }
  );

  return res.status(200).json(new ApiResponse(200, achievement, "Achievement updated successfully"));
});

// Delete Achievement
export const deleteAchievement = asyncHandler(async (req, res) => {
  const { achievementId } = req.params;

  const achievement = await Achievement.findOneAndDelete({ _id: achievementId, user: req.user._id });
  if (!achievement) throw new ApiError("Achievement not found", 404);

  await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { achievements: achievement._id }, $set: { updatedAt: new Date() } }
  );

  return res.status(200).json(new ApiResponse(200, null, "Achievement deleted successfully"));
});
