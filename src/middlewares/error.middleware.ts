import { Request, Response, NextFunction } from "express";

import { HTTPErrorResponse } from "../utils/responseHandler";
import { CustomError } from "../interfaces/error.interface";



// export const getOnlyRequest = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.method !== "GET") {
//     return HTTPErrorResponse(res, 405, "Only GET requests are accepted");
//   }
//   next();
// };

export const getOnlyRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method !== "GET") {
    const error = new Error("Only GET requests are accepted") as CustomError;
    error.statusCode = 405;
    console.error("Method Not Allowed:", req.method);
    return next(error);
  }
  next();
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as CustomError;
  error.statusCode = 404;
  console.error("Not Found:", req.originalUrl);
  return next(error);
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  
  console.error(`Error [${statusCode}]:`, err.message);
  return HTTPErrorResponse(
    res,
    statusCode,
    err.message || "Something went wrong"
  );
};
