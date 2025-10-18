import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  technologies: [String],
  githubLink: String,
  liveLink: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model("Project", projectSchema);
