import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaLink, FaMusic, FaRocket } from 'react-icons/fa';

// Get recipient name from URL
const params = new URLSearchParams(window.location.search);
const recipientName = params.get("to") || "Friend";
const customMessage = params.get("msg") || "";

// Removed Diya and Rocket components

// 3D Scene Component
const Scene = () => {
  const controlsRef = useRef();
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF00FF" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <OrbitControls 
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
};

// Click Sparkle Effect
const ClickSparkle = ({ x, y, id }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0 }}
      animate={{ opacity: 0, scale: 2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
        borderRadius: '50%',
        boxShadow: '0 0 20px #FFD700',
      }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{ 
              opacity: 0, 
              x: Math.cos(i * Math.PI / 4) * 30,
              y: Math.sin(i * Math.PI / 4) * 30
            }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: ['#FFD700', '#FF00FF', '#FF8C00', '#00FFFF'][i % 4],
              borderRadius: '50%',
              left: '8px',
              top: '8px',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Random Funny Popup Messages
const RandomPopup = ({ message, onDismiss }) => {
  const fonts = [
    "'Great Vibes', cursive",
    "'Dancing Script', cursive",
    "'Pacifico', cursive",
  ];
  
  const positions = [
    { top: '10%', left: '10%' },
    { top: '15%', right: '15%' },
    { bottom: '20%', left: '15%' },
    { bottom: '15%', right: '10%' },
    { top: '50%', left: '5%' },
    { top: '40%', right: '8%' },
  ];
  
  const randomPos = positions[Math.floor(Math.random() * positions.length)];
  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0, rotate: 20 }}
      style={{
        position: 'fixed',
        ...randomPos,
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        background: 'rgba(255, 215, 0, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 215, 0, 0.4)',
        borderRadius: '20px',
        padding: '15px 25px',
        fontFamily: randomFont,
        fontSize: '1.3rem',
        color: '#FFD700',
        textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
      }}>
        {message}
      </div>
    </motion.div>
  );
};

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [sparkles, setSparkles] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customMsg, setCustomMsg] = useState('');
  const [showFullMessage, setShowFullMessage] = useState(false);
  
  const funnyMessages = [
    "✨ You just unlocked 100% happiness!",
    "🪔 Don't blow the Diya! 😂",
    "⚡ Your brightness level increased by 10x!",
    "🎆 May your sweets be plenty!",
    "✨ Prosperity loading... 99% complete!",
    "🪔 Your good vibes are contagious!",
    "🎊 Warning: Joy levels exceeding normal!",
    "✨ You're glowing brighter than diyas!",
    "🎇 Sparkle mode: ACTIVATED!",
    "🪔 May your year be lit... literally!",
  ];
  
  // Show message when URL has custom message
  useEffect(() => {
    if (customMessage) {
      setTimeout(() => {
        setShowFullMessage(true);
      }, 1000);
    }
  }, []);
  
  // Random popup messages
  useEffect(() => {
    const interval = setInterval(() => {
      setPopupMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Click sparkle handler
  const handleClick = (e) => {
    const id = Date.now() + Math.random();
    setSparkles(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== id));
    }, 600);
  };
  
  const createPersonalLink = () => {
    if (!customName.trim()) {
      alert('Please enter a name!');
      return;
    }
    const baseUrl = window.location.origin + window.location.pathname;
    const msgParam = customMsg.trim() ? `&msg=${encodeURIComponent(customMsg)}` : '';
    const link = `${baseUrl}?to=${encodeURIComponent(customName)}${msgParam}`;
    navigator.clipboard.writeText(link);
    alert(`Link copied! Share it with ${customName}! 🎉`);
  };
  
  const shareLink = () => {
    const link = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: '🪔 Happy Diwali!',
        text: `Wishing you a sparkling Diwali!`,
        url: link,
      });
    } else {
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard! 📋');
    }
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a0033 0%, #0a001a 50%, #1a0066 100%)',
        position: 'relative',
        fontFamily: "'Dancing Script', cursive",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow: hidden;
        }
        
        .glass-button {
          background: rgba(255, 215, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 215, 0, 0.3);
          color: #FFD700;
          padding: 12px 24px;
          border-radius: 15px;
          font-family: 'Dancing Script', cursive;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
        }
        
        .glass-button:hover {
          background: rgba(255, 215, 0, 0.2);
          border-color: rgba(255, 215, 0, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(255, 215, 0, 0.4);
        }
        
        .glass-input {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 215, 0, 0.3);
          color: #FFD700;
          padding: 12px 20px;
          border-radius: 12px;
          font-family: 'Dancing Script', cursive;
          font-size: 1rem;
          width: 100%;
          margin: 10px 0;
        }
        
        .glass-input::placeholder {
          color: rgba(255, 215, 0, 0.5);
        }
        
        .glass-input:focus {
          outline: none;
          border-color: rgba(255, 215, 0, 0.6);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
      `}</style>
      
      {/* 3D Canvas Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Click Sparkles */}
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <ClickSparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} id={sparkle.id} />
        ))}
      </AnimatePresence>
      
      {/* Random Popup Messages */}
      <AnimatePresence>
        {popupMessage && (
          <RandomPopup 
            message={popupMessage} 
            onDismiss={() => setPopupMessage(null)}
          />
        )}
      </AnimatePresence>
      
      {/* Full Message Display */}
      <AnimatePresence>
        {showFullMessage && customMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2000,
              maxWidth: '600px',
              width: '90%',
            }}
          >
            <div style={{
              background: 'rgba(26, 0, 51, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '3px solid rgba(255, 215, 0, 0.5)',
              borderRadius: '30px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 0 50px rgba(255, 215, 0, 0.4)',
            }}>
              <p style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '2.5rem',
                color: '#FFD700',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
                marginBottom: '20px',
              }}>
                {customMessage}
              </p>
              <button 
                onClick={() => setShowFullMessage(false)}
                className="glass-button"
                style={{ marginTop: '20px' }}
              >
                Continue to Wishes ✨
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(255, 140, 0, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: '-30px',
                borderRadius: '50%',
                filter: 'blur(20px)',
                zIndex: -1,
              }}
            />
            <h1 style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(2rem, 8vw, 4.5rem)',
              background: 'linear-gradient(45deg, #FFD700 30%, #FF8C00 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.4)',
              margin: 0,
              padding: '10px 0',
            }}>
              🪔 Happy Diwali, {recipientName}! 🪔
            </h1>
          </div>
        </motion.div>
        
        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}>
          {[
            { id: 'main', label: '🪔 Main', icon: '🪔' },
            { id: 'blessings', label: '🙏 Blessings', icon: '🙏' },
            { id: 'customize', label: '⚙️ Create & Share', icon: '⚙️' },
          ].map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className="glass-button"
              style={{
                background: activeTab === tab.id 
                  ? 'rgba(255, 215, 0, 0.25)' 
                  : 'rgba(255, 215, 0, 0.1)',
                borderColor: activeTab === tab.id
                  ? 'rgba(255, 215, 0, 0.6)'
                  : 'rgba(255, 215, 0, 0.3)',
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        }}>
          <AnimatePresence mode="wait">
            {activeTab === 'main' && (
              <motion.div
                key="main"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                style={{
                  background: 'rgba(26, 0, 51, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '25px',
                  padding: '40px',
                  maxWidth: '600px',
                  textAlign: 'center',
                  boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)',
                }}
              >
                <p style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  color: '#FFD700',
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
                  lineHeight: '1.6',
                  margin: '20px 0',
                }}>
                  May your life be filled with light, love, and endless joy this Diwali!
                </p>
                <p style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.3rem',
                  color: '#FF8C00',
                  marginTop: '20px',
                }}>
                  May this festival of lights illuminate your path to success and happiness! ✨
                </p>
                <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={shareLink} className="glass-button">
                    <FaShare style={{ marginRight: '8px' }} />
                    Share
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'blessings' && (
              <motion.div
                key="blessings"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                style={{
                  background: 'rgba(26, 0, 51, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '25px',
                  padding: '40px',
                  maxWidth: '600px',
                  boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)',
                }}
              >
                <h2 style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '2.5rem',
                  color: '#FFD700',
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
                  marginBottom: '25px',
                  textAlign: 'center',
                }}>
                  Blessings for You
                </h2>
                {[
                  "May your home be filled with laughter and prosperity! 🏠✨",
                  "May success light up every corner of your life! 🌟",
                  "Wishing you health, wealth, and boundless happiness! 💰❤️",
                  "May every Diya you light bring new hope! 🪔🌈",
                  "May this Diwali sparkle with moments of joy! 🎆😊",
                ].map((blessing, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontSize: '1.2rem',
                      color: '#FFD700',
                      margin: '15px 0',
                      padding: '15px',
                      background: 'rgba(255, 215, 0, 0.05)',
                      borderLeft: '4px solid #FFD700',
                      borderRadius: '10px',
                    }}
                  >
                    {blessing}
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {activeTab === 'customize' && (
              <motion.div
                key="customize"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  background: 'rgba(26, 0, 51, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '25px',
                  padding: '40px',
                  maxWidth: '600px',
                  width: '90%',
                  boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)',
                }}
              >
                <h2 style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '2.5rem',
                  color: '#FFD700',
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
                  marginBottom: '25px',
                  textAlign: 'center',
                }}>
                  Create Personal Link
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: '1.2rem',
                    color: '#FFD700',
                    display: 'block',
                    marginBottom: '10px',
                  }}>
                    Recipient's Name:
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Enter name..."
                    className="glass-input"
                  />
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: '1.2rem',
                    color: '#FFD700',
                    display: 'block',
                    marginBottom: '10px',
                  }}>
                    Personal Message (Optional):
                  </label>
                  <textarea
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="Write your heartfelt message..."
                    className="glass-input"
                    style={{ minHeight: '100px', resize: 'vertical' }}
                  />
                </div>
                
                <button onClick={createPersonalLink} className="glass-button" style={{ width: '100%', marginBottom: '15px' }}>
                  <FaLink style={{ marginRight: '8px' }} />
                  Create & Copy Link
                </button>
                
                <button onClick={shareLink} className="glass-button" style={{ width: '100%' }}>
                  <FaShare style={{ marginRight: '8px' }} />
                  Share Current Page
                </button>
                
                <div style={{
                  marginTop: '30px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 215, 0, 0.2)',
                  textAlign: 'right',
                }}>
                  <p style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: '0.9rem',
                    color: 'rgba(255, 215, 0, 0.6)',
                    fontStyle: 'italic',
                  }}>
                    Crafted with love by Vikas ✨
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}