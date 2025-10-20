import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { 
  Text3D, 
  Center, 
  Float,
  Sparkles,
  MeshTransmissionMaterial,
  OrbitControls
} from '@react-three/drei'
import * as THREE from 'three'

// Floating 3D Text
const MagicalText = () => {
  const textRef = useRef()

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Center>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <group ref={textRef}>
          <Text3D
            font="/fonts/cinzel_bold.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            Game Designer
            <meshStandardMaterial 
              color="#A892FF"
              emissive="#A892FF"
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </Text3D>
        </group>
      </Float>
    </Center>
  )
}

// Magical Light Rays
const LightRays = () => {
  const raysRef = useRef()

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={raysRef}>
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[0, 0, 0]}
          rotation={[0, 0, (Math.PI * 2 * i) / 8]}
        >
          <planeGeometry args={[0.1, 15]} />
          <meshBasicMaterial
            color="#FFE26A"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// Crystal Formations
const MagicalCrystal = ({ position, color, scale = 1 }) => {
  const crystalRef = useRef()

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.01
      crystalRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={crystalRef} position={position} scale={scale}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
        <pointLight color={color} intensity={2} distance={3} />
      </mesh>
    </Float>
  )
}

// Main Scene
const AboutScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#A892FF" />

      {/* Sparkles */}
      <Sparkles 
        count={50} 
        scale={10} 
        size={3} 
        speed={0.3}
        color="#FFE26A"
      />

      {/* Light Rays */}
      <LightRays />

      {/* Magical Crystals */}
      <MagicalCrystal position={[-3, 0, -2]} color="#A892FF" scale={0.8} />
      <MagicalCrystal position={[3, 1, -3]} color="#FF92DC" scale={1} />
      <MagicalCrystal position={[-2, -1, -1]} color="#42FFF8" scale={0.6} />
      <MagicalCrystal position={[2, -0.5, -2]} color="#FFE26A" scale={0.7} />

      {/* Optional: Uncomment if you add font file
      <MagicalText /> */}

      {/* Fog */}
      <fog attach="fog" args={['#1a0b2e', 5, 15]} />
    </>
  )
}

export default AboutScene
