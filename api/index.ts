import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GoogleGenAI } from '@google/genai'

// Initialize Gemini AI client
const GEMINI_API_KEY = process.env['GEMINI_API_KEY'] || ''
let genAI: GoogleGenAI | null = null

if (GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY })
    console.log('✅ Gemini AI client initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize Gemini AI:', error)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET' && req.url === '/api/health') {
      return res.status(200).json({
        success: true,
        message: 'Vibe Code API is running',
        timestamp: new Date().toISOString(),
        environment: 'production',
        geminiKeyAvailable: !!genAI
      })
    }

    if (req.method === 'GET' && req.url === '/api/test') {
      return res.status(200).json({
        message: 'Server is running!',
        timestamp: new Date().toISOString(),
        environment: 'production',
        geminiKeyAvailable: !!genAI
      })
    }

    if (req.method === 'POST' && req.url === '/api/ai/generate') {
      console.log('📡 AI generate endpoint hit!')
      
      if (!genAI) {
        return res.status(503).json({
          success: false,
          error: 'Gemini API key not configured',
          message: 'AI features are currently disabled. Please configure GEMINI_API_KEY.'
        })
      }

      const { prompt, context } = req.body
      
      if (!prompt) {
        return res.status(400).json({
          success: false,
          error: 'Prompt is required'
        })
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

      return res.status(200).json({
        success: true,
        data: {
          response: responseText,
          model: 'gemini-2.5-flash',
          timestamp: new Date().toISOString(),
          prompt: prompt,
          context: context || null
        }
      })
    }

    // Default response for unknown routes
    return res.status(404).json({
      success: false,
      error: 'Route not found',
      message: `The endpoint ${req.url} does not exist`,
      availableEndpoints: [
        '/api/health',
        '/api/test',
        '/api/ai/generate'
      ]
    })

  } catch (error) {
    console.error('❌ Server error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}