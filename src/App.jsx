import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Testimonials from './components/Testimonials/Testimonials'
import Disclaimer from './components/Disclaimer/Disclaimer'
import Contact from './components/Contact/Contact'
import Navigation from './components/Navigation/Navigation'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import MagicalCursor from './components/MagicalCursor/MagicalCursor'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <>
          <MagicalCursor />
          <Navigation />
          
          <main className="app-container">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Testimonials />
            <Disclaimer />
            <Contact />
          </main>

          {/* Magical Background Stars */}
          <div className="stars-background" aria-hidden="true"></div>
        </>
      )}
    </>
  )
}

export default App
