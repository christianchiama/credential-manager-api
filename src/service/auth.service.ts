import Jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import { TokenResponse } from '@type/token'
import { User } from 'database/schema/user.schema'
import { EMPTY_STRING, ENV } from '../config/index'
import { UserDocument, User as IUser } from '@type/user'
import { logger } from '../middleware/logger'

/**
 *
 * @param user
 * @returns
 */
async function register(user: IUser): Promise<UserDocument> {
  if (await User.doesEmailExist(user.email)) {
    throw createHttpError(400, 'Email already exist')
  }
  const createdUser = await User.create(user)
  return createdUser
}

/**
 *
 * @param credentials
 * @returns
 */
async function login(credentials: IUser): Promise<TokenResponse> {
  const user = await User.findOne({ email: credentials.email })

  if (!user || !(await user.doesPasswordMatch(credentials.password))) {
    throw createHttpError(401, 'Email or password incorrect')
  } else {
    let token = <any>EMPTY_STRING
    token = generateAccessToken(user)
    return { token }
  }
}

/**
 *
 * @param username
 * @returns
 */
export function generateAccessToken(user: UserDocument) {
  const secretKey = <string>ENV.ACCESS_TOKEN_SECRET
  logger.info(user)
  return Jwt.sign(
    {
      id: user.id,
      name: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    },
    secretKey,
  )
}

export { register, login }
