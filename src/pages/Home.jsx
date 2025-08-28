import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { getProject } from "@theatre/core";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { Suspense, useEffect, useState } from "react";
import studio from "@theatre/studio";
import r3fExtension from "@theatre/r3f/dist/extension";

import Loader from "../components/Loader";
import { PerspectiveCamera } from "@theatre/r3f";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Sun from "../models/Sun";
import WireFrame from "../models/WireFrame";
import Car from "../models/Car";
import Road from "../models/Road";
import StartScreen from "../components/StartScreen";
import HologramSection from "../components/HologramSection";
import SubtitleSystem from "../components/SubtitleSystem";
import CompletionAnimation from "../components/CompletionAnimation";
import RedirectPage from "../components/RedirectPage";

export default function Home() {
  const sheet = getProject("myPortfolio").sheet("Scene");
  const [keys, setKeys] = useState({ forward: false, backward: false });
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [carProgress, setCarProgress] = useState(0);
  const [isJourneyComplete, setIsJourneyComplete] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [showRedirectPage, setShowRedirectPage] = useState(false);
  const [shouldAutoStart, setShouldAutoStart] = useState(false);

  const resumeSections = [
    {
      title: "SKILLS.EXE",
      content: [
        "JavaScript / TypeScript / React",
        "Node.js / Python / MongoDB",
        "Three.js / React-Three-Fiber",
        "GSAP / CSS Animations",
        "Git / Docker / AWS"
      ],
      position: { x: "5%", y: "5%" }
    },
    {
      title: "PROJECTS.SYS",
      content: [
        "3D Portfolio Experience",
        "E-commerce Platform",
        "Real-time Chat Application",
        "Data Visualization Dashboard"
      ],
      position: { x: "65%", y: "5%" }
    },
    {
      title: "EXPERIENCE.LOG",
      content: [
        "Full Stack Developer (2+ years)",
        "Frontend Specialist",
        "3D Web Developer",
        "UI/UX Designer"
      ],
      position: { x: "35%", y: "5%" }
    }
  ];

  // Initialize Theatre.js studio when journey starts
  useEffect(() => {
    if (isJourneyStarted) {
      studio.extend(r3fExtension);
      studio.initialize();
      // Trigger auto-start after a brief delay
      setTimeout(() => setShouldAutoStart(true), 500);
    }
  }, [isJourneyStarted]);

  // Handle journey completion
  useEffect(() => {
    if (isJourneyComplete) {
      setShowCompletionAnimation(true);
    }
  }, [isJourneyComplete]);

  useEffect(() => {
    if (!isJourneyStarted) return;
    
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setKeys(prev => ({ ...prev, forward: true }));
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setKeys(prev => ({ ...prev, backward: true }));
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setKeys(prev => ({ ...prev, forward: false }));
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setKeys(prev => ({ ...prev, backward: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJourneyStarted]);

  // Show redirect page if already completed
  if (showRedirectPage) {
    return <RedirectPage />;
  }

  // Show completion animation
  if (showCompletionAnimation) {
    return (
      <CompletionAnimation 
        onComplete={() => setShowRedirectPage(true)}
      />
    );
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      zIndex: 0
    }}>
      {/* Start Screen */}
      {!isJourneyStarted && (
        <StartScreen onStart={() => setIsJourneyStarted(true)} />
      )}

      {/* Main 3D Scene */}
      {isJourneyStarted && (
        <Canvas 
          gl={{ preserveDrawingBuffer: true}}
          style={{ 
            width: '100%', 
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        >
          <SheetProvider sheet={sheet}>
            <Suspense fallback={<Loader />}>
              <Environment files="/img/mars.jpg" blur={1} background />
              <ambientLight intensity={0.2} />
              <directionalLight position={[-5, 5, -5]} intensity={1.5} />
              <Car 
                keys={keys} 
                onProgressUpdate={(progress) => setCarProgress(progress)}
                onJourneyComplete={() => setIsJourneyComplete(true)}
                autoStart={shouldAutoStart}
              />
              <WireFrame />
              <Sun />
              <Road />
            </Suspense>
          </SheetProvider>
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} />
          </EffectComposer>
        </Canvas>
      )}

      {/* Hologram Resume Sections - VR Style Overlays */}
      {isJourneyStarted && carProgress > 0 && resumeSections.map((section, index) => {
        const triggerPoint = 10 + (index * 15); // Spread them out more: 10, 25, 40
        const isActive = carProgress >= triggerPoint; // Simple: show when car reaches point, hide when it goes back
        
        console.log(`🎯 Hologram ${section.title}: carProgress=${carProgress}, triggerPoint=${triggerPoint}, isActive=${isActive}`);
        
        return (
          <HologramSection
            key={section.title}
            title={section.title}
            content={section.content}
            position={section.position}
            isActive={isActive}
            carProgress={carProgress}
            delay={index * 0.8}
          />
        );
      })}

      {/* Subtitle System */}
      {isJourneyStarted && (
        <SubtitleSystem 
          carProgress={carProgress}
          isJourneyActive={isJourneyStarted}
        />
      )}
    </div>
  );
}