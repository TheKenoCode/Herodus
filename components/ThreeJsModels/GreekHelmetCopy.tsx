'use client'

import { Canvas, useThree, useFrame, extend } from '@react-three/fiber'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useControls } from 'leva'

// Extend OrbitControls for R3F
extend({ OrbitControls })

function ModelAsset(props) {
  const { camera, gl, size } = useThree()
  const modelRef = useRef()
  const gltfLoader = new GLTFLoader()
  const objLoader = new OBJLoader()
  const [model, setModel] = useState(null)

  // If you want continuous rotation (Remove if not needed)
  // useFrame((state, delta) => (modelRef.current.rotation.y += delta))

  useEffect(() => {
    gltfLoader.load('/ModelsFolder/Grrek_Helmet_01.glb', (gltf) => {
      setModel(gltf.scene)
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.envMapIntensity = 1
        }
      })
    })

    objLoader.load('/ModelsFolder/Japanese_Temple.obj', (obj) => {
      setModel3(obj)
    })
  }, [])

  return model ? <primitive ref={modelRef} object={model} {...props} /> : null
}

const GreekHelmetCopy = ({ height }) => {
  const controlsRef = useRef()
  const [position, setPosition] = useState([10, -23, -22])
  const [target, setTarget] = useState([0, -3, -22])

  useEffect(() => {
    const setModelPosition = () => {
      const width = window.innerWidth

      if (width <= 576) {
        // Small devices (e.g., mobiles)
        setPosition([0, -21, -32])
      } else if (width <= 768) {
        // Medium devices (e.g., tablets)
        setPosition([0, -21, -22])
      } else {
        // Large devices (e.g., desktops)
        setPosition([10, -23, -22])
      }
    }

    const setControllsTarget = () => {
      const width = window.innerWidth

      if (width <= 576) {
        // Small devices (e.g., mobiles)
        setPosition([0, -3, -32])
      } else if (width <= 768) {
        // Medium devices (e.g., tablets)
        setPosition([0, -3, -22])
      } else {
        // Large devices (e.g., desktops)
        setPosition([0, -3, -22])
      }
    }

    setControllsTarget()
    setModelPosition() // Set initial position

    window.addEventListener('resize', setModelPosition) // Adjust position on window resize

    return () => {
      // Cleanup - remove the event listener when the component is unmounted
      window.removeEventListener('resize', setModelPosition)
    }
  }, [])
  return (
    <Canvas style={{ height: `${height}`, position: 'relative' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Environment preset="forest" background />
      <Suspense fallback={null}>
        <ModelAsset position={position} />
      </Suspense>
      <OrbitControls ref={controlsRef} target={target} />
    </Canvas>
  )
}

export default GreekHelmetCopy
