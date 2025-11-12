import { Request, Response } from 'express'
import { generateContent } from '../services/geminiService-v2.js'
import { saveAIResponse, getAIResponses } from '../models/aiResponseModel.js'
import { AIResponse, APIResponse } from '../types/index.js'

export const generateAIResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, category } = req.body

    if (!prompt || !category) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Prompt and category are required'
      }
      res.status(400).json(response)
      return
    }

    if (prompt.length > 1000) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Prompt is too long (max 1000 characters)'
      }
      res.status(400).json(response)
      return
    }

    const aiResponse = await generateContent(prompt, category)
    
    const responseData: AIResponse = {
      id: Date.now().toString(),
      prompt,
      response: aiResponse,
      category,
      created_at: new Date(),
      user_id: 'anonymous' // For now, we'll use anonymous until auth is implemented
    }

    const response: APIResponse<AIResponse> = {
      success: true,
      data: responseData,
      message: 'AI response generated successfully'
    }

    res.json(response)
  } catch (error) {
    console.error('Error generating AI response:', error)
    const response: APIResponse<null> = {
      success: false,
      error: 'Failed to generate AI response'
    }
    res.status(500).json(response)
  }
}

export const saveGeneratedResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const responseData: AIResponse = req.body

    if (!responseData.id || !responseData.prompt || !responseData.response || !responseData.category) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Missing required fields'
      }
      res.status(400).json(response)
      return
    }

    const savedResponse = await saveAIResponse(responseData)
    
    const response: APIResponse<AIResponse> = {
      success: true,
      data: savedResponse,
      message: 'AI response saved successfully'
    }

    res.json(response)
  } catch (error) {
    console.error('Error saving AI response:', error)
    const response: APIResponse<null> = {
      success: false,
      error: 'Failed to save AI response'
    }
    res.status(500).json(response)
  }
}

export const getResponseHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query['limit'] as string) || 50
    const responses = await getAIResponses(limit)
    
    const response: APIResponse<AIResponse[]> = {
      success: true,
      data: responses,
      message: 'AI response history retrieved successfully'
    }

    res.json(response)
  } catch (error) {
    console.error('Error fetching AI response history:', error)
    const response: APIResponse<null> = {
      success: false,
      error: 'Failed to fetch AI response history'
    }
    res.status(500).json(response)
  }
}