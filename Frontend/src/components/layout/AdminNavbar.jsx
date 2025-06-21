import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiHome,
  FiUserPlus,
  FiCheckSquare,
  FiKey,
  FiLogOut,
  FiMenu,
  FiX,
  FiBarChart2
} from 'react-icons/fi';

export default function AdminNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/admin", icon: <FiHome className="w-5 h-5" /> },
    { name: "Approve Candidates", path: "/admin/approvals", icon: <FiUserPlus className="w-5 h-5" /> },
    { name: "Create Election", path: "/admin/create-election", icon: <FiCheckSquare className="w-5 h-5" /> },
    { name: "Reports", path: "/admin/election-reports", icon: <FiBarChart2 className="w-5 h-5" /> },
    { name: "Close Election", path: "/admin/close-election", icon: <FiKey className="w-5 h-5" /> }
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
        className="bg-gradient-to-r from-red-700 to-rose-800 text-white shadow-lg sticky top-0 z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/admin" className="flex items-center space-x-2">
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
                  className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
                >
                  <FiHome className="text-xl text-white" />
                </motion.div>
                <span className="text-xl font-bold">VoteVeri Admin</span>
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
                    className="px-4 py-2 rounded-lg text-white/90 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {item.icon}
                    {item.name}
                    <motion.div 
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-white rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(239, 68, 68, 0.9)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium flex items-center gap-2"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-red-800 to-rose-900 shadow-xl"
            >
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">VoteVeri Admin</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
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
                      className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
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
                    className="w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 flex items-center gap-3"
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