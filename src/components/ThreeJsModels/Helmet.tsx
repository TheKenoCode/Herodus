import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { OrbitControls, Environment } from '@react-three/drei'
import { useState, useEffect, useRef, Suspense } from 'react'
import loadingModel from '../../public/assets/loadingmodel.gif'

function ModelAsset(props) {
  const { camera } = useThree()
  const { nodes, materials } = useGLTF('/ModelsFolder/helmet-transformed.glb')
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })
  camera.position.set(10, 0, 35)

  return (
    <group ref={modelRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials.Liner}
      />
      <mesh
        geometry={nodes.defaultMaterial_1.geometry}
        material={materials.Mail}
      />
      <mesh
        geometry={nodes.defaultMaterial_2.geometry}
        material={materials.Face_guard}
      />
      <mesh
        geometry={nodes.defaultMaterial_3.geometry}
        material={materials.Helmet_42}
      />
    </group>
  )
}

const Helmet = ({ height }) => {
  useGLTF.preload('/ModelsFolder/helmet-transformed.glb')

  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Environment
        files={'/img/kloofendal_misty_morning_puresky_1k.hdr'}
        background
      />
      <Suspense fallback={null}>
        <ModelAsset position={[0, -10, 0]} />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default Helmet
