import { UserDocument, User as IUser } from "@type/user";
import { User } from "database/schema/user.schema";
import createHttpError from "http-errors";
import { logger as Logger } from "../middleware/logger";

/**
 *
 * @returns
 */
async function countUsers(): Promise<number> {
  const users: number = await User.countDocuments();
  Logger.info(users);
  return users;
}
/**
 *
 * @returns
 */
async function getUsers(): Promise<UserDocument[]> {
  const users: UserDocument[] = await User.find();
  return users;
}

/**
 *
 * @param id
 * @returns
 */
async function getUser(id: string): Promise<UserDocument> {
  const user: any = await User.findById(id);
  Logger.info(user);
  return user;
}

/**
 *
 * @param body
 * @returns
 */
async function createUser(body: IUser): Promise<UserDocument> {
  /* @ts-ignore */
  if (await User.doesEmailExist(body.email)) {
    throw createHttpError(400, "Email already exists");
  }

  const user: UserDocument = await User.create(body);
  Logger.info(user);
  return user;
}

/**
 *
 * @param id
 * @param body
 * @returns
 */
async function updateUser(id: string, body: IUser): Promise<UserDocument> {
  /* @ts-ignore */
  if (await User.doesEmailExist(body.email)) {
    throw createHttpError(400, "Email already exists");
  }

  /* @ts-ignore */
  const user: UserDocument = await User.findByIdAndUpdate(id, body, {
    new: true,
  });
  Logger.info(user);
  return user;
}

/**
 *
 * @param id
 */
async function deleteUser(id: string): Promise<void> {
  await User.findByIdAndDelete(id);
}

export { getUsers, getUser, createUser, updateUser, deleteUser, countUsers };
