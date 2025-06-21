import { useEffect } from 'react';
import { motion } from 'framer-motion';

const NotFound = () => {
  // Optional: Change document title
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 rounded-3xl shadow-xl bg-white bg-opacity-90 backdrop-blur-sm max-w-md w-full"
      >
        {/* Floating emoji */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6"
        >
          <svg
            className="w-32 h-32 mx-auto text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>

        {/* 404 Text */}
        <motion.h1 
          className="text-8xl md:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p 
          className="mt-4 text-2xl font-medium text-gray-700"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Oops! Page not found
        </motion.p>

        <motion.p 
          className="mt-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <motion.a
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Return Home
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Footer link */}
      <motion.div 
        className="mt-12 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p>Need help? <a href="/contact" className="text-indigo-500 hover:underline">Contact support</a></p>
      </motion.div>
    </div>
  );
};

export default NotFound;