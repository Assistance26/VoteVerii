import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiHome,
  FiPlusCircle,
  FiCheckCircle,
  FiBarChart2,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';

export default function CandidateNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/candidate", icon: <FiHome className="w-5 h-5" /> },
    { name: "Add Campaign", path: "/candidate/add-campaign", icon: <FiPlusCircle className="w-5 h-5" /> },
    { name: "Participate", path: "/candidate/participate-election", icon: <FiCheckCircle className="w-5 h-5" /> },
    { name: "Reports", path: "/candidate/election-reports", icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: "Profile", path: "/candidate/profile", icon: <FiUser className="w-5 h-5" /> }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
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

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 text-white sticky top-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/candidate" className="flex items-center space-x-2">
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
                  <FiHome className="text-xl text-white" />
                </motion.div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
                  VoteVeri
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div 
                  key={item.name}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <Link 
                    to={item.path}
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {item.icon}
                    {item.name}
                    <motion.div 
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-teal-500 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(to right, #ef4444, #dc2626)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-sm font-medium shadow-lg shadow-red-500/20 flex items-center gap-2"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300"
              whileHover={{ 
                backgroundColor: "rgba(17, 24, 39, 0.7)",
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
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
                    <FiHome className="text-xl text-white" />
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
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center gap-3"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4"
                >
                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg flex items-center gap-3"
                  >
                    <FiLogOut className="w-5 h-5" />
                    Logout
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}