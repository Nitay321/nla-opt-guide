import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formulas } from '../data/formulas';
import type { Formula } from '../data/formulas';
import MathRenderer from '../components/MathRenderer';
import { Award, Layers, Search, RotateCcw, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { useAppContext } from '../App';

interface CategoryStyle {
  border: string;
  badgeBg: string;
  badgeText: string;
  shadow: string;
  glow: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  'Probability Spaces': {
    border: 'var(--primary-color)',
    badgeBg: 'rgba(99, 102, 241, 0.12)',
    badgeText: 'var(--primary-color)',
    shadow: 'rgba(99, 102, 241, 0.05)',
    glow: 'rgba(99, 102, 241, 0.15)'
  },
  'Inclusion-Exclusion': {
    border: '#06b6d4',
    badgeBg: 'rgba(6, 182, 212, 0.12)',
    badgeText: '#06b6d4',
    shadow: 'rgba(6, 182, 212, 0.05)',
    glow: 'rgba(6, 182, 212, 0.15)'
  },
  'Conditional & Bayes': {
    border: '#0ea5e9',
    badgeBg: 'rgba(14, 165, 233, 0.12)',
    badgeText: '#0ea5e9',
    shadow: 'rgba(14, 165, 233, 0.05)',
    glow: 'rgba(14, 165, 233, 0.15)'
  },
  'Continuous Variables': {
    border: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    badgeText: '#10b981',
    shadow: 'rgba(16, 185, 129, 0.05)',
    glow: 'rgba(16, 185, 129, 0.15)'
  },
  'Continuous Distributions': {
    border: '#14b8a6',
    badgeBg: 'rgba(20, 184, 166, 0.12)',
    badgeText: '#14b8a6',
    shadow: 'rgba(20, 184, 166, 0.05)',
    glow: 'rgba(20, 184, 166, 0.15)'
  },
  'Discrete Variables': {
    border: '#f59e0b',
    badgeBg: 'rgba(245, 158, 11, 0.12)',
    badgeText: '#f59e0b',
    shadow: 'rgba(245, 158, 11, 0.05)',
    glow: 'rgba(245, 158, 11, 0.15)'
  },
  'Discrete Distributions': {
    border: '#f97316',
    badgeBg: 'rgba(249, 115, 22, 0.12)',
    badgeText: '#f97316',
    shadow: 'rgba(249, 115, 22, 0.05)',
    glow: 'rgba(249, 115, 22, 0.15)'
  },
  'Joint Distributions': {
    border: '#8b5cf6',
    badgeBg: 'rgba(139, 92, 246, 0.12)',
    badgeText: '#8b5cf6',
    shadow: 'rgba(139, 92, 246, 0.05)',
    glow: 'rgba(139, 92, 246, 0.15)'
  },
  'Probability Inequalities': {
    border: '#ec4899',
    badgeBg: 'rgba(236, 72, 153, 0.12)',
    badgeText: '#ec4899',
    shadow: 'rgba(236, 72, 153, 0.05)',
    glow: 'rgba(236, 72, 153, 0.15)'
  },
  'Moment Generating Functions': {
    border: '#d946ef',
    badgeBg: 'rgba(217, 70, 239, 0.12)',
    badgeText: '#d946ef',
    shadow: 'rgba(217, 70, 239, 0.05)',
    glow: 'rgba(217, 70, 239, 0.15)'
  },
  'Limit Theorems': {
    border: '#f43f5e',
    badgeBg: 'rgba(244, 63, 94, 0.12)',
    badgeText: '#f43f5e',
    shadow: 'rgba(244, 63, 94, 0.05)',
    glow: 'rgba(244, 63, 94, 0.15)'
  },
  'Method of Moments': {
    border: '#4f46e5',
    badgeBg: 'rgba(79, 70, 229, 0.12)',
    badgeText: '#4f46e5',
    shadow: 'rgba(79, 70, 229, 0.05)',
    glow: 'rgba(79, 70, 229, 0.15)'
  },
  'Maximum Likelihood': {
    border: '#7c3aed',
    badgeBg: 'rgba(124, 58, 237, 0.12)',
    badgeText: '#7c3aed',
    shadow: 'rgba(124, 58, 237, 0.05)',
    glow: 'rgba(124, 58, 237, 0.15)'
  },
  'Confidence Intervals': {
    border: '#059669',
    badgeBg: 'rgba(5, 150, 105, 0.12)',
    badgeText: '#059669',
    shadow: 'rgba(5, 150, 105, 0.05)',
    glow: 'rgba(5, 150, 105, 0.15)'
  },
  'Hypothesis Testing': {
    border: '#d97706',
    badgeBg: 'rgba(217, 119, 6, 0.12)',
    badgeText: '#d97706',
    shadow: 'rgba(217, 119, 6, 0.05)',
    glow: 'rgba(217, 119, 6, 0.15)'
  },
  'Estimator Properties': {
    border: '#475569',
    badgeBg: 'rgba(71, 85, 105, 0.12)',
    badgeText: '#475569',
    shadow: 'rgba(71, 85, 105, 0.05)',
    glow: 'rgba(71, 85, 105, 0.15)'
  },
  'Linear Regression': {
    border: '#0891b2',
    badgeBg: 'rgba(8, 145, 178, 0.12)',
    badgeText: '#0891b2',
    shadow: 'rgba(8, 145, 178, 0.05)',
    glow: 'rgba(8, 145, 178, 0.15)'
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
  const [selectedCourse, setSelectedCourse] = useState<'all' | 'prob' | 'stats'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'green' | 'yellow' | 'red' | 'to-learn'>('all');
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [viewMode, setViewMode] = useState<'grouped' | 'list' | 'tables'>('grouped');
  const [activeTableTab, setActiveTableTab] = useState<'distributions' | 'discrete-continuous' | '1d-2d' | 'inequalities' | 'estimators' | 'convergence'>('distributions');
  const [sortBy, setSortBy] = useState<'name' | 'course' | 'category'>('name');
  
  // Collapse Toggles for NLA & OPT Stats Blocks
  const [probExpanded, setProbExpanded] = useState(false);
  const [statsExpanded, setStatsExpanded] = useState(false);

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
  const totalPROB = formulas.filter(f => f.courseId === 'prob').length;
  const totalSTATS = formulas.filter(f => f.courseId === 'stats').length;
  
  const greenPROB = formulas.filter(f => f.courseId === 'prob' && (seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true)).length;
  const yellowPROB = formulas.filter(f => f.courseId === 'prob' && seenFormulas[f.id] === 'yellow').length;
  const redPROB = formulas.filter(f => f.courseId === 'prob' && seenFormulas[f.id] === 'red').length;

  const greenSTATS = formulas.filter(f => f.courseId === 'stats' && (seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true)).length;
  const yellowSTATS = formulas.filter(f => f.courseId === 'stats' && seenFormulas[f.id] === 'yellow').length;
  const redSTATS = formulas.filter(f => f.courseId === 'stats' && seenFormulas[f.id] === 'red').length;

  const pctGreenPROB = totalPROB > 0 ? Math.round((greenPROB / totalPROB) * 100) : 0;
  const pctYellowPROB = totalPROB > 0 ? Math.round((yellowPROB / totalPROB) * 100) : 0;
  const pctRedPROB = totalPROB > 0 ? Math.round((redPROB / totalPROB) * 100) : 0;

  const pctGreenSTATS = totalSTATS > 0 ? Math.round((greenSTATS / totalSTATS) * 100) : 0;
  const pctYellowSTATS = totalSTATS > 0 ? Math.round((yellowSTATS / totalSTATS) * 100) : 0;
  const pctRedSTATS = totalSTATS > 0 ? Math.round((redSTATS / totalSTATS) * 100) : 0;

  // Calculate Weighted Subject Mastery Index (😄 = 100%, 😐 = 50%, 😡 = 10%)
  const indexPROB = totalPROB > 0 
    ? Math.min(100, Math.round(((greenPROB * 1.0 + yellowPROB * 0.5 + redPROB * 0.1) / totalPROB) * 1000) / 10) 
    : 0;

  const indexSTATS = totalSTATS > 0 
    ? Math.min(100, Math.round(((greenSTATS * 1.0 + yellowSTATS * 0.5 + redSTATS * 0.1) / totalSTATS) * 1000) / 10) 
    : 0;

  const lMasteryIndexTitle = isHe ? 'מדד שליטה בנושא' : 'Subject Mastery Index';
  const lLegendTitle = isHe 
    ? '* מדד משוקלל: 😄 שליטה = 100% | 😐 בתהליך = 50% | 😡 מתקשה = 10%' 
    : '* Weighted Index: 😄 Mastered = 100% | 😐 Learning = 50% | 😡 Struggling = 10%';

  // Compute Sorted List for List View
  const sortedFormulas = [...filteredFormulas].sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = isHe ? (a.nameHe || a.name) : a.name;
      const nameB = isHe ? (b.nameHe || b.name) : b.name;
      return nameA.localeCompare(nameB, isHe ? 'he' : 'en');
    } else if (sortBy === 'course') {
      if (a.courseId !== b.courseId) {
        return a.courseId.localeCompare(b.courseId);
      }
      const chapterOrder = Object.keys(CATEGORY_STYLES);
      return chapterOrder.indexOf(a.category) - chapterOrder.indexOf(b.category);
    } else {
      const chapterOrder = Object.keys(CATEGORY_STYLES);
      const indexA = chapterOrder.indexOf(a.category);
      const indexB = chapterOrder.indexOf(b.category);
      if (indexA !== indexB) {
        return indexA - indexB;
      }
      const nameA = isHe ? (a.nameHe || a.name) : a.name;
      const nameB = isHe ? (b.nameHe || b.name) : b.name;
      return nameA.localeCompare(nameB, isHe ? 'he' : 'en');
    }
  });

  // Group by category
  const categoriesMap: Record<string, typeof formulas> = {};
  sortedFormulas.forEach(f => {
    const cat = isHe ? (f.categoryHe || f.category) : f.category;
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(f);
  });

  // Reusable card renderer
  const renderFormulaCard = (f: Formula, showCategory = false) => {
    const formulaName = isHe ? (f.nameHe || f.name) : f.name;
    const formulaDesc = isHe ? (f.descriptionHe || f.description) : f.description;

    // Find original category style
    let style = DEFAULT_STYLE;
    for (const [engCat, s] of Object.entries(CATEGORY_STYLES)) {
      if (f.category === engCat) {
        style = s;
        break;
      }
    }

    if (viewMode === 'list') {
      return (
        <motion.div 
          key={f.id} 
          className="list-view-card" 
          onClick={() => setSelectedFormula(f)}
          style={{ 
            direction: isHe ? 'rtl' : 'ltr',
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
              ? '0 8px 24px rgba(16, 185, 129, 0.08)'
              : seenFormulas[f.id] === 'yellow'
              ? '0 8px 24px rgba(245, 158, 11, 0.08)'
              : seenFormulas[f.id] === 'red'
              ? '0 8px 24px rgba(239, 68, 68, 0.08)'
              : `0 4px 12px ${style.shadow}`,
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
            userSelect: 'none'
          }}
          whileHover={{ 
            transform: 'translateY(-2px)', 
            boxShadow: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
              ? '0 12px 30px rgba(16, 185, 129, 0.14)'
              : seenFormulas[f.id] === 'yellow'
              ? '0 12px 30px rgba(245, 158, 11, 0.14)'
              : seenFormulas[f.id] === 'red'
              ? '0 12px 30px rgba(239, 68, 68, 0.14)'
              : `0 8px 20px ${style.glow}` 
          }}
        >
          {/* Column 1: Info Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', justifySelf: 'stretch' }}>
            {/* Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ 
                fontSize: '0.72rem', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                color: f.courseId === 'prob' ? 'var(--primary-color)' : 'var(--secondary-color)' 
              }}>
                {f.courseId === 'prob' ? (isHe ? 'הסתברות' : 'PROB') : (isHe ? 'סטטיסטיקה' : 'STATS')}
              </span>
              {showCategory && (
                <span style={{ 
                  fontSize: '0.68rem', 
                  fontWeight: 'bold', 
                  padding: '0.1rem 0.4rem',
                  borderRadius: '6px',
                  backgroundColor: style.badgeBg,
                  color: style.badgeText,
                  border: `1px solid ${style.border}`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {isHe ? (f.categoryHe || f.category) : f.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 style={{ 
              fontSize: '1.15rem', 
              margin: '0.15rem 0 0.35rem 0', 
              whiteSpace: 'normal', 
              wordBreak: 'break-word', 
              color: 'var(--text-primary)',
              fontWeight: 700
            }}>
              {formulaName}
            </h3>

            {/* Definition */}
            <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: style.border, fontWeight: 'bold', display: 'block', marginBottom: '0.15rem' }}>
                {lDefSentence}
              </span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 500, lineHeight: '1.35', margin: 0 }}>
                {formulaDesc}
              </p>
            </div>
          </div>

          {/* Column 2: Math Equation Box */}
          <div style={{ 
            background: 'var(--math-bg)', 
            padding: '0.85rem 1rem', 
            borderRadius: 'var(--radius-sm)', 
            textAlign: 'center', 
            overflowX: 'auto',
            color: 'var(--text-primary)',
            border: '1px solid var(--surface-border)',
            boxShadow: `inset 0 1px 4px rgba(0,0,0,0.15)`,
            justifySelf: 'stretch',
            alignSelf: 'stretch',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MathRenderer tex={f.equation} block={true} style={{ fontSize: '1rem' }} />
          </div>

          {/* Column 3: Mastery actions & Emojis */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.75rem', 
            alignItems: 'center',
            justifyContent: 'center',
            justifySelf: 'center',
            width: '100%'
          }}>
            {/* Emojis selector inline wrapper */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              style={{
                display: 'flex',
                gap: '0.35rem',
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

            {/* Celebration status badge */}
            {seenFormulas[f.id] && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.3rem', 
                padding: '0.3rem 0.6rem',
                background: seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                  ? 'rgba(16, 185, 129, 0.08)'
                  : seenFormulas[f.id] === 'yellow'
                  ? 'rgba(245, 158, 11, 0.08)'
                  : 'rgba(239, 68, 68, 0.08)', 
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${
                  seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                    ? 'rgba(16, 185, 129, 0.15)'
                    : seenFormulas[f.id] === 'yellow'
                    ? 'rgba(245, 158, 11, 0.15)'
                    : 'rgba(239, 68, 68, 0.15)'
                }`
              }}>
                <Award size={14} color={
                  seenFormulas[f.id] === 'green' || seenFormulas[f.id] === true
                    ? 'var(--success)'
                    : seenFormulas[f.id] === 'yellow'
                    ? '#f59e0b'
                    : '#ef4444'
                } />
                <span style={{ 
                  fontSize: '0.75rem', 
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
          </div>
        </motion.div>
      );
    }

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            color: f.courseId === 'prob' ? 'var(--primary-color)' : 'var(--secondary-color)' 
          }}>
            {f.courseId === 'prob' ? (isHe ? 'הסתברות' : 'PROB') : (isHe ? 'סטטיסטיקה' : 'STATS')}
          </span>
          {showCategory && (
            <span style={{ 
              fontSize: '0.72rem', 
              fontWeight: 'bold', 
              padding: '0.1rem 0.5rem',
              borderRadius: '6px',
              backgroundColor: style.badgeBg,
              color: style.badgeText,
              border: `1px solid ${style.border}`,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {isHe ? (f.categoryHe || f.category) : f.category}
            </span>
          )}
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
  };


  // ==========================================
  // Comparative Summary Tables Render Function
  // ==========================================
  const renderComparisonTables = () => {
    return (
      <div style={{ marginBottom: '4rem', direction: isHe ? 'rtl' : 'ltr' }}>
        {/* Table Tabs */}
        <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.button
            onClick={() => setActiveTableTab('distributions')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`filter-btn ${activeTableTab === 'distributions' ? 'active' : ''}`}
            style={{ 
              background: activeTableTab === 'distributions' ? 'var(--primary-color)' : 'var(--math-bg)',
              color: activeTableTab === 'distributions' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--surface-border)',
              padding: '0.6rem 1.1rem',
              fontWeight: 600
            }}
          >
            {isHe ? 'מטריצת התפלגויות מלאה 📊' : 'Master Distributions Matrix 📊'}
          </motion.button>
          
          <motion.button
            onClick={() => setActiveTableTab('discrete-continuous')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`filter-btn ${activeTableTab === 'discrete-continuous' ? 'active' : ''}`}
            style={{ 
              background: activeTableTab === 'discrete-continuous' ? 'var(--primary-color)' : 'var(--math-bg)',
              color: activeTableTab === 'discrete-continuous' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--surface-border)',
              padding: '0.6rem 1.1rem',
              fontWeight: 600
            }}
          >
            {isHe ? 'הסתברות בדידה מול רציפה ⚖️' : 'Discrete vs. Continuous ⚖️'}
          </motion.button>

          <motion.button
            onClick={() => setActiveTableTab('1d-2d')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`filter-btn ${activeTableTab === '1d-2d' ? 'active' : ''}`}
            style={{ 
              background: activeTableTab === '1d-2d' ? 'var(--primary-color)' : 'var(--math-bg)',
              color: activeTableTab === '1d-2d' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--surface-border)',
              padding: '0.6rem 1.1rem',
              fontWeight: 600
            }}
          >
            {isHe ? 'משתנה חד-ממדי מול דו-ממדי 🌀' : '1D vs. 2D Random Variables 🌀'}
          </motion.button>
          
          <motion.button
            onClick={() => setActiveTableTab('inequalities')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`filter-btn ${activeTableTab === 'inequalities' ? 'active' : ''}`}
            style={{ 
              background: activeTableTab === 'inequalities' ? 'var(--primary-color)' : 'var(--math-bg)',
              color: activeTableTab === 'inequalities' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--surface-border)',
              padding: '0.6rem 1.1rem',
              fontWeight: 600
            }}
          >
            {isHe ? 'אי-שוויונות הסתברותיים 🛡️' : 'Probability Inequalities 🛡️'}
          </motion.button>

          <motion.button
            onClick={() => setActiveTableTab('estimators')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`filter-btn ${activeTableTab === 'estimators' ? 'active' : ''}`}
            style={{ 
              background: activeTableTab === 'estimators' ? 'var(--primary-color)' : 'var(--math-bg)',
              color: activeTableTab === 'estimators' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--surface-border)',
              padding: '0.6rem 1.1rem',
              fontWeight: 600
            }}
          >
            {isHe ? 'תכונות אמדנים 🎯' : 'Estimator Properties 🎯'}
          </motion.button>

          <motion.button
            onClick={() => setActiveTableTab('convergence')}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`filter-btn ${activeTableTab === 'convergence' ? 'active' : ''}`}
            style={{ 
              background: activeTableTab === 'convergence' ? 'var(--primary-color)' : 'var(--math-bg)',
              color: activeTableTab === 'convergence' ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--surface-border)',
              padding: '0.6rem 1.1rem',
              fontWeight: 600
            }}
          >
            {isHe ? 'סוגי התכנסות 🔄' : 'Types of Convergence 🔄'}
          </motion.button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTableTab === 'distributions' && (
            <motion.div
              key="distributions-table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--primary-color)' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📊</span> {isHe ? 'מטריצת התפלגויות מלאה' : 'Master Distributions Matrix'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  {isHe 
                    ? 'סיכום מקיף של כל ההתפלגויות שלמדנו בקורס הנוכחי, ומתחתיהן התפלגויות הרקע שחשוב להכיר מקורסים קודמים.'
                    : 'A comprehensive summary of all probability distributions learned in the current course, followed by essential background distributions from prerequisites.'}
                </p>

                {/* Section A: Learned in This Course */}
                <h3 style={{ fontSize: '1.15rem', color: '#10b981', borderBottom: '1px dashed rgba(16, 185, 129, 0.3)', paddingBottom: '0.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
                  ✨ {isHe ? 'התפלגויות שלמדנו בקורס הנוכחי (נושאים חדשים)' : 'Distributions Learned in This Course'}
                </h3>
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="custom-table" style={{ width: '100%', minWidth: '1000px', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                        <th style={{ padding: '0.75rem', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'שם ההתפלגות' : 'Distribution Name'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'center' }}>{isHe ? 'סוג' : 'Type'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'center' }}>{isHe ? 'פרמטרים' : 'Parameters'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>{isHe ? 'פונקציית צפיפות/הסתברות' : 'PDF / PMF'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>{isHe ? 'תוחלת' : 'Expectation'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>{isHe ? 'שונות' : 'Variance'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>{isHe ? 'פונקציה יוצרת מומנטים MGF' : 'MGF'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'אחידה רציפה (Uniform)' : 'Continuous Uniform'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#10b981' }}>{isHe ? 'רציף' : 'Continuous'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="a, b \in \mathbb{R}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="f_X(x) = \frac{1}{b-a}" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="a \le x \le b" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{a+b}{2}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{(b-a)^2}{12}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{e^{bt} - e^{at}}{t(b-a)}" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'מעריכית (Exponential)' : 'Exponential'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#10b981' }}>{isHe ? 'רציף' : 'Continuous'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="\lambda > 0" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="f_X(x) = \lambda e^{-\lambda x}" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="x \ge 0" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{1}{\lambda}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{1}{\lambda^2}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{\lambda}{\lambda - t}" /><br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="t < \lambda" /></span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'נורמלית (Normal)' : 'Normal'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#10b981' }}>{isHe ? 'רציף' : 'Continuous'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="\mu \in \mathbb{R}, \sigma^2 > 0" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="f_X(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\mu" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\sigma^2" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="e^{\mu t + \frac{1}{2}\sigma^2 t^2}" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'חי בריבוע (Chi-Square)' : 'Chi-Square'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#10b981' }}>{isHe ? 'רציף' : 'Continuous'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="k \in \mathbb{N}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="f_X(x) = \frac{x^{k/2-1} e^{-x/2}}{2^{k/2}\Gamma(k/2)}" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="x > 0" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="k" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="2k" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="(1 - 2t)^{-k/2}" /><br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="t < 1/2" /></span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? "סטודנט t (Student's t)" : "Student's t"}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#10b981' }}>{isHe ? 'רציף' : 'Continuous'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="\nu \in \mathbb{N}" /></td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{isHe ? 'עקומה פעמונית סימטרית' : 'Symmetric bell shape'}</td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="0" /><br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>(<MathRenderer tex="\nu > 1" />)</span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{\nu}{\nu - 2}" /><br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>(<MathRenderer tex="\nu > 2" />)</span></td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{isHe ? 'לא קיים' : 'None'}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'ריילי (Rayleigh)' : 'Rayleigh'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#10b981' }}>{isHe ? 'רציף' : 'Continuous'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="\sigma > 0" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="f_X(x) = \frac{x}{\sigma^2} e^{-x^2/(2\sigma^2)}" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="x \ge 0" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\sigma \sqrt{\frac{\pi}{2}}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\sigma^2 \frac{4 - \pi}{2}" /></td>
                        <td style={{ padding: '0.75rem', color:'var(--text-muted)' }}>{isHe ? 'פתרון אינטגרלי מורכב' : 'Complex integral'}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'גאמה / ארלנג (Gamma)' : 'Gamma / Erlang'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#10b981' }}>{isHe ? 'רציף' : 'Continuous'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="\alpha, \beta > 0" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="f_X(x) = \frac{\beta^\alpha x^{\alpha-1} e^{-\beta x}}{\Gamma(\alpha)}" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="x \ge 0" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{\alpha}{\beta}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{\alpha}{\beta^2}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="(1 - t/\beta)^{-\alpha}" /><br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="t < \beta" /></span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Section B: Prerequisite distributions */}
                <h3 style={{ fontSize: '1.15rem', color: '#f59e0b', borderBottom: '1px dashed rgba(245, 158, 11, 0.3)', paddingBottom: '0.4rem', marginTop: '3rem', marginBottom: '1rem' }}>
                  ⏳ {isHe ? 'התפלגויות רקע (מקורסים קודמים - קדם הכרחי)' : 'Prerequisite Background Distributions'}
                </h3>
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="custom-table" style={{ width: '100%', minWidth: '1000px', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                        <th style={{ padding: '0.75rem', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'שם ההתפלגות' : 'Distribution Name'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'center' }}>{isHe ? 'סוג' : 'Type'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'center' }}>{isHe ? 'פרמטרים' : 'Parameters'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>{isHe ? 'פונקציית צפיפות/הסתברות' : 'PDF / PMF'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>{isHe ? 'תוחלת' : 'Expectation'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>{isHe ? 'שונות' : 'Variance'}</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left' }}>{isHe ? 'פונקציה יוצרת מומנטים MGF' : 'MGF'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'ברנולי (Bernoulli)' : 'Bernoulli'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#f59e0b' }}>{isHe ? 'בדיד' : 'Discrete'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="p \in [0,1]" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="p_X(x) = p^x (1-p)^{1-x}" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="x \in \{0, 1\}" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="p" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="p(1-p)" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="(1-p) + pe^t" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'בינומית (Binomial)' : 'Binomial'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#f59e0b' }}>{isHe ? 'בדיד' : 'Discrete'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="n \in \mathbb{N}, p \in [0,1]" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="k \in \{0,..,n\}" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="np" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="np(1-p)" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="((1-p) + pe^t)^n" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'פואסון (Poisson)' : 'Poisson'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#f59e0b' }}>{isHe ? 'בדיד' : 'Discrete'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="\lambda > 0" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="P(X=k) = \frac{e^{-\lambda}\lambda^k}{k!}" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="k \in \{0, 1, ..\}" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\lambda" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\lambda" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="e^{\lambda(e^t - 1)}" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'גיאומטרית (Geometric)' : 'Geometric'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#f59e0b' }}>{isHe ? 'בדיד' : 'Discrete'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="p \in (0,1]" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="P(X=k) = (1-p)^{k-1}p" /> <br/><span style={{fontSize:'0.75rem', color:'var(--text-muted)'}}><MathRenderer tex="k \in \{1, 2, ..\}" /></span></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{1}{p}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{1-p}{p^2}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="\frac{pe^t}{1 - (1-p)e^t}" /></td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{isHe ? 'היפרגיאומטרית (Hypergeom.)' : 'Hypergeometric'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><span style={{ color: '#f59e0b' }}>{isHe ? 'בדיד' : 'Discrete'}</span></td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}><MathRenderer tex="N, D, n \in \mathbb{N}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="P(X=k) = \frac{\binom{D}{k}\binom{N-D}{n-k}}{\binom{N}{n}}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="n \frac{D}{N}" /></td>
                        <td style={{ padding: '0.75rem' }}><MathRenderer tex="n \frac{D}{N}(1-\frac{D}{N})\frac{N-n}{N-1}" /></td>
                        <td style={{ padding: '0.75rem', color:'var(--text-muted)' }}>{isHe ? 'לא שימושי / מורכב' : 'Not useful / Complex'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTableTab === 'discrete-continuous' && (
            <motion.div
              key="discrete-continuous-table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--accent-secondary)' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>⚖️</span> {isHe ? 'הבדלים בין הסתברות רציפה לבדידה' : 'Continuous vs. Discrete Probability'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  {isHe 
                    ? 'טבלת השוואה מקיפה בין מודל הסתברות בדיד למודל הסתברות רציף, המציגה את האנלוגיה המלאה בין סכומים לאינטגרלים.'
                    : 'A comprehensive comparative analysis between discrete and continuous probability models, showcasing the perfect mathematical analogy between sums and integrals.'}
                </p>

                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="custom-table" style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                        <th style={{ padding: '0.85rem', width: '20%', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'תכונה להשוואה' : 'Concept / Property'}</th>
                        <th style={{ padding: '0.85rem', width: '40%', textAlign: isHe ? 'right' : 'left', color: '#f59e0b' }}>{isHe ? 'הסתברות בדידה (Discrete)' : 'Discrete Probability'}</th>
                        <th style={{ padding: '0.85rem', width: '40%', textAlign: isHe ? 'right' : 'left', color: '#10b981' }}>{isHe ? 'הסתברות רציפה (Continuous)' : 'Continuous Probability'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'תומך / מרחב ערכים' : 'Support / Value Space'}</td>
                        <td style={{ padding: '0.85rem' }}>{isHe ? 'קבוצה סופית או בת-מנייה של נקודות מבודדות (למשל, מספרים שלמים).' : 'Finite or countable set of isolated points (e.g. integers).'}</td>
                        <td style={{ padding: '0.85rem' }}>{isHe ? 'קבוצה שאינה בת-מנייה, מיוצגת לרוב כקטע או רצף של מספרים ממשיים.' : 'Uncountable set, typically represented as an interval or union of intervals on R.'}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'פונקציית ההסתברות' : 'Probability Function'}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong>{isHe ? 'פונקציית הסתברות (PMF)' : 'Probability Mass Function (PMF)'}</strong><br/>
                          <MathRenderer tex="p_X(x) = P(X = x)" /><br/>
                          <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{isHe ? 'נותנת את ההסתברות המדויקת בכל נקודה.' : 'Gives exact point probabilities.'}</span>
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong>{isHe ? 'פונקציית צפיפות (PDF)' : 'Probability Density Function (PDF)'}</strong><br/>
                          <MathRenderer tex="f_X(x) = \frac{d}{dx}F_X(x)" /><br/>
                          <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{isHe ? 'מייצגת צפיפות/קצב צבירה; ערכי פונקציה יכולים לעלות על 1.' : 'Represents density/accumulation rate; values can exceed 1.'}</span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'הסתברות בנקודה בודדת' : 'Single Point Probability'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="P(X = x) = p_X(x) \ge 0" /></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="P(X = x) = 0" /> <br/><span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{isHe ? 'ההסתברות בנקודה מדויקת היא אפס לחלוטין.' : 'The probability of any exact single point is mathematically zero.'}</span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'תנאי נרמול' : 'Normalization Rule'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\sum_{x \in S} p_X(x) = 1" /></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\int_{-\infty}^{\infty} f_X(x)dx = 1" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'פונקציית התפלגות (CDF)' : 'Cumulative Dist. Function'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="F_X(x) = \sum_{t \le x} p_X(t)" /><br/><span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{isHe ? 'פונקציית מדרגות רציפה מימין' : 'Step-wise right-continuous function'}</span></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="F_X(x) = \int_{-\infty}^{x} f_X(t)dt" /><br/><span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{isHe ? 'פונקציה רציפה וחלקלקה' : 'Fully continuous, smooth function'}</span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'התוחלת' : 'Expected Value'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\mathbb{E}[X] = \sum_{x \in S} x \cdot p_X(x)" /></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\mathbb{E}[X] = \int_{-\infty}^{\infty} x \cdot f_X(x)dx" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'משפט הסטטיסטיקאי ההמום (LOTUS)' : 'LOTUS'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\mathbb{E}[h(X)] = \sum_{x \in S} h(x) \cdot p_X(x)" /></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\mathbb{E}[h(X)] = \int_{-\infty}^{\infty} h(x) \cdot f_X(x)dx" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'השונות' : 'Variance'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\text{Var}(X) = \sum_{x \in S} (x-\mu)^2 p_X(x)" /></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\text{Var}(X) = \int_{-\infty}^{\infty} (x-\mu)^2 f_X(x)dx" /></td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'פונקציה יוצרת מומנטים MGF' : 'MGF'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="M_X(t) = \sum_{x \in S} e^{tx} p_X(x)" /></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="M_X(t) = \int_{-\infty}^{\infty} e^{tx} f_X(x)dx" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTableTab === '1d-2d' && (
            <motion.div
              key="1d-2d-table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--secondary-color)' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🌀</span> {isHe ? 'השוואה בין משתנה מקרי חד-ממדי לדו-ממדי' : '1D vs. 2D Random Variables'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  {isHe 
                    ? 'השוואה שיטתית של אופן הטיפול במשתנה מקרי יחיד (1D) לעומת וקטור מקרי משותף (2D), הן במקרה הבדיד והן במקרה הרציף.'
                    : 'A systematic comparison of operations on a single random variable (1D) versus a joint random vector (2D) for both discrete and continuous domains.'}
                </p>

                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="custom-table" style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                        <th style={{ padding: '0.85rem', width: '20%', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'היבט להשוואה' : 'Operation / Dimension'}</th>
                        <th style={{ padding: '0.85rem', width: '40%', textAlign: isHe ? 'right' : 'left', color: 'var(--primary-color)' }}>{isHe ? 'משתנה חד-ממדי (1D)' : '1D Random Variable'}</th>
                        <th style={{ padding: '0.85rem', width: '40%', textAlign: isHe ? 'right' : 'left', color: 'var(--secondary-color)' }}>{isHe ? 'וקטור דו-ממדי (2D)' : '2D Random Variable (Joint)'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'הגדרה ומיפוי' : 'Basic Concept'}</td>
                        <td style={{ padding: '0.85rem' }}>{isHe ? 'משתנה מקרי יחיד X הממפה ממרחב המדגם לישר הממשי R.' : 'A single mapping X: Omega -> R.'}</td>
                        <td style={{ padding: '0.85rem' }}>{isHe ? 'זוג סדור (X, Y) הממפה ממרחב המדגם למישור הדו-ממדי R2.' : 'A random vector (X, Y): Omega -> R^2, mapping outcomes to a coordinate plane.'}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'פונקציית התפלגות (CDF)' : 'Cumulative Dist. Function'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="F_X(x) = P(X \le x)" /></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="F_{X,Y}(x,y) = P(X \le x, Y \le y)" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'פונקציית ההסתברות (בדיד)' : 'Discrete Case (PMF)'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="p_X(x) = P(X = x)" /></td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong>{isHe ? 'הסתברות משותפת:' : 'Joint PMF:'}</strong> <MathRenderer tex="p_{X,Y}(x,y) = P(X=x, Y=y)" /><br/><br/>
                          <strong>{isHe ? 'חילוץ שוליים:' : 'Marginal PMF:'}</strong><br/>
                          <MathRenderer tex="p_X(x) = \sum_y p_{X,Y}(x,y)" /><br/>
                          <MathRenderer tex="p_Y(y) = \sum_x p_{X,Y}(x,y)" />
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'פונקציית צפיפות (רציף)' : 'Continuous Case (PDF)'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="f_X(x) = \frac{d}{dx}F_X(x)" /></td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong>{isHe ? 'צפיפות משותפת:' : 'Joint PDF:'}</strong> <MathRenderer tex="f_{X,Y}(x,y) = \frac{\partial^2}{\partial x \partial y}F_{X,Y}(x,y)" /><br/><br/>
                          <strong>{isHe ? 'חילוץ שוליים (אינטגרציה):' : 'Marginal PDF:'}</strong><br/>
                          <MathRenderer tex="f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x,y)dy" /><br/>
                          <MathRenderer tex="f_Y(y) = \int_{-\infty}^{\infty} f_{X,Y}(x,y)dx" />
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'אי-תלות בין משתנים' : 'Independence Condition'}</td>
                        <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>{isHe ? 'לא רלוונטי (משתנה יחיד)' : 'N/A (Single variable)'}</td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'ההתפלגות המשותפת היא מכפלת השוליות:' : 'Joint distribution factors into product of marginals:'}<br/>
                          <span style={{color: '#10b981'}}><strong>{isHe ? 'בדיד:' : 'Discrete:'}</strong></span> <MathRenderer tex="p_{X,Y}(x,y) = p_X(x) \cdot p_Y(y)" /><br/>
                          <span style={{color: '#06b6d4'}}><strong>{isHe ? 'רציף:' : 'Continuous:'}</strong></span> <MathRenderer tex="f_{X,Y}(x,y) = f_X(x) \cdot f_Y(y)" />
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'תוחלת של פונקציה' : 'Expectation of Functions'}</td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\mathbb{E}[g(X)] = \int g(x)f_X(x)dx" /></td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="\mathbb{E}[g(X,Y)] = \int \int g(x,y)f_{X,Y}(x,y)dxdy" /></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'שונות וקשרים ליניאריים' : 'Variance & Covariance'}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong>{isHe ? 'שונות:' : 'Variance:'}</strong><br/>
                          <MathRenderer tex="\text{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong>{isHe ? 'שונות משותפת (קובריאנס):' : 'Covariance:'}</strong><br/>
                          <MathRenderer tex="\text{Cov}(X,Y) = \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y]" /><br/><br/>
                          <strong>{isHe ? 'שונות סכום:' : 'Variance of Sum:'}</strong><br/>
                          <MathRenderer tex="\text{Var}(X \pm Y) = \text{Var}(X) + \text{Var}(Y) \pm 2\text{Cov}(X,Y)" />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{isHe ? 'מדד קשר מנורמל' : 'Normalized Correlation'}</td>
                        <td style={{ padding: '0.85rem', color: 'var(--text-muted)' }}>{isHe ? 'לא רלוונטי' : 'N/A'}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong>{isHe ? 'מקדם המתאם של פירסון:' : 'Pearson Correlation:'}</strong><br/>
                          <MathRenderer tex="\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sqrt{\text{Var}(X)\text{Var}(Y)}}" /><br/>
                          <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}><MathRenderer tex="-1 \le \rho_{X,Y} \le 1" /></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTableTab === 'inequalities' && (
            <motion.div
              key="inequalities-table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid var(--primary-color)' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🛡️</span> {isHe ? 'אי-שוויונות הסתברותיים וריכוז הסתברות' : 'Probability Inequalities & Concentration Bounds'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  {isHe 
                    ? 'השוואה מקיפה בין אי-השוויונות המרכזיים המשמשים לחסימת הסתברויות זנב וקביעת גודלי מדגם מינימליים ללא ידיעת ההתפלגות המלאה.'
                    : 'A comprehensive comparison between the core inequalities used to bound tail probabilities and determine minimum sample sizes without knowing the exact underlying distribution.'}
                </p>

                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="custom-table" style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                        <th style={{ padding: '0.85rem', width: '18%', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'שם האי-שוויון' : 'Inequality'}</th>
                        <th style={{ padding: '0.85rem', width: '22%', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'תנאי קדם ודרישות' : 'Prerequisites & Conditions'}</th>
                        <th style={{ padding: '0.85rem', width: '25%', textAlign: isHe ? 'right' : 'left', color: 'var(--primary-color)' }}>{isHe ? 'הנוסחה המתמטית' : 'Mathematical Formula'}</th>
                        <th style={{ padding: '0.85rem', width: '15%', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'קצב דעיכת הזנב' : 'Tail Decay Rate'}</th>
                        <th style={{ padding: '0.85rem', width: '20%', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'שימושים ומשמעות' : 'Core Application & Intuition'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>
                          {isHe ? 'מרקוב (Markov)' : "Markov's Inequality"}
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'משתנה מקרי אי-שלילי בלבד:' : 'Non-negative random variable only:'} <br/>
                          <MathRenderer tex="X \ge 0" /><br/>
                          {isHe ? 'קבוע חיובי:' : 'Positive constant:'} <MathRenderer tex="c > 0" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="P(X \ge c) \le \frac{\mathbb{E}[X]}{c}" />
                        </td>
                        <td style={{ padding: '0.85rem', fontWeight: 600, color: '#f59e0b' }}>
                          {isHe ? 'ליניארי איטי' : 'Slow Linear'}<br/>
                          <MathRenderer tex="O(1/c)" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe 
                            ? 'הבסיסי ביותר. מאפשר לחסום הסתברות זנב על סמך התוחלת בלבד. לדוגמה: לכל היותר 10% מהעובדים יכולים להרוויח פי 10 מהשכר הממוצע.' 
                            : 'The most basic bound. Requires only the expected value. Example: at most 10% of employees can earn 10 times the average salary.'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>
                          {isHe ? "צ'בישב (Chebyshev)" : "Chebyshev's Inequality"}
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'כל התפלגות בעלת תוחלת ושונות סופיות:' : 'Any distribution with finite mean and variance:'}<br/>
                          <MathRenderer tex="\mathbb{E}[X] = \mu, \ \text{Var}(X) = \sigma^2" /><br/>
                          {isHe ? 'קבוע חיובי:' : 'Positive constant:'} <MathRenderer tex="c > 0" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="P(|X - \mu| \ge c) \le \frac{\text{Var}(X)}{c^2}" /><br/><br/>
                          <strong>{isHe ? 'צורת סטיות תקן:' : 'Standard deviation form:'}</strong><br/>
                          <MathRenderer tex="P(|X - \mu| \ge k\sigma) \le \frac{1}{k^2}" />
                        </td>
                        <td style={{ padding: '0.85rem', fontWeight: 600, color: '#f59e0b' }}>
                          {isHe ? 'פולינומי בינוני' : 'Medium Polynomial'}<br/>
                          <MathRenderer tex="O(1/c^2)" /> {isHe ? 'או' : 'or'} <MathRenderer tex="O(1/k^2)" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe 
                            ? 'חוסם את מרחק המשתנה מהממוצע שלו על סמך השונות, ללא קשר לצורת ההתפלגות. לדוגמה: לכל היותר 11.1% מכל התפלגות בעולם רחוקים יותר מ-3 סטיות תקן מהממוצע.' 
                            : 'Bounds the distance of a variable from its mean using variance, regardless of shape. Example: at most 11.1% of any distribution lies beyond 3 standard deviations.'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>
                          {isHe ? 'הופדינג (Hoeffding)' : "Hoeffding's Inequality"}
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'משתנים בלתי תלויים בעלי התפלגות זהה (i.i.d.):' : 'Independent & identically distributed (i.i.d.) variables:'}<br/>
                          <MathRenderer tex="X_1, \dots, X_n \sim Bern(p)" /><br/>
                          {isHe ? 'ממוצע מדגם:' : 'Sample mean:'} <MathRenderer tex="\bar{X}_n = \frac{1}{n}\sum X_i" /><br/>
                          {isHe ? 'חסומים בקטע.' : 'Bounded support.'}
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="P(|\bar{X}_n - p| \ge \epsilon) \le 2e^{-2n\epsilon^2}" />
                        </td>
                        <td style={{ padding: '0.85rem', fontWeight: 600, color: '#10b981' }}>
                          {isHe ? 'מעריכי מהיר במיוחד' : 'Super Fast Exponential'}<br/>
                          <MathRenderer tex="O(e^{-n})" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong>{isHe ? 'קביעת גודל מדגם מינימלי:' : 'Minimum Sample Size:'}</strong><br/>
                          <MathRenderer tex="n \ge \frac{\ln(2/\alpha)}{2\epsilon^2}" /><br/>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {isHe 
                              ? "חיסכון עצום בגודל המדגם (מעל 60% לעומת צ'בישב) בסקרים, מערכות תוכנה וניסויים קליניים בזכות דעיכה מעריכית." 
                              : 'Massive sample size savings (over 60% compared to Chebyshev) in clinical trials and software testing due to exponential decay.'}
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>
                          {isHe ? 'מיל (Mill)' : "Mill's Inequality"}
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'משתנה מקרי נורמלי סטנדרטי:' : 'Standard normal random variable:'}<br/>
                          <MathRenderer tex="Z \sim N(0, 1)" /><br/>
                          {isHe ? 'קבוע חיובי:' : 'Positive constant:'} <MathRenderer tex="x > 0" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="P(Z > x) \le \frac{1}{x} \phi(x) = \frac{1}{x\sqrt{2\pi}} e^{-x^2/2}" />
                        </td>
                        <td style={{ padding: '0.85rem', fontWeight: 600, color: '#10b981' }}>
                          {isHe ? 'מעריכי מהיר (תת-גאוסי)' : 'Sub-Gaussian Exponential'}<br/>
                          <MathRenderer tex="O(e^{-x^2/2}/x)" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe 
                            ? 'נותן חסם הדוק במיוחד לזנב של התפלגות נורמלית ללא צורך בחישוב אינטגרל נומרי קשה של פונקציית ה-CDF.' 
                            : 'Provides an extremely tight analytical bound for the tail of a standard normal distribution, avoiding complex CDF integration.'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>
                          {isHe ? 'קושי-שוורץ (Cauchy-Schwarz)' : "Cauchy-Schwarz Inequality"}
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'שני משתנים מקריים בעלי מומנט שני סופי:' : 'Any two random variables with finite second moments:'}<br/>
                          <MathRenderer tex="\mathbb{E}[X^2] < \infty, \ \mathbb{E}[Y^2] < \infty" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="(\mathbb{E}[XY])^2 \le \mathbb{E}[X^2]\mathbb{E}[Y^2]" />
                        </td>
                        <td style={{ padding: '0.85rem', fontWeight: 600, color: '#f59e0b' }}>
                          {isHe ? 'חסם אלגברי דטרמיניסטי' : 'Deterministic Algebraic'}<br/>
                          <MathRenderer tex="-" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe 
                            ? 'שימושי להוכחת חסמים על שונות משותפת (קובריאנס). מבטיח מתמטית שמקדם המתאם של פירסון תמיד חסום בין 1- ל-1.' 
                            : 'Crucial for bounding covariance and proving that Pearson\'s correlation coefficient always lies between -1 and 1.'}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>
                          {isHe ? 'ינסן (Jensen)' : "Jensen's Inequality"}
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'פונקציה קמורה g (כלומר g\'\'(x) >= 0) ומשתנה מקרי X בעל תוחלת סופית:' : 'Convex function g (g\'\'(x) >= 0) and random variable X with finite expectation:'}<br/>
                          <MathRenderer tex="\text{g is convex}" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="\mathbb{E}[g(X)] \ge g(\mathbb{E}[X])" /><br/><br/>
                          <strong>{isHe ? 'עבור פונקציה קעורה:' : 'For a concave function:'}</strong><br/>
                          <MathRenderer tex="\mathbb{E}[g(X)] \le g(\mathbb{E}[X])" />
                        </td>
                        <td style={{ padding: '0.85rem', fontWeight: 600, color: '#f59e0b' }}>
                          {isHe ? 'חסם גיאומטרי/פונקציונלי' : 'Geometric/Functional'}<br/>
                          <MathRenderer tex="-" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe 
                            ? 'מאפשר להשוות בין תוחלת של טרנספורמציה לטרנספורמציה של התוחלת. לדוגמה, מוכיח ש- E[X^2] >= (E[X])^2 כי פונקציית הריבוע היא קמורה.' 
                            : 'Compares the expectation of a function of X to the function of the expectation. Proves that E[X^2] >= (E[X])^2 because x^2 is convex.'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTableTab === 'estimators' && (
            <motion.div
              key="estimators-table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid #a855f7' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🎯</span> {isHe ? 'תכונות אמדני נקודה' : 'Point Estimator Properties'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  {isHe
                    ? 'סיכום השוואתי של ארבע התכונות המרכזיות המשמשות לדירוג ובחירת אמדנים בסטטיסטיקה אינפרנציאלית.'
                    : 'A comparative overview of the four key properties used to rank and select estimators in inferential statistics.'}
                </p>
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="custom-table" style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                        <th style={{ padding: '0.85rem', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'תכונה' : 'Property'}</th>
                        <th style={{ padding: '0.85rem', textAlign: isHe ? 'right' : 'left', color: '#a855f7' }}>{isHe ? 'הגדרה מתמטית' : 'Mathematical Definition'}</th>
                        <th style={{ padding: '0.85rem', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'משמעות אינטואיטיבית' : 'Intuition'}</th>
                        <th style={{ padding: '0.85rem', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'הערה חשובה' : 'Key Remark'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#a855f7' }}>{isHe ? 'חוסר הטיה (Unbiasedness)' : 'Unbiasedness'}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="\mathbb{E}[\hat{\theta}] = \theta" /><br/>
                          {isHe ? 'הטיה:' : 'Bias:'} <MathRenderer tex="B(\hat{\theta}) = \mathbb{E}[\hat{\theta}] - \theta = 0" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>{isHe ? 'הממוצע של האמדן על פני דגימות רבות בדיוק שווה לפרמטר האמיתי.' : 'On average over many samples, the estimator hits the true parameter exactly.'}</td>
                        <td style={{ padding: '0.85rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{isHe ? 'ממוצע המדגם הוא אמדן חסר הטיה לתוחלת. שונות המדגם S² עם n−1 היא אמדן חסר הטיה לσ².' : 'Sample mean is unbiased for μ. Sample variance S² with n−1 is unbiased for σ².'}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#06b6d4' }}>{isHe ? 'שגיאת ריבוע ממוצע (MSE)' : 'Mean Squared Error (MSE)'}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="\text{MSE}(\hat{\theta}) = \mathbb{E}[(\hat{\theta} - \theta)^2]" /><br/>
                          <MathRenderer tex="= \text{Var}(\hat{\theta}) + B(\hat{\theta})^2" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>{isHe ? 'מאחד שגיאת הטיה (Bias²) ושונות לכדי מדד יחיד המשקף את הדיוק הכולל.' : 'Unifies bias² and variance into one accuracy score. Lower MSE = better estimator.'}</td>
                        <td style={{ padding: '0.85rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{isHe ? 'עבור אמדן חסר הטיה: MSE = Var(θ̂). יש trade-off בין הטיה לשונות (Bias-Variance Tradeoff).' : 'For unbiased: MSE = Var(θ̂). Bias-Variance Tradeoff: sometimes a biased estimator has lower MSE.'}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#10b981' }}>{isHe ? 'עקביות (Consistency)' : 'Consistency'}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="\hat{\theta}_n \xrightarrow{P} \theta" /><br/>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isHe ? 'כלומר, לכל ε > 0:' : 'i.e., for all ε > 0:'}</span><br/>
                          <MathRenderer tex="\lim_{n\to\infty} P(|\hat{\theta}_n - \theta| > \varepsilon) = 0" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>{isHe ? 'ככל שגודל המדגם גדל לאינסוף, האמדן מתכנס בהסתברות לערך האמיתי.' : 'As sample size n → ∞, the estimator converges in probability to the true parameter.'}</td>
                        <td style={{ padding: '0.85rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{isHe ? 'תנאי מספיק לעקביות: MSE(θ̂_n) → 0 כאשר n → ∞. אמדן חסר הטיה עם שונות → 0 הוא עקבי.' : 'Sufficient condition: MSE(θ̂_n) → 0 as n → ∞. An unbiased estimator with Var → 0 is consistent.'}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#f59e0b' }}>{isHe ? 'יעילות (Efficiency) — חסם קרמר-ראו' : 'Efficiency — Cramér-Rao Bound'}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="\text{Var}(\hat{\theta}) \ge \frac{1}{I(\theta)}" /><br/>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isHe ? 'מידע פישר:' : 'Fisher Information:'}</span><br/>
                          <MathRenderer tex="I(\theta) = \mathbb{E}\!\left[\!\left(\frac{\partial}{\partial\theta}\ln f(X;\theta)\right)^{\!2}\right]" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>{isHe ? 'אמדן חסר הטיה יעיל הוא זה שמשיג את גבול השונות הנמוכה ביותר האפשרית (חסם קרמר-ראו).' : 'An efficient unbiased estimator achieves the Cramér-Rao lower bound — the smallest possible variance.'}</td>
                        <td style={{ padding: '0.85rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{isHe ? 'אמדן MLE מגיע לחסם זה אסימפטוטית. יעילות יחסית: e(θ̂₁, θ̂₂) = MSE(θ̂₂)/MSE(θ̂₁).' : 'MLE achieves the bound asymptotically. Relative efficiency: e(θ̂₁, θ̂₂) = MSE(θ̂₂) / MSE(θ̂₁).'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTableTab === 'convergence' && (
            <motion.div
              key="convergence-table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '1.75rem', borderLeft: '4px solid #06b6d4' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🔄</span> {isHe ? 'סוגי התכנסות של סדרות משתנים מקריים' : 'Types of Convergence of Random Sequences'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  {isHe
                    ? 'ארבעה מושגי התכנסות מרכזיים המשמשים בתורת ההסתברות ובסטטיסטיקה מסודרים מהחזק ביותר לחלש ביותר.'
                    : 'The four central modes of convergence used in probability theory and statistics, ordered from strongest to weakest.'}
                </p>
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table className="custom-table" style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '2px solid var(--surface-border)' }}>
                        <th style={{ padding: '0.85rem', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'סוג התכנסות' : 'Convergence Type'}</th>
                        <th style={{ padding: '0.85rem', textAlign: isHe ? 'right' : 'left', color: '#06b6d4' }}>{isHe ? 'סימון' : 'Notation'}</th>
                        <th style={{ padding: '0.85rem', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'הגדרה פורמלית' : 'Formal Definition'}</th>
                        <th style={{ padding: '0.85rem', textAlign: isHe ? 'right' : 'left' }}>{isHe ? 'קשרים והשלכות' : 'Implications & Relations'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#10b981' }}>
                          {isHe ? 'כמעט-בוודאות (a.s.)' : 'Almost Sure (a.s.)'}<br/>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{isHe ? 'החזקה ביותר' : 'Strongest'}</span>
                        </td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="X_n \xrightarrow{a.s.} X" /></td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="P\!\left(\lim_{n\to\infty} X_n = X\right) = 1" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'חזקה יותר מהתכנסות בהסתברות. חוק המספרים הגדולים החזק (SLLN): ' : 'Stronger than convergence in probability. Strong Law of Large Numbers (SLLN): '}
                          <MathRenderer tex="\bar{X}_n \xrightarrow{a.s.} \mu" />
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#a855f7' }}>
                          {isHe ? 'ב-Lq (מרחב L^q)' : 'In Lq (Mean Square / L^q)'}<br/>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{isHe ? 'חזקה מאוד' : 'Very Strong'}</span>
                        </td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="X_n \xrightarrow{L^q} X" /></td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="\mathbb{E}[|X_n - X|^q] \to 0" /><br/>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isHe ? 'לq=2 (התכנסות במ"ר / MSE):' : 'For q=2 (mean square / MSE):'}</span><br/>
                          <MathRenderer tex="\mathbb{E}[(X_n - X)^2] \to 0" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'L^q ⟹ התכנסות בהסתברות. L^q לא מרמזת על a.s. (ולא להיפך).' : 'L^q convergence ⟹ convergence in probability. L^q does not imply a.s. (and vice versa).'}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#f59e0b' }}>
                          {isHe ? 'בהסתברות (in probability)' : 'In Probability'}<br/>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{isHe ? 'בינונית' : 'Medium'}</span>
                        </td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="X_n \xrightarrow{P} X" /></td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'לכל ε > 0:' : 'For all ε > 0:'}<br/>
                          <MathRenderer tex="\lim_{n\to\infty} P(|X_n - X| > \varepsilon) = 0" />
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'חוק המספרים הגדולים החלש (WLLN). נרמזת מ-a.s. ומ-L^q. מרמזת על התכנסות בהתפלגות.' : 'Weak Law of Large Numbers (WLLN). Implied by a.s. and by L^q. Implies convergence in distribution.'}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#ef4444' }}>
                          {isHe ? 'בהתפלגות (in distribution)' : 'In Distribution'}<br/>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>{isHe ? 'החלשה ביותר' : 'Weakest'}</span>
                        </td>
                        <td style={{ padding: '0.85rem' }}><MathRenderer tex="X_n \xrightarrow{d} X" /></td>
                        <td style={{ padding: '0.85rem' }}>
                          <MathRenderer tex="\lim_{n\to\infty} F_{X_n}(x) = F_X(x)" /><br/>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{isHe ? 'בכל נקודת רציפות של F_X.' : 'At every continuity point of F_X.'}</span>
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {isHe ? 'המשפט המרכזי הגבולי (CLT): ' : 'Central Limit Theorem (CLT): '}
                          <MathRenderer tex="\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}} \xrightarrow{d} N(0,1)" /><br/>
                          {isHe ? 'שקול: פונקציית יוצרות המומנטים מתכנסת נקודתית.' : 'Equivalent: MGF converges pointwise.'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: '1rem', padding: '0.85rem', background: 'rgba(6, 182, 212, 0.07)', borderRadius: '0.5rem', border: '1px solid rgba(6, 182, 212, 0.2)', fontSize: '0.88rem' }}>
                  <strong>{isHe ? '⛓️ סדר ההשלכות (מחזק לחלש): ' : '⛓️ Implication Order (strongest to weakest): '}</strong>
                  <MathRenderer tex="\xrightarrow{a.s.} \implies \xrightarrow{P} \implies \xrightarrow{d}" />
                  {isHe ? ' ו-' : ' and '}
                  <MathRenderer tex="\xrightarrow{L^q} \implies \xrightarrow{P}" />
                  {isHe ? '. ההיפוך אינו נכון בדרך כלל.' : '. The converse does not hold in general.'}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    );
  };

  // Dynamic Translations
  const lTitle = isHe ? 'מרכז הנוסחאות וההגדרות' : 'Formula & Definition Hub';
  const lSubTitle = isHe 
    ? 'דף נוסחאות אינטראקטיבי להכנה מהירה למבחן. למד הגדרות, חקור משוואות ב-LaTeX, ולחץ על כל כרטיס כדי לפתוח מסך מפורט.'
    : 'Interactive formula sheet for rapid exam preparation. Study definitions, examine equations in beautiful LaTeX, and tap any card to open a full popup screen.';
  
  const lProbTitle = isHe ? 'תורת ההסתברות' : 'Probability Theory';
  const lStatsTitle = isHe ? 'סטטיסטיקה' : 'Statistics';
  
  const lSearchPlaceholder = isHe ? 'חפש משוואות, מילות מפתח או קטגוריות...' : 'Search equations, definition keywords or categories...';
  const lReset = isHe ? 'איפוס' : 'Reset';
  
  const lFilterTopic = isHe ? 'נושא' : 'Topic';
  const lFilterAllCourses = isHe ? 'כל הקורסים' : 'All Courses';
  const lFilterProb = isHe ? 'הסתברות (PROB)' : 'Probability (PROB)';
  const lFilterStats = isHe ? 'סטטיסטיקה (STATS)' : 'Statistics (STATS)';
  
  const lFilterMastery = isHe ? 'מדד שליטה בחומר' : 'Mastery status';
  const lFilterAll = isHe ? 'הכל' : 'All';
  const lFilterMastered = isHe ? 'שולט 😄' : 'Mastered 😄';
  const lFilterLearning = isHe ? 'בתהליך 😐' : 'Learning 😐';
  const lFilterStruggling = isHe ? 'מתקשה 😡' : 'Struggling 😡';
  const lFilterToLearn = isHe ? 'ללמוד 📝' : 'To Learn 📝';

  const lViewMode = isHe ? 'מצב תצוגה' : 'View Mode';
  const lGrouped = isHe ? 'תצוגת כרטיסים' : 'Card View';
  const lSortedList = isHe ? 'רשימה ממוינת' : 'Sorted List';
  const lSortBy = isHe ? 'מיין לפי' : 'Sort By';
  const lSortName = isHe ? 'סדר אלפביתי' : 'Alphabetical';
  const lSortCourse = isHe ? 'קורס' : 'Course';
  const lSortCategory = isHe ? 'קטגוריה' : 'Category';
  
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

      {/* Progress Dashboard with Collapsible Stats Cards & Subject Mastery Index */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        
        {/* NLA Progress Card */}
        <motion.div 
          className="glass-panel" 
          whileHover={{ 
            y: -3,
            boxShadow: '0 12px 30px rgba(99, 102, 241, 0.15)'
          }}
          transition={{ duration: 0.2 }}
          style={{ 
            padding: '1.5rem 1.75rem', 
            borderTop: '4px solid var(--primary-color)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease'
          }}
        >
          {/* Header (Clickable Toggle) */}
          <motion.div 
            onClick={() => setProbExpanded(!probExpanded)}
            whileHover={{ scale: 0.99, x: isHe ? -3 : 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {lProbTitle}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ background: 'var(--primary-color)', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 'bold' }}>
                {totalPROB} {isHe ? 'נוסחאות' : 'equations'}
              </span>
              <ChevronDown 
                size={18} 
                style={{ 
                  transform: probExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                  color: 'var(--text-secondary)'
                }} 
              />
            </div>
          </motion.div>

          {/* Subject Mastery Index (Blue Bar - Always Visible) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0.2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700 }}>
              <span>🔹 {lMasteryIndexTitle}</span>
              <span>{indexPROB}%</span>
            </div>
            <div style={{ height: '9px', background: 'var(--math-bg)', borderRadius: '4.5px', overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${indexPROB}%`, 
                  background: 'linear-gradient(90deg, #3b82f6, #6366f1)', 
                  borderRadius: '4.5px', 
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
                }} 
              />
            </div>
          </div>

          {/* Detailed Emoji Progress Bars (Revealed on Click) */}
          <AnimatePresence initial={false}>
            {probExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ height: '1px', background: 'rgba(226, 232, 240, 0.15)', margin: '0.5rem 0 1rem 0' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {/* Green progress bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span>😄 {isHe ? 'שולט' : 'Mastered'}</span>
                      <span>{greenPROB} / {totalPROB} ({pctGreenPROB}%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pctGreenPROB}%`, background: 'var(--success)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Yellow progress bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span>😐 {isHe ? 'בתהליך' : 'Learning'}</span>
                      <span>{yellowPROB} / {totalPROB} ({pctYellowPROB}%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pctYellowPROB}%`, background: '#f59e0b', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Red progress bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span>😡 {isHe ? 'מתקשה' : 'Struggling'}</span>
                      <span>{redPROB} / {totalPROB} ({pctRedPROB}%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pctRedPROB}%`, background: '#ef4444', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>

                {/* Calculation Legend */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1.25rem', fontStyle: 'italic', opacity: 0.8 }}>
                  {lLegendTitle}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* OPT Progress Card */}
        <motion.div 
          className="glass-panel" 
          whileHover={{ 
            y: -3,
            boxShadow: '0 12px 30px rgba(236, 72, 153, 0.15)'
          }}
          transition={{ duration: 0.2 }}
          style={{ 
            padding: '1.5rem 1.75rem', 
            borderTop: '4px solid var(--secondary-color)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            transition: 'box-shadow 0.3s ease, transform 0.2s ease'
          }}
        >
          {/* Header (Clickable Toggle) */}
          <motion.div 
            onClick={() => setStatsExpanded(!statsExpanded)}
            whileHover={{ scale: 0.99, x: isHe ? -3 : 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{lStatsTitle}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ background: 'var(--secondary-color)', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 'bold' }}>
                {totalSTATS} {isHe ? 'נוסחאות' : 'equations'}
              </span>
              <ChevronDown 
                size={18} 
                style={{ 
                  transform: statsExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                  color: 'var(--text-secondary)'
                }} 
              />
            </div>
          </motion.div>

          {/* Subject Mastery Index (Blue Bar - Always Visible) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', margin: '0.2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700 }}>
              <span>🔹 {lMasteryIndexTitle}</span>
              <span>{indexSTATS}%</span>
            </div>
            <div style={{ height: '9px', background: 'var(--math-bg)', borderRadius: '4.5px', overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${indexSTATS}%`, 
                  background: 'linear-gradient(90deg, #3b82f6, #6366f1)', 
                  borderRadius: '4.5px', 
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
                }} 
              />
            </div>
          </div>

          {/* Detailed Emoji Progress Bars (Revealed on Click) */}
          <AnimatePresence initial={false}>
            {statsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ height: '1px', background: 'rgba(226, 232, 240, 0.15)', margin: '0.5rem 0 1rem 0' }} />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {/* Green progress bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span>😄 {isHe ? 'שולט' : 'Mastered'}</span>
                      <span>{greenSTATS} / {totalSTATS} ({pctGreenSTATS}%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pctGreenSTATS}%`, background: 'var(--success)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Yellow progress bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span>😐 {isHe ? 'בתהליך' : 'Learning'}</span>
                      <span>{yellowSTATS} / {totalSTATS} ({pctYellowSTATS}%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pctYellowSTATS}%`, background: '#f59e0b', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Red progress bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span>😡 {isHe ? 'מתקשה' : 'Struggling'}</span>
                      <span>{redSTATS} / {totalSTATS} ({pctRedSTATS}%)</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--math-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pctRedSTATS}%`, background: '#ef4444', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>

                {/* Calculation Legend */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1.25rem', fontStyle: 'italic', opacity: 0.8 }}>
                  {lLegendTitle}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
          <motion.button 
            onClick={resetAllProgress} 
            className="btn btn-secondary reset-btn"
            whileHover={{ scale: 1.05, y: -1, boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, cursor: 'pointer' }}
          >
            <RotateCcw size={16} className="reset-icon" />
            {lReset}
          </motion.button>
        </div>

        {/* Filter Controls Panel: Left Column (Topic & View Mode) & Right Column (Sort By & Mastery Status) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap', 
          gap: '2rem 1.5rem', 
          borderTop: '1px solid var(--surface-border)', 
          paddingTop: '1.25rem' 
        }}>
          {/* Left Column: Topic & View Mode */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: '1 1 300px', minWidth: '280px' }}>
            {/* Course filter group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 'bold', textAlign: isHe ? 'right' : 'left' }}>{lFilterTopic}</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <motion.button 
                  onClick={() => setSelectedCourse('all')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-primary ${selectedCourse === 'all' ? 'active' : ''}`}
                >
                  {lFilterAllCourses}
                </motion.button>
                <motion.button 
                  onClick={() => setSelectedCourse('prob')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-primary ${selectedCourse === 'prob' ? 'active' : ''}`}
                >
                  {lFilterProb}
                </motion.button>
                <motion.button 
                  onClick={() => setSelectedCourse('stats')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-secondary ${selectedCourse === 'stats' ? 'active' : ''}`}
                >
                  {lFilterStats}
                </motion.button>
              </div>
            </div>

            {/* View Mode selection group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 'bold', textAlign: isHe ? 'right' : 'left' }}>{lViewMode}</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <motion.button 
                  onClick={() => setViewMode('grouped')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-primary ${viewMode === 'grouped' ? 'active' : ''}`}
                >
                  <LayoutGrid size={14} />
                  {lGrouped}
                </motion.button>
                <motion.button 
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-primary ${viewMode === 'list' ? 'active' : ''}`}
                >
                  <List size={14} />
                  {lSortedList}
                </motion.button>
                <motion.button 
                  onClick={() => setViewMode('tables')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-primary ${viewMode === 'tables' ? 'active' : ''}`}
                >
                  <Layers size={14} />
                  {isHe ? 'טבלאות השוואה' : 'Comparison Tables'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Column: Sort By & Mastery Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: '1 1 300px', minWidth: '280px' }}>
            {/* Sort By group (Always Visible) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 'bold', textAlign: isHe ? 'right' : 'left' }}>{lSortBy}</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <motion.button 
                  onClick={() => setSortBy('name')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-secondary ${sortBy === 'name' ? 'active' : ''}`}
                >
                  {lSortName}
                </motion.button>
                <motion.button 
                  onClick={() => setSortBy('course')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-secondary ${sortBy === 'course' ? 'active' : ''}`}
                >
                  {lSortCourse}
                </motion.button>
                <motion.button 
                  onClick={() => setSortBy('category')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-secondary ${sortBy === 'category' ? 'active' : ''}`}
                >
                  {lSortCategory}
                </motion.button>
              </div>
            </div>

            {/* Status filter group (Mastery Status - Always Visible) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', fontWeight: 'bold', textAlign: isHe ? 'right' : 'left' }}>{lFilterMastery}</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <motion.button 
                  onClick={() => setSelectedStatus('all')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-accent ${selectedStatus === 'all' ? 'active' : ''}`}
                >
                  {lFilterAll}
                </motion.button>
                <motion.button 
                  onClick={() => setSelectedStatus('green')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-success ${selectedStatus === 'green' ? 'active' : ''}`}
                >
                  {lFilterMastered}
                </motion.button>
                <motion.button 
                  onClick={() => setSelectedStatus('yellow')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-warning ${selectedStatus === 'yellow' ? 'active' : ''}`}
                >
                  {lFilterLearning}
                </motion.button>
                <motion.button 
                  onClick={() => setSelectedStatus('red')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-danger ${selectedStatus === 'red' ? 'active' : ''}`}
                >
                  {lFilterStruggling}
                </motion.button>
                <motion.button 
                  onClick={() => setSelectedStatus('to-learn')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className={`filter-btn filter-btn-muted ${selectedStatus === 'to-learn' ? 'active' : ''}`}
                >
                  {lFilterToLearn}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulas Content Grouped by Category or Single Sorted List */}
      {filteredFormulas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface-color)', border: '1px dashed var(--surface-border)', borderRadius: 'var(--radius-md)' }}>
          <Layers size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h3>{lNoMatches}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{lNoMatchesSub}</p>
        </div>
      ) : viewMode === 'tables' ? (
        renderComparisonTables()
      ) : viewMode === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem' }}>
          {sortedFormulas.map(f => renderFormulaCard(f, true))}
        </div>
      ) : (
        (() => {
          const chapterOrder = Object.keys(CATEGORY_STYLES);
          const sortedCategoriesEntries = Object.entries(categoriesMap).sort(([catA, itemsA], [catB, itemsB]) => {
            const engCatA = itemsA[0]?.category || '';
            const engCatB = itemsB[0]?.category || '';
            
            if (sortBy === 'name') {
              return catA.localeCompare(catB, isHe ? 'he' : 'en');
            } else if (sortBy === 'course') {
              const courseA = itemsA[0]?.courseId || '';
              const courseB = itemsB[0]?.courseId || '';
              if (courseA !== courseB) {
                return courseA === 'prob' ? -1 : 1;
              }
              return chapterOrder.indexOf(engCatA) - chapterOrder.indexOf(engCatB);
            } else {
              return chapterOrder.indexOf(engCatA) - chapterOrder.indexOf(engCatB);
            }
          });

          return sortedCategoriesEntries.map(([category, items]) => {
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
                  {items.map(f => renderFormulaCard(f, false))}
                </div>
              </div>
            );
          });
        })()
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
                    color: selectedFormula.courseId === 'prob' ? 'var(--primary-color)' : 'var(--secondary-color)',
                    padding: '0.3rem 0.75rem',
                    background: selectedFormula.courseId === 'prob' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(236, 72, 153, 0.12)',
                    borderRadius: '8px',
                    border: `1px solid ${selectedFormula.courseId === 'prob' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(236, 72, 153, 0.2)'}`
                  }}>
                    {selectedFormula.courseId === 'prob' ? lProbTitle : lStatsTitle}
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