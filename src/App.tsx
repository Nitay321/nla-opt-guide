import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import Home from './pages/Home';
import ChapterPage from './pages/ChapterPage';
import FormulaBoard from './pages/FormulaBoard';
import { FunctionSquare, Home as HomeIcon, Sun, Moon, Languages, ZoomIn, ZoomOut, Share2, Copy, Check, X, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isRealDatabaseConnected } from './supabaseClient';
import GoogleSignInButton from './components/GoogleSignInButton';
import { formulas } from './data/formulas';

// Injected by Vite define config
declare const __LOCAL_IP__: string;

// Global Context
interface AppContextType {
  language: 'en' | 'he';
  zoom: number;
  toggleLanguage: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  // Auth state
  user: any;
  signInWithGoogle: () => void;
  signOut: () => void;
  isSyncing: boolean;
  triggerSync: (forcedProgress?: Record<string, 'green' | 'yellow' | 'red' | null | boolean>, forcedAvatarUrl?: string) => Promise<void>;
  seenFormulas: Record<string, 'green' | 'yellow' | 'red' | null | boolean>;
  toggleSeenFormula: (id: string, status?: 'green' | 'yellow' | 'red' | null) => void;
  updateUserAvatar: (avatarId: string) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

function ShareModal({ onClose, language }: { onClose: () => void; language: 'en' | 'he' }) {
  const isHe = language === 'he';
  const publicUrl = 'https://nitay321.github.io/prob-stats-guide/';
  
  // Local network state (collapsible)
  const [showLocalOptions, setShowLocalOptions] = useState(false);
  const port = window.location.port || '5173';
  const [ipAddress, setIpAddress] = useState(() => {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return hostname;
    }
    return typeof __LOCAL_IP__ !== 'undefined' && __LOCAL_IP__ !== 'localhost' ? __LOCAL_IP__ : '';
  });
  
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedLocal, setCopiedLocal] = useState(false);

  // Compute final local share URL
  const activeIp = ipAddress || (typeof __LOCAL_IP__ !== 'undefined' && __LOCAL_IP__ !== 'localhost' ? __LOCAL_IP__ : '192.168.1.100');
  const localShareUrl = `${window.location.protocol}//${activeIp}:${port}`;

  const handleCopyPublic = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopiedPublic(true);
      setTimeout(() => setCopiedPublic(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyLocal = async () => {
    try {
      await navigator.clipboard.writeText(localShareUrl);
      setCopiedLocal(true);
      setTimeout(() => setCopiedLocal(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        style={{
          background: 'var(--bg-color)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          maxWidth: '460px',
          width: '100%',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
          textAlign: isHe ? 'right' : 'left',
          direction: isHe ? 'rtl' : 'ltr'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: isHe ? 'auto' : '1.25rem',
            left: isHe ? '1.25rem' : 'auto',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}
          className="hover-scale"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            padding: '0.5rem',
            borderRadius: 'var(--radius-sm)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Share2 size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              {isHe ? '׳©׳×׳£ ׳׳×׳¨ ׳׳™׳׳•׳“׳™' : 'Share Study Guide'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
              {isHe ? '׳©׳×׳£ ׳׳× ׳”׳§׳™׳©׳•׳¨ ׳”׳¦׳™׳‘׳•׳¨׳™ ׳¢׳ ׳—׳‘׳¨׳™׳ ׳•׳§׳•׳׳’׳•׳×' : 'Share the public link with friends and colleagues'}
            </p>
          </div>
        </div>

        {/* Public Sharing Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          
          {/* Public Link Copy Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {isHe ? '׳§׳™׳©׳•׳¨ ׳¦׳™׳‘׳•׳¨׳™:' : 'Public Link:'}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--math-bg)',
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--surface-border)',
              direction: 'ltr'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent-color)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {publicUrl}
              </span>
              <button 
                onClick={handleCopyPublic}
                style={{
                  padding: '0.35rem 0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.78rem',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  background: copiedPublic ? 'var(--success)' : 'var(--primary-color)',
                  color: 'white',
                  transition: 'all 0.2s ease',
                  fontWeight: 500
                }}
              >
                {copiedPublic ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedPublic ? (isHe ? '׳”׳•׳¢׳×׳§!' : 'Copied!') : (isHe ? '׳”׳¢׳×׳§' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* QR Code Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255, 255, 255, 0.01)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--surface-border)'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {isHe ? '׳¡׳¨׳•׳§ ׳§׳•׳“ ׳–׳” ׳׳’׳™׳©׳” ׳׳™׳™׳“׳™׳× ׳׳›׳ ׳׳›׳©׳™׳¨:' : 'Scan to access instantly from any device:'}
            </span>
            <div style={{
              background: 'white',
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(publicUrl)}`} 
                alt="QR Code" 
                style={{ width: '150px', height: '150px', display: 'block' }}
              />
            </div>
          </div>

          {/* Collapsible Local Wi-Fi sharing panel for Developers */}
          <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
            <button 
              onClick={() => setShowLocalOptions(!showLocalOptions)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: 0,
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <span>{isHe ? '׳׳₪׳©׳¨׳•׳™׳•׳× ׳׳₪׳×׳— (׳—׳™׳‘׳•׳¨ ׳׳§׳•׳׳™)' : 'Developer Options (Local Wi-Fi)'}</span>
              <span>{showLocalOptions ? 'ג–¼' : 'ג–¶'}</span>
            </button>

            {showLocalOptions && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  <strong>{isHe ? '׳—׳™׳‘׳•׳¨ Wi-Fi ׳׳§׳•׳׳™:' : 'Local Wi-Fi connection:'}</strong>
                  <div style={{ marginTop: '0.35rem' }}>
                    {isHe ? '׳”׳–׳ ׳׳× ׳”-IP ׳”׳׳§׳•׳׳™ ׳©׳ ׳׳—׳©׳‘ ׳”׳₪׳™׳×׳•׳— ׳©׳׳:' : "Enter your hosting computer's local IP:"}
                  </div>
                  <input 
                    type="text" 
                    placeholder="e.g. 192.168.0.110" 
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.35rem',
                      background: 'rgba(0,0,0,0.2)',
                      border: '1px solid var(--surface-border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                      textAlign: 'center',
                      direction: 'ltr'
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', background: 'var(--math-bg)', padding: '0.4rem 0.5rem', borderRadius: 'var(--radius-sm)', direction: 'ltr' }}>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.75rem', color: 'var(--accent-color)' }}>
                      {localShareUrl}
                    </span>
                    <button 
                      onClick={handleCopyLocal}
                      style={{
                        padding: '0.25rem 0.4rem',
                        fontSize: '0.7rem',
                        background: copiedLocal ? 'var(--success)' : 'rgba(255,255,255,0.08)',
                        border: 'none',
                        color: 'white',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedLocal ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

declare const google: any;

export const AVATAR_CHARACTERS = [
  { id: 'owl', emoji: 'נ¦‰', label: { en: 'Academic Owl', he: '׳™׳ ׳©׳•׳£ ׳׳׳“׳' }, color: '#818cf8', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Galeel' },
  { id: 'bot', emoji: 'נ₪–', label: { en: 'Study Bot', he: '׳¨׳•׳‘׳•׳˜ ׳׳׳™׳“׳”' }, color: '#34d399', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bot' },
  { id: 'coffee', emoji: 'ג˜•', label: { en: 'Exam Fuel', he: '׳“׳׳§ ׳‘׳—׳™׳ ׳•׳×' }, color: '#fbbf24', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Coffee' },
  { id: 'wizard', emoji: 'נ§™ג€ג™‚ן¸', label: { en: 'Math Wizard', he: '׳§׳•׳¡׳ ׳׳×׳׳˜׳™' }, color: '#a78bfa', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wizard' },
  { id: 'ninja', emoji: 'נ¥·', label: { en: 'OPT Ninja', he: '׳ ׳™׳ ׳’\'׳× ׳׳•׳₪׳˜׳™׳׳™׳–׳¦׳™׳”' }, color: '#f87171', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ninja' },
  { id: 'rocket', emoji: 'נ€', label: { en: 'Rocket', he: '׳¨׳§׳˜׳× ׳”׳¦׳׳—׳”' }, color: '#38bdf8', url: 'https://api.dicebear.com/7.x/identicon/svg?seed=Rocket' },
  { id: 'fox', emoji: 'נ¦', label: { en: 'Clever Fox', he: '׳©׳•׳¢׳ ׳₪׳™׳§׳—' }, color: '#f97316', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Fox' },
  { id: 'unicorn', emoji: 'נ¦„', label: { en: 'OPT Unicorn', he: '׳—׳“ ׳§׳¨׳ ׳׳•׳₪׳˜׳™׳׳™' }, color: '#ec4899', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Unicorn' },
  { id: 'alien', emoji: 'נ‘¾', label: { en: 'Math Alien', he: '׳—׳™׳™׳–׳¨ ׳׳×׳׳˜׳™' }, color: '#a855f7', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alien' },
  { id: 'lion', emoji: 'נ¦', label: { en: 'NLA Lion', he: '׳׳¨׳™׳” ׳׳׳’׳‘׳¨׳™' }, color: '#eab308', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lion' },
  { id: 'panda', emoji: 'נ¼', label: { en: 'Study Panda', he: '׳₪׳ ׳“׳× ׳׳׳™׳“׳”' }, color: '#64748b', url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Panda' },
  { id: 'ghost', emoji: 'נ‘»', label: { en: 'Ghost Writer', he: '׳›׳•׳×׳‘ ׳¨׳₪׳׳™׳' }, color: '#cbd5e1', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Ghost' }
];

export const renderAvatar = (avatarUrl: string, size: string = '2.5rem', fontSize: string = '1.3rem') => {
  if (!avatarUrl) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'var(--math-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1.5px solid var(--surface-border)',
        boxSizing: 'border-box',
        fontSize: fontSize
      }}>
        נ‘₪
      </div>
    );
  }

  // Find matching character
  const char = AVATAR_CHARACTERS.find(c => c.id === avatarUrl || c.url === avatarUrl);
  if (char) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: `${char.color}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: fontSize,
        border: `1.5px solid ${char.color}`,
        boxShadow: `0 0 10px ${char.color}25`,
        boxSizing: 'border-box'
      }}>
        {char.emoji}
      </div>
    );
  }

  // Fallback to image tag if it is a real URL (external provider picture)
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f1f5f9', border: '1.5px solid var(--surface-border)',
      boxSizing: 'border-box'
    }}>
      <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

function AuthModal({ onClose, language, signInMockUser }: { onClose: () => void; language: 'en' | 'he'; signInMockUser: (user: any) => void }) {
  const isHe = language === 'he';
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  // Load previously saved user (Welcome Back Screen)
  const [savedUser, setSavedUser] = useState<any>(() => {
    const saved = localStorage.getItem('nla_saved_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Google Accounts simulation state
  const [showGoogleSimulation, setShowGoogleSimulation] = useState(false);
  const [simStep, setSimStep] = useState(1); // 1 for email, 2 for name, 3 for loading/signing in
  const [simEmail, setSimEmail] = useState('');
  const [simName, setSimName] = useState('');
  const [simError, setSimError] = useState('');

  // Disable scroll when modal is open
  useEffect(() => {
    const originalOverflowY = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflowY;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  const handleGoogleSignInClick = async () => {
    setIsGoogleLoading(true);
    setGoogleError(null);

    // If real Supabase database is connected, execute the authentic OAuth browser redirect
    if (isRealDatabaseConnected) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
      } catch (err: any) {
        console.error('Real OAuth integration failed:', err);
        setGoogleError(err.message || 'Real Google authentication failed.');
        setIsGoogleLoading(false);
      }
    } else {
      // In offline/mock mode, trigger our high-fidelity interactive Google Account Login Simulation
      setTimeout(() => {
        setIsGoogleLoading(false);
        setShowGoogleSimulation(true);
        setSimStep(1);
      }, 300);
    }
  };

  // Load simulated user registry with default mocks pre-filled
  const getSimulatedUserRegistry = (): Record<string, { name: string; avatarUrl: string }> => {
    const saved = localStorage.getItem('nla_simulated_users');
    if (saved) return JSON.parse(saved);
    
    // Default mock database of recognized accounts
    const defaults = {
      'test@example.com': { name: 'John Doe', avatarUrl: 'owl' },
      'developer@example.com': { name: 'Alex Turing', avatarUrl: 'robot' },
      '0501234567': { name: 'Shir Levi', avatarUrl: 'cat' }
    };
    localStorage.setItem('nla_simulated_users', JSON.stringify(defaults));
    return defaults;
  };

  const saveSimulatedUserToRegistry = (identifier: string, name: string, avatarUrl: string) => {
    const registry = getSimulatedUserRegistry();
    registry[identifier.toLowerCase()] = { name, avatarUrl };
    localStorage.setItem('nla_simulated_users', JSON.stringify(registry));
  };

  const handleSimulateGoogleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (simStep === 1) {
      const input = simEmail.trim().toLowerCase();
      const isEmail = input.includes('@');
      const isPhone = /^[+\d\s-]+$/.test(input) && input.replace(/[^\d]/g, '').length >= 6;
      
      if (!isEmail && !isPhone) {
        setSimError(isHe ? '׳”׳–׳ ׳›׳×׳•׳‘׳× ׳׳™׳׳™׳™׳ ׳׳• ׳׳¡׳₪׳¨ ׳˜׳׳₪׳•׳ ׳×׳§׳™׳' : 'Enter a valid email or phone number');
        return;
      }
      setSimError('');

      // Check if we recognize the user by email or phone!
      const registry = getSimulatedUserRegistry();
      const recognized = registry[input];

      if (recognized) {
        // We recognize the user! Skip name screen and proceed directly to connecting with their name!
        setSimName(recognized.name);
        setSimStep(3); // Go directly to loading/handshaking state!
        
        setTimeout(() => {
          signInMockUser({
            name: recognized.name,
            email: isEmail ? input : `${input}@simulated-phone.com`,
            avatarUrl: recognized.avatarUrl || 'owl'
          });
          onClose();
        }, 1500);
      } else {
        // First-time user: Navigate them to choose a name!
        setSimStep(2);
      }
    } else if (simStep === 2) {
      if (!simName.trim()) {
        setSimError(isHe ? '׳©׳“׳” ׳–׳” ׳—׳•׳‘׳”' : 'This field is required');
        return;
      }
      setSimError('');
      setSimStep(3);
      
      const input = simEmail.trim().toLowerCase();
      const isEmail = input.includes('@');
      
      // Save their record in the simulated registry so they are recognized next time!
      saveSimulatedUserToRegistry(input, simName.trim(), 'owl');
      
      // Simulate OAuth network handshaking, save user, load database slot, and close!
      setTimeout(() => {
        signInMockUser({
          name: simName.trim(),
          email: isEmail ? input : `${input}@simulated-phone.com`,
          avatarUrl: 'owl' // Default companion to owl initially, can be changed post-login
        });
        onClose();
      }, 1500);
    }
  };

  const handleQuickLogin = () => {
    signInMockUser({
      name: savedUser.name,
      email: savedUser.email,
      avatarUrl: savedUser.avatarUrl
    });
    onClose();
  };


  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      zIndex: 2000, padding: '2rem 1rem',
      overflowY: 'auto',
      width: '100vw', height: '100vh',
      fontFamily: "'Outfit', sans-serif",
      boxSizing: 'border-box'
    }}>
      <motion.div 
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        style={{
          width: '100%', maxWidth: '420px', padding: '1.75rem 2rem',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          display: 'flex', flexDirection: 'column', gap: '1.25rem',
          position: 'relative',
          margin: 'auto',
          boxSizing: 'border-box'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', top: '0.85rem', right: '0.85rem', 
            background: '#f1f5f9', border: 'none', cursor: 'pointer', 
            color: '#475569', borderRadius: '50%', width: '1.75rem', height: '1.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#475569'; }}
        >
          <X size={14} />
        </button>

        {/* ========================================================
           GOOGLE SIGN-IN SIMULATOR OVERLAY
           ======================================================== */}
        {showGoogleSimulation ? (
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '340px', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            
            {/* Simulation Header */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <svg viewBox="0 0 24 24" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              </div>

              {simStep === 1 && (
                <>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#202124', margin: 0 }}>
                    {isHe ? '׳”׳×׳—׳‘׳¨׳•׳×' : 'Sign in'}
                  </h2>
                  <p style={{ color: '#5f6368', fontSize: '0.9rem', margin: 0 }}>
                    {isHe ? '׳›׳“׳™ ׳׳”׳׳©׳™׳ ׳׳ ׳₪׳•׳¨׳˜׳ ׳”׳׳׳™׳“׳”' : 'to continue to לומדים הסתברות וסטטיסטיקה בכיף'}
                  </p>
                </>
              )}

              {simStep === 2 && (
                <>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#202124', margin: 0 }}>
                    {isHe ? '׳”׳–׳ ׳׳× ׳©׳׳' : 'Enter your name'}
                  </h2>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    border: '1px solid #dadce0', borderRadius: '16px',
                    padding: '0.25rem 0.6rem', fontSize: '0.85rem', color: '#3c4043',
                    background: '#f8fafc', marginTop: '0.25rem'
                  }}>
                    <span>נ‘₪</span>
                    <span>{simEmail}</span>
                  </div>
                </>
              )}

              {simStep === 3 && (
                <>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#202124', margin: 0 }}>
                    {isHe ? '׳׳‘׳¦׳¢ ׳׳™׳׳•׳×...' : 'Authenticating...'}
                  </h2>
                  <p style={{ color: '#5f6368', fontSize: '0.9rem', margin: 0 }}>
                    {isHe ? '׳™׳•׳¦׳¨ ׳—׳™׳‘׳•׳¨ ׳׳׳•׳‘׳˜׳— ׳•׳׳¡׳ ׳›׳¨׳ ׳”׳×׳§׳“׳׳•׳×' : 'Establishing secure handshake & loading slots'}
                  </p>
                </>
              )}
            </div>

            {/* Simulation Form Content */}
            <form onSubmit={handleSimulateGoogleLoginSubmit} style={{ margin: '1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', justifySelf: 'center' }}>
              {simStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                  <input 
                    type="email" 
                    required 
                    autoFocus
                    placeholder={isHe ? '׳׳™׳׳™׳™׳ ׳׳• ׳˜׳׳₪׳•׳' : 'Email or phone'}
                    value={simEmail}
                    onChange={(e) => {
                      setSimEmail(e.target.value);
                      if (simError) setSimError('');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      fontSize: '1rem',
                      border: simError ? '2px solid #d93025' : '1px solid #dadce0',
                      borderRadius: '4px',
                      outline: 'none',
                      color: '#202124',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => { if (!simError) e.target.style.borderColor = '#1a73e8'; }}
                    onBlur={(e) => { if (!simError) e.target.style.borderColor = '#dadce0'; }}
                  />
                  {simError && (
                    <span style={{ color: '#d93025', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                      ג ן¸ {simError}
                    </span>
                  )}
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ alignSelf: 'flex-start', color: '#1a73e8', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, marginTop: '0.5rem' }}>
                    {isHe ? '׳©׳›׳—׳× ׳׳× ׳”׳׳™׳׳™׳™׳?' : 'Forgot email?'}
                  </a>
                </div>
              )}

              {simStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    required 
                    autoFocus
                    placeholder={isHe ? '׳©׳ ׳₪׳¨׳˜׳™ ׳•׳©׳ ׳׳©׳₪׳—׳”' : 'First & Last Name'}
                    value={simName}
                    onChange={(e) => {
                      setSimName(e.target.value);
                      if (simError) setSimError('');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      fontSize: '1rem',
                      border: simError ? '2px solid #d93025' : '1px solid #dadce0',
                      borderRadius: '4px',
                      outline: 'none',
                      color: '#202124',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => { if (!simError) e.target.style.borderColor = '#1a73e8'; }}
                    onBlur={(e) => { if (!simError) e.target.style.borderColor = '#dadce0'; }}
                  />
                  {simError && (
                    <span style={{ color: '#d93025', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                      ג ן¸ {simError}
                    </span>
                  )}
                </div>
              )}

              {simStep === 3 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
                  <div className="google-spinner" style={{
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #1a73e8',
                    borderRight: '4px solid #34a853',
                    borderBottom: '4px solid #fbbc05',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              )}

              {simStep < 3 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem' }}>
                  <button 
                    type="button"
                    onClick={() => {
                      if (simStep === 2) {
                        setSimStep(1);
                        setSimError('');
                      } else {
                        setShowGoogleSimulation(false);
                      }
                    }}
                    style={{
                      background: 'none', border: 'none', color: '#1a73e8',
                      cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                      padding: '0.5rem 0.8rem', borderRadius: '4px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(26,115,232,0.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    {simStep === 2 ? (isHe ? '׳—׳–׳•׳¨' : 'Back') : (isHe ? '׳‘׳™׳˜׳•׳' : 'Cancel')}
                  </button>

                  <button 
                    type="submit"
                    style={{
                      background: '#1a73e8', border: 'none', color: '#ffffff',
                      cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                      padding: '0.6rem 1.5rem', borderRadius: '4px',
                      boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
                      transition: 'background 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#185abc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#1a73e8'}
                  >
                    {isHe ? '׳”׳‘׳' : 'Next'}
                  </button>
                </div>
              )}
            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5f6368', fontSize: '0.74rem' }}>
              <span>{isHe ? '׳¢׳‘׳¨׳™׳× (׳™׳©׳¨׳׳)' : 'English (United States)'}</span>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <span>{isHe ? '׳¢׳–׳¨׳”' : 'Help'}</span>
                <span>{isHe ? '׳₪׳¨׳˜׳™׳•׳×' : 'Privacy'}</span>
                <span>{isHe ? '׳×׳ ׳׳™׳' : 'Terms'}</span>
              </div>
            </div>
          </div>
        ) : savedUser ? (
          /* ========================================================
             WELCOME BACK FAST-LOGIN SCREEN
             ======================================================== */
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'center' }}>
              {/* Pulsing Avatar Frame */}
              <div style={{
                width: '4.5rem', height: '4.5rem', borderRadius: '50%',
                background: 'transparent', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.25rem auto',
                position: 'relative'
              }}>
                {renderAvatar(savedUser.avatarUrl, '4.5rem', '2.2rem')}
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {isHe ? '׳‘׳¨׳•׳ ׳”׳©׳‘!' : 'Welcome Back!'}
              </h2>
              <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>
                {isHe ? '׳ ׳׳¦׳׳” ׳”׳×׳§׳“׳׳•׳× ׳׳׳™׳“׳” ׳©׳׳•׳¨׳” ׳׳—׳©׳‘׳•׳ ׳©׳׳.' : 'Pick up right where you left off. Quick login is ready!'}
              </p>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: isHe ? 'right' : 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {renderAvatar(savedUser.avatarUrl, '2rem', '1.1rem')}
              </div>
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{savedUser.name}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{savedUser.email}</p>
              </div>
              <span style={{ fontSize: '1.1rem' }}>נ“</span>
            </div>

            <button 
              onClick={handleQuickLogin}
              className="btn btn-primary"
              style={{
                padding: '0.85rem',
                fontWeight: 700,
                fontSize: '0.95rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
              }}
            >
              <span>נ€</span>
              <span>{isHe ? `׳”׳׳©׳ ׳‘׳×׳•׳¨ ${savedUser.name.split(' ')[0]}` : `Continue as ${savedUser.name.split(' ')[0]}`}</span>
            </button>

            <button 
              onClick={() => setSavedUser(null)}
              style={{
                background: 'none', border: 'none', color: '#6366f1',
                cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
                padding: '0.25rem', width: 'fit-content', margin: '0 auto',
                textDecoration: 'underline'
              }}
            >
              {isHe ? '׳”׳×׳—׳‘׳¨ ׳¢׳ ׳׳©׳×׳׳© ׳׳—׳¨' : 'Switch to another account'}
            </button>
          </div>
        ) : (
          /* ========================================================
             STANDARD GOOGLE-ONLY EXCLUSIVE LOGIN BLOCK
             ======================================================== */
          <>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              
              {/* Premium Lock/Secure Key Header */}
              <div style={{
                width: '4rem', height: '4rem', borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.08)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.25rem auto',
                border: '2px solid var(--primary-color)',
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)',
                fontSize: '2rem'
              }}>
                נ”
              </div>
              
              <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {isHe ? '׳”׳×׳—׳‘׳¨׳•׳× ׳׳₪׳•׳¨׳˜׳ ׳”׳׳׳™׳“׳”' : 'Sign in to Mastery Portal'}
              </h1>
              
              <p style={{ color: '#475569', fontSize: '0.82rem', margin: 0, lineHeight: '1.4' }}>
                {isHe 
                  ? '׳’׳‘׳” ׳•׳¡׳ ׳›׳¨׳ ׳׳× ׳”׳×׳§׳“׳׳•׳× ׳”׳׳׳™׳“׳” ׳•׳׳“׳“׳™ ׳”׳©׳׳™׳˜׳” ׳©׳׳ ׳‘׳¢׳ ׳ ׳‘׳׳•׳₪׳ ׳׳™׳™׳“׳™.' 
                  : 'Connect your account to instantly sync and backup your study progress.'}
              </p>
            </div>

            {/* CONTINUE WITH GOOGLE ACTION */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', margin: '0.5rem 0' }}>
              <GoogleSignInButton 
                onClick={handleGoogleSignInClick} 
                text={isGoogleLoading ? (isHe ? '׳׳×׳—׳‘׳¨...' : 'Connecting...') : (isHe ? '׳”׳׳©׳ ׳¢׳ Google' : 'Continue with Google')} 
                variant="brand-light" 
                style={{
                  padding: '0.8rem 1.25rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem'
                }}
              />

              {googleError && (
                <div style={{ color: '#ef4444', fontSize: '0.78rem', textAlign: 'center', padding: '0.4rem', background: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                  ג ן¸ {googleError}
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#64748b', lineHeight: '1.4', marginTop: '0.15rem' }}>
              {isHe 
                ? '׳”׳”׳×׳—׳‘׳¨׳•׳× ׳׳׳•׳‘׳˜׳—׳× ׳׳—׳׳•׳˜׳™׳. ׳‘׳׳—׳™׳¦׳” ׳¢׳ ׳›׳₪׳×׳•׳¨ ׳”׳”׳׳©׳, ׳׳×׳” ׳׳¡׳›׳™׳ ׳׳×׳ ׳׳™ ׳”׳©׳™׳¨׳•׳× ׳•׳׳“׳™׳ ׳™׳•׳× ׳”׳₪׳¨׳˜׳™׳•׳×.' 
                : 'Sign-in is fully secure. By continuing, you agree to our Terms of Service and Privacy Policy.'}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function Navigation({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) {
  const location = useLocation();
  const { language, toggleLanguage, zoom, zoomIn, zoomOut, user, signInWithGoogle, signOut, seenFormulas, updateUserAvatar } = useAppContext();
  const [shareOpen, setShareOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarSelectorOpen, setAvatarSelectorOpen] = useState(false);

  // Auto-close avatar selector when profile dropdown closes
  useEffect(() => {
    if (!profileOpen) {
      setAvatarSelectorOpen(false);
    }
  }, [profileOpen]);

  // Translations for Navigation buttons
  const isHe = language === 'he';
  const tDashboard = isHe ? '׳׳•׳— ׳‘׳§׳¨׳”' : 'Dashboard';
  const tFormulas = isHe ? '׳ ׳•׳¡׳—׳׳•׳× ׳•׳”׳’׳“׳¨׳•׳×' : 'Formulas & Definitions';
  const tThemeTitle = isHe ? '׳©׳ ׳” ׳׳¦׳‘ ׳×׳׳•׳¨׳”' : `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`;
  
  // Calculate platform mastery percentage dynamically from all formulas in database
  const totalFormulasCount = formulas.length;
  const masteredCount = Object.values(seenFormulas).filter(v => v === 'green' || v === true).length;
  const masteryPercentage = totalFormulasCount > 0 ? Math.round((masteredCount / totalFormulasCount) * 100) : 0;

  return (
    <>
      <nav className="glass-panel" style={{ 
        padding: '1rem 1.5rem', 
        margin: '2rem auto', 
        maxWidth: '900px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className={`btn ${location.pathname === '/' ? 'btn-primary' : 'btn-secondary'}`}>
            <HomeIcon size={18} /> {tDashboard}
          </Link>
          <Link to="/formulas" className={`btn ${location.pathname === '/formulas' ? 'btn-accent' : 'btn-secondary'}`}>
            <FunctionSquare size={18} /> {tFormulas}
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Zoom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)' }}>
            <button 
              onClick={zoomOut}
              className="btn btn-secondary"
              style={{ padding: '0.4rem', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={isHe ? '׳”׳§׳˜׳ ׳’׳•׳₪׳' : 'Zoom Out'}
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', width: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              {zoom}%
            </span>
            <button 
              onClick={zoomIn}
              className="btn btn-secondary"
              style={{ padding: '0.4rem', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={isHe ? '׳”׳’׳“׳ ׳’׳•׳₪׳' : 'Zoom In'}
            >
              <ZoomIn size={16} />
            </button>
          </div>

          {/* Bilingual Toggle */}
          <button 
            onClick={toggleLanguage}
            className="btn btn-secondary"
            style={{ 
              padding: '0.75rem 1rem', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderColor: 'var(--surface-border)',
              fontWeight: 600
            }}
            title={isHe ? '׳¢׳‘׳•׳¨ ׳׳׳ ׳’׳׳™׳×' : '׳¢׳‘׳•׳¨ ׳׳¢׳‘׳¨׳™׳×'}
          >
            <Languages size={18} />
            <span style={{ fontSize: '0.9rem' }}>{isHe ? 'English' : '׳¢׳‘׳¨׳™׳×'}</span>
          </button>

          {/* Share Button */}
          <button 
            onClick={() => setShareOpen(true)}
            className="btn btn-secondary"
            style={{ 
              padding: '0.75rem', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'var(--surface-border)'
            }}
            title={isHe ? '׳©׳×׳£ ׳׳×׳¨' : 'Share Website'}
          >
            <Share2 size={18} color="var(--accent-color)" />
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{ 
              padding: '0.75rem', 
              borderRadius: 'var(--radius-sm)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'var(--surface-border)'
            }}
            title={tThemeTitle}
          >
            {theme === 'dark' ? <Sun size={20} color="var(--warning)" /> : <Moon size={20} color="var(--primary-color)" />}
          </button>

          {/* User Profile Avatar / Google Sign-In Corner Button */}
          <div style={{ position: 'relative' }}>
            {user ? (
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="profile-avatar-btn"
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s ease'
                }}
                title={user.name}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {renderAvatar(user.avatarUrl, '2.5rem', '1.3rem')}
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="profile-avatar-btn"
                style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  cursor: 'pointer', padding: 0, overflow: 'hidden',
                  background: 'rgba(99, 102, 241, 0.06)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', transition: 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
                  border: '2px solid var(--primary-color)',
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.15)'
                }}
                title={isHe ? '׳”׳×׳—׳‘׳¨ ׳׳©׳׳™׳¨׳× ׳”׳×׳§׳“׳׳•׳×' : 'Sign In to Backup Progress'}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.12)';
                  e.currentTarget.style.borderColor = 'var(--accent-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.06)';
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                }}
              >
                <LogIn size={18} color="var(--primary-color)" />
              </button>
            )}

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {profileOpen && user && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="glass-panel"
                    style={{
                      position: 'absolute',
                      top: '3.25rem',
                      right: isHe ? 'auto' : 0,
                      left: isHe ? 0 : 'auto',
                      width: '280px',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--surface-border)',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 999,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      textAlign: isHe ? 'right' : 'left'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.85rem' }}>
                      <button
                        onClick={() => setAvatarSelectorOpen(!avatarSelectorOpen)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          transition: 'transform 0.2s ease',
                          outline: 'none',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        title={isHe ? '׳׳—׳¥ ׳׳©׳™׳ ׳•׳™ ׳“׳׳•׳× ׳׳׳•׳•׳”' : 'Click to change study companion'}
                      >
                        {renderAvatar(user.avatarUrl, '2.5rem', '1.3rem')}
                        <div style={{
                          position: 'absolute',
                          bottom: '-2px',
                          right: '-2px',
                          background: 'var(--primary-color)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '14px',
                          height: '14px',
                          fontSize: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                          border: '1px solid var(--bg-color)'
                        }}>
                          גן¸
                        </div>
                      </button>
                      <div style={{ overflow: 'hidden', flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                      </div>
                    </div>

                    {/* Platform Mastery Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 'bold' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{isHe ? '׳׳“׳“ ׳©׳׳™׳˜׳” ׳‘׳ ׳•׳¡׳—׳׳•׳×' : 'Formula Mastery'}</span>
                        <span style={{ color: 'var(--accent-color)' }}>{masteryPercentage}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--math-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${masteryPercentage}%`, background: 'var(--accent-color)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {isHe 
                          ? `׳¡׳•׳׳ ׳• ${masteredCount} ׳׳×׳•׳ ${totalFormulasCount} ׳ ׳•׳¡׳—׳׳•׳× ׳©׳׳™׳˜׳”` 
                          : `Mastered ${masteredCount} of ${totalFormulasCount} formulas`}
                      </span>
                    </div>



                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem', borderTop: '1px solid var(--surface-border)', paddingTop: '0.85rem' }}>
                      <button
                        onClick={() => {
                          signOut();
                          setProfileOpen(false);
                        }}
                        className="btn btn-secondary"
                        style={{
                          padding: '0.5rem 0.75rem', fontSize: '0.8rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: '0.5rem', width: '100%', borderColor: 'rgba(239, 68, 68, 0.2)',
                          color: 'var(--error)'
                        }}
                      >
                        <LogOut size={14} />
                        {isHe ? '׳”׳×׳ ׳×׳§ ׳׳”׳—׳©׳‘׳•׳' : 'Sign Out'}
                      </button>
                    </div>
                  </motion.div>

                  {/* Companion Selection Side Menu */}
                  <AnimatePresence>
                    {avatarSelectorOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: isHe ? 15 : -15, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: isHe ? 15 : -15, scale: 0.95 }}
                        className="glass-panel"
                        style={{
                          position: 'absolute',
                          top: '3.25rem',
                          right: isHe ? 'auto' : '290px',
                          left: isHe ? '290px' : 'auto',
                          width: '240px',
                          padding: '1.25rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--surface-border)',
                          boxShadow: 'var(--shadow-lg)',
                          zIndex: 1000,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.85rem',
                          textAlign: isHe ? 'right' : 'left'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {isHe ? '׳©׳™׳ ׳•׳™ ׳“׳׳•׳× ׳׳׳•׳•׳”' : 'Change Companion'}
                          </span>
                          <button 
                            onClick={() => setAvatarSelectorOpen(false)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '0.2rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              outline: 'none'
                            }}
                          >
                            <X size={14} />
                          </button>
                        </div>

                        <div 
                          style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(4, 1fr)', 
                            gap: '0.45rem',
                            maxHeight: '260px',
                            overflowY: 'auto'
                          }}
                          className="companion-scroll-container"
                        >
                          {AVATAR_CHARACTERS.map(char => {
                            const isSelected = user.avatarUrl === char.id || user.avatarUrl === char.url;
                            return (
                              <button
                                key={char.id}
                                onClick={() => {
                                  updateUserAvatar(char.id);
                                  setAvatarSelectorOpen(false);
                                }}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  padding: '0.35rem 0.15rem',
                                  borderRadius: 'var(--radius-sm)',
                                  border: isSelected ? `2px solid ${char.color}` : '1.5px solid var(--surface-border)',
                                  background: isSelected ? `${char.color}15` : 'rgba(255,255,255,0.02)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  outline: 'none'
                                }}
                                title={isHe ? char.label.he : char.label.en}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.06)';
                                  e.currentTarget.style.borderColor = char.color;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  if (!isSelected) {
                                    e.currentTarget.style.borderColor = 'var(--surface-border)';
                                  }
                                }}
                              >
                                <span style={{ fontSize: '1.35rem' }}>{char.emoji}</span>
                                <span style={{ 
                                  fontSize: '0.52rem', 
                                  color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis', 
                                  whiteSpace: 'nowrap', 
                                  width: '100%', 
                                  textAlign: 'center', 
                                  marginTop: '0.15rem',
                                  fontWeight: isSelected ? 'bold' : 'normal'
                                }}>
                                  {isHe ? char.label.he.split(' ')[0] : char.label.en.split(' ')[0]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {shareOpen && (
          <ShareModal onClose={() => setShareOpen(false)} language={language} />
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Default
  });

  const [language, setLanguage] = useState<'en' | 'he'>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'he') return saved;
    return 'en';
  });

  const [zoom, setZoom] = useState<number>(() => {
    const saved = localStorage.getItem('zoom');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (parsed >= 80 && parsed <= 150) return parsed;
    }
    return 100;
  });

  // Auth & Progress Sync State
  const [user, setUser] = useState<any>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [seenFormulas, setSeenFormulas] = useState<Record<string, 'green' | 'yellow' | 'red' | null | boolean>>(() => {
    const saved = localStorage.getItem('seenFormulas');
    return saved ? JSON.parse(saved) : {};
  });

  // 1. Listen to Supabase Auth State and restore returning users automatically!
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleAuthSession(session);
    };

    checkUserSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      handleAuthSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthSession = async (session: any) => {
    if (session?.user) {
      const u = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name || 'Student',
        avatarUrl: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(session.user.email)}`,
        googleId: session.user.user_metadata?.sub || (session.user.identities && session.user.identities[0] ? session.user.identities[0].id : '') || ''
      };
      setUser(u);
      
      // Persist user profile locally for "Welcome Back" auth experience
      localStorage.setItem('nla_saved_user', JSON.stringify(u));
      
      // Auto-load their saved progress from database upon sign-in!
      await loadProgressFromDatabase(session.user.id);
    } else {
      setUser(null);
    }
  };

  // 2. Fetch and restore progress from cloud database
  const loadProgressFromDatabase = async (userId: string) => {
    try {
      setIsSyncing(true);
      const { data, error } = await supabase
        .from('nla_study_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.message === 'No records found') {
        // Create a new space in the database for the new user!
        console.log('No progress record found for new user. Creating dedicated database slot...');
        await supabase
          .from('nla_study_progress')
          .upsert({
            user_id: userId,
            progress_data: {},
            updated_at: new Date().toISOString()
          });
      } else if (error) {
        console.error('Failed to load progress:', error);
      }

      if (data?.progress_data) {
        const progressObj = data.progress_data as { seenFormulas?: Record<string, 'green' | 'yellow' | 'red' | null | boolean>; avatarUrl?: string } || {};
        // Support backwards compatibility if progress_data is a flat key-value dictionary
        const cloudProgress = progressObj.seenFormulas || (progressObj as Record<string, 'green' | 'yellow' | 'red' | null | boolean>);
        
        // Merge cloud progress with current local progress
        setSeenFormulas(prev => {
          const merged = { ...prev, ...cloudProgress };
          localStorage.setItem('seenFormulas', JSON.stringify(merged));
          return merged;
        });

        // Restore chosen companion avatar from database
        if (progressObj.avatarUrl) {
          setUser((prev: any) => {
            if (!prev) return null;
            const updated = { ...prev, avatarUrl: progressObj.avatarUrl };
            localStorage.setItem('nla_saved_user', JSON.stringify(updated));
            return updated;
          });
        }
        console.log('Successfully synced study progress and companion choice from cloud database!');
      }
    } catch (e) {
      console.error('Database loading error:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // 3. Backup and sync local progress to cloud database
  const triggerSync = async (forcedProgress?: Record<string, 'green' | 'yellow' | 'red' | null | boolean>, forcedAvatarUrl?: string) => {
    if (!user) return;
    try {
      setIsSyncing(true);
      const progressToSave = forcedProgress || seenFormulas;
      const avatarUrlToSave = forcedAvatarUrl || user.avatarUrl;
      
      const payload = {
        seenFormulas: progressToSave,
        avatarUrl: avatarUrlToSave,
        fullName: user.name,
        email: user.email,
        googleId: user.googleId || ''
      };
      
      const { error } = await supabase
        .from('nla_study_progress')
        .upsert({
          user_id: user.id,
          progress_data: payload,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      console.log('Study progress and companion avatar backed up to secure database!');
    } catch (e) {
      console.error('Failed to sync progress:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Helper method to change selected avatar and auto-sync to DB
  const updateUserAvatar = async (avatarId: string) => {
    if (!user) return;
    const updated = { ...user, avatarUrl: avatarId };
    setUser(updated);
    localStorage.setItem('nla_saved_user', JSON.stringify(updated));
    await triggerSync(undefined, avatarId);
  };

  // 4. Toggle formula mastery globally and auto-trigger sync if logged in!
  const toggleSeenFormula = (id: string, status?: 'green' | 'yellow' | 'red' | null) => {
    setSeenFormulas(prev => {
      let nextVal: 'green' | 'yellow' | 'red' | null = null;
      if (status !== undefined) {
        nextVal = status;
      } else {
        // Toggle behavior if no status is provided: toggle between green (mastered) and null
        nextVal = prev[id] === 'green' || prev[id] === true ? null : 'green';
      }
      
      const nextState = { ...prev, [id]: nextVal };
      if (nextVal === null) {
        delete nextState[id];
      }
      
      localStorage.setItem('seenFormulas', JSON.stringify(nextState));
      
      // If signed in, perform silent cloud backup in background!
      if (user) {
        triggerSync(nextState);
      }
      
      return nextState;
    });
  };

  const signInWithGoogle = () => {
    setAuthOpen(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSeenFormulas({});
    localStorage.removeItem('seenFormulas');
    console.log('User signed out successfully.');
  };

  const signInMockUser = (mockUser: { name: string; email: string; avatarUrl?: string }) => {
    if (supabase.auth.signInMockUser) {
      supabase.auth.signInMockUser(mockUser);
    }
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('zoom', zoom.toString());
    document.documentElement.style.fontSize = `${zoom}%`;
  }, [zoom]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'he' : 'en'));
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 150));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 80));
  };

  const dir = language === 'he' ? 'rtl' : 'ltr';

  return (
    <AppContext.Provider value={{ 
      language, zoom, toggleLanguage, zoomIn, zoomOut,
      user, signInWithGoogle, signOut, isSyncing, triggerSync,
      seenFormulas, toggleSeenFormula, updateUserAvatar
    }}>
      <Router>
        <div 
          className="container" 
          style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            direction: dir,
            transition: 'direction 0.25s ease'
          }}
        >
          <Navigation theme={theme} toggleTheme={toggleTheme} />
          
          <main style={{ paddingBottom: '4rem', flex: 1 }}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chapter/:courseId/:chapterId" element={<ChapterPage />} />
                <Route path="/formulas" element={<FormulaBoard />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </Router>

      <AnimatePresence>
        {authOpen && (
          <AuthModal 
            onClose={() => setAuthOpen(false)} 
            language={language}
            signInMockUser={signInMockUser}
          />
        )}
      </AnimatePresence>
    </AppContext.Provider>
  );
}

export default App;

