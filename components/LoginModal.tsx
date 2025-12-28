
import React, { useState } from 'react';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  // Form States
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [masterPin, setMasterPin] = useState('');

  if (!isOpen) return null;

  // Secret activation of Admin Mode by clicking the logo 5 times
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setIsAdminMode(true);
      setClickCount(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- Secure Admin Verification Logic ---
    if (isAdminMode) {
      if (
        email === 'awasthi_sir_history_admin' && 
        password === 'Awasthi#Master@2025' && 
        masterPin === '7007'
      ) {
        onLogin({ 
          id: 'admin_master', 
          email: 'admin@historywithmohit.in', 
          name: 'Mohit Awasthi (Admin)', 
          isAdmin: true, 
          isPremium: true 
        });
        onClose();
        return;
      } else {
        alert('SECURITY ALERT: Invalid Master Credentials!');
        setIsAdminMode(false);
        return;
      }
    }

    // --- Standard Student Login/SignUp ---
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    if (isSignUp) {
      const newUser: User = { 
        id: Math.random().toString(36).substr(2, 9), 
        email, 
        name: name || email.split('@')[0], 
        isPremium: false, 
        isAdmin: false 
      };
      users.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(users));
      onLogin(newUser);
    } else {
      const existingUser = users.find((u: User) => u.email === email);
      if (existingUser) {
        onLogin(existingUser);
      } else {
        alert('User not found. Please sign up.');
        return;
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className={`w-full max-w-md rounded-[3rem] p-10 md:p-12 shadow-2xl relative border-4 transition-all duration-500 ${isAdminMode ? 'bg-slate-950 border-red-900/20' : 'bg-white border-slate-100'}`}>
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="text-center mb-10">
          <button 
            onClick={handleLogoClick}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-6 shadow-xl transition-transform active:scale-90 ${isAdminMode ? 'bg-red-600 animate-pulse ring-4 ring-red-500/20' : 'bg-orange-600'}`}
          >
            MA
          </button>
          <h2 className={`text-3xl font-black tracking-tight ${isAdminMode ? 'text-red-500' : 'text-slate-800'}`}>
            {isAdminMode ? 'Master Access' : (isSignUp ? 'Join Academy' : 'Student Portal')}
          </h2>
          <p className={`text-sm font-medium mt-2 ${isAdminMode ? 'text-slate-500' : 'text-slate-500'}`}>
            {isAdminMode ? 'Verify identity to access control center' : (isSignUp ? 'Create your profile to start studying' : 'Log in to access your study materials')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isAdminMode ? (
            // --- Admin Specific Fields ---
            <>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-red-500/50 mb-2 ml-1">Admin Identity ID</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium text-white transition" 
                  placeholder="Master ID..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-red-500/50 mb-2 ml-1">Master Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none text-sm font-medium text-white transition" 
                  placeholder="Password..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-red-500/50 mb-2 ml-1">Secret 4-Digit PIN</label>
                <input 
                  type="password" 
                  maxLength={4}
                  required
                  value={masterPin}
                  onChange={e => setMasterPin(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none text-center text-2xl font-black text-white tracking-[0.5em] transition" 
                  placeholder="****"
                />
              </div>
              <button type="submit" className="w-full bg-red-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-red-900/40 hover:bg-red-700 transition active:scale-95 uppercase tracking-widest text-xs mt-4">
                Verify Master Access
              </button>
              <button 
                type="button"
                onClick={() => setIsAdminMode(false)}
                className="w-full text-[10px] font-black text-slate-600 uppercase tracking-widest py-2 hover:text-slate-400"
              >
                Back to Student Login
              </button>
            </>
          ) : (
            // --- Standard Form ---
            <>
              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium transition" 
                  />
                </div>
              )}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium transition" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-sm font-medium transition" 
                />
              </div>
              
              <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-black transition active:scale-95 uppercase tracking-widest text-xs">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              <div className="text-center pt-8 border-t border-slate-100 mt-6">
                <p className="text-xs text-slate-500 font-medium">
                  {isSignUp ? 'Already have an account?' : 'New student?'} 
                  <button 
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-orange-600 font-bold hover:underline ml-1"
                  >
                    {isSignUp ? 'Sign In' : 'Create an account'}
                  </button>
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
