import express from "express";
import { createSkill, getSkills ,updateSkill,deleteSkill} from "../controllers/skill.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"; // your auth middleware

const router = express.Router();

router.post("/", verifyJWT, createSkill);
router.get("/", verifyJWT, getSkills);

router.put("/:skillId", verifyJWT, updateSkill); // Update skill
router.delete("/:skillId", verifyJWT, deleteSkill); // Delete skill


export default router;
