import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  const cookieToken = req.cookies?.accessToken;
  const header = req.headers.authorization;
  const headerToken = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;

  const token = cookieToken || headerToken;
  if (!token) throw new ApiError("Unauthorized access", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    throw new ApiError("Invalid or expired token", 401);
  }
};