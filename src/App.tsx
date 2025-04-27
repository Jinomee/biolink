import React, { useState, useEffect, useRef } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './styles/main.css';
import profileConfig from './config/profileConfig';

// Component imports
import LoadingScreen from './components/LoadingScreen';
import WelcomePopup from './components/WelcomePopup';
import ProfileCard from './components/ProfileCard';
import MusicPlayer from './components/MusicPlayer';
import ParticlesBackground from './components/ParticlesBackground';
import Timestamp from './components/Timestamp';
import Skills from './components/Skills';

// Add FontAwesome libraries
library.add(fas, fab);

// Define the global type for TypeScript
declare global {
  interface Window {
    userHasInteracted?: boolean;
  }
}

const App: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  
  // Cursor refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const trailTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Custom cursor effect
  useEffect(() => {
    if (!profileConfig.advanced.customCursor || !showMainContent) return;
    
    const cursor = cursorRef.current;
    const cursorTrail = cursorTrailRef.current;
    if (!cursor || !cursorTrail) return;
    
    // Initial positioning for cursor
    cursor.style.transform = `translate(-50%, -50%)`;
    cursorTrail.style.transform = `translate(-50%, -50%)`;
    
    // Make cursor visible now that loading screen is gone
    cursor.style.opacity = '1';
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update main cursor position - applying direct positioning instead of transform
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      
      // Create trail effect with direct positioning
      createTrail(clientX, clientY);
    };
    
    // Mouse down/up handlers
    const handleMouseDown = () => {
      cursor.classList.add('active');
    };
    
    const handleMouseUp = () => {
      cursor.classList.remove('active');
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Clickable elements hover effect
    const handleElementHover = () => {
      cursor.classList.add('active');
    };
    
    const handleElementLeave = () => {
      cursor.classList.remove('active');
    };
    
    // Apply hover effects to clickable elements
    const clickableElements = document.querySelectorAll('a, button, input[type="submit"], input[type="button"], .social-icon, .control-btn, .refresh-hitokoto');
    clickableElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementHover);
      element.addEventListener('mouseleave', handleElementLeave);
    });
    
    // Create a new trail effect
    const createTrail = (x: number, y: number) => {
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }
      
      // Reset the trail with direct positioning
      cursorTrail.style.opacity = '0.7';
      cursorTrail.style.left = `${x}px`;
      cursorTrail.style.top = `${y}px`;
      
      // Fade out trail
      trailTimeoutRef.current = setTimeout(() => {
        if (cursorTrail) {
          cursorTrail.style.opacity = '0';
        }
      }, 100);
    };
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      clickableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementHover);
        element.removeEventListener('mouseleave', handleElementLeave);
      });
      
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }
    };
  }, [showMainContent, profileConfig.advanced.customCursor]);
  
  // Initially set up a listener for user interactions
  useEffect(() => {
    const interactionEvents = ['mousedown', 'touchstart', 'keydown'];
    
    const handleUserInteraction = () => {
      window.userHasInteracted = true;
      
      // Create a custom event that components can listen for
      document.dispatchEvent(new CustomEvent('userInteractionOccurred'));
      
      // Remove all listeners once interaction is detected
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
    
    // Add listeners for common user interactions
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });
    
    return () => {
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);
  
  // Disable right-click if configured
  useEffect(() => {
    if (profileConfig.advanced.disableRightClick) {
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
      };
      
      document.addEventListener('contextmenu', handleContextMenu);
      
      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    }
  }, []);
  
  // Handle loading screen exit
  const handleLoadingScreenExit = () => {
    window.userHasInteracted = true;
    setShouldAutoplay(true); // Enable autoplay after user interaction
    
    // Small timeout to ensure the UI updates first
    setTimeout(() => {
      setShowLoading(false);
      setShowMainContent(true);
      
      // Dispatch a custom event that components can listen for
      document.dispatchEvent(new CustomEvent('userInteractionOccurred'));
    }, 100);
  };
  
  return (
    <>
      {/* Custom cursor elements - Only render when needed but keep them in the DOM */}
      {profileConfig.advanced.customCursor && (
        <>
          <div ref={cursorRef} className="custom-cursor" style={{ opacity: showMainContent ? 1 : 0 }}></div>
          <div ref={cursorTrailRef} className="custom-cursor-trail"></div>
        </>
      )}
      
      {/* Particles background */}
      <ParticlesBackground config={profileConfig} />
      
      {/* Loading screen */}
      {showLoading && <LoadingScreen onEnter={handleLoadingScreenExit} config={profileConfig} />}
      
      {/* Welcome popup */}
      {profileConfig.welcomeMessage.enable && showMainContent && (
        <WelcomePopup config={profileConfig} />
      )}
      
      {/* Timestamp - only show when main content is visible */}
      {showMainContent && <Timestamp />}
      
      {/* Main content */}
      {showMainContent && (
        <div className="container">
          <ProfileCard config={profileConfig} />
          {profileConfig.skills.enable && <Skills config={profileConfig} />}
          <MusicPlayer 
            config={profileConfig} 
            autoplayOnMount={shouldAutoplay} 
          />
        </div>
      )}
    </>
  );
};

export default App;
