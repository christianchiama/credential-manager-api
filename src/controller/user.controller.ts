import { IQueryData, UserDocument } from "@type/user";
import { Request, Response, NextFunction } from "express";
import { UserService } from "@service/index";

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function countUsers(req: Request, res: Response, next: NextFunction) {
  const users: number = await UserService.countUsers();
  res.status(200).json(users);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function getUsers(req: Request, res: Response, next: NextFunction) {
  const users: UserDocument[] = await UserService.getUsers();
  res.status(200).json(users);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function getUser(req: Request, res: Response, next: NextFunction) {
  const user: UserDocument = await UserService.getUser(req.params.id);
  res.status(200).json(user);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function createUser(req: Request, res: Response, next: NextFunction) {
  const user: UserDocument = await UserService.createUser(req.body);
  res.status(201).json(user);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function updateUser(req: Request, res: Response, next: NextFunction) {
  const user: UserDocument = await UserService.updateUser(
    req.params.id,
    req.body
  );
  res.status(200).json(user);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function deleteUser(req: Request, res: Response, next: NextFunction) {
  await UserService.deleteUser(req.params.id);
  res.status(200).send();
}

export { getUsers, getUser, createUser, updateUser, deleteUser, countUsers };
