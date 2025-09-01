import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Sun = (props) => {
  const { nodes, materials, scene } = useGLTF("/sun.glb");

  // Debug what's available in the GLB
  useEffect(() => {
    console.log("Sun GLB nodes:", Object.keys(nodes));
    console.log("Sun GLB materials:", Object.keys(materials));
    console.log("Sun GLB scene:", scene);
    
    // Debug scene hierarchy
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log("Found mesh:", child.name, "geometry:", child.geometry, "material:", child.material);
      }
    });
    
    // Detailed material debugging
    Object.entries(materials).forEach(([name, material]) => {
      console.log(`Material "${name}":`, {
        type: material.type,
        color: material.color?.getHexString(),
        emissive: material.emissive?.getHexString(),
        emissiveIntensity: material.emissiveIntensity,
        map: material.map,
        emissiveMap: material.emissiveMap,
        transparent: material.transparent,
        opacity: material.opacity
      });
    });
  }, [nodes, materials, scene]);

  // Use the baked texture from Blender and enhance it
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material) {
        // Preserve the baked texture and enhance the glow
        material.toneMapped = false; // Keep vibrant colors
        
        // If there's already an emissive map from the baked texture, enhance it
        if (material.emissiveMap) {
          material.emissive = new THREE.Color(0xffffff); // Ensure pure white emissive base
          material.emissiveIntensity = Math.max(material.emissiveIntensity, 1.2); // Boost intensity slightly
          console.log("Enhanced baked emissive texture for:", material.name);
        }
        
        // If there's a regular map, we might want to use it as emissive too
        if (material.map && !material.emissiveMap) {
          material.emissiveMap = material.map;
          material.emissive = new THREE.Color(0xffffff);
          material.emissiveIntensity = 1.0;
          console.log("Applied regular texture as emissive for:", material.name);
        }
        
        material.needsUpdate = true;
        console.log("Final material properties:", {
          name: material.name,
          hasEmissiveMap: !!material.emissiveMap,
          hasMap: !!material.map,
          emissiveIntensity: material.emissiveIntensity,
          emissive: material.emissive?.getHexString()
        });
      }
    });
  }, [materials]);

  // Render the entire scene to preserve your Blender setup
  return (
    <group {...props} dispose={null}>
      <primitive 
        object={scene} 
        position={[200, 20, 20]}
        rotation={[0, 0, 0]}
        scale={[10, 10, 10]}
      />
    </group>
  );
};

export default Sun;
