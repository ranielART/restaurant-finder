import { Request, Response, NextFunction } from "express";


export const codeCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.query;
  if (code !== process.env.ACCESS_CODE) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};