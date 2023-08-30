'use client'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, Environment, useTexture } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'

function ModelAsset(props) {
  const { camera, size } = useThree()

  const gltfLoader = new GLTFLoader()
  const [model, setModel] = useState(null)
  const modelRef = useRef()
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002
    }
  })
  useEffect(() => {
    gltfLoader.load('/ModelsFolder/buildings.glb', (gltf) => {
      setModel(gltf.scene)
      console.log(model)
    })

    camera.position.set(10, 2, 35)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return model ? <primitive ref={modelRef} object={model} {...props} /> : null
}

const GreekBuilding = ({ height }) => {
  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Environment files="./img/table_mountain_1_4k.hdr" background />

        <ModelAsset position={[0, -10, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default GreekBuilding
