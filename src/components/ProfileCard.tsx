import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faQuoteLeft, faQuoteRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { ProfileConfig } from '../config/profileConfig';

interface ProfileCardProps {
  config: ProfileConfig;
  className?: string;
  maxQuoteLength?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  config,
  className,
  maxQuoteLength = 250,
}) => {
  const [currentNickname, setCurrentNickname] = useState(config.profile.nicknames[0]);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [hitokoto, setHitokoto] = useState({ text: '加载中...', source: 'hitokoto.cn' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const refreshButtonRef = useRef<HTMLButtonElement>(null);

  // Location rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % config.profile.locations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.profile.locations.length]);

  // Typewriter effect for nickname
  useEffect(() => {
    // Set up state
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let text = '';
    let typingTimer: NodeJS.Timeout;
    
    // Timing values (in milliseconds)
    const typingSpeed = 100; // Base typing speed
    const deletingSpeed = 50; // Base deleting speed
    const pauseBeforeDelete = 2000; // Pause before starting to delete
    const pauseBeforeNextWord = 500; // Pause before typing the next word
    
    const type = () => {
      // Current nickname
      const currentNickname = config.profile.nicknames[currentIndex];
      
      // Calculate random speed variation to make typing look more natural
      const randomSpeed = Math.floor(Math.random() * 50);
      
      if (!isDeleting) {
        // Typing forward
        text = currentNickname.substring(0, charIndex + 1);
        setTypedText(text);
        charIndex++;
        
        // If we've typed the full word
        if (charIndex === currentNickname.length) {
          isDeleting = true;
          typingTimer = setTimeout(type, pauseBeforeDelete);
          return;
        }
        
        typingTimer = setTimeout(type, typingSpeed + randomSpeed);
      } else {
        // Deleting
        text = currentNickname.substring(0, charIndex - 1);
        setTypedText(text);
        charIndex--;
        
        // If we've deleted the whole word
        if (charIndex === 0) {
          isDeleting = false;
          // Move to next nickname
          currentIndex = (currentIndex + 1) % config.profile.nicknames.length;
          setCurrentNickname(config.profile.nicknames[currentIndex]);
          typingTimer = setTimeout(type, pauseBeforeNextWord);
          return;
        }
        
        typingTimer = setTimeout(type, deletingSpeed);
      }
    };
    
    // Start the effect
    setIsTyping(true);
    typingTimer = setTimeout(type, 500);
    
    // Cleanup
    return () => {
      clearTimeout(typingTimer);
    };
  }, [config.profile.nicknames]);

  // Fetch Hitokoto quote
  useEffect(() => {
    if (config.hitokoto.enable) {
      const fetchHitokoto = async () => {
        if (isRefreshing) return;
        
        setIsRefreshing(true);
        try {
          const params = new URLSearchParams({
            c: config.hitokoto.params.c,
            min_length: config.hitokoto.params.min_length.toString(),
            max_length: config.hitokoto.params.max_length.toString()
          }).toString();
          
          const response = await fetch(`https://v1.hitokoto.cn/?${params}`);
          const data = await response.json();
          
          // Only truncate extremely long quotes
          const truncatedText = data.hitokoto.length > maxQuoteLength 
            ? data.hitokoto.substring(0, maxQuoteLength) + '...' 
            : data.hitokoto;
          
          setHitokoto({
            text: truncatedText,
            source: data.from || 'hitokoto.cn'
          });
        } catch (error) {
          console.error('Error fetching hitokoto:', error);
        } finally {
          setIsRefreshing(false);
        }
      };

      // Initial fetch of hitokoto
      fetchHitokoto();
      
      // Store the fetchHitokoto function in window for the refresh button
      // But wrapped in a function that prevents rapid clicking
      (window as any).fetchHitokotoRef = () => {
        if (!isRefreshing) {
          fetchHitokoto();
        }
      };
      
      // Clean up on unmount
      return () => {
        (window as any).fetchHitokotoRef = null;
      };
    }
  }, [config.hitokoto.enable, config.hitokoto.params, maxQuoteLength]);  // Remove isRefreshing from deps

  // Touch event handlers for better mobile experience
  const handleTouchStart = () => {
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = () => {
    // Only trigger if touch duration is less than 300ms (to differentiate from scrolling)
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < 300 && !isRefreshing) {
      (window as any).fetchHitokotoRef();
      
      // Add visual feedback for touch
      if (refreshButtonRef.current) {
        refreshButtonRef.current.classList.add('touch-active');
        setTimeout(() => {
          if (refreshButtonRef.current) {
            refreshButtonRef.current.classList.remove('touch-active');
          }
        }, 200);
      }
    }
  };

  return (
    <div className={`profile-card ${className || ''}`}>
      <div className="profile-header">
        <div className="header-content">
          <div className="left-header">
            <div className="username-wrapper">
              <h1 id="profile-username" className="username">{config.profile.username}</h1>
            </div>
            <div className="nickname-container">
              <div id="typewriter" className="nickname">{typedText}</div>
              <span className="cursor">{isTyping ? '|' : ''}</span>
            </div>
          </div>
          <div className="profile-stats">
            <div className="location">
              <FontAwesomeIcon icon={faLocationDot} />
              <div id="location-wrapper" className="location-wrapper">
                {config.profile.locations.map((location, index) => (
                  <div 
                    key={index} 
                    className={`location-text ${index === currentLocationIndex ? 'active' : 'inactive'}`}
                  >
                    {location}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-info">
        {/* Hitokoto Quote Section */}
        {config.hitokoto.enable && (
          <div id="hitokoto-container" className="hitokoto-container">
            <div className="hitokoto-quote">
              <div className="quote-wrapper">
                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                <span id="hitokoto-text" className="hitokoto-text">{hitokoto.text}</span>
                <FontAwesomeIcon icon={faQuoteRight} className="quote-icon" />
              </div>
            </div>
            <div className="hitokoto-source">— <span id="hitokoto-source">{hitokoto.source}</span></div>
            <button 
              id="refresh-hitokoto" 
              ref={refreshButtonRef}
              className={`refresh-hitokoto ${isRefreshing ? 'refreshing' : ''}`}
              title="刷新一言"
              onClick={() => (window as any).fetchHitokotoRef()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label="Refresh quote"
            >
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
          </div>
        )}
        
        <div id="social-links" className="social-links">
          {config.socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title={link.name}
              aria-label={link.name}
            >
              <FontAwesomeIcon icon={['fas', link.icon.split(' ')[1] as any]} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 