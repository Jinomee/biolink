import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faRandom } from '@fortawesome/free-solid-svg-icons';
import { ProfileConfig } from '../config/profileConfig';
import useDeviceDetect from '../hooks/useDeviceDetect';

interface MusicPlayerProps {
  config: ProfileConfig;
  autoplayOnMount?: boolean;
  initialAudio?: HTMLAudioElement | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ config, autoplayOnMount = false, initialAudio = null }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState('0:00');
  const [timeTotal, setTimeTotal] = useState('0:00');
  const [playAttempted, setPlayAttempted] = useState(false);
  const { isMobile } = useDeviceDetect();
  
  // Add a ref to track if we're currently handling a manual pause/play action
  const isManualAction = useRef(false);
  
  // Always create our own audio element to ensure we have full control
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element and set up track
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * config.musicPlayer.tracks.length);
    setCurrentTrackIndex(randomIndex);
    
    // Create our audio element
    const audio = new Audio();
    audio.volume = config.musicPlayer.initialVolume;
    audio.src = config.musicPlayer.tracks[randomIndex].src;
    audio.preload = 'auto';
    audioRef.current = audio;
    
    // Try to preload the audio data
    audio.load();
    
    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [config.musicPlayer.tracks.length, config.musicPlayer.initialVolume]);
  
  // Setup audio event handlers
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      // Update UI when audio metadata is loaded
      const onLoadedMetadata = () => {
        if (audio) {
          setTimeTotal(formatTime(audio.duration));
        }
      };
      
      // Update progress and time while playing
      const onTimeUpdate = () => {
        if (audio) {
          const currentTime = audio.currentTime;
          const duration = audio.duration || 0;
          
          // Update progress bar
          const progressPercent = (currentTime / duration) * 100;
          setProgress(progressPercent);
          
          // Update time displays
          setTimeElapsed(formatTime(currentTime));
          if (!isNaN(duration)) {
            setTimeTotal(formatTime(duration));
          }
        }
      };
      
      // When track ends, play next
      const onEnded = () => {
        playNextTrack();
      };
      
      // When play actually starts
      const onPlay = () => {
        setIsPlaying(true);
      };
      
      // When pause happens
      const onPause = () => {
        setIsPlaying(false);
      };
      
      // Handle errors
      const onError = (e: Event) => {
        console.error('Audio error:', e);
        // If there's an error, try the next track
        if (playAttempted) {
          playNextTrack();
        }
      };
      
      // Add event listeners
      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('ended', onEnded);
      audio.addEventListener('play', onPlay);
      audio.addEventListener('pause', onPause);
      audio.addEventListener('error', onError);
      
      // Clean up event listeners
      return () => {
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        audio.removeEventListener('timeupdate', onTimeUpdate);
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('play', onPlay);
        audio.removeEventListener('pause', onPause);
        audio.removeEventListener('error', onError);
      };
    }
  }, [playAttempted]);
  
  // Attempt to play when autoplayOnMount changes
  useEffect(() => {
    // Only try to play if autoplayOnMount is true and we haven't already tried
    if (autoplayOnMount && !playAttempted && audioRef.current) {
      setPlayAttempted(true);
      
      // Create a series of play attempts with increasing delays
      const attemptPlay = (delay = 0) => {
        setTimeout(() => {
          if (audioRef.current && (!isPlaying || audioRef.current.paused)) {
            console.log(`Attempting to play with delay: ${delay}ms`);
            audioRef.current.play().catch(error => {
              console.log(`Play attempt failed with delay ${delay}ms:`, error);
              
              // Try again with increased delay if we haven't tried too many times
              if (delay < 2000) {
                attemptPlay(delay + 500);
              }
            });
          }
        }, delay);
      };
      
      // Start the first attempt immediately
      attemptPlay();
    }
  }, [autoplayOnMount, isPlaying, playAttempted]);
  
  // Listen for user interaction event from LoadingScreen
  useEffect(() => {
    const handleUserInteraction = () => {
      // Only attempt playback if we're not handling a manual action and the audio is paused
      if (!isManualAction.current && audioRef.current && (!isPlaying || audioRef.current.paused)) {
        console.log("User interaction detected, attempting playback");
        // Try on multiple devices including iOS
        if (isMobile) {
          audioRef.current.muted = true; // Temporarily mute for iOS
        }
        
        audioRef.current.play()
          .then(() => {
            if (audioRef.current && audioRef.current.muted) {
              audioRef.current.muted = false; // Unmute once playing
            }
            console.log("Playback started by user interaction event");
          })
          .catch(e => {
            console.log("Playback failed despite user interaction:", e);
          });
      }
    };
    
    // Listen for our custom event
    document.addEventListener('userInteractionOccurred', handleUserInteraction);
    
    // Also check if the window flag is set
    if (window.userHasInteracted && audioRef.current && (!isPlaying || audioRef.current.paused) && !isManualAction.current) {
      handleUserInteraction();
    }
    
    return () => {
      document.removeEventListener('userInteractionOccurred', handleUserInteraction);
    };
  }, [isMobile, isPlaying]);
  
  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = config.musicPlayer.tracks[currentTrackIndex].src;
      
      // If it was playing before, continue playing the new track
      if (wasPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Error playing audio after track change:', error);
        });
      }
    }
  }, [currentTrackIndex, config.musicPlayer.tracks]);
  
  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      // Set manual action flag to prevent the user interaction handler from interfering
      isManualAction.current = true;
      
      if (isPlaying) {
        console.log("User clicked pause button");
        audioRef.current.pause();
      } else {
        console.log("User clicked play button");
        audioRef.current.play().catch(error => {
          console.log('Error playing audio:', error);
        });
      }
      
      // Reset the manual action flag after a short delay
      setTimeout(() => {
        isManualAction.current = false;
      }, 500);
    }
  };
  
  // Play previous track
  const playPrevTrack = () => {
    const newIndex = (currentTrackIndex - 1 + config.musicPlayer.tracks.length) % config.musicPlayer.tracks.length;
    setCurrentTrackIndex(newIndex);
  };
  
  // Play next track
  const playNextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % config.musicPlayer.tracks.length;
    setCurrentTrackIndex(newIndex);
  };
  
  // Shuffle to random track
  const shuffleTrack = () => {
    let newIndex;
    // Make sure we don't get the same track
    do {
      newIndex = Math.floor(Math.random() * config.musicPlayer.tracks.length);
    } while (newIndex === currentTrackIndex && config.musicPlayer.tracks.length > 1);
    
    setCurrentTrackIndex(newIndex);
  };
  
  return (
    <div className="music-player-container">
      <div className="music-player">
        <div className="song-info">
          <div className="song-details">
            <div className="song-title-container">
              <div className="song-title">
                {config.musicPlayer.tracks[currentTrackIndex].title}
              </div>
            </div>
            <div className="song-progress">
              <div className="time-elapsed">{timeElapsed}</div>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="time-total">{timeTotal}</div>
            </div>
          </div>
        </div>
        <div className="player-controls">
          <button id="prev-btn" className="control-btn previous" onClick={playPrevTrack}>
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button 
            id="play-pause-btn" 
            className={`control-btn ${isPlaying ? 'pause' : 'play'}`}
            onClick={togglePlayPause}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button id="next-btn" className="control-btn next" onClick={playNextTrack}>
            <FontAwesomeIcon icon={faStepForward} />
          </button>
          <button id="shuffle-btn" className="control-btn shuffle" onClick={shuffleTrack}>
            <FontAwesomeIcon icon={faRandom} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer; 