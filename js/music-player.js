// Music player functionality
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const progress = document.getElementById('progress');
    const timeElapsed = document.getElementById('time-elapsed');
    const timeTotal = document.getElementById('time-total');
    
    // Set volume from config
    audioPlayer.volume = profileConfig.musicPlayer.initialVolume;
    
    // Track information from config
    const tracks = profileConfig.musicPlayer.tracks;
    
    // Randomize the starting track
    let currentTrackIndex = Math.floor(Math.random() * tracks.length);
    
    // Update audio source to the random track
    audioPlayer.src = tracks[currentTrackIndex].src;
    
    // Ensure the song title and tooltip are set correctly on initial load
    const songTitleElement = document.getElementById('song-title');
    const tooltipContent = document.querySelector('.comic-tooltip-content');
    songTitleElement.textContent = tracks[currentTrackIndex].title;
    tooltipContent.textContent = tracks[currentTrackIndex].title;
    
    // Initialize player
    let isPlaying = false;
    
    // Function to load and play a track
    function loadTrack(index) {
        // Update audio source
        audioPlayer.src = tracks[index].src;
        
        // Update song title and comic tooltip
        const songTitleElement = document.getElementById('song-title');
        const tooltipContent = document.querySelector('.comic-tooltip-content');
        songTitleElement.textContent = tracks[index].title;
        tooltipContent.textContent = tracks[index].title;
        
        // Reset progress
        document.getElementById('progress').style.width = '0%';
        document.getElementById('time-elapsed').textContent = '0:00';
        
        // If we were playing, continue playing the new track
        if (isPlaying) {
            const playPromise = audioPlayer.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Error playing new track:', error);
                });
            }
        }
        
        // Update UI to reflect current track
        console.log('Now playing:', tracks[index].title);
    }
    
    // Try to play audio immediately (may be blocked by browser)
    const playPromise = audioPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay started successfully
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playPauseBtn.classList.remove('play');
            playPauseBtn.classList.add('pause');
        }).catch(error => {
            // Autoplay was prevented by browser
            console.log('Autoplay prevented by browser:', error);
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.classList.remove('pause');
            playPauseBtn.classList.add('play');
            
            // Loading screen is already visible by default
            
            // Add a click event to the loading screen
            const loadingScreen = document.getElementById('loading-screen');
            const mainContent = document.getElementById('main-content');
            
            loadingScreen.addEventListener('click', function() {
                // Play audio
                audioPlayer.play().then(() => {
                    isPlaying = true;
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    playPauseBtn.classList.remove('play');
                    playPauseBtn.classList.add('pause');
                });
                
                // Hide loading screen with fade out effect
                loadingScreen.classList.add('fade-out');
                
                // Show main content after a short delay
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.classList.add('fade-in');
                }, 500);
            });
        });
    }
    
    // Format time in MM:SS format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    // Update progress bar and time displays
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration || 0;
        
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time displays
        timeElapsed.textContent = formatTime(currentTime);
        timeTotal.textContent = formatTime(duration);
    });
    
    // Set duration once metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', function() {
        timeTotal.textContent = formatTime(audioPlayer.duration);
    });
    
    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.classList.remove('pause');
            playPauseBtn.classList.add('play');
        } else {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playPauseBtn.classList.remove('play');
            playPauseBtn.classList.add('pause');
        }
        isPlaying = !isPlaying;
    });
    
    // Previous button (go to previous track or restart current track)
    prevBtn.addEventListener('click', function() {
        if (audioPlayer.currentTime > 3) {
            // If we're more than 3 seconds in, just restart the current track
            audioPlayer.currentTime = 0;
        } else {
            // Go to previous track or loop to the last track
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            loadTrack(currentTrackIndex);
        }
    });
    
    // When a track ends, automatically play the next one
    audioPlayer.addEventListener('ended', function() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
    });
    
    // Next button (go to next track)
    nextBtn.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
    });
    
    // Shuffle button (randomize track selection)
    shuffleBtn.addEventListener('click', function() {
        // Pick a random track that's different from the current one
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * tracks.length);
        } while (newIndex === currentTrackIndex && tracks.length > 1);
        
        currentTrackIndex = newIndex;
        loadTrack(currentTrackIndex);
        
        // Visual feedback for shuffle button
        shuffleBtn.classList.add('active');
        setTimeout(() => {
            shuffleBtn.classList.remove('active');
        }, 300);
    });
    
    // Click on progress bar to seek
    document.querySelector('.progress-bar').addEventListener('click', function(e) {
        const progressBar = this;
        const clickPosition = e.offsetX / progressBar.offsetWidth;
        audioPlayer.currentTime = clickPosition * audioPlayer.duration;
    });
});
