import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      {/* Animated secure voting container */}
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0.7 }}
        animate={{ 
          scale: [0.9, 1, 0.9],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Voting box */}
        <div className="w-20 h-24 bg-white border-2 border-indigo-600 rounded-lg shadow-md relative overflow-hidden">
          {/* Animated security shield */}
          <motion.div
            className="absolute top-2 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg 
              className="w-8 h-8 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
          </motion.div>

          {/* Animated voting papers sliding in */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-4 bg-indigo-100 rounded-sm left-1/2 transform -translate-x-1/2"
                style={{ bottom: `${i * 6}px` }}
                initial={{ x: i % 2 === 0 ? '-100%' : '100%', opacity: 0 }}
                animate={{ 
                  x: '-50%',
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: i * 0.3,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Lock animation */}
          <motion.div
            className="absolute bottom-2 right-2"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg 
              className="w-5 h-5 text-indigo-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Encrypting text animation */}
      <motion.div
        className="text-indigo-700 font-medium text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Securing your vote...
      </motion.div>

      {/* Binary code animation for high-tech feel */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.span
            key={i}
            className="text-xs text-gray-400"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              y: [0, -2, 0]
            }}
            transition={{
              delay: i * 0.1,
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {Math.round(Math.random())}
          </motion.span>
        ))}
      </div>
    </div>
  );
}