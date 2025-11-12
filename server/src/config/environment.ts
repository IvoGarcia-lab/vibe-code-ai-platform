import { config } from 'dotenv'
import { DatabaseConfig, ServerConfig } from '../types/index.js'

config()

export const serverConfig: ServerConfig = {
  port: parseInt(process.env['PORT'] || '3001', 10),
  nodeEnv: process.env['NODE_ENV'] || 'development',
  corsOrigin: process.env['CORS_ORIGIN'] || 'http://localhost:3000',
  geminiApiKey: process.env['GEMINI_API_KEY'] || '',
  rateLimitWindow: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000', 10),
  rateLimitMax: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100', 10),
}

export const databaseConfig: DatabaseConfig = {
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] || '5432', 10),
  database: process.env['POSTGRES_DB'] || 'vibe_code',
  user: process.env['POSTGRES_USER'] || 'postgres',
  password: process.env['POSTGRES_PASSWORD'] || '',
  ssl: process.env['NODE_ENV'] === 'production',
}

export const validateConfig = (): void => {
  // For development/testing, we'll make GEMINI_API_KEY optional
  // In production/Coolify, it will be provided by the platform
  if (serverConfig.nodeEnv === 'production' && !serverConfig.geminiApiKey) {
    throw new Error('Missing required environment variable: GEMINI_API_KEY')
  }
  
  // Warning for development
  if (serverConfig.nodeEnv === 'development' && !serverConfig.geminiApiKey) {
    console.warn('⚠️  Warning: GEMINI_API_KEY not found. AI features will be disabled.')
    console.warn('   Set the GEMINI_API_KEY environment variable to enable AI functionality.')
  }
}