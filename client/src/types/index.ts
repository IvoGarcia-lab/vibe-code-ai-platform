export interface AIResponse {
  id: string
  prompt: string
  response: string
  category: string
  createdAt: Date
  userId?: string
}

export interface CreativeExample {
  id: string
  title: string
  description: string
  prompt: string
  category: 'writing' | 'design' | 'music' | 'code' | 'marketing'
  icon: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}