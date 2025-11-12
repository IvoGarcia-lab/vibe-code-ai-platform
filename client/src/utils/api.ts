import axios from 'axios'
import { AIResponse, APIResponse } from '@/types'

const API_BASE_URL = (import.meta as any).env?.PROD 
  ? '/api' 
  : 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const aiAPI = {
  generateResponse: async (prompt: string, category: string): Promise<APIResponse<AIResponse>> => {
    const response = await api.post('/ai/generate', { prompt, category })
    return response.data
  },
  
  getHistory: async (): Promise<APIResponse<AIResponse[]>> => {
    const response = await api.get('/ai/history')
    return response.data
  },
  
  saveResponse: async (response: AIResponse): Promise<APIResponse<AIResponse>> => {
    const apiResponse = await api.post('/ai/save', response)
    return apiResponse.data
  },
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}