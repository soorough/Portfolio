import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Sun from "../models/Sun";
import WireFrame from "../models/WireFrame";
import Car from "../models/Car";
import Road from "../models/Road";
import HologramSection from "../components/HologramSection";
import SubtitleSystem from "../components/SubtitleSystem";
import CompletionAnimation from "../components/CompletionAnimation";
import RedirectPage from "../components/RedirectPage";

export default function OriginalPortfolio({ playerName }) {
  const [keys, setKeys] = useState({ forward: false, backward: false });
  const [carProgress, setCarProgress] = useState(0);
  const [isJourneyComplete, setIsJourneyComplete] = useState(false);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [showRedirectPage, setShowRedirectPage] = useState(false);
  const [shouldAutoStart] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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

  // Hide loading screen after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle journey completion
  useEffect(() => {
    if (isJourneyComplete) {
      setShowCompletionAnimation(true);
    }
  }, [isJourneyComplete]);

  useEffect(() => {
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
  }, []);

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

  // Show loading screen with matrix rain effect
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black overflow-hidden">
        {/* Matrix Rain Background */}
        <div className="absolute inset-0">
          <div className="matrix-rain">
            {Array.from({ length: 200 }, (_, i) => (
              <div
                key={i}
                className="matrix-column"
                style={{
                  left: `${(i * 0.5)}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              >
                {Array.from({ length: 30 }, (_, j) => (
                  <span
                    key={j}
                    className="matrix-char"
                    style={{
                      animationDelay: `${j * 0.05}s`,
                      opacity: Math.random() * 0.8 + 0.2
                    }}
                  >
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Loading Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center space-y-8">

            {/* Loading Text */}
            <div className="space-y-4">
              <h1 className="text-green-400 font-mono text-2xl tracking-wider animate-pulse">
                INITIALIZING SYSTEM...
              </h1>
              <div className="text-green-400 font-mono text-sm">
                <div className="loading-dots">
                  LOADING PORTFOLIO<span>...</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-96 h-6 bg-gray-900 border-2 border-green-400 mx-auto relative">
                <div className="h-full bg-green-400 progress-bar"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-black font-mono text-sm font-bold">LOADING...</span>
                </div>
              </div>
            </div>

            {/* Binary Code Stream */}
            <div className="text-green-400 font-mono text-xs opacity-60 max-w-lg">
              <div className="binary-stream">
                01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .matrix-rain {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .matrix-column {
            position: absolute;
            top: -100%;
            display: flex;
            flex-direction: column;
            animation: matrix-fall linear infinite;
          }

          .matrix-char {
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.2;
            text-shadow: 0 0 5px #00ff00;
            animation: matrix-flicker 0.5s infinite;
          }

          @keyframes matrix-fall {
            to {
              transform: translateY(100vh);
            }
          }

          @keyframes matrix-flicker {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.3; }
          }


          .loading-dots span {
            animation: loading-blink 1.5s infinite;
          }

          @keyframes loading-blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          .progress-bar {
            animation: progress-fill 3s ease-in-out infinite;
          }

          @keyframes progress-fill {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }

          .binary-stream {
            animation: binary-scroll 2s linear infinite;
          }

          @keyframes binary-scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
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
      {/* Main 3D Scene */}
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
        <Suspense fallback={null}>
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
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} />
        </EffectComposer>
      </Canvas>

      {/* Hologram Resume Sections - VR Style Overlays */}
      {carProgress > 0 && resumeSections.map((section, index) => {
        const triggerPoint = 10 + (index * 15); // Spread them out more: 10, 25, 40
        const isActive = carProgress >= triggerPoint; // Simple: show when car reaches point, hide when it goes back
        
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
      <SubtitleSystem 
        carProgress={carProgress}
        isJourneyActive={true}
      />
    </div>
  );
}