import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Compass, Lightbulb } from 'lucide-react';
import { chapters } from '../data/chapters';
import TheoremBox from '../components/TheoremBox';
import QuizWidget from '../components/QuizWidget';
import { RichText } from '../components/MathRenderer';
import { useAppContext } from '../App';

export default function ChapterPage() {
  const { courseId, chapterId } = useParams();
  const { language } = useAppContext();
  const [activeBlock, setActiveBlock] = useState<'prob' | 'calc'>('prob');
  
  const isHe = language === 'he';
  const chapterIdx = chapters.findIndex(c => c.id === chapterId);
  const chapter = chapters[chapterIdx];

  const filteredDefinitions = chapter && chapter.id === 'prob-0'
    ? chapter.definitions.filter(def => {
        if (activeBlock === 'prob') {
          return ['def-prob-0-1', 'def-prob-0-2', 'def-prob-0-3', 'def-prob-0-4'].includes(def.id);
        } else {
          return ['def-prob-0-5', 'def-prob-0-6', 'def-prob-0-7'].includes(def.id);
        }
      })
    : chapter?.definitions || [];

  if (!chapter) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <h3>{isHe ? 'הפרק לא נמצא' : 'Chapter not found'}</h3>
        <Link to="/">{isHe ? 'חזרה ללוח הבקרה' : 'Back to Dashboard'}</Link>
      </div>
    );
  }

  const prevChapter = chapterIdx > 0 ? chapters[chapterIdx - 1] : null;
  const nextChapter = chapterIdx < chapters.length - 1 ? chapters[chapterIdx + 1] : null;

  const accentColor = courseId === 'prob' ? 'var(--primary-color)' : 'var(--secondary-color)';

  // Hebrew translations
  const title = isHe ? (chapter.titleHe || chapter.title) : chapter.title;
  const intro = isHe ? (chapter.introHe || chapter.intro) : chapter.intro;
  const motivation = isHe ? (chapter.motivationHe || chapter.motivation) : chapter.motivation;

  const lCourseName = courseId === 'prob' 
    ? (isHe ? 'הסתברות' : 'Probability Theory')
    : (isHe ? 'סטטיסטיקה' : 'Statistical Methods');

  const lModule = isHe ? `יחידת לימוד ${chapter.chapterNumber}` : `Module ${chapter.chapterNumber}`;
  const lDashboardLink = isHe ? 'חזרה ללוח הבקרה' : 'Back to Dashboard';
  const lIntroTitle = isHe ? 'מה אנחנו הולכים ללמוד ביחידה זו' : 'What we are going to learn';
  const lMotivationTitle = isHe ? 'למה אנחנו לומדים את זה? (מוטיבציה)' : 'Why we are learning this (Motivation)';
  const lCoreTheorems = isHe ? 'משפטים והסברים מרכזיים' : 'Core Theorems & Explanations';

  const lPrevLesson = isHe ? 'שיעור קודם' : 'Previous Lesson';
  const lNextLesson = isHe ? 'שיעור הבא' : 'Next Lesson';

  // Smart flipped icons for LTR/RTL navigation
  const PrevIcon = isHe ? ArrowRight : ArrowLeft;
  const NextIcon = isHe ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      key={chapterId}
      initial={{ opacity: 0, x: isHe ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isHe ? 20 : -20 }}
      style={{ maxWidth: '850px', margin: '0 auto', paddingTop: '1.5rem', whiteSpace: 'normal', wordBreak: 'break-word' }}
    >
      {/* Navigation Breadcrumb */}
      <Link to="/" style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        color: 'var(--text-muted)', 
        marginBottom: '2rem',
        fontWeight: 500,
        fontSize: '0.95rem'
      }}>
        <PrevIcon size={16} /> {lDashboardLink}
      </Link>

      {/* Chapter Title Headings */}
      <header style={{ marginBottom: '3rem' }}>
        <span style={{ 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          fontSize: '0.85rem', 
          color: accentColor,
          fontWeight: 'bold',
          display: 'block',
          marginBottom: '0.5rem'
        }}>
          {lCourseName} • {lModule}
        </span>
        <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: '1.5rem', lineHeight: '1.15' }}>
          {title}
        </h1>
        
        {/* Intro & Motivation Blocks */}
        <div className="glass-panel responsive-padding" style={{ 
          borderLeft: isHe ? 'none' : `5px solid ${accentColor}`,
          borderRight: isHe ? `5px solid ${accentColor}` : 'none',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <Compass size={18} color={accentColor} />
            <h3 style={{ margin: 0, color: accentColor, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {lIntroTitle}
            </h3>
          </div>
          <div style={{ fontSize: '1.08rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            <RichText text={intro} />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <Lightbulb size={18} color="var(--warning)" />
            <h3 style={{ margin: 0, color: 'var(--warning)', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {lMotivationTitle}
            </h3>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.6', margin: 0 }}>
            <RichText text={motivation} />
          </div>
        </div>
      </header>

      {/* Premium Toggle Selector for Chapter 0 */}
      {chapter.id === 'prob-0' && (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          direction: 'ltr',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '4px',
          borderRadius: '100px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          maxWidth: '520px',
          margin: '2rem auto 3rem auto',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <motion.div 
            layout
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            style={{
              position: 'absolute',
              top: '4px',
              bottom: '4px',
              left: activeBlock === 'prob' ? '4px' : 'calc(50% + 4px)',
              width: 'calc(50% - 8px)',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              borderRadius: '100px',
              zIndex: 0,
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.22)'
            }}
          />
          <button 
            onClick={() => setActiveBlock('prob')}
            style={{
              flex: 1,
              padding: '0.8rem 1.5rem',
              border: 'none',
              borderRadius: '100px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'color 0.25s ease',
              background: 'transparent',
              color: activeBlock === 'prob' ? '#ffffff' : 'var(--text-secondary)',
              zIndex: 1,
              position: 'relative',
              outline: 'none'
            }}
          >
            {isHe ? 'יסודות ההסתברות' : 'Probability Foundations'}
          </button>
          <button 
            onClick={() => setActiveBlock('calc')}
            style={{
              flex: 1,
              padding: '0.8rem 1.5rem',
              border: 'none',
              borderRadius: '100px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'color 0.25s ease',
              background: 'transparent',
              color: activeBlock === 'calc' ? '#ffffff' : 'var(--text-secondary)',
              zIndex: 1,
              position: 'relative',
              outline: 'none'
            }}
          >
            {isHe ? 'ריענון חדו"א ואינטגרלים' : 'Calculus & Integration'}
          </button>
        </div>
      )}

      {/* Core Syllabus Content */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.8rem' }}>
          <BookOpen size={24} color={accentColor} />
          <h2 style={{ margin: 0, fontSize: '1.75rem' }}>{lCoreTheorems}</h2>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.id === 'prob-0' ? activeBlock : 'normal'}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {filteredDefinitions.map(def => (
              <TheoremBox key={def.id} definition={def} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Chapter Quiz Assessment */}
      <QuizWidget questions={chapter.quiz} />

      {/* 🚀 Bottom-of-Page Lesson Navigation Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'stretch', 
        marginTop: '5rem', 
        paddingTop: '2.5rem', 
        borderTop: '1px solid var(--surface-border)',
        gap: '1.5rem',
        flexWrap: 'wrap'
      }}>
        {prevChapter ? (
          <Link 
            to={`/chapter/${prevChapter.courseId}/${prevChapter.id}`} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.75rem', 
              textDecoration: 'none',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              background: prevChapter.courseId === 'prob' 
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(99, 102, 241, 0.04))'
                : 'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(236, 72, 153, 0.04))',
              border: prevChapter.courseId === 'prob'
                ? '1px solid rgba(99, 102, 241, 0.35)'
                : '1px solid rgba(236, 72, 153, 0.35)',
              boxShadow: 'var(--shadow-sm)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.95rem',
              flex: 1,
              minWidth: '280px',
              textAlign: 'center',
              transition: 'all 0.25s ease'
            }}
            className="hover-scale"
          >
            <PrevIcon size={18} style={{ color: accentColor, flexShrink: 0 }} /> 
            <span>{lPrevLesson}: {isHe ? (prevChapter.titleHe || prevChapter.title) : prevChapter.title}</span>
          </Link>
        ) : <div style={{ flex: 1, minWidth: '280px', display: 'none' }} />}

        {nextChapter ? (
          <Link 
            to={`/chapter/${nextChapter.courseId}/${nextChapter.id}`} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.75rem', 
              textDecoration: 'none',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              border: 'none',
              boxShadow: '0 4px 18px rgba(99, 102, 241, 0.25)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.95rem',
              flex: 1,
              minWidth: '280px',
              textAlign: 'center',
              transition: 'all 0.25s ease'
            }}
            className="hover-scale"
          >
            <span>{lNextLesson}: {isHe ? (nextChapter.titleHe || nextChapter.title) : nextChapter.title}</span>
            <NextIcon size={18} style={{ flexShrink: 0 }} />
          </Link>
        ) : <div style={{ flex: 1, minWidth: '280px', display: 'none' }} />}
      </div>
    </motion.div>
  );
}
