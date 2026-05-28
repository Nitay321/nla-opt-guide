// ============================================================
// 📚 Probability & Statistics — Chapter Data
// Content will be populated batch-by-batch (Phases 2 & 3)
// ============================================================

export interface QuizQuestion {
  question: string;
  questionHe?: string;
  options: string[];
  optionsHe?: string[];
  correctAnswerIndex: number;
  explanation: string;
  explanationHe?: string;
}

export interface Subsection {
  id: string;
  title: string;
  titleHe?: string;
  simplifiedLogic?: string;
  simplifiedLogicHe?: string;
  toolboxConnection?: string;
  toolboxConnectionHe?: string;
  keyTakeaway?: string;
  keyTakeawayHe?: string;
  content?: string;
  contentHe?: string;
  proof?: string;
  proofHe?: string;
  example?: string;
  exampleHe?: string;
}

export interface Chapter {
  id: string;
  courseId: 'prob' | 'stats';
  chapterNumber: number;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  icon: string;
  color: string;
  estimatedMinutes: number;
  subsections: Subsection[];
  quiz: QuizQuestion[];
}

// ⬇️ Chapters will be added here incrementally — one batch at a time
export const chapters: Chapter[] = [];