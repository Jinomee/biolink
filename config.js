/**
 * Discord Profile Page Configuration
 * Edit this file to customize your profile page
 */

const config = {
  // Profile Information
  profile: {
    username: "顾槿淮", // Your display name
    discordId: "顾槿淮", // Your Discord ID or username
    locations: [
      "理想国",
      "Utopia",
      "乌托邦",
      "Arcadia"
    ]
  },

  // Social Links
  socialLinks: [
    {
      name: "blog",
      url: "https://blog.zmyj.xyz/",
      icon: "fas fa-blog"
    },
    {
      name: "cloud",
      url: "https://pan.zmyj.xyz/",
      icon: "fas fa-cloud"
    }
    // Add more social links as needed:
    // {
    //   name: "github",
    //   url: "https://github.com/yourusername",
    //   icon: "fab fa-github"
    // },
    // {
    //   name: "twitter",
    //   url: "https://twitter.com/yourusername",
    //   icon: "fab fa-twitter"
    // }
  ],

  // Music Player Settings
  musicPlayer: {
    initialVolume: 0.15, // 0.0 to 1.0
    tracks: [
      { 
        src: "music/bgm.mp3", 
        title: "安静 Instrumental" 
      },
      { 
        src: "music/bgm1.mp3", 
        title: "The Truth That You Leave" 
      },
      { 
        src: "music/bgm2.mp3", 
        title: "Luv Letter" 
      },
      { 
        src: "music/bgm3.mp3", 
        title: "Letter That Writing in the Wind" 
      }
    ]
  },

  // Particles Background
  particles: {
    enable: true,
    density: 80,
    color: "#5865F2",
    // Additional particle settings can be configured in js/particles-config.js
  },

  // Welcome Message
  welcomeMessage: {
    enable: true,
    prefix: "欢迎来到我的主页，",
    suffix: "好"
  },

  // Visual Theme
  theme: {
    // Colors (CSS variables)
    colors: {
      discordDark: "#1e1f22",
      discordDarker: "#18191c",
      discordLightText: "#ffffff",
      discordSecondaryText: "#b5bac1",
      discordBlue: "#5865f2",
      discordPurple: "#9b59b6"
    },
    // Glow effects
    glowEffects: {
      enable: true,
      usernameGlow: "0 0 10px rgba(88, 101, 242, 0.6), 0 0 20px rgba(88, 101, 242, 0.4), 0 0 30px rgba(88, 101, 242, 0.2), 0 0 40px rgba(88, 101, 242, 0.1)",
      discordIdGlow: "0 0 8px rgba(155, 89, 182, 0.5), 0 0 15px rgba(155, 89, 182, 0.3), 0 0 20px rgba(155, 89, 182, 0.2)"
    }
  },

  // Advanced Settings
  advanced: {
    disableRightClick: true, // Prevent right-click on the page
    customCursor: true, // Use custom cursor
  }
};

// Don't modify below this line
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
} else {
  window.profileConfig = config;
}
