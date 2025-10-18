import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const errorMiddleware = (err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  if (err instanceof ApiError) {
    return res
      .status(err.statusCode || 500)
      .json(
        new ApiResponse(
          err.statusCode || 500,
          null,
          err.message || "Internal Server Error"
        )
      );
  }

  return res
    .status(500)
    .json(new ApiResponse(500, null, "Internal Server Error"));
};
