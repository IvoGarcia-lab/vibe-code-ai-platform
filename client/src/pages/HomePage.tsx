import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, Code, Palette, Music, FileText, TrendingUp } from 'lucide-react'
import { CreativeExample } from '@/types'

const HomePage: React.FC = () => {
  const creativeExamples: CreativeExample[] = [
    {
      id: '1',
      title: 'Creative Writing',
      description: 'Generate compelling stories, poems, and content',
      prompt: 'Write a short story about AI helping humanity in 2050',
      category: 'writing',
      icon: 'FileText'
    },
    {
      id: '2',
      title: 'Design Concepts',
      description: 'Create visual concepts and design ideas',
      prompt: 'Describe a modern eco-friendly workspace design',
      category: 'design',
      icon: 'Palette'
    },
    {
      id: '3',
      title: 'Code Generation',
      description: 'Generate code snippets and algorithms',
      prompt: 'Create a React component for a music player',
      category: 'code',
      icon: 'Code'
    },
    {
      id: '4',
      title: 'Music Composition',
      description: 'Compose melodies and musical ideas',
      prompt: 'Create a melody for a futuristic sci-fi theme',
      category: 'music',
      icon: 'Music'
    },
    {
      id: '5',
      title: 'Marketing Copy',
      description: 'Write engaging marketing content',
      prompt: 'Write compelling copy for a sustainable fashion brand',
      category: 'marketing',
      icon: 'TrendingUp'
    }
  ]

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ElementType } = {
      FileText,
      Palette,
      Code,
      Music,
      TrendingUp
    }
    const Icon = icons[iconName] || Sparkles
    return <Icon className="h-8 w-8" />
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Vibe Code</span>
            <br />
            <span className="text-white">AI for Creatives</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Unlock your creative potential with AI. Generate ideas, create content, 
            and explore new possibilities with Gemini AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ai-test"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-vibe-500 to-primary-500 text-white font-semibold rounded-lg hover:from-vibe-600 hover:to-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Zap className="h-5 w-5 mr-2" />
              Start Creating
            </Link>
            <a
              href="#examples"
              className="inline-flex items-center px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              See Examples
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Creative Possibilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creativeExamples.map((example) => (
              <div
                key={example.id}
                className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-vibe-400 mb-4">
                  {getIcon(example.icon)}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {example.description}
                </p>
                <div className="text-sm text-gray-400 mb-4">
                  <strong>Example:</strong> {example.prompt}
                </div>
                <Link
                  to={`/ai-test?prompt=${encodeURIComponent(example.prompt)}&category=${example.category}`}
                  className="inline-flex items-center text-vibe-400 hover:text-vibe-300 font-medium"
                >
                  Try it out →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Create?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creatives using AI to enhance their workflow and unlock new possibilities.
          </p>
          <Link
            to="/ai-test"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-vibe-500 to-primary-500 text-white font-semibold rounded-lg hover:from-vibe-600 hover:to-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage