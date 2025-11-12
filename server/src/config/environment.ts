import { config } from 'dotenv'
import { DatabaseConfig, ServerConfig } from '../types/index.js'

// Try to load .env file, but don't fail if it doesn't exist (Docker/Coolify provides env vars)
try {
  config()
} catch (error) {
  console.log('ℹ️  No .env file found, using environment variables from platform')
}

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
  // In production/Coolify, GEMINI_API_KEY will be provided by the platform at runtime
  // Let's not fail during startup - we'll handle missing API key gracefully during API calls
  if (serverConfig.nodeEnv === 'development' && !serverConfig.geminiApiKey) {
    console.warn('⚠️  Warning: GEMINI_API_KEY not found. AI features will be disabled.')
    console.warn('   Set the GEMINI_API_KEY environment variable to enable AI functionality.')
  }
  
  if (serverConfig.nodeEnv === 'production' && !serverConfig.geminiApiKey) {
    console.warn('⚠️  Warning: GEMINI_API_KEY not found at startup. It may be provided at runtime by Coolify.')
  }
}