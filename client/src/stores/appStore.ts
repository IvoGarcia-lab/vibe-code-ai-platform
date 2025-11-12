import { create } from 'zustand'
import { AIResponse, CreativeExample } from '@/types'

interface AppState {
  aiResponses: AIResponse[]
  isLoading: boolean
  currentExample: CreativeExample | null
  addAIResponse: (response: AIResponse) => void
  setLoading: (loading: boolean) => void
  setCurrentExample: (example: CreativeExample | null) => void
  clearResponses: () => void
}

export const useAppStore = create<AppState>((set) => ({
  aiResponses: [],
  isLoading: false,
  currentExample: null,
  
  addAIResponse: (response) => 
    set((state) => ({ 
      aiResponses: [response, ...state.aiResponses] 
    })),
  
  setLoading: (loading) => 
    set({ isLoading: loading }),
  
  setCurrentExample: (example) => 
    set({ currentExample: example }),
  
  clearResponses: () => 
    set({ aiResponses: [] }),
}))