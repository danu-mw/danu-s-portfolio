import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    // Optional: Add any additional scroll effects here
  }, [])

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* Hero Content Overlay */}
      <div className="hero-content">
        <motion.div
          className="hero-text-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="hero-title magical-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Welcome To My
            <br />
            <span className="gradient-text">Enchanted Realm</span>
          </motion.h1>          <motion.p
            className="hero-subtitle magical-glow-pink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Graphics & Game Designer | 3D Artist | Visual Storycrafter
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <button 
              className="magical-button"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore My Work
            </button>
            <button 
              className="magical-button secondary"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Magical Particles Overlay */}
      <div className="magical-overlay" aria-hidden="true"></div>
    </section>
  )
}

export default Hero
