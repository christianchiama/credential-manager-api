import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import routes from './route'
import express from 'express'
import { json } from 'body-parser'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import { CorsOption, PATH } from './config'
import fileUpload from 'express-fileupload'
import { generalRateLimiter } from './middleware'
import mongoSanitize from 'express-mongo-sanitize'
import { swagger as swaggerDocument } from './swagger'
import { requestLogger } from '@@/middleware/requestLogger'
import nodemailer from 'nodemailer'
import { mailer } from '@@/config/mail'
import {
  errorConverter,
  errorHandler,
  errorNotFoundHandler,
} from './middleware/error'

/* express Application */
export const app: express.Application = express()

app.use(json())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(mongoSanitize())
app.use(express.urlencoded({ extended: true }))
app.use(cors(CorsOption))

app.use(requestLogger)
app.use(generalRateLimiter)

/* use file upload */
app.use(
  fileUpload({
    createParentPath: true,
    uploadTimeout: 20000,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024,
    },
  }),
)

/* mount route on /api/v1 path */
app.use(PATH.BASE, routes)

// send back a 404 error for any unknown api request
app.use(errorNotFoundHandler)

/* convert error to ApiError, if needed */
app.use(errorConverter)

/* handle error */
app.use(errorHandler)

/* mount swagger on route /api/v1/swagger */
app.use(PATH.DOC, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
