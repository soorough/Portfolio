import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Road = (props) => {
  const { nodes, materials } = useGLTF("/road.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Material.001"]}
        position={[70.957, 0.521, 0.031]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.001"]}
        position={[151.608, -1.444, 0.323]}
        scale={[1, 1, 0.944]}
      />
    </group>
  );
};

export default Road;
