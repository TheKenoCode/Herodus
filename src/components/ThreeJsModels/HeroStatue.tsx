import { useGLTF } from '@react-three/drei';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';
import { useBlurShader } from '@/lib/hooks/blurShader';

interface ModelAssetProps {
  position: number[];
  rotation: number[];
  mousePos: { x: number; y: number };
}
type GLTFResult = GLTF & {
  nodes: {
    nimbus001_0: Mesh;
    nimbus002_0: Mesh;
    Shape_6: Mesh;
    herocard2png: Mesh;
    nimbus003_0: Mesh;
    mentor_roman_retopo_0: Mesh;
  };
  materials: {
    Crown: MeshStandardMaterial;
    Material_0: MeshStandardMaterial;
    Material_1: MeshStandardMaterial;
    Stone: MeshStandardMaterial;
  };
};

function HeroStatue() {
  const [modelPosition, setModelPosition] = useState([-2, -13, -10]); // Default position for MD and smaller screens
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleInteractionMove = useCallback(
    (clientX: number, clientY: number) => {
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    },
    [],
  );
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      handleInteractionMove(event.clientX, event.clientY);
    },
    [handleInteractionMove], // Assuming handleInteractionMove doesn't change, or is also memoized
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      // Use the first touch point
      const touch = event.touches[0];
      handleInteractionMove(touch.clientX, touch.clientY);
    },
    [handleInteractionMove], // Assuming handleInteractionMove doesn't change, or is also memoized
  );

  useEffect(() => {
    // Determine screen size and set model position
    if (window.innerWidth >= 1280) {
      // Assuming 1280px as the breakpoint for XL screens
      setModelPosition([10, -13, 0]);
    } else {
      setModelPosition([-2, -13, -10]);
    }

    // Attach the event listener to the window
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <Canvas
      className='pointer-events-none animate-fade  animate-once'
      onWheel={(e) => e.stopPropagation()}
      style={{ height: '100%', width: '100%', position: 'absolute' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Environment files='/img/kloofendal_misty_morning_puresky_1k.hdr' />
        <ModelAsset
          position={modelPosition}
          rotation={[0, 0, 0]}
          mousePos={mousePos} // <-- Pass mousePos here
        />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
      />
    </Canvas>
  );
}

export default HeroStatue;

function ModelAsset({ position, rotation, mousePos }: ModelAssetProps) {
  const { camera } = useThree();
  const group = useRef<Group>();
  const rotationGroup = useRef<Group>();

  const { nodes, materials } = useGLTF(
    '/ModelsFolder/herocard2-transformed.glb',
  ) as GLTFResult;

  camera.position.set(0, 0, 25);

  const nimbus001Ref = useRef<Group>();
  const nimbus002Ref = useRef<Group>();
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  useFrame(() => {
    if (nimbus001Ref.current && nimbus002Ref.current) {
      // Smooth motion (interpolation)
      targetRotation.current = mousePos.x * 0.4;
      currentRotation.current +=
        (targetRotation.current - currentRotation.current) * 0.1;

      nimbus001Ref.current.rotation.z -= 0.007;
      nimbus002Ref.current.rotation.z += 0.007;

      // Apply the smoothly interpolated rotation
      rotationGroup.current!.rotation.y = currentRotation.current;
    }
  });
  return (
    <group ref={group} {...{ position, rotation }} dispose={null}>
      <group ref={rotationGroup} name='Scene'>
        <group
          name='bitRing'
          position={[0, 21.271, 0.919]}
          rotation={[-1.675, 0.099, 0.002]}
          scale={5.925}
        >
          <group name='nimbus001' ref={nimbus001Ref}>
            <mesh
              name='nimbus001_0'
              geometry={nodes.nimbus001_0.geometry}
              material={materials.Crown} // Use shader material
            />
          </group>
          <group name='nimbus002'>
            <mesh
              name='nimbus002_0'
              ref={nimbus002Ref}
              geometry={nodes.nimbus002_0.geometry}
              material={materials.Crown}
            />
          </group>
        </group>
        <mesh
          name='Shape_6'
          geometry={nodes.Shape_6.geometry}
          material={materials.Material_0}
          position={[-6.262, 25.448, -6.354]}
          scale={0.018}
        />
        <mesh
          name='herocard2png'
          geometry={nodes.herocard2png.geometry}
          material={materials.Material_1}
          position={[1.86, 11.515, -3.953]}
          scale={0.018}
        />
        <mesh
          name='nimbus003_0'
          geometry={nodes.nimbus003_0.geometry}
          material={materials.Crown}
          position={[0.93, 24.271, 0.919]}
          rotation={[-1.675, 0.099, 0.002]}
          scale={4.925}
        />
        <mesh
          name='mentor_roman_retopo_0'
          geometry={nodes.mentor_roman_retopo_0.geometry}
          material={materials.Stone} // Replace with shader material
          position={[-1.427, 5.055, -0.684]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={5.519}
        />
      </group>
    </group>
  );
}
