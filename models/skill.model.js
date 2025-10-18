import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
});

export const Skill = mongoose.model("Skill", skillSchema);
