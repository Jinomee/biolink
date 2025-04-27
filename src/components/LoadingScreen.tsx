import React, { useState } from 'react';
import { ProfileConfig } from '../config/profileConfig';

interface LoadingScreenProps {
  onEnter: () => void;
  config?: ProfileConfig;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onEnter, config }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    // This click is considered a user interaction for browser autoplay policies
    if (isExiting) return; // Prevent multiple clicks during exit animation
    
    setIsExiting(true);
    
    // Set a global flag to indicate user interaction has occurred
    window.userHasInteracted = true;
    
    // Unlock audio API
    try {
      // Try to play a silent audio to unlock audio API (helps with iOS)
      const kickAudio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAABAAADQgD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAA5TEFNRTMuMTAwBK8AAAAAAAAAABUgJAMGQQABmgAAA0IAAF3EAAAAAAA=");
      kickAudio.volume = 0.01;
      kickAudio.play().catch(e => {
        console.log("Silent audio unlock failed:", e);
      });
      
      // Dispatch a custom event that the MusicPlayer can listen for
      document.dispatchEvent(new CustomEvent('userInteractionOccurred'));
    } catch (e) {
      console.log("Audio creation error:", e);
    }
    
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div 
      className={`loading-screen ${isExiting ? 'exit' : ''}`} 
      onClick={handleClick}
    >
      <div className="loading-content">
        <div className="loading-animation">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="click-text">[ click to enter ]</div>
      </div>
    </div>
  );
};

// Add a global property to window for tracking user interaction
declare global {
  interface Window {
    userHasInteracted?: boolean;
  }
}

export default LoadingScreen; 