import { Request, Response, NextFunction } from "express";
import { HTTPErrorResponse } from "../utils/responseHandler";

export const codeCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return HTTPErrorResponse(
        res,
        400,
        "Access code is required."
      );
    }
    
    const envCode = process.env.ACCESS_CODE;

    if (!envCode) {
      console.error("[ERROR] ACCESS_CODE is not set in environment variables.");
      return HTTPErrorResponse(res, 500, "Server configuration error.");
    }

    if (code !== envCode) {
      console.warn("[WARN] Unauthorized access attempt with code:", code);
      return HTTPErrorResponse(
        res,
        401,
        "Unauthorized. Please enter a valid access code."
      );
    }
    return next();
  } catch (error) {
    console.error("[ERROR] Code check error:", error);
    HTTPErrorResponse(res, 500, "Failed to verify access code.");
  }
};
