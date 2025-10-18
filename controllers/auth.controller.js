import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { Resume } from "../models/resume.model.js";
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("req.body", req.body);

  if (!name || !email || !password)
    throw new ApiError("All fields are required", 400);

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError("User already exists", 400);

  const user = await User.create({ name, email, password });
    // ✅ Automatically create a blank resume
  await Resume.create({ user: user._id });
  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
    console.log(`req.body`, req.body);
  const user = await User.findOne({ email });
  if (!user) throw new ApiError("Invalid credentials", 401);
    
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError("Invalid credentials", 401);

  const token = user.generateToken();
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
  res
    .cookie("accessToken", token, cookieOptions)
    .status(200)
    .json(new ApiResponse(200, { user }, "Login successful"));
    
  });


export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });
    return res.status(200).json(new ApiResponse(200, null, "Logged out"));
  });