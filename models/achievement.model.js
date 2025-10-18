import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["course", "internship", "hackathon"], required: true },
  title: { type: String, required: true },
  organization: String,
  certificateLink: String,
  verified: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

export const Achievement = mongoose.model("Achievement", achievementSchema);
