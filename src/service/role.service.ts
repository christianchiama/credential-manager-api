import createHttpError from "http-errors";

import { Role } from "@database/schema/role.schema";
import { Role as IRole } from "@type/role";

function doesRoleExist(name: string): Promise<boolean> {
  /* @ts-ignore*/
  return Role.exists({ name });
}

async function getRoles(): Promise<IRole[]> {
  const roles = await Role.find();
  return roles;
}

async function getRole(id: string): Promise<IRole> {
  const role = await Role.findById(id);
  /* @ts-ignore*/
  return role;
}

async function createRole(body: IRole): Promise<IRole> {
  if (await doesRoleExist(body.name)) {
    throw createHttpError(400, `Role with name ${body.name} already exists`);
  }

  const role = await Role.create(body);
  return role;
}

/**
 *
 * @param id
 * @param body
 * @returns
 */
async function updateRole(id: string, body: IRole): Promise<IRole> {
  const role = await Role.findByIdAndUpdate(id, body, { new: true });
  /* @ts-ignore*/
  return role;
}

async function deleteRole(id: string): Promise<void> {
  await Role.findByIdAndDelete(id);
}

export { getRoles, getRole, createRole, updateRole, deleteRole };
