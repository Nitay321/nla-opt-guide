import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formulas } from '../data/formulas';
import type { Formula } from '../data/formulas';
import MathRenderer from '../components/MathRenderer';
import { Award, Layers, Search, RotateCcw } from 'lucide-react';
import { useAppContext } from '../App';

interface CategoryStyle {
  border: string;
  badgeBg: string;
  badgeText: string;
  shadow: string;
  glow: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  'Matrix & Vector Norms': {
    border: 'var(--primary-color)',
    badgeBg: 'rgba(99, 102, 241, 0.15)',
    badgeText: 'var(--primary-color)',
    shadow: 'rgba(99, 102, 241, 0.1)',
    glow: 'rgba(99, 102, 241, 0.2)'
  },
  'Direct Solvers': {
    border: '#a855f7',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeText: '#a855f7',
    shadow: 'rgba(168, 85, 247, 0.1)',
    glow: 'rgba(168, 85, 247, 0.2)'
  },
  'Least Squares Minimization': {
    border: '#ec4899',
    badgeBg: 'rgba(236, 72, 153, 0.15)',
    badgeText: '#ec4899',
    shadow: 'rgba(236, 72, 153, 0.1)',
    glow: 'rgba(236, 72, 153, 0.2)'
  },
  'Orthogonalization & SVD': {
    border: '#3b82f6',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    badgeText: '#3b82f6',
    shadow: 'rgba(59, 130, 246, 0.1)',
    glow: 'rgba(59, 130, 246, 0.2)'
  },
  'Iterative Solvers': {
    border: '#14b8a6',
    badgeBg: 'rgba(20, 184, 166, 0.15)',
    badgeText: '#14b8a6',
    shadow: 'rgba(20, 184, 166, 0.1)',
    glow: 'rgba(20, 184, 166, 0.2)'
  },
  'Eigenvalue Solvers': {
    border: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeText: '#f59e0b',
    shadow: 'rgba(245, 158, 11, 0.1)',
    glow: 'rgba(245, 158, 11, 0.2)'
  },
  'Optimization Foundations': {
    border: '#eab308',
    badgeBg: 'rgba(234, 179, 8, 0.15)',
    badgeText: '#eab308',
    shadow: 'rgba(234, 179, 8, 0.1)',
    glow: 'rgba(234, 179, 8, 0.2)'
  },
  'Unconstrained Optimization': {
    border: '#ef4444',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    badgeText: '#ef4444',
    shadow: 'rgba(239, 68, 68, 0.1)',
    glow: 'rgba(239, 68, 68, 0.2)'
  },
  'Constrained Optimization': {
    border: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeText: '#10b981',
    shadow: 'rgba(16, 185, 129, 0.1)',
    glow: 'rgba(16, 185, 129, 0.2)'
  }
};

const DEFAULT_STYLE: CategoryStyle = {
  border: 'var(--text-muted)',
  badgeBg: 'var(--surface-color)',
  badgeText: 'var(--text-secondary)',
  shadow: 'transparent',
  glow: 'transparent'
};

export default function FormulaBoard() {
  const { language, seenFormulas, toggleSeenFormula } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<'all' | 'nla' | 'opt'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'green' | 'yellow' | 'red' | 'to-learn'>('all');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);

  const isHe = language === 'he';

  const toggleSeen = (id: string, status?: 'green' | 'yellow' | 'red' | null) => {
    toggleSeenFormula(id, status);
  };

  const resetAllProgress = () => {
    const confirmMsg = isHe 
      ? 'האם אתה בטוח שברצונך לאפס את כל מדדי השליטה בנוסחאות?' 
      : 'Are you sure you want to reset all formula mastery indicators?';
      
    if (window.confirm(confirmMsg)) {
      // Toggle all mastered/marked formulas off
      Object.keys(seenFormulas).forEach(id => {
        if (seenFormulas[id]) {
          toggleSeenFormula(id, null);
        }
      });
    }
  };

  // Filter Formulas
  const filteredFormulas = formulas.filter(f => {
    const nameMatch = isHe ? (f.nameHe || f.name) : f.name;
    const descMatch = isHe ? (f.descriptionHe || f.description) : f.description;
    const catMatch = isHe ? (f.categoryHe || f.category) : f.category;

    const matchesSearch = nameMatch.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          descMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          catMatch.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCourse = selectedCourse === 'all' || f.courseId === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || 
                          (selectedStatus === 'green' && (seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true)) || 
                          (selectedStatus === 'yellow' && seenFormulas[f.id] === 'yellow') || 
                          (selectedStatus === 'red' && seenFormulas[f.id] === 'red') || 
                          (selectedStatus === 'to-learn' && !seenFormulas[f.id]);
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Calculate Metrics
  const totalNLA = formulas.filter(f => f.courseId === 'nla').length;
  const totalOPT = formulas.filter(f => f.courseId === 'opt').length;
  
  const greenNLA = formulas.filter(f => f.courseId === 'nla' && (seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true)).length;
  const yellowNLA = formulas.filter(f => f.courseId === 'nla' && seenFormulas[f.id] === 'yellow').length;
  const redNLA = formulas.filter(f => f.courseId === 'nla' && seenFormulas[f.id] === 'red').length;

  const greenOPT = formulas.filter(f => f.courseId === 'opt' && (seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true)).length;
  const yellowOPT = formulas.filter(f => f.courseId === 'opt' && seenFormulas[f.id] === 'yellow').length;
  const redOPT = formulas.filter(f => f.courseId === 'opt' && seenFormulas[f.id] === 'red').length;

  const pctGreenNLA = totalNLA > 0 ? Math.round((greenNLA / totalNLA) * 100) : 0;
  const pctYellowNLA = totalNLA > 0 ? Math.round((yellowNLA / totalNLA) * 100) : 0;
  const pctRedNLA = totalNLA > 0 ? Math.round((redNLA / totalNLA) * 100) : 0;

  const pctGreenOPT = totalOPT > 0 ? Math.round((greenOPT / totalOPT) * 100) : 0;
  const pctYellowOPT = totalOPT > 0 ? Math.round((yellowOPT / totalOPT) * 100) : 0;
  const pctRedOPT = totalOPT > 0 ? Math.round((redOPT / totalOPT) * 100) : 0;

  // Group by category
  const categoriesMap: Record<string, typeof formulas> = {};
  filteredFormulas.forEach(f => {
    const cat = isHe ? (f.categoryHe || f.category) : f.category;
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(f);
  });

  // Dynamic Translations
  const lTitle = isHe ? 'מרכז הנוסחאות וההגדרות' : 'Formula & Definition Hub';
  const lSubTitle = isHe 
    ? 'דף נוסחאות אינטראקטיבי להכנה מהירה למבחן. למד הגדרות, חקור משוואות ב-LaTeX, ולחץ על כל כרטיס כדי לפתוח מסך מפורט.'
    : 'Interactive formula sheet for rapid exam preparation. Study definitions, examine equations in beautiful LaTeX, and tap any card to open a full popup screen.';
  
  const lNlaTitle = isHe ? 'אלגברה ליניארית נומרית' : 'Numerical Linear Algebra';
  const lOptTitle = isHe ? 'אופטימיזציה נומרית' : 'Numerical Optimization';
  
  const lSearchPlaceholder = isHe ? 'חפש משוואות, מילות מפתח או קטגוריות...' : 'Search equations, definition keywords or categories...';
  const lReset = isHe ? 'איפוס' : 'Reset';
  
  const lFilterTopic = isHe ? 'נושא' : 'Topic';
  const lFilterAllCourses = isHe ? 'כל הקורסים' : 'All Courses';
  const lFilterNla = isHe ? 'אלגברה ליניארית נומרית (NLA)' : 'NLA (Linear Algebra)';
  const lFilterOpt = isHe ? 'אופטימיזציה נומרית (OPT)' : 'Optimization';
  
  const lFilterMastery = isHe ? 'מדד שליטה בחומר' : 'Mastery status';
  const lFilterAll = isHe ? 'הכל' : 'All';
  const lFilterMastered = isHe ? 'שולט 😄' : 'Mastered 😄';
  const lFilterLearning = isHe ? 'בתהליך 😐' : 'Learning 😐';
  const lFilterStruggling = isHe ? 'מתקשה 😡' : 'Struggling 😡';
  const lFilterToLearn = isHe ? 'ללמוד 📝' : 'To Learn 📝';
  
  const lNoMatches = isHe ? 'לא נמצאו נוסחאות מתאימות' : 'No matching equations found';
  const lNoMatchesSub = isHe ? 'נסה לשנות את מילות החיפוש או פילטר הקטגוריות.' : 'Try adjusting your search query or filter keywords.';
  
  const lItemsLabel = isHe ? 'פריטים' : 'items';
  const lDefSentence = isHe ? 'משפט הגדרה:' : 'Definition Sentence:';
  const lCoreDefSentence = isHe ? 'משפט הגדרה מרכזי' : 'Core Definition Sentence';
  const lStatusLabel = isHe ? 'סטטוס:' : 'Status:';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      style={{ maxWidth: '1100px', margin: '0 auto' }}
    >
      {/* Header Panel */}
      <header style={{ textAlign: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{lTitle}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          {lSubTitle}
        </p>
      </header>

      {/* Progress Dashboard with Tri-Color Progress Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {/* NLA Progress Card */}
        <div className="glass-panel" style={{ padding: '1.5rem 1.75rem', borderTop: '4px solid var(--primary-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{lNlaTitle}</span>
            <span style={{ background: 'var(--primary-color)', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 'bold' }}>
              {totalNLA} {isHe ? 'נוסחאות' : 'equations'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Green progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span>😄 {isHe ? 'שולט' : 'Mastered'}</span>
                <span>{greenNLA} / {totalNLA} ({pctGreenNLA}%)</span>
              </div>
              <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctGreenNLA}%`, background: 'var(--success)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Yellow progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span>😐 {isHe ? 'בתהליך' : 'Learning'}</span>
                <span>{yellowNLA} / {totalNLA} ({pctYellowNLA}%)</span>
              </div>
              <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctYellowNLA}%`, background: '#f59e0b', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Red progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span>😡 {isHe ? 'מתקשה' : 'Struggling'}</span>
                <span>{redNLA} / {totalNLA} ({pctRedNLA}%)</span>
              </div>
              <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctRedNLA}%`, background: '#ef4444', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>
        </div>

        {/* OPT Progress Card */}
        <div className="glass-panel" style={{ padding: '1.5rem 1.75rem', borderTop: '4px solid var(--secondary-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{lOptTitle}</span>
            <span style={{ background: 'var(--secondary-color)', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 'bold' }}>
              {totalOPT} {isHe ? 'נוסחאות' : 'equations'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Green progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span>😄 {isHe ? 'שולט' : 'Mastered'}</span>
                <span>{greenOPT} / {totalOPT} ({pctGreenOPT}%)</span>
              </div>
              <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctGreenOPT}%`, background: 'var(--success)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Yellow progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span>😐 {isHe ? 'בתהליך' : 'Learning'}</span>
                <span>{yellowOPT} / {totalOPT} ({pctYellowOPT}%)</span>
              </div>
              <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctYellowOPT}%`, background: '#f59e0b', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Red progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span>😡 {isHe ? 'מתקשה' : 'Struggling'}</span>
                <span>{redOPT} / {totalOPT} ({pctRedOPT}%)</span>
              </div>
              <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pctRedOPT}%`, background: '#ef4444', borderRadius: '4px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ flex: 1, minWidth: '260px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: isHe ? 'auto' : '1rem', right: isHe ? '1rem' : 'auto' }} />
            <input 
              type="text" 
              placeholder={lSearchPlaceholder}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: isHe ? '0.75rem 2.8rem 0.75rem 1rem' : '0.75rem 1rem 0.75rem 2.8rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--math-bg)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          {/* Reset Progress Button */}
          <button 
            onClick={resetAllProgress} 
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
          >
            <RotateCcw size={16} /> {lReset}
          </button>
        </div>

        {/* Filter Badges */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
          {/* Course filter group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 'bold' }}>{lFilterTopic}</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setSelectedCourse('all')}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '16px',
                  background: selectedCourse === 'all' ? 'var(--primary-color)' : 'var(--math-bg)',
                  color: selectedCourse === 'all' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {lFilterAllCourses}
              </button>
              <button 
                onClick={() => setSelectedCourse('nla')}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '16px',
                  background: selectedCourse === 'nla' ? 'var(--primary-color)' : 'var(--math-bg)',
                  color: selectedCourse === 'nla' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {lFilterNla}
              </button>
              <button 
                onClick={() => setSelectedCourse('opt')}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '16px',
                  background: selectedCourse === 'opt' ? 'var(--primary-color)' : 'var(--math-bg)',
                  color: selectedCourse === 'opt' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {lFilterOpt}
              </button>
            </div>
          </div>

          {/* Status filter group (Now supporting 5 comprehensive modes!) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 'bold' }}>{lFilterMastery}</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setSelectedStatus('all')}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '16px',
                  background: selectedStatus === 'all' ? 'var(--accent-color)' : 'var(--math-bg)',
                  color: selectedStatus === 'all' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {lFilterAll}
              </button>
              <button 
                onClick={() => setSelectedStatus('green')}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '16px',
                  background: selectedStatus === 'green' ? 'var(--success)' : 'var(--math-bg)',
                  color: selectedStatus === 'green' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {lFilterMastered}
              </button>
              <button 
                onClick={() => setSelectedStatus('yellow')}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '16px',
                  background: selectedStatus === 'yellow' ? '#f59e0b' : 'var(--math-bg)',
                  color: selectedStatus === 'yellow' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {lFilterLearning}
              </button>
              <button 
                onClick={() => setSelectedStatus('red')}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '16px',
                  background: selectedStatus === 'red' ? '#ef4444' : 'var(--math-bg)',
                  color: selectedStatus === 'red' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {lFilterStruggling}
              </button>
              <button 
                onClick={() => setSelectedStatus('to-learn')}
                style={{
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: '16px',
                  background: selectedStatus === 'to-learn' ? '#64748b' : 'var(--math-bg)',
                  color: selectedStatus === 'to-learn' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {lFilterToLearn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Formulas Content Grouped by Category */}
      {Object.keys(categoriesMap).length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface-color)', border: '1px dashed var(--surface-border)', borderRadius: 'var(--radius-md)' }}>
          <Layers size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>{lNoMatches}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{lNoMatchesSub}</p>
        </div>
      ) : (
        Object.entries(categoriesMap).map(([category, items]) => {
          // Find original category style
          let style = DEFAULT_STYLE;
          for (const [engCat, s] of Object.entries(CATEGORY_STYLES)) {
            if (category === engCat || (items[0] && items[0].category === engCat)) {
              style = s;
              break;
            }
          }
          
          return (
            <div key={category} style={{ marginBottom: '4rem' }}>
              {/* Category Heading Banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.8rem', marginBottom: '1.8rem' }}>
                <div style={{
                  padding: '0.35rem 0.8rem',
                  borderRadius: '16px',
                  backgroundColor: style.badgeBg,
                  color: style.badgeText,
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {category}
                </div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>({items.length} {lItemsLabel})</span>
              </div>

              {/* Grid of Cards */}
              <div className="layout-grid">
                {items.map(f => {
                  const formulaName = isHe ? (f.nameHe || f.name) : f.name;
                  const formulaDesc = isHe ? (f.descriptionHe || f.description) : f.description;
                  
                  return (
                    <motion.div 
                      key={f.id} 
                      className="glass-card" 
                      onClick={() => setSelectedFormula(f)}
                      style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        borderColor: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                          ? 'var(--success)'
                          : seenFormulas[f.id] === 'yellow'
                          ? '#f59e0b'
                          : seenFormulas[f.id] === 'red'
                          ? '#ef4444'
                          : 'var(--surface-border)',
                        borderLeftWidth: isHe ? '1px' : '5px',
                        borderLeftColor: isHe ? 'var(--surface-border)' : style.border,
                        borderRightWidth: isHe ? '5px' : '1px',
                        borderRightColor: isHe ? style.border : 'var(--surface-border)',
                        boxShadow: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                          ? '0 8px 24px rgba(16, 185, 129, 0.12)'
                          : seenFormulas[f.id] === 'yellow'
                          ? '0 8px 24px rgba(245, 158, 11, 0.12)'
                          : seenFormulas[f.id] === 'red'
                          ? '0 8px 24px rgba(239, 68, 68, 0.12)'
                          : `0 4px 12px ${style.shadow}`,
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                        userSelect: 'none'
                      }}
                      whileHover={{ 
                        transform: 'translateY(-4px)', 
                        boxShadow: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                          ? '0 12px 30px rgba(16, 185, 129, 0.18)'
                          : seenFormulas[f.id] === 'yellow'
                          ? '0 12px 30px rgba(245, 158, 11, 0.18)'
                          : seenFormulas[f.id] === 'red'
                          ? '0 12px 30px rgba(239, 68, 68, 0.18)'
                          : `0 8px 20px ${style.glow}` 
                      }}
                    >
                      {/* 3-Tier Emoji Marking Row */}
                      <div 
                        onClick={(e) => e.stopPropagation()} // Prevent card click
                        style={{
                          position: 'absolute',
                          top: '1.1rem',
                          right: isHe ? 'auto' : '1.1rem',
                          left: isHe ? '1.1rem' : 'auto',
                          display: 'flex',
                          gap: '0.3rem',
                          zIndex: 5,
                          background: 'var(--surface-color)',
                          padding: '0.2rem',
                          borderRadius: '20px',
                          border: '1px solid var(--surface-border)',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        {/* 😄 Green button */}
                        <button
                          onClick={() => toggleSeen(f.id, seenFormulas[f.id] === 'green' ? null : 'green')}
                          style={{
                            width: '26px', height: '26px', borderRadius: '50%',
                            background: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
                            border: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true ? '1.5px solid var(--success)' : '1px dashed transparent',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.88rem', transition: 'all 0.2s ease', outline: 'none',
                            opacity: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true ? 1 : 0.45,
                            boxShadow: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                          onMouseLeave={(e) => { if (seenFormulas[f.id] !== 'green' && seenFormulas[f.id] !== true) e.currentTarget.style.opacity = '0.45'; }}
                          title={isHe ? 'שולט 😄' : 'Mastered 😄'}
                        >
                          😄
                        </button>

                        {/* 😐 Yellow button */}
                        <button
                          onClick={() => toggleSeen(f.id, seenFormulas[f.id] === 'yellow' ? null : 'yellow')}
                          style={{
                            width: '26px', height: '26px', borderRadius: '50%',
                            background: seenFormulas[f.id] === 'yellow' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                            border: seenFormulas[f.id] === 'yellow' ? '1.5px solid #f59e0b' : '1px dashed transparent',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.88rem', transition: 'all 0.2s ease', outline: 'none',
                            opacity: seenFormulas[f.id] === 'yellow' ? 1 : 0.45,
                            boxShadow: seenFormulas[f.id] === 'yellow' ? '0 0 8px rgba(245, 158, 11, 0.4)' : 'none'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                          onMouseLeave={(e) => { if (seenFormulas[f.id] !== 'yellow') e.currentTarget.style.opacity = '0.45'; }}
                          title={isHe ? 'בתהליך 😐' : 'Learning 😐'}
                        >
                          😐
                        </button>

                        {/* 😡 Red button */}
                        <button
                          onClick={() => toggleSeen(f.id, seenFormulas[f.id] === 'red' ? null : 'red')}
                          style={{
                            width: '26px', height: '26px', borderRadius: '50%',
                            background: seenFormulas[f.id] === 'red' ? 'rgba(239, 68, 68, 0.18)' : 'transparent',
                            border: seenFormulas[f.id] === 'red' ? '1.5px solid #ef4444' : '1px dashed transparent',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.88rem', transition: 'all 0.2s ease', outline: 'none',
                            opacity: seenFormulas[f.id] === 'red' ? 1 : 0.45,
                            boxShadow: seenFormulas[f.id] === 'red' ? '0 0 8px rgba(239, 68, 68, 0.4)' : 'none'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                          onMouseLeave={(e) => { if (seenFormulas[f.id] !== 'red') e.currentTarget.style.opacity = '0.45'; }}
                          title={isHe ? 'מתקשה 😡' : 'Struggling 😡'}
                        >
                          😡
                        </button>
                      </div>

                      {/* Course badge indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                        <span style={{ 
                          fontSize: '0.75rem', 
                           fontWeight: 'bold', 
                          textTransform: 'uppercase', 
                          color: f.courseId === 'nla' ? 'var(--primary-color)' : 'var(--secondary-color)' 
                        }}>
                          {f.courseId === 'nla' ? 'NLA' : 'OPT'}
                        </span>
                      </div>

                      {/* Equation Title */}
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        marginTop: '0.2rem', 
                        marginBottom: '1rem', 
                        paddingRight: isHe ? '0' : '5.5rem', 
                        paddingLeft: isHe ? '5.5rem' : '0', 
                        whiteSpace: 'normal', 
                        wordBreak: 'break-word', 
                        color: 'var(--text-primary)' 
                      }}>
                        {formulaName}
                      </h3>
                      
                      {/* Mathematical Equation Box - Beautifully Rendered via MathRenderer */}
                      <div style={{ 
                        background: 'var(--math-bg)', 
                        padding: '1.25rem 1rem', 
                        borderRadius: 'var(--radius-sm)', 
                        textAlign: 'center', 
                        marginBottom: '1.25rem',
                        overflowX: 'auto',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--surface-border)',
                        boxShadow: `inset 0 1px 4px rgba(0,0,0,0.15)`
                      }}>
                        <MathRenderer tex={f.equation} block={true} style={{ fontSize: '1.1rem' }} />
                      </div>

                      {/* Explicit Definition Sentence Requirement (Wrapped nicely without scrolling) */}
                      <div style={{ marginBottom: '1rem', flexGrow: 1, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: style.border, fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>
                          {lDefSentence}
                        </span>
                        <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 500, lineHeight: '1.4', margin: 0 }}>
                          {formulaDesc}
                        </p>
                      </div>

                      {/* Celebration status badge */}
                      {seenFormulas[f.id] && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.4rem', 
                          marginTop: '1rem',
                          padding: '0.4rem 0.8rem',
                          background: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                            ? 'rgba(16, 185, 129, 0.1)'
                            : seenFormulas[f.id] === 'yellow'
                            ? 'rgba(245, 158, 11, 0.1)'
                            : 'rgba(239, 68, 68, 0.1)', 
                          borderRadius: 'var(--radius-sm)',
                          border: `1px solid ${
                            seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                              ? 'rgba(16, 185, 129, 0.2)'
                              : seenFormulas[f.id] === 'yellow'
                              ? 'rgba(245, 158, 11, 0.2)'
                              : 'rgba(239, 68, 68, 0.2)'
                          }`,
                          alignSelf: 'flex-start'
                        }}>
                          <Award size={16} color={
                            seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                              ? 'var(--success)'
                              : seenFormulas[f.id] === 'yellow'
                              ? '#f59e0b'
                              : '#ef4444'
                          } />
                          <span style={{ 
                            fontSize: '0.8rem', 
                            color: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                              ? 'var(--success)'
                              : seenFormulas[f.id] === 'yellow'
                              ? '#f59e0b'
                              : '#ef4444', 
                            fontWeight: 'bold' 
                          }}>
                            {seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                              ? (isHe ? 'שולט' : 'Mastered')
                              : seenFormulas[f.id] === 'yellow'
                              ? (isHe ? 'בתהליך' : 'Learning')
                              : (isHe ? 'מתקשה' : 'Struggling')
                            }
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* POPUP DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {selectedFormula && (() => {
          const popupName = isHe ? (selectedFormula.nameHe || selectedFormula.name) : selectedFormula.name;
          const popupDesc = isHe ? (selectedFormula.descriptionHe || selectedFormula.description) : selectedFormula.description;
          const popupCat = isHe ? (selectedFormula.categoryHe || selectedFormula.category) : selectedFormula.category;
          
          let style = DEFAULT_STYLE;
          for (const [engCat, s] of Object.entries(CATEGORY_STYLES)) {
            if (selectedFormula.category === engCat) {
              style = s;
              break;
            }
          }

          return (
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(11, 15, 25, 0.85)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1.5rem'
              }}
              onClick={() => setSelectedFormula(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'var(--bg-color)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  maxWidth: '680px',
                  width: '100%',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
                  position: 'relative',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  direction: isHe ? 'rtl' : 'ltr'
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button 
                  onClick={() => setSelectedFormula(null)}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: isHe ? 'auto' : '1.5rem',
                    left: isHe ? '1.5rem' : 'auto',
                    background: 'var(--surface-color)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontSize: '1.5rem',
                    lineHeight: '1',
                    transition: 'all 0.2s'
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  &times;
                </motion.button>

                {/* Badges */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase', 
                    color: selectedFormula.courseId === 'nla' ? 'var(--primary-color)' : 'var(--secondary-color)',
                    padding: '0.3rem 0.75rem',
                    background: selectedFormula.courseId === 'nla' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(236, 72, 153, 0.12)',
                    borderRadius: '8px',
                    border: `1px solid ${selectedFormula.courseId === 'nla' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(236, 72, 153, 0.2)'}`
                  }}>
                    {selectedFormula.courseId === 'nla' ? lNlaTitle : lOptTitle}
                  </span>
                  
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem',
                    background: style.badgeBg,
                    color: style.badgeText,
                    borderRadius: '8px',
                    border: `1px solid ${style.border}`
                  }}>
                    {popupCat}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '1.5rem', 
                  fontWeight: '700', 
                  color: 'var(--text-primary)', 
                  paddingRight: isHe ? '0' : '2rem',
                  paddingLeft: isHe ? '2rem' : '0'
                }}>
                  {popupName}
                </h2>

                {/* Math Formula Rendering */}
                <div style={{
                  background: 'var(--math-bg)',
                  padding: '2rem 1.5rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid var(--surface-border)',
                  marginBottom: '2rem',
                  overflowX: 'auto',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  <MathRenderer tex={selectedFormula.equation} block={true} style={{ fontSize: '1.35rem' }} />
                </div>

                {/* Definition Sentence */}
                <div style={{ marginBottom: '2.5rem', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                  <h4 style={{ 
                    fontSize: '0.85rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px', 
                    color: style.border,
                    fontWeight: 'bold', 
                    marginBottom: '0.6rem' 
                  }}>
                    {lCoreDefSentence}
                  </h4>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.6', 
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    margin: 0
                  }}>
                    {popupDesc}
                  </p>
                </div>

                {/* Mastery Action Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
                    {lStatusLabel} {
                      seenFormulas[selectedFormula.id] === 'green' || seenFormulas[selectedFormula.id] === true
                        ? `😄 ${isHe ? 'שולט' : 'Mastered'}`
                        : seenFormulas[selectedFormula.id] === 'yellow'
                        ? `😐 ${isHe ? 'בתהליך' : 'Learning'}`
                        : seenFormulas[selectedFormula.id] === 'red'
                        ? `😡 ${isHe ? 'מתקשה' : 'Struggling'}`
                        : `📝 ${isHe ? 'צריך ללמוד' : 'To Learn'}`
                    }
                  </span>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {/* 😄 Green button */}
                    <button
                      onClick={() => toggleSeen(selectedFormula.id, seenFormulas[selectedFormula.id] === 'green' ? null : 'green')}
                      style={{
                        background: seenFormulas[selectedFormula.id] === 'green' || seenFormulas[selectedFormula.id] === true ? 'rgba(16, 185, 129, 0.15)' : 'var(--math-bg)',
                        color: seenFormulas[selectedFormula.id] === 'green' || seenFormulas[selectedFormula.id] === true ? 'var(--success)' : 'var(--text-primary)',
                        border: `1px solid ${seenFormulas[selectedFormula.id] === 'green' || seenFormulas[selectedFormula.id] === true ? 'var(--success)' : 'var(--surface-border)'}`,
                        padding: '0.55rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s',
                        boxShadow: seenFormulas[selectedFormula.id] === 'green' || seenFormulas[selectedFormula.id] === true ? '0 0 10px rgba(16, 185, 129, 0.25)' : 'none'
                      }}
                    >
                      <span>😄</span>
                      <span>{isHe ? 'שולט' : 'Mastered'}</span>
                    </button>

                    {/* 😐 Yellow button */}
                    <button
                      onClick={() => toggleSeen(selectedFormula.id, seenFormulas[selectedFormula.id] === 'yellow' ? null : 'yellow')}
                      style={{
                        background: seenFormulas[selectedFormula.id] === 'yellow' ? 'rgba(245, 158, 11, 0.15)' : 'var(--math-bg)',
                        color: seenFormulas[selectedFormula.id] === 'yellow' ? '#f59e0b' : 'var(--text-primary)',
                        border: `1px solid ${seenFormulas[selectedFormula.id] === 'yellow' ? '#f59e0b' : 'var(--surface-border)'}`,
                        padding: '0.55rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s',
                        boxShadow: seenFormulas[selectedFormula.id] === 'yellow' ? '0 0 10px rgba(245, 158, 11, 0.25)' : 'none'
                      }}
                    >
                      <span>😐</span>
                      <span>{isHe ? 'בתהליך' : 'Learning'}</span>
                    </button>

                    {/* 😡 Red button */}
                    <button
                      onClick={() => toggleSeen(selectedFormula.id, seenFormulas[selectedFormula.id] === 'red' ? null : 'red')}
                      style={{
                        background: seenFormulas[selectedFormula.id] === 'red' ? 'rgba(239, 68, 68, 0.15)' : 'var(--math-bg)',
                        color: seenFormulas[selectedFormula.id] === 'red' ? '#ef4444' : 'var(--text-primary)',
                        border: `1px solid ${seenFormulas[selectedFormula.id] === 'red' ? '#ef4444' : 'var(--surface-border)'}`,
                        padding: '0.55rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s',
                        boxShadow: seenFormulas[selectedFormula.id] === 'red' ? '0 0 10px rgba(239, 68, 68, 0.25)' : 'none'
                      }}
                    >
                      <span>😡</span>
                      <span>{isHe ? 'מתקשה' : 'Struggling'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
}
