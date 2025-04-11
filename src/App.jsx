import { useState, useEffect } from 'react'
import Layout from './components/layout/Layout'
import Dashboard from './components/Dashboard'
import HabitGrid from './components/habits/HabitGrid'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { HabitProvider } from './context/HabitContext'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Switch tab based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'habits' || hash === 'dashboard') {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on initial load
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <ThemeProvider>
      <HabitProvider>
        <Layout>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 border-b border-dailydev-darkCard">
              <nav className="flex space-x-8">
                <a
                  href="#dashboard"
                  className={`pb-4 font-medium text-sm px-1 border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-dailydev-purple text-dailydev-purple' : 'border-transparent text-gray-300 hover:text-white'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </a>
                <a
                  href="#habits"
                  className={`pb-4 font-medium text-sm px-1 border-b-2 transition-colors ${activeTab === 'habits' ? 'border-dailydev-purple text-dailydev-purple' : 'border-transparent text-gray-300 hover:text-white'}`}
                  onClick={() => setActiveTab('habits')}
                >
                  My Habits
                </a>
              </nav>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  id="dashboard-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Dashboard />
                </motion.div>
              )}

              {activeTab === 'habits' && (
                <motion.div
                  key="habits"
                  id="habits-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <HabitGrid />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Layout>
      </HabitProvider>
    </ThemeProvider>
  )
}

export default App
