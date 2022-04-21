import { Router } from 'express'
import { AuthRoute } from '@route/auth.route'
import { UserRoute } from '@route/user.route'
import { RoleRoute } from '@route/role.route'

import { PATH } from '../config/index'
import { app } from '@@/app'
import { mailer } from '@@/config/mail'

const router: Router = Router()

router.use(PATH.AUTH.BASE, AuthRoute)
router.use(PATH.USER.BASE, UserRoute)
router.use(PATH.ROLE.BASE, RoleRoute)
router.post(PATH.MAILER, mailer)

export default router
