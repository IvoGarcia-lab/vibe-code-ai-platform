import { Router } from 'express'
import { generateAIResponse, saveGeneratedResponse, getResponseHistory } from '../controllers/aiController.js'
import { generalRateLimiter, strictRateLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/generate', strictRateLimiter, generateAIResponse)
router.post('/save', generalRateLimiter, saveGeneratedResponse)
router.get('/history', generalRateLimiter, getResponseHistory)

export default router