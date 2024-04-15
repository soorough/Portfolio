/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useGLTF, PerspectiveCamera} from "@react-three/drei";
import { a } from "@react-spring/three";
import RetroScene from "../assets/Scene.glb";

const RetroWave = (props) => {
  const retroRef = useRef();
  const { nodes, materials} = useGLTF(RetroScene);
  return (
    <a.group ref={retroRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="Empty" position={[8, 0, 0]} />
        <group name="scene001" rotation={[Math.PI / 2, 0, 0]}>
          <group name="Materials001" />
          <group name="Meshes001" position={[0.945, -576.07, 0]} scale={12.995}>
            <group name="Sketchfab_model004" rotation={[-Math.PI / 2, 0, 0]}>
              <group name="MorphiOBJ_obj_cleaner_materialmerger_gles001">
                <group
                  name="Car"
                  position={[-0.575, 0.002, 44.332]}
                  rotation={[-1.604, 1.548, 1.619]}
                  scale={0.003}
                >
                  <mesh
                    name="Object_2002"
                    geometry={nodes.Object_2002.geometry}
                    material={materials["wire_3.002"]}
                  />
                  <mesh
                    name="Object_2002_1"
                    geometry={nodes.Object_2002_1.geometry}
                    material={materials["wire_4.002"]}
                  />
                  <mesh
                    name="Object_2002_2"
                    geometry={nodes.Object_2002_2.geometry}
                    material={materials["wire_5.002"]}
                  />
                  <mesh
                    name="Object_2002_3"
                    geometry={nodes.Object_2002_3.geometry}
                    material={materials["wire_6.002"]}
                  />
                  <mesh
                    name="Object_2002_4"
                    geometry={nodes.Object_2002_4.geometry}
                    material={materials["wire_7.002"]}
                  />
                  <mesh
                    name="Object_2002_5"
                    geometry={nodes.Object_2002_5.geometry}
                    material={materials["wire_8.002"]}
                  />
                  <mesh
                    name="Object_2002_6"
                    geometry={nodes.Object_2002_6.geometry}
                    material={materials["wire_9.002"]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <PerspectiveCamera
          name="Camera001"
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={45.747}
          position={[-8.34, 0.556, -0.002]}
          rotation={[Math.PI / 2, -1.426, Math.PI / 2]}
          scale={[9.457, 13.338, 9.457]}
        />
        <group name="Plane" position={[0, -0.215, 0]} scale={8}>
          <mesh
            name="Plane_1"
            geometry={nodes.Plane_1.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            name="Plane_2"
            geometry={nodes.Plane_2.geometry}
            material={materials["Material.002"]}
          />
        </group>
        <group
          name="Plane001"
          position={[151.608, -1.444, 0.323]}
          scale={[1, 1, 0.944]}
        >
          <mesh
            name="Plane001_1"
            geometry={nodes.Plane001_1.geometry}
            material={materials["SBWORKING_Material.001"]}
          />
          <mesh
            name="Plane001_2"
            geometry={nodes.Plane001_2.geometry}
            material={materials["SBWORKING_Material.002"]}
          />
        </group>
        <mesh
          name="Circle001"
          geometry={nodes.Circle001.geometry}
          material={materials["SBWORKING_Material.004"]}
          position={[291.303, -0.932, 0.717]}
          rotation={[1.59, 0, -Math.PI / 2]}
          scale={[36.378, 3274.044, 36.378]}
        />
      </group>
    </a.group>
  );
};

export default RetroWave;
