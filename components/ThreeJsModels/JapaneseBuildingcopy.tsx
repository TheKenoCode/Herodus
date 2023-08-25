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

  useEffect(() => {
    gltfLoader.load('/ModelsFolder/untitled.glb', (gltf) => {
      setModel(gltf.scene)
    })

    objLoader.load('/ModelsFolder/Japanese_Temple.obj', (obj) => {
      setModel3(obj)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return model ? <primitive ref={modelRef} object={model} {...props} /> : null
}

const JapaneseBuildingcopy = ({ height }) => {
  const controlsRef = useRef()

  return (
    <Canvas style={{ height: `${height}` }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, -0, -30]} />
      <Environment preset="night" background />
      <Suspense fallback={null}>
        <ModelAsset position={[0, -20, -32]} />
      </Suspense>
      <OrbitControls ref={controlsRef} target={[0, -3, -32]} />
    </Canvas>
  )
}

export default JapaneseBuildingcopy
