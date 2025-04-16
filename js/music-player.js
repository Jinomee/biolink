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
    
    // Initialize track immediately to ensure it's ready when clicked
    loadTrack(currentTrackIndex);
    
    // Update audio source to the random track
    function loadTrack(index) {
        // Set the current track index
        currentTrackIndex = index;
        
        // Get the current track
        const currentTrack = tracks[currentTrackIndex];
        
        // Update audio source
        audioPlayer.src = currentTrack.src + "?v=1.1.0";
        
        // Update song title
        document.getElementById('song-title').textContent = currentTrack.title;
        
        // Reset progress
        progress.style.width = '0%';
        timeElapsed.textContent = '0:00';
        
        // Load audio
        audioPlayer.load();
    }
    
    // Ensure the song title is set correctly on initial load
    const songTitleElement = document.getElementById('song-title');
    songTitleElement.textContent = tracks[currentTrackIndex].title;
    
    // Initialize player
    let isPlaying = false;
    
    // Add event listeners for player controls
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.classList.remove('pause');
            playPauseBtn.classList.add('play');
        } else {
            audioPlayer.play().then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseBtn.classList.remove('play');
                playPauseBtn.classList.add('pause');
            }).catch(error => {
                console.log('Error playing audio:', error);
            });
        }
    });
    
    // Previous track button
    prevBtn.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play().catch(error => {
                console.log('Error playing previous track:', error);
            });
        }
    });
    
    // Next track button
    nextBtn.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play().catch(error => {
                console.log('Error playing next track:', error);
            });
        }
    });
    
    // Shuffle button
    shuffleBtn.addEventListener('click', function() {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            audioPlayer.play().catch(error => {
                console.log('Error playing shuffled track:', error);
            });
        }
    });
    
    // Update play/pause button when audio ends
    audioPlayer.addEventListener('ended', function() {
        // Auto-play next track
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audioPlayer.play().catch(error => {
            console.log('Error playing next track after end:', error);
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playPauseBtn.classList.remove('pause');
            playPauseBtn.classList.add('play');
        });
    });
    
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
        
        // Update progress bar
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + '%';
        
        // Update time displays
        timeElapsed.textContent = formatTime(currentTime);
        if (!isNaN(duration)) {
            timeTotal.textContent = formatTime(duration);
        }
    });
    
    // Update play/pause button when audio plays
    audioPlayer.addEventListener('play', function() {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playPauseBtn.classList.remove('play');
        playPauseBtn.classList.add('pause');
    });
    
    // Update play/pause button when audio pauses
    audioPlayer.addEventListener('pause', function() {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        playPauseBtn.classList.remove('pause');
        playPauseBtn.classList.add('play');
    });
});
