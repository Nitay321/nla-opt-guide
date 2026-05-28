// ============================================================
// 🧮 Probability & Statistics — Formula & Definition Data
// Content will be populated batch-by-batch (Phase 4)
// ============================================================

export interface Formula {
  id: string;
  courseId: 'prob' | 'stats';
  category: string;
  categoryHe?: string;
  name: string;
  nameHe?: string;
  equation: string;
  description: string;
  descriptionHe?: string;
}

// ⬇️ Formulas will be added here as chapters are completed
export const formulas: Formula[] = [];
