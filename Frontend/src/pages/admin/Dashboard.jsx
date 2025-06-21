import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiAward, FiBarChart2, FiClock, FiShield, FiActivity } from 'react-icons/fi';
import AdminNavbar from '../../components/layout/AdminNavbar';

const StatCard = ({ title, value, color, icon, trend }) => {
  const colors = {
    blue: { bg: 'from-blue-500 to-blue-600', text: 'text-blue-100' },
    green: { bg: 'from-emerald-500 to-teal-600', text: 'text-emerald-100' },
    purple: { bg: 'from-purple-500 to-indigo-600', text: 'text-purple-100' },
    amber: { bg: 'from-amber-500 to-orange-500', text: 'text-amber-100' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-gradient-to-br ${colors[color].bg} rounded-xl shadow-lg overflow-hidden`}
    >
      <div className="p-6">
        <div className="flex justify-between">
          <div>
            <p className={`text-sm font-medium ${colors[color].text} opacity-90`}>{title}</p>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
          </div>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-3xl text-white opacity-80"
          >
            {icon}
          </motion.div>
        </div>
        {trend && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center"
          >
            <span className="text-xs bg-white/20 px-2 py-1 rounded-md">{trend}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ActivityItem = ({ title, time, icon, isNew }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="border-b border-gray-700/30 pb-4 last:border-0"
  >
    <div className="flex items-start">
      <div className="relative">
        <div className="bg-indigo-500/20 p-2 rounded-lg mr-4 text-indigo-400">
          {icon}
        </div>
        {isNew && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"
          />
        )}
      </div>
      <div>
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Votes",
      value: "1,234",
      color: "blue",
      icon: <FiBarChart2 />,
      trend: "+12% this week"
    },
    {
      title: "Active Elections",
      value: "5",
      color: "green",
      icon: <FiAward />,
      trend: "2 ending soon"
    },
    {
      title: "Registered Candidates",
      value: "24",
      color: "purple",
      icon: <FiUsers />,
      trend: "+3 new"
    },
    {
      title: "Registered Voters",
      value: "1,024",
      color: "amber",
      icon: <FiShield />,
      trend: "98% verified"
    }
  ];

  const activities = [
    {
      title: "New election 'Student Council 2023' created",
      time: "2 minutes ago",
      icon: <FiActivity />,
      isNew: true
    },
    {
      title: "Candidate registration for 'Faculty Board' closed",
      time: "1 hour ago",
      icon: <FiClock />
    },
    {
      title: "System maintenance completed",
      time: "3 hours ago",
      icon: <FiShield />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <AdminNavbar />
      
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">System overview and quick actions</p>
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <AnimatePresence>
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                {...stat}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Activity Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-md border border-gray-700/30 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center text-white">
                <FiActivity className="mr-2 text-blue-400" /> Recent Activity
              </h2>
              <button className="text-sm text-blue-400 hover:underline">
                View All Activity
              </button>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {activities.map((activity, index) => (
                  <ActivityItem 
                    key={index} 
                    {...activity} 
                    transition={{ delay: index * 0.1 }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div 
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="fixed top-1/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-30 pointer-events-none"
        />
        <motion.div 
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="fixed bottom-1/4 right-1/4 w-4 h-4 bg-purple-400 rounded-full opacity-20 pointer-events-none"
        />
      </main>
    </motion.div>
  );
}