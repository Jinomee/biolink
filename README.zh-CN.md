# Discord风格个人主页

一个受Discord UI设计启发的可定制交互式个人主页。功能包括粒子背景、自定义光标、音乐播放器、动态文本效果和社交媒体链接。

## 功能特点

- 💫 **互动粒子背景**：对鼠标移动做出反应的动态粒子
- 🎵 **音乐播放器**：带有播放/暂停、上一首/下一首和随机播放控制的可定制播放列表
- ✨ **文本效果**：打字机动画和轮换位置文本
- 🔗 **社交链接**：易于配置的社交媒体图标，带有悬停效果
- 🌟 **发光效果**：Discord风格的文本发光效果
- 🖱️ **自定义光标**：独特的光标体验
- 🌙 **欢迎消息**：基于时间的问候消息

## 快速开始

1. **克隆仓库**：
   ```bash
   git clone https://github.com/yourusername/discord-profile-page.git
   cd discord-profile-page
   ```

2. **编辑配置文件**：
   打开`config.js`并自定义您的个人信息、社交链接、音乐曲目和其他设置。

3. **添加您的音乐**：
   将您的音乐文件放在`music/`目录中，并在`config.js`中更新曲目。

4. **部署**：
   将文件上传到您的网络托管服务或GitHub Pages。

## 自定义设置

所有可自定义元素都集中在`config.js`文件中，便于编辑：

### 个人资料信息

```javascript
profile: {
  username: "您的名字", // 您的显示名称
  discordId: "您的Discord ID", // 您的Discord ID或用户名
  locations: [
    "位置1",
    "位置2",
    // 根据需要添加更多位置
  ]
}
```

### 社交链接

```javascript
socialLinks: [
  {
    name: "github",
    url: "https://github.com/yourusername",
    icon: "fab fa-github"
  },
  // 根据需要添加更多社交链接
]
```

`icon`属性使用[Font Awesome](https://fontawesome.com/icons)类。

### 音乐播放器

```javascript
musicPlayer: {
  initialVolume: 0.15, // 0.0到1.0
  tracks: [
    { 
      src: "music/track1.mp3", 
      title: "曲目标题1" 
    },
    // 根据需要添加更多曲目
  ]
}
```

### 主题颜色

```javascript
theme: {
  colors: {
    discordDark: "#1e1f22",
    discordBlue: "#5865f2",
    // 其他颜色变量
  },
  // 发光效果设置
}
```

## 高级配置

### 粒子背景

基本粒子设置可以在`config.js`中配置：

```javascript
particles: {
  enable: true,
  density: 80,
  color: "#5865F2"
}
```

对于更高级的自定义，请编辑`js/particles-config.js`。

### 自定义光标

要替换光标图像：

1. 用您自己的图像替换`cursor.svg`
2. 确保它有透明背景
3. 保持小尺寸（推荐16x16px或32x32px）

## 部署

### GitHub Pages

1. 将您的仓库推送到GitHub
2. 转到仓库设置 > Pages
3. 选择您的主分支作为源
4. 您的网站将发布在`https://yourusername.github.io/discord-profile-page/`

### Netlify

1. 在[Netlify](https://www.netlify.com/)创建一个账户
2. 将您的项目文件夹拖放到Netlify仪表板
3. 您的网站将使用Netlify子域名部署

## 浏览器兼容性

测试并在以下浏览器上正常工作：
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## 许可证

本项目采用MIT许可证 - 有关详细信息，请参阅LICENSE文件。

## 致谢

- 感谢[Particles.js](https://vincentgarreau.com/particles.js/)提供粒子背景
- 感谢[Font Awesome](https://fontawesome.com/)提供图标
- 感谢Discord提供设计灵感
