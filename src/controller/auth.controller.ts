import { Request, Response, NextFunction } from 'express'
import { AuthService } from '@service/index'
import { TokenResponse } from '@type/token'

/**
 *
 * @param req
 * @param res
 * @param _next
 */
async function register(req: Request, res: Response, _next: NextFunction) {
  const user = await AuthService.register(req.body)
  res.status(201).json(user)
}

/**
 *
 * @param req
 * @param res
 * @param _next
 */
async function login(
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> {
  const tokenResponse: TokenResponse = await AuthService.login(req.body)
  res.status(200).json({ token: tokenResponse.token })
}

export { register, login }
