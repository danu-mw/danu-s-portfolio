import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AboutScene from './AboutScene'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  // Auto-flip photos: 1st photo (5 seconds), 2nd photo (2 seconds)
  useEffect(() => {
    let timeoutId

    const flipPhoto = () => {
      setIsFlipped(prev => {
        const willBeFlipped = !prev
        // If showing back (flipped = true), show for 2 seconds
        // If showing front (flipped = false), show for 5 seconds
        const delay = willBeFlipped ? 2000 : 5000
        timeoutId = setTimeout(flipPhoto, delay)
        return willBeFlipped
      })
    }

    // Start with first photo showing for 5 seconds
    timeoutId = setTimeout(flipPhoto, 5000)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magical text reveal animation
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.5,
        duration: 1
      })

      // Sparkle effect on scroll
      gsap.to('.sparkle-element', {
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 0.8
      })

      // Stats animation
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about-section section" ref={sectionRef}>
      <div className="container">
        <motion.div 
          className="about-content"
          style={{ opacity, scale }}
        >
          <h2 className="about-title magical-glow">
             About the Creator 💖✨
          </h2>

          <div className="about-main">
            {/* Profile Picture with Flip Animation */}
            <motion.div 
              className="profile-picture-container"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              viewport={{ once: true }}
            >
              <div 
                className="profile-picture-wrapper"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* 3D Flip Container */}
                <motion.div
                  className="profile-flip-inner"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                  }}
                >
                  {/* Front Image */}
                  <div className="profile-flip-face profile-flip-front">
                    <img 
                      src="/profile.jpg" 
                      alt="Danu Peter - Front" 
                      className="profile-picture"
                    />
                  </div>
                  
                  {/* Back Image */}
                  <div className="profile-flip-face profile-flip-back">
                    <img 
                      src="/profile1.jpg" 
                      alt="Danu Peter - Back" 
                      className="profile-picture"
                    />
                  </div>
                </motion.div>
                
                <div className="profile-glow"></div>
                
                {/* Click hint */}
                <div className="flip-hint">
                  <span>✨ Click to flip ✨</span>
                </div>
              </div>
            </motion.div>

            <div className="about-text-container glass-card" ref={textRef}>
              <div className="magical-border"></div>
              
              <h3 className="greeting magical-glow-pink">
                Hi, I'm <span className="gradient-text">Danu Peter</span> 🎀
              </h3>
              
              <p className="about-description">
                I'm a <strong>Graphics & Game Designer</strong> who crafts enchanted digital experiences. 
                With a passion for bringing magical worlds to life, I specialize in creating immersive 
                3D environments, captivating character designs, and spellbinding visual effects.
              </p>

              <p className="about-description">
                My journey in the realm of digital art began with a love for fantasy games, Illustrations and 
                storytelling. Today, I combine cutting-edge technology with artistic vision to 
                create experiences that brings users to extraordinary worlds.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🎮</span>
                  <span>Graphics & Game Designing</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🎨</span>
                  <span>3D Modeling & Animation</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🪩</span>
                  <span>Visual Effects & Shaders</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🌟</span>
                  <span>UI/UX Design</span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="about-stats">
              <div className="stat-item glass-card">
                <div className="stat-number gradient-text">5+</div>
                <div className="stat-label">Years Experience</div>
                <div className="sparkle-element">✨</div>
              </div>
              
              <div className="stat-item glass-card">
                <div className="stat-number gradient-text">50+</div>
                <div className="stat-label">Projects Completed</div>
                <div className="sparkle-element">✨</div>
              </div>
              
              <div className="stat-item glass-card">
                <div className="stat-number gradient-text">100%</div>
                <div className="stat-label">Magical Quality</div>
                <div className="sparkle-element">✨</div>
              </div>
            </div>
          </div>

          {/* Experience Bar (Game-like UI) */}
          <div className="experience-bar glass-card">
            <div className="xp-label">
              <span>Creative Level: 99</span>
              <span>XP: 9999/10000</span>
            </div>
            <div className="xp-bar-container">
              <motion.div 
                className="xp-bar-fill"
                initial={{ width: 0 }}
                whileInView={{ width: '99.9%' }}
                transition={{ duration: 2, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <div className="xp-bar-glow"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
