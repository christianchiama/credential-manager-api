import { Document } from 'mongoose'
import { Role } from './role'

type UserEmail = string
type UserPassword = string

interface SanitizedError {
  [param: string]: string
}

interface User extends Document {
  id: string
  firstname?: string
  lastname?: string
  username: string
  password: string
  enabled?: Boolean
  email: string
  role: Role
}

interface UserDocument extends User {
  doesPasswordMatch: (password: UserPassword) => Promise<boolean>
}

export { UserEmail, UserPassword, User, UserDocument, SanitizedError }
