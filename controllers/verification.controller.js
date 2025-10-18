import { Project } from "../models/project.model.js";
import { Achievement } from "../models/achievement.model.js";
import { Skill } from "../models/skill.model.js";
import { Course } from "../models/course.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const verifyItem = asyncHandler(async (req, res) => {
let { type, id } = req.params;
type = type?.toLowerCase();
console.log(`type ${type}, Id ${id}`)
  const models = {
    project: Project,
    achievement: Achievement,
    skill: Skill,
    course: Course,
  };

  const Model = models[type];
  if (!Model) throw new ApiError("Invalid type for verification", 400);

  const item = await Model.findById(id);
  if (!item) throw new ApiError(`${type} not found`, 404);

  item.verified = true;
  await item.save();

  return res
    .status(200)
    .json(new ApiResponse(200, item, `${type} verified successfully`));
});
