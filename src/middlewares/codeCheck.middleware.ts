import { Request, Response, NextFunction } from "express";
import { CustomError } from "../interfaces/error.interface.js";
export const codeCheck = (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    const error = new Error("Access code is required.") as CustomError;
    error.statusCode = 400;
    return next(error);
  }

  const envCode = process.env.ACCESS_CODE;
  if (!envCode) {
    const error = new Error("Server configuration error.") as CustomError;
    error.statusCode = 500;
    return next(error);
  }

  if (code !== envCode) {
    const error = new Error("Unauthorized. Please enter a valid access code.") as CustomError;
    error.statusCode = 401;
    return next(error);
  }

  next();
};
