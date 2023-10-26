import { useGLTF } from '@react-three/drei';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: Mesh;
    defaultMaterial_1: Mesh;
    defaultMaterial_2: Mesh;
    defaultMaterial_3: Mesh;
  };
  materials: {
    Liner: MeshStandardMaterial;
    Mail: MeshStandardMaterial;
    Face_guard: MeshStandardMaterial;
    Helmet_42: MeshStandardMaterial;
  };
};

export function ModelAsset(props: JSX.IntrinsicElements['group']) {
  const { camera } = useThree();
  const { nodes, materials } = useGLTF(
    '/ModelsFolder/helmet-transformed.glb',
  ) as GLTFResult;
  const modelRef = useRef<Group>();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });
  camera.position.set(10, 0, 35);

  return (
    <group ref={modelRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials.Liner}
      />
      <mesh
        geometry={nodes.defaultMaterial_1.geometry}
        material={materials.Mail}
      />
      <mesh
        geometry={nodes.defaultMaterial_2.geometry}
        material={materials.Face_guard}
      />
      <mesh
        geometry={nodes.defaultMaterial_3.geometry}
        material={materials.Helmet_42}
      />
    </group>
  );
}

export default function Helmet() {
  useGLTF.preload('/ModelsFolder/helmet-transformed.glb');

  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Environment
        files='/img/kloofendal_misty_morning_puresky_1k.hdr'
        background
      />
      <Suspense fallback={null}>
        <ModelAsset position={[0, -10, 0]} />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
