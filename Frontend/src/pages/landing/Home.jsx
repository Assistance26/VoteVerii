import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Replace `useRouter`
import MainNavbar from '../../components/layout/MainNavbar';
import Footer from '../../components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShield, FiLock, FiCheckCircle, FiBarChart2, FiGlobe, FiMenu, FiX } from 'react-icons/fi';

export default function Home() {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      title: "Military-Grade Security",
      description: "Blockchain-powered encryption ensures your vote is anonymous and tamper-proof.",
      icon: <FiShield className="w-6 h-6" />
    },
    {
      title: "Instant Verification",
      description: "Real-time vote tracking with cryptographic proof of your submission.",
      icon: <FiCheckCircle className="w-6 h-6" />
    },
    {
      title: "Global Accessibility",
      description: "Vote from anywhere in the world with our mobile-friendly platform.",
      icon: <FiGlobe className="w-6 h-6" />
    },
    {
      title: "Transparent Results",
      description: "Publicly verifiable results with full audit trails for complete trust.",
      icon: <FiBarChart2 className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
 

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Mobile menu overlay */}
      {/* <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gray-950/90 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence> */}

      {/* Mobile menu button */}
      {/* <div className="lg:hidden fixed top-4 right-4 z-30">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div> */}

      <MainNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-teal-900/30"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            
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
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-600 rounded-full mix-blend-overlay opacity-10 filter blur-3xl"
            ></motion.div>
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
              className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-overlay opacity-10 filter blur-3xl"
            ></motion.div>
          </div>
          
          <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-800/50 backdrop-blur-md rounded-full border border-teal-500/30 text-teal-400 text-sm font-medium"
              >
                <FiLock className="w-4 h-4" /> Trusted by millions worldwide
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                The Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">Digital Democracy</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
              >
                VoteVeri revolutionizes elections with blockchain technology, ensuring security, transparency, and accessibility for all.
              </motion.p>
              
             <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex flex-col sm:flex-row justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg font-medium shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300 flex items-center justify-center gap-2"
          onClick={() => navigate('/login')} // This will now work
        >
          Get Started <FiArrowRight className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-teal-400/50 rounded-lg font-medium hover:bg-teal-900/20 transition-all duration-300"
        >
          How It Works
        </motion.button>
      </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">VoteVeri</span></h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Cutting-edge technology meets election integrity</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 h-full"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentFeature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="h-full flex flex-col"
                    >
                      <div className="text-teal-400 mb-4">
                        {features[currentFeature].icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{features[currentFeature].title}</h3>
                      <p className="text-gray-300 mb-6">{features[currentFeature].description}</p>
                      <div className="mt-auto flex space-x-2">
                        {features.map((_, index) => (
                          <button 
                            key={index}
                            onClick={() => setCurrentFeature(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentFeature ? 'bg-teal-500 w-4' : 'bg-gray-600'}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                
                <motion.div 
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-4 -left-4 w-24 h-24 bg-teal-900/20 rounded-full border border-dashed border-teal-500/20 pointer-events-none"
                ></motion.div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className={`bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-lg p-5 cursor-pointer transition-all duration-300 hover:border-teal-500/30 ${index === currentFeature ? 'ring-2 ring-teal-500/30' : ''}`}
                    onClick={() => setCurrentFeature(index)}
                  >
                    <div className={`mb-3 inline-flex items-center justify-center w-10 h-10 rounded-lg ${index % 2 === 0 ? 'bg-teal-500/10 text-teal-400' : 'bg-purple-500/10 text-purple-400'}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-teal-900/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <motion.div 
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-overlay opacity-10 filter blur-3xl"
          ></motion.div>
          
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center"
            >
              {[
                { number: "10M+", label: "Verified Votes" },
                { number: "100%", label: "Audit Accuracy" },
                { number: "50+", label: "Countries" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-lg p-6"
                >
                  <motion.p 
                    className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-2"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-teal-900/30"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-8 md:p-10 text-center max-w-3xl mx-auto"
            >
              <motion.div 
                animate={{ 
                  rotate: isHovering ? 360 : 0,
                  scale: isHovering ? 1.1 : 1
                }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <FiCheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience the Future of Voting?</h2>
              <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">Join thousands of organizations and governments who trust VoteVeri for secure, transparent elections.</p>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg font-medium shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300 flex items-center gap-2 mx-auto">
                  Request a Demo <FiArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}