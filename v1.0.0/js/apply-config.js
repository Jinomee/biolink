/**
 * Apply configuration settings to the page
 */

// Improved resource error handling
window.addEventListener('error', function(e) {
  if (e.target && (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK' || e.target.tagName === 'IMG' || e.target.tagName === 'AUDIO')) {
    console.error("Resource failed to load:", e.target.src || e.target.href || "unknown resource");
    if (e.target.id === 'audio-player') {
      console.log("Audio player failed to load, but continuing anyway");
    }
  }
}, true);

// Add debug mode
const urlParams = new URLSearchParams(window.location.search);
const debug = urlParams.get('debug') === 'true';
if (debug) {
  console.log("Debug mode enabled");
  console.log("Config loaded:", profileConfig);
}

document.addEventListener('DOMContentLoaded', function() {
    // Set username
    document.getElementById('profile-username').textContent = profileConfig.profile.username;
    
    // Set page title
    document.title = profileConfig.profile.username + ' の 主页';
    
    // Apply theme colors from config
    const root = document.documentElement;
    const colors = profileConfig.theme.colors;
    
    // Set CSS variables for colors
    root.style.setProperty('--discord-dark', colors.discordDark);
    root.style.setProperty('--discord-darker', colors.discordDarker);
    root.style.setProperty('--discord-light-text', colors.discordLightText);
    root.style.setProperty('--discord-secondary-text', colors.discordSecondaryText);
    root.style.setProperty('--discord-blue', colors.discordBlue);
    root.style.setProperty('--discord-purple', colors.discordPurple);
    
    // Apply glow effects if enabled
    if (profileConfig.theme.glowEffects.enable) {
        root.style.setProperty('--username-glow', profileConfig.theme.glowEffects.usernameGlow);
        root.style.setProperty('--discord-id-glow', profileConfig.theme.glowEffects.discordIdGlow);
    } else {
        // Disable glow effects
        root.style.setProperty('--username-glow', 'none');
        root.style.setProperty('--discord-id-glow', 'none');
    }
    
    // Apply custom cursor if enabled
    if (profileConfig.advanced.customCursor) {
        document.body.classList.add('custom-cursor-enabled');
    }
    
    // Set location text rotation
    const locationWrapper = document.getElementById('location-wrapper');
    
    profileConfig.profile.locations.forEach((location, index) => {
        const locationText = document.createElement('div');
        locationText.className = 'location-text';
        locationText.textContent = location;
        locationWrapper.appendChild(locationText);
    });
    
    // Add social links
    const socialLinksContainer = document.getElementById('social-links');
    
    // Clear existing links to prevent duplication
    socialLinksContainer.innerHTML = '';
    
    profileConfig.socialLinks.forEach(link => {
        const socialLink = document.createElement('a');
        socialLink.href = link.url;
        socialLink.target = '_blank';
        socialLink.className = `social-icon ${link.type}`;
        socialLink.title = link.title;
        
        const icon = document.createElement('i');
        icon.className = link.icon;
        
        socialLink.appendChild(icon);
        socialLinksContainer.appendChild(socialLink);
    });
});
