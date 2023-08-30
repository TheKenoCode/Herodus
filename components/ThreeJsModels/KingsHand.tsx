import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, Environment } from '@react-three/drei'
import { useState, useEffect, useRef, Suspense } from 'react'
import { Html, useProgress } from '@react-three/drei'
import loadingModel from '../../public/assets/loadingmodel.gif'

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
    gltfLoader.load('/ModelsFolder/kings-hand.glb', (gltf) => {
      setModel(gltf.scene)
    })

    camera.position.set(0, 0, 25)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return model ? <primitive ref={modelRef} object={model} {...props} /> : null
}

const Loader: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 3000)

    return () => clearTimeout(timer) // Clear timeout if the component is unmounted
  }, [])

  if (!showLoader) {
    return null // Render nothing if loader should not be shown
  }

  return (
    <div className="text-white w-full h-full flex justify-center items-center">
      <Image src={loadingModel} className="w-full " />
    </div>
  )
}
const KingsHand = ({ height }) => {
  const { progress } = useProgress()

  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Environment preset={'dawn'} background />
      <Suspense fallback={<Loader />}>
        <ModelAsset position={[0, -15, 0]} />
      </Suspense>

      <OrbitControls />
    </Canvas>
  )
}

export default KingsHand
