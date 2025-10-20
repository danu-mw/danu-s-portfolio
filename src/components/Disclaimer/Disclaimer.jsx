import { motion } from 'framer-motion'
import './Disclaimer.css'

const Disclaimer = () => {
  return (
    <section className="disclaimer-section">
      <div className="container">
        <motion.div
          className="disclaimer-card glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Warning Badge */}
          <motion.div 
            className="disclaimer-badge"
            animate={{ 
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <span className="badge-icon">⚠️</span>
            <span className="badge-text">BETA VERSION</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2 
            className="disclaimer-title magical-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            🎮 Quest Update: You're in the Tutorial Zone! 🎮
          </motion.h2>

          {/* Content */}
          <motion.div 
            className="disclaimer-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="disclaimer-intro">
              <strong>Alright, before you start hunting for epic loot and boss fights</strong> — a heads-up: 
              everything you see here right now is in <span className="highlight">prototype mode</span>. 😂🥹 
              The skills, projects, achievements, and even those glowing testimonials are all part of the beta build.
            </p>

            <div className="disclaimer-boxes">
              <motion.div 
                className="info-box"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="box-icon">🎯</div>
                <div className="box-content">
                  <h3>Tutorial Quests</h3>
                  <p>The skills, the projects, even the achievements — they're like the tutorial quests that set the stage for the real adventure.</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-box"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="box-icon">🏗️</div>
                <div className="box-content">
                  <h3>Sample Builds</h3>
                  <p>The projects are sample builds, meant to test mechanics and design ideas.</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-box"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="box-icon">🏆</div>
                <div className="box-content">
                  <h3>Future Unlocks</h3>
                  <p>The achievements? Consider them future unlocks — milestones I'm aiming to conquer as I level up. 🔥</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-box"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="box-icon">💬</div>
                <div className="box-content">
                  <h3>NPC Dialogue</h3>
                  <p>The testimonials? Think of them as placeholder NPC quotes — the real endorsements will come from actual quest companions once the campaign launches!</p>
                </div>
              </motion.div>
            </div>

            <p className="disclaimer-sandbox">
              This entire portfolio is my <span className="highlight">sandbox world</span>, where I crafted 
              the base before the real campaign begins.
            </p>

            <p className="disclaimer-outro">
              So yeah, you're looking at <strong>version 0.9</strong> of my journey — polished enough to explore, 
              but with plenty of updates loading in the background. 
            </p>

            <motion.div 
              className="final-message"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="stick-around">Stick around, the next patch will bring the real magic</span>
              <motion.span 
                className="sparkles"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="disclaimer-corners">
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>
          </div>

          {/* Floating Particles */}
          <div className="floating-particles">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                animate={{
                  y: [-20, -40, -20],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                style={{
                  left: `${15 + i * 15}%`,
                  bottom: '10px'
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Disclaimer
