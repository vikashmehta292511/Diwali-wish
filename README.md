# 🪔 Diwali Wishes - Interactive 3D Greeting Card

A stunning, interactive web application to send personalized Diwali wishes with an engaging trivia challenge! Built with React, Three.js, and Framer Motion for a magical festival experience.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge)](https://diwali-wish-2025.vercel.app)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

## ✨ Features

### 🌟 Visual Experience
- **3D Animated Starry Sky** - Mesmerizing night sky with thousands of twinkling stars
- **Glassmorphism UI** - Modern transparent glass design with deep purple theme
- **Interactive Sparkles** - Colorful sparkle effects appear on every click
- **Random Festive Popups** - Fun messages appears randomly in beautiful calligraphy fonts
- **Smooth Animations** - Butter-smooth transitions powered by Framer Motion

### 🎮 Trivia Challenge: "How Well Do You Know Me?"
- **20 Diwali Questions** - Fun, personalized quiz about traditions and preferences
- **Sender Creates Quiz** - Answer questions about yourself before sharing
- **Recipient Plays** - Friends try to guess your answers
- **Instant Results** - Score display with fun messages based on performance
- **No Database Needed** - All data securely encoded in URL

### 🎁 Personalization
- **Custom Names** - Personalize greetings for each recipient
- **Personal Messages** - Add heartfelt Diwali wishes
- **Shareable Links** - Generate unique URLs with all customizations
- **One-Click Sharing** - Easy sharing via Web Share API or copy link

### 📱 Fully Responsive
- Works perfectly on mobile, tablet, and desktop
- Touch-optimized for mobile devices
- Adaptive layouts for all screen sizes

## 🚀 Live Demo

**👉 [Try it now!](https://diwali-wish-2025.vercel.app)** 🎆

## 🛠️ Built With

| Technology | Purpose |
|------------|---------|
| **React 18+** | Frontend framework |
| **Three.js** | 3D graphics engine |
| **@react-three/fiber** | React renderer for Three.js |
| **@react-three/drei** | Three.js helpers |
| **Framer Motion** | Animation library |
| **React Icons** | Icon components |
| **Vite** | Build tool & dev server |
| **Vercel** | Deployment platform |

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Git

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/vikashmehta292511/Diwali-wish.git

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit http://localhost:5173
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🎯 How It Works

### For Senders

1. **Go to "Create" tab**
2. **Enter recipient's name**
3. **Add personal message** (optional)
4. **Create trivia quiz** (optional):
   - Click "Create Trivia"
   - Answer 20 fun questions about yourself
5. **Generate & share link**
   - Click "Create & Copy Link"
   - Share via WhatsApp, Email, etc.

### For Recipients

1. **Open the shared link**
2. **View personalized greeting** with their name
3. **Play trivia challenge** (if included):
   - Answer 20 questions about the sender
   - Submit answers
4. **See results**:
   - Score out of 20
   - Comparison with correct answers
   - Fun message based on score

##  Project Structure
```
diwali-wishes/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── LICENSE             # MIT License
└── README.md           # This file
```



## 🔐 Privacy & Security

- **No Backend** - Pure client-side application
- **No Database** - Data encoded in URL only
- **No Tracking** - No analytics or user tracking
- **Temporary Storage** - Data cleared when tab closes
- **Base64 Encoding** - Answers encoded in shareable links


## 🎯 Key Features Explained

### 3D Scene
- Animated starry night background
- Auto-rotating camera for dynamic view
- Ambient and point lights for atmosphere
- Optimized for smooth 60fps performance

### Click Sparkles
- Multi-colored particle effects
- All directional burst animation
- Auto-cleanup to prevent memory leaks
- Works on both desktop and mobile

### Trivia System
- 20 pre-defined Diwali questions
- Questions about:
  - Favorite sweets and snacks
  - Diwali rituals and traditions
  - Celebration preferences
  - Personal memories
  - And more!

### URL Encoding
```
https://your-app.vercel.app/?to=Name&msg=Message&quiz=BASE64_DATA
```
- `to` - Recipient name
- `msg` - Personal message
- `quiz` - Base64 encoded trivia answers

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 🐛 Issues & Support

Found a bug or have a suggestion?
- Open an issue on GitHub
- Provide detailed description
- Include screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Crafted with love by Vikash** ✨

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) - 3D graphics library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool
- [Vercel](https://vercel.com/) - Deployment platform

## ⭐ Show Your Support

If you like this project, please give it a ⭐️.
