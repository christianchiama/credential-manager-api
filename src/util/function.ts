import { NextFunction, Request, Response } from "express";
import jwtDecode from "jwt-decode";
import { Payload } from "@type/token";

/**
 *
 * @param fn
 * @returns
 */
const catchAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 *
 * @param req
 * @returns
 */
const getTokenFromHeader = (req: Request): string | null => {
  if (req.headers?.authorization) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

/**
 *
 * @param token
 * @returns
 */
const getJwtPayload = (token: string): Payload => {
  return jwtDecode(token);
};

export { catchAsync, getTokenFromHeader, getJwtPayload };
