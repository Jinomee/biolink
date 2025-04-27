# Discord-Style Profile Page

A modern, interactive profile page built with React, featuring a Discord-inspired design. This project is a React implementation of a Discord-style profile page, complete with animated particles, typewriter effects, music player, and more.

## Features

- **Discord-inspired UI**: Clean, modern interface inspired by Discord's dark theme
- **Interactive Particles Background**: Dynamic particles that react to user interactions
- **Music Player**: Built-in audio player with play/pause, next/previous, and shuffle functionality
- **Typewriter Effect**: Animated text typing for nicknames
- **Hitokoto Quotes**: Integration with Hitokoto API for dynamic quotes
- **Responsive Design**: Adapts to different screen sizes
- **Customizable Configuration**: Easy to customize through a central config file

## Technologies

- React with TypeScript
- CSS3 with animations and transitions
- Font Awesome for icons
- Particles.js for background effect
- Modern ES6+ JavaScript

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/discord-profile-page.git
   cd discord-profile-page
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

## Configuration

All profile settings can be configured in `src/config/profileConfig.ts`. This includes:

- Profile information (username, nicknames, location)
- Social links
- Music tracks
- Visual theme settings
- Particles background settings
- And more!

## Project Structure

```
discord-profile-page/
├── public/
│   ├── music/          # Music files
│   └── index.html      # HTML template
├── src/
│   ├── components/     # React components
│   │   ├── ProfileCard.tsx
│   │   ├── MusicPlayer.tsx
│   │   └── ... 
│   ├── config/         # Configuration files
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # CSS styles
│   └── App.tsx         # Main application component
└── package.json        # Project dependencies
```

## Customization

### Adding Music

1. Add your music files to the `public/music` directory
2. Update the `musicPlayer.tracks` array in `src/config/profileConfig.ts` with your new tracks

### Adding Social Links

Add or modify social links in the `socialLinks` array in `src/config/profileConfig.ts`:

```typescript
socialLinks: [
  {
    name: "github",
    url: "https://github.com/yourusername",
    icon: "fab fa-github"
  },
  // Add more links as needed
]
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Original design inspired by Discord's user interface
- Particles effect powered by [particles.js](https://vincentgarreau.com/particles.js/)
- Quotes provided by [Hitokoto](https://hitokoto.cn/)
- Font Awesome for the beautiful icons
