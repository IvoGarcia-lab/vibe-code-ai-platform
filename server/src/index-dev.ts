import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { serverConfig } from './config/environment-dev-fixed.js'
import { validateConfig } from './config/environment-dev-fixed.js'
import { connectDatabase } from './config/database-dev.js'
import routes from './routes/index.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

const initializeApp = async (): Promise<void> => {
  try {
    validateConfig()
    await connectDatabase()
    
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }))
    
    app.use(compression())
    app.use(morgan('combined'))
    
    app.use(cors({
      origin: serverConfig.corsOrigin,
      credentials: true,
      optionsSuccessStatus: 200,
    }))
    
    app.use(express.json({ limit: '10mb' }))
    app.use(express.urlencoded({ extended: true, limit: '10mb' }))
    
    app.use('/api', routes)
    
    app.get('/', (_req, res) => {
      res.json({
        success: true,
        message: 'Welcome to Vibe Code API (Development Mode)',
        version: '1.0.0',
        mode: 'development',
        endpoints: {
          health: '/api/health',
          ai: '/api/ai/generate',
          history: '/api/ai/history'
        },
        notes: [
          'Running with in-memory database',
          'Data will not persist between restarts',
          'Set GEMINI_API_KEY environment variable for real AI responses'
        ]
      })
    })
    
    app.use(notFoundHandler)
    app.use(errorHandler)
    
    const PORT = serverConfig.port
    
    app.listen(PORT, () => {
      console.log(`🚀 Vibe Code server running on port ${PORT}`)
      console.log(`📝 Environment: ${serverConfig.nodeEnv}`)
      console.log(`🌐 CORS enabled for: ${serverConfig.corsOrigin}`)
      console.log(`💡 Note: Running in development mode with mock AI responses`)
    })
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error)
    process.exit(1)
  }
}

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

initializeApp()

export default app