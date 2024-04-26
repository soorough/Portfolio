import React from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

const WireFrame = (props) => {
  const { nodes, materials } = useGLTF("/wireframe.glb");

  const customMaterial = new MeshStandardMaterial({
    emissive: "#c700b5",
    emissiveIntensity: 0.6,
    toneMapped: false,
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={customMaterial}
        position={[70.957, 0.521, 0.071]}
        scale={[1, 1, 1.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={customMaterial}
        position={[151.608, -1.444, 0.323]}
        scale={[1, 1, 0.944]}
      />
    </group>
  );
};

export default WireFrame;
