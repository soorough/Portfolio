import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CompletionAnimation = ({ onComplete }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const particlesRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait 3 seconds then trigger redirect
        setTimeout(onComplete, 3000);
      }
    });

    // Initial explosion effect
    tl.from(containerRef.current, {
      duration: 0.5,
      scale: 0,
      rotation: 360,
      ease: "back.out(1.7)"
    })
    .to(particlesRef.current, {
      duration: 2,
      rotation: 720,
      scale: 1.5,
      opacity: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .from(textRef.current, {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "elastic.out(1, 0.5)"
    }, "-=1.5")
    .to(textRef.current, {
      duration: 0.5,
      scale: 1.1,
      yoyo: true,
      repeat: 5,
      ease: "power2.inOut"
    }, "-=0.5");
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, #ff006e44 0%, transparent 70%),
          radial-gradient(circle at 30% 70%, #3a86ff44 0%, transparent 70%),
          radial-gradient(circle at 70% 30%, #06ffa544 0%, transparent 70%),
          #000000
        `
      }}
    >
      {/* Particle explosion effect */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(2px 2px at 20% 30%, #fff, transparent),
            radial-gradient(2px 2px at 40% 70%, #06ffa5, transparent),
            radial-gradient(1px 1px at 90% 40%, #ff006e, transparent),
            radial-gradient(1px 1px at 60% 10%, #3a86ff, transparent),
            radial-gradient(2px 2px at 10% 90%, #fff, transparent),
            radial-gradient(1px 1px at 80% 80%, #06ffa5, transparent)
          `,
          backgroundSize: '300px 300px, 200px 200px, 100px 100px, 150px 150px, 250px 250px, 180px 180px'
        }}
      />

      <div className="text-center z-10">
        <div 
          ref={textRef}
          className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-green-400"
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 30px rgba(6, 255, 165, 0.8)'
          }}
        >
          JOURNEY.COMPLETE()
        </div>
        
        <div className="text-2xl md:text-3xl text-cyan-400 font-mono mb-4">
          System.exit(0);
        </div>
        
        <div className="text-lg text-green-400 font-mono">
          Redirecting to portfolio dashboard...
        </div>

        {/* Loading bar effect */}
        <div className="mt-8 w-80 h-2 bg-gray-800 border border-cyan-400 mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 via-cyan-400 to-green-400 animate-pulse"
            style={{
              width: '0%',
              animation: 'loading-bar 3s ease-out forwards'
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes loading-bar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default CompletionAnimation;