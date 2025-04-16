// Text effects functionality
document.addEventListener('DOMContentLoaded', function() {
    // Apply username from config
    const usernameElement = document.getElementById('profile-username');
    usernameElement.textContent = profileConfig.profile.username;

    // Typewriter effect for Nickname
    const nickname = document.getElementById('typewriter');
    const nicknames = profileConfig.profile.nicknames;
    let currentNicknameIndex = 0;
    let index = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseEnd = 0;
    
    function typeWriter() {
        const now = Date.now();
        
        // Wait during pause time
        if (now < pauseEnd) {
            setTimeout(typeWriter, pauseEnd - now);
            return;
        }
        
        const currentText = nicknames[currentNicknameIndex];
        
        if (isDeleting) {
            // Deleting text
            nickname.textContent = currentText.substring(0, index);
            index--;
            typingSpeed = 50; // Faster when deleting
            
            if (index === 0) {
                isDeleting = false;
                currentNicknameIndex = (currentNicknameIndex + 1) % nicknames.length;
                typingSpeed = 100; // Reset typing speed
                pauseEnd = now + 500; // Pause before typing next nickname
            }
        } else {
            // Typing text
            nickname.textContent = currentText.substring(0, index);
            index++;
            
            if (index > currentText.length) {
                isDeleting = true;
                pauseEnd = now + 1500; // Pause at full text
            }
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 1000);
    
    // Generate location texts from config
    const locationWrapper = document.getElementById('location-wrapper');
    const locationTexts = [];
    
    // Create location text elements
    profileConfig.profile.locations.forEach((location, index) => {
        const locationElement = document.createElement('span');
        locationElement.id = `location-text-${index + 1}`;
        locationElement.className = 'location-text' + (index === 0 ? ' active' : '');
        locationElement.textContent = location;
        locationWrapper.appendChild(locationElement);
        locationTexts.push(locationElement);
    });
    
    let currentLocationIndex = 0;
    
    function cycleLocationText() {
        // Hide current location text
        locationTexts[currentLocationIndex].classList.remove('active');
        locationTexts[currentLocationIndex].classList.add('inactive');
        
        // Move to next location text
        currentLocationIndex = (currentLocationIndex + 1) % locationTexts.length;
        
        // Show next location text
        locationTexts[currentLocationIndex].classList.remove('inactive');
        locationTexts[currentLocationIndex].classList.add('active');
        
        // Continue cycling every 3 seconds
        setTimeout(cycleLocationText, 3000);
    }
    
    // Start the location text transition with a delay
    setTimeout(cycleLocationText, 3000);
    
    // Generate social links from config
    const socialLinksContainer = document.getElementById('social-links');
    
    // Create social link elements
    profileConfig.socialLinks.forEach(link => {
        const socialLink = document.createElement('a');
        socialLink.href = link.url;
        socialLink.className = `social-icon ${link.name}`;
        socialLink.target = '_blank';
        
        const icon = document.createElement('i');
        icon.className = link.icon;
        
        socialLink.appendChild(icon);
        socialLinksContainer.appendChild(socialLink);
    });
});
