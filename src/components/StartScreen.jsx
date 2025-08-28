import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const StartScreen = ({ onStart }) => {
  const [showStart, setShowStart] = useState(true);
  const startScreenRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const startButtonRef = useRef();

  useEffect(() => {
    // Retro game style animations
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      duration: 2,
      scale: 0,
      rotation: 360,
      ease: "elastic.out(1, 0.3)"
    })
    .from(subtitleRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out"
    }, "-=1")
    .from(startButtonRef.current, {
      duration: 1,
      scale: 0,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .to(startButtonRef.current, {
      duration: 0.8,
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
  }, []);

  const handleStart = () => {
    gsap.to(startScreenRef.current, {
      duration: 0.8,
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        setShowStart(false);
        onStart();
      }
    });
  };

  if (!showStart) return null;

  return (
    <div 
      ref={startScreenRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center"
      style={{
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: `
          radial-gradient(circle at 20% 50%, #ff006e22 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, #3a86ff22 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, #06ffa522 0%, transparent 50%),
          #000000
        `
      }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 255, 165, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 255, 165, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="text-center z-10">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-green-400"
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 20px rgba(6, 255, 165, 0.8)'
          }}
        >
          PORTFOLIO.EXE
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-cyan-400 mb-8 font-mono"
        >
          A Cyberpunk Journey Through My Career
        </p>
        
        <button
          ref={startButtonRef}
          onClick={handleStart}
          className="px-8 py-4 text-2xl font-mono bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
          style={{
            textShadow: '0 0 10px rgba(6, 255, 165, 0.8)',
            boxShadow: '0 0 20px rgba(6, 255, 165, 0.4)'
          }}
        >
          [ START JOURNEY ]
        </button>
      </div>

    </div>
  );
};

export default StartScreen;