import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, Environment } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'

function ModelAsset(props) {
  const { camera, size } = useThree()

  const gltfLoader = new GLTFLoader()
  const [model, setModel] = useState(null)
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.02
    }
  })

  useEffect(() => {
    gltfLoader.load('/ModelsFolder/horse.glb', (gltf) => {
      setModel(gltf.scene)
    })

    camera.position.set(0, 0, 25)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return model ? <primitive ref={modelRef} object={model} {...props} /> : null
}

const Horse = ({ height }) => {
  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Environment preset={'forest'} background />
        <ModelAsset position={[0, -15, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default Horse
