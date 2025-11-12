import { GoogleGenerativeAI } from '@google/generative-ai'
import { serverConfig } from '../config/environment.js'

const genAI = new GoogleGenerativeAI(serverConfig.geminiApiKey)

const getSystemPrompt = (category: string): string => {
  const prompts: { [key: string]: string } = {
    writing: `You are a creative writing assistant. Help users generate compelling stories, poems, articles, and creative content. 
    Be imaginative, engaging, and help bring their ideas to life with vivid descriptions and interesting narratives.`,
    
    design: `You are a creative design consultant. Help users conceptualize visual designs, user interfaces, branding concepts, and creative layouts. 
    Provide detailed descriptions, color suggestions, layout ideas, and aesthetic guidance for their creative projects.`,
    
    code: `You are an expert programmer and code generator. Help users create code snippets, algorithms, and technical solutions. 
    Provide clean, well-commented code with explanations and best practices. Focus on clarity and functionality.`,
    
    music: `You are a creative music composer and theory expert. Help users create melodies, harmonies, musical arrangements, and compositions. 
    Provide musical notation suggestions, chord progressions, and creative musical ideas.`,
    
    marketing: `You are a creative marketing copywriter. Help users write compelling marketing content, advertisements, social media posts, and brand messaging. 
    Focus on engagement, persuasion, and creative storytelling that drives action.`,
    
    default: `You are a creative AI assistant. Help users generate creative content, ideas, and solutions. 
    Be imaginative, helpful, and provide detailed, thoughtful responses that inspire creativity.`
  }
  
  return prompts[category] || prompts['default'] || 'You are a creative AI assistant. Help users generate creative content, ideas, and solutions.'
}

export const generateContent = async (prompt: string, category: string): Promise<string> => {
  try {
    // Check if API key is available
    if (!serverConfig.geminiApiKey) {
      console.warn('Gemini API key not configured. Returning mock response for testing.')
      return `This is a mock AI response for category "${category}". In production with a valid Gemini API key, this would be: "${prompt}"`
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    })
    
    const systemPrompt = getSystemPrompt(category)
    const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}\n\nCreative Response:`
    
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()
    
    return text.trim()
  } catch (error) {
    console.error('Error generating content with Gemini:', error)
    throw new Error('Failed to generate AI content')
  }
}

export default {
  generateContent
}