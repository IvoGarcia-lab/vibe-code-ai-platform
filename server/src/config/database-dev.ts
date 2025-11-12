import { AIResponse } from '../types/index.js'

// In-memory storage for development
const aiResponses: AIResponse[] = []

export const connectDatabase = async (): Promise<void> => {
  console.log('📦 Using in-memory database for development')
  console.log('⚠️  Note: Data will not persist between server restarts')
}

export const query = async (text: string, params?: any[]): Promise<any> => {
  // Mock query function for development
  console.log('📋 Mock query:', text, params)
  
  if (text.includes('CREATE TABLE')) {
    return { rows: [] }
  }
  
  if (text.includes('INSERT INTO ai_responses')) {
    const newResponse: AIResponse = {
      id: params?.[0] || Date.now().toString(),
      prompt: params?.[1] || '',
      response: params?.[2] || '',
      category: params?.[3] || 'writing',
      created_at: params?.[4] || new Date(),
      user_id: params?.[5] || 'anonymous'
    }
    aiResponses.push(newResponse)
    return { rows: [newResponse] }
  }
  
  if (text.includes('SELECT * FROM ai_responses')) {
    const limit = params?.[0] || 50
    return { rows: aiResponses.slice(0, limit as number) }
  }
  
  return { rows: [] }
}

export default {
  connectDatabase,
  query
}