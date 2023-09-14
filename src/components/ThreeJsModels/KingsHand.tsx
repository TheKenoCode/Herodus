import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { OrbitControls, Environment } from '@react-three/drei'
import { useState, useEffect, useRef, Suspense } from 'react'
import { Html, useProgress } from '@react-three/drei'

function ModelAsset(props) {
  const { nodes, materials } = useGLTF(
    '/ModelsFolder/kings-hand-transformed.glb',
  )
  const { camera } = useThree()

  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })
  camera.position.set(0, 0, 25)

  return (
    <group ref={modelRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.SM_Mystic_Treasure_I_KingArm.geometry}
        material={materials['Interior_Brick_low.005']}
        rotation={[-2.686, -1.357, -2.695]}
      />
    </group>
  )
}
useGLTF.preload('/ModelsFolder/kings-hand-transformed.glb')

const KingsHand = ({ height }) => {
  const { progress } = useProgress()

  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Environment
        files={'/img/kloofendal_misty_morning_puresky_1k.hdr'}
        background
      />
      <Suspense fallback={null}>
        <ModelAsset position={[0, -15, 0]} />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default KingsHand
