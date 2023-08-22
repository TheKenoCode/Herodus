// React & Three.js imports
'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'

// Three.js loaders
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function ModelAsset(props) {
  const { camera } = useThree()
  const modelRef = useRef()
  const gltfLoader = new GLTFLoader()
  const objLoader = new OBJLoader()
  const [model, setModel] = useState(null)
  const [model3, setModel3] = useState(null)

  // Rotate the model on each frame render
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.02 // Adjust the rotation speed as needed
    }
  })

  // Load the models
  useEffect(() => {
    gltfLoader.load('/ModelsFolder/Grrek_Helmet_01.glb', (gltf) => {
      setModel(gltf.scene)

      // Adjust material properties for shine effect
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.envMapIntensity = 1 // Increase the environment map intensity
        }
      })
    })

    objLoader.load('/ModelsFolder/Japanese_Temple.obj', (obj) => {
      setModel3(obj)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set camera position
  camera.position.set(0, 0, 20)

  return model ? <primitive ref={modelRef} object={model} {...props} /> : null
}

const GreekHelmet = ({ height }) => {
  return (
    <Canvas style={{ height: `${height}`, position: 'relative' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <ModelAsset position={[0, -21, -12]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default GreekHelmet
