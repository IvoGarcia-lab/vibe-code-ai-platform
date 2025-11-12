import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, Copy, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAppStore } from '@/stores/appStore'
import { aiAPI } from '@/utils/api'
import { copyToClipboard } from '@/utils/api'

const AITestPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [prompt, setPrompt] = useState('')
  const [category, setCategory] = useState('writing')
  const { isLoading, addAIResponse } = useAppStore()
  const [response, setResponse] = useState('')
  
  const categories = [
    { value: 'writing', label: 'Creative Writing' },
    { value: 'design', label: 'Design Concepts' },
    { value: 'code', label: 'Code Generation' },
    { value: 'music', label: 'Music Composition' },
    { value: 'marketing', label: 'Marketing Copy' },
  ]

  useEffect(() => {
    const urlPrompt = searchParams.get('prompt')
    const urlCategory = searchParams.get('category')
    if (urlPrompt) setPrompt(urlPrompt)
    if (urlCategory) setCategory(urlCategory)
  }, [searchParams])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }

    try {
      useAppStore.setState({ isLoading: true })
      const result = await aiAPI.generateResponse(prompt, category)
      
      if (result.success && result.data) {
        setResponse(result.data.response)
        addAIResponse(result.data)
        toast.success('AI response generated successfully!')
      } else {
        toast.error(result.error || 'Failed to generate response')
      }
    } catch (error) {
      console.error('Error generating response:', error)
      toast.error('An error occurred while generating the response')
    } finally {
      useAppStore.setState({ isLoading: false })
    }
  }

  const handleCopy = async () => {
    if (await copyToClipboard(response)) {
      toast.success('Response copied to clipboard!')
    } else {
      toast.error('Failed to copy response')
    }
  }

  const handleSave = async () => {
    if (!response) {
      toast.error('No response to save')
      return
    }

    try {
      const result = await aiAPI.saveResponse({
        id: Date.now().toString(),
        prompt,
        response,
        category,
        createdAt: new Date(),
      })

      if (result.success) {
        toast.success('Response saved successfully!')
      } else {
        toast.error(result.error || 'Failed to save response')
      }
    } catch (error) {
      console.error('Error saving response:', error)
      toast.error('An error occurred while saving the response')
    }
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          AI Creative Assistant
        </h1>
        <p className="text-gray-300 text-lg">
          Test the power of Gemini AI with creative prompts and see what amazing results you can generate!
        </p>
      </div>

      <div className="glass-effect rounded-xl p-6 mb-8">
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
            Creative Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-vibe-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Your Creative Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create... (e.g., 'Write a poem about artificial intelligence and human creativity')"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-vibe-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-vibe-500 to-primary-500 text-white font-semibold rounded-lg hover:from-vibe-600 hover:to-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Creative Response
            </>
          )}
        </button>
      </div>

      {response && (
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">AI Response</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-3 py-1 text-sm bg-vibe-600 hover:bg-vibe-700 text-white rounded-md transition-colors"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
              {response}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AITestPage