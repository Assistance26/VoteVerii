// import React, { useState, useEffect, useRef } from 'react';
// import { askChatbot } from '../services/chatbotService';

// export default function Chat() {
//   const [messages, setMessages] = useState([
//     { id: 0, sender: 'bot', text: 'Hi! How can I help you?' }
//   ]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { id: Date.now(), sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');

//     try {
//       const botReply = await askChatbot(input);
//       const botMessage = { id: Date.now() + 1, sender: 'bot', text: botReply };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       const errorMessage = { id: Date.now() + 2, sender: 'bot', text: 'Oops! Something went wrong.' };
//       setMessages((prev) => [...prev, errorMessage]);
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg flex flex-col h-[500px]">
//       <div className="flex-grow overflow-y-auto mb-4 space-y-3 px-2">
//         {messages.map(({ id, sender, text }) => (
//           <div
//             key={id}
//             className={`max-w-[80%] p-2 rounded ${
//               sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-900 self-start'
//             }`}
//           >
//             {text}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask something..."
//           className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 disabled:opacity-50"
//           disabled={!input.trim()}
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Users } from 'lucide-react';
import { sendMessageToChatbot } from '../services/chatbotService';
import { motion, AnimatePresence } from 'framer-motion';

// Simplified Particle Background with performance optimizations
const ParticleBackground = React.memo(() => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);

  const initParticles = useCallback((canvas) => {
    return Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: `rgba(180, 180, 255, ${Math.random() * 0.2 + 0.1})`
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = initParticles(canvas);
    };

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reset particles that go off screen
        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [initParticles]);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
});

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm VoteVeri Assistant 🤖. Ask me about candidates, voting, or election rules." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const botReply = await sendMessageToChatbot(input);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: botReply || "Sorry, I couldn't understand that. Could you please rephrase?" 
      }]);
    } catch {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Oops, something went wrong. Please try again.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [input]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.chat-container') && 
          !e.target.closest('.chat-toggle-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Particle Background (optimized) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <ParticleBackground />
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 z-40 pointer-events-none" />
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 chat-toggle-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={toggleChat}
          className={`bg-gradient-to-r from-purple-600 to-indigo-600 p-3 sm:p-4 rounded-full text-white shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
        </button>
      </motion.div>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 left-4 sm:bottom-24 sm:right-6 sm:left-auto z-50 w-auto sm:w-96 max-h-[70vh] chat-container"
          >
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl flex flex-col border border-white/10 h-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600/50 to-indigo-600/50 text-white p-3 sm:p-4 rounded-t-xl flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Users size={18} className="sm:size-5" />
                  <h3 className="font-semibold text-sm sm:text-base">VoteVeri Assistant</h3>
                </div>
                <motion.button 
                  onClick={toggleChat}
                  whileHover={{ rotate: 90 }}
                  className="p-1 rounded-full hover:bg-white/10"
                  aria-label="Close chat"
                >
                  <X size={18} className="sm:size-5" />
                </motion.button>
              </div>

              {/* Messages */}
              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-3 space-y-2"
              >
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[85%] text-xs sm:text-sm ${
                        msg.sender === 'bot'
                          ? 'bg-gray-700/60 text-gray-100'
                          : 'bg-gradient-to-r from-purple-500/90 to-indigo-500/90 text-white'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start items-center space-x-2 p-2"
                  >
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce" 
                          style={{ animationDelay: `${i * 150}ms` }} 
                        />
                      ))}
                    </div>
                    <span className="text-purple-300 text-xs sm:text-sm">Typing...</span>
                  </motion.div>
                )}
              </div>

              {/* Input Form */}
              <form 
                onSubmit={handleSubmit} 
                className="flex border-t border-white/10 p-2 sm:p-3 bg-gray-800/30"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about elections..."
                  className="flex-grow px-3 py-2 text-xs sm:text-sm rounded-l-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500/50 border border-gray-600"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim()}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 rounded-r-lg ${
                    !input.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send size={16} className="sm:size-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Chat);