import React, { useRef, useMemo, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { 
  Float, 
  Sparkles,
  MeshDistortMaterial,
  Trail,
  useGLTF
} from '@react-three/drei'
import * as THREE from 'three'

// Cherry Blossom Island - Huge puffy balloon trees with CIRCULAR ORBIT
const CherryBlossomIsland = ({ position, scale = 1, index = 0 }) => {
  const islandRef = useRef()
  
  useFrame((state) => {
    if (islandRef.current) {
      // Gentle self-rotation
      islandRef.current.rotation.y += 0.001
      
      // CIRCULAR ORBIT ANIMATION (optimized for Skills view)
      const centerX = 0
      const centerZ = -5  // Closer to camera
      const orbitRadius = 7  // Smaller radius for better view
      const orbitSpeed = 0.1
      
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      islandRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      islandRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <group ref={islandRef} position={position} scale={scale}>
      {/* Island base - larger and more detailed */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.5, 2.8, 1.5, 16]} />
        <meshStandardMaterial color="#7A5C48" roughness={0.9} />
      </mesh>
      
      {/* Grass layers */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[3.6, 3.5, 0.15, 16]} />
        <meshStandardMaterial color="#88D498" emissive="#88D498" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[3.55, 3.6, 0.05, 16]} />
        <meshStandardMaterial color="#9FE8AF" emissive="#9FE8AF" emissiveIntensity={0.3} />
      </mesh>

      {/* GIANT Cherry Blossom Tree 1 - Main centerpiece */}
      <mesh position={[-1, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.35, 2.5, 12]} />
        <meshStandardMaterial color="#6B4423" roughness={0.8} />
      </mesh>
      {/* Massive puffy foliage - like a giant cotton candy cloud */}
      <mesh position={[-1, 3.5, 0]}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshStandardMaterial color="#FFB7D5" emissive="#FFB7D5" emissiveIntensity={0.7} transparent opacity={0.95} />
      </mesh>
      <mesh position={[-1.6, 3.2, 0.5]}>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshStandardMaterial color="#FFC9E3" emissive="#FFC9E3" emissiveIntensity={0.6} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.4, 3.0, 0.6]}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshStandardMaterial color="#FFD4EB" emissive="#FFD4EB" emissiveIntensity={0.6} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-1.2, 4.2, -0.4]}>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshStandardMaterial color="#FFAED5" emissive="#FFAED5" emissiveIntensity={0.7} transparent opacity={0.88} />
      </mesh>
      <mesh position={[-0.8, 3.8, 0.8]}>
        <sphereGeometry args={[0.9, 20, 20]} />
        <meshStandardMaterial color="#FFE0F0" emissive="#FFE0F0" emissiveIntensity={0.5} transparent opacity={0.85} />
      </mesh>
      <pointLight position={[-1, 3.5, 0]} color="#FFB7D5" intensity={4} distance={6} />

      {/* GIANT Cherry Blossom Tree 2 */}
      <mesh position={[1.8, 1.4, 0.8]} castShadow>
        <cylinderGeometry args={[0.28, 0.32, 2.2, 12]} />
        <meshStandardMaterial color="#6B4423" roughness={0.8} />
      </mesh>
      <mesh position={[1.8, 3.0, 0.8]}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshStandardMaterial color="#FFC0DB" emissive="#FFC0DB" emissiveIntensity={0.7} transparent opacity={0.95} />
      </mesh>
      <mesh position={[1.3, 2.7, 1.2]}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshStandardMaterial color="#FFD0E8" emissive="#FFD0E8" emissiveIntensity={0.6} transparent opacity={0.9} />
      </mesh>
      <mesh position={[2.2, 2.6, 0.4]}>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshStandardMaterial color="#FFBAD8" emissive="#FFBAD8" emissiveIntensity={0.6} transparent opacity={0.9} />
      </mesh>
      <mesh position={[1.9, 3.6, 1.0]}>
        <sphereGeometry args={[1.0, 20, 20]} />
        <meshStandardMaterial color="#FFAFD3" emissive="#FFAFD3" emissiveIntensity={0.7} transparent opacity={0.88} />
      </mesh>
      <pointLight position={[1.8, 3.0, 0.8]} color="#FFC0DB" intensity={3.5} distance={6} />

      {/* Cute bunny under tree */}
      <group position={[-0.5, 0.95, 0.8]}>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Bunny ears */}
        <mesh position={[-0.06, 0.35, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.02, 0.12, 8, 8]} />
          <meshStandardMaterial color="#FFE0F0" />
        </mesh>
        <mesh position={[0.06, 0.35, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.02, 0.12, 8, 8]} />
          <meshStandardMaterial color="#FFE0F0" />
        </mesh>
      </group>

      {/* Deer grazing */}
      <group position={[1.2, 0.95, -0.6]} rotation={[0, -0.5, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.12, 0.3, 8, 8]} />
          <meshStandardMaterial color="#D4A574" />
        </mesh>
        <mesh position={[0, 0.35, 0.05]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#D4A574" />
        </mesh>
        {/* Antlers */}
        <mesh position={[-0.05, 0.45, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        <mesh position={[0.05, 0.45, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
      </group>

      {/* Cherry blossom petals falling */}
      <Sparkles count={50} scale={4} size={4} speed={0.2} color="#FFB7D5" opacity={0.7} />
      
      {/* Decorative rocks */}
      <mesh position={[2.2, 0.95, -0.8]} castShadow>
        <dodecahedronGeometry args={[0.2]} />
        <meshStandardMaterial color="#A8A8A8" roughness={0.7} />
      </mesh>
      <mesh position={[-2.3, 0.95, 1.0]} castShadow>
        <dodecahedronGeometry args={[0.25]} />
        <meshStandardMaterial color="#989898" roughness={0.7} />
      </mesh>

      {/* Magical glow underneath */}
      <pointLight position={[0, -0.7, 0]} color="#E8B4FF" intensity={3} distance={8} />
      <pointLight position={[0, 2, 3]} color="#FFCDE5" intensity={2} distance={10} />
    </group>
  )
}

// Floating Island Model Component with biome system
const FloatingIsland = ({ position = [0, 0, -5], scale = 1, rotation = [0, 0, 0] }) => {
  const islandRef = useRef()
  
  // Try to load the model
  let model = null
  try {
    model = useGLTF('/models/floating-island.glb')
  } catch (error) {
    console.log('Model not found, using procedural islands')
  }

  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      islandRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={islandRef} position={position} scale={scale} rotation={rotation}>
      {model && model.scene ? (
        <primitive object={model.scene.clone()} />
      ) : (
        <CherryBlossomIsland position={[0, 0, 0]} />
      )}
    </group>
  )
}

// Egyptian Pyramid Island - Mummified ancient pyramid with CIRCULAR ORBIT
const PyramidIsland = ({ position, scale = 1, index = 1 }) => {
  const islandRef = useRef()
  
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001
      
      const centerX = 0
      const centerZ = -5  // Closer to camera
      const orbitRadius = 7  // Smaller radius for better view
      const orbitSpeed = 0.1
      
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      islandRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      islandRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <group ref={islandRef} position={position} scale={scale}>
      {/* Desert island base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.5, 2.8, 1.5, 16]} />
        <meshStandardMaterial color="#C4A570" roughness={0.95} />
      </mesh>
      
      {/* Sand dunes layers */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[3.6, 3.5, 0.15, 16]} />
        <meshStandardMaterial color="#E8D4A0" emissive="#E8D4A0" emissiveIntensity={0.1} />
      </mesh>

      {/* Large Egyptian Pyramid - weathered and mummified */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <coneGeometry args={[1.8, 3.2, 4]} />
        <meshStandardMaterial 
          color="#D4B896" 
          emissive="#FFE4A0" 
          emissiveIntensity={0.15}
          roughness={0.9}
        />
      </mesh>
      
      {/* Weathered texture blocks on pyramid */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[2.8, 0.4, 2.8]} />
        <meshStandardMaterial color="#C4A570" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[2.4, 0.4, 2.4]} />
        <meshStandardMaterial color="#CEB080" roughness={0.95} />
      </mesh>
      <mesh position={[0, 2.0, 0]} castShadow>
        <boxGeometry args={[2.0, 0.4, 2.0]} />
        <meshStandardMaterial color="#D8BA8C" roughness={0.95} />
      </mesh>

      {/* Pyramid entrance */}
      <mesh position={[0, 1.5, 0.9]}>
        <boxGeometry args={[0.5, 0.8, 0.3]} />
        <meshStandardMaterial color="#2C1810" emissive="#FFD700" emissiveIntensity={0.2} />
      </mesh>

      {/* Ancient obelisks */}
      <mesh position={[-1.8, 1.3, 0.8]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 1.6, 8]} />
        <meshStandardMaterial color="#A89068" roughness={0.9} />
      </mesh>
      <mesh position={[-1.8, 2.2, 0.8]}>
        <coneGeometry args={[0.12, 0.3, 8]} />
        <meshStandardMaterial color="#A89068" roughness={0.9} />
      </mesh>

      <mesh position={[1.8, 1.2, -0.8]} castShadow>
        <cylinderGeometry args={[0.1, 0.13, 1.4, 8]} />
        <meshStandardMaterial color="#A89068" roughness={0.9} />
      </mesh>
      <mesh position={[1.8, 2.0, -0.8]}>
        <coneGeometry args={[0.1, 0.25, 8]} />
        <meshStandardMaterial color="#A89068" roughness={0.9} />
      </mesh>

      {/* Cute camel */}
      <group position={[1.2, 1.0, 0.5]} rotation={[0, -0.8, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <capsuleGeometry args={[0.15, 0.4, 8, 8]} />
          <meshStandardMaterial color="#D4A880" />
        </mesh>
        {/* Camel humps */}
        <mesh position={[-0.05, 0.45, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#C89870" />
        </mesh>
        <mesh position={[0.08, 0.42, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#C89870" />
        </mesh>
        {/* Head */}
        <mesh position={[0.2, 0.35, 0]}>
          <capsuleGeometry args={[0.08, 0.15, 8, 8]} />
          <meshStandardMaterial color="#D4A880" />
        </mesh>
      </group>

      {/* Scarab beetle */}
      <group position={[-0.8, 0.92, 1.2]} rotation={[0, 1.5, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#1C4C7C" emissive="#1C4C7C" emissiveIntensity={0.5} metalness={0.8} />
        </mesh>
      </group>

      {/* Palm trees */}
      <mesh position={[-2.2, 1.2, -0.6]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 1.5, 8]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>
      {/* Palm leaves */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh 
          key={i}
          position={[-2.2, 2.0, -0.6]} 
          rotation={[0.3, (Math.PI * 2 / 6) * i, 0]}
        >
          <boxGeometry args={[0.8, 0.05, 0.15]} />
          <meshStandardMaterial color="#7CB342" emissive="#7CB342" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Sand particles */}
      <Sparkles count={25} scale={4} size={2} speed={0.15} color="#FFE4A0" opacity={0.4} />
      
      {/* Ancient urns */}
      <mesh position={[0.8, 0.98, -1.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.25, 12]} />
        <meshStandardMaterial color="#A4724C" roughness={0.8} />
      </mesh>

      {/* Golden glow */}
      <pointLight position={[0, 2.5, 0]} color="#FFD700" intensity={2.5} distance={8} />
      <pointLight position={[0, -0.7, 0]} color="#FFA500" intensity={2} distance={8} />
    </group>
  )
}

// Spring Flower Island - Realistic flowers with petals and CIRCULAR ORBIT
const SpringIsland = ({ position, scale = 1, index = 2 }) => {
  const islandRef = useRef()
  const petalsRef = useRef([])
  
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001
      
      const centerX = 0
      const centerZ = -5  // Closer to camera
      const orbitRadius = 7  // Smaller radius for better view
      const orbitSpeed = 0.1
      
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      islandRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      islandRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
    
    // Animate flower petals gently
    petalsRef.current.forEach((petal, i) => {
      if (petal) {
        petal.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.1
      }
    })
  })

  const FlowerWithPetals = ({ position, color, petalColor, scale = 1 }) => (
    <group position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#7CB342" />
      </mesh>
      
      {/* Flower center */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      
      {/* Realistic petals - 8 petals arranged in circle */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (Math.PI * 2 / 8) * i
        const petalX = Math.cos(angle) * 0.12
        const petalZ = Math.sin(angle) * 0.12
        
        return (
          <mesh 
            key={i}
            position={[petalX, 0.4, petalZ]}
            rotation={[Math.PI / 2, angle, 0]}
            ref={(el) => (petalsRef.current[i] = el)}
          >
            <capsuleGeometry args={[0.06, 0.1, 8, 8]} />
            <meshStandardMaterial 
              color={petalColor} 
              emissive={petalColor} 
              emissiveIntensity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
      
      {/* Leaves */}
      <mesh position={[0.08, 0.2, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.15, 0.05, 0.08]} />
        <meshStandardMaterial color="#7CB342" />
      </mesh>
      <mesh position={[-0.08, 0.15, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.15, 0.05, 0.08]} />
        <meshStandardMaterial color="#7CB342" />
      </mesh>
    </group>
  )

  return (
    <group ref={islandRef} position={position}>
      {/* Island base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.5, 2.8, 1.5, 16]} />
        <meshStandardMaterial color="#6B8E23" roughness={0.9} />
      </mesh>
      
      {/* Lush grass */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[3.6, 3.5, 0.15, 16]} />
        <meshStandardMaterial color="#9ACD32" emissive="#9ACD32" emissiveIntensity={0.3} />
      </mesh>

      {/* Field of detailed flowers */}
      <FlowerWithPetals position={[-1.2, 0.9, 0.8]} color="#FFD700" petalColor="#FFEB3B" scale={1.2} />
      <FlowerWithPetals position={[1.5, 0.9, 0.5]} color="#FF69B4" petalColor="#FFB6C1" scale={1.1} />
      <FlowerWithPetals position={[-0.5, 0.9, -1.3]} color="#9370DB" petalColor="#DDA0DD" scale={1.0} />
      <FlowerWithPetals position={[0.8, 0.9, -0.9]} color="#FF4500" petalColor="#FF6347" scale={1.15} />
      <FlowerWithPetals position={[-1.8, 0.9, -0.3]} color="#00CED1" petalColor="#AFEEEE" scale={0.9} />
      <FlowerWithPetals position={[2.0, 0.9, -0.8]} color="#FF1493" petalColor="#FF69B4" scale={1.0} />
      <FlowerWithPetals position={[0.2, 0.9, 1.5]} color="#FFD700" petalColor="#FFF8DC" scale={1.1} />
      <FlowerWithPetals position={[-2.2, 0.9, 0.5]} color="#9370DB" petalColor="#E6E6FA" scale={0.95} />

      {/* Cute butterfly */}
      <group position={[0.5, 1.8, 0.3]}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.03, 0.12, 8, 8]} />
          <meshStandardMaterial color="#4B0082" />
        </mesh>
        {/* Wings */}
        <mesh position={[-0.08, 0, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.15, 0.001, 0.2]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            emissive="#FF69B4" 
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0.08, 0, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.15, 0.001, 0.2]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            emissive="#FF69B4" 
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Cute ladybug */}
      <group position={[-0.8, 0.92, 0.5]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#DC143C" />
        </mesh>
        {/* Black spots */}
        <mesh position={[0.03, 0.05, 0.06]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[-0.03, 0.05, 0.06]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Mushrooms */}
      <group position={[1.8, 0.9, 1.2]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.2, 12]} />
          <meshStandardMaterial color="#F5DEB3" />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#DC143C" emissive="#DC143C" emissiveIntensity={0.2} />
        </mesh>
        {/* White spots */}
        <mesh position={[0.05, 0.25, 0.08]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Pollen particles */}
      <Sparkles count={40} scale={4} size={3} speed={0.2} color="#FFD700" opacity={0.6} />

      {/* Glows */}
      <pointLight position={[0, 1.5, 0]} color="#FFD700" intensity={2} distance={8} />
      <pointLight position={[0, -0.7, 0]} color="#9ACD32" intensity={2.5} distance={8} />
    </group>
  )
}

// Frozen Mountain Island - Melting snow at top with CIRCULAR ORBIT
const FrozenIsland = ({ position, scale = 1, index = 3 }) => {
  const islandRef = useRef()
  const dripRefs = useRef([])
  
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001
      
      const centerX = 0
      const centerZ = -5  // Closer to camera
      const orbitRadius = 7  // Smaller radius for better view
      const orbitSpeed = 0.1
      
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      islandRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      islandRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
    
    // Animate water drips
    dripRefs.current.forEach((drip, i) => {
      if (drip) {
        drip.position.y = -0.3 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.15
      }
    })
  })

  return (
    <group ref={islandRef} position={position} scale={scale}>
      {/* Rocky ice island base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.2, 2.5, 1.5, 16]} />
        <meshStandardMaterial color="#7C9FB0" roughness={0.3} metalness={0.4} />
      </mesh>
      
      {/* Snow layer */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[3.3, 3.2, 0.2, 16]} />
        <meshStandardMaterial color="#F0F8FF" emissive="#E0F0FF" emissiveIntensity={0.3} />
      </mesh>

      {/* Large frozen mountain */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1.6, 3.5, 8]} />
        <meshStandardMaterial 
          color="#B0D4E3" 
          emissive="#D0E8F0" 
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>

      {/* Melting snow cap at peak - with drips */}
      <mesh position={[0, 4.0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#E0F0FF" 
          emissiveIntensity={0.4}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Water drips falling from melting snow */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (Math.PI * 2 / 5) * i
        const x = Math.cos(angle) * 0.3
        const z = Math.sin(angle) * 0.3
        
        return (
          <mesh 
            key={i}
            position={[x, 3.7, z]}
            ref={(el) => (dripRefs.current[i] = el)}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#87CEEB" 
              emissive="#87CEEB" 
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}

      {/* Ice crystals on sides */}
      <mesh position={[-1.2, 1.5, 0.8]} rotation={[0.3, 0, 0]} castShadow>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial 
          color="#B0E0E6" 
          emissive="#D0F0FF" 
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[1.5, 1.8, -0.6]} rotation={[-0.2, 0.5, 0]} castShadow>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial 
          color="#B0E0E6" 
          emissive="#D0F0FF" 
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
          metalness={0.8}
        />
      </mesh>

      {/* Cute penguin */}
      <group position={[0.8, 0.95, 1.0]} rotation={[0, -0.5, 0]}>
        {/* Body */}
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.12, 0.2, 12, 12]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        {/* Belly */}
        <mesh position={[0, 0.2, 0.11]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.38, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        {/* Beak */}
        <mesh position={[0, 0.38, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.02, 0.06, 8]} />
          <meshStandardMaterial color="#FF8C00" />
        </mesh>
        {/* Flippers */}
        <mesh position={[-0.12, 0.18, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.08, 0.03, 0.15]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
        <mesh position={[0.12, 0.18, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.08, 0.03, 0.15]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      </group>

      {/* Seal */}
      <group position={[-1.3, 0.92, -0.8]} rotation={[0, 1.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.1, 0.3, 12, 12]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
      </group>

      {/* Snowflakes */}
      <Sparkles count={35} scale={4} size={3} speed={0.1} color="#FFFFFF" opacity={0.7} />

      {/* Ice cave entrance */}
      <mesh position={[-1.8, 1.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#4682B4" 
          emissive="#87CEEB" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Lights */}
      <pointLight position={[0, 3, 0]} color="#E0F0FF" intensity={3} distance={10} />
      <pointLight position={[0, -0.7, 0]} color="#87CEEB" intensity={2.5} distance={8} />
    </group>
  )
}

// Lava/Volcanic Island - Melting lava at bottom with CIRCULAR ORBIT
const LavaIsland = ({ position, scale = 1, index = 4 }) => {
  const islandRef = useRef()
  const lavaRefs = useRef([])
  
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001
      
      const centerX = 0
      const centerZ = -5  // Closer to camera
      const orbitRadius = 7  // Smaller radius for better view
      const orbitSpeed = 0.1
      
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      islandRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      islandRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
    
    // Animate lava drips
    lavaRefs.current.forEach((lava, i) => {
      if (lava) {
        lava.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.2
        lava.material.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2
      }
    })
  })

  return (
    <group ref={islandRef} position={position} scale={scale}>
      {/* Volcanic rock base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.2, 2.5, 1.5, 16]} />
        <meshStandardMaterial color="#2C1810" roughness={0.95} />
      </mesh>
      
      {/* Charred surface */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[3.3, 3.2, 0.15, 16]} />
        <meshStandardMaterial color="#3C2820" emissive="#FF4500" emissiveIntensity={0.2} />
      </mesh>

      {/* Volcano cone */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <coneGeometry args={[1.8, 2.8, 8]} />
        <meshStandardMaterial 
          color="#4C3020" 
          emissive="#FF4500" 
          emissiveIntensity={0.3}
          roughness={0.9}
        />
      </mesh>

      {/* Volcano crater with glowing lava */}
      <mesh position={[0, 3.4, 0]}>
        <cylinderGeometry args={[0.6, 0.4, 0.3, 16]} />
        <meshStandardMaterial 
          color="#FF4500" 
          emissive="#FF6600" 
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Molten lava dripping from bottom of island */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (Math.PI * 2 / 8) * i
        const x = Math.cos(angle) * 2.0
        const z = Math.sin(angle) * 2.0
        
        return (
          <mesh 
            key={i}
            position={[x, -0.7, z]}
            ref={(el) => (lavaRefs.current[i] = el)}
          >
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial 
              color="#FF4500" 
              emissive="#FF6600" 
              emissiveIntensity={0.9}
            />
          </mesh>
        )
      })}

      {/* Lava streams flowing down */}
      <mesh position={[1.2, 1.5, 0.8]}>
        <capsuleGeometry args={[0.12, 0.8, 8, 8]} />
        <meshStandardMaterial 
          color="#FF6600" 
          emissive="#FF8800" 
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[-1.0, 1.3, -0.9]}>
        <capsuleGeometry args={[0.1, 0.7, 8, 8]} />
        <meshStandardMaterial 
          color="#FF6600" 
          emissive="#FF8800" 
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Volcanic rocks */}
      <mesh position={[1.8, 0.95, -0.5]} castShadow>
        <dodecahedronGeometry args={[0.25]} />
        <meshStandardMaterial color="#3C2820" roughness={0.9} />
      </mesh>
      <mesh position={[-1.5, 1.0, 1.0]} castShadow>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#4C3020" emissive="#FF4500" emissiveIntensity={0.2} />
      </mesh>

      {/* Cute fire salamander */}
      <group position={[0.5, 0.95, 1.2]} rotation={[0, -1, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <capsuleGeometry args={[0.08, 0.25, 8, 8]} />
          <meshStandardMaterial color="#FF6600" emissive="#FF8800" emissiveIntensity={0.6} />
        </mesh>
        {/* Tail */}
        <mesh position={[-0.15, 0.05, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.04, 0.15, 8, 8]} />
          <meshStandardMaterial color="#FF4500" emissive="#FF6600" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* Phoenix bird */}
      <group position={[-1.2, 2.8, 0.5]}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#FF6600" emissive="#FF8800" emissiveIntensity={0.8} />
        </mesh>
        {/* Wings */}
        <mesh position={[-0.12, 0, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.2, 0.02, 0.15]} />
          <meshStandardMaterial 
            color="#FF4500" 
            emissive="#FF8800" 
            emissiveIntensity={1.0}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.2, 0.02, 0.15]} />
          <meshStandardMaterial 
            color="#FF4500" 
            emissive="#FF8800" 
            emissiveIntensity={1.0}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Smoke/ash particles */}
      <Sparkles count={30} scale={4} size={4} speed={0.4} color="#A0A0A0" opacity={0.5} />

      {/* Obsidian crystals */}
      <mesh position={[-2.0, 1.1, -0.3]} castShadow>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial 
          color="#1C1C1C" 
          emissive="#FF4500" 
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Intense lava glow */}
      <pointLight position={[0, 3.4, 0]} color="#FF6600" intensity={5} distance={10} />
      <pointLight position={[0, -0.7, 0]} color="#FF4500" intensity={4} distance={10} />
      <pointLight position={[1.2, 1.5, 0.8]} color="#FF8800" intensity={2} distance={5} />
    </group>
  )
}

// Placeholder for future biomes expansion
// Mystical Island with CIRCULAR ORBIT
const MysticalIsland = ({ position, scale = 1, index = 5 }) => {
  const islandRef = useRef()
  
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001
      
      const centerX = 0
      const centerZ = -5  // Closer to camera
      const orbitRadius = 7  // Smaller radius for better view
      const orbitSpeed = 0.1
      
      const baseAngle = index * (Math.PI * 2 / 6)
      const timeAngle = state.clock.elapsedTime * orbitSpeed
      const currentAngle = baseAngle + timeAngle
      
      islandRef.current.position.x = centerX + orbitRadius * Math.cos(currentAngle)
      islandRef.current.position.z = centerZ + orbitRadius * Math.sin(currentAngle)
      islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })
  
  return (
    <group ref={islandRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[3, 2.5, 1.5, 16]} />
        <meshStandardMaterial color="#9370DB" emissive="#9370DB" emissiveIntensity={0.4} />
      </mesh>
      <Sparkles count={50} scale={5} size={5} speed={0.3} color="#DA70D6" opacity={0.8} />
      <pointLight position={[0, 2, 0]} color="#DA70D6" intensity={4} distance={10} />
    </group>
  )
}

// All 6 Islands in circular orbit (optimized for Skills view)
const FloatingIslandDisplay = () => {
  // Islands positioned higher and scaled down for better visibility
  const baseY = -1
  const islandScale = 0.6  // Smaller islands for clearer view
  
  return (
    <group>
      <CherryBlossomIsland position={[0, baseY, 0]} scale={islandScale} index={0} />
      <PyramidIsland position={[0, baseY, 0]} scale={islandScale} index={1} />
      <SpringIsland position={[0, baseY, 0]} scale={islandScale} index={2} />
      <FrozenIsland position={[0, baseY, 0]} scale={islandScale} index={3} />
      <LavaIsland position={[0, baseY, 0]} scale={islandScale} index={4} />
      <MysticalIsland position={[0, baseY, 0]} scale={islandScale} index={5} />
    </group>
  )
}

// Keep old component for compatibility
const OldFloatingIsland = ({ position = [0, 0, -5], scale = 1, rotation = [0, 0, 0] }) => {
  const islandRef = useRef()
  
  let model = null
  try {
    model = useGLTF('/models/floating-island.glb')
  } catch (error) {
    console.log('Model not found, using procedural islands')
  }

  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      islandRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={islandRef} position={position} scale={scale} rotation={rotation}>
      {model && model.scene ? (
        <primitive object={model.scene.clone()} />
      ) : (
        // Fallback now uses all islands
        <group>
          {/* Island base */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[2.5, 2, 1, 8]} />
            <meshStandardMaterial color="#8B7355" />
          </mesh>
          {/* Grass top */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[2.6, 2.5, 0.3, 8]} />
            <meshStandardMaterial color="#9FD89F" emissive="#9FD89F" emissiveIntensity={0.3} />
          </mesh>
          
          {/* Cherry Blossom Tree 1 - Large puffy balloon-like */}
          {/* Tree trunk */}
          <mesh position={[-1.2, 1.3, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 1.8, 8]} />
            <meshStandardMaterial color="#6B4423" />
          </mesh>
          {/* Large puffy foliage - multiple overlapping spheres */}
          <mesh position={[-1.2, 2.5, 0]}>
            <sphereGeometry args={[1.2, 16, 16]} />
            <meshStandardMaterial 
              color="#FFB7D5" 
              emissive="#FFB7D5" 
              emissiveIntensity={0.6}
              transparent
              opacity={0.95}
            />
          </mesh>
          <mesh position={[-1.5, 2.3, 0.3]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial 
              color="#FFC9E3" 
              emissive="#FFC9E3" 
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh position={[-0.9, 2.2, 0.5]}>
            <sphereGeometry args={[0.9, 16, 16]} />
            <meshStandardMaterial 
              color="#FFD4EB" 
              emissive="#FFD4EB" 
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh position={[-1.3, 2.8, -0.3]}>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshStandardMaterial 
              color="#FFAED5" 
              emissive="#FFAED5" 
              emissiveIntensity={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Pink glow light */}
          <pointLight position={[-1.2, 2.5, 0]} color="#FFB7D5" intensity={3} distance={4} />

          {/* Cherry Blossom Tree 2 - Large puffy balloon-like */}
          {/* Tree trunk */}
          <mesh position={[1.4, 1.1, 0.6]}>
            <cylinderGeometry args={[0.16, 0.2, 1.5, 8]} />
            <meshStandardMaterial color="#6B4423" />
          </mesh>
          {/* Large puffy foliage */}
          <mesh position={[1.4, 2.2, 0.6]}>
            <sphereGeometry args={[1.1, 16, 16]} />
            <meshStandardMaterial 
              color="#FFC0DB" 
              emissive="#FFC0DB" 
              emissiveIntensity={0.6}
              transparent
              opacity={0.95}
            />
          </mesh>
          <mesh position={[1.1, 2.0, 0.8]}>
            <sphereGeometry args={[0.75, 16, 16]} />
            <meshStandardMaterial 
              color="#FFD0E8" 
              emissive="#FFD0E8" 
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh position={[1.6, 1.9, 0.3]}>
            <sphereGeometry args={[0.85, 16, 16]} />
            <meshStandardMaterial 
              color="#FFBAD8" 
              emissive="#FFBAD8" 
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh position={[1.5, 2.6, 0.7]}>
            <sphereGeometry args={[0.65, 16, 16]} />
            <meshStandardMaterial 
              color="#FFAFD3" 
              emissive="#FFAFD3" 
              emissiveIntensity={0.6}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Pink glow light */}
          <pointLight position={[1.4, 2.2, 0.6]} color="#FFC0DB" intensity={2.5} distance={4} />

          {/* Cherry Blossom Tree 3 - Smaller background tree */}
          <mesh position={[0.2, 0.9, -1]}>
            <cylinderGeometry args={[0.12, 0.15, 1.2, 8]} />
            <meshStandardMaterial color="#6B4423" />
          </mesh>
          <mesh position={[0.2, 1.8, -1]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial 
              color="#FFCDE5" 
              emissive="#FFCDE5" 
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh position={[0.4, 1.6, -0.8]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial 
              color="#FFB7D5" 
              emissive="#FFB7D5" 
              emissiveIntensity={0.5}
              transparent
              opacity={0.85}
            />
          </mesh>
          <pointLight position={[0.2, 1.8, -1]} color="#FFCDE5" intensity={1.5} distance={3} />

          {/* Falling petals effect */}
          <Sparkles count={30} scale={3} size={3} speed={0.3} color="#FFB7D5" opacity={0.6} />
          
          {/* Rocks for detail */}
          <mesh position={[1, 0.65, -0.8]}>
            <dodecahedronGeometry args={[0.15]} />
            <meshStandardMaterial color="#A0A0A0" />
          </mesh>
          <mesh position={[-1.8, 0.65, 0.8]}>
            <dodecahedronGeometry args={[0.2]} />
            <meshStandardMaterial color="#909090" />
          </mesh>
          
          {/* Magical glow underneath island */}
          <pointLight position={[0, -0.5, 0]} color="#E8B4FF" intensity={2.5} distance={6} />
          
          {/* Ambient pink glow around island */}
          <pointLight position={[0, 1.5, 2]} color="#FFCDE5" intensity={1.5} distance={8} />
        </group>
      )}
    </group>
  )
}

// Floating Skill Orb
const SkillOrb = ({ position, color, size = 0.5, speed = 1 }) => {
  const orbRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        {/* Main Orb */}
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[size, 1]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Glow Effect */}
        <mesh ref={glowRef} scale={1.2}>
          <icosahedronGeometry args={[size, 1]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Point Light */}
        <pointLight color={color} intensity={2} distance={5} />
      </group>
    </Float>
  )
}

// Orbiting Particles
const OrbitingParticles = () => {
  const particlesRef = useRef()

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const particlePositions = useMemo(() => {
    const positions = []
    const radius = 4
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = Math.sin(i * 0.5) * 2
      positions.push([x, y, z])
    }
    return positions
  }, [])

  return (
    <group ref={particlesRef}>
      {particlePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color="#FFE26A"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

// Magical Pixel Butterfly - Realistic with gradient wings
const PixelButterfly = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const butterflyRef = useRef()
  const leftWingRef = useRef()
  const rightWingRef = useRef()
  
  useFrame((state) => {
    if (butterflyRef.current) {
      butterflyRef.current.rotation.y = state.clock.elapsedTime * 0.5
      butterflyRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.4
    }
    
    // Animated wing flapping
    if (leftWingRef.current && rightWingRef.current) {
      const flapAmount = Math.sin(state.clock.elapsedTime * 4) * 0.3
      leftWingRef.current.rotation.y = flapAmount
      rightWingRef.current.rotation.y = -flapAmount
    }
  })

  const PixelBlock = ({ pos, color, size = 0.06, emissive = 0.6 }) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} metalness={0.3} roughness={0.4} />
    </mesh>
  )

  return (
    <group ref={butterflyRef} position={position} scale={scale} rotation={rotation}>
      {/* Body - Blue gradient */}
      <PixelBlock pos={[0, 0.1, 0]} color="#42D4F8" size={0.05} emissive={0.7} />
      <PixelBlock pos={[0, 0.04, 0]} color="#42C8F8" size={0.05} emissive={0.7} />
      <PixelBlock pos={[0, -0.02, 0]} color="#42BCF8" size={0.05} emissive={0.7} />
      <PixelBlock pos={[0, -0.08, 0]} color="#42B0F8" size={0.05} emissive={0.7} />
      <PixelBlock pos={[0, -0.14, 0]} color="#42A4F8" size={0.05} emissive={0.7} />
      
      {/* Head */}
      <PixelBlock pos={[0, 0.16, 0]} color="#5CE0FF" size={0.06} emissive={0.8} />
      
      {/* Antennae */}
      <PixelBlock pos={[-0.03, 0.22, 0]} color="#42D4F8" size={0.03} emissive={0.7} />
      <PixelBlock pos={[-0.04, 0.26, 0]} color="#5CE0FF" size={0.02} emissive={0.9} />
      <PixelBlock pos={[0.03, 0.22, 0]} color="#42D4F8" size={0.03} emissive={0.7} />
      <PixelBlock pos={[0.04, 0.26, 0]} color="#5CE0FF" size={0.02} emissive={0.9} />
      
      {/* LEFT WING - Upper */}
      <group ref={leftWingRef} position={[-0.08, 0.08, 0]}>
        {/* Wing structure - gradient from yellow/orange to pink to purple to blue */}
        {/* Row 1 - Outer edge (Yellow/Peach) */}
        <PixelBlock pos={[-0.35, 0.25, 0]} color="#FFE6B8" size={0.06} emissive={0.6} />
        <PixelBlock pos={[-0.29, 0.25, 0]} color="#FFD89C" size={0.06} emissive={0.6} />
        <PixelBlock pos={[-0.23, 0.25, 0]} color="#FFCA80" size={0.06} emissive={0.65} />
        
        {/* Row 2 */}
        <PixelBlock pos={[-0.35, 0.19, 0]} color="#FFD89C" size={0.06} emissive={0.6} />
        <PixelBlock pos={[-0.29, 0.19, 0]} color="#FFCA80" size={0.06} emissive={0.65} />
        <PixelBlock pos={[-0.23, 0.19, 0]} color="#FFBC64" size={0.06} emissive={0.65} />
        <PixelBlock pos={[-0.17, 0.19, 0]} color="#FFB8A0" size={0.06} emissive={0.65} />
        
        {/* Row 3 - Pink transition */}
        <PixelBlock pos={[-0.35, 0.13, 0]} color="#FFBC64" size={0.06} emissive={0.65} />
        <PixelBlock pos={[-0.29, 0.13, 0]} color="#FFB8A0" size={0.06} emissive={0.65} />
        <PixelBlock pos={[-0.23, 0.13, 0]} color="#FFB4D0" size={0.06} emissive={0.7} />
        <PixelBlock pos={[-0.17, 0.13, 0]} color="#FFA8D8" size={0.06} emissive={0.7} />
        <PixelBlock pos={[-0.11, 0.13, 0]} color="#FF9CE0" size={0.06} emissive={0.7} />
        
        {/* Row 4 - Pink */}
        <PixelBlock pos={[-0.29, 0.07, 0]} color="#FFA8D8" size={0.06} emissive={0.7} />
        <PixelBlock pos={[-0.23, 0.07, 0]} color="#FF9CE0" size={0.06} emissive={0.7} />
        <PixelBlock pos={[-0.17, 0.07, 0]} color="#FF90E8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.11, 0.07, 0]} color="#F884E0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.05, 0.07, 0]} color="#E878D8" size={0.06} emissive={0.75} />
        
        {/* Row 5 - Purple transition */}
        <PixelBlock pos={[-0.23, 0.01, 0]} color="#E878D8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.17, 0.01, 0]} color="#D86CD0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.11, 0.01, 0]} color="#C860C8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.05, 0.01, 0]} color="#B854C0" size={0.06} emissive={0.75} />
        
        {/* Row 6 - Purple */}
        <PixelBlock pos={[-0.17, -0.05, 0]} color="#B854C0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.11, -0.05, 0]} color="#A848B8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.05, -0.05, 0]} color="#983CB0" size={0.06} emissive={0.75} />
      </group>
      
      {/* LEFT WING - Lower */}
      <group ref={leftWingRef} position={[-0.08, -0.08, 0]}>
        {/* Cyan/Turquoise gradient */}
        {/* Row 1 */}
        <PixelBlock pos={[-0.23, -0.05, 0]} color="#B8F0E8" size={0.06} emissive={0.65} />
        <PixelBlock pos={[-0.17, -0.05, 0]} color="#A0E8E0" size={0.06} emissive={0.65} />
        <PixelBlock pos={[-0.11, -0.05, 0]} color="#88E0D8" size={0.06} emissive={0.7} />
        <PixelBlock pos={[-0.05, -0.05, 0]} color="#70D8D0" size={0.06} emissive={0.7} />
        
        {/* Row 2 */}
        <PixelBlock pos={[-0.29, -0.11, 0]} color="#A0E8E0" size={0.06} emissive={0.65} />
        <PixelBlock pos={[-0.23, -0.11, 0]} color="#88E0D8" size={0.06} emissive={0.7} />
        <PixelBlock pos={[-0.17, -0.11, 0]} color="#70D8D0" size={0.06} emissive={0.7} />
        <PixelBlock pos={[-0.11, -0.11, 0]} color="#58D0C8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.05, -0.11, 0]} color="#40C8C0" size={0.06} emissive={0.75} />
        
        {/* Row 3 - Blue transition */}
        <PixelBlock pos={[-0.35, -0.17, 0]} color="#70D8D0" size={0.06} emissive={0.7} />
        <PixelBlock pos={[-0.29, -0.17, 0]} color="#58D0C8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.23, -0.17, 0]} color="#40C8C0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.17, -0.17, 0]} color="#68B8D8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.11, -0.17, 0]} color="#78A8E0" size={0.06} emissive={0.75} />
        
        {/* Row 4 - Purple/Blue */}
        <PixelBlock pos={[-0.35, -0.23, 0]} color="#68B8D8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.29, -0.23, 0]} color="#78A8E0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[-0.23, -0.23, 0]} color="#8898E8" size={0.06} emissive={0.8} />
        <PixelBlock pos={[-0.17, -0.23, 0]} color="#9888F0" size={0.06} emissive={0.8} />
        <PixelBlock pos={[-0.11, -0.23, 0]} color="#A878D8" size={0.06} emissive={0.8} />
        
        {/* Row 5 */}
        <PixelBlock pos={[-0.29, -0.29, 0]} color="#8898E8" size={0.06} emissive={0.8} />
        <PixelBlock pos={[-0.23, -0.29, 0]} color="#9888F0" size={0.06} emissive={0.8} />
        <PixelBlock pos={[-0.17, -0.29, 0]} color="#A878D8" size={0.06} emissive={0.8} />
        
        {/* Row 6 - Outer edge */}
        <PixelBlock pos={[-0.23, -0.35, 0]} color="#9888F0" size={0.06} emissive={0.8} />
        <PixelBlock pos={[-0.17, -0.35, 0]} color="#A878E8" size={0.06} emissive={0.8} />
      </group>
      
      {/* RIGHT WING - Upper (Mirror of left) */}
      <group ref={rightWingRef} position={[0.08, 0.08, 0]}>
        {/* Row 1 */}
        <PixelBlock pos={[0.35, 0.25, 0]} color="#FFE6B8" size={0.06} emissive={0.6} />
        <PixelBlock pos={[0.29, 0.25, 0]} color="#FFD89C" size={0.06} emissive={0.6} />
        <PixelBlock pos={[0.23, 0.25, 0]} color="#FFCA80" size={0.06} emissive={0.65} />
        
        {/* Row 2 */}
        <PixelBlock pos={[0.35, 0.19, 0]} color="#FFD89C" size={0.06} emissive={0.6} />
        <PixelBlock pos={[0.29, 0.19, 0]} color="#FFCA80" size={0.06} emissive={0.65} />
        <PixelBlock pos={[0.23, 0.19, 0]} color="#FFBC64" size={0.06} emissive={0.65} />
        <PixelBlock pos={[0.17, 0.19, 0]} color="#FFB8A0" size={0.06} emissive={0.65} />
        
        {/* Row 3 */}
        <PixelBlock pos={[0.35, 0.13, 0]} color="#FFBC64" size={0.06} emissive={0.65} />
        <PixelBlock pos={[0.29, 0.13, 0]} color="#FFB8A0" size={0.06} emissive={0.65} />
        <PixelBlock pos={[0.23, 0.13, 0]} color="#FFB4D0" size={0.06} emissive={0.7} />
        <PixelBlock pos={[0.17, 0.13, 0]} color="#FFA8D8" size={0.06} emissive={0.7} />
        <PixelBlock pos={[0.11, 0.13, 0]} color="#FF9CE0" size={0.06} emissive={0.7} />
        
        {/* Row 4 */}
        <PixelBlock pos={[0.29, 0.07, 0]} color="#FFA8D8" size={0.06} emissive={0.7} />
        <PixelBlock pos={[0.23, 0.07, 0]} color="#FF9CE0" size={0.06} emissive={0.7} />
        <PixelBlock pos={[0.17, 0.07, 0]} color="#FF90E8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.11, 0.07, 0]} color="#F884E0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.05, 0.07, 0]} color="#E878D8" size={0.06} emissive={0.75} />
        
        {/* Row 5 */}
        <PixelBlock pos={[0.23, 0.01, 0]} color="#E878D8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.17, 0.01, 0]} color="#D86CD0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.11, 0.01, 0]} color="#C860C8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.05, 0.01, 0]} color="#B854C0" size={0.06} emissive={0.75} />
        
        {/* Row 6 */}
        <PixelBlock pos={[0.17, -0.05, 0]} color="#B854C0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.11, -0.05, 0]} color="#A848B8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.05, -0.05, 0]} color="#983CB0" size={0.06} emissive={0.75} />
      </group>
      
      {/* RIGHT WING - Lower */}
      <group ref={rightWingRef} position={[0.08, -0.08, 0]}>
        {/* Row 1 */}
        <PixelBlock pos={[0.23, -0.05, 0]} color="#B8F0E8" size={0.06} emissive={0.65} />
        <PixelBlock pos={[0.17, -0.05, 0]} color="#A0E8E0" size={0.06} emissive={0.65} />
        <PixelBlock pos={[0.11, -0.05, 0]} color="#88E0D8" size={0.06} emissive={0.7} />
        <PixelBlock pos={[0.05, -0.05, 0]} color="#70D8D0" size={0.06} emissive={0.7} />
        
        {/* Row 2 */}
        <PixelBlock pos={[0.29, -0.11, 0]} color="#A0E8E0" size={0.06} emissive={0.65} />
        <PixelBlock pos={[0.23, -0.11, 0]} color="#88E0D8" size={0.06} emissive={0.7} />
        <PixelBlock pos={[0.17, -0.11, 0]} color="#70D8D0" size={0.06} emissive={0.7} />
        <PixelBlock pos={[0.11, -0.11, 0]} color="#58D0C8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.05, -0.11, 0]} color="#40C8C0" size={0.06} emissive={0.75} />
        
        {/* Row 3 */}
        <PixelBlock pos={[0.35, -0.17, 0]} color="#70D8D0" size={0.06} emissive={0.7} />
        <PixelBlock pos={[0.29, -0.17, 0]} color="#58D0C8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.23, -0.17, 0]} color="#40C8C0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.17, -0.17, 0]} color="#68B8D8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.11, -0.17, 0]} color="#78A8E0" size={0.06} emissive={0.75} />
        
        {/* Row 4 */}
        <PixelBlock pos={[0.35, -0.23, 0]} color="#68B8D8" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.29, -0.23, 0]} color="#78A8E0" size={0.06} emissive={0.75} />
        <PixelBlock pos={[0.23, -0.23, 0]} color="#8898E8" size={0.06} emissive={0.8} />
        <PixelBlock pos={[0.17, -0.23, 0]} color="#9888F0" size={0.06} emissive={0.8} />
        <PixelBlock pos={[0.11, -0.23, 0]} color="#A878D8" size={0.06} emissive={0.8} />
        
        {/* Row 5 */}
        <PixelBlock pos={[0.29, -0.29, 0]} color="#8898E8" size={0.06} emissive={0.8} />
        <PixelBlock pos={[0.23, -0.29, 0]} color="#9888F0" size={0.06} emissive={0.8} />
        <PixelBlock pos={[0.17, -0.29, 0]} color="#A878D8" size={0.06} emissive={0.8} />
        
        {/* Row 6 */}
        <PixelBlock pos={[0.23, -0.35, 0]} color="#9888F0" size={0.06} emissive={0.8} />
        <PixelBlock pos={[0.17, -0.35, 0]} color="#A878E8" size={0.06} emissive={0.8} />
      </group>
      
      {/* Magical glow effects */}
      <pointLight position={[0, 0, 0]} color="#FF9CE0" intensity={2} distance={2} />
      <pointLight position={[-0.2, 0.1, 0]} color="#FFD89C" intensity={1.5} distance={1.5} />
      <pointLight position={[0.2, 0.1, 0]} color="#FFD89C" intensity={1.5} distance={1.5} />
      <pointLight position={[-0.2, -0.2, 0]} color="#78D8E8" intensity={1.5} distance={1.5} />
      <pointLight position={[0.2, -0.2, 0]} color="#78D8E8" intensity={1.5} distance={1.5} />
    </group>
  )
}

// Magical Pixel Crystal Ball (witch ball)
const PixelCrystalBall = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const ballRef = useRef()
  
  useFrame((state) => {
    if (ballRef.current) {
      ballRef.current.rotation.y = state.clock.elapsedTime * 0.6
      ballRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.4
    }
  })

  const PixelBlock = ({ pos, color, size = 0.08, emissive = 0.6 }) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} metalness={0.5} roughness={0.3} />
    </mesh>
  )

  return (
    <group ref={ballRef} position={position} scale={scale} rotation={rotation}>
      {/* Glass sphere - crystal ball */}
      {[-0.15, -0.08, 0, 0.08, 0.15].map((y, i) => (
        <React.Fragment key={`row-${i}`}>
          {[-0.15, -0.08, 0, 0.08, 0.15].map((x, j) => {
            const dist = Math.sqrt(x * x + y * y)
            if (dist < 0.18) {
              return <PixelBlock key={`${i}-${j}`} pos={[x, y, 0]} color="#E8D4FF" size={0.07} emissive={0.5} />
            }
            return null
          })}
        </React.Fragment>
      ))}
      {/* Purple glow inside */}
      <PixelBlock pos={[0, 0, 0]} color="#B878FF" size={0.12} emissive={0.9} />
      <PixelBlock pos={[0.05, 0.05, 0]} color="#D8B8FF" size={0.06} emissive={1} />
      {/* Stand */}
      <PixelBlock pos={[0, -0.22, 0]} color="#2C1C3C" size={0.08} emissive={0.2} />
      <PixelBlock pos={[0, -0.28, 0]} color="#1C0C2C" size={0.1} emissive={0.15} />
      <pointLight position={[0, 0, 0]} color="#B878FF" intensity={2} distance={1.5} />
    </group>
  )
}

// Magical Spell Book
const PixelSpellBook = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const bookRef = useRef()
  
  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.rotation.y = state.clock.elapsedTime * 0.4
      bookRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
      bookRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.35
    }
  })

  const PixelBlock = ({ pos, color, size = 0.08, emissive = 0.5 }) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} metalness={0.4} roughness={0.4} />
    </mesh>
  )

  return (
    <group ref={bookRef} position={position} scale={scale} rotation={rotation}>
      {/* Book cover - purple */}
      {[0.12, 0.08, 0.04, 0, -0.04, -0.08, -0.12].map((y, i) => (
        <React.Fragment key={`cover-${i}`}>
          {[-0.15, -0.08, 0, 0.08, 0.15].map((x, j) => (
            <PixelBlock key={`${i}-${j}`} pos={[x, y, 0]} color="#8844CC" size={0.08} emissive={0.5} />
          ))}
        </React.Fragment>
      ))}
      {/* Gold decorations */}
      <PixelBlock pos={[0, 0.08, 0.05]} color="#FFD700" size={0.06} emissive={0.8} />
      <PixelBlock pos={[0, 0, 0.05]} color="#FFE55C" size={0.08} emissive={0.9} />
      <PixelBlock pos={[0, -0.08, 0.05]} color="#FFD700" size={0.06} emissive={0.8} />
      {/* Sparkle */}
      <PixelBlock pos={[0.1, 0.04, 0.05]} color="#FFEE88" size={0.04} emissive={1} />
      {/* Spine */}
      {[-0.12, -0.04, 0.04, 0.12].map((y, i) => (
        <PixelBlock key={`spine-${i}`} pos={[-0.2, y, 0]} color="#6633AA" size={0.08} emissive={0.4} />
      ))}
      <pointLight position={[0, 0, 0.1]} color="#FFD700" intensity={1.5} distance={1.2} />
    </group>
  )
}

// Magical Potion Cauldron
const PixelCauldron = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const cauldronRef = useRef()
  
  useFrame((state) => {
    if (cauldronRef.current) {
      cauldronRef.current.rotation.y = state.clock.elapsedTime * 0.5
      cauldronRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.8 + position[0]) * 0.3
    }
  })

  const PixelBlock = ({ pos, color, size = 0.08, emissive = 0.5 }) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} metalness={0.6} roughness={0.2} />
    </mesh>
  )

  return (
    <group ref={cauldronRef} position={position} scale={scale} rotation={rotation}>
      {/* Cauldron body - dark gray/purple */}
      {[
        { y: 0.1, width: 0.25 },
        { y: 0.02, width: 0.3 },
        { y: -0.06, width: 0.28 },
        { y: -0.14, width: 0.22 },
      ].map((layer, i) => {
        const pixels = Math.floor(layer.width / 0.08)
        return (
          <group key={`cauldron-${i}`}>
            {Array.from({ length: pixels }).map((_, j) => {
              const x = -layer.width / 2 + j * 0.08
              return <PixelBlock key={j} pos={[x, layer.y, 0]} color="#4C3C5C" size={0.08} emissive={0.3} />
            })}
          </group>
        )
      })}
      {/* Bubbling potion - pink/purple */}
      <PixelBlock pos={[0, 0.08, 0]} color="#D898FF" size={0.2} emissive={0.8} />
      <PixelBlock pos={[-0.08, 0.1, 0]} color="#C878E8" size={0.08} emissive={0.7} />
      <PixelBlock pos={[0.08, 0.1, 0]} color="#E8B8FF" size={0.08} emissive={0.7} />
      {/* Steam/smoke bubbles */}
      <PixelBlock pos={[0, 0.22, 0]} color="#E8D8FF" size={0.05} emissive={0.9} />
      <PixelBlock pos={[-0.06, 0.26, 0]} color="#F8E8FF" size={0.04} emissive={0.85} />
      <PixelBlock pos={[0.06, 0.28, 0]} color="#E8D8FF" size={0.04} emissive={0.85} />
      {/* Gold rim */}
      {[-0.15, -0.08, 0, 0.08, 0.15].map((x, i) => (
        <PixelBlock key={`rim-${i}`} pos={[x, 0.15, 0]} color="#D4A574" size={0.06} emissive={0.6} />
      ))}
      <pointLight position={[0, 0.1, 0]} color="#D898FF" intensity={2} distance={1.5} />
    </group>
  )
}

// Magical Witch Hat
const PixelWitchHat = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const hatRef = useRef()
  
  useFrame((state) => {
    if (hatRef.current) {
      hatRef.current.rotation.y = state.clock.elapsedTime * 0.7
      hatRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.15
      hatRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.4 + position[0]) * 0.38
    }
  })

  const PixelBlock = ({ pos, color, size = 0.08, emissive = 0.4 }) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} metalness={0.3} roughness={0.5} />
    </mesh>
  )

  return (
    <group ref={hatRef} position={position} scale={scale} rotation={rotation}>
      {/* Hat cone - dark purple/black */}
      {[
        { y: 0.3, pixels: 1 },
        { y: 0.22, pixels: 2 },
        { y: 0.14, pixels: 3 },
        { y: 0.06, pixels: 4 },
        { y: -0.02, pixels: 5 },
      ].map((layer, i) => (
        <group key={`cone-${i}`}>
          {Array.from({ length: layer.pixels }).map((_, j) => {
            const x = -((layer.pixels - 1) * 0.08) / 2 + j * 0.08
            return <PixelBlock key={j} pos={[x, layer.y, 0]} color="#2C1C3C" size={0.08} emissive={0.3} />
          })}
        </group>
      ))}
      {/* Brim */}
      {[-0.24, -0.16, -0.08, 0, 0.08, 0.16, 0.24].map((x, i) => (
        <PixelBlock key={`brim-${i}`} pos={[x, -0.08, 0]} color="#1C0C2C" size={0.08} emissive={0.25} />
      ))}
      {/* Purple ribbon/band */}
      {[-0.16, -0.08, 0, 0.08, 0.16].map((x, i) => (
        <PixelBlock key={`band-${i}`} pos={[x, 0, 0]} color="#8844CC" size={0.08} emissive={0.5} />
      ))}
      {/* Gold buckle */}
      <PixelBlock pos={[0, 0, 0.05]} color="#FFD700" size={0.06} emissive={0.8} />
      {/* Stars on hat */}
      <PixelBlock pos={[0.08, 0.18, 0.05]} color="#FFE55C" size={0.04} emissive={1} />
      <PixelBlock pos={[-0.05, 0.25, 0.05]} color="#FFEE88" size={0.03} emissive={1} />
    </group>
  )
}

// Cute Magical Cat
const PixelMagicCat = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const catRef = useRef()
  
  useFrame((state) => {
    if (catRef.current) {
      catRef.current.rotation.y = state.clock.elapsedTime * 0.6
      catRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.6 + position[0]) * 0.32
    }
  })

  const PixelBlock = ({ pos, color, size = 0.07, emissive = 0.4 }) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} metalness={0.2} roughness={0.6} />
    </mesh>
  )

  return (
    <group ref={catRef} position={position} scale={scale} rotation={rotation}>
      {/* Cat body - lavender/purple */}
      {[
        { y: 0, x: [-0.14, -0.07, 0, 0.07, 0.14] },
        { y: -0.07, x: [-0.14, -0.07, 0, 0.07, 0.14] },
        { y: -0.14, x: [-0.1, -0.03, 0.03, 0.1] },
      ].map((layer, i) => (
        <group key={`body-${i}`}>
          {layer.x.map((x, j) => (
            <PixelBlock key={j} pos={[x, layer.y, 0]} color="#B898D8" size={0.07} emissive={0.4} />
          ))}
        </group>
      ))}
      {/* Head */}
      {[-0.1, -0.03, 0.03, 0.1].map((x, i) => (
        <PixelBlock key={`head-${i}`} pos={[x, 0.14, 0]} color="#D8B8F8" size={0.07} emissive={0.45} />
      ))}
      <PixelBlock pos={[0, 0.07, 0]} color="#D8B8F8" size={0.14} emissive={0.45} />
      {/* Ears */}
      <PixelBlock pos={[-0.12, 0.21, 0]} color="#C8A8E8" size={0.06} emissive={0.4} />
      <PixelBlock pos={[0.12, 0.21, 0]} color="#C8A8E8" size={0.06} emissive={0.4} />
      {/* Eyes - cute */}
      <PixelBlock pos={[-0.05, 0.1, 0.04]} color="#4C2C6C" size={0.04} emissive={0.3} />
      <PixelBlock pos={[0.05, 0.1, 0.04]} color="#4C2C6C" size={0.04} emissive={0.3} />
      {/* Nose */}
      <PixelBlock pos={[0, 0.05, 0.04]} color="#F8B8D8" size={0.03} emissive={0.6} />
      {/* Tail */}
      <PixelBlock pos={[0.18, -0.05, 0]} color="#B898D8" size={0.06} emissive={0.4} />
      <PixelBlock pos={[0.22, 0.02, 0]} color="#C8A8E8" size={0.05} emissive={0.4} />
      {/* Magical glow */}
      <pointLight position={[0, 0, 0.1]} color="#D8B8F8" intensity={1.2} distance={1} />
    </group>
  )
}

// Magical Potion Bottle (small detailed version)
const PixelPotionBottle = ({ position, scale = 1, rotation = [0, 0, 0], color = "#8844FF" }) => {
  const bottleRef = useRef()
  
  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y = state.clock.elapsedTime * 0.5
      bottleRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.28
    }
  })

  const PixelBlock = ({ pos, color, size = 0.06, emissive = 0.5 }) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} metalness={0.4} roughness={0.3} />
    </mesh>
  )

  return (
    <group ref={bottleRef} position={position} scale={scale} rotation={rotation}>
      {/* Cork */}
      <PixelBlock pos={[0, 0.2, 0]} color="#8B6F47" size={0.05} emissive={0.3} />
      {/* Bottle neck */}
      <PixelBlock pos={[0, 0.14, 0]} color="#B8D4FF" size={0.04} emissive={0.4} />
      {/* Bottle body - glass */}
      {[-0.08, 0, 0.08].map((x, i) => (
        <React.Fragment key={`body-${i}`}>
          <PixelBlock pos={[x, 0.08, 0]} color="#D8E8FF" size={0.06} emissive={0.3} />
          <PixelBlock pos={[x, 0.02, 0]} color="#C8DFF8" size={0.06} emissive={0.3} />
          <PixelBlock pos={[x, -0.04, 0]} color="#B8D4F0" size={0.06} emissive={0.3} />
        </React.Fragment>
      ))}
      {/* Liquid inside */}
      <PixelBlock pos={[0, 0.02, 0]} color={color} size={0.12} emissive={0.85} />
      <PixelBlock pos={[0, -0.04, 0]} color={color} size={0.1} emissive={0.8} />
      {/* Sparkle */}
      <PixelBlock pos={[0.04, 0.04, 0]} color="#FFFFFF" size={0.03} emissive={1} />
      {/* Base */}
      <PixelBlock pos={[0, -0.1, 0]} color="#B8D4FF" size={0.08} emissive={0.3} />
      <pointLight position={[0, 0, 0]} color={color} intensity={1.5} distance={1} />
    </group>
  )
}

// Magical Wand
const PixelMagicWand = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const wandRef = useRef()
  
  useFrame((state) => {
    if (wandRef.current) {
      wandRef.current.rotation.z = state.clock.elapsedTime * 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.5
      wandRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.7 + position[0]) * 0.35
    }
  })

  const PixelBlock = ({ pos, color, size = 0.05, emissive = 0.5 }) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} metalness={0.6} roughness={0.2} />
    </mesh>
  )

  return (
    <group ref={wandRef} position={position} scale={scale} rotation={rotation}>
      {/* Wand stick - brown/gold */}
      {[0.18, 0.12, 0.06, 0, -0.06, -0.12, -0.18].map((y, i) => (
        <PixelBlock key={`stick-${i}`} pos={[0, y, 0]} color="#8B6F47" size={0.04} emissive={0.3} />
      ))}
      {/* Star tip - golden */}
      <PixelBlock pos={[0, 0.26, 0]} color="#FFE55C" size={0.08} emissive={1} />
      <PixelBlock pos={[-0.06, 0.26, 0]} color="#FFD700" size={0.05} emissive={0.9} />
      <PixelBlock pos={[0.06, 0.26, 0]} color="#FFD700" size={0.05} emissive={0.9} />
      <PixelBlock pos={[0, 0.32, 0]} color="#FFEE88" size={0.05} emissive={0.95} />
      <PixelBlock pos={[0, 0.2, 0]} color="#FFEE88" size={0.05} emissive={0.95} />
      {/* Sparkles around tip */}
      <PixelBlock pos={[-0.1, 0.3, 0]} color="#FFE6FF" size={0.03} emissive={1} />
      <PixelBlock pos={[0.1, 0.28, 0]} color="#E8D8FF" size={0.03} emissive={1} />
      <PixelBlock pos={[0.08, 0.35, 0]} color="#FFEE88" size={0.02} emissive={1} />
      <pointLight position={[0, 0.26, 0]} color="#FFE55C" intensity={2.5} distance={1.5} />
    </group>
  )
}

// Large Rotating Pixel Hourglass
const RotatingHourglass = () => {
  const hourglassRef = useRef()
  const sandTopRef = useRef()
  const sandBottomRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (hourglassRef.current) {
      // Smooth continuous rotation
      hourglassRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      // Flip animation every 10 seconds
      const flipCycle = (state.clock.elapsedTime % 10) / 10
      hourglassRef.current.rotation.z = Math.sin(flipCycle * Math.PI) * Math.PI
    }

    // Animate sand falling - top chamber
    if (sandTopRef.current) {
      const sandCycle = (state.clock.elapsedTime % 10) / 10
      sandTopRef.current.scale.y = 1 - sandCycle * 0.6
    }

    // Animate sand accumulating - bottom chamber
    if (sandBottomRef.current) {
      const sandCycle = (state.clock.elapsedTime % 10) / 10
      sandBottomRef.current.scale.y = 0.4 + sandCycle * 0.6
    }

    if (glowRef.current) {
      // Pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7
      glowRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  // Pixel block component - optimized
  const PixelBlock = ({ position, color, emissiveIntensity = 0.5, size = 0.12, transparent = false, opacity = 1 }) => (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        metalness={0.6}
        roughness={0.3}
        transparent={transparent}
        opacity={opacity}
      />
    </mesh>
  )

  return (
    <group ref={hourglassRef} position={[0, 0, -5]} scale={1.5}>
      {/* Radiant Glow Background */}
      <mesh ref={glowRef} position={[0, 0, -0.5]}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#B892FF"
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Top wooden/bronze frame - pixelated */}
      <group position={[0, 2.2, 0]}>
        {/* Top rim - layered pixels */}
        {[-0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5].map((x, i) => (
          <React.Fragment key={`top-rim-${i}`}>
            <PixelBlock position={[x, 0.2, 0]} color="#8B6F47" emissiveIntensity={0.3} size={0.1} />
            <PixelBlock position={[x, 0.1, 0]} color="#A67C52" emissiveIntensity={0.35} size={0.1} />
            <PixelBlock position={[x, 0, 0]} color="#D4A574" emissiveIntensity={0.4} size={0.1} />
          </React.Fragment>
        ))}
        
        {/* Decorative gold accents */}
        <PixelBlock position={[-0.6, 0.1, 0]} color="#FFE26A" emissiveIntensity={0.8} size={0.12} />
        <PixelBlock position={[0.6, 0.1, 0]} color="#FFE26A" emissiveIntensity={0.8} size={0.12} />
      </group>

      {/* Top glass bulb - pixelated crystal clear */}
      <group>
        {/* Layer by layer - wider at top, narrowing to middle */}
        {[
          { y: 1.9, width: 0.4, pixels: 5 },
          { y: 1.7, width: 0.6, pixels: 7 },
          { y: 1.5, width: 0.7, pixels: 8 },
          { y: 1.3, width: 0.75, pixels: 8 },
          { y: 1.1, width: 0.75, pixels: 8 },
          { y: 0.9, width: 0.7, pixels: 8 },
          { y: 0.7, width: 0.6, pixels: 7 },
          { y: 0.5, width: 0.5, pixels: 6 },
          { y: 0.3, width: 0.3, pixels: 4 },
        ].map((layer, i) => {
          const step = layer.width / (layer.pixels - 1)
          return (
            <group key={`glass-top-${i}`}>
              {Array.from({ length: layer.pixels }).map((_, j) => {
                const x = -layer.width / 2 + j * step
                return (
                  <PixelBlock
                    key={j}
                    position={[x, layer.y, 0]}
                    color="#C8E6FF"
                    emissiveIntensity={0.4}
                    size={0.095}
                    transparent={true}
                    opacity={0.6}
                  />
                )
              })}
            </group>
          )
        })}
        
        {/* Glass shine highlights */}
        <PixelBlock position={[-0.3, 1.6, 0.05]} color="#FFFFFF" emissiveIntensity={1} size={0.06} transparent={true} opacity={0.8} />
        <PixelBlock position={[-0.25, 1.5, 0.05]} color="#FFFFFF" emissiveIntensity={1} size={0.05} transparent={true} opacity={0.7} />
      </group>

      {/* Purple/Pink sand in top chamber - animated */}
      <group ref={sandTopRef} position={[0, 1.2, 0]}>
        {[
          { y: 0.4, width: 0.5, color: "#E8B4E8" },
          { y: 0.3, width: 0.6, color: "#D898D8" },
          { y: 0.2, width: 0.65, color: "#C87CC8" },
          { y: 0.1, width: 0.65, color: "#B860B8" },
          { y: 0, width: 0.6, color: "#A844A8" },
          { y: -0.1, width: 0.5, color: "#982898" },
          { y: -0.2, width: 0.3, color: "#881C88" },
        ].map((layer, i) => (
          <mesh key={`sand-top-${i}`} position={[0, layer.y, 0]}>
            <boxGeometry args={[layer.width, 0.095, 0.08]} />
            <meshStandardMaterial
              color={layer.color}
              emissive={layer.color}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
        
        {/* Sparkles in sand */}
        <PixelBlock position={[0.1, 0.2, 0]} color="#FFFFFF" emissiveIntensity={1} size={0.04} />
        <PixelBlock position={[-0.15, 0.05, 0]} color="#FFE6FF" emissiveIntensity={0.9} size={0.04} />
      </group>

      {/* Middle connector - narrow purple passage with flowing effect */}
      <group position={[0, 0, 0]}>
        <PixelBlock position={[0, 0.15, 0]} color="#C898D8" emissiveIntensity={0.8} size={0.08} />
        <PixelBlock position={[0, 0.05, 0]} color="#B87CC8" emissiveIntensity={0.9} size={0.08} />
        <PixelBlock position={[0, -0.05, 0]} color="#A860B8" emissiveIntensity={0.9} size={0.08} />
        <PixelBlock position={[0, -0.15, 0]} color="#9844A8" emissiveIntensity={0.8} size={0.08} />
        
        {/* Glowing core */}
        <pointLight position={[0, 0, 0]} color="#FF92DC" intensity={3} distance={2} />
      </group>

      {/* Bottom glass bulb - pixelated crystal clear */}
      <group>
        {/* Layer by layer - narrow at top, wider at bottom */}
        {[
          { y: -0.3, width: 0.3, pixels: 4 },
          { y: -0.5, width: 0.5, pixels: 6 },
          { y: -0.7, width: 0.6, pixels: 7 },
          { y: -0.9, width: 0.7, pixels: 8 },
          { y: -1.1, width: 0.75, pixels: 8 },
          { y: -1.3, width: 0.75, pixels: 8 },
          { y: -1.5, width: 0.7, pixels: 8 },
          { y: -1.7, width: 0.6, pixels: 7 },
          { y: -1.9, width: 0.4, pixels: 5 },
        ].map((layer, i) => {
          const step = layer.width / (layer.pixels - 1)
          return (
            <group key={`glass-bottom-${i}`}>
              {Array.from({ length: layer.pixels }).map((_, j) => {
                const x = -layer.width / 2 + j * step
                return (
                  <PixelBlock
                    key={j}
                    position={[x, layer.y, 0]}
                    color="#C8E6FF"
                    emissiveIntensity={0.4}
                    size={0.095}
                    transparent={true}
                    opacity={0.6}
                  />
                )
              })}
            </group>
          )
        })}
        
        {/* Glass shine highlights */}
        <PixelBlock position={[0.3, -1.6, 0.05]} color="#FFFFFF" emissiveIntensity={1} size={0.06} transparent={true} opacity={0.8} />
        <PixelBlock position={[0.25, -1.5, 0.05]} color="#FFFFFF" emissiveIntensity={1} size={0.05} transparent={true} opacity={0.7} />
      </group>

      {/* Purple/Pink sand in bottom chamber - accumulated */}
      <group ref={sandBottomRef} position={[0, -1.4, 0]}>
        {[
          { y: 0.2, width: 0.3, color: "#881C88" },
          { y: 0.1, width: 0.5, color: "#982898" },
          { y: 0, width: 0.6, color: "#A844A8" },
          { y: -0.1, width: 0.65, color: "#B860B8" },
          { y: -0.2, width: 0.65, color: "#C87CC8" },
          { y: -0.3, width: 0.6, color: "#D898D8" },
          { y: -0.4, width: 0.5, color: "#E8B4E8" },
        ].map((layer, i) => (
          <mesh key={`sand-bottom-${i}`} position={[0, layer.y, 0]}>
            <boxGeometry args={[layer.width, 0.095, 0.08]} />
            <meshStandardMaterial
              color={layer.color}
              emissive={layer.color}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
        
        {/* Sparkles in sand */}
        <PixelBlock position={[-0.1, 0, 0]} color="#FFFFFF" emissiveIntensity={1} size={0.04} />
        <PixelBlock position={[0.15, -0.15, 0]} color="#FFE6FF" emissiveIntensity={0.9} size={0.04} />
      </group>

      {/* Bottom wooden/bronze frame - pixelated */}
      <group position={[0, -2.2, 0]}>
        {/* Bottom rim - layered pixels */}
        {[-0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5].map((x, i) => (
          <React.Fragment key={`bottom-rim-${i}`}>
            <PixelBlock position={[x, 0, 0]} color="#D4A574" emissiveIntensity={0.4} size={0.1} />
            <PixelBlock position={[x, -0.1, 0]} color="#A67C52" emissiveIntensity={0.35} size={0.1} />
            <PixelBlock position={[x, -0.2, 0]} color="#8B6F47" emissiveIntensity={0.3} size={0.1} />
          </React.Fragment>
        ))}
        
        {/* Decorative gold accents */}
        <PixelBlock position={[-0.6, -0.1, 0]} color="#FFE26A" emissiveIntensity={0.8} size={0.12} />
        <PixelBlock position={[0.6, -0.1, 0]} color="#FFE26A" emissiveIntensity={0.8} size={0.12} />
      </group>

      {/* Radiant lighting effects */}
      <pointLight position={[0, 1.2, 0]} color="#E8B4E8" intensity={2.5} distance={4} />
      <pointLight position={[0, -1.2, 0]} color="#B860B8" intensity={2.5} distance={4} />
      <pointLight position={[0, 0, 0]} color="#A892FF" intensity={3} distance={5} />

      {/* Magical sparkle particles floating around */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius * 0.7
        const sparkleColor = i % 4 === 0 ? "#FFE6FF" : i % 4 === 1 ? "#E8B4E8" : i % 4 === 2 ? "#C8E6FF" : "#B8A8FF"
        return (
          <PixelBlock 
            key={`sparkle-${i}`}
            position={[x, y, 0]} 
            color={sparkleColor}
            emissiveIntensity={1}
            size={0.05}
          />
        )
      })}
    </group>
  )
}

// Main Skills Scene
const SkillsScene = () => {
  // Magical objects data - different items orbiting in uneven magical pattern
  const magicalObjects = [
    { type: 'butterfly', position: [-3.5, 2.5, 0], scale: 1.3, rotation: [0, 0, 0] },
    { type: 'crystal', position: [2.5, 3.2, -1], scale: 1.2, rotation: [0.2, 0, 0.1] },
    { type: 'book', position: [2.8, 1.5, -1.5], scale: 1.1, rotation: [-0.1, 0.3, 0] },
    { type: 'cauldron', position: [-2.5, -2, 1], scale: 1.4, rotation: [0, 0, 0.2] },
    { type: 'hat', position: [3.2, -1.5, -0.5], scale: 1.2, rotation: [0.3, 0, -0.1] },
    { type: 'cat', position: [1.5, 2.8, 2], scale: 1.0, rotation: [0, 0.2, 0.1] },
    { type: 'butterfly', position: [-2.8, 0, -2], scale: 1.0, rotation: [0, -0.3, 0] },
    { type: 'potion', position: [-3, -0.5, -1.5], scale: 0.9, rotation: [0.1, -0.2, 0], color: '#FF92DC' },
    { type: 'wand', position: [0, 3.5, 1.5], scale: 1.15, rotation: [-0.2, 0, 0.3] },
    { type: 'potion', position: [3.5, 0.5, 1], scale: 0.85, rotation: [0, 0.1, -0.2], color: '#42FFF8' },
    { type: 'butterfly', position: [0.5, -2.8, 2], scale: 1.25, rotation: [0, 0.8, 0] },
    { type: 'book', position: [2, -2.5, 2], scale: 0.95, rotation: [0.2, -0.1, 0] },
    { type: 'potion', position: [-2, 3.2, -1], scale: 0.8, rotation: [0, 0, 0.1], color: '#FFE26A' },
    { type: 'cat', position: [3, 1.8, -2], scale: 0.9, rotation: [0.1, 0, -0.1] },
  ]

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#A892FF" />

      {/* Sparkles */}
      <Sparkles 
        count={80} 
        scale={12} 
        size={2} 
        speed={0.4}
        color="#FFE26A"
      />

      {/* Magical Objects floating in uneven magical pattern */}
      {magicalObjects.map((obj, index) => {
        switch(obj.type) {
          case 'butterfly':
            return <PixelButterfly key={index} position={obj.position} scale={obj.scale} rotation={obj.rotation} />
          case 'crystal':
            return <PixelCrystalBall key={index} position={obj.position} scale={obj.scale} rotation={obj.rotation} />
          case 'book':
            return <PixelSpellBook key={index} position={obj.position} scale={obj.scale} rotation={obj.rotation} />
          case 'cauldron':
            return <PixelCauldron key={index} position={obj.position} scale={obj.scale} rotation={obj.rotation} />
          case 'hat':
            return <PixelWitchHat key={index} position={obj.position} scale={obj.scale} rotation={obj.rotation} />
          case 'cat':
            return <PixelMagicCat key={index} position={obj.position} scale={obj.scale} rotation={obj.rotation} />
          case 'potion':
            return <PixelPotionBottle key={index} position={obj.position} scale={obj.scale} rotation={obj.rotation} color={obj.color} />
          case 'wand':
            return <PixelMagicWand key={index} position={obj.position} scale={obj.scale} rotation={obj.rotation} />
          default:
            return null
        }
      })}

      {/* Orbiting Particles */}
      <OrbitingParticles />

      {/* Multiple Floating Islands - 6 Biomes in Circular Orbit (matching Hero scene) */}
      <Suspense fallback={<mesh><boxGeometry /><meshBasicMaterial color="red" /></mesh>}>
        <FloatingIslandDisplay />
      </Suspense>

      {/* Fog */}
      <fog attach="fog" args={['#0d0520', 5, 20]} />
    </>
  )
}

export default SkillsScene
