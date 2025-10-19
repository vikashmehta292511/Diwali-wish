import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaLink, FaMusic, FaRocket, FaGamepad } from 'react-icons/fa';

// Trivia Questions
const TRIVIA_QUESTIONS = [
  {
    id: 1,
    question: "What's my favorite Diwali sweet?",
    options: ["Gulab Jamun", "Jalebi", "Kaju Katli", "Rasgulla"]
  },
  {
    id: 2,
    question: "Which Diwali ritual do I love the most?",
    options: ["Lighting Diyas", "Rangoli Making", "Lakshmi Puja", "Cleaning House"]
  },
  {
    id: 3,
    question: "Which Diwali ritual do I never skip?",
    options: ["Visiting relatives", "Sharing sweets", "Watching fireworks", "Dancing & Singing"]
  },
  {
    id: 4,
    question: "What's my go-to Diwali decoration style?",
    options: ["Minimalist", "Traditional", "Modern", "Eco-friendly"]
  },
  {
    id: 5,
    question: "What's my favorite Diwali memory from childhood?",
    options: ["Family gathering & reunion", "Decoration & Diya lighting", "Bursting crackers with cousins", "Making rangolis with mom"]
  },
  {
    id: 6,
    question: "My favorite Diwali decoration is...?",
    options: ["Paper lanterns", "Flower garlands", "LED lights", "Traditional diyas"]
  },
  {
    id: 7,
    question: "I prefer celebrating Diwali...",
    options: ["At home with family", "With friends outdoors", "At a big party", "Quietly alone"]
  },
  {
    id: 8,
    question: "If I could travel anywhere for Diwali, where would I go?",
    options: ["Jaipur", "Varanasi", "Ayodhya", "Janakpur-Nepal"] 
  },
  {
    id: 9,
    question: "When do I start Diwali shopping?",
    options: ["One month before", "Two weeks before", "One week before", "Last minute!"]
  },
  {
    id: 10,
    question: "My favorite part of Diwali is?",
    options: ["Food", "Lights", "Family time", "Gifts"]
  },
  {
    id: 11,
    question: "How do I like my fireworks?",
    options: ["Loud crackers", "Colorful sparklers", "Sky rockets", "No fireworks"]
  },
  {
    id: 12,
    question: "My Diwali morning starts with?",
    options: ["Early bath", "Puja first", "Sweets first", "Sleep in!"]
  },
  {
    id: 13,
    question: "What's my Diwali shopping weakness?",
    options: ["Clothes", "Sweets", "Home decor", "Gadgets"]
  },
  {
    id: 14,
    question: "I gift/donate people mostly...",
    options: ["Sweets", "Clothes", "Decorative items", "Money/Gift cards"]
  },
  {
    id: 15,
    question: "What's one thing I always forget during Diwali prep?",
    options: ["Buying crackers", "Charging camera", "Ironing clothes", "Inviting guests"]
  },
  {
    id: 16,
    question: "What's the most “me” thing I've ever done during Diwali?",
    options: ["Fell asleep during puja", "Bursted-up cracker in Hands", "Ruin-up mom rangoli", "Forgot to light diyas"]
  },
  {
    id: 17,
    question: "If I had a Diwali superpower, what would it be?",
    options: ["Instant rangoli creation", "Firework teleportation", "Sweets duplication", "Glitter invisibility"]
  },
  {
    id: 18,
    question: "What's my secret Diwali guilty pleasure?",
    options: ["Hoarding Soan Papdi boxes", "Rewatching old Bollywood songs", "Sneaking extra puja prasad", "Pretending to help in cleaning"]
  },
  {
    id: 19,
    question: "What's my Diwali alter ego name?",
    options: ["The Rangoli Rebel", "Captain Crackers", "Sweet Tooth Singh", "Diva of Diyas"]
  },
  {
    id: 20,
    question: "After Diwali, I'm most excited about?",
    options: ["Leftover sweets", "New year plans", "Rest & recovery", "Bhai Dooj"]
  }
];

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const recipientName = params.get("to") || "Friend";
const customMessage = params.get("msg") || "";
const quizData = params.get("quiz") || "";

// Decode quiz answers from URL
const decodeQuizData = (encoded) => {
  if (!encoded) return null;
  try {
    const decoded = atob(encoded);
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
};

const senderAnswers = decodeQuizData(quizData);

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

// Trivia Quiz Component for Sender
const TriviaCreator = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [TRIVIA_QUESTIONS[currentQuestion].id]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };
  
  const progress = ((currentQuestion + 1) / TRIVIA_QUESTIONS.length) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
      <div style={{
        width: '100%',
        height: '6px',
        background: 'rgba(255, 215, 0, 0.2)',
        borderRadius: '10px',
        marginBottom: '30px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
            borderRadius: '10px',
          }}
        />
      </div>
      
      <h3 style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: '2rem',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: '10px',
      }}>
        Question {currentQuestion + 1} of {TRIVIA_QUESTIONS.length}
      </h3>
      
      <p style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1.5rem',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: '30px',
      }}>
        {TRIVIA_QUESTIONS[currentQuestion].question}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {TRIVIA_QUESTIONS[currentQuestion].options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option)}
            className="glass-button"
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '15px 20px',
              fontSize: '1.1rem',
            }}
          >
            {String.fromCharCode(65 + idx)}. {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Trivia Quiz Component for Recipient
const TriviaPlayer = ({ senderAnswers, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recipientAnswers, setRecipientAnswers] = useState({});
  
  const handleAnswer = (answer) => {
    const newAnswers = { ...recipientAnswers, [TRIVIA_QUESTIONS[currentQuestion].id]: answer };
    setRecipientAnswers(newAnswers);
    
    if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };
  
  const progress = ((currentQuestion + 1) / TRIVIA_QUESTIONS.length) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
      <div style={{
        width: '100%',
        height: '6px',
        background: 'rgba(255, 215, 0, 0.2)',
        borderRadius: '10px',
        marginBottom: '30px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
            borderRadius: '10px',
          }}
        />
      </div>
      
      <h3 style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: '2rem',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: '10px',
      }}>
        Question {currentQuestion + 1} of {TRIVIA_QUESTIONS.length}
      </h3>
      
      <p style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1.5rem',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: '30px',
      }}>
        {TRIVIA_QUESTIONS[currentQuestion].question}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {TRIVIA_QUESTIONS[currentQuestion].options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option)}
            className="glass-button"
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '15px 20px',
              fontSize: '1.1rem',
            }}
          >
            {String.fromCharCode(65 + idx)}. {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Results Component
const TriviaResults = ({ senderAnswers, recipientAnswers, onClose }) => {
  let correctCount = 0;
  TRIVIA_QUESTIONS.forEach(q => {
    if (senderAnswers[q.id] === recipientAnswers[q.id]) {
      correctCount++;
    }
  });
  
  const percentage = (correctCount / TRIVIA_QUESTIONS.length) * 100;
  
  const getMessage = () => {
    if (percentage === 100) return "🎉 You're officially Diwali soulmates! You know each other like the back of a mehndi hand — pure festive telepathy!🪔";
    if (percentage >= 80) return "✨ Amazing! You know them so well! Just a couple of firecrackers lighting up the same sky — Diwali magic at its finest!";
    if (percentage >= 60) return "🎊 Pretty good! You're on the right track! You've got the spark — just a few more gulab jamuns and game nights to reach full glow!";
    if (percentage >= 40) return "😊 Not bad! Time for more Diwali hangouts! You're halfway to becoming Diwali besties — maybe swap a few laddoos and stories next time?";
    return "😅 Looks like you need a few more laddoo bonding sessions! The diya's flickering, but the friendship flame needs a little more oil — time to reconnect!";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'rgba(26, 0, 51, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '3px solid rgba(255, 215, 0, 0.5)',
        borderRadius: '25px',
        padding: '40px',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)',
      }}
    >
      <h2 style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: '3rem',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: '20px',
        textShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
      }}>
        Your Score: {correctCount}/{TRIVIA_QUESTIONS.length}
      </h2>
      
      <p style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1.8rem',
        color: '#FF8C00',
        textAlign: 'center',
        marginBottom: '30px',
      }}>
        {getMessage()}
      </p>
      
      <div style={{
        background: 'rgba(255, 215, 0, 0.05)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        {TRIVIA_QUESTIONS.map((q, idx) => {
          const isCorrect = senderAnswers[q.id] === recipientAnswers[q.id];
          return (
            <div
              key={q.id}
              style={{
                padding: '15px',
                marginBottom: '15px',
                background: isCorrect 
                  ? 'rgba(0, 255, 0, 0.1)' 
                  : 'rgba(255, 0, 0, 0.1)',
                borderLeft: `4px solid ${isCorrect ? '#00FF00' : '#FF0000'}`,
                borderRadius: '10px',
              }}
            >
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '1.1rem',
                color: '#FFD700',
                marginBottom: '8px',
              }}>
                {idx + 1}. {q.question}
              </p>
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '1rem',
                color: isCorrect ? '#00FF88' : '#FF6B6B',
                marginBottom: '5px',
              }}>
                Your answer: {recipientAnswers[q.id]}
              </p>
              {!isCorrect && (
                <p style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1rem',
                  color: '#FFD700',
                }}>
                  Correct answer: {senderAnswers[q.id]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      
      <button
        onClick={onClose}
        className="glass-button"
        style={{ width: '100%', marginTop: '20px' }}
      >
        Close & Continue to Wishes ✨
      </button>
    </motion.div>
  );
};

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState(senderAnswers ? 'trivia' : 'main');
  const [sparkles, setSparkles] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [customName, setCustomName] = useState('');
  const [customMsg, setCustomMsg] = useState('');
  const [showFullMessage, setShowFullMessage] = useState(false);
  
  // Trivia states
  const [showTriviaCreator, setShowTriviaCreator] = useState(false);
  const [triviaAnswers, setTriviaAnswers] = useState(null);
  const [showTriviaPlayer, setShowTriviaPlayer] = useState(false);
  const [recipientTriviaAnswers, setRecipientTriviaAnswers] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  const funnyMessages = [
    "🎉 Happiness: 100% unlocked!",
    "🪔 Diya alert: don't blow it!",
    "⚡ Brightness boosted x10!",
    "🍬 Sweets incoming!",
    "✨ Prosperity: 99% loading...",
    "😄 Vibes = contagious!",
    "🎊 Joy overload detected!",
    "✨ You're glowing brighter than diyas!",
    "🎇 Sparkle mode: ACTIVATED!",
    "🔥 Year = officially lit!",
  ];
  
  // Show message when URL has custom message
  useEffect(() => {
    if (customMessage) {
      setTimeout(() => {
        setShowFullMessage(true);
      }, 1000);
    }
  }, []);
  
  // Show trivia if quiz data exists in URL
  useEffect(() => {
    if (senderAnswers) {
      setShowTriviaPlayer(true);
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
    const quizParam = triviaAnswers ? `&quiz=${btoa(JSON.stringify(triviaAnswers))}` : '';
    const link = `${baseUrl}?to=${encodeURIComponent(customName)}${msgParam}${quizParam}`;
    
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
  
  const handleTriviaComplete = (answers) => {
    setTriviaAnswers(answers);
    setShowTriviaCreator(false);
    alert('Trivia created! Now create your link to share! 🎮');
  };
  
  const handleRecipientTriviaComplete = (answers) => {
    setRecipientTriviaAnswers(answers);
    setShowTriviaPlayer(false);
    setShowResults(true);
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
      
      {/* Trivia Creator Modal */}
      <AnimatePresence>
        {showTriviaCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 3000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              overflow: 'auto',
            }}
          >
            <TriviaCreator onComplete={handleTriviaComplete} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Trivia Player Modal */}
      <AnimatePresence>
        {showTriviaPlayer && senderAnswers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 3000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              overflow: 'auto',
            }}
          >
            <TriviaPlayer 
              senderAnswers={senderAnswers} 
              onComplete={handleRecipientTriviaComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Results Modal */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 3000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              overflow: 'auto',
            }}
          >
            <TriviaResults 
              senderAnswers={senderAnswers}
              recipientAnswers={recipientTriviaAnswers}
              onClose={() => {
                setShowResults(false);
                setActiveTab('main');
              }}
            />
          </motion.div>
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
                Continue ✨
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
            { id: 'customize', label: '⚙️ Create', icon: '⚙️' },
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
          alignItems: 'flex-start',
          overflow: 'auto',
          paddingTop: '20px',
          paddingBottom: '40px'
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
                  May your life be fulfilled with colourful light, love, and endless joy this Diwali!
                </p>
                <p style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.3rem',
                  color: '#FF8C00',
                  marginTop: '20px',
                }}>
                  I hope this radiant Festival of Lights illuminate your path with boundless success, heartfelt joy, and lasting happiness. Like diya's glow and fireworks sparkle, may your dreams also shine brighter than ever, and your heart be filled with warmth, love, and togetherness.✨
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
                  "May every Diya you light bring new hope! 🪔",
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
                
                <div style={{
                  background: 'rgba(255, 215, 0, 0.08)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '20px',
                  border: '1px dashed rgba(255, 215, 0, 0.3)',
                }}>
                  <h3 style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: '1.8rem',
                    color: '#FFD700',
                    marginBottom: '15px',
                    textAlign: 'center',
                  }}>
                    🎮 Add Trivia Challenge
                  </h3>
                  <p style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: '1rem',
                    color: '#FFD700',
                    marginBottom: '15px',
                    textAlign: 'center',
                  }}>
                    Make it fun! Add a "How Well Do You Know Me?" quiz
                  </p>
                  <button 
                    onClick={() => setShowTriviaCreator(true)}
                    className="glass-button"
                    style={{ 
                      width: '100%',
                      background: triviaAnswers 
                        ? 'rgba(0, 255, 0, 0.2)' 
                        : 'rgba(255, 215, 0, 0.1)',
                    }}
                  >
                    <FaGamepad style={{ marginRight: '8px' }} />
                    {triviaAnswers ? '✓ Trivia Added!' : 'Create Trivia (Optional)'}
                  </button>
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
                    Crafted with love by BeCash✨
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