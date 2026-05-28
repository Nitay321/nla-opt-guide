import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';
import { Calculator, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../App';

export default function Home() {
  const { language } = useAppContext();
  const isHe = language === 'he';

  const הסתברותChapters = chapters.filter(c => c.courseId === 'הסתברות');
  const סטטיסטיקהChapters = chapters.filter(c => c.courseId === 'סטטיסטיקה');

  // Translations
  const lTitle = isHe ? '׳₪׳•׳¨׳˜׳ ׳׳׳™׳“׳” ׳׳•׳׳¦׳×' : 'Accelerated Mastery Portal';
  const lSubTitle = isHe 
    ? '׳׳׳“ ׳׳׳’׳‘׳¨׳” ׳׳™׳ ׳™׳׳¨׳™׳× ׳ ׳•׳׳¨׳™׳× (הסתברות) ׳•׳׳•׳₪׳˜׳™׳׳™׳–׳¦׳™׳” ׳ ׳•׳׳¨׳™׳× (סטטיסטיקה) ׳‘׳™׳¢׳™׳׳•׳× ׳•׳‘׳׳”׳™׳¨׳•׳×. ׳‘׳—׳¨ ׳™׳—׳™׳“׳× ׳׳™׳׳•׳“ ׳׳˜׳” ׳›׳“׳™ ׳׳”׳×׳—׳™׳ ׳׳׳™׳“׳” ׳₪׳¢׳™׳׳”, ׳׳§׳¨׳•׳ ׳”׳•׳›׳—׳•׳× ׳₪׳•׳¨׳׳׳™׳•׳×, ׳׳¡׳§׳•׳¨ ׳“׳•׳’׳׳׳•׳× ׳׳₪׳•׳¨׳˜׳•׳× ׳•׳׳‘׳—׳•׳ ׳׳× ׳¢׳¦׳׳.'
    : 'Master Probability Theory (הסתברות) and סטטיסטיקהimization (סטטיסטיקה) efficiently. Pick a chapter below to start active learning, read proofs, review examples, and test yourself.';

  const lהסתברותTitle = isHe ? '׳׳׳’׳‘׳¨׳” ׳׳™׳ ׳™׳׳¨׳™׳× ׳ ׳•׳׳¨׳™׳×' : 'Probability Theory';
  const lסטטיסטיקהTitle = isHe ? '׳׳•׳₪׳˜׳™׳׳™׳–׳¦׳™׳” ׳ ׳•׳׳¨׳™׳×' : 'Numerical סטטיסטיקהimization';
  
  const lהסתברותSub = isHe ? `׳§׳•׳“ ׳§׳•׳¨׳¡: הסתברות ג€¢ ${הסתברותChapters.length} ׳™׳—׳™׳“׳•׳×` : `Course Code: הסתברות ג€¢ ${הסתברותChapters.length} Modules`;
  const lסטטיסטיקהSub = isHe ? `׳§׳•׳“ ׳§׳•׳¨׳¡: סטטיסטיקה ג€¢ ${סטטיסטיקהChapters.length} ׳™׳—׳™׳“׳•׳×` : `Course Code: סטטיסטיקה ג€¢ ${סטטיסטיקהChapters.length} Modules`;
  const lModuleLabel = isHe ? '׳™׳—׳™׳“׳”' : 'MODULE';

  const ArrowIcon = isHe ? ArrowLeft : ArrowRight;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}
    >
      {/* Title Hero Banner */}
      <header style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3.8rem', fontWeight: 700, marginBottom: '0.8rem', letterSpacing: '-1px' }}>
          {lTitle}
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          {lSubTitle}
        </p>
      </header>

      {/* Course Cards Grid */}
      <div className="layout-grid">
        
        {/* הסתברות Column Card */}
        <div className="glass-card" style={{ 
          borderColor: 'var(--primary-color)',
          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.05)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ 
              padding: '0.85rem', 
              background: 'rgba(99, 102, 241, 0.1)', 
              borderRadius: 'var(--radius-md)', 
              color: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calculator size={28} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{lהסתברותTitle}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lהסתברותSub}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
            {הסתברותChapters.map(chapter => {
              const chTitle = isHe ? (chapter.titleHe || chapter.title) : chapter.title;
              return (
                <Link key={chapter.id} to={`/chapter/הסתברות/${chapter.id}`} style={{ textDecoration: 'none' }}>
                  <div 
                    className="glass-panel" 
                    style={{ 
                      padding: '1.2rem 1.5rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      transition: 'all 0.2s', 
                      cursor: 'pointer',
                      borderLeft: isHe ? 'none' : '3px solid transparent',
                      borderRight: isHe ? '3px solid transparent' : 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                      if (isHe) {
                        e.currentTarget.style.borderRightColor = 'var(--primary-color)';
                        e.currentTarget.style.transform = 'translateX(-4px)';
                      } else {
                        e.currentTarget.style.borderLeftColor = 'var(--primary-color)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'none';
                      if (isHe) {
                        e.currentTarget.style.borderRightColor = 'transparent';
                      } else {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                        {lModuleLabel} {chapter.chapterNumber}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {chTitle}
                      </h3>
                    </div>
                    <ArrowIcon size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* סטטיסטיקה Column Card */}
        <div className="glass-card" style={{ 
          borderColor: 'var(--secondary-color)',
          boxShadow: '0 10px 30px rgba(236, 72, 153, 0.05)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ 
              padding: '0.85rem', 
              background: 'rgba(236, 72, 153, 0.1)', 
              borderRadius: 'var(--radius-md)', 
              color: 'var(--secondary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={28} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{lסטטיסטיקהTitle}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lסטטיסטיקהSub}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
            {סטטיסטיקהChapters.map(chapter => {
              const chTitle = isHe ? (chapter.titleHe || chapter.title) : chapter.title;
              return (
                <Link key={chapter.id} to={`/chapter/סטטיסטיקה/${chapter.id}`} style={{ textDecoration: 'none' }}>
                  <div 
                    className="glass-panel" 
                    style={{ 
                      padding: '1.2rem 1.5rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      transition: 'all 0.2s', 
                      cursor: 'pointer',
                      borderLeft: isHe ? 'none' : '3px solid transparent',
                      borderRight: isHe ? '3px solid transparent' : 'none'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                      if (isHe) {
                        e.currentTarget.style.borderRightColor = 'var(--secondary-color)';
                        e.currentTarget.style.transform = 'translateX(-4px)';
                      } else {
                        e.currentTarget.style.borderLeftColor = 'var(--secondary-color)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'none';
                      if (isHe) {
                        e.currentTarget.style.borderRightColor = 'transparent';
                      } else {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--secondary-color)', fontWeight: 'bold' }}>
                        {lModuleLabel} {chapter.chapterNumber}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {chTitle}
                      </h3>
                    </div>
                    <ArrowIcon size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

