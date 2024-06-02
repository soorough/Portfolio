import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls } from "@react-three/drei";
import { getProject } from "@theatre/core";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { Suspense } from "react";

import Loader from "../components/Loader";
import { PerspectiveCamera } from "@theatre/r3f";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Sun from "../models/Sun";
import WireFrame from "../models/WireFrame";
import Car from "../models/Car";
import Road from "../models/Road";

export default function Home() {
  const sheet = getProject("myPortfolio").sheet("Scene");

  return (
    <Canvas gl={{ preserveDrawingBuffer: true}}>
      <SheetProvider sheet={sheet}>
        <Suspense fallback={<Loader />}>
          <Environment files="/img/mars.jpg" blur={1} background />
          <ambientLight intensity={0.2} />
          <directionalLight position={[-5, 5, -5]} intensity={1.5} />
          <ScrollControls pages={5}>
            <Car />
          </ScrollControls>
          <WireFrame />
          <Sun />
          <Road />
          <PerspectiveCamera
            theatreKey="Camera.001"
            makeDefault
            far={1000}
            near={0.1}
            fov={45.747}
            position={[-7.8, 0.47, -0.008]}
            rotation={[0, -1.57, 0]}
            scale={[9.45, 11, 8.5]}
          />
        </Suspense>
      </SheetProvider>
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} />
      </EffectComposer>
    </Canvas>
  );
}
