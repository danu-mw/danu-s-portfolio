import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { 
  Float, 
  Stars, 
  Cloud, 
  Sparkles,
  Environment,
  useTexture,
  MeshDistortMaterial
} from '@react-three/drei'
import * as THREE from 'three'

/* ============================================================================
   CIRCULAR ORBIT ANIMATION SYSTEM FOR 6 THEMED ISLANDS
   ============================================================================
   
   CONCEPT:
   All 6 islands orbit around a central point (0, Y, -8) like planets around a sun.
   Each island travels on the SAME circular path (radius = 9 units) but starts at
   a different angle, ensuring they're evenly spaced 60° apart (360° ÷ 6 = 60°).
   
   MATHEMATICAL FORMULA:
   For each island at index i:
   - Base angle: θᵢ = i × (2π / 6) = i × 60°
   - Time angle: t = elapsedTime × orbitSpeed
   - Current angle: α = θᵢ + t
   - Position: x = centerX + r·cos(α)
              z = centerZ + r·sin(α)
   
   NON-COLLISION GUARANTEE:
   ✓ All islands share the SAME orbit radius (r = 9)
   ✓ All islands rotate at the SAME speed (0.1 rad/s)
   ✓ Angular spacing is FIXED at 60° between consecutive islands
   ✓ Since they're on the same circular path with fixed offsets, they maintain
     constant separation and NEVER intersect or collide
   ✓ Each island comes to the front (z closest to camera) once per full rotation
   
   VISUAL EFFECT:
   Islands continuously rotate in a carousel pattern. When an island reaches
   the front (lowest Z value relative to camera), it's fully visible. As it
   continues around the circle, it moves to the back, and the next island
   takes its place at the front. Complete cycle: ~63 seconds per full rotation.
   
   ============================================================================ */

// Egyptian Pyramid Island with Animals
const PyramidIsland = ({ position, scale = 1, index = 0 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001 // Gentle self-rotation
      
      // CIRCULAR ORBIT ANIMATION LOGIC:
      // All islands orbit around a central point (0, Y, -8) in the scene
      const centerX = 0
      const centerZ = -8
      const orbitRadius = 9 // Wider orbit for better screen coverage and spacing
      const orbitSpeed = 0.1 // Rotation speed (radians per second)
      
      // Calculate base angle for this island (60 degrees = π/3 radians apart)
      // This ensures even spacing: 6 islands × 60° = 360° full circle
      const baseAngle = index * (Math.PI * 2 / 6) // θ (theta) - spacing angle
      
      // Time-based rotation angle - this creates the continuous orbit
      const timeAngle = state.clock.elapsedTime * orbitSpeed // t - animation variable
      
      // Combined angle for this island's current position
      const currentAngle = baseAngle + timeAngle
      
      // TRIGONOMETRIC CIRCULAR POSITIONING:
      // x = r·cos(θ + t) - horizontal position on orbit
      // z = r·sin(θ + t) - depth position on orbit (creates front/back movement)
      meshRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      meshRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      
      // Gentle vertical floating (independent of orbit)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Island Base - MORE VIBRANT SAND */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[2.5, 0.6, 2.5]} />
          <meshStandardMaterial color="#F4C430" emissive="#D4A420" emissiveIntensity={0.3} roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 0.4, 2]} />
          <meshStandardMaterial color="#FFD95A" emissive="#E6C14A" emissiveIntensity={0.3} roughness={0.7} flatShading />
        </mesh>
        
        {/* Pyramid - BRIGHT GOLD */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <coneGeometry args={[0.8, 1.6, 4]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFB700"
            emissiveIntensity={0.5}
            roughness={0.5} 
            flatShading 
          />
        </mesh>
        
        {/* Palm Trees - MORE VIBRANT */}
        <group position={[-0.7, 0.5, 0.7]}>
          <mesh><cylinderGeometry args={[0.08, 0.1, 0.6, 6]} /><meshStandardMaterial color="#A0522D" emissive="#8B4513" emissiveIntensity={0.2} flatShading /></mesh>
          <mesh position={[0, 0.5, 0]}><coneGeometry args={[0.25, 0.3, 6]} /><meshStandardMaterial color="#32CD32" emissive="#228B22" emissiveIntensity={0.4} flatShading /></mesh>
        </group>
        <group position={[0.8, 0.5, 0.8]}>
          <mesh><cylinderGeometry args={[0.06, 0.08, 0.5, 6]} /><meshStandardMaterial color="#A0522D" emissive="#8B4513" emissiveIntensity={0.2} flatShading /></mesh>
          <mesh position={[0, 0.4, 0]}><coneGeometry args={[0.2, 0.25, 6]} /><meshStandardMaterial color="#32CD32" emissive="#228B22" emissiveIntensity={0.4} flatShading /></mesh>
        </group>
        
        {/* Cactus */}
        <mesh position={[0.9, 0.5, -0.6]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
          <meshStandardMaterial color="#3a7a3a" flatShading />
        </mesh>
        
        {/* Cute Camel - Simple Voxel Style */}
        <group position={[-0.5, 0.4, -0.3]}>
          <mesh position={[0, 0, 0]}><boxGeometry args={[0.3, 0.15, 0.15]} /><meshStandardMaterial color="#C19A6B" flatShading /></mesh>
          <mesh position={[0, 0.15, 0]}><boxGeometry args={[0.2, 0.15, 0.12]} /><meshStandardMaterial color="#D2B48C" flatShading /></mesh>
          <mesh position={[0.12, 0, 0]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#C19A6B" flatShading /></mesh>
        </group>
        
        {/* Desert Flowers */}
        <mesh position={[0.5, 0.35, 0.4]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.3} flatShading /></mesh>
        <mesh position={[-0.3, 0.35, 0.5]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} flatShading /></mesh>
      </group>
    </Float>
  )
}

// Chinese Temple Island with Panda
const TempleIsland = ({ position, scale = 1, index = 0 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      
      // CIRCULAR ORBIT: Same orbit parameters for synchronized rotation
      const centerX = 0
      const centerZ = -8
      const orbitRadius = 9 // Wider orbit for better spacing
      const orbitSpeed = 0.1
      const baseAngle = index * (Math.PI * 2 / 6) // 60° offset from previous island
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      // Circular positioning: x = r·cos(θ + t), z = r·sin(θ + t)
      meshRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      meshRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Island Base - MORE VIBRANT */}
        <mesh position={[0, -0.5, 0]} castShadow><boxGeometry args={[2.5, 0.6, 2.5]} /><meshStandardMaterial color="#5a9a8a" emissive="#2a5a4a" emissiveIntensity={0.3} roughness={0.7} flatShading /></mesh>
        <mesh position={[0, 0, 0]} castShadow><boxGeometry args={[2.2, 0.4, 2.2]} /><meshStandardMaterial color="#6cd86c" emissive="#4cb84c" emissiveIntensity={0.2} roughness={0.7} flatShading /></mesh>
        
        {/* Temple Building - VIBRANT BLUE with YELLOW GLOWING WINDOWS */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1, 0.4, 1]} />
          <meshStandardMaterial color="#42A5F5" emissive="#1976D2" emissiveIntensity={0.3} roughness={0.6} flatShading />
        </mesh>
        
        {/* Yellow Glowing Windows - Bottom Floor */}
        <mesh position={[0.25, 0.5, 0.51]}>
          <boxGeometry args={[0.15, 0.25, 0.02]} />
          <meshStandardMaterial color="#FFE26A" emissive="#FFE26A" emissiveIntensity={1.2} flatShading />
        </mesh>
        <mesh position={[-0.25, 0.5, 0.51]}>
          <boxGeometry args={[0.15, 0.25, 0.02]} />
          <meshStandardMaterial color="#FFE26A" emissive="#FFE26A" emissiveIntensity={1.2} flatShading />
        </mesh>
        <mesh position={[0.25, 0.5, -0.51]}>
          <boxGeometry args={[0.15, 0.25, 0.02]} />
          <meshStandardMaterial color="#FFE26A" emissive="#FFE26A" emissiveIntensity={1.2} flatShading />
        </mesh>
        <mesh position={[-0.25, 0.5, -0.51]}>
          <boxGeometry args={[0.15, 0.25, 0.02]} />
          <meshStandardMaterial color="#FFE26A" emissive="#FFE26A" emissiveIntensity={1.2} flatShading />
        </mesh>
        
        {/* Upper Building - VIBRANT BLUE */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.9]} />
          <meshStandardMaterial color="#5C6BC0" emissive="#3949AB" emissiveIntensity={0.4} roughness={0.6} flatShading />
        </mesh>
        
        {/* Yellow Glowing Windows - Upper Floor */}
        <mesh position={[0.2, 0.9, 0.46]}>
          <boxGeometry args={[0.12, 0.2, 0.02]} />
          <meshStandardMaterial color="#FFE26A" emissive="#FFE26A" emissiveIntensity={1.2} flatShading />
        </mesh>
        <mesh position={[-0.2, 0.9, 0.46]}>
          <boxGeometry args={[0.12, 0.2, 0.02]} />
          <meshStandardMaterial color="#FFE26A" emissive="#FFE26A" emissiveIntensity={1.2} flatShading />
        </mesh>
        <mesh position={[0.2, 0.9, -0.46]}>
          <boxGeometry args={[0.12, 0.2, 0.02]} />
          <meshStandardMaterial color="#FFE26A" emissive="#FFE26A" emissiveIntensity={1.2} flatShading />
        </mesh>
        <mesh position={[-0.2, 0.9, -0.46]}>
          <boxGeometry args={[0.12, 0.2, 0.02]} />
          <meshStandardMaterial color="#FFE26A" emissive="#FFE26A" emissiveIntensity={1.2} flatShading />
        </mesh>
        
        {/* Roof - VIBRANT RED */}
        <mesh position={[0, 1.4, 0]} castShadow><coneGeometry args={[0.8, 0.3, 4]} /><meshStandardMaterial color="#E53935" emissive="#C62828" emissiveIntensity={0.4} flatShading /></mesh>
        <mesh position={[0, 1.7, 0]} castShadow><coneGeometry args={[0.6, 0.25, 4]} /><meshStandardMaterial color="#EF5350" emissive="#D32F2F" emissiveIntensity={0.4} flatShading /></mesh>
        
        {/* Window Lights - Point lights for glow effect */}
        <pointLight position={[0.25, 0.5, 0.51]} color="#FFE26A" intensity={1.5} distance={0.8} />
        <pointLight position={[-0.25, 0.5, 0.51]} color="#FFE26A" intensity={1.5} distance={0.8} />
        <pointLight position={[0.2, 0.9, 0.46]} color="#FFE26A" intensity={1.2} distance={0.6} />
        <pointLight position={[-0.2, 0.9, 0.46]} color="#FFE26A" intensity={1.2} distance={0.6} />
        
        {/* Stone Lanterns - MORE VIBRANT */}
        <mesh position={[0.7, 0.6, 0.7]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.3, 8]} /><meshStandardMaterial color="#888888" emissive="#444444" emissiveIntensity={0.2} flatShading /></mesh>
        <mesh position={[-0.7, 0.6, 0.7]} castShadow><cylinderGeometry args={[0.08, 0.08, 0.3, 8]} /><meshStandardMaterial color="#888888" emissive="#444444" emissiveIntensity={0.2} flatShading /></mesh>
        
        {/* Cute Panda */}
        <group position={[0.5, 0.4, -0.5]}>
          <mesh><boxGeometry args={[0.2, 0.2, 0.15]} /><meshStandardMaterial color="#FFFFFF" flatShading /></mesh>
          <mesh position={[0, 0.15, 0]}><boxGeometry args={[0.15, 0.12, 0.12]} /><meshStandardMaterial color="#FFFFFF" flatShading /></mesh>
          <mesh position={[0.05, 0.18, 0.05]}><boxGeometry args={[0.04, 0.04, 0.04]} /><meshStandardMaterial color="#000000" flatShading /></mesh>
          <mesh position={[-0.05, 0.18, 0.05]}><boxGeometry args={[0.04, 0.04, 0.04]} /><meshStandardMaterial color="#000000" flatShading /></mesh>
        </group>
        
        {/* Bamboo - MORE VIBRANT */}
        <mesh position={[-0.8, 0.5, -0.3]}><cylinderGeometry args={[0.06, 0.06, 0.6, 8]} /><meshStandardMaterial color="#9FFF00" emissive="#7CFC00" emissiveIntensity={0.3} flatShading /></mesh>
        
        {/* Flowers - MORE VIBRANT */}
        <mesh position={[0.6, 0.35, 0.3]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.6} flatShading /></mesh>
        <mesh position={[-0.4, 0.35, 0.5]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.6} flatShading /></mesh>
        <mesh position={[0.3, 0.35, 0.6]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.6} flatShading /></mesh>
      </group>
    </Float>
  )
}

// Spring/Cherry Blossom Island - NEW!
const SpringIsland = ({ position, scale = 1, index = 0 }) => {
  const meshRef = useRef()
  const petalsRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      
      // CIRCULAR ORBIT: Synchronized with other islands
      const centerX = 0
      const centerZ = -8
      const orbitRadius = 9
      const orbitSpeed = 0.1
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      meshRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      meshRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
    // Animate petals floating
    if (petalsRef.current) {
      petalsRef.current.children.forEach((petal, i) => {
        petal.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.1
      })
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Island Base - Soft Pink/White */}
        <mesh position={[0, -0.5, 0]} castShadow><boxGeometry args={[2.5, 0.6, 2.5]} /><meshStandardMaterial color="#FFD7E5" roughness={0.9} flatShading /></mesh>
        <mesh position={[0, 0, 0]} castShadow><boxGeometry args={[2.2, 0.4, 2.2]} /><meshStandardMaterial color="#FFE4EC" roughness={0.9} flatShading /></mesh>
        
        {/* Cherry Blossom Trees - HUGE PUFFY BALLOONS */}
        <group position={[0, 0.5, 0]}>
          {/* Tree 1 - GIANT Puffy Tree */}
          <group position={[-0.5, 0, 0.5]}>
            {/* Trunk */}
            <mesh><cylinderGeometry args={[0.12, 0.15, 1.2, 8]} /><meshStandardMaterial color="#5a3a2a" flatShading /></mesh>
            {/* Giant puffy canopy - multiple overlapping spheres for balloon effect */}
            <mesh position={[0, 1.0, 0]}><sphereGeometry args={[0.8, 16, 16]} /><meshStandardMaterial color="#FFB6D9" emissive="#FFB6D9" emissiveIntensity={0.4} flatShading /></mesh>
            <mesh position={[0.3, 1.1, 0.2]}><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#FFC0E0" emissive="#FFC0E0" emissiveIntensity={0.4} flatShading /></mesh>
            <mesh position={[-0.3, 1.1, -0.2]}><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#FFB6D9" emissive="#FFB6D9" emissiveIntensity={0.4} flatShading /></mesh>
            <mesh position={[0, 1.3, 0]}><sphereGeometry args={[0.5, 16, 16]} /><meshStandardMaterial color="#FFCCE6" emissive="#FFCCE6" emissiveIntensity={0.4} flatShading /></mesh>
            <mesh position={[0.2, 0.9, 0.3]}><sphereGeometry args={[0.5, 16, 16]} /><meshStandardMaterial color="#FFD9EC" emissive="#FFD9EC" emissiveIntensity={0.4} flatShading /></mesh>
          </group>
          
          {/* Tree 2 - GIANT Puffy Tree */}
          <group position={[0.6, 0, -0.4]}>
            {/* Trunk */}
            <mesh><cylinderGeometry args={[0.10, 0.13, 1.0, 8]} /><meshStandardMaterial color="#5a3a2a" flatShading /></mesh>
            {/* Giant puffy canopy */}
            <mesh position={[0, 0.9, 0]}><sphereGeometry args={[0.7, 16, 16]} /><meshStandardMaterial color="#FFCCE6" emissive="#FFCCE6" emissiveIntensity={0.4} flatShading /></mesh>
            <mesh position={[0.25, 1.0, 0.2]}><sphereGeometry args={[0.55, 16, 16]} /><meshStandardMaterial color="#FFB6D9" emissive="#FFB6D9" emissiveIntensity={0.4} flatShading /></mesh>
            <mesh position={[-0.25, 1.0, -0.2]}><sphereGeometry args={[0.55, 16, 16]} /><meshStandardMaterial color="#FFC0E0" emissive="#FFC0E0" emissiveIntensity={0.4} flatShading /></mesh>
            <mesh position={[0, 1.15, 0]}><sphereGeometry args={[0.45, 16, 16]} /><meshStandardMaterial color="#FFE0F0" emissive="#FFE0F0" emissiveIntensity={0.4} flatShading /></mesh>
          </group>
        </group>
        
        {/* Japanese Stone Lanterns */}
        <group position={[0.8, 0.4, 0.7]}>
          <mesh><boxGeometry args={[0.12, 0.15, 0.12]} /><meshStandardMaterial color="#8B8B83" flatShading /></mesh>
          <mesh position={[0, 0.12, 0]}><boxGeometry args={[0.15, 0.08, 0.15]} /><meshStandardMaterial color="#A9A9A0" flatShading /></mesh>
          <mesh position={[0, 0.2, 0]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} flatShading /></mesh>
        </group>
        <group position={[-0.7, 0.4, -0.6]}>
          <mesh><boxGeometry args={[0.12, 0.15, 0.12]} /><meshStandardMaterial color="#8B8B83" flatShading /></mesh>
          <mesh position={[0, 0.12, 0]}><boxGeometry args={[0.15, 0.08, 0.15]} /><meshStandardMaterial color="#A9A9A0" flatShading /></mesh>
          <mesh position={[0, 0.2, 0]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} flatShading /></mesh>
        </group>
        
        {/* Floating Petals */}
        <group ref={petalsRef}>
          <mesh position={[0.3, 0.8, 0.2]}><boxGeometry args={[0.06, 0.06, 0.02]} /><meshStandardMaterial color="#FFB6D9" transparent opacity={0.8} flatShading /></mesh>
          <mesh position={[-0.4, 0.9, -0.1]}><boxGeometry args={[0.06, 0.06, 0.02]} /><meshStandardMaterial color="#FFC0E0" transparent opacity={0.8} flatShading /></mesh>
          <mesh position={[0.5, 1.1, 0.3]}><boxGeometry args={[0.06, 0.06, 0.02]} /><meshStandardMaterial color="#FFCCE6" transparent opacity={0.8} flatShading /></mesh>
          <mesh position={[-0.2, 1.0, 0.5]}><boxGeometry args={[0.06, 0.06, 0.02]} /><meshStandardMaterial color="#FFD9EC" transparent opacity={0.8} flatShading /></mesh>
        </group>
        
        {/* Ground Flowers */}
        <mesh position={[0.4, 0.32, 0.3]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.3} flatShading /></mesh>
        <mesh position={[-0.3, 0.32, 0.4]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FFB6D9" emissive="#FFB6D9" emissiveIntensity={0.3} flatShading /></mesh>
        <mesh position={[0.6, 0.32, -0.2]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FFADD9" emissive="#FFADD9" emissiveIntensity={0.3} flatShading /></mesh>
        
        {/* Cute Bunny */}
        <group position={[-0.2, 0.35, 0]}>
          <mesh><boxGeometry args={[0.12, 0.12, 0.1]} /><meshStandardMaterial color="#FFFFFF" flatShading /></mesh>
          <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.1, 0.08, 0.08]} /><meshStandardMaterial color="#FFFFFF" flatShading /></mesh>
          <mesh position={[0.02, 0.15, 0]}><boxGeometry args={[0.03, 0.08, 0.03]} /><meshStandardMaterial color="#FFE4EC" flatShading /></mesh>
          <mesh position={[-0.02, 0.15, 0]}><boxGeometry args={[0.03, 0.08, 0.03]} /><meshStandardMaterial color="#FFE4EC" flatShading /></mesh>
        </group>
        
        {/* Pink Glow */}
        <pointLight position={[0, 0.8, 0]} color="#FFB6D9" intensity={1.5} distance={4} />
      </group>
    </Float>
  )
}

// Waterfall/Rocky Island
const WaterfallIsland = ({ position, scale = 1, index = 0 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      
      // CIRCULAR ORBIT: Same synchronized parameters
      const centerX = 0
      const centerZ = -8
      const orbitRadius = 9
      const orbitSpeed = 0.1
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      meshRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      meshRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Island Base - Darker Brown Rocky Base */}
        <mesh position={[0, -0.8, 0]} castShadow>
          <boxGeometry args={[3, 0.8, 3]} />
          <meshStandardMaterial color="#5C4033" emissive="#3C2823" emissiveIntensity={0.2} roughness={0.95} flatShading />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[2.8, 0.6, 2.8]} />
          <meshStandardMaterial color="#6D5344" emissive="#4D3834" emissiveIntensity={0.2} roughness={0.9} flatShading />
        </mesh>
        
        {/* Vibrant Green Grass Top */}
        <mesh position={[0, 0.2, 0]} receiveShadow>
          <boxGeometry args={[2.6, 0.3, 2.6]} />
          <meshStandardMaterial color="#7CFC00" emissive="#5CB800" emissiveIntensity={0.4} roughness={0.8} flatShading />
        </mesh>
        
        {/* Large Tall Rocky Cliff Formation - Back */}
        <mesh position={[-0.3, 1.2, -0.5]} castShadow>
          <boxGeometry args={[1.2, 2.5, 1]} />
          <meshStandardMaterial color="#8B7355" emissive="#6B5345" emissiveIntensity={0.2} roughness={0.95} flatShading />
        </mesh>
        <mesh position={[-0.8, 0.9, -0.3]} castShadow>
          <boxGeometry args={[0.8, 1.8, 0.8]} />
          <meshStandardMaterial color="#9B8365" emissive="#7B6355" emissiveIntensity={0.2} roughness={0.95} flatShading />
        </mesh>
        <mesh position={[0.3, 1.0, -0.8]} castShadow>
          <boxGeometry args={[0.9, 2.0, 0.7]} />
          <meshStandardMaterial color="#7B6355" emissive="#5B4345" emissiveIntensity={0.2} roughness={0.95} flatShading />
        </mesh>
        
        {/* Medium Rocky Formations - Sides */}
        <mesh position={[0.9, 0.8, 0.3]} castShadow>
          <boxGeometry args={[0.7, 1.6, 0.7]} />
          <meshStandardMaterial color="#8B7355" emissive="#6B5345" emissiveIntensity={0.2} roughness={0.95} flatShading />
        </mesh>
        <mesh position={[-1.0, 0.6, 0.5]} castShadow>
          <boxGeometry args={[0.6, 1.2, 0.6]} />
          <meshStandardMaterial color="#9B8365" emissive="#7B6355" emissiveIntensity={0.2} roughness={0.95} flatShading />
        </mesh>
        
        {/* Water Pool on Top - Bright Cyan */}
        <mesh position={[-0.2, 2.5, -0.4]} castShadow>
          <boxGeometry args={[0.8, 0.15, 0.6]} />
          <meshStandardMaterial 
            color="#00FFFF" 
            emissive="#00FFFF"
            emissiveIntensity={0.8}
            transparent
            opacity={0.85}
            metalness={0.3}
            roughness={0.1}
            flatShading 
          />
        </mesh>
        
        {/* Waterfall Stream - Multiple flowing segments */}
        <mesh position={[0.1, 2.0, 0]} castShadow>
          <boxGeometry args={[0.35, 0.8, 0.25]} />
          <meshStandardMaterial 
            color="#42FFF8" 
            emissive="#42FFF8"
            emissiveIntensity={0.7}
            transparent
            opacity={0.8}
            flatShading 
          />
        </mesh>
        <mesh position={[0.2, 1.3, 0.1]} castShadow>
          <boxGeometry args={[0.4, 1.0, 0.3]} />
          <meshStandardMaterial 
            color="#42FFF8" 
            emissive="#42FFF8"
            emissiveIntensity={0.7}
            transparent
            opacity={0.8}
            flatShading 
          />
        </mesh>
        <mesh position={[0.35, 0.6, 0.25]} castShadow>
          <boxGeometry args={[0.45, 0.9, 0.35]} />
          <meshStandardMaterial 
            color="#87CEEB" 
            emissive="#87CEEB"
            emissiveIntensity={0.6}
            transparent
            opacity={0.75}
            flatShading 
          />
        </mesh>
        <mesh position={[0.5, -0.05, 0.4]} castShadow>
          <boxGeometry args={[0.5, 0.7, 0.4]} />
          <meshStandardMaterial 
            color="#87CEEB" 
            emissive="#87CEEB"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
            flatShading 
          />
        </mesh>
        
        {/* Water Pool at Bottom - Collection */}
        <mesh position={[0.7, 0.3, 0.6]} receiveShadow>
          <boxGeometry args={[0.9, 0.12, 0.8]} />
          <meshStandardMaterial 
            color="#4682B4" 
            emissive="#4682B4"
            emissiveIntensity={0.6}
            transparent
            opacity={0.85}
            metalness={0.3}
            roughness={0.1}
            flatShading 
          />
        </mesh>
        
        {/* Dense Forest Trees - Multiple vibrant trees */}
        <group position={[-0.5, 0.5, 0.3]}>
          <mesh><cylinderGeometry args={[0.12, 0.15, 0.9, 8]} /><meshStandardMaterial color="#5C4033" roughness={0.9} flatShading /></mesh>
          <mesh position={[0, 0.8, 0]}><coneGeometry args={[0.5, 0.8, 8]} /><meshStandardMaterial color="#228B22" emissive="#1a6b1a" emissiveIntensity={0.4} flatShading /></mesh>
          <mesh position={[0, 1.2, 0]}><coneGeometry args={[0.4, 0.6, 8]} /><meshStandardMaterial color="#32CD32" emissive="#28a328" emissiveIntensity={0.4} flatShading /></mesh>
        </group>
        
        <group position={[-0.8, 0.5, -0.1]}>
          <mesh><cylinderGeometry args={[0.10, 0.13, 0.8, 8]} /><meshStandardMaterial color="#5C4033" roughness={0.9} flatShading /></mesh>
          <mesh position={[0, 0.7, 0]}><coneGeometry args={[0.45, 0.7, 8]} /><meshStandardMaterial color="#2E8B57" emissive="#26733f" emissiveIntensity={0.4} flatShading /></mesh>
          <mesh position={[0, 1.0, 0]}><coneGeometry args={[0.35, 0.55, 8]} /><meshStandardMaterial color="#3CB371" emissive="#309359" emissiveIntensity={0.4} flatShading /></mesh>
        </group>
        
        <group position={[0.6, 0.5, -0.5]}>
          <mesh><cylinderGeometry args={[0.11, 0.14, 0.85, 8]} /><meshStandardMaterial color="#6D5344" roughness={0.9} flatShading /></mesh>
          <mesh position={[0, 0.75, 0]}><coneGeometry args={[0.48, 0.75, 8]} /><meshStandardMaterial color="#228B22" emissive="#1a6b1a" emissiveIntensity={0.4} flatShading /></mesh>
          <mesh position={[0, 1.1, 0]}><coneGeometry args={[0.38, 0.58, 8]} /><meshStandardMaterial color="#32CD32" emissive="#28a328" emissiveIntensity={0.4} flatShading /></mesh>
        </group>
        
        {/* Vibrant Green Moss on Rocks */}
        <mesh position={[-0.7, 0.4, -0.5]} castShadow>
          <boxGeometry args={[0.4, 0.25, 0.4]} />
          <meshStandardMaterial color="#6B8E23" emissive="#5a7a1f" emissiveIntensity={0.3} flatShading />
        </mesh>
        <mesh position={[0.8, 0.4, 0.2]} castShadow>
          <boxGeometry args={[0.35, 0.2, 0.35]} />
          <meshStandardMaterial color="#7CFC00" emissive="#6adc00" emissiveIntensity={0.3} flatShading />
        </mesh>
        <mesh position={[0.2, 1.5, -0.3]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.3]} />
          <meshStandardMaterial color="#8FBC8F" emissive="#7a9c7a" emissiveIntensity={0.3} flatShading />
        </mesh>
        
        {/* Cute Frog - Brighter */}
        <group position={[0.8, 0.45, 0.5]}>
          <mesh><boxGeometry args={[0.15, 0.1, 0.15]} /><meshStandardMaterial color="#7CFC00" emissive="#6adc00" emissiveIntensity={0.3} flatShading /></mesh>
          <mesh position={[0, 0.08, 0]}><boxGeometry args={[0.12, 0.08, 0.12]} /><meshStandardMaterial color="#7FFF00" emissive="#6fef00" emissiveIntensity={0.3} flatShading /></mesh>
          <mesh position={[0.04, 0.11, 0.05]}><boxGeometry args={[0.04, 0.04, 0.04]} /><meshStandardMaterial color="#000000" flatShading /></mesh>
          <mesh position={[-0.04, 0.11, 0.05]}><boxGeometry args={[0.04, 0.04, 0.04]} /><meshStandardMaterial color="#000000" flatShading /></mesh>
        </group>
        
        {/* Water Lilies - Brighter */}
        <mesh position={[0.6, 0.42, 0.7]}><boxGeometry args={[0.12, 0.03, 0.12]} /><meshStandardMaterial color="#00FF7F" emissive="#00FF7F" emissiveIntensity={0.5} flatShading /></mesh>
        <mesh position={[0.6, 0.48, 0.7]}><boxGeometry args={[0.06, 0.06, 0.06]} /><meshStandardMaterial color="#FFB6D9" emissive="#FFB6D9" emissiveIntensity={0.6} flatShading /></mesh>
        <mesh position={[0.85, 0.42, 0.5]}><boxGeometry args={[0.12, 0.03, 0.12]} /><meshStandardMaterial color="#00FF7F" emissive="#00FF7F" emissiveIntensity={0.5} flatShading /></mesh>
        <mesh position={[0.85, 0.48, 0.5]}><boxGeometry args={[0.06, 0.06, 0.06]} /><meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.6} flatShading /></mesh>
        
        {/* Reeds/Cattails - Vibrant */}
        <mesh position={[-0.9, 0.6, 0.4]}><cylinderGeometry args={[0.03, 0.03, 0.6, 6]} /><meshStandardMaterial color="#6B8E23" emissive="#5a7a1f" emissiveIntensity={0.2} flatShading /></mesh>
        <mesh position={[-0.95, 0.65, 0.5]}><cylinderGeometry args={[0.03, 0.03, 0.55, 6]} /><meshStandardMaterial color="#6B8E23" emissive="#5a7a1f" emissiveIntensity={0.2} flatShading /></mesh>
        <mesh position={[-0.85, 0.62, 0.45]}><cylinderGeometry args={[0.03, 0.03, 0.58, 6]} /><meshStandardMaterial color="#7CFC00" emissive="#6adc00" emissiveIntensity={0.2} flatShading /></mesh>
        
        {/* Flowers on grass */}
        <mesh position={[-0.4, 0.35, 0.6]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.6} flatShading /></mesh>
        <mesh position={[0.3, 0.35, 0.8]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.6} flatShading /></mesh>
        <mesh position={[-0.6, 0.35, 0.8]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.6} flatShading /></mesh>
        
        {/* Waterfall Lighting Effects */}
        <pointLight position={[0.2, 1.5, 0.2]} color="#42FFF8" intensity={2} distance={3} />
        <pointLight position={[-0.2, 2.5, -0.4]} color="#00FFFF" intensity={1.8} distance={2.5} />
        <pointLight position={[0.7, 0.4, 0.6]} color="#4682B4" intensity={1.5} distance={2} />
      </group>
    </Float>
  )
}

// Volcanic/Lava Island
const VolcanicIsland = ({ position, scale = 1, index = 0 }) => {
  const meshRef = useRef()
  const lavaRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      
      // CIRCULAR ORBIT: Synchronized motion
      const centerX = 0
      const centerZ = -8
      const orbitRadius = 9
      const orbitSpeed = 0.1
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      meshRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      meshRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
    if (lavaRef.current) {
      lavaRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Island Base - Dark Purple/Volcanic Rock */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[2.5, 0.6, 2.5]} />
          <meshStandardMaterial color="#4a2a4a" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.2, 0.4, 2.2]} />
          <meshStandardMaterial color="#6a3a5a" roughness={0.9} flatShading />
        </mesh>
        
        {/* Volcanic Mountains - Purple/Pink */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <coneGeometry args={[0.7, 1.2, 4]} />
          <meshStandardMaterial color="#B565A7" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[-0.5, 0.6, 0.5]} castShadow>
          <coneGeometry args={[0.5, 0.8, 4]} />
          <meshStandardMaterial color="#C77DB3" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[0.6, 0.7, -0.3]} castShadow>
          <coneGeometry args={[0.5, 0.9, 4]} />
          <meshStandardMaterial color="#A855A0" roughness={0.8} flatShading />
        </mesh>
        
        {/* Lava Flow - Glowing Orange/Red */}
        <mesh ref={lavaRef} position={[0.3, 0.3, 0.4]} castShadow>
          <boxGeometry args={[0.4, 0.2, 0.6]} />
          <meshStandardMaterial 
            color="#FF4500" 
            emissive="#FF4500"
            emissiveIntensity={0.6}
            roughness={0.5}
            flatShading 
          />
        </mesh>
        <mesh position={[0.5, -0.1, 0.6]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.4]} />
          <meshStandardMaterial 
            color="#FF6347" 
            emissive="#FF6347"
            emissiveIntensity={0.5}
            roughness={0.5}
            flatShading 
          />
        </mesh>
        
        {/* Cute Fire Salamander */}
        <group position={[-0.7, 0.3, -0.4]}>
          <mesh><boxGeometry args={[0.2, 0.06, 0.1]} /><meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={0.2} flatShading /></mesh>
          <mesh position={[0.1, 0, 0]}><boxGeometry args={[0.08, 0.05, 0.08]} /><meshStandardMaterial color="#FF6347" emissive="#FF6347" emissiveIntensity={0.2} flatShading /></mesh>
          <mesh position={[-0.12, 0, 0]}><boxGeometry args={[0.05, 0.04, 0.05]} /><meshStandardMaterial color="#FF4500" flatShading /></mesh>
        </group>
        
        {/* Volcanic Flowers - Fire Themed */}
        <mesh position={[0.7, 0.22, 0.5]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={0.4} flatShading /></mesh>
        <mesh position={[-0.6, 0.22, 0.3]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FF6347" emissive="#FF6347" emissiveIntensity={0.4} flatShading /></mesh>
        <mesh position={[0.4, 0.22, -0.5]}><boxGeometry args={[0.08, 0.08, 0.08]} /><meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} flatShading /></mesh>
        
        {/* Glowing Point Light for Lava */}
        <pointLight position={[0.3, 0.5, 0.4]} color="#FF4500" intensity={2} distance={3} />
      </group>
    </Float>
  )
}

// Green Forest Island (Original style kept for variety)
const FloatingIsland = ({ position, scale = 1, index = 0 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      
      // CIRCULAR ORBIT: Final island completes the synchronized circle
      const centerX = 0
      const centerZ = -8
      const orbitRadius = 9
      const orbitSpeed = 0.1
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      meshRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      meshRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Bottom Rock Layer - Vibrant stone blocks */}
        <mesh position={[0, -0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.4, 1]} />
          <meshStandardMaterial 
            color="#5a4848" 
            roughness={0.8}
            metalness={0}
            flatShading
          />
        </mesh>
        <mesh position={[0.5, -0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#4a3838" roughness={0.8} flatShading />
        </mesh>
        <mesh position={[-0.5, -0.8, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#6a5858" roughness={0.8} flatShading />
        </mesh>

        {/* Mid Layer - Colorful stone blocks */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.4, 1.6]} />
          <meshStandardMaterial color="#8a7050" roughness={0.7} flatShading />
        </mesh>
        <mesh position={[0.6, -0.4, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#9a8060" roughness={0.7} flatShading />
        </mesh>

        {/* Dirt Layer - Rich brown */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[2, 0.4, 2]} />
          <meshStandardMaterial color="#a67c52" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0.8, 0, 0.8]} receiveShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#b68c62" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[-0.8, 0, -0.8]} receiveShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#967050" roughness={0.9} flatShading />
        </mesh>
        
        {/* Grass Top Layer - Vibrant green pixel blocks */}
        <mesh position={[0, 0.4, 0]} receiveShadow>
          <boxGeometry args={[2.4, 0.4, 2.4]} />
          <meshStandardMaterial 
            color="#5cb85c" 
            roughness={0.85}
            flatShading 
          />
        </mesh>
        <mesh position={[1, 0.4, 1]} receiveShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#6cc76c" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[-1, 0.4, 1]} receiveShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#4ca84c" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[1, 0.4, -1]} receiveShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#5cb85c" roughness={0.85} flatShading />
        </mesh>

        {/* Pixelated Tree */}
        <group position={[0.4, 1, 0.4]}>
          {/* Trunk - Stacked blocks with texture */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.3, 0.4, 0.3]} />
            <meshStandardMaterial color="#6d4c33" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[0.3, 0.4, 0.3]} />
            <meshStandardMaterial color="#7d5c43" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[0.3, 0.4, 0.3]} />
            <meshStandardMaterial color="#6d4c33" roughness={0.9} flatShading />
          </mesh>
          
          {/* Foliage - Vibrant blocky leaves */}
          <mesh position={[0, 1.4, 0]} castShadow>
            <boxGeometry args={[0.8, 0.4, 0.8]} />
            <meshStandardMaterial color="#3d8b3d" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <boxGeometry args={[0.6, 0.4, 0.6]} />
            <meshStandardMaterial color="#4d9b4d" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[0.4, 1.4, 0]} castShadow>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#2d7b2d" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[-0.4, 1.4, 0]} castShadow>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#4d9b4d" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[0, 1.4, 0.4]} castShadow>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#3d8b3d" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[0, 1.4, -0.4]} castShadow>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#5dab5d" roughness={0.85} flatShading />
          </mesh>
        </group>

        {/* Small Rock blocks on Surface - Gray stones */}
        <mesh position={[0.9, 0.8, 0.3]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#8b8b8b" roughness={0.9} flatShading />
        </mesh>
        
        <mesh position={[-0.7, 0.8, 0.5]} castShadow>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#9b9b9b" roughness={0.9} flatShading />
        </mesh>
        
        <mesh position={[0.5, 0.8, -0.7]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#7b7b7b" roughness={0.9} flatShading />
        </mesh>

        {/* Pixel Flowers - Colorful accents */}
        <mesh position={[-0.6, 0.8, -0.6]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshStandardMaterial color="#5dab5d" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[-0.6, 1.1, -0.6]} castShadow>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial 
            color="#ff6b9d" 
            emissive="#ff6b9d"
            emissiveIntensity={0.2}
            roughness={0.7} 
            flatShading 
          />
        </mesh>
        
        <mesh position={[0.7, 0.8, -0.5]} castShadow>
          <boxGeometry args={[0.15, 0.25, 0.15]} />
          <meshStandardMaterial color="#5dab5d" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0.7, 1.05, -0.5]} castShadow>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial 
            color="#ffd700" 
            emissive="#ffd700"
            emissiveIntensity={0.2}
            roughness={0.7} 
            flatShading 
          />
        </mesh>
        
        {/* More Flowers */}
        <mesh position={[-0.3, 0.8, 0.7]} castShadow>
          <boxGeometry args={[0.15, 0.25, 0.15]} />
          <meshStandardMaterial color="#5dab5d" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[-0.3, 1.05, 0.7]} castShadow>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            emissive="#FF69B4"
            emissiveIntensity={0.2}
            roughness={0.7} 
            flatShading 
          />
        </mesh>
        
        <mesh position={[0.2, 0.8, 0.9]} castShadow>
          <boxGeometry args={[0.15, 0.25, 0.15]} />
          <meshStandardMaterial color="#5dab5d" roughness={0.85} flatShading />
        </mesh>
        <mesh position={[0.2, 1.05, 0.9]} castShadow>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial 
            color="#9370DB" 
            emissive="#9370DB"
            emissiveIntensity={0.2}
            roughness={0.7} 
            flatShading 
          />
        </mesh>
        
        {/* Cute Rabbit */}
        <group position={[-0.5, 0.7, 0.2]}>
          <mesh><boxGeometry args={[0.12, 0.12, 0.1]} /><meshStandardMaterial color="#FFFFFF" flatShading /></mesh>
          <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.1, 0.08, 0.08]} /><meshStandardMaterial color="#FFFFFF" flatShading /></mesh>
          <mesh position={[0.02, 0.15, 0]}><boxGeometry args={[0.03, 0.08, 0.03]} /><meshStandardMaterial color="#FFE4EC" flatShading /></mesh>
          <mesh position={[-0.02, 0.15, 0]}><boxGeometry args={[0.03, 0.08, 0.03]} /><meshStandardMaterial color="#FFE4EC" flatShading /></mesh>
          <mesh position={[-0.08, 0.08, 0]}><boxGeometry args={[0.04, 0.04, 0.04]} /><meshStandardMaterial color="#FFFFFF" flatShading /></mesh>
        </group>
      </group>
    </Float>
  )
}

// Realistic Floating Objects (butterflies, birds, leaves)
const FloatingObject = ({ position, type = 'butterfly' }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.4) * 0.5
      
      // Natural rotation
      if (type === 'butterfly') {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.3
      } else if (type === 'bird') {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.2
      }
    }
  })

  if (type === 'butterfly') {
    return (
      <group ref={meshRef} position={position}>
        {/* Butterfly body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.03, 0.15, 4, 8]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.8} />
        </mesh>
        
        {/* Left wing */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <circleGeometry args={[0.12, 16]} />
          <meshStandardMaterial 
            color="#ff8fa3" 
            roughness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Right wing */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <circleGeometry args={[0.12, 16]} />
          <meshStandardMaterial 
            color="#ffa3b5" 
            roughness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    )
  }

  if (type === 'bird') {
    return (
      <group ref={meshRef} position={position}>
        {/* Bird body */}
        <mesh>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
        </mesh>
        
        {/* Left wing */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
          <boxGeometry args={[0.15, 0.02, 0.06]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.9} />
        </mesh>
        
        {/* Right wing */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, -Math.PI / 3]}>
          <boxGeometry args={[0.15, 0.02, 0.06]} />
          <meshStandardMaterial color="#5a5a5a" roughness={0.9} />
        </mesh>
      </group>
    )
  }

  // Falling leaf
  return (
    <mesh ref={meshRef} position={position} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
      <boxGeometry args={[0.08, 0.12, 0.01]} />
      <meshStandardMaterial 
        color="#8a6a3a" 
        roughness={0.95}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Enchanted Portal
const EnchantedPortal = () => {
  const portalRef = useRef()

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group position={[5, 0, -3]}>
      <mesh ref={portalRef}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial 
          color="#A892FF"
          emissive="#A892FF"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial 
          color="#42FFF8"
          emissive="#42FFF8"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      <pointLight color="#A892FF" intensity={3} distance={8} />
    </group>
  )
}

// Main Hero Scene
const HeroScene = () => {
  const cloudRef = useRef()

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-10, 5, -5]} intensity={0.5} color="#A892FF" />
      <pointLight position={[10, -5, -5]} intensity={0.5} color="#FF92DC" />

      {/* Environment */}
      <Environment preset="night" />
      
      {/* Stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={1}
      />

      {/* Magical Sparkles */}
      <Sparkles 
        count={100} 
        scale={15} 
        size={2} 
        speed={0.4}
        color="#FFE26A"
      />

      {/* Floating Islands - 6 Unique Themed Islands with Circular Orbit Movement */}
      {/* Islands positioned far apart in a circular arrangement to prevent collisions */}
      <PyramidIsland position={[-8, -3.5, -5]} scale={1.8} index={0} />
      <TempleIsland position={[8, -2.5, -5]} scale={1.7} index={1} />
      <WaterfallIsland position={[0, -3, -10]} scale={2.0} index={2} />
      <VolcanicIsland position={[-7, -1.5, -12]} scale={1.6} index={3} />
      <FloatingIsland position={[7, -4, -12]} scale={1.9} index={4} />
      <SpringIsland position={[0, -2.8, -3]} scale={1.7} index={5} />
      
      {/* Realistic Floating Objects - Butterflies */}
      <FloatingObject position={[-3, 2, 2]} type="butterfly" />
      <FloatingObject position={[4, 1.5, 1]} type="butterfly" />
      <FloatingObject position={[2, 2.5, -1]} type="butterfly" />
      {/* Birds */}
      <FloatingObject position={[-5, 3, -1]} type="bird" />
      <FloatingObject position={[5, 3.5, -2]} type="bird" />
      {/* Falling Leaves */}
      <FloatingObject position={[1, 4, 0]} type="leaf" />
      <FloatingObject position={[-2, 3.5, 1]} type="leaf" />

      {/* Magical Clouds - Multiple clouds at different positions */}
      <group ref={cloudRef}>
        <Cloud
          position={[0, 4, -8]}
          opacity={0.3}
          speed={0.2}
          width={10}
          depth={1.5}
          segments={20}
          color="#ff69b4"
        />
        <Cloud
          position={[-8, 3, -10]}
          opacity={0.25}
          speed={0.15}
          width={8}
          depth={1.2}
          segments={18}
          color="#ffb6c1"
        />
        <Cloud
          position={[7, 5, -12]}
          opacity={0.28}
          speed={0.18}
          width={9}
          depth={1.3}
          segments={20}
          color="#ffc0cb"
        />
        <Cloud
          position={[-5, 2, -6]}
          opacity={0.2}
          speed={0.22}
          width={7}
          depth={1}
          segments={16}
          color="#ff8fab"
        />
        <Cloud
          position={[9, 3.5, -9]}
          opacity={0.26}
          speed={0.17}
          width={8.5}
          depth={1.4}
          segments={19}
          color="#ffaad5"
        />
        <Cloud
          position={[3, 6, -14]}
          opacity={0.24}
          speed={0.19}
          width={11}
          depth={1.6}
          segments={22}
          color="#ff99cc"
        />
      </group>

      {/* Fog */}
      <fog attach="fog" args={['#0d0520', 5, 25]} />
    </>
  )
}

export default HeroScene
