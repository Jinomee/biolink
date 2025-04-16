/**
 * Apply configuration settings to the page
 * This script should be loaded after config.js but before other scripts
 */
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Set page title based on username
    document.title = profileConfig.profile.username + ' - Discord Profile';
});
