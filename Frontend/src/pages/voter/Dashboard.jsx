import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VoterNavbar from '../../components/layout/VoterNavbar';
import { 
  FiArrowRight, 
  FiClock, 
  FiAward, 
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiTrendingUp
} from 'react-icons/fi';

export default function VoterDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { id: 1, title: "Active Elections", value: 3, icon: <FiAward className="w-6 h-6" />, color: "from-teal-400 to-cyan-500", link: "/voter/cast-vote" },
    { id: 2, title: "Votes Cast", value: 5, icon: <FiCheckCircle className="w-6 h-6" />, color: "from-purple-400 to-fuchsia-500", link: "/voter/election-reports" },
    { id: 3, title: "Campaigns", value: 12, icon: <FiTrendingUp className="w-6 h-6" />, color: "from-amber-400 to-orange-500", link: "/voter/campaign" }
  ];

  const elections = [
    { id: 1, title: "Student Council Election", date: "June 15, 2023", time: "09:00 AM", icon: <FiBarChart2 className="w-5 h-5" /> },
    { id: 2, title: "Class Representative", date: "June 20, 2023", time: "10:00 AM", icon: <FiCalendar className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      <VoterNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 relative">
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
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-10"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">
                  Voter Dashboard
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                  Welcome back! Here's your voting overview and upcoming elections.
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
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-xl shadow-lg`}
                  >
                    <div className="bg-gray-900 rounded-xl p-6 h-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-300">{stat.title}</p>
                          <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        </div>
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}
                        >
                          {stat.icon}
                        </motion.div>
                      </div>
                      <Link 
                        to={stat.link}
                        className="mt-4 inline-flex items-center text-sm font-medium group"
                      >
                        <motion.span
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-gray-300 group-hover:text-white"
                        >
                          View details <FiArrowRight className="w-4 h-4" />
                        </motion.span>
                        <motion.div 
                          className="h-0.5 bg-teal-500 mt-1 w-0 group-hover:w-full transition-all duration-300"
                          layoutId={`underline-${stat.id}`}
                        />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Upcoming Elections */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
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
                    <span>Upcoming Elections</span>
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-800">
                  {elections.map((election, index) => (
                    <motion.div
                      key={election.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.05)' }}
                      className="p-6 flex items-start gap-4 transition-colors"
                    >
                      <div className={`p-3 rounded-lg ${index % 2 === 0 ? 'bg-teal-500/10 text-teal-400' : 'bg-purple-500/10 text-purple-400'}`}>
                        {election.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{election.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-4 h-4" /> {election.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" /> {election.time}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/20"
                      >
                        Set Reminder
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-4 text-center border-t border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <Link to="/voter/upcoming-elections" className="text-teal-400 font-medium flex items-center justify-center gap-2">
                    View all upcoming elections <FiArrowRight className="w-4 h-4" />
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
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
