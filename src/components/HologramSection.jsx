import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const HologramSection = ({ 
  title, 
  content, 
  position, 
  isActive, 
  carProgress, 
  delay = 0 
}) => {
  const sectionRef = useRef();
  const hologramRef = useRef();
  const glitchRef = useRef();

  useEffect(() => {
    if (isActive && sectionRef.current && hologramRef.current && glitchRef.current) {
      // Hologram appear animation
      const tl = gsap.timeline({ delay });
      
      tl.from(sectionRef.current, {
        duration: 0.5,
        scale: 0,
        rotationY: 180,
        ease: "back.out(1.7)"
      })
      .from(hologramRef.current, {
        duration: 1,
        opacity: 0,
        y: 100,
        ease: "power2.out"
      }, "-=0.3")
      .to(hologramRef.current, {
        duration: 0.1,
        scaleX: 1.1,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut"
      }, "-=0.5");

      // Continuous hologram effects
      gsap.to(hologramRef.current, {
        duration: 2,
        rotationY: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      // Glitch effect
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      glitchTl.to(glitchRef.current, {
        duration: 0.1,
        x: 2,
        skewX: 10,
        ease: "power2.inOut"
      })
      .to(glitchRef.current, {
        duration: 0.1,
        x: -2,
        skewX: -10,
        ease: "power2.inOut"
      })
      .to(glitchRef.current, {
        duration: 0.1,
        x: 0,
        skewX: 0,
        ease: "power2.inOut"
      });
    }
  }, [isActive, delay]);

  // Debug logs
  console.log(`📱 HologramSection ${title}: isActive=${isActive}, rendering=${isActive ? 'YES' : 'NO'}`);
  
  // Show hologram when active
  if (!isActive) return null;

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 10000,
        pointerEvents: 'none',
        border: '2px solid red', // DEBUG: Red border to see if element exists
        backgroundColor: 'rgba(255, 0, 0, 0.8)', // DEBUG: More opaque red background
        minWidth: '200px',
        minHeight: '100px',
      }}
    >
      <div style={{ color: 'white', padding: '10px', fontSize: '16px', fontWeight: 'bold' }}>
        DEBUG: {title} IS RENDERING
      </div>
      <div
        ref={hologramRef}
        className="relative p-6 min-w-80 max-w-md"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(6, 255, 165, 0.1) 0%, 
              rgba(58, 134, 255, 0.1) 50%, 
              rgba(255, 0, 110, 0.1) 100%
            )
          `,
          border: '2px solid rgba(6, 255, 165, 0.8)',
          boxShadow: `
            0 0 20px rgba(6, 255, 165, 0.6),
            inset 0 0 20px rgba(6, 255, 165, 0.1)
          `,
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
        }}
      >
        {/* Scan lines effect */}
        <div 
          className="absolute inset-0 pointer-events-none animate-pulse"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(6, 255, 165, 0.03) 2px,
              rgba(6, 255, 165, 0.03) 4px
            )`,
            borderRadius: '8px',
          }}
        />

        <div ref={glitchRef}>
          <h3 className="text-2xl font-mono text-cyan-400 mb-4 font-bold">
            {title}
          </h3>
          
          <div className="text-green-300 font-mono text-sm leading-relaxed">
            {Array.isArray(content) ? (
              <ul className="space-y-2">
                {content.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-pink-500 mr-2">▶</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
      </div>

    </div>
  );
};

export default HologramSection;