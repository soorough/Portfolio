import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";

const Car = ({ keys, onProgressUpdate, onJourneyComplete, autoStart, ...props }) => {
  const { camera, set } = useThree();
  const group = useRef();
  const { scene, nodes, materials, animations } = useGLTF("/car.glb");
  const { actions } = useAnimations(animations, scene);
  const animationTimeRef = useRef(0);
  const glbCameraRef = useRef();
  const hasTriggeredEnd = useRef(false);
  const autoMoving = useRef(false);
  
  // Camera wiggle movement
  const cameraWiggleOffset = useRef(new Vector3());
  const wiggleTime = useRef(0);

  // Debug: Log available animations and scene contents
  useEffect(() => {
    console.log("Available animations:", animations.map(anim => ({ name: anim.name, duration: anim.duration })));
    console.log("Available actions:", Object.keys(actions));
    console.log("Scene contents:", scene);
    console.log("Nodes:", nodes);
    
    // Find and set the GLB camera as active with default starting position
    scene.traverse((child) => {
      if (child.isCamera) {
        console.log("Found camera in GLB:", child.name, child);
        if (child.name === "Camera001") {
          glbCameraRef.current = child;
          set({ camera: child }); // Set the GLB camera as the active camera
          
          // Keep natural GLB state but fix the stretching from weird scale
          child.scale.set(1, 1, 1); // Normalize scale to remove stretching
          child.updateMatrixWorld(true);
          console.log("Set Camera001 as active camera with normalized scale");
        }
      }
    });
  }, [animations, actions, scene, nodes]);

  useEffect(() => {
    const carAction = actions["Action"]; // Car movement animation
    const cameraAction = actions["Action.001"]; // Camera animation
    
    if (carAction) {
      carAction.play();
      carAction.paused = true; // Keep paused so we can manually control
      carAction.timeScale = 0; // Prevent auto-playing
      console.log("Car animation 'Action' loaded successfully");
    }
    
    if (cameraAction) {
      cameraAction.play();
      cameraAction.paused = true; // Keep paused so we can manually control  
      cameraAction.timeScale = 0; // Prevent auto-playing
      console.log("Camera animation 'Action.001' loaded successfully");
    }
    
    if (!carAction || !cameraAction) {
      console.log("Available actions:", Object.keys(actions));
    }
  }, [actions]);

  useFrame((_, delta) => {
    if (!keys.forward && !keys.backward && !autoMoving.current) return;
    
    let targetTime = animationTimeRef.current;
    const animationSpeed = 2;
    const maxDistance = 145;
    
    // Check if car is at maximum position and trying to go forward
    const currentCarX = group.current ? group.current.position.x : 0;
    
    if (keys.forward && currentCarX >= maxDistance) {
      return; // Stop processing if at max distance and trying to go forward
    }
    
    if (keys.forward || autoMoving.current) {
      targetTime += animationSpeed * delta;
    } else if (keys.backward) {
      targetTime -= animationSpeed * delta;
    }
    
    targetTime = Math.max(0, Math.min(33.33, targetTime));
    animationTimeRef.current = targetTime;
    
    // Manual car movement with distance limit and smooth camera following
    const carGroup = group.current;
    if (carGroup) {
      const progress = targetTime / 33.33; // 0 to 1
      carGroup.position.set(0, 0, 0);
      const maxDistance = 145; // Stop exactly at 145
      carGroup.position.x = Math.min(progress * 200, maxDistance); // Cap at 145
      console.log("Car position:", carGroup.position.x, "Progress:", progress);
      
      // Update progress callback
      if (onProgressUpdate) {
        onProgressUpdate(carGroup.position.x);
      }
      
      // Trigger end-of-journey animation at position 145
      if (carGroup.position.x >= 145 && !hasTriggeredEnd.current && onJourneyComplete) {
        hasTriggeredEnd.current = true;
        console.log("Journey complete! Triggering end animation...");
        onJourneyComplete();
      }

    }
    
    // Move camera manually to maintain Camera.001 relationship with car + wiggle movement
    const activeCamera = glbCameraRef.current;
    if (activeCamera && carGroup) {
      // Increment wiggle time for smooth motion
      wiggleTime.current += delta;
      
      // Calculate base camera position (same as before)
      const carX = carGroup.position.x;
      activeCamera.position.x = carX - 10.34;
      activeCamera.position.y = 0.556;
      activeCamera.position.z = -0.0015;
      
      // Add subtle wiggle movement when moving
      const isMoving = keys.forward || keys.backward;
      if (isMoving) {
        // Create subtle wiggle movements
        const wiggleStrength = 0.02; // Very small movements
        const wiggleSpeed = 3; // Speed of the wiggle
        
        // Side-to-side wiggle (like following a car on the road)
        const sideWiggle = Math.sin(wiggleTime.current * wiggleSpeed) * wiggleStrength;
        
        // Slight up-down movement (like suspension)
        const verticalWiggle = Math.sin(wiggleTime.current * wiggleSpeed * 1.3) * wiggleStrength * 0.5;
        
        // Very subtle forward-back movement
        const depthWiggle = Math.sin(wiggleTime.current * wiggleSpeed * 0.8) * wiggleStrength * 0.3;
        
        // Apply wiggle to camera position
        activeCamera.position.x += depthWiggle;
        activeCamera.position.y += verticalWiggle;
        activeCamera.position.z += sideWiggle;
      }
      
      // Keep original Camera.001 rotation
      activeCamera.rotation.set(1.5708, -1.4257, 1.5708);
      
      // Force camera matrix update
      activeCamera.updateMatrixWorld(true);
      
      console.log("Camera following at:", activeCamera.position.x);
    }
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

  // Auto-start car movement when journey begins
  useEffect(() => {
    if (autoStart && !autoMoving.current) {
      autoMoving.current = true;
      // Auto move for 2 seconds to show the journey has begun
      const autoMoveInterval = setInterval(() => {
        animationTimeRef.current += 0.1;
        if (animationTimeRef.current >= 3) { // Move a bit forward
          clearInterval(autoMoveInterval);
          autoMoving.current = false;
        }
      }, 50);
      
      return () => clearInterval(autoMoveInterval);
    }
  }, [autoStart]);

  // Ensure car starts at position 0
  useEffect(() => {
    if (group.current) {
      group.current.position.set(0, 0, 0);
      console.log("Car initialized at:", group.current.position);
    }
  }, []);

  return (
    <group object={scene} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Car"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
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
      </group>
    </group>
  );
};

export default Car;