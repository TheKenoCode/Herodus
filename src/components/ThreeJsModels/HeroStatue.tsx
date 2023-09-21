import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from '@react-three/drei'

interface ModelAssetProps {
  position: number[]
  rotation: number[]
}

function HeroStatue({ height }: { height: number }) {
  const [modelPosition, setModelPosition] = useState([-2, -13, -10]) // Default position for MD and smaller screens
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleInteractionMove = (clientX: number, clientY: number) => {
    const x = (clientX / window.innerWidth) * 2 - 1
    const y = -(clientY / window.innerHeight) * 2 + 1
    setMousePos({ x, y })
  }

  const handleMouseMove = (event: MouseEvent) => {
    handleInteractionMove(event.clientX, event.clientY)
  }

  const handleTouchMove = (event: TouchEvent) => {
    // Use the first touch point
    const touch = event.touches[0]
    handleInteractionMove(touch.clientX, touch.clientY)
  }

  useEffect(() => {
    // Determine screen size and set model position
    if (window.innerWidth >= 1280) {
      // Assuming 1280px as the breakpoint for XL screens
      setModelPosition([10, -13, 0])
    } else {
      setModelPosition([-2, -13, -10])
    }

    // Attach the event listener to the window
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <Canvas
      className="pointer-events-none"
      onWheel={(e) => e.stopPropagation()}
      style={{ height: '100%', width: '100%', position: 'absolute' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Environment files={'/img/kloofendal_misty_morning_puresky_1k.hdr'} />
        <ModelAsset
          position={modelPosition}
          rotation={[mousePos.y * -0, mousePos.x * 0.8, 0]}
        />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />
    </Canvas>
  )
}

export default HeroStatue

function ModelAsset(props: ModelAssetProps) {
  const { camera } = useThree()
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '/ModelsFolder/herocard2-transformed.glb'
  )
  const { actions } = useAnimations(animations, group)

  camera.position.set(0, 0, 25)

  const nimbus001Ref = useRef<THREE.Mesh>()
  const nimbus002Ref = useRef<THREE.Mesh>()

  useFrame(({ clock }) => {
    // Rotate the meshes continuously over time
    if (nimbus001Ref.current) {
      nimbus001Ref.current.rotation.z -= 0.007 // Adjust speed as needed
    }
    if (nimbus002Ref.current) {
      nimbus002Ref.current.rotation.z += 0.007 // Adjust speed as needed
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="bitRing"
          position={[2, 21.271, 0.919]}
          rotation={[-1.675, 0.099, 0.002]}
          scale={5.925}
        >
          <group name="nimbus001">
            <mesh
              ref={nimbus001Ref}
              name="nimbus001_0"
              geometry={nodes.nimbus001_0.geometry}
              material={materials.Crown}
            />
          </group>
          <group name="nimbus002">
            <mesh
              ref={nimbus002Ref}
              name="nimbus002_0"
              geometry={nodes.nimbus002_0.geometry}
              material={materials.Crown}
            />
          </group>
        </group>
        <mesh
          name="Shape_6"
          geometry={nodes.Shape_6.geometry}
          material={materials.Material_0}
          position={[-6.262, 25.448, -6.354]}
          scale={0.018}
        />
        <mesh
          name="herocard2png"
          geometry={nodes.herocard2png.geometry}
          material={materials.Material_1}
          position={[1.86, 11.515, -3.953]}
          scale={0.018}
        />
        <mesh
          name="nimbus003_0"
          geometry={nodes.nimbus003_0.geometry}
          material={materials.Crown}
          position={[0.93, 24.271, 0.919]}
          rotation={[-1.675, 0.099, 0.002]}
          scale={4.925}
        />
        <mesh
          name="mentor_roman_retopo_0"
          geometry={nodes.mentor_roman_retopo_0.geometry}
          material={materials.Stone}
          position={[-0, 5.055, -0.684]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={5.519}
        />
      </group>
    </group>
  )
}
