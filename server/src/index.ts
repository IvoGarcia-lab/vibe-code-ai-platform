import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { serverConfig } from './config/environment.js'
import { validateConfig } from './config/environment.js'
import { connectDatabase } from './config/database.js'
import { createAIResponseTable } from './models/aiResponseModel.js'
import routes from './routes/index.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const initializeApp = async (): Promise<void> => {
  try {
    console.log('🚀 Starting Vibe Code server initialization...')
    console.log(`📊 Environment: ${serverConfig.nodeEnv}`)
    console.log(`🔧 Port: ${serverConfig.port}`)
    console.log(`🔑 GEMINI_API_KEY available: ${!!serverConfig.geminiApiKey}`)
    console.log(`🌍 CORS Origin: ${serverConfig.corsOrigin}`)
    
    validateConfig()
    console.log('✅ Configuration validated')
    
    await connectDatabase()
    console.log('✅ Database connected')
    
    await createAIResponseTable()
    console.log('✅ Database tables created')
    
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
    
    console.log('📡 Setting up routes...')
    app.use('/api', routes)
    console.log('✅ API routes configured')
    
    // Test endpoint to verify server is responding
    app.get('/test', (_req, res) => {
      res.json({ 
        message: 'Server is running!', 
        timestamp: new Date().toISOString(),
        nodeEnv: serverConfig.nodeEnv,
        port: serverConfig.port
      })
    })
    
    // Serve static files in production
    if (serverConfig.nodeEnv === 'production') {
      console.log('🏗️  Configuring production static file serving...')
      // In Docker, client files are at /app/client/dist
      const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist')
      
      console.log(`📁 Serving static files from: ${clientDistPath}`)
      console.log(`📁 Directory exists: ${require('fs').existsSync(clientDistPath)}`)
      
      // Serve static files first
      app.use(express.static(clientDistPath))
      console.log('✅ Static file middleware configured')
      
      // Health check for static files
      app.get('/health-static', (_req, res) => {
        const fs = require('fs')
        const indexPath = path.join(clientDistPath, 'index.html')
        res.json({
          clientPath: clientDistPath,
          exists: fs.existsSync(clientDistPath),
          indexExists: fs.existsSync(indexPath),
          files: fs.existsSync(clientDistPath) ? fs.readdirSync(clientDistPath) : []
        })
      })
      
      // Serve index.html for all other routes (SPA support) - must be after static files
      app.get('*', (_req, res) => {
        console.log(`🌐 SPA route hit: ${_req.url}`)
        const indexPath = path.join(clientDistPath, 'index.html')
        if (require('fs').existsSync(indexPath)) {
          res.sendFile(indexPath)
        } else {
          res.status(404).json({
            error: 'Frontend not found',
            message: 'Client build files not found. Please ensure the client was built successfully.',
            path: indexPath
          })
        }
      })
      console.log('✅ Production routes configured')
    } else {
      // Development mode - API only
      app.get('/', (_req, res) => {
        res.json({
          success: true,
          message: 'Welcome to Vibe Code API',
          version: '1.0.0',
          endpoints: {
            health: '/api/health',
            ai: '/api/ai/generate',
            history: '/api/ai/history'
          }
        })
      })
    }
    
    // Error handlers should be last, but notFoundHandler should be before SPA route in production
    if (serverConfig.nodeEnv !== 'production') {
      app.use(notFoundHandler)
    }
    app.use(errorHandler)
    
    const PORT = serverConfig.port
    
    app.listen(PORT, () => {
      console.log(`🚀 Vibe Code server running on port ${PORT}`)
      console.log(`📝 Environment: ${serverConfig.nodeEnv}`)
      console.log(`🌐 CORS enabled for: ${serverConfig.corsOrigin}`)
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