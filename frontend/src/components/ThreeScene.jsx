import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ============ GOLD PARTICLES ============ */
function GoldParticles({ count = 600 }) {
  const mesh = useRef()
  const { positions, speeds, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      spd[i] = 0.005 + Math.random() * 0.015
      sz[i] = 0.02 + Math.random() * 0.06
    }
    return { positions: pos, speeds: spd, sizes: sz }
  }, [count])

  useFrame(() => {
    if (!mesh.current) return
    const posArray = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += speeds[i]
      if (posArray[i * 3 + 1] > 10) posArray[i * 3 + 1] = -10
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#F5B800"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ============ ANIMATED GRID FLOOR ============ */
function GridFloor() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.z = (clock.getElapsedTime() * 0.3) % 2
    }
  })
  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <gridHelper args={[40, 40, '#F5B800', 'rgba(245,184,0,0.08)']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0A0A0A" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

/* ============ DUMBBELL ============ */
function Dumbbell({ position, rotation, scale = 1 }) {
  const group = useRef()
  
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={group} position={position} rotation={rotation} scale={scale}>
        {/* Bar */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 2.2, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Left weight plates */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.15, 24]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.12, 24]} />
          <meshStandardMaterial color="#F5B800" metalness={0.7} roughness={0.3} emissive="#F5B800" emissiveIntensity={0.1} />
        </mesh>
        {/* Right weight plates */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.15, 24]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.12, 24]} />
          <meshStandardMaterial color="#F5B800" metalness={0.7} roughness={0.3} emissive="#F5B800" emissiveIntensity={0.1} />
        </mesh>
        {/* Grip texture */}
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 12]} />
          <meshStandardMaterial color="#333" metalness={0.5} roughness={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

/* ============ KETTLEBELL ============ */
function Kettlebell({ position, scale = 1 }) {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1}>
      <group position={position} scale={scale}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Bottom flat */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 0.1, 24]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 0.45, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.2, 0.04, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#888" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Gold stripe */}
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.36, 0.02, 8, 32]} />
          <meshStandardMaterial color="#F5B800" metalness={0.7} roughness={0.3} emissive="#F5B800" emissiveIntensity={0.15} />
        </mesh>
      </group>
    </Float>
  )
}

/* ============ BARBELL ============ */
function Barbell({ position, rotation, scale = 1 }) {
  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Long bar */}
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 5, 16]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Left plates */}
        {[-2.1, -2.3, -2.5].map((y, i) => (
          <mesh key={`l${i}`} position={[0, y, 0]}>
            <cylinderGeometry args={[0.4 - i * 0.05, 0.4 - i * 0.05, 0.1, 24]} />
            <meshStandardMaterial
              color={i === 1 ? '#F5B800' : '#1a1a1a'}
              metalness={0.8}
              roughness={0.25}
              emissive={i === 1 ? '#F5B800' : '#000'}
              emissiveIntensity={i === 1 ? 0.1 : 0}
            />
          </mesh>
        ))}
        {/* Right plates */}
        {[2.1, 2.3, 2.5].map((y, i) => (
          <mesh key={`r${i}`} position={[0, y, 0]}>
            <cylinderGeometry args={[0.4 - i * 0.05, 0.4 - i * 0.05, 0.1, 24]} />
            <meshStandardMaterial
              color={i === 1 ? '#F5B800' : '#1a1a1a'}
              metalness={0.8}
              roughness={0.25}
              emissive={i === 1 ? '#F5B800' : '#000'}
              emissiveIntensity={i === 1 ? 0.1 : 0}
            />
          </mesh>
        ))}
        {/* Collars */}
        <mesh position={[0, -1.95, 0]}><cylinderGeometry args={[0.08, 0.08, 0.1, 12]} /><meshStandardMaterial color="#F5B800" metalness={0.7} /></mesh>
        <mesh position={[0, 1.95, 0]}><cylinderGeometry args={[0.08, 0.08, 0.1, 12]} /><meshStandardMaterial color="#F5B800" metalness={0.7} /></mesh>
      </group>
    </Float>
  )
}

/* ============ WEIGHT PLATE (standalone) ============ */
function WeightPlate({ position, rotation, scale = 1, color = '#1a1a1a' }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
          <meshStandardMaterial color={color} metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Center hole */}
        <mesh>
          <torusGeometry args={[0.12, 0.03, 8, 24]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Gold ring */}
        <mesh>
          <torusGeometry args={[0.45, 0.015, 8, 32]} />
          <meshStandardMaterial color="#F5B800" metalness={0.7} emissive="#F5B800" emissiveIntensity={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

/* ============ BODYBUILDER FIGURE ============ */
function BodybuilderFigure() {
  const group = useRef()
  
  useFrame(({ clock }) => {
    if (group.current) {
      // Subtle breathing animation
      const t = clock.getElapsedTime()
      group.current.scale.y = 1 + Math.sin(t * 1.5) * 0.01
      group.current.rotation.y = Math.sin(t * 0.3) * 0.05
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.3}>
      <group ref={group} position={[0, 0, -1]} scale={1.2}>
        {/* Head */}
        <mesh position={[0, 2.8, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#F5B800" metalness={0.3} roughness={0.6} emissive="#F5B800" emissiveIntensity={0.15} />
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.2, 12]} />
          <meshStandardMaterial color="#C49000" metalness={0.3} roughness={0.6} />
        </mesh>
        
        {/* Torso - broad chest */}
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[0.9, 1, 0.45]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Abs section */}
        <mesh position={[0, 1.15, 0]}>
          <boxGeometry args={[0.7, 0.5, 0.4]} />
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Left arm - raised holding barbell */}
        <group position={[-0.55, 2.2, 0]} rotation={[0, 0, -0.3]}>
          {/* Upper arm */}
          <mesh position={[-0.2, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.5, 8, 12]} />
            <meshStandardMaterial color="#C49000" metalness={0.3} roughness={0.5} />
          </mesh>
          {/* Forearm raised */}
          <mesh position={[-0.4, 0.4, 0]} rotation={[0, 0, 0.8]}>
            <capsuleGeometry args={[0.08, 0.45, 8, 12]} />
            <meshStandardMaterial color="#C49000" metalness={0.3} roughness={0.5} />
          </mesh>
        </group>
        
        {/* Right arm - raised holding barbell */}
        <group position={[0.55, 2.2, 0]} rotation={[0, 0, 0.3]}>
          <mesh position={[0.2, 0, 0]}>
            <capsuleGeometry args={[0.1, 0.5, 8, 12]} />
            <meshStandardMaterial color="#C49000" metalness={0.3} roughness={0.5} />
          </mesh>
          <mesh position={[0.4, 0.4, 0]} rotation={[0, 0, -0.8]}>
            <capsuleGeometry args={[0.08, 0.45, 8, 12]} />
            <meshStandardMaterial color="#C49000" metalness={0.3} roughness={0.5} />
          </mesh>
        </group>
        
        {/* Left leg */}
        <mesh position={[-0.2, 0.4, 0]}>
          <capsuleGeometry args={[0.12, 0.7, 8, 12]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[-0.2, -0.4, 0]}>
          <capsuleGeometry args={[0.1, 0.6, 8, 12]} />
          <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
        </mesh>
        
        {/* Right leg */}
        <mesh position={[0.2, 0.4, 0]}>
          <capsuleGeometry args={[0.12, 0.7, 8, 12]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.2, -0.4, 0]}>
          <capsuleGeometry args={[0.1, 0.6, 8, 12]} />
          <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
        </mesh>
        
        {/* Barbell being held overhead */}
        <group position={[0, 3.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 2.5, 12]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.95} roughness={0.1} />
          </mesh>
          {[-1.1, -1.2].map((y, i) => (
            <mesh key={`bl${i}`} position={[0, y, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.06, 16]} />
              <meshStandardMaterial color={i === 0 ? '#F5B800' : '#1a1a1a'} metalness={0.8} roughness={0.2} emissive={i === 0 ? '#F5B800' : '#000'} emissiveIntensity={i === 0 ? 0.1 : 0} />
            </mesh>
          ))}
          {[1.1, 1.2].map((y, i) => (
            <mesh key={`br${i}`} position={[0, y, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.06, 16]} />
              <meshStandardMaterial color={i === 0 ? '#F5B800' : '#1a1a1a'} metalness={0.8} roughness={0.2} emissive={i === 0 ? '#F5B800' : '#000'} emissiveIntensity={i === 0 ? 0.1 : 0} />
            </mesh>
          ))}
        </group>
        
        {/* Gold glow aura */}
        <mesh position={[0, 1.5, -0.3]}>
          <planeGeometry args={[2, 4]} />
          <meshBasicMaterial color="#F5B800" transparent opacity={0.03} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  )
}

/* ============ CAMERA RIG ============ */
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02
    camera.position.y += (mouse.current.y * 0.3 + 2 - camera.position.y) * 0.02
    camera.lookAt(0, 1, 0)
  })

  // Mouse tracking
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }, { passive: true })
  }

  return null
}

/* ============ SCENE ============ */
function GymScene() {
  return (
    <>
      <CameraRig />
      
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 8, 5]} color="#F5B800" intensity={2} distance={25} decay={2} />
      <pointLight position={[-5, 6, -3]} color="#F5B800" intensity={1} distance={20} decay={2} />
      <spotLight position={[0, 10, 5]} color="#FFD54F" intensity={3} angle={0.4} penumbra={0.8} castShadow />
      <pointLight position={[0, -2, 3]} color="#F5B800" intensity={0.5} distance={15} />
      
      {/* Fog */}
      <fog attach="fog" color="#0A0A0A" near={8} far={25} />
      
      {/* Bodybuilder - center piece */}
      <BodybuilderFigure />
      
      {/* Floating dumbbells */}
      <Dumbbell position={[-3, 2, -2]} rotation={[0.3, 0.5, 0.8]} scale={0.8} />
      <Dumbbell position={[3.5, 1, -3]} rotation={[-0.2, 1, 0.4]} scale={0.6} />
      <Dumbbell position={[-2, 4, -4]} rotation={[0.5, -0.3, 1.2]} scale={0.5} />
      
      {/* Kettlebells */}
      <Kettlebell position={[2.5, 3.5, -2]} scale={0.7} />
      <Kettlebell position={[-3, 0.5, -3]} scale={0.9} />
      
      {/* Barbells */}
      <Barbell position={[0, -2, -4]} rotation={[0.1, 0, 0.15]} scale={0.5} />
      
      {/* Floating weight plates */}
      <WeightPlate position={[-4, 3, -5]} rotation={[0.5, 0.3, 0]} scale={0.8} />
      <WeightPlate position={[4, 0, -4]} rotation={[-0.3, 0.8, 0.5]} scale={0.6} color="#F5B800" />
      <WeightPlate position={[1, 5, -6]} rotation={[1, 0.2, 0.3]} scale={0.5} />
      
      {/* Gold particles */}
      <GoldParticles count={500} />
      
      {/* Grid floor */}
      <GridFloor />
    </>
  )
}

/* ============ EXPORTED CANVAS ============ */
export default function ThreeScene() {
  return (
    <div className="three-canvas-wrap">
      <Canvas
        camera={{ position: [0, 2, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <GymScene />
      </Canvas>
    </div>
  )
}
