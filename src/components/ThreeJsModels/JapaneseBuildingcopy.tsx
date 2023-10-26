// import { Environment, OrbitControls } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';
// import { Suspense } from 'react';
// import { useEffect, useRef, useState } from 'react';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// function ModelAsset(props) {
//   const gltfLoader = new GLTFLoader();
//   const [model, setModel] = useState(null);
//   const modelRef = useRef();

//   // Use the useFrame hook to rotate the model on each frame render

//   useEffect(() => {
//     gltfLoader.load('/ModelsFolder/untitled.glb', (gltf) => {
//       setModel(gltf.scene);
//     });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return model ? <primitive ref={modelRef} object={model} {...props} /> : null;
// }

// const JapaneseBuildingcopy = ({ height }) => {
//   const controlsRef = useRef();

//   return (
//     <Canvas style={{ height: `${height}` }}>
//       <ambientLight intensity={0.5} />
//       <directionalLight intensity={0.8} position={[10, -0, -30]} />
//       <Environment
//         files='/img/kloofendal_misty_morning_puresky_4k.hdr'
//         background
//       />
//       <Suspense fallback={null}>
//         <ModelAsset position={[0, -20, -32]} />
//       </Suspense>
//       <OrbitControls ref={controlsRef} target={[0, -3, -32]} />
//     </Canvas>
//   );
// };

// export default JapaneseBuildingcopy;
