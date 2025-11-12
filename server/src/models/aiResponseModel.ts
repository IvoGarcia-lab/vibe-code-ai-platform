import { query } from '../config/database.js'
import { AIResponse } from '../types/index.js'

export const createAIResponseTable = async (): Promise<void> => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ai_responses (
      id VARCHAR(255) PRIMARY KEY,
      prompt TEXT NOT NULL,
      response TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id VARCHAR(255)
    )
  `
  
  try {
    await query(createTableQuery)
    console.log('✅ AI responses table created/verified')
  } catch (error) {
    console.error('❌ Error creating AI responses table:', error)
    throw error
  }
}

export const saveAIResponse = async (response: AIResponse): Promise<AIResponse> => {
  const insertQuery = `
    INSERT INTO ai_responses (id, prompt, response, category, created_at, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `
  
  try {
    const result = await query(insertQuery, [
      response.id,
      response.prompt,
      response.response,
      response.category,
      response.created_at,
      response.user_id
    ])
    
    return result.rows[0]
  } catch (error) {
    console.error('Error saving AI response:', error)
    throw new Error('Failed to save AI response')
  }
}

export const getAIResponses = async (limit: number = 50): Promise<AIResponse[]> => {
  const selectQuery = `
    SELECT * FROM ai_responses
    ORDER BY created_at DESC
    LIMIT $1
  `
  
  try {
    const result = await query(selectQuery, [limit])
    return result.rows
  } catch (error) {
    console.error('Error fetching AI responses:', error)
    throw new Error('Failed to fetch AI responses')
  }
}

export const getAIResponseById = async (id: string): Promise<AIResponse | null> => {
  const selectQuery = `
    SELECT * FROM ai_responses
    WHERE id = $1
  `
  
  try {
    const result = await query(selectQuery, [id])
    return result.rows[0] || null
  } catch (error) {
    console.error('Error fetching AI response by ID:', error)
    throw new Error('Failed to fetch AI response')
  }
}