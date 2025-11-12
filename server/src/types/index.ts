export interface AIResponse {
  id: string
  prompt: string
  response: string
  category: string
  created_at: Date
  user_id?: string
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  user: string
  password: string
  ssl?: boolean
}

export interface ServerConfig {
  port: number
  nodeEnv: string
  corsOrigin: string
  geminiApiKey: string
  rateLimitWindow: number
  rateLimitMax: number
}