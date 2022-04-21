/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApiError } from '@util/ApiError'
import httpStatus from 'http-status'
import { logger as Logger } from './logger'
import { NextFunction, Request, Response } from 'express'

const errorConverter = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message as string, true, err.stack)
  }
  next(error)
}

/**
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { statusCode, message } = err
  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
  }
  Logger.error(err)

  res.status(statusCode).send(response)
}

/**
 *
 * @param request
 * @param response
 * @param next
 */
const errorNotFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Api Not found or error in api!'))
}

export { errorConverter, errorHandler, errorNotFoundHandler }
