import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  summary: { type: String, default: "A passionate learner and developer." },
  education: [
    {
      institute: String,
      degree: String,
      startYear: Number,
      endYear: Number,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      duration: String,
      description: String,
    },
  ],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  updatedAt: { type: Date, default: Date.now },
});

export const Resume = mongoose.model("Resume", resumeSchema);
