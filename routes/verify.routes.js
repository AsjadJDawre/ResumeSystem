import express from "express";
import { verifyItem } from "../controllers/verification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/:type/:id", verifyJWT, verifyItem);

export default router;
