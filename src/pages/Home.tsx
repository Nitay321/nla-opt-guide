import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { chapters } from '../data/chapters';
import { Calculator, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../App';

export default function Home() {
  const { language } = useAppContext();
  const isHe = language === 'he';

  const probChapters = chapters.filter(c => c.courseId === 'prob');
  const statsChapters = chapters.filter(c => c.courseId === 'stats');

  // Translations
  const lTitle = isHe ? 'פורטל למידה מואצת' : 'Accelerated Mastery Portal';
  const lSubTitle = isHe 
    ? 'למד תורת ההסתברות (PROB) וסטטיסטיקה (STATS) ביעילות ובמהירות. בחר יחידת לימוד מטה כדי להתחיל למידה פעילה, לקרוא הוכחות פורמליות, לסקור דוגמאות מפורטות ולבחון את עצמך.'
    : 'Master Probability Theory (PROB) and Statistics (STATS) efficiently. Pick a chapter below to start active learning, read proofs, review examples, and test yourself.';

  const lProbTitle = isHe ? 'תורת ההסתברות' : 'Probability Theory';
  const lStatsTitle = isHe ? 'סטטיסטיקה' : 'Statistics';
  
  const lProbSub = isHe ? `קוד קורס: PROB • ${probChapters.length} יחידות` : `Course Code: PROB • ${probChapters.length} Modules`;
  const lStatsSub = isHe ? `קוד קורס: STATS • ${statsChapters.length} יחידות` : `Course Code: STATS • ${statsChapters.length} Modules`;
  const lModuleLabel = isHe ? 'יחידה' : 'MODULE';

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
        
        {/* PROB Column Card */}
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
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{lProbTitle}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lProbSub}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
            {probChapters.map(chapter => {
              const chTitle = isHe ? (chapter.titleHe || chapter.title) : chapter.title;
              return (
                <Link key={chapter.id} to={`/chapter/prob/${chapter.id}`} style={{ textDecoration: 'none' }}>
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

        {/* STATS Column Card */}
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
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{lStatsTitle}</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lStatsSub}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
            {statsChapters.map(chapter => {
              const chTitle = isHe ? (chapter.titleHe || chapter.title) : chapter.title;
              return (
                <Link key={chapter.id} to={`/chapter/stats/${chapter.id}`} style={{ textDecoration: 'none' }}>
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

      {/* Companion Portal Re-routing */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-card" 
        style={{ 
          borderColor: 'var(--primary-color)',
          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.03)',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginTop: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ 
            padding: '0.85rem', 
            background: 'rgba(99, 102, 241, 0.1)', 
            borderRadius: 'var(--radius-md)', 
            color: 'var(--primary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem'
          }}>
            🧮
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {isHe ? 'מדריך לימוד מקביל: אלגברה ואופטימיזציה' : 'Companion Portal: NLA & Optimization'}
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {isHe 
                ? 'עבור למדריך האינטראקטיבי המקביל לתרגול אלגברה ליניארית נומרית ושיטות אופטימיזציה.'
                : 'Switch over to the companion portal to study Numerical Linear Algebra and Mathematical Optimization.'}
            </p>
          </div>
        </div>
        <a 
          href="https://nla-opt-portal.surge.sh/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
        >
          <span>{isHe ? 'פתח פורטל' : 'Open Portal'}</span>
          <ArrowIcon size={16} />
        </a>
      </motion.div>
    </motion.div>
  );
}
