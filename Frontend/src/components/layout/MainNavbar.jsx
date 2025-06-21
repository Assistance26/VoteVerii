import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVoteYea, FaSignInAlt } from 'react-icons/fa';
import { SiBlockchaindotcom } from 'react-icons/si';
import { FiMenu, FiX } from 'react-icons/fi';

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Home", path: "/", icon: <FaVoteYea className="w-4 h-4" /> },
    { name: "Campaign", path: "/campaign", icon: <SiBlockchaindotcom className="w-4 h-4" /> },
    { name: "Login", path: "/login", icon: <FaSignInAlt className="w-4 h-4" /> }
  ];

  const hoverEffect = {
    y: -2,
    color: "#5eead4", // teal-300
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const tapEffect = {
    scale: 0.95,
    transition: { duration: 0.1 }
  };

  const underlineAnimation = {
    initial: { width: 0, opacity: 0 },
    hover: { width: "100%", opacity: 1 }
  };

  const mobileMenuVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '-100%', 
      opacity: 0,
      transition: { 
        ease: 'easeIn',
        duration: 0.3 
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 text-white sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={tapEffect}
            >
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-purple-600 shadow-lg"
                >
                  <SiBlockchaindotcom className="text-xl text-white" />
                </motion.div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
                  VoteVeri
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  whileHover="hover"
                  initial="initial"
                  custom={index}
                >
                  <Link 
                    to={item.path} 
                    className={`flex items-center px-3 py-2 font-medium text-sm ${
                      item.name === "Login" 
                        ? "px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-purple-700 text-white shadow-lg shadow-teal-500/20"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <motion.span
                      variants={item.name === "Login" ? {} : hoverEffect}
                      className="flex items-center gap-2"
                    >
                      {item.icon}
                      {item.name}
                    </motion.span>
                  </Link>
                  {item.name !== "Login" && (
                    <motion.div
                      variants={underlineAnimation}
                      className="absolute bottom-1 left-0 h-0.5 bg-teal-400 rounded-full"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300"
              whileHover={{ 
                backgroundColor: "rgba(17, 24, 39, 0.7)",
                scale: 1.1
              }}
              whileTap={tapEffect}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Floating Particles */}
        <motion.div 
          animate={{
            x: [0, 15, 0],
            y: [0, -8, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-4 right-20 w-2 h-2 bg-teal-400 rounded-full opacity-70"
        />
        <motion.div 
          animate={{
            x: [0, -12, 0],
            y: [0, 8, 0],
            opacity: [0.5, 0.9, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-6 left-24 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60"
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gray-950/90 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                    className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-purple-600 shadow-lg"
                  >
                    <SiBlockchaindotcom className="text-xl text-white" />
                  </motion.div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
                    VoteVeri
                  </span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white"
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              </div>

              <nav className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={index}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                        item.name === "Login"
                          ? "bg-gradient-to-r from-teal-600 to-purple-700 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      <motion.span 
                        animate={item.name === "Login" ? {
                          scale: [1, 1.05, 1],
                          transition: { repeat: Infinity, duration: 2 }
                        } : {}}
                        className="flex items-center gap-3"
                      >
                        {item.icon}
                        {item.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { duration: 3, repeat: Infinity }
                }}
                className="absolute bottom-4 left-4 right-4 p-2 bg-gray-800/50 rounded-lg border border-gray-700 text-center text-xs text-gray-400"
              >
                Secure Blockchain Voting
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}