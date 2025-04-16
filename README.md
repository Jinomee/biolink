# Discord-Inspired Profile Page

[中文文档](README.zh-CN.md) | English

A customizable, interactive profile page inspired by Discord's UI design. Features include a particle background, custom cursor, music player, dynamic text effects, and social media links.

## Features

- 💫 **Interactive Particle Background**: Dynamic particles that respond to mouse movements
- 🎵 **Music Player**: Customizable playlist with play/pause, previous/next, and shuffle controls
- ✨ **Text Effects**: Typewriter animation and rotating location texts
- 🔗 **Social Links**: Easily configurable social media icons with hover effects
- 🌟 **Glow Effects**: Discord-inspired text glow effects
- 🖱️ **Custom Cursor**: Unique cursor experience
- 🌙 **Welcome Message**: Time-based greeting message

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/discord-profile-page.git
   cd discord-profile-page
   ```

2. **Edit the configuration file**:
   Open `config.js` and customize your profile information, social links, music tracks, and other settings.

3. **Add your music**:
   Place your music files in the `music/` directory and update the tracks in `config.js`.

4. **Deploy**:
   Upload the files to your web hosting service or GitHub Pages.

## Customization

All customizable elements are centralized in the `config.js` file for easy editing:

### Profile Information

```javascript
profile: {
  username: "YourName", // Your display name
  discordId: "YourDiscordID", // Your Discord ID or username
  locations: [
    "Location1",
    "Location2",
    // Add more locations as needed
  ]
}
```

### Social Links

```javascript
socialLinks: [
  {
    name: "github",
    url: "https://github.com/yourusername",
    icon: "fab fa-github"
  },
  // Add more social links as needed
]
```

The `icon` property uses [Font Awesome](https://fontawesome.com/icons) classes.

### Music Player

```javascript
musicPlayer: {
  initialVolume: 0.15, // 0.0 to 1.0
  tracks: [
    { 
      src: "music/track1.mp3", 
      title: "Track Title 1" 
    },
    // Add more tracks as needed
  ]
}
```

### Theme Colors

```javascript
theme: {
  colors: {
    discordDark: "#1e1f22",
    discordBlue: "#5865f2",
    // Other color variables
  },
  // Glow effects settings
}
```

## Advanced Configuration

### Particles Background

Basic particle settings can be configured in `config.js`:

```javascript
particles: {
  enable: true,
  density: 80,
  color: "#5865F2"
}
```

For more advanced customization, edit `js/particles-config.js`.

### Custom Cursor

To replace the cursor image:

1. Replace `cursor.svg` with your own image
2. Ensure it has a transparent background
3. Keep it small (recommended 16x16px or 32x32px)

## Deployment

### GitHub Pages

1. Push your repository to GitHub
2. Go to repository Settings > Pages
3. Select your main branch as the source
4. Your site will be published at `https://yourusername.github.io/discord-profile-page/`

### Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder to the Netlify dashboard
3. Your site will be deployed with a Netlify subdomain

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Particles.js](https://vincentgarreau.com/particles.js/) for the particle background
- [Font Awesome](https://fontawesome.com/) for the icons
- Discord for the design inspiration
2. No server or additional dependencies required.

## Customization

You can customize this page by:
- Changing the profile information in the HTML
- Modifying the colors in the CSS `:root` variables
- Replacing placeholder images with actual images
- Adding additional social media links as needed
