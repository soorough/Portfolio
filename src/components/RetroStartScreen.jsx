import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Simple UI components to replace shadcn/ui
const Button = ({ onClick, disabled, className, children, ...props }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 font-mono text-white transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }) => (
  <input
    className={`px-3 py-2 bg-transparent border text-white font-mono ${className}`}
    {...props}
  />
);

function StarField() {
  const starsRef = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y = mouse.x * 0.1;
      starsRef.current.rotation.x = mouse.y * 0.1;
    }
  });

  const stars = Array.from({ length: 100 }, (_, i) => (
    <Sphere
      key={i}
      position={[(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50]}
      args={[0.05]}
    >
      <meshBasicMaterial color="#FFFFFF" />
    </Sphere>
  ));

  return <group ref={starsRef}>{stars}</group>;
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <StarField />
    </>
  );
}

export default function RetroStartScreen({ onComplete }) {
  const [playerName, setPlayerName] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (playerName.trim().length >= 2) {
      setIsStarting(true);
      onComplete(playerName);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black crt-screen">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 scanlines opacity-30"></div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 space-y-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="pixel-3d-text text-4xl md:text-6xl leading-none mb-4">
              <div className="text-green-400 mb-2">SOURAVH</div>
              <div className="text-cyan-400">PORTFOLIO</div>
            </h1>

            <div className="star-wars-text text-lg md:text-xl mb-8 tracking-wider">
              ★ A LONG TIME AGO IN A PORTFOLIO FAR, FAR AWAY... ★
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg space-y-6 bg-black border-4 border-green-400 p-8 pixel-border crt-screen">
          <div className="space-y-6">
            <div className="text-green-400 text-center">
              <div className="pixel-3d-text text-sm mb-4">ENTER PILOT NAME</div>
              <div className="scanlines h-1 w-full mb-4"></div>
            </div>

            <div className="space-y-2">
              <div className="text-green-400 font-mono text-sm">CALLSIGN:</div>
              <div className="flex items-center bg-black p-2 border-2 border-green-400">
                <span className="text-green-400 font-mono mr-2 animate-pulse">{'>'}</span>
                <Input
                  type="text"
                  placeholder="REBEL_PILOT"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                  className="retro-input flex-1 bg-black border-0 p-2 text-lg"
                  onKeyDown={(e) => e.key === "Enter" && handleStart()}
                  maxLength={12}
                />
                <span className="text-green-400 font-mono ml-2 animate-pulse">_</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="retro-button text-center">
              <Button
                onClick={handleStart}
                disabled={playerName.trim().length < 2 || isStarting}
                className="retro-button w-full py-4 px-6 text-green-400 text-sm"
              >
                {isStarting ? "LOADING MISSION..." : "LAUNCH PORTFOLIO"}
              </Button>
            </div>

            {playerName.trim().length > 0 && playerName.trim().length < 2 && (
              <div className="text-red-500 text-center text-xs">
                <div className="animate-pulse">ERROR: CALLSIGN TOO SHORT</div>
              </div>
            )}
          </div>

          <div className="text-center text-green-400 text-xs opacity-70">
            <div>REBEL ALLIANCE DATABANK</div>
            <div>SECURITY LEVEL: CLASSIFIED</div>
          </div>
        </div>
      </div>
    </div>
  );
}