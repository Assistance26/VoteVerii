import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FcGoogle } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

// Particle system component
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    particles.current = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      color: `rgba(${Math.floor(Math.random() * 100 + 155)}, 
              ${Math.floor(Math.random() * 100 + 155)}, 
              ${Math.floor(Math.random() * 100 + 155)}, 
              ${Math.random() * 0.5 + 0.1})`
    }));

    // Mouse movement effect
    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.current.forEach(particle => {
        // Mouse attraction effect
        if (mouse.current.x && mouse.current.y) {
          const dx = mouse.current.x - particle.x;
          const dy = mouse.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            particle.x += dx * 0.01;
            particle.y += dy * 0.01;
          }
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reset particles that go off screen
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.y = Math.random() * canvas.height;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections between particles
        particles.current.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200, 200, 255, ${1 - distance/100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const redirectByRole = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'candidate') navigate('/candidate');
    else navigate('/voter');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const { user } = await login(email, password);
      const docRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        redirectByRole(role);
      } else {
        setError('No user role found. Contact support.');
      }
    } catch {
      setError('Failed to log in. Please check your credentials.');
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      const { user } = await loginWithGoogle();
      const docRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        redirectByRole(role);
      } else {
        setError('No user role found for this Google account. Please sign up first.');
      }
    } catch {
      setError('Failed to log in with Google.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 relative overflow-hidden">
      {/* Advanced Particle Background */}
      <ParticleBackground />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900/80 to-indigo-900/30 z-1" />
      
      {/* Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/5 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
          {/* Glass texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/40 to-indigo-600/40 p-6 text-white text-center relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <motion.h2 
              className="text-3xl font-bold relative z-10"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              Welcome Back
            </motion.h2>
            <p className="mt-2 opacity-80 relative z-10">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="p-8 relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm z-0" />
            <div className="relative z-10">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-900/50 border-l-4 border-red-400 text-red-100 p-4 mb-6 rounded"
                  >
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full pl-10 pr-10 py-2 border border-gray-700 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-gray-800/50 text-white placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                  <div className="mt-1 text-right">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </motion.div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 bg-gray-800/30"
                  >
                    <FcGoogle className="h-5 w-5 mr-2" />
                    Google
                  </button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-center text-sm text-gray-400"
              >
                <p>
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="font-medium text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}