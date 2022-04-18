import { SanitizedError } from '@type/user'
import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'

function registerValidator(): ValidationChain[] {
  return [
    body('username').trim().isStrongPassword(),
    body('email').isEmail().normalizeEmail().trim(),
    body('password').trim().isStrongPassword(),
    body('role').trim().isStrongPassword(),
  ]
}

function loginValidator(): ValidationChain[] {
  return [
    body('username').trim().isStrongPassword(),
    body('password').isEmail().normalizeEmail().trim(),
    body('email').isEmail().normalizeEmail().trim(),
  ]
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
function validate(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response<{ validationErrors: SanitizedError[] }> {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const sanitizedErrors: SanitizedError[] = errors
    .array()
    .map(error => ({ [error.param]: error.msg }))

  return res.status(400).json({ validationErrors: sanitizedErrors })
}

export { validate, registerValidator, loginValidator }
