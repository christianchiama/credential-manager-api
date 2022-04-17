import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { ENV } from "../config/index";
import jwt from "jsonwebtoken";

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const secret = <string>ENV.ACCESS_TOKEN_SECRET;
    const decodedToken: any = jwt.verify(token, secret);
    /* @ts-ignore */
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).send("Unauthorized. Invalid token");
  }
};
