import { Request, Response, NextFunction } from "express";

import { RoleService } from "@service/index";
import { Role } from "@type/role";

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function getRoles(req: Request, res: Response, next: NextFunction) {
  const roles: Role[] = await RoleService.getRoles();
  res.status(200).json(roles);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function getRole(req: Request, res: Response, next: NextFunction) {
  const role: Role = await RoleService.getRole(req.params.id);
  res.status(200).json(role);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function createRole(req: Request, res: Response, next: NextFunction) {
  const role: Role = await RoleService.createRole(req.body);
  res.status(201).json(role);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function updateRole(req: Request, res: Response, next: NextFunction) {
  const role: Role = await RoleService.updateRole(req.params.id, req.body);
  res.status(200).json(role);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
async function deleteRole(req: Request, res: Response, next: NextFunction) {
  await RoleService.deleteRole(req.params.id);
  res.status(200).send();
}

export { getRoles, getRole, createRole, updateRole, deleteRole };
