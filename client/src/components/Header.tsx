import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Code, Palette } from 'lucide-react'

const Header: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="glass-effect sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Sparkles className="h-8 w-8 text-vibe-400" />
              <span className="text-2xl font-bold gradient-text">
                Vibe Code
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-vibe-500/20 text-vibe-300'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Palette className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/ai-test"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/ai-test')
                  ? 'bg-vibe-500/20 text-vibe-300'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Code className="h-5 w-5" />
              <span>AI Test</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header