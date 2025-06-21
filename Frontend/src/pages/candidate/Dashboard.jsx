import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiActivity, 
  FiBarChart2, 
  FiAward, 
  FiClock, 
  FiPlus, 
  FiEye,
  FiArrowRight,
  FiMenu,
  FiX
} from 'react-icons/fi';
import CandidateNavbar from '../../components/layout/CandidateNavbar';

const StatCard = ({ title, value, color, icon, linkText, to, delay }) => {
  const colorMap = {
    teal: 'from-teal-500 to-cyan-600',
    purple: 'from-purple-500 to-fuchsia-600',
    amber: 'from-amber-500 to-orange-600',
    indigo: 'from-indigo-500 to-blue-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      whileTap={{ scale: 0.98 }}
      className={`bg-gradient-to-br ${colorMap[color]} p-0.5 rounded-xl shadow-lg h-full`}
    >
      <div className="bg-gray-900 rounded-xl p-6 h-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-300">{title}</p>
            <motion.p 
              className="text-3xl font-bold mt-2"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2 }}
            >
              {value}
            </motion.p>
          </div>
          <motion.div
            animate={{
              rotate: [0, 10, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className={`p-3 rounded-lg bg-gradient-to-br ${colorMap[color]} bg-opacity-20`}
          >
            {icon}
          </motion.div>
        </div>
        <motion.div
          whileHover={{ x: 5 }}
          className="mt-6"
        >
          <Link 
            to={to} 
            className="flex items-center text-sm font-medium text-gray-300 hover:text-white group"
          >
            <span className="flex items-center gap-2">
              {linkText} <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <motion.div 
              className="h-0.5 bg-teal-500 mt-1 w-0 group-hover:w-full transition-all duration-300"
              layoutId={`underline-${title}`}
            />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ActivityItem = ({ title, time, icon, color, delay }) => {
  const colorMap = {
    teal: 'bg-teal-500/10 text-teal-400',
    purple: 'bg-purple-500/10 text-purple-400',
    amber: 'bg-amber-500/10 text-amber-400',
    indigo: 'bg-indigo-500/10 text-indigo-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ 
        x: 5,
        backgroundColor: 'rgba(20, 184, 166, 0.05)'
      }}
      className="p-4 rounded-lg transition-colors border-b border-gray-800 last:border-0"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
            <FiClock className="w-4 h-4" /> {time}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function CandidateDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    {
      title: "Active Campaigns",
      value: "2",
      color: "teal",
      icon: <FiAward className="w-6 h-6" />,
      linkText: "Manage Campaigns",
      to: "/candidate/add-campaign"
    },
    {
      title: "Participating Elections",
      value: "3",
      color: "purple",
      icon: <FiBarChart2 className="w-6 h-6" />,
      linkText: "View Elections",
      to: "/candidate/participate-vote"
    },
    {
      title: "Total Votes Received",
      value: "124",
      color: "amber",
      icon: <FiActivity className="w-6 h-6" />,
      linkText: "View Details",
      to: "/candidate/registered-vote"
    }
  ];

  const activities = [
    {
      title: "New vote in Student Council Election",
      time: "2 hours ago",
      icon: <FiPlus className="w-5 h-5" />,
      color: "teal"
    },
    {
      title: "Campaign 'Better Campus Life' published",
      time: "1 day ago",
      icon: <FiEye className="w-5 h-5" />,
      color: "indigo"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-600 rounded-full mix-blend-overlay opacity-5 filter blur-3xl pointer-events-none"
      />
      
      <motion.div 
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-overlay opacity-5 filter blur-3xl pointer-events-none"
      />

      <CandidateNavbar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-16 h-16 rounded-full border-4 border-teal-500 border-t-transparent"
            />
          </motion.div>
        ) : (
          <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
                Candidate Dashboard
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl">
                Welcome back! Here's your campaign overview and recent activity.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            >
              {stats.map((stat, index) => (
                <StatCard 
                  key={index} 
                  {...stat} 
                  delay={0.3 + index * 0.1}
                />
              ))}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 4, repeat: Infinity }
                    }}
                  >
                    <FiClock className="text-teal-400" />
                  </motion.div>
                  <span>Recent Activity</span>
                </h2>
              </div>
              
              <div className="divide-y divide-gray-800">
                {activities.map((activity, index) => (
                  <ActivityItem 
                    key={index} 
                    {...activity} 
                    delay={0.7 + index * 0.1}
                  />
                ))}
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="p-4 text-center border-t border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <Link 
                  to="/candidate/activity" 
                  className="text-teal-400 font-medium flex items-center justify-center gap-2"
                >
                  View all activity <FiArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

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
              className="absolute top-20 right-20 w-2 h-2 bg-teal-400 rounded-full opacity-70 pointer-events-none"
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
              className="absolute bottom-20 left-24 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60 pointer-events-none"
            />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}