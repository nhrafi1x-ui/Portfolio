import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { signInWithGoogle } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-cream p-8 shadow-2xl border border-gold/20 overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/30 -translate-x-2 translate-y-2 pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-3xl font-serif mb-6 text-charcoal">Only For The Owner</h2>

          <div className="flex gap-4 border-b border-charcoal/10 mb-8">
            <button 
              onClick={() => setTab('login')}
              className={`pb-2 px-1 text-sm uppercase tracking-widest transition-all duration-300 relative ${tab === 'login' ? 'text-charcoal' : 'text-charcoal/40'}`}
            >
              Login
              {tab === 'login' && <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 w-full h-px bg-gold" />}
            </button>
            <button 
              onClick={() => setTab('register')}
              className={`pb-2 px-1 text-sm uppercase tracking-widest transition-all duration-300 relative ${tab === 'register' ? 'text-charcoal' : 'text-charcoal/40'}`}
            >
              Register
              {tab === 'register' && <motion.div layoutId="auth-tab" className="absolute bottom-0 left-0 w-full h-px bg-gold" />}
            </button>
          </div>

          <div className="space-y-6">
            <button 
              onClick={async () => {
                await signInWithGoogle();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-3 py-3 border border-charcoal/20 bg-white hover:border-gold transition-all duration-300 text-charcoal font-medium shadow-sm active:scale-[0.98]"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-charcoal/10" /></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-charcoal/30 bg-cream px-2">OR</div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white border border-charcoal/10 p-3 focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-charcoal/50 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-white border border-charcoal/10 p-3 focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full gold-button py-3 font-medium uppercase tracking-widest text-sm"
              >
                {tab === 'login' ? 'Enter Space' : 'Join Space'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
