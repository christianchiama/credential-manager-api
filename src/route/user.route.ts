import express from 'express'
import asyncHandler from 'express-async-handler'
import { UserController as user } from '../controller'
import { PATH, ROLE } from '../config/index'
import { isAuthenticated, isAuthorized } from '@middleware/index'
import { validate } from '@@/middleware/validator'
import { mailer } from '@@/config/mail'

const router: express.Router = express.Router()

router.get(
  PATH.EMPTY,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.USER)),
  asyncHandler(user.getUsers),
)
router.get(
  PATH.USER.COUNT,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.USER)),
  asyncHandler(user.countUsers),
)
router.get(
  PATH.USER.ID,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.USER)),
  asyncHandler(user.getUser),
)
router.post(
  PATH.EMPTY,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.USER)),
  asyncHandler(user.createUser),
)
router.put(
  PATH.USER.ID,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.USER)),
  asyncHandler(user.updateUser),
)
router.delete(
  PATH.USER.ID,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.USER)),
  asyncHandler(user.deleteUser),
)

export { router as UserRoute }
