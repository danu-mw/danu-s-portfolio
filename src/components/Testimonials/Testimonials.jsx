import { motion } from 'framer-motion'
import './Testimonials.css'

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lead Game Designer",
    company: "Mystic Studios",
    avatar: "https://i.pravatar.cc/150?img=1",
    quote: "Danu's creativity and technical skills brought our fantasy RPG to life. The character models and environments were beyond our expectations. A true artist who understands game development.",
    rating: 5,
    project: "Fantasy RPG Characters"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Creative Director",
    company: "Pixel Dreams Inc",
    avatar: "https://i.pravatar.cc/150?img=13",
    quote: "Working with Danu was an absolute pleasure. The VFX pack they created elevated our game's visual quality tremendously. Professional, creative, and always delivers on time.",
    rating: 5,
    project: "Magical VFX Pack"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Indie Game Developer",
    company: "Solo Dev Studios",
    avatar: "https://i.pravatar.cc/150?img=5",
    quote: "As an indie developer, I needed someone who could handle both 3D modeling and game design. Danu exceeded every expectation. The floating island assets are stunning!",
    rating: 5,
    project: "Island Environment Pack"
  },
  {
    id: 4,
    name: "David Park",
    role: "Art Director",
    company: "Enchanted Games",
    avatar: "https://i.pravatar.cc/150?img=12",
    quote: "Danu has an incredible eye for detail and a deep understanding of what makes fantasy worlds believable. The shader work and particle effects are top-tier professional quality.",
    rating: 5,
    project: "Magical Shader System"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Project Manager",
    company: "Crystal Interactive",
    avatar: "https://i.pravatar.cc/150?img=9",
    quote: "Not only is Danu technically skilled, but also a great communicator. They understood our vision immediately and delivered iterations quickly. Highly recommended!",
    rating: 5,
    project: "UI/UX Design System"
  },
  {
    id: 6,
    name: "Alex Kumar",
    role: "Senior Developer",
    company: "Realm Studios",
    avatar: "https://i.pravatar.cc/150?img=14",
    quote: "The 3D models integrate seamlessly into Unity and Unreal Engine. Danu's attention to optimization and performance is exactly what professional game dev needs.",
    rating: 5,
    project: "Optimized Character Models"
  }
]

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="testimonials-title magical-glow">
             What Clients Say 💬
          </h2>
          <p className="testimonials-subtitle">
            Testimonials from magical collaborations
          </p>

          <div className="testimonials-grid">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card glass-card"
                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Quote Icon */}
                <div className="quote-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </div>

                {/* Rating Stars */}
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="star"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <p className="testimonial-quote">
                  "{testimonial.quote}"
                </p>

                {/* Project Badge */}
                <div className="project-badge">
                  <span className="badge-icon">🎯</span>
                  <span className="badge-text">{testimonial.project}</span>
                </div>

                {/* Author Info */}
                <div className="testimonial-author">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="author-avatar"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                    <p className="author-company">{testimonial.company}</p>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="card-corners">
                  <div className="corner top-left"></div>
                  <div className="corner top-right"></div>
                  <div className="corner bottom-left"></div>
                  <div className="corner bottom-right"></div>
                </div>

                {/* Magical Glow Effect */}
                <div className="card-glow"></div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div 
            className="trust-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="trust-title">Trusted By</h3>
            <div className="trust-badges">
              <motion.div 
                className="trust-badge"
                whileHover={{ scale: 1.1 }}
              >
                <div className="trust-icon">🎮</div>
                <div className="trust-text">
                  <div className="trust-number">15+</div>
                  <div className="trust-label">Game Studios</div>
                </div>
              </motion.div>

              <motion.div 
                className="trust-badge"
                whileHover={{ scale: 1.1 }}
              >
                <div className="trust-icon">🏆</div>
                <div className="trust-text">
                  <div className="trust-number">10+</div>
                  <div className="trust-label">Awards Won</div>
                </div>
              </motion.div>

              <motion.div 
                className="trust-badge"
                whileHover={{ scale: 1.1 }}
              >
                <div className="trust-icon">⭐</div>
                <div className="trust-text">
                  <div className="trust-number">5.0</div>
                  <div className="trust-label">Average Rating</div>
                </div>
              </motion.div>

              <motion.div 
                className="trust-badge"
                whileHover={{ scale: 1.1 }}
              >
                <div className="trust-icon">🚀</div>
                <div className="trust-text">
                  <div className="trust-number">50+</div>
                  <div className="trust-label">Projects Delivered</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
