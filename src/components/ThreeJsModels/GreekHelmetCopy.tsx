// 'use client';

// import { Environment, OrbitControls } from '@react-three/drei';
// import { Canvas, extend } from '@react-three/fiber';
// import { Suspense, useEffect, useRef, useState } from 'react';

// // Extend OrbitControls for R3F
// extend({ OrbitControls });

// function ModelAsset(props) {
//   const modelRef = useRef();
//   const gltfLoader = useMemo(() => new THREE.GLTFLoader(), []);
//   const [model, setModel] = useState(null);

//   useEffect(() => {
//     gltfLoader.load('/ModelsFolder/buildings.glb', (gltf) => {
//       setModel(gltf.scene);
//       gltf.scene.traverse((child) => {
//         if (child.isMesh) {
//           child.material.envMapIntensity = 1;
//         }
//       });
//     });
//   }, [gltfLoader]);

//   return model ? <primitive ref={modelRef} object={model} {...props} /> : null;
// }

// export default function GreekHelmetCopy({ height }) {
//   const controlsRef = useRef();
//   const [position, setPosition] = useState([10, -5, -22]);

//   useEffect(() => {
//     const setModelPosition = () => {
//       const width = window.innerWidth;

//       if (width <= 576) {
//         // Small devices (e.g., mobiles)
//         setPosition([0, -21, -32]);
//       } else if (width <= 768) {
//         // Medium devices (e.g., tablets)
//         setPosition([0, -21, -22]);
//       } else {
//         // Large devices (e.g., desktops)
//         setPosition([10, -5, -22]);
//       }
//     };

//     const setControllsTarget = () => {
//       const width = window.innerWidth;

//       if (width <= 576) {
//         // Small devices (e.g., mobiles)
//         setPosition([0, -3, -32]);
//       } else if (width <= 768) {
//         // Medium devices (e.g., tablets)
//         setPosition([0, -3, -22]);
//       } else {
//         // Large devices (e.g., desktops)
//         setPosition([0, -3, -22]);
//       }
//     };

//     setControllsTarget();
//     setModelPosition(); // Set initial position

//     window.addEventListener('resize', setModelPosition); // Adjust position on window resize

//     return () => {
//       // Cleanup - remove the event listener when the component is unmounted
//       window.removeEventListener('resize', setModelPosition);
//     };
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       let dx = 0;
//       const dy = 0;
//       let dz = 0;

//       switch (e.key) {
//         case 'ArrowUp':
//           dz = -1; // Move model forward
//           break;
//         case 'ArrowDown':
//           dz = 1; // Move model backward
//           break;
//         case 'ArrowLeft':
//           dx = -1; // Move model to the left
//           break;
//         case 'ArrowRight':
//           dx = 1; // Move model to the right
//           break;
//         // Add more cases for other keys if desired
//       }

//       setPosition((prevPos) => [
//         prevPos[0] + dx,
//         prevPos[1] + dy,
//         prevPos[2] + dz,
//       ]);
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);
//   return (
//     <Canvas style={{ height: `${height}`, position: 'relative' }}>
//       <ambientLight intensity={0.5} />
//       <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
//       <pointLight position={[-10, -10, -10]} />
//       <Environment files='./img/HdrSkyMorning004_HDR_4K.hdr' background />
//       <Suspense fallback={null}>
//         <ModelAsset position={position} />
//       </Suspense>
//       <OrbitControls ref={controlsRef} target={target} />
//     </Canvas>
//   );
// }
