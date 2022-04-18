import express from 'express'
import asyncHandler from 'express-async-handler'
import { AuthController as Auth } from '../controller'
import { PATH } from '../config/index'
import { loginValidator, registerValidator } from '@middleware/validator'

const router: express.Router = express.Router()

router.post(PATH.AUTH.LOGIN, asyncHandler(Auth.login))
router.post(PATH.AUTH.REGISTER, registerValidator, asyncHandler(Auth.register))

export { router as AuthRoute }
