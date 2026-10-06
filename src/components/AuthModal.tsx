import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, Mail, User, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
  lang: 'mm' | 'en';
  theme: 'dark' | 'light';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, lang, theme }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) return;

    const userName = isSignUp ? name : email.split('@')[0];
    onLoginSuccess({ name: userName, email });
    onClose();
    alert(lang === 'mm' ? 'အကောင့်ဝင်ရောက်မှု အောင်မြင်ပါသည်။' : 'Successfully logged in!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`w-full max-w-md border rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-xl border transition-colors ${
            isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-600/30 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isSignUp 
              ? (lang === 'mm' ? 'အကောင့်အသစ်ဖွင့်ရန် (Sign Up)' : 'Create an Account') 
              : (lang === 'mm' ? 'အကောင့်ဝင်ရန် (Log In)' : 'Welcome Back')}
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            {lang === 'mm' ? 'AuraLearn Academy သို့ ကြိုဆိုပါသည်။' : 'Access your courses and certificates.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">{lang === 'mm' ? 'အမည် (Name)' : 'Full Name'}</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'mm' ? 'သင်၏နာမည်ထည့်ပါ' : 'Enter your name'}
                  className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm border focus:outline-none focus:border-indigo-500 ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">{lang === 'mm' ? 'အီးမေးလ် (Email)' : 'Email Address'}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm border focus:outline-none focus:border-indigo-500 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">{lang === 'mm' ? 'စကားဝှက် (Password)' : 'Password'}</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full rounded-xl pl-10 pr-4 py-3 text-sm border focus:outline-none focus:border-indigo-500 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all mt-2"
          >
            {isSignUp ? (lang === 'mm' ? 'အကောင့်ဖွင့်မည်' : 'Sign Up') : (lang === 'mm' ? 'အကောင့်ဝင်မည်' : 'Log In')}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          {isSignUp ? (
            <p>
              {lang === 'mm' ? 'အကောင့်ရှိပြီးသားလား?' : 'Already have an account?'}{' '}
              <button onClick={() => setIsSignUp(false)} className="text-indigo-500 font-bold hover:underline">
                {lang === 'mm' ? 'အကောင့်ဝင်ရန်' : 'Log In'}
              </button>
            </p>
          ) : (
            <p>
              {lang === 'mm' ? 'အကောင့်အသစ် မရှိသေးဘူးလား?' : "Don't have an account?"}{' '}
              <button onClick={() => setIsSignUp(true)} className="text-indigo-500 font-bold hover:underline">
                {lang === 'mm' ? 'အကောင့်အသစ်ဖွင့်ရန်' : 'Sign Up'}
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
