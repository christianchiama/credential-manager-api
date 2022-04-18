import express from 'express'
import { PATH, ROLE } from '../config/index'
import { RoleController } from '../controller'
import asyncHandler from 'express-async-handler'
import { isAuthenticated, isAuthorized } from '@middleware/index'
import { registerValidator } from '@middleware/validator'

const router: express.Router = express.Router()

router.get(
  PATH.EMPTY,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.USER)),
  asyncHandler(RoleController.getRoles),
)
router.get(
  PATH.ROLE.ID,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.USER)),
  asyncHandler(RoleController.getRole),
)
router.post(
  PATH.EMPTY,
  isAuthenticated,
  registerValidator,
  asyncHandler(isAuthorized(ROLE.ADMIN)),
  asyncHandler(RoleController.createRole),
)
router.put(
  PATH.ROLE.ID,
  isAuthenticated,
  registerValidator,
  asyncHandler(isAuthorized(ROLE.ADMIN)),
  asyncHandler(RoleController.updateRole),
)
router.delete(
  PATH.ROLE.ID,
  isAuthenticated,
  asyncHandler(isAuthorized(ROLE.ADMIN)),
  asyncHandler(RoleController.deleteRole),
)

export { router as RoleRoute }
