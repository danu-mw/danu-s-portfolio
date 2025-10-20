import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard3D from './ProjectCard3D'
import './Projects.css'

const projectsData = [
  {
    id: 1,
    title: "Enchanted Forest RPG",
    description: "A magical open-world RPG featuring mystical creatures, spellcasting mechanics, and an immersive fantasy storyline.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    tags: ["Unity", "C#", "3D Modeling", "Game Design"],
    color: "#A892FF",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 2,
    title: "Crystal Realm VFX Pack",
    description: "A comprehensive collection of magical particle effects, shaders, and visual effects for fantasy games.",
    image: "https://images.unsplash.com/photo-1614729939124-032c0cef2c0c?w=800&h=600&fit=crop&crop=center",
    tags: ["Blender", "Unreal Engine", "VFX", "Shaders"],
    color: "#FF92DC",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 3,
    title: "Mystic Character Collection",
    description: "High-quality 3D character models with full rigging, animations, and customizable magical abilities.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    tags: ["Character Design", "3D Modeling", "Animation"],
    color: "#42FFF8",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 4,
    title: "Spellbook UI System",
    description: "An elegant and magical UI framework for fantasy games with animated spellbooks and inventory systems.",
    image: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=800",
    tags: ["UI/UX", "Unity", "C#", "Game Design"],
    color: "#FFE26A",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 5,
    title: "Floating Islands Asset Pack",
    description: "Beautiful floating island environments with dynamic weather, magical flora, and modular building pieces.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    tags: ["Environment Design", "3D Modeling", "Texturing"],
    color: "#93E2FB",
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 6,
    title: "Portal Magic System",
    description: "Advanced portal mechanics with seamless transitions, particle effects, and customizable portal designs.",
    image: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800",
    tags: ["Unity", "VFX", "Game Mechanics", "Shaders"],
    color: "#ff69b4",
    demoLink: "#",
    codeLink: "#"
  }
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)

  return (
    <section id="projects" className="projects-section section" ref={sectionRef}>
      {/* 3D Background */}
      <div className="projects-canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 0, 5]} intensity={1} color="#A892FF" />
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
          <h2 className="projects-title magical-glow">
             MY PROJECTS 📖
          </h2>
          <p className="projects-subtitle">
            Discover the magical projects from my creative journey
          </p>

          <div className="projects-grid">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card-wrapper"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-card glass-card">
                  {/* Project Image */}
                  <div className="project-image-container">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="project-image"
                    />
                    <div className="project-overlay">
                      <motion.div
                        className="view-details-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="project-info">
                    <h3 className="project-title" style={{ color: project.color }}>
                      {project.title}
                    </h3>
                    <p className="project-description">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag" style={{ borderColor: project.color, color: project.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="project-actions">
                      <motion.a
                        href={project.demoLink}
                        className="project-btn demo-btn"
                        style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)` }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        ✨ Live Demo
                      </motion.a>
                      <motion.a
                        href={project.codeLink}
                        className="project-btn code-btn"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        💻 View Code
                      </motion.a>
                    </div>
                  </div>

                  {/* Magical corners */}
                  <div className="card-corner top-left" style={{ borderColor: project.color }}></div>
                  <div className="card-corner top-right" style={{ borderColor: project.color }}></div>
                  <div className="card-corner bottom-left" style={{ borderColor: project.color }}></div>
                  <div className="card-corner bottom-right" style={{ borderColor: project.color }}></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                className="project-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  className="project-modal glass-card"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
                  
                  <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
                  
                  <div className="modal-content">
                    <h3 className="modal-title magical-glow" style={{ color: selectedProject.color }}>
                      {selectedProject.title}
                    </h3>
                    <p className="modal-description">{selectedProject.description}</p>
                    
                    <div className="modal-tags">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="modal-tag" style={{ borderColor: selectedProject.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="modal-actions">
                      <a href={selectedProject.demoLink} className="magical-button">
                        ✨ View Live Demo
                      </a>
                      <a href={selectedProject.codeLink} className="magical-button secondary">
                        💻 View Source Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
