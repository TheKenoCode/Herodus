import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import { OrbitControls, Environment } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'

function ModelAsset(props) {
  const { camera, size } = useThree()
  const { nodes, materials } = useGLTF('/ModelsFolder/horse-transformed.glb')
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.02
    }
  })

  camera.position.set(0, 0, 25)

  return (
    <group ref={modelRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.SM_Mystic_Treasure_G_PaceHorse.geometry}
        material={materials.Interior_Brick_low}
        rotation={[-0.052, 0, 0]}
      />
    </group>
  )
}
useGLTF.preload('/ModelsFolder/horse-transformed.glb')

const HorseWidget = ({ height }) => {
  return (
    <Canvas style={{ height: '300px', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Environment
          files={'/img/kloofendal_misty_morning_puresky_1k.hdr'}
          background
        />
        <ModelAsset position={[0, -15, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default HorseWidget
