import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const SubtitleSystem = ({ carProgress, isJourneyActive }) => {
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const subtitleRef = useRef();

  // Define story progression based on car progress
  const storyPoints = [
    { progress: 0, text: "Welcome to my digital journey..." },
    { progress: 0.1, text: "Loading career.exe..." },
    { progress: 0.2, text: "Initiating skill protocols..." },
    { progress: 0.3, text: "My journey began with curiosity and code..." },
    { progress: 0.4, text: "Learning new technologies, one commit at a time..." },
    { progress: 0.5, text: "Building projects that solve real problems..." },
    { progress: 0.6, text: "Collaborating with amazing teams..." },
    { progress: 0.7, text: "Growing from challenges and failures..." },
    { progress: 0.8, text: "Mastering the art of clean code..." },
    { progress: 0.9, text: "Ready for the next adventure..." },
    { progress: 0.95, text: "Journey complete. Thank you for traveling with me." }
  ];

  useEffect(() => {
    if (!isJourneyActive) return;

    const currentProgress = carProgress / 145; // Convert to 0-1 range
    
    // Find the appropriate subtitle based on progress
    let newSubtitle = "";
    for (let i = storyPoints.length - 1; i >= 0; i--) {
      if (currentProgress >= storyPoints[i].progress) {
        newSubtitle = storyPoints[i].text;
        break;
      }
    }

    if (newSubtitle !== currentSubtitle) {
      if (isVisible && subtitleRef.current) {
        // Fade out current subtitle
        gsap.to(subtitleRef.current, {
          duration: 0.3,
          opacity: 0,
          y: 10,
          ease: "power2.in",
          onComplete: () => {
            setCurrentSubtitle(newSubtitle);
            // Fade in new subtitle
            if (subtitleRef.current) {
              gsap.fromTo(subtitleRef.current, 
                { opacity: 0, y: 20 },
                { 
                  duration: 0.5, 
                  opacity: 1, 
                  y: 0, 
                  ease: "power2.out" 
                }
              );
            }
          }
        });
      } else {
        setCurrentSubtitle(newSubtitle);
        setIsVisible(true);
        // Initial appear animation
        if (subtitleRef.current) {
          gsap.fromTo(subtitleRef.current,
            { opacity: 0, y: 30, scale: 0.8 },
            { 
              duration: 0.8, 
              opacity: 1, 
              y: 0, 
              scale: 1,
              ease: "back.out(1.7)" 
            }
          );
        }
      }
    }
  }, [carProgress, isJourneyActive, currentSubtitle, isVisible]);

  if (!isJourneyActive || !currentSubtitle) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '60px', 
      left: '50%', 
      transform: 'translateX(-50%)',
      pointerEvents: 'none', 
      zIndex: 10001,
      width: '80%',
      maxWidth: '800px'
    }}>
      <div
        ref={subtitleRef}
        style={{
          textAlign: 'center',
          fontSize: '18px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: '600',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9), 1px -1px 2px rgba(0,0,0,0.9), -1px 1px 2px rgba(0,0,0,0.9)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '8px 16px',
          borderRadius: '4px',
          lineHeight: '1.4'
        }}
      >
        {currentSubtitle}
      </div>
    </div>
  );
};

export default SubtitleSystem;