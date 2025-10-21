import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from '../Hero/HeroScene'
import { getCanvasSettings } from '../../utils/performance'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const canvasSettings = getCanvasSettings()

const skillsData = [
  {
    category: "3D & Game Engines",
    icon: "🎮",
    skills: [
      { name: "Blender", level: 95, color: "#FF92DC" },
      { name: "Unity", level: 70, color: "#A892FF" },
      { name: "Unreal Engine", level: 85, color: "#42FFF8" },
      { name: "Maya", level: 80, color: "#FFE26A" }
    ]
  },
  {
    category: "Design Tools",
    icon: "🎨",
    skills: [
      { name: "Photoshop", level: 95, color: "#42FFF8" },
      { name: "Illustrator", level: 90, color: "#FF92DC" },
      { name: "After Effects", level: 85, color: "#A892FF" },
      { name: "Substance Painter", level: 88, color: "#FFE26A" }
    ]
  },
  {
    category: "Programming",
    icon: "💻",
    skills: [
      { name: "C#", level: 85, color: "#A892FF" },
      { name: "JavaScript", level: 90, color: "#FFE26A" },
      { name: "Python", level: 80, color: "#42FFF8" },
      { name: "GLSL Shaders", level: 75, color: "#FF92DC" }
    ]
  },
  {
    category: "Creative Skills",
    icon: "✨",
    skills: [
      { name: "Character Design", level: 95, color: "#FF92DC" },
      { name: "Environment Art", level: 90, color: "#42FFF8" },
      { name: "VFX & Particles", level: 88, color: "#A892FF" },
      { name: "UI/UX Design", level: 85, color: "#FFE26A" }
    ]
  }
]

const Skills = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill cards on scroll
      gsap.from('.skill-category', {
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 0.8
      })

      // Note: Skill bar animations are handled by Framer Motion for accurate percentage display
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="skills-section section" ref={sectionRef}>
      {/* 3D Scene with Floating Islands (same as Hero) - Mobile Optimized */}
      <div className="skills-canvas">
        <Canvas 
          camera={{ position: [0, 2, 12], fov: 55 }}
          {...canvasSettings}
          gl={{ 
            powerPreference: canvasSettings.powerPreference,
            antialias: canvasSettings.antialias 
          }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="skills-title magical-glow">
             Magical Abilities & Skills 🌙🔮
          </h2>
          <p className="skills-subtitle">
            Passion for the mystical arts of design and development
          </p>

          <div className="skills-grid">
            {skillsData.map((category, index) => (
              <motion.div
                key={category.category}
                className="skill-category glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3 className="category-title">{category.category}</h3>
                </div>

                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      
                      <div className="skill-bar">
                        <motion.div
                          className="skill-bar-fill"
                          style={{ 
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="skill-bar-glow" style={{ boxShadow: `0 0 20px ${skill.color}` }}></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Magical corner decoration */}
                <div className="corner-decoration top-left"></div>
                <div className="corner-decoration top-right"></div>
                <div className="corner-decoration bottom-left"></div>
                <div className="corner-decoration bottom-right"></div>
              </motion.div>
            ))}
          </div>

          {/* Achievement Badges */}
          <motion.div 
            className="achievements-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="achievements-title magical-glow-turquoise">
              Achievements Unlocked 🏆
            </h3>
            <div className="badges-container">
              {[
                { icon: "⭐", title: "Master Artist", desc: "Summoned over 100+ digital creations (no sleep spells used...mostly)" },
                { icon: "🎯", title: "Perfectionist", desc: "90% Quality Rate; 10% obsessing over that one pixel." },
                { icon: "🚀", title: "Innovation Wizard", desc: "Conjured 10+ award-winning ideas using pure caffeine and imagination." },
                { icon: "💎", title: "Legendary Creator", desc: "5+ Years crafting worlds, stories and maybe a few bugs." }
              ].map((badge, index) => (
                <motion.div
                  key={badge.title}
                  className="badge glass-card"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-title">{badge.title}</div>
                  <div className="badge-desc">{badge.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
