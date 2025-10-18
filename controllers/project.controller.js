import { Project } from "../models/project.model.js";
import { Resume } from "../models/resume.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

// create Projt
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, technologies, githubLink, liveLink } = req.body;

  if (!title) throw new ApiError("Project title is required", 400);

  const project = await Project.create({
    user: req.user._id,
    title,
    description,
    technologies,
    githubLink,
    liveLink,
  });

  // ⚙️ Integration 
 await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $push: { projects: project._id }, $set: { updatedAt: new Date() } },
    { new: true, upsert: true } // 'upsert' creates one if not found (extra safety)
  );

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

//get user Projectss
export const getUserProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});


// Update Project
export const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const updateData = req.body;

  const project = await Project.findOneAndUpdate(
    { _id: projectId, user: req.user._id },
    updateData,
    { new: true }
  );

  if (!project) throw new ApiError("Project not found", 404);

  // Update resume.updatedAt
  await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $set: { updatedAt: new Date() } }
  );

  return res.status(200).json(new ApiResponse(200, project, "Project updated successfully"));
});



//delete project
export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findOneAndDelete({ _id: projectId, user: req.user._id });
  if (!project) throw new ApiError("Project not found", 404);

  // Remove reference from Resume
  await Resume.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { projects: project._id }, $set: { updatedAt: new Date() } }
  );

  return res.status(200).json(new ApiResponse(200, null, "Project deleted successfully"));
});