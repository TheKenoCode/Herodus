import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls, Environment, useTexture } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

function ModelAsset(props) {
  const { camera } = useThree()

  const gltfLoader = new GLTFLoader()
  const [model, setModel] = useState(null)
  const modelRef = useRef()
  const objLoader = new OBJLoader()
  const [model3, setModel3] = useState(null)

  // Use the useFrame hook to rotate the model on each frame render
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005 // Adjust the rotation speed as needed
    }
  })

  useEffect(() => {
    gltfLoader.load('/ModelsFolder/untitled.glb', (gltf) => {
      setModel(gltf.scene)
    })

    objLoader.load('/ModelsFolder/Japanese_Temple.obj', (obj) => {
      setModel3(obj)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  camera.position.set(0, 0, 20)
  return model ? <primitive ref={modelRef} object={model} {...props} /> : null
}

const JapaneseBuilding = ({ height }) => {
  return (
    <Canvas style={{ height: `${height}` }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <ModelAsset position={[0, -13, -12]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default JapaneseBuilding
