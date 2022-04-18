import Jwt from 'jsonwebtoken'
import { addHours } from 'date-fns'
import { config } from '@config/index'
import { User } from '@database/schema/user.schema'
import { UserDocument, UserEmail } from '@type/user'
import { Token } from '@database/schema/token.schema'
import { BearerToken, Payload, TokenResponse, TokenDocument } from '@type/token'

/**
 *
 * @param email
 * @param token
 * @param expirationDate
 * @returns
 */
async function invalidateToken(
  email: UserEmail,
  token: BearerToken,
  expirationDate: Date,
): Promise<TokenDocument> {
  const user = await User.findOne({ email })

  return Token.create({
    token,
    /*@ts-ignore*/
    user: user.id,
    expirationDate,
  })
}

function findToken(token: BearerToken) {
  return Token.findOne({
    token,
  })
}

/**
 *
 * @param user
 * @returns
 */
async function createToken(user: UserDocument): Promise<TokenResponse> {
  const expirationDate: Date = addHours(
    new Date(),
    Number(config.jwt.expiration),
  )

  const payload: Payload = {
    sub: user.id,
    iat: Math.floor(Date.now() / 1000),
    exp:
      Math.floor(Date.now() / 1000) + 60 * 60 * Number(config.jwt.expiration), // 24 h
    issuer: user.email,
  }

  const token: BearerToken = Jwt.sign(payload, config.jwt.key)

  return {
    token,
    expirationDate,
  }
}

export { createToken, invalidateToken, findToken }
