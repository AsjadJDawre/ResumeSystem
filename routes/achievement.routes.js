import express from "express";
import {
  createAchievement,
  getUserAchievements,
  updateAchievement,
  deleteAchievement
} from "../controllers/achievement.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createAchievement);
router.get("/", verifyJWT, getUserAchievements);
router.put("/:achievementId", verifyJWT, updateAchievement); // Update
router.delete("/:achievementId", verifyJWT, deleteAchievement); // Delete


export default router;
