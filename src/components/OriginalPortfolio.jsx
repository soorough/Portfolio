import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";

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
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef(null);
  const carSoundRef = useRef(null);

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

  // Initialize and control background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7; // Set volume to 70%
      audioRef.current.loop = true;
      
      if (isMusicPlaying) {
        audioRef.current.play().catch(console.log);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Initialize car driving sound
  useEffect(() => {
    if (carSoundRef.current) {
      carSoundRef.current.volume = 0.4; // Set car sound volume to 40%
      carSoundRef.current.loop = true;
    }
  }, []);

  // Control car driving sound based on movement
  useEffect(() => {
    if (carSoundRef.current) {
      const isMoving = keys.forward || keys.backward;
      
      if (isMoving && isMusicPlaying) {
        carSoundRef.current.play().catch(console.log);
      } else {
        carSoundRef.current.pause();
        carSoundRef.current.currentTime = 0; // Reset to beginning when stopped
      }
    }
  }, [keys.forward, keys.backward, isMusicPlaying]);

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

          .hologram-billboard {
            animation: hologram-drop-in 1s ease-out;
            backdrop-filter: blur(1px);
          }

          .hologram-border {
            border: 2px solid #00ff00;
            box-shadow: 
              0 0 20px #00ff00,
              inset 0 0 20px rgba(0, 255, 0, 0.1);
            background: rgba(0, 0, 0, 0.8);
            position: relative;
          }

          .hologram-border::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 0, 0.03) 2px,
              rgba(0, 255, 0, 0.03) 4px
            );
            pointer-events: none;
          }

          .hologram-title {
            font-family: 'Press Start 2P', monospace;
            text-shadow: 0 0 10px currentColor;
            animation: hologram-flicker 2s infinite;
          }

          .hologram-item {
            font-family: 'VT323', monospace;
            text-shadow: 0 0 5px currentColor;
            animation: hologram-type-in 1s ease-out both;
            opacity: 0;
          }

          @keyframes hologram-drop-in {
            0% {
              opacity: 0;
              transform: translateY(-50px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes hologram-flicker {
            0%, 98% { opacity: 1; }
            99% { opacity: 0.8; }
            100% { opacity: 1; }
          }

          @keyframes hologram-type-in {
            0% {
              opacity: 0;
              transform: translateX(-20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .music-control-btn {
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
            backdrop-filter: blur(10px);
          }

          .music-control-btn:hover {
            box-shadow: 0 0 25px rgba(0, 255, 0, 0.6);
            transform: scale(1.1);
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

      {/* Hologram Resume Sections - Billboard Style */}
      {carProgress > 0 && resumeSections.map((section, index) => {
        const triggerStart = 20 + (index * 30); // Start points: 20, 50, 80
        const triggerEnd = triggerStart + 20; // End points: 40, 70, 100
        const isActive = carProgress >= triggerStart && carProgress < triggerEnd;
        
        if (!isActive) return null;
        
        return (
          <div
            key={section.title}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 z-30 w-auto max-w-4xl"
          >
            <div className="hologram-billboard">
              <div className="hologram-border p-6 text-center">
                <h2 className="hologram-title text-2xl md:text-4xl mb-4 text-green-400">
                  {section.title}
                </h2>
                <div className="hologram-content space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="hologram-item text-sm md:text-lg text-cyan-400"
                      style={{
                        animationDelay: `${itemIndex * 0.3}s`
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/songs/lofi-soorough.mp3"
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Car Driving Sound */}
      <audio
        ref={carSoundRef}
        src="/songs/car-driving-sound.mp3"
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Music Control Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleMusic}
          className="music-control-btn w-14 h-14 rounded-full border-2 border-green-400 bg-black bg-opacity-80 flex items-center justify-center hover:bg-opacity-100 transition-all duration-300"
        >
          {isMusicPlaying ? (
            // Sound ON icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-400">
              <path
                d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // Sound OFF icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-400">
              <path
                d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Subtitle System */}
      <SubtitleSystem 
        carProgress={carProgress}
        isJourneyActive={true}
      />
    </div>
  );
}