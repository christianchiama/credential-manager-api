import { Document } from "mongoose";
import { Role } from "./role";

type UserEmail = string;
type UserPassword = string;

export interface IQueryData {
  page: number;
  size: number;
  sortType: string;
  deletedAt: number; // Always filter deleted documents
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // needs to specified later based on entity or model
}

interface User extends Document {
  id: string;
  firstname?: string;
  lastname?: string;
  username: string;
  password: string;
  email: string;
  role: Role;
}

interface UserDocument extends User {
  doesPasswordMatch: (password: UserPassword) => Promise<boolean>;
}

export { UserEmail, UserPassword, User, UserDocument };
