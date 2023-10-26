'use client';
import { useGLTF } from '@react-three/drei';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import { useRef } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';
type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial006: Mesh;
    defaultMaterial002: Mesh;
    defaultMaterial004: Mesh;
    defaultMaterial003: Mesh;
    defaultMaterial: Mesh;
    defaultMaterial005: Mesh;
    defaultMaterial007: Mesh;
    defaultMaterial008: Mesh;
    defaultMaterial001: Mesh;
  };
  materials: {
    Arch_and_pillars: MeshStandardMaterial;
    Ballustrade: MeshStandardMaterial;
    Bath_tub: MeshStandardMaterial;
    Changing_rooms: MeshStandardMaterial;
    Ground: MeshStandardMaterial;
    Roofs: MeshStandardMaterial;
    Statue_Young_man: MeshStandardMaterial;
    Statue_old_man: MeshStandardMaterial;
    Water: MeshStandardMaterial;
  };
};

export function ModelAsset(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '/ModelsFolder/buildings-transformed.glb',
  ) as GLTFResult;

  const modelRef = useRef<Group>();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group group ref={modelRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.defaultMaterial006.geometry}
        material={materials.Arch_and_pillars}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
      <mesh
        geometry={nodes.defaultMaterial002.geometry}
        material={materials.Ballustrade}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
      <mesh
        geometry={nodes.defaultMaterial004.geometry}
        material={materials.Bath_tub}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
      <mesh
        geometry={nodes.defaultMaterial003.geometry}
        material={materials.Changing_rooms}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
      <mesh
        geometry={nodes.defaultMaterial.geometry}
        material={materials.Ground}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
      <mesh
        geometry={nodes.defaultMaterial005.geometry}
        material={materials.Roofs}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
      <mesh
        geometry={nodes.defaultMaterial007.geometry}
        material={materials.Statue_Young_man}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
      <mesh
        geometry={nodes.defaultMaterial008.geometry}
        material={materials.Statue_old_man}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
      <mesh
        geometry={nodes.defaultMaterial001.geometry}
        material={materials.Water}
        position={[-3.403, -9.277, -33.522]}
        scale={200.441}
      />
    </group>
  );
}
useGLTF.preload('/ModelsFolder/buildings-transformed.glb');

export default function GreekBuilding() {
  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Environment files='./img/table_mountain_1_1k.hdr' background />

        <ModelAsset position={[0, -10, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
