import { Request, Response, NextFunction } from 'express'

/* middleware for doing role-based permissions */
export function isAuthorized(...permittedRoles: any[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (typeof permittedRoles === 'string') {
      permittedRoles = [permittedRoles]
    }
    /* @ts-ignore */
    const { user } = request

    if (permittedRoles.length && permittedRoles.includes(user.role.name)) {
      next()
    } else {
      response
        .status(403)
        .json({ message: 'Forbidden.You have not the right permissions' })
    }
  }
}
