/**
 * Bio Page Configuration
 * Edit this file to customize your personal bio page
 */

export interface ProfileConfig {
  profile: {
    username: string;
    nicknames: string[];
    locations: string[];
  };
  socialLinks: {
    name: string;
    url: string;
    icon: string;
  }[];
  skills: {
    enable: boolean;
    items?: {
      name: string;
      level: number;
      className: string;
    }[];
  };
  musicPlayer: {
    initialVolume: number;
    tracks: {
      src: string;
      title: string;
    }[];
  };
  particles: {
    enable: boolean;
    density: number;
    color: string;
  };
  welcomeMessage: {
    enable: boolean;
    prefix: string;
    suffix: string;
  };
  theme: {
    colors: {
      discordDark: string;
      discordDarker: string;
      discordLightText: string;
      discordSecondaryText: string;
      discordBlue: string;
      discordPurple: string;
    };
    glowEffects: {
      enable: boolean;
      usernameGlow: string;
      discordIdGlow: string;
    };
  };
  hitokoto: {
    enable: boolean;
    params: {
      c: string;
      min_length: number;
      max_length: number;
    };
  };
  advanced: {
    disableRightClick: boolean;
    customCursor: boolean;
  };
}

const config: ProfileConfig = {
  // Profile Information
  profile: {
    username: "顾瑾淮", // Your display name
    nicknames: ["顾瑾淮", "真名有景", "Jinotech"], // Your nicknames that cycle
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
    // Add more social links as needed
  ],

  // Skills
  skills: {
    enable: true,
    items: [
      { name: 'React.js', level: 75, className: 'react' },
      { name: 'HTML', level: 67, className: 'html' },
      { name: 'CSS', level: 60, className: 'css' },
      { name: 'JavaScript', level: 62, className: 'javascript' },
      { name: 'Express.js', level: 56, className: 'express' },
      { name: 'Next.js', level: 60, className: 'nextjs' },
      { name: 'Python', level: 53, className: 'python' }
    ]
  },

  // Music Player Settings
  musicPlayer: {
    initialVolume: 0.15, // 0.0 to 1.0
    tracks: [
      { 
        src: "/music/bgm.mp3", 
        title: "安静 Instrumental" 
      },
      { 
        src: "/music/bgm1.mp3", 
        title: "The Truth That You Leave" 
      },
      { 
        src: "/music/bgm2.mp3", 
        title: "Luv Letter" 
      },
      { 
        src: "/music/bgm3.mp3", 
        title: "Letter That Writing in the Wind" 
      }
    ]
  },

  // Particles Background
  particles: {
    enable: true,
    density: 80,
    color: "#5865F2",
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

  // Hitokoto Quote Settings
  hitokoto: {
    enable: true,
    params: {
      c: 'a', // Category: a - Anime, b - Comic, c - Game, d - Novel, e - Original, f - Internet, g - Other
      min_length: 10, // Minimum length of quote
      max_length: 100 // Maximum length of quote
    }
  },

  // Advanced Settings
  advanced: {
    disableRightClick: true, // Prevent right-click on the page
    customCursor: true, // Use custom cursor
  }
};

export default config; 