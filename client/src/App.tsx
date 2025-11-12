import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from './pages/HomePage'
import AITestPage from './pages/AITestPage'
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ai-test" element={<AITestPage />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App