import session, { SessionOptions } from "express-session"
import { RedisStore } from "connect-redis"
import { env } from "@config/env"
import { redisClient } from "@infrastructures/redis-client"
import { ONE_DAY_IN_SEC, REDIS_PREFIX, SESSION_NAME } from "@utils/constants"
import { cookieOptions } from "@config/cookie-options"

const sessionStore = new RedisStore({
  client: redisClient,
  prefix: REDIS_PREFIX,
  ttl: ONE_DAY_IN_SEC,
})

const sessionOptions: SessionOptions = {
  name: SESSION_NAME,
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: cookieOptions,
  store: sessionStore,
}

export const sessionMiddleware = session(sessionOptions)
