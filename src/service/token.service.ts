import { User } from '@database/schema/user.schema'
import { Token } from '@database/schema/token.schema'
import { BearerToken, TokenDocument } from '@type/token'
import { UserEmail } from '@@/type/user'

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

export { invalidateToken, findToken }
