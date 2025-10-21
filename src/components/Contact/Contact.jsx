import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import ContactScene from './ContactScene'
import { getCanvasSettings } from '../../utils/performance'
import './Contact.css'

const canvasSettings = getCanvasSettings()

const Contact = () => {
  const formRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setError('')

    // EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Validate environment variables are set
    if (!serviceId || !templateId || !publicKey) {
      setError('Email service is not configured. Please contact me directly.')
      setSending(false)
      return
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text)
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      })
      .catch((error) => {
        console.error('Email sending failed:', error.text)
        setError('Failed to send message. Please try again or email me directly.')
      })
      .finally(() => {
        setSending(false)
      })
  }

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="contact-content"
        >
          <h2 className="contact-title magical-glow">
             Enter the Portal 🌟
          </h2>
          <p className="contact-subtitle">
            Let's create something magical together
          </p>

          <div className="contact-main">
            {/* Contact Form */}
            <motion.div 
              className="contact-form-container glass-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your magical name..."
                    required
                    disabled={sending}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@realm.com"
                    required
                    disabled={sending}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your magical project..."
                    rows="6"
                    required
                    disabled={sending}
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="magical-button submit-btn"
                  whileHover={{ scale: sending ? 1 : 1.05 }}
                  whileTap={{ scale: sending ? 1 : 0.95 }}
                  disabled={sending}
                >
                  {sending ? '✨ Sending...' : '✨ Send Message'}
                </motion.button>

                {submitted && (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: '#ff6b6b', marginTop: '15px', textAlign: 'center' }}
                  >
                    ✗ {error}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="info-card glass-card">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <a href="mailto:danu7mw@gmail.com">danu7mw@gmail.com</a>
              </div>

              <div className="info-card glass-card">
                <div className="info-icon">📱</div>
                <h3>Phone</h3>
                <a href="tel:+917825067032">+91 78250 67032</a>
              </div>

              <div className="info-card glass-card">
                <div className="info-icon">📌</div>
                <h3>Location</h3>
                <p>Nagarcoil, KK District, TN - India</p>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <h3 className="social-title">Follow the Magic</h3>
                <div className="social-icons">
                  <motion.a
                    href="https://github.com/danu-mw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon glass-card"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/danu-peter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon glass-card"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/danu_mw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon glass-card"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://twitter.com/danu_mw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon glass-card"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://www.behance.net/danupeter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon glass-card"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.07 6.35H15v1.55h5.07V6.35zm-2.54 3.13c-.77 0-1.5.2-2.15.55-.65.35-1.15.85-1.5 1.5-.35.65-.55 1.4-.55 2.25s.2 1.6.55 2.25c.35.65.85 1.15 1.5 1.5.65.35 1.38.55 2.15.55 1 0 1.85-.25 2.5-.75.65-.5 1.1-1.2 1.35-2.1h-2.4c-.15.35-.35.6-.65.8-.3.2-.65.3-1.05.3-.6 0-1.1-.2-1.5-.55-.4-.35-.6-.85-.65-1.45h6.3c0-.15.05-.35.05-.6 0-.85-.15-1.6-.5-2.25-.35-.65-.85-1.15-1.5-1.5-.65-.35-1.4-.55-2.2-.55zm-1.5 3.55c.05-.55.25-1 .6-1.35.35-.35.8-.5 1.35-.5.55 0 1 .15 1.35.5.35.35.55.8.6 1.35h-3.9zM3.24 9.24h4.55c.95 0 1.75.25 2.35.75.6.5.9 1.2.9 2.1 0 .6-.15 1.1-.45 1.5-.3.4-.7.7-1.2.85.7.15 1.2.45 1.6.9.4.45.6 1 .6 1.65 0 .95-.35 1.7-1 2.25-.65.55-1.55.85-2.65.85H3.24V9.24zm2.4 3.6h1.85c.45 0 .8-.1 1.05-.3.25-.2.4-.5.4-.9 0-.4-.15-.7-.4-.9-.25-.2-.6-.3-1.05-.3H5.64v2.4zm0 4.05h2.15c.5 0 .9-.1 1.2-.35.3-.25.45-.6.45-1.05 0-.45-.15-.8-.45-1.05-.3-.25-.7-.35-1.2-.35H5.64v2.8z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://www.artstation.com/danupeter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon glass-card"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="mailto:danu7mw@gmail.com"
                    className="social-icon glass-card"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer 
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="footer-text">
              Made with ✨ magic and 💖 passion by <span className="gradient-text">Danu Peter</span>
            </p>
            <p className="footer-copyright">
              © 2025 DANU'S PORTFOLIO. All rights reserved.
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
