import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import routes from './route'
import express from 'express'
import { json } from 'body-parser'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'
import { CorsOption, PATH } from './config'
import { swagger as swaggerDocument } from './swagger'
import { requestLogger } from '@middleware/error'
import { generalRateLimiter } from './middleware'
import mongoSanitize from 'express-mongo-sanitize'

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

/* mount route on /api/v1 path */
app.use(PATH.BASE, routes)

/* mount swagger on route /api/v1/swagger */
app.use(PATH.DOC, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
