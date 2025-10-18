import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  provider: { type: String, default: "External Platform" },
  certificateLink: String,
  verified: { type: Boolean, default: false }
});
export const Course = mongoose.model("Course", courseSchema);
