import { Request, Response, NextFunction } from 'express'

/**
 *
 * @param request
 * @param response
 * @param next
 */
const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('Method:', request.method)
  console.log('Body:  ', request.body)
  console.log('Path:  ', request.path)
  console.log('Params:', request.params)
  console.log('Query:', request.query)
  console.log('Authorization:', request.headers.authorization)
  next()
}

export { requestLogger }
