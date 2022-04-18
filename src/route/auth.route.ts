import express from 'express'
import asyncHandler from 'express-async-handler'
import { AuthController } from '../controller'
import { PATH } from '../config/index'

const router: express.Router = express.Router()

router.post(PATH.AUTH.LOGIN, asyncHandler(AuthController.login))
router.post(PATH.AUTH.REGISTER, asyncHandler(AuthController.register))

export { router as AuthRoute }
