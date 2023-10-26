import { useGLTF } from '@react-three/drei';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    SM_Mystic_Treasure_I_KingArm: Mesh;
  };
  materials: {
    ['Interior_Brick_low.005']: MeshStandardMaterial;
  };
};

function ModelAsset(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/ModelsFolder/kings-hand-transformed.glb',
  ) as GLTFResult;

  const { camera } = useThree();

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
        geometry={nodes.SM_Mystic_Treasure_I_KingArm.geometry}
        material={materials['Interior_Brick_low.005']}
        rotation={[-2.686, -1.357, -2.695]}
      />
    </group>
  );
}
useGLTF.preload('/ModelsFolder/kings-hand-transformed.glb');

const KingsHand = () => {
  // const { progress } = useProgress();

  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Environment
        files='/img/kloofendal_misty_morning_puresky_1k.hdr'
        background
      />
      <Suspense fallback={null}>
        <ModelAsset position={[0, -15, 0]} />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default KingsHand;
