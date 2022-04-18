import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
  SERVER_PORT: process.env.PORT,
  DB_PORT: process.env.DB_PORT,
  DB_URI: process.env.DB_URI,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_URI,
  SERVER_PROTOCOL: process.env.SERVER_PROTOCOL,
  SERVER_HOST: process.env.SERVER_HOST,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  NODE_ENV: process.env.NODE_ENV,
}

export const PATH = {
  EMPTY: '/',
  BASE: '/api/v1',
  DOC: '/api/v1/swagger',
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
  },
  USER: {
    BASE: '/users',
    COUNT: '/count',
    ID: '/:id',
  },
  ROLE: {
    BASE: '/roles',
    ID: '/:id',
  },
}

export const config = {
  // JWT Configuration
  jwt: {
    key: ENV.ACCESS_TOKEN_SECRET || 'your_random_jwt_secret_key',
    expiration: 20 * 60 * 1000, // milliseconds (e.g.: 60, "2 days", "10h", "7d")
    algorithm: 'HS384', // (default: HS256)
    cache_prefix: 'token:',
    allow_renew: true,
    renew_threshold: 2 * 60 * 1000,
  },
}

export const CorsOption: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
}

export const EMPTY_STRING = ''
export const SCHEMA_NAME = {
  USER: 'User',
  ROLE: 'Role',
  TOKEN: 'Token',
}

export const ROLE = {
  ADMIN: 'Admin',
  USER: 'User',
  MODERATOR: 'Moderator',
}
