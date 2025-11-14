import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { GoogleGenAI } from '@google/genai'

const app = express()
const PORT = process.env['PORT'] || 3001
const NODE_ENV = process.env['NODE_ENV'] || 'production'
const GEMINI_API_KEY = process.env['GEMINI_API_KEY'] || ''

// Initialize Gemini AI client
let genAI: GoogleGenAI | null = null
if (GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY })
    console.log('✅ Gemini AI client initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize Gemini AI:', error)
  }
}

console.log('🚀 Starting Vibe Code server...')
console.log(`📊 Environment: ${NODE_ENV}`)
console.log(`🔧 Port: ${PORT}`)
console.log(`🔑 GEMINI_API_KEY available: ${!!GEMINI_API_KEY}`)

// Basic middleware
app.use(helmet())
app.use(compression())
app.use(morgan('combined'))
app.use(cors({
  origin: process.env['CORS_ORIGIN'] || '*',
  credentials: true,
  optionsSuccessStatus: 200,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Basic test endpoint
app.get('/api/test', (_req, res) => {
  console.log('📡 Test endpoint hit!')
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    nodeEnv: NODE_ENV,
    port: PORT,
    geminiKeyAvailable: !!GEMINI_API_KEY
  })
})

// Health check
app.get('/api/health', (_req, res) => {
  console.log('📡 Health check hit!')
  res.json({
    success: true,
    message: 'Vibe Code API is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    geminiKeyAvailable: !!GEMINI_API_KEY
  })
})

// Simple AI endpoint (without database)
app.post('/api/ai/generate', async (req, res): Promise<void> => {
  console.log('📡 AI generate endpoint hit!')
  
  if (!genAI) {
    res.status(503).json({
      success: false,
      error: 'Gemini API key not configured',
      message: 'AI features are currently disabled. Please configure GEMINI_API_KEY.'
    })
    return
  }

  try {
    const { prompt, context } = req.body
    
    if (!prompt) {
      res.status(400).json({
        success: false,
        error: 'Prompt is required'
      })
      return
    }

    console.log(`🤖 Generating AI response for prompt: "${prompt.substring(0, 100)}..."`)
    
    // Create context-aware prompt
    const fullPrompt = context 
      ? `Context: ${context}\n\nUser Request: ${prompt}`
      : prompt

    // Generate content using Gemini AI
    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt
    })

    const responseText = result.text || 'No response generated'

    console.log('✅ AI response generated successfully')

    const response = {
      success: true,
      data: {
        response: responseText,
        model: 'gemini-2.5-flash',
        timestamp: new Date().toISOString(),
        prompt: prompt,
        context: context || null
      }
    }

    res.json(response)
  } catch (error) {
    console.error('❌ AI generation error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI response',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Root endpoint for Vercel
app.get('/', (_req, res) => {
  res.json({
    message: 'Vibe Code AI Platform API',
    version: '1.0.0',
    endpoints: {
      test: '/api/test',
      health: '/api/health',
      ai: '/api/ai/generate'
    },
    environment: NODE_ENV,
    geminiKeyAvailable: !!GEMINI_API_KEY
  })
})

// Error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('❌ Server error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err instanceof Error ? err.message : 'Unknown error'
  })
})

// 404 handler
app.use((_req, res) => {
  console.log(`❌ 404 - Route not found: ${_req.url}`)
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `The endpoint ${_req.url} does not exist`
  })
})

// For Vercel serverless functions
export default app

// For local development (optional)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🎉 Vibe Code server started successfully!`)
    console.log(`🌐 Server running on port ${PORT}`)
    console.log(`🔧 Environment: ${NODE_ENV}`)
    console.log(`📡 Available endpoints:`)
    console.log(`   - http://localhost:${PORT}/api/test`)
    console.log(`   - http://localhost:${PORT}/api/health`)
    console.log(`   - http://localhost:${PORT}/api/ai/generate`)
  })
}