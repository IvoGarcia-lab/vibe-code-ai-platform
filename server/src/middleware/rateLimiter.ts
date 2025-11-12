import rateLimit from 'express-rate-limit'
import { serverConfig } from '../config/environment.js'

export const createRateLimiter = (windowMs: number = serverConfig.rateLimitWindow, max: number = serverConfig.rateLimitMax) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
}

export const strictRateLimiter = createRateLimiter(900000, 10) // 15 minutes, 10 requests
export const generalRateLimiter = createRateLimiter(900000, 100) // 15 minutes, 100 requests