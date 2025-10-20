import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { 
  Float, 
  Sparkles,
  MeshDistortMaterial,
  Torus
} from '@react-three/drei'
import * as THREE from 'three'

// Enchanted Portal
const EnchantedPortal = () => {
  const portalRef = useRef()
  const innerRingRef = useRef()

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -state.clock.elapsedTime * 0.7
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Portal Ring */}
      <mesh ref={portalRef}>
        <torusGeometry args={[2, 0.15, 16, 100]} />
        <meshStandardMaterial 
          color="#A892FF"
          emissive="#A892FF"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Portal Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial 
          color="#42FFF8"
          emissive="#42FFF8"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Portal Center */}
      <mesh>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial 
          color="#FF92DC"
          emissive="#FF92DC"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Portal Lights */}
      <pointLight color="#A892FF" intensity={3} distance={8} />
      <pointLight position={[0, 0, 2]} color="#42FFF8" intensity={2} distance={6} />
    </group>
  )
}

// Magical Globe
const MagicalGlobe = ({ position }) => {
  const globeRef = useRef()

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.2
      globeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={globeRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color="#FFE26A"
          emissive="#FFE26A"
          emissiveIntensity={0.4}
          distort={0.3}
          speed={1}
          transparent
          opacity={0.7}
        />
        <pointLight color="#FFE26A" intensity={2} distance={4} />
      </mesh>
    </Float>
  )
}

// Energy Particles
const EnergyParticles = () => {
  const particlesRef = useRef()

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={particlesRef}>
      <Sparkles 
        count={60} 
        scale={8} 
        size={3} 
        speed={0.5}
        color="#A892FF"
      />
      <Sparkles 
        count={40} 
        scale={6} 
        size={2} 
        speed={0.3}
        color="#42FFF8"
      />
    </group>
  )
}

// Main Contact Scene
const ContactScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Enchanted Portal */}
      <EnchantedPortal />

      {/* Magical Globes */}
      <MagicalGlobe position={[-3, 1, -2]} />
      <MagicalGlobe position={[3, -1, -2]} />

      {/* Energy Particles */}
      <EnergyParticles />

      {/* Background Light */}
      <pointLight position={[0, 0, -5]} intensity={1} color="#FF92DC" />

      {/* Fog */}
      <fog attach="fog" args={['#1a0b2e', 5, 15]} />
    </>
  )
}

export default ContactScene
