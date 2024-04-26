import React, { useEffect, useRef } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useCurrentSheet } from "@theatre/r3f";
import { useScroll } from "@react-spring/three";

const Car = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/car.glb");
  const { actions } = useAnimations(animations, group);

  const sheet = useCurrentSheet();

  console.log("Sheet:", sheet);

  const scroll = useScroll();

  const lightMaterial = materials["wire_5.002"];
  if (lightMaterial) {
    lightMaterial.emissive.setHex(0xffff00);

    lightMaterial.emissiveIntensity = 0.3;

    lightMaterial.toneMapped = false;

    lightMaterial.needsUpdate = true;
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera
          name="Camera001"
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={45.747}
          position={[-8.34, 0.56, -0.002]}
          rotation={[Math.PI / 2, -1.426, Math.PI / 2]}
          scale={[9.457, 13.338, 9.457]}
        >
          <group
            name="Car"
            position={[0.001, -0.059, -0.181]}
            rotation={[3.013, -0.001, -3.126]}
            scale={[0.003, 0.002, 0.003]}
          >
            <mesh
              name="Object_2002"
              castShadow
              receiveShadow
              geometry={nodes.Object_2002.geometry}
              material={materials["wire_3.002"]}
            />
            <mesh
              name="Object_2002_1"
              castShadow
              receiveShadow
              geometry={nodes.Object_2002_1.geometry}
              material={materials["wire_4.002"]}
            />
            <mesh
              name="Object_2002_2"
              castShadow
              receiveShadow
              geometry={nodes.Object_2002_2.geometry}
              material={materials["wire_5.002"]}
            />
            <mesh
              name="Object_2002_3"
              castShadow
              receiveShadow
              geometry={nodes.Object_2002_3.geometry}
              material={materials["wire_6.002"]}
            />
            <mesh
              name="Object_2002_4"
              castShadow
              receiveShadow
              geometry={nodes.Object_2002_4.geometry}
              material={materials["wire_7.002"]}
            />
            <mesh
              name="Object_2002_5"
              castShadow
              receiveShadow
              geometry={nodes.Object_2002_5.geometry}
              material={materials["wire_8.002"]}
            />
            <mesh
              name="Object_2002_6"
              castShadow
              receiveShadow
              geometry={nodes.Object_2002_6.geometry}
              material={materials["wire_9.002"]}
            />
          </group>
        </PerspectiveCamera>
      </group>
    </group>
  );
};

export default Car;
