import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import Home from './pages/Home';
import ChapterPage from './pages/ChapterPage';
import FormulaBoard from './pages/FormulaBoard';
import { FunctionSquare, Home as HomeIcon, Sun, Moon, Languages, ZoomIn, ZoomOut, Share2, Copy, Check, X, LogIn, LogOut, Cloud, RefreshCw, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isRealDatabaseConnected } from './supabaseClient';

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
  triggerSync: () => Promise<void>;
  seenFormulas: Record<string, boolean>;
  toggleSeenFormula: (id: string) => void;
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
  const publicUrl = 'https://nla-opt-portal.surge.sh';
  
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
              {isHe ? 'שתף אתר לימודי' : 'Share Study Guide'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
              {isHe ? 'שתף את הקישור הציבורי עם חברים וקולגות' : 'Share the public link with friends and colleagues'}
            </p>
          </div>
        </div>

        {/* Public Sharing Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          
          {/* Public Link Copy Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {isHe ? 'קישור ציבורי:' : 'Public Link:'}
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
                <span>{copiedPublic ? (isHe ? 'הועתק!' : 'Copied!') : (isHe ? 'העתק' : 'Copy')}</span>
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
              {isHe ? 'סרוק קוד זה לגישה מיידית מכל מכשיר:' : 'Scan to access instantly from any device:'}
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
              <span>{isHe ? 'אפשרויות מפתח (חיבור מקומי)' : 'Developer Options (Local Wi-Fi)'}</span>
              <span>{showLocalOptions ? '▼' : '▶'}</span>
            </button>

            {showLocalOptions && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  <strong>{isHe ? 'חיבור Wi-Fi מקומי:' : 'Local Wi-Fi connection:'}</strong>
                  <div style={{ marginTop: '0.35rem' }}>
                    {isHe ? 'הזן את ה-IP המקומי של מחשב הפיתוח שלך:' : "Enter your hosting computer's local IP:"}
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

function AuthModal({ onClose, language, signInMockUser }: { onClose: () => void; language: 'en' | 'he'; signInMockUser: (user: any) => void }) {
  const isHe = language === 'he';
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  
  const handleMockLogin = (name: string, email: string) => {
    signInMockUser({ name, email });
    onClose();
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !customEmail) return;
    signInMockUser({ name: customName, email: customEmail });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem'
    }}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel"
        style={{
          width: '100%', maxWidth: '450px', padding: '2rem',
          position: 'relative', border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', gap: '1.5rem'
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '3.5rem', height: '3.5rem', borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.1)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <KeyRound size={24} color="var(--primary-color)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>
            {isHe ? 'סנכרון ושמירת התקדמות' : 'Connect Your Account'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
            {isHe 
              ? 'גבה את מדדי השליטה וההתקדמות שלך בענן וסנכרן אותם בצורה חלקה בין המחשב לטלפון.' 
              : 'Backup your progress and formula mastery indicators securely in the cloud to access them from any device.'}
          </p>
        </div>

        {/* Real Supabase Auth Trigger or Mock Login Dialog */}
        {!isRealDatabaseConnected ? (
          // Simulated Google Login for development/SPA-offline modes
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px dashed var(--surface-border)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', textAlign: 'center', color: 'var(--accent-color)' }}>
              {isHe 
                ? '⚡ מצב לא מקוון פעיל - התחבר מיד עם גוגל ללא צורך בהגדרת מסדי נתונים!' 
                : '⚡ Offline Pro Mode Active - Sign in instantly via Google without needing database setups!'}
            </div>

            <button 
              onClick={() => handleMockLogin('Galeel Deepmind', 'galeel@deepmind.com')}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.25rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontWeight: 600 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.95-3.18 3.5v2.88h5.08c2.97-2.74 4.67-6.78 4.67-11.61c0-.5-.04-1-.11-1.5z" color="#fff"/><path fill="currentColor" d="M12.18 21.4c2.75 0 5.06-.91 6.75-2.48l-5.08-2.88c-1.46.99-3.32 1.57-5.42 1.57c-4.14 0-7.65-2.79-8.9-6.57H1.93v3.05c1.77 3.51 5.43 5.92 9.71 5.92z" color="#fff"/><path fill="currentColor" d="M3.28 11.04c-.32-.97-.5-2.02-.5-3.09s.18-2.12.5-3.09V1.81H1.93C1.22 3.23.8 4.82.8 6.5s.42 3.27 1.13 4.69l1.35.15z" color="#fff"/><path fill="currentColor" d="M12.18 2.91c1.9 0 3.6.65 4.94 1.92l3.7-3.7C18.57.91 15.63 0 12.18 0C7.9 0 4.24 2.41 2.47 5.92l3.41 2.64c1.25-3.65 4.76-5.65 8.9-5.65z" color="#fff"/></svg>
              {isHe ? 'התחבר עם Google (פרופיל 1)' : 'Continue with Google (Profile 1)'}
            </button>

            <button 
              onClick={() => handleMockLogin('Alex Student', 'alex@university.edu')}
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.25rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontWeight: 600 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.95-3.18 3.5v2.88h5.08c2.97-2.74 4.67-6.78 4.67-11.61c0-.5-.04-1-.11-1.5z" color="#fff"/><path fill="currentColor" d="M12.18 21.4c2.75 0 5.06-.91 6.75-2.48l-5.08-2.88c-1.46.99-3.32 1.57-5.42 1.57c-4.14 0-7.65-2.79-8.9-6.57H1.93v3.05c1.77 3.51 5.43 5.92 9.71 5.92z" color="#fff"/><path fill="currentColor" d="M3.28 11.04c-.32-.97-.5-2.02-.5-3.09s.18-2.12.5-3.09V1.81H1.93C1.22 3.23.8 4.82.8 6.5s.42 3.27 1.13 4.69l1.35.15z" color="#fff"/><path fill="currentColor" d="M12.18 2.91c1.9 0 3.6.65 4.94 1.92l3.7-3.7C18.57.91 15.63 0 12.18 0C7.9 0 4.24 2.41 2.47 5.92l3.41 2.64c1.25-3.65 4.76-5.65 8.9-5.65z" color="#fff"/></svg>
              {isHe ? 'התחבר עם Google (פרופיל 2)' : 'Continue with Google (Profile 2)'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{isHe ? 'או הזן פרטים משלך' : 'OR ENTER CUSTOM USER'}</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
            </div>

            <form onSubmit={handleCustomLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input 
                type="text" required placeholder={isHe ? 'שם מלא' : 'Full Name'}
                value={customName} onChange={e => setCustomName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
              />
              <input 
                type="email" required placeholder={isHe ? 'אימייל' : 'Email Address'}
                value={customEmail} onChange={e => setCustomEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
              />
              <button 
                type="submit" className="btn btn-accent"
                style={{ padding: '0.75rem', fontWeight: 600 }}
              >
                {isHe ? 'התחבר עם Google (מותאם אישית)' : 'Sign In as Custom Google Account'}
              </button>
            </form>
          </div>
        ) : (
          // Real Supabase OAuth Login Trigger
          <button 
            onClick={async () => {
              try {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: window.location.origin
                  }
                });
                if (error) throw error;
              } catch (err: any) {
                alert(`OAuth Sign In Error: ${err.message}`);
              }
            }}
            className="btn btn-primary"
            style={{
              padding: '0.85rem 1.25rem', width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem', fontWeight: 600, textTransform: 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.95-3.18 3.5v2.88h5.08c2.97-2.74 4.67-6.78 4.67-11.61c0-.5-.04-1-.11-1.5z" color="#fff"/><path fill="currentColor" d="M12.18 21.4c2.75 0 5.06-.91 6.75-2.48l-5.08-2.88c-1.46.99-3.32 1.57-5.42 1.57c-4.14 0-7.65-2.79-8.9-6.57H1.93v3.05c1.77 3.51 5.43 5.92 9.71 5.92z" color="#fff"/><path fill="currentColor" d="M3.28 11.04c-.32-.97-.5-2.02-.5-3.09s.18-2.12.5-3.09V1.81H1.93C1.22 3.23.8 4.82.8 6.5s.42 3.27 1.13 4.69l1.35.15z" color="#fff"/><path fill="currentColor" d="M12.18 2.91c1.9 0 3.6.65 4.94 1.92l3.7-3.7C18.57.91 15.63 0 12.18 0C7.9 0 4.24 2.41 2.47 5.92l3.41 2.64c1.25-3.65 4.76-5.65 8.9-5.65z" color="#fff"/></svg>
            {isHe ? 'המשך עם Google' : 'Continue with Google'}
          </button>
        )}

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {isHe 
            ? 'ההתחברות אופציונלית לחלוטין. תוכל להמשיך להשתמש באתר גם ללא חשבון.' 
            : 'Connecting is completely optional. You can study offline without an account.'}
        </div>
      </motion.div>
    </div>
  );
}

function Navigation({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) {
  const location = useLocation();
  const { language, toggleLanguage, zoom, zoomIn, zoomOut, user, signInWithGoogle, signOut, seenFormulas, triggerSync, isSyncing } = useAppContext();
  const [shareOpen, setShareOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Translations for Navigation buttons
  const isHe = language === 'he';
  const tDashboard = isHe ? 'לוח בקרה' : 'Dashboard';
  const tFormulas = isHe ? 'נוסחאות והגדרות' : 'Formulas & Definitions';
  const tThemeTitle = isHe ? 'שנה מצב תאורה' : `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`;
  
  // Calculate platform mastery percentage (e.g. from total 20 formulas)
  const totalFormulasCount = 20; // total formulas in data
  const masteredCount = Object.values(seenFormulas).filter(Boolean).length;
  const masteryPercentage = Math.round((masteredCount / totalFormulasCount) * 100);

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
              title={isHe ? 'הקטן גופן' : 'Zoom Out'}
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
              title={isHe ? 'הגדל גופן' : 'Zoom In'}
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
            title={isHe ? 'עבור לאנגלית' : 'עבור לעברית'}
          >
            <Languages size={18} />
            <span style={{ fontSize: '0.9rem' }}>{isHe ? 'English' : 'עברית'}</span>
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
            title={isHe ? 'שתף אתר' : 'Share Website'}
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
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  cursor: 'pointer', padding: 0, overflow: 'hidden',
                  background: 'transparent', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', transition: 'transform 0.2s ease',
                  border: `2px solid ${isRealDatabaseConnected ? 'var(--accent-color)' : 'var(--primary-color)'}`,
                  boxShadow: `0 0 10px ${isRealDatabaseConnected ? 'rgba(20,184,166,0.3)' : 'rgba(99,102,241,0.3)'}`
                }}
                title={user.name}
              >
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="btn btn-secondary"
                style={{ 
                  padding: '0.75rem 1rem', 
                  borderRadius: 'var(--radius-sm)', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderColor: 'var(--surface-border)',
                  fontWeight: 600,
                  background: 'rgba(99, 102, 241, 0.05)'
                }}
                title={isHe ? 'התחבר לשמירת התקדמות' : 'Sign In to Backup Progress'}
              >
                <LogIn size={18} color="var(--primary-color)" />
                <span style={{ fontSize: '0.9rem' }}>{isHe ? 'התחבר' : 'Sign In'}</span>
              </button>
            )}

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {profileOpen && user && (
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
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--surface-border)' }}>
                      <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ overflow: 'hidden', flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                    </div>
                  </div>

                  {/* Platform Mastery Stats */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 'bold' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{isHe ? 'מדד שליטה בנוסחאות' : 'Formula Mastery'}</span>
                      <span style={{ color: 'var(--accent-color)' }}>{masteryPercentage}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'var(--math-bg)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${masteryPercentage}%`, background: 'var(--accent-color)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {isHe 
                        ? `סומנו ${masteredCount} מתוך ${totalFormulasCount} נוסחאות שליטה` 
                        : `Mastered ${masteredCount} of ${totalFormulasCount} formulas`}
                    </span>
                  </div>

                  {/* Database Sync Status Indicators */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--surface-border)' }}>
                    <Cloud size={14} color={isRealDatabaseConnected ? 'var(--success)' : 'var(--primary-color)'} />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', flex: 1 }}>
                      {isRealDatabaseConnected 
                        ? (isHe ? 'מחובר לסנכרון ענן מאובטח' : 'Secure cloud backup connected')
                        : (isHe ? 'מצב סימולציית מפתח מקומית' : 'Mock Developer Sync Active')}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <button
                      onClick={async () => {
                        await triggerSync();
                      }}
                      disabled={isSyncing}
                      className="btn btn-secondary"
                      style={{
                        padding: '0.5rem 0.75rem', fontSize: '0.8rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.5rem', width: '100%'
                      }}
                    >
                      <RefreshCw size={14} className={isSyncing ? 'spin-animation' : ''} />
                      {isSyncing ? (isHe ? 'מסנכרן...' : 'Syncing...') : (isHe ? 'סנכרן עכשיו' : 'Force Backup Now')}
                    </button>

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
                      {isHe ? 'התנתק מהחשבון' : 'Sign Out'}
                    </button>
                  </div>
                </motion.div>
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
  const [seenFormulas, setSeenFormulas] = useState<Record<string, boolean>>(() => {
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
        avatarUrl: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(session.user.email)}`
      };
      setUser(u);
      
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

      if (error && error.message !== 'No records found') {
        console.error('Failed to load progress:', error);
      }

      if (data?.progress_data) {
        const cloudProgress = data.progress_data as Record<string, boolean>;
        
        // Merge cloud progress with current local progress
        setSeenFormulas(prev => {
          const merged = { ...prev, ...cloudProgress };
          localStorage.setItem('seenFormulas', JSON.stringify(merged));
          return merged;
        });
        console.log('Successfully synced study progress from cloud database!');
      }
    } catch (e) {
      console.error('Database loading error:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // 3. Backup and sync local progress to cloud database
  const triggerSync = async (forcedProgress?: Record<string, boolean>) => {
    if (!user) return;
    try {
      setIsSyncing(true);
      const progressToSave = forcedProgress || seenFormulas;
      
      const { error } = await supabase
        .from('nla_study_progress')
        .upsert({
          user_id: user.id,
          progress_data: progressToSave,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      console.log('Study progress successfully backed up to secure database!');
    } catch (e) {
      console.error('Failed to sync progress:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // 4. Toggle formula mastery globally and auto-trigger sync if logged in!
  const toggleSeenFormula = (id: string) => {
    setSeenFormulas(prev => {
      const nextState = { ...prev, [id]: !prev[id] };
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

  const signInMockUser = (mockUser: { name: string; email: string }) => {
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
      seenFormulas, toggleSeenFormula
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
