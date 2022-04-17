import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import routes from "./route";
import express, { NextFunction, Request, Response } from "express";
import { CorsOption, PATH } from "./config";
import { json } from "body-parser";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import { requestLogger, unknownEndpoint } from "@middleware/error";

export const app: express.Application = express();

app.use(json());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CorsOption));

app.use(requestLogger);

/* mount route on /api/v1 path */
app.use(PATH.BASE, routes);
