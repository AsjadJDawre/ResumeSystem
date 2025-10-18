import express from "express";
import {
  createProject,
  getUserProjects,
  deleteProject,
  updateProject
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createProject);
router.get("/", verifyJWT, getUserProjects);
router.put("/:projectId", verifyJWT, updateProject); // Update project
router.delete("/:projectId", verifyJWT, deleteProject); // Delete project

export default router;
