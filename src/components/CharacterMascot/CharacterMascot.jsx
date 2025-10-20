import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CharacterMascot.css'

// Sprite animation configuration
const SPRITE_CONFIG = {
  idle: { src: '/sprites/character/Idle.png', frames: 4, fps: 8 },
  happy: { src: '/sprites/character/Happy.png', frames: 4, fps: 10 },
  wave: { src: '/sprites/character/Walk.png', frames: 6, fps: 12 },
  excited: { src: '/sprites/character/Jump.png', frames: 12, fps: 15 },
  thinking: { src: '/sprites/character/Idle.png', frames: 4, fps: 6 },
  celebrate: { src: '/sprites/character/Happy.png', frames: 4, fps: 12 }
}

// Animated Sprite Component
const AnimatedSprite = ({ currentExpression }) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const config = SPRITE_CONFIG[currentExpression] || SPRITE_CONFIG.idle

  // Reset frame when expression changes
  useEffect(() => {
    console.log(`🎭 Expression changed to: ${currentExpression}`)
    console.log(`📊 Config:`, config)
    setCurrentFrame(0)
  }, [currentExpression])

  // Animate frames
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const nextFrame = (prev + 1) % config.frames
        // Log every 4th frame to avoid spam
        if (nextFrame % 4 === 0) {
          console.log(`🎬 Frame: ${nextFrame}/${config.frames} - Expression: ${currentExpression}`)
        }
        return nextFrame
      })
    }, 1000 / config.fps)

    return () => clearInterval(interval)
  }, [config.frames, config.fps, currentExpression])

  const frameWidth = 100 / config.frames
  const offsetX = currentFrame * frameWidth

  console.log(`🖼️ Rendering sprite - Frame ${currentFrame}, Offset: ${offsetX}%`)

  return (
    <div className="sprite-character">
      <div 
        className="sprite-sheet"
        style={{
          backgroundImage: `url(${config.src})`,
          backgroundPosition: `${offsetX}% 0`,
          backgroundSize: `${config.frames * 100}% 100%`,
          backgroundRepeat: 'no-repeat'
        }}
        title={`${currentExpression} - Frame ${currentFrame}/${config.frames}`}
      />
      <div className="character-glow" style={{ 
        background: `radial-gradient(circle, ${getGlowColor(currentExpression)} 0%, transparent 70%)`
      }} />
    </div>
  )
}

// Get glow color based on expression
const getGlowColor = (expression) => {
  const colors = {
    idle: 'rgba(200, 180, 255, 0.4)',
    happy: 'rgba(255, 230, 92, 0.5)',
    wave: 'rgba(168, 232, 255, 0.5)',
    excited: 'rgba(255, 146, 220, 0.5)',
    thinking: 'rgba(180, 140, 255, 0.4)',
    celebrate: 'rgba(255, 215, 0, 0.6)'
  }
  return colors[expression] || colors.idle
}

// Message data
const mascotMessages = [
  { 
    text: "Hi! I'm your creative companion! 🎨",
    expression: 'wave',
    category: 'greeting'
  },
  { 
    text: "Wow! Check out these amazing projects! ✨",
    expression: 'excited',
    category: 'projects'
  },
  { 
    text: "Need help navigating? Just click around! 🗺️",
    expression: 'happy',
    category: 'help'
  },
  { 
    text: "This portfolio is made with React & Three.js! 🚀",
    expression: 'thinking',
    category: 'tech'
  },
  { 
    text: "Let's connect! Don't forget to check the contact section! 📧",
    expression: 'celebrate',
    category: 'contact'
  },
  { 
    text: "Game development and 3D art - the perfect combo! 🎮",
    expression: 'excited',
    category: 'skills'
  },
  { 
    text: "Every pixel tells a story! ✨",
    expression: 'happy',
    category: 'creative'
  },
  {
    text: "Hmm... which project should you explore first? 🤔",
    expression: 'thinking',
    category: 'explore'
  }
]

// Main Mascot Component
export const CharacterMascot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(mascotMessages[0])
  const [messageIndex, setMessageIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  // Auto-show first message after delay
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasInteracted])

  // Handle click
  const handleClick = () => {
    setHasInteracted(true)
    
    if (isOpen) {
      // Show change animation
      setIsChanging(true)
      setTimeout(() => setIsChanging(false), 500)
      
      // Cycle to next message
      const nextIndex = (messageIndex + 1) % mascotMessages.length
      setMessageIndex(nextIndex)
      setCurrentMessage(mascotMessages[nextIndex])
    } else {
      setIsOpen(true)
    }
  }

  // Close bubble
  const handleClose = (e) => {
    e.stopPropagation()
    setIsOpen(false)
  }

  return (
    <div className="mascot-container" onClick={handleClick}>
      {/* Animated Sprite Character */}
      <motion.div
        animate={isChanging ? { scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <AnimatedSprite currentExpression={currentMessage.expression} />
      </motion.div>
      
      {/* Speech Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mascot-bubble"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <button className="bubble-close" onClick={handleClose}>×</button>
            <p className="bubble-text">{currentMessage.text}</p>
            <div className="bubble-arrow"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      {!hasInteracted && (
        <motion.div
          className="mascot-hint"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Click me!
        </motion.div>
      )}

      {/* Expression indicator (for debugging - can remove later) */}
      {hasInteracted && (
        <div className="expression-indicator">
          {currentMessage.expression}
        </div>
      )}
    </div>
  )
}

export default CharacterMascot
