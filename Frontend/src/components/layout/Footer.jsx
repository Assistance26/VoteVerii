import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin, FaShieldAlt, FaLock } from 'react-icons/fa';
import { SiBlockchaindotcom } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hover: {
      y: -3,
      color: "#a78bfa",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      color: "#8b5cf6",
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white pt-12 pb-8 border-t border-indigo-800/50"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <SiBlockchaindotcom className="text-3xl text-purple-400" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
                VoteVeri
              </span>
            </motion.div>
            <p className="text-gray-300">
              Revolutionizing democracy through blockchain-powered secure voting.
            </p>
            <div className="flex space-x-4">
              {[FaTwitter, FaGithub, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  variants={iconVariants}
                  whileHover="hover"
                  className="text-gray-400 hover:text-purple-400 text-xl"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Features', 'How It Works', 'Pricing'].map((item, index) => (
                <motion.li key={index} whileHover="hover" variants={linkVariants}>
                  <a href="#" className="text-gray-300 hover:text-purple-400">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Resources</h3>
            <ul className="space-y-2">
              {['Documentation', 'API Status', 'Guides', 'Blog'].map((item, index) => (
                <motion.li key={index} whileHover="hover" variants={linkVariants}>
                  <a href="#" className="text-gray-300 hover:text-purple-400">{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Security Badge */}
          <div className="bg-gray-800/30 backdrop-blur-md border border-indigo-800/30 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <FaLock className="text-purple-400 text-xl" />
              <span className="font-medium text-purple-300">Security Verified</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              VoteVeri uses military-grade encryption and blockchain technology to ensure your vote is secure.
            </p>
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="text-green-400" />
              <span className="text-sm text-green-400">100% Tamper-Proof</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-800/50 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item, index) => (
              <motion.a 
                key={index}
                href="#"
                whileHover="hover"
                variants={linkVariants}
                className="text-gray-400 hover:text-purple-400 text-sm"
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <span className="text-gray-400 text-sm">© {currentYear} VoteVeri. All rights reserved.</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{
          y: [0, -10, 0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-10 w-3 h-3 bg-purple-400 rounded-full opacity-30"
      ></motion.div>
      <motion.div 
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-32 right-16 w-4 h-4 bg-indigo-400 rounded-full opacity-20"
      ></motion.div>
    </motion.footer>
  );
};

export default Footer;