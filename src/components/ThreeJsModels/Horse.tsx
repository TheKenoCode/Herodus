import { useGLTF } from '@react-three/drei';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { useRef } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';
type GLTFResult = GLTF & {
  nodes: {
    SM_Mystic_Treasure_G_PaceHorse: Mesh;
  };
  materials: {
    Interior_Brick_low: MeshStandardMaterial;
  };
};

export function ModelAsset(props: JSX.IntrinsicElements['group']) {
  const { camera } = useThree();
  const { nodes, materials } = useGLTF(
    '/ModelsFolder/horse-transformed.glb',
  ) as GLTFResult;
  const modelRef = useRef<Group>();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  camera.position.set(0, 0, 25);

  return (
    <group ref={modelRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.SM_Mystic_Treasure_G_PaceHorse.geometry}
        material={materials.Interior_Brick_low}
        rotation={[-0.052, 0, 0]}
      />
    </group>
  );
}
useGLTF.preload('/ModelsFolder/horse-transformed.glb');

const Horse = () => {
  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Environment
          files='/img/kloofendal_misty_morning_puresky_1k.hdr'
          background
        />
        <ModelAsset position={[0, -15, 0]} />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Horse;
