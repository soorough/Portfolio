import React from "react";
import { useGLTF } from "@react-three/drei";

const Sun = (props) => {
  const { nodes, materials } = useGLTF("/sun.glb");

  const sunMaterial = materials["Material.004"];

  if (sunMaterial) {
    sunMaterial.emissive.setHex(0xffff00);

    sunMaterial.emissiveIntensity = 5;

    sunMaterial.toneMapped = false;

    sunMaterial.needsUpdate = true;
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={sunMaterial}
        position={[291.303, -0.932, 0.717]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[36.378, 3274.044, 36.378]}
      />
    </group>
  );
};

export default Sun;
