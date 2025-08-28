import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RedirectPage = () => {
  const containerRef = useRef();
  const matrixRef = useRef();

  useEffect(() => {
    // Matrix rain effect
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(matrixRef.current, {
      duration: 2,
      y: "100vh",
      ease: "none"
    })
    .set(matrixRef.current, { y: "-100vh" });

    // Entrance animation
    gsap.from(containerRef.current.children, {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out",
      delay: 0.5
    });
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center"
      style={{
        background: `
          linear-gradient(45deg, #000000 25%, transparent 25%),
          linear-gradient(-45deg, #000000 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #001100 75%),
          linear-gradient(-45deg, transparent 75%, #001100 75%),
          #000000
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      }}
    >
      {/* Matrix rain background */}
      <div 
        ref={matrixRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 18px,
              rgba(6, 255, 165, 0.1) 20px,
              rgba(6, 255, 165, 0.1) 22px
            )
          `,
          fontSize: '14px',
          fontFamily: 'monospace',
          color: '#06ffa5'
        }}
      >
        <div>01001000 01100101 01101100 01101100 01101111</div>
      </div>

      <div ref={containerRef} className="z-10 max-w-4xl px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-green-400 font-mono">
          MISSION ACCOMPLISHED
        </h1>

        <div className="text-2xl md:text-3xl text-cyan-400 font-mono mb-8">
          Welcome to my digital universe
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 border border-cyan-400 bg-black bg-opacity-50">
            <h3 className="text-xl font-mono text-pink-500 mb-4">CONTACT.EXE</h3>
            <div className="text-green-400 font-mono text-sm space-y-2">
              <div>📧 your.email@domain.com</div>
              <div>💼 linkedin.com/in/yourprofile</div>
              <div>🐙 github.com/yourusername</div>
            </div>
          </div>

          <div className="p-6 border border-cyan-400 bg-black bg-opacity-50">
            <h3 className="text-xl font-mono text-pink-500 mb-4">PROJECTS.SYS</h3>
            <div className="text-green-400 font-mono text-sm space-y-2">
              <div>▶ 3D Portfolio Experience</div>
              <div>▶ Interactive Web Apps</div>
              <div>▶ Full-Stack Solutions</div>
            </div>
          </div>

          <div className="p-6 border border-cyan-400 bg-black bg-opacity-50">
            <h3 className="text-xl font-mono text-pink-500 mb-4">STATUS.LOG</h3>
            <div className="text-green-400 font-mono text-sm space-y-2">
              <div>🟢 Available for hire</div>
              <div>🟢 Open to collaboration</div>
              <div>🟢 Ready for new challenges</div>
            </div>
          </div>
        </div>

        <div className="text-lg text-cyan-400 font-mono">
          Thanks for taking this cyberpunk journey with me!
        </div>

        <button 
          className="mt-8 px-8 py-4 text-xl font-mono bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black transition-all duration-300"
          style={{
            textShadow: '0 0 10px rgba(255, 0, 110, 0.8)',
            boxShadow: '0 0 20px rgba(255, 0, 110, 0.4)'
          }}
          onClick={() => window.location.reload()}
        >
          [ RESTART EXPERIENCE ]
        </button>
      </div>
    </div>
  );
};

export default RedirectPage;