import React, { useEffect, useRef } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useScroll } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useThree } from "@react-three/fiber";

const Car = ({ ...props }) => {
  const { camera } = useThree();
  const scroll = useScroll();
  const group = useRef();
  const { scene, nodes, materials, animations } = useGLTF("/car.glb");
  const { actions } = useAnimations(animations, scene);
  

  useEffect(() => void (actions["Camera.001"].play().paused = true), [actions]);
  useFrame((state, delta) => {
    const action = actions["Camera.001"];
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const offset = 1 - scroll.offset;
    action.time = MathUtils.damp(
      action.time,
      (action.getClip().duration / 2) * offset,
      100,
      delta
    );
    const position = [-8.34, 0.56, -0.002];
    const rotation = [Math.PI / 2, -1.426, Math.PI / 2];
    const scale = [9.457, 13.338, 9.457];

    camera.position.set(...position);
    camera.rotation.set(...rotation);
    camera.scale.set(...scale);

    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const lightMaterial = materials["wire_5.002"];
    if (lightMaterial) {
      lightMaterial.emissive.setHex(0xffff00);
      lightMaterial.emissiveIntensity = 0.3;
      lightMaterial.toneMapped = false;
      lightMaterial.needsUpdate = true;
    }
  }, [materials]);

  return (
    <group object={scene} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera
          name="Camera001"
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={45.747}
          position={[-8.34, 0.556, -0.002]}
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
