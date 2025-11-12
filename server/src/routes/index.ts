import { Router } from 'express'
import aiRoutes from './aiRoutes.js'

const router = Router()

router.use('/ai', aiRoutes)

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Vibe Code API is running',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development'
  })
})

export default router