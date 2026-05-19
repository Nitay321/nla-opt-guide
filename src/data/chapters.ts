export interface Definition {
  id: string;
  title: string;
  titleHe?: string;
  content: string;
  contentHe?: string;
  simplifiedLogic?: string;
  simplifiedLogicHe?: string;
  toolboxConnection?: string;
  toolboxConnectionHe?: string;
  proof?: string;
  proofHe?: string;
  example?: string;
  exampleHe?: string;
  keyTakeaway?: string;
  keyTakeawayHe?: string;
}

export interface QuizQuestion {
  question: string;
  questionHe?: string;
  options: string[];
  optionsHe?: string[];
  correctAnswerIndex: number;
  explanation: string;
  explanationHe?: string;
}

export interface Chapter {
  id: string;
  courseId: 'nla' | 'opt';
  chapterNumber: string;
  title: string;
  titleHe?: string;
  intro: string;
  introHe?: string;
  motivation: string;
  motivationHe?: string;
  definitions: Definition[];
  quiz: QuizQuestion[];
}

export const chapters: Chapter[] = [
  // ==========================================
  //                NLA CHAPTERS
  // ==========================================
  {
    id: 'nla-1',
    courseId: 'nla',
    chapterNumber: '1',
    title: 'Preliminary Background & Vector Norms',
    intro: 'Linear systems form the foundation of scientific computing. This chapter covers standard matrix forms, floating-point round-off errors, vector space properties, and establishes vector norms to mathematically quantify size and convergence.',
    motivation: 'Computers cannot store real numbers with infinite precision. Round-off errors occur at every step. Without vector norms, we have no way of measuring the distance between our computed numerical solution and the true mathematical solution, nor can we define numerical convergence.',
    definitions: [
    {
      id: 'def-nla-1-1',
      title: 'Vector Norm & Vector Spaces',
      titleHe: 'נורמות של וקטורים ומרחבים וקטוריים',
      simplifiedLogic: 'A vector norm is a mathematical "measuring tape" for vectors. It takes a multi-dimensional coordinate vector and squashes it into a single positive real number representing its "length" or "size".\n\n**Visual Summary Comparison:**\n| Norm Family | Mathematical Formula | Intuitive Mental Model | Primary Application |\n| :--- | :--- | :--- | :--- |\n| **$L_1$ Norm** | $\\sum \\vert x_i\\vert$ | Grid-based walking (Manhattan street grid) | Robust regression, sparse optimization (Lasso) |\n| **$L_2$ Norm** | $\\sqrt{\\sum x_i^2}$ | Straight-line distance (bird\'s flight) | Standard physics, energy minimization |\n| **$L_\\infty$ Norm** | $\\max \\vert x_i\\vert$ | Largest single coordinate mismatch | Peak error tolerances, worst-case stress analysis |',
      simplifiedLogicHe: 'נורמה של וקטור היא "סרט מדידה" מתמטי. היא לוקחת וקטור רב-ממדי ומכווצת אותו למספר ממשי חיובי יחיד המייצג את "אורכו" או "גודלו".\n\n**טבלת השוואה חזותית:**\n| משפחת הנורמות | נוסחה מתמטית | מודל מנטלי אינטואיטיבי | יישום מרכזי |\n| :--- | :--- | :--- | :--- |\n| **נורמת $L_1$** | $\\sum \\vert x_i\\vert$ | הליכה ברשת כבישים עירונית (מנהטן) | רגרסיה חסונה, אופטימיזציה דלילה (Lasso) |\n| **נורמת $L_2$** | $\\sqrt{\\sum x_i^2}$ | מרחק אווירי בקו ישר (מרחק אוקלידי) | פיזיקה סטנדרטית, מינימיזציית אנרגיה |\n| **נורמת $L_\\infty$** | $\\max \\vert x_i\\vert$ | הרכיב הקיצוני/הגרוע ביותר בוקטור | הגבלת השגיאה המקסימלית, עומס שיא |',
      toolboxConnection: 'Projecting a point onto a box domain (which we do in **OPT Chapter 3**) is mathematically equivalent to enforcing an $L_\\infty$-norm constraint. Understanding vector norms is what allows us to model constraints in multi-dimensional optimization solvers!',
      toolboxConnectionHe: 'היטל של נקודה על תחום תיבה (קופסה), כפי שמבוצע ב-**OPT פרק 3**, שקול מתמטית לאכיפת אילוץ של נורמת $L_\\infty$. הבנת נורמות של וקטורים היא זו שמאפשרת לנו למדל אילוצים במערכות אופטימיזציה רב-ממדיות!',
      keyTakeaway: 'Vector norms turn multi-dimensional errors into a single measurable size.',
      keyTakeawayHe: 'נורמות וקטוריות הופכות שגיאה רב-ממדית לגודל מדיד יחיד.',
      content: 'A vector norm on a vector space $V$ over $\\mathbb{R}^n$ is a function $\\|\\cdot\\|: V \\to \\mathbb{R}$ satisfying three fundamental properties for all vectors $u, v \\in V$ and scalars $\\alpha \\in \\mathbb{R}$:\n1. Non-negativity and Definiteness: $\\|u\\| \\geq 0$, and $\\|u\\| = 0 \\iff u = 0$\n2. Homogeneity: $\\|\\alpha u\\| = |\\alpha| \\cdot \\|u\\|$\n3. Triangle Inequality: $\\|u + v\\| \\leq \\|u\\| + \\|v\\|$\n\nCommon forms are the family of $\\ell_p$ norms:\n$$\\|x\\|_p = \\left( \\sum_{i=1}^n |x_i|^p \\right)^{1/p}$$',
      proof: 'Proof: Equivalence of Norms in Finite Dimensions\nTheorem: On any finite-dimensional vector space $V = \\mathbb{R}^n$, all norms are topologically equivalent. That is, for any two norms $\\|\\cdot\\|_a$ and $\\|\\cdot\\|_b$, there exist positive constants $c_1, c_2 > 0$ such that:\n$$c_1 \\|x\\|_b \\leq \\|x\\|_a \\leq c_2 \\|x\\|_b \\quad \\forall x \\in \\mathbb{R}^n$$\n\nProof Sketch:\n1. Let $e_1, ..., e_n$ be the standard basis of $\\mathbb{R}^n$. Any vector $x = \\sum_i x_i e_i$.\n2. Using the triangle inequality and homogeneity of $\\|\\cdot\\|_a$:\n   $$\\|x\\|_a = \\left\\| \\sum_{i=1}^n x_i e_i \\right\\|_a \\leq \\sum_{i=1}^n |x_i| \\|e_i\\|_a \\leq M \\|x\\|_1$$\n   where $M = n \\max_i \\|e_i\\|_a$. This establishes the upper bound.\n3. The function $f(x) = \\|x\\|_a$ is continuous with respect to the $\\ell_1$ norm. The unit sphere $S = \\{x \\in \\mathbb{R}^n \\mid \\|x\\|_1 = 1\\}$ is a closed and bounded (compact) set in $\\mathbb{R}^n$.\n4. By the Extreme Value Theorem, the continuous function $f(x) = \\|x\\|_a$ must achieve a minimum value $c_1 > 0$ on the compact set $S$.\n5. Therefore, for all $x \\in S$, $\\|x\\|_a \\geq c_1 \\|x\\|_1 = c_1$.\n6. By homogeneity, this holds for all $x \\\neq 0$, proving norm equivalence. Thus, if a sequence converges in one norm, it converges in all norms in $\\mathbb{R}^n$.',
      example: 'Let $x = [-4, 3]^T \\in \\mathbb{R}^2$.\n- $\\ell_1$ norm (Manhattan): $\\|x\\|_1 = |-4| + |3| = 7$\n- $\\ell_2$ norm (Euclidean): $\\|x\\|_2 = \\sqrt{(-4)^2 + 3^2} = \\sqrt{16 + 9} = 5$\n- $\\ell_\\infty$ norm (Maximum): $\\|x\\|_\\infty = \\max(|-4|, |3|) = 4$'
    },
    {
      id: 'def-nla-1-2',
      title: 'Energy Norms (M-Norms)',
      titleHe: 'נורמות אנרגיה (M-נורמות)',
      simplifiedLogic: 'An energy norm measures vector size through the lens of a positive definite matrix $M$. Instead of treating all coordinates equally, $M$ acts as a "weighting matrix" that scales and rotates the vector coordinates, modeling physical constraints or grid structures.\n\n**Visual Concept Comparison:**\n* **Standard Norm ($L_2$):** Assumes space is isotropic (flat, equal in all directions).\n* **Energy Norm ($M$-Norm):** Distorts space using the matrix $M$, scaling dimensions based on local stiffness or energy weightings.',
      simplifiedLogicHe: 'נורמת אנרגיה מודדת את גודל הוקטור דרך עיניה של מטריצה סימטרית חיובית לחלוטין $M$. במקום להתייחס לכל הרכיבים באופן שווה, המטריצה $M$ משמשת כ"מטריצת משקלים" המעוותת ומסובבת את מערכת הקואורדינטות, ובכך ממדלת מגבלות פיזיקליות או מבני רשת.\n\n**השוואה חזותית:**\n* **נורמה סטנדרטית ($L_2$):** מניחה שכל הכיוונים במרחב שווי-ערך (שטוח, מרחק אחיד).\n* **נורמת אנרגיה ($M$-Norm):** מעוותת את המרחב באמצעות $M$, ומותחת ממדים לפי דרגת קשיחות או אנרגיה מקומית.',
      toolboxConnection: 'Energy norms are heavily used in unconstrained optimization (**OPT Chapter 2**) for Quasi-Newton methods like BFGS, where the metric matrix defines the curvature of our search steps.',
      toolboxConnectionHe: 'נורמות אנרגיה נמצאות בשימוש נרחב באופטימיזציה ללא אילוצים (**OPT פרק 2**) בשיטות קוואזי-ניוטון (כמו BFGS), שבהן מטריצת המטריקה מגדירה את העקמומיות של צעדי החיפוש שלנו.',
      keyTakeaway: 'Energy norms measure distance while factoring in matrix-defined physical geometry.',
      keyTakeawayHe: 'נורמות אנרגיה מודדות מרחקים תוך שקלול הגיאומטריה הפיזיקלית המוגדרת על ידי המטריצה.',
      content: 'Let $M \\in \\mathbb{R}^{n \\times n}$ be a Symmetric Positive Definite (SPD) matrix. The $M$-norm (or energy norm) of a vector $u$ is defined as:\n$$\\|u\\|_M = \\sqrt{\\langle u, M u \\rangle} = \\sqrt{u^T M u}$$',
      proof: 'Proof: Verification of Norm Axioms for M-Norm\nLet $M$ be SPD ($M^T = M$, and $x^T M x > 0$ for all $x \\\neq 0$).\n1. Non-negativity & Definiteness: Since $M$ is positive definite, $u^T M u > 0$ for all $u \\\neq 0$, and $u^T M u = 0 \\iff u = 0$. Thus $\\|u\\|_M \\geq 0$, with equality iff $u=0$.\n2. Homogeneity: $\\|\\alpha u\\|_M = \\sqrt{(\\alpha u)^T M (\\alpha u)} = \\sqrt{\\alpha^2 u^T M u} = |\\alpha| \\sqrt{u^T M u} = |\\alpha| \\|u\\|_M$.\n3. Triangle Inequality: Since $M$ is SPD, it induces an inner product $\\langle u, v \\rangle_M = u^T M v$. By the Cauchy-Schwarz inequality, $|u^T M v| \\leq \\|u\\|_M \\|v\\|_M$. Thus:\n   $$\\|u+v\\|_M^2 = (u+v)^T M (u+v) = u^T M u + 2 u^T M v + v^T M v \\leq \\|u\\|_M^2 + 2 \\|u\\|_M \\|v\\|_M + \\|v\\|_M^2 = (\\|u\\|_M + \\|v\\|_M)^2$$\n   Taking the square root yields $\\|u+v\\|_M \\leq \\|u\\|_M + \\|v\\|_M$.',
      example: 'Let $M = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$ (which is SPD) and $u = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}$.\n$$\\|u\\|_M = \\sqrt{\\begin{bmatrix} 1 & 2 \\end{bmatrix} \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix} \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}} = \\sqrt{\\begin{bmatrix} 1 & 2 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 6 \\end{bmatrix}} = \\sqrt{2 + 12} = \\sqrt{14} \\approx 3.74$$'
    },
    {
      id: 'def-nla-1-3',
      title: 'Inner Products & Cauchy-Schwarz Inequality',
      titleHe: 'מכפלות פנימיות ואי-שוויון קושי-שוורץ',
      simplifiedLogic: 'An inner product measures the "alignment" or "overlap" between two vectors. The Cauchy-Schwarz inequality states that this overlap cannot exceed the product of their individual lengths. If the vectors point in the same direction, the overlap is maximized; if they are orthogonal, the overlap is zero.\n\n**Visual Tree Mappings:**\n* **Vectors Aligned (0°):** Maximum Positive Overlap $\\rightarrow \\langle u, v \\rangle = \\|u\\|_2 \\|v\\|_2$\n* **Vectors Orthogonal (90°):** Zero Overlap $\\rightarrow \\langle u, v \\rangle = 0$\n* **Vectors Opposite (180°):** Maximum Negative Overlap $\\rightarrow \\langle u, v \\rangle = -\\|u\\|_2 \\|v\\|_2$',
      simplifiedLogicHe: 'מכפלה פנימית מודדת את "ההתלכדות" או "החפיפה" בין שני וקטורים. אי-שוויון קושי-שוורץ קובע שחפיפה זו אינה יכולה לעלות על מכפלת האורכים האינדיבידואליים שלהם. אם הוקטורים מצביעים לאותו כיוון, החפיפה מקסימלית; אם הם מאונכים, החפיפה היא אפס.\n\n**מיפוי חזותי:**\n* **וקטורים מיושרים (0°):** חפיפה חיובית מקסימלית $\\rightarrow \\langle u, v \\rangle = \\|u\\|_2 \\|v\\|_2$\n* **וקטורים ניצבים (90°):** חפיפה אפסית לחלוטין $\\rightarrow \\langle u, v \\rangle = 0$\n* **וקטורים הפוכים (180°):** חפיפה שלילית מקסימלית $\\rightarrow \\langle u, v \\rangle = -\\|u\\|_2 \\|v\\|_2$',
      toolboxConnection: 'Steepest descent in **OPT Chapter 2** uses orthogonality. We prove consecutive steps are orthogonal (inner product is zero) to explain why the solver zigzags in narrow valleys.',
      toolboxConnectionHe: 'שיטת הירידה התלולה ב-**OPT פרק 2** מבוססת על ניצבות. אנו מוכיחים שצעדים עוקבים הם ניצבים (מכפלה פנימית אפס) כדי להסביר מדוע הפותר נע בזיגזג בעמקים צרים.',
      keyTakeaway: 'The inner product quantifies geometric alignment, bounded strictly by vector magnitudes.',
      keyTakeawayHe: 'מכפלה פנימית מכמתת התלכדות גיאומטרית, וחסומה באופן קשיח על ידי גודלי הוקטורים.',
      content: 'An inner product on a vector space $V$ is a function $\\langle \\cdot, \\cdot \\rangle: V \\times V \\to \\mathbb{R}$ (or $\\mathbb{C}$) satisfying:\n1. **Conjugate symmetry**: $\\langle u, v \\rangle = \\overline{\\langle v, u \\rangle}$\n2. **Linearity in second argument**: $\\langle u, \\alpha v + \\beta w \\rangle = \\alpha \\langle u, v \\rangle + \\beta \\langle u, w \\rangle$\n3. **Non-negativity**: $\\langle u, u \\rangle \\geq 0$, with $\\langle u, u \\rangle = 0 \\iff u = 0$\n\nThe standard (Hermitian) inner product on $\\mathbb{C}^n$ is:\n$$\\langle u, v \\rangle = u^* v = \\sum_{i=1}^n \\bar{u}_i v_i$$\nThis induces the $\\ell_2$ norm: $\\|u\\|_2 = \\sqrt{\\langle u, u \\rangle}$.\n\n**Cauchy-Schwarz Inequality**: For any vectors $u, v$:\n$$|\\langle u, v \\rangle| \\leq \\|u\\|_2 \\cdot \\|v\\|_2$$\nEquality holds if and only if $u$ and $v$ are linearly dependent.',
      proof: 'Proof: Cauchy-Schwarz Inequality\n\nCase $u = 0$: Both sides are 0, so the inequality holds trivially.\n\nCase $u \\\neq 0$: For any scalar $t \\in \\mathbb{R}$, consider the non-negative quantity:\n$$0 \\leq \\|v - t u\\|_2^2 = \\langle v - tu, v - tu \\rangle = \\|v\\|_2^2 - 2t \\langle u, v \\rangle + t^2 \\|u\\|_2^2$$\nChoose the optimal $t$ by minimizing the right side with respect to $t$:\n$$\\frac{d}{dt}(\\|v\\|_2^2 - 2t\\langle u, v\\rangle + t^2 \\|u\\|_2^2) = -2\\langle u, v\\rangle + 2t\\|u\\|_2^2 = 0$$\n$$\\implies t^* = \\frac{\\langle u, v \\rangle}{\\|u\\|_2^2}$$\nSubstituting $t^*$ back into the non-negativity condition:\n$$0 \\leq \\|v\\|_2^2 - 2 \\cdot \\frac{\\langle u, v \\rangle}{\\|u\\|_2^2} \\cdot \\langle u, v \\rangle + \\frac{\\langle u, v \\rangle^2}{\\|u\\|_2^4} \\cdot \\|u\\|_2^2 = \\|v\\|_2^2 - \\frac{\\langle u, v \\rangle^2}{\\|u\\|_2^2}$$\nRearranging: $\\langle u, v \\rangle^2 \\leq \\|u\\|_2^2 \\cdot \\|v\\|_2^2$, i.e., $|\\langle u, v \\rangle| \\leq \\|u\\|_2 \\cdot \\|v\\|_2$. $\\square$',
      example: 'Let $u = [3, 4]^T$ and $v = [1, 2]^T$.\n- Inner product: $\\langle u, v \\rangle = 3(1) + 4(2) = 11$\n- Norms: $\\|u\\|_2 = \\sqrt{9+16} = 5$, $\\|v\\|_2 = \\sqrt{1+4} = \\sqrt{5}$\n- Cauchy-Schwarz check: $|11| \\leq 5 \\cdot \\sqrt{5} = 5 \\cdot 2.236 = 11.18$ ✓\n\nThis bound is tight — if we set $v = 2u = [6, 8]^T$:\n- $\\langle u, v \\rangle = 18 + 32 = 50$, and $\\|u\\|_2 \\|v\\|_2 = 5 \\cdot 10 = 50$. Equality achieved!'
    }
    ],
    quiz: [
      {
        question: 'Under what condition is the energy norm ||u||_M mathematically defined as a valid vector norm?',
        options: [
          'For any square matrix M.',
          'Only if M is a symmetric positive definite (SPD) matrix.',
          'Only if M is a diagonal matrix.',
          'If M has only negative eigenvalues.'
        ],
        correctAnswerIndex: 1,
        explanation: 'For the M-norm to satisfy the non-negativity and definiteness axioms, the matrix M must be Symmetric Positive Definite, ensuring x^T M x > 0 for all non-zero vectors.'
      },
      {
        question: 'What does the equivalence of norms in finite dimensions guarantee?',
        options: [
          'All norms will calculate exactly the same numerical value for a given vector.',
          'If a sequence converges to a limit in one norm, it is mathematically guaranteed to converge to the same limit in all other norms.',
          'We only need to use the 1-norm for all calculations.',
          'The condition number of a matrix is the same across all norms.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Norm equivalence proves that the topological properties (like open sets, limit points, and convergence) are identical in finite-dimensional spaces across all valid norms.'
      }
    ]
  },
  {
    id: 'nla-3',
    courseId: 'nla',
    chapterNumber: '3',
    title: 'Least Squares Minimization Problems',
    intro: 'When we have more equations than unknowns ($m > n$), a linear system $Ax=b$ has no exact solution. This chapter covers the method of Least Squares, its general derivatives, Weighted Least Squares, and Tikhonov Regularization.',
    motivation: 'In real-world engineering and data science, data is noisy and overdetermined. Least Squares allows us to find the single mathematically optimal vector that minimizes the sum of squared errors, while regularizations protect our models against extreme noise.',
    definitions: [
      {
        id: 'def-nla-3-1',
        title: 'Full-Rank Least Squares & Normal Equations',
      titleHe: 'ריבועים מינימליים בדרגה מלאה (Normal Equations)',
      simplifiedLogic: 'When $Ax = b$ has no exact solution (usually because we have more equations than variables, $m > n$), we project $b$ onto the column space of $A$. The closest possible vector is the projection, which we find by solving the **Normal Equations** ($A^TAx = A^Tb$).\n\n**Mathematical Pipeline:**\n$$\\text{Inconsistent: } Ax \\approx b \\quad \\longrightarrow \\quad \\text{Orthogonal Project: } A^T(b - Ax) = 0 \\quad \\longrightarrow \\quad \\text{Normal Equations: } A^T A x = A^T b$$',
      simplifiedLogicHe: 'כאשר למערכת $Ax = b$ אין פתרון מדויק (בדרך כלל כשיש יותר משוואות מנעלמים, $m > n$), אנו מטילים את $b$ על מרחב העמודות של $A$. הוקטור הקרוב ביותר האפשרי הוא ההיטל, אותו אנו מוצאים על ידי פתרון **המשוואות הנורמליות** ($A^TAx = A^Tb$).\n\n**תהליך הפתרון:**\n$$\\text{לא עקבי: } Ax \\approx b \\quad \\longrightarrow \\quad \\text{הטלה ניצבת: } A^T(b - Ax) = 0 \\quad \\longrightarrow \\quad \\text{משוואות נורמליות: } A^T A x = A^T b$$',
      toolboxConnection: 'This is the exact linear case of the **Gauss-Newton** method in **OPT Chapter 2**, showing that least squares fitting is optimization in its purest form.',
      toolboxConnectionHe: 'זהו המקרה הליניארי המדויק של שיטת **גאוס-ניוטון** ב-**OPT פרק 2**, המראה שפתרון ריבועים מינימליים הוא אופטימיזציה בצורתה הטהורה ביותר.',
      keyTakeaway: 'Normal equations solve overdetermined systems by forcing the error residual to be orthogonal to matrix columns.',
      keyTakeawayHe: 'משוואות נורמליות פותרות מערכות יתר על ידי אילוץ שארית השגיאה להיות ניצבת לעמודות המטריצה.',
        content: 'Let $A \\in \\mathbb{R}^{m \\times n}$ with $m > n$ have full column rank ($rank(A) = n$). We want to minimize the Euclidean norm of the residual $r = b - Ax$:\n$$\\min_x f(x) = \\frac{1}{2} \\|Ax - b\\|_2^2$$\nSetting the gradient $\\nabla f(x) = 0$ yields the Normal Equations:\n$$A^T A x = A^T b$$',
        proof: 'Proof: Normal Equations Derivation via Matrix Calculus\nLet $f(x) = \\frac{1}{2} \\|Ax - b\\|_2^2 = \\frac{1}{2} (Ax - b)^T (Ax - b)$.\n1. Expand the quadratic form:\n   $$f(x) = \\frac{1}{2} (x^T A^T A x - 2 x^T A^T b + b^T b)$$\n2. To find the minimum, we compute the gradient $\\nabla f(x)$ with respect to the vector $x$. Let\'s recall the derivatives of linear and quadratic functions:\n   - $\\nabla_x (x^T v) = v$\n   - $\\nabla_x (x^T M x) = (M + M^T)x$ (which reduces to $2Mx$ when $M$ is symmetric).\n3. Applying these rules to our expanded objective function:\n   $$\\nabla f(x) = \\frac{1}{2} (2 A^T A x - 2 A^T b) = A^T A x - A^T b$$\n4. Set the gradient to the zero vector for optimality:\n   $$A^T A x - A^T b = 0 \\implies A^T A x = A^T b$$\n5. Since $A$ has full column rank, $A^T A$ is symmetric positive definite and therefore invertible, yielding the unique least squares solution $x = (A^T A)^{-1} A^T b$.',
        example: 'Fit a line $y = c_1 x + c_2$ to three data points: $(1, 2), (2, 3), (3, 5)$.\n1. Set up the overdetermined system $Ac = y$:\n   $$A = \\begin{bmatrix} 1 & 1 \\\\ 2 & 1 \\\\ 3 & 1 \\end{bmatrix}, \\quad y = \\begin{bmatrix} 2 \\\\ 3 \\\\ 5 \\end{bmatrix}$$\n2. Compute $A^T A$ and $A^T y$:\n   $$A^T A = \\begin{bmatrix} 14 & 6 \\\\ 6 & 3 \\end{bmatrix}, \\quad A^T y = \\begin{bmatrix} 23 \\\\ 10 \\end{bmatrix}$$\n3. Solve the Normal Equations $\\begin{bmatrix} 14 & 6 \\\\ 6 & 3 \\end{bmatrix} \\begin{bmatrix} c_1 \\\\ c_2 \\end{bmatrix} = \\begin{bmatrix} 23 \\\\ 10 \\end{bmatrix}$:\n   Multiplying row 2 by 2 gives $12c_1 + 6c_2 = 20$. Subtract from row 1:\n   $$2c_1 = 3 \\implies c_1 = 1.5$$\n   Substitute: $6(1.5) + 3c_2 = 10 \\implies 9 + 3c_2 = 10 \\implies c_2 = 1/3 \\approx 0.33$.\n4. Best-fit line: $y = 1.5x + 0.33$.'
      },
      {
        id: 'def-nla-3-2',
        title: 'Weighted & Regularized Least Squares',
      titleHe: 'ריבועים מינימליים משוקללים ורגולריזציה (Tikhonov)',
      simplifiedLogic: 'Not all data points are created equal. **Weighted Least Squares** scales equations so that reliable measurements count more than noisy ones. **Tikhonov Regularization** prevents overfitting and mathematical instability by adding a penalty parameter $\\lambda^2 \\|x\\|_2^2$ to the objective, keeping the solution vector coordinates small.\n\n**Visual Summary Comparison:**\n| Method | Objective Function | Key Purpose |\n| :--- | :--- | :--- |\n| **Standard Least Squares** | $\\min \\|Ax - b\\|_2^2$ | Minimizes raw squared residual sum |\n| **Weighted Least Squares** | $\\min \\|D(Ax - b)\\|_2^2$ | Gives higher weight to high-confidence data |\n| **Tikhonov Regularization** | $\\min \\|Ax - b\\|_2^2 + \\lambda^2 \\|x\\|_2^2$ | Prevents high sensitivity and overfitting to noise |',
      simplifiedLogicHe: 'לא כל נקודות המידע נולדו שוות. **ריבועים מינימליים משוקללים** מעניקים משקל רב יותר למדידות אמינות ופחות למדידות רועשות. **רגולריזציית טיכונוב** מונעת התאמת-יתר ואי-יציבות מתמטית על ידי הוספת איבר ענישה $\\lambda^2 \\|x\\|_2^2$, השומר על ערכי וקטור הפתרון קטנים ויציבים.\n\n**טבלת השוואה:**\n| שיטה | פונקציית המטרה | מטרה מרכזית |\n| :--- | :--- | :--- |\n| **ריבועים מינימליים רגילים** | $\\min \\|Ax - b\\|_2^2$ | מזעור סכום ריבועי השאריות הגולמי |\n| **ריבועים מינימליים משוקללים** | $\\min \\|D(Ax - b)\\|_2^2$ | מתן עדיפות לנתונים בעלי רמת אמינות גבוהה |\n| **רגולריזציית טיכונוב** | $\\min \\|Ax - b\\|_2^2 + \\lambda^2 \\|x\\|_2^2$ | מנהעת רגישות יתר והתאמת-יתר לרעש |',
      toolboxConnection: 'In **OPT Chapter 3**, Penalty methods enforce constraints by adding penalties to the objective, which is the exact same mathematical mechanism as Tikhonov regularization in NLA!',
      toolboxConnectionHe: 'ב-**OPT פרק 3**, שיטות קנס אוכפות אילוצים על ידי הוספת עונשים לפונקציית המטרה, וזהו מנגנון מתמטי זהה לחלוטין לרגולריזציית טיכונוב ב-NLA!',
      keyTakeaway: 'Regularization trading off residual error for parameter stability prevents noise from ruining solutions.',
      keyTakeawayHe: 'רגולריזציה מאזנת בין שגיאת השארית ליציבות הפרמטרים ובכך מונעת מרעש להרוס את הפתרון.',
        content: '1. Weighted Least Squares (WLS): Minimizes the error with varying confidence weights $W$:\n   $$\\min_x \\frac{1}{2} \\|Ax - b\\|_W^2 \\implies (A^T W A) x = A^T W b$$\n2. Regularized Least Squares (Tikhonov Regularization): Handles ill-conditioned or low-rank matrices by penalizing large solution norms with parameter $\\mu > 0$:\n   $$\\min_x \\frac{1}{2} \\|Ax - b\\|_2^2 + \\frac{\\mu}{2} \\|x\\|_2^2 \\implies (A^T A + \\mu I) x = A^T b$$',
        proof: 'Proof: Regularized LS Stability & Solvability\nSuppose $A^T A$ is singular (e.g., $rank(A) < n$, meaning we have infinitely many solutions and the system is unstable).\n1. We define the regularized objective: $g(x) = \\frac{1}{2} \\|Ax - b\\|_2^2 + \\frac{\\mu}{2} x^T x$.\n2. Take the gradient:\n   $$\\nabla g(x) = A^T A x - A^T b + \\mu x = (A^T A + \\mu I) x - A^T b$$\n3. Set to zero: $(A^T A + \\mu I) x = A^T b$.\n4. Let the eigenvalues of $A^T A$ be $\\lambda_i \\geq 0$. The eigenvalues of the regularized matrix $A^T A + \\mu I$ are $\\lambda_i + \\mu$.\n5. Since $\\mu > 0$, the smallest eigenvalue is at least $\\mu$, meaning $(A^T A + \\mu I)$ is strictly positive definite and guaranteed invertible, even if $A^T A$ was highly singular. This bounds the condition number and stabilizes the solution against extreme noise (vital in applications like image de-blurring).',
        example: 'Let $A^T A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$ (singular, $\\det = 0$) and $A^T b = \\begin{bmatrix} 2 \\\\ 2 \\end{bmatrix}$.\nWithout regularization, no unique solution exists.\nApply Tikhonov regularization with $\\mu = 0.1$:\n$$A^T A + \\mu I = \\begin{bmatrix} 1.1 & 1 \\\\ 1 & 1.1 \\end{bmatrix}$$\nSolve $\\begin{bmatrix} 1.1 & 1 \\\\ 1 & 1.1 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 2 \\end{bmatrix}$:\nBy symmetry, $x_1 = x_2$. So $2.1x_1 = 2 \\implies x_1 = x_2 = 2/2.1 \\approx 0.95$. We obtained a stable, unique, and bounded solution!'
      },
      {
        id: 'def-nla-3-3',
        title: 'Gradient Rules & LS Orthogonality Property',
      titleHe: 'חוקי גרדיאנטים ואורתוגונליות של ריבועים מינימליים',
      simplifiedLogic: 'To solve multi-dimensional optimization problems, we must take derivatives of vectors and matrices. This section catalogs the foundational matrix calculus rules (linear forms, quadratic forms, and symmetric gradients) and proves that the optimal least squares residual is strictly orthogonal to the columns of $A$.\n\n**Gradient Formula Matrix:**\n* Linear: $\\nabla_x (c^T x) = c$\n* Quadratic (General): $\\nabla_x (x^T M x) = (M + M^T) x$\n* Quadratic (Symmetric): $\\nabla_x (x^T A x) = 2 A x \\quad \\text{if } A^T = A$',
      simplifiedLogicHe: 'כדי לפתור בעיות אופטימיזציה רב-ממדיות, עלינו לדעת לגזור וקטורים ומטריצות. סעיף זה מרכז את חוקי היסוד של חשבון מטריצות (תבניות ליניאריות, תבניות ריבועיות וגרדיאנטים סימטריים) ומוכיח ששארית הריבועים המינימליים האופטימלית ניצבת לחלוטין לעמודות של $A$.\n\n**חוקי גזירה מהירים:**\n* ליניארי: $\\nabla_x (c^T x) = c$\n* ריבועי (כללי): $\\nabla_x (x^T M x) = (M + M^T) x$\n* ריבועי (סימטרי): $\\nabla_x (x^T A x) = 2 A x \\quad \\text{כאשר } A^T = A$',
      toolboxConnection: 'These gradient rules are the foundational toolbox used in **OPT Chapter 1** to derive the unconstrained First-Order and Second-Order Necessary Conditions!',
      toolboxConnectionHe: 'חוקי גזירה אלו הם ארגז הכלים הבסיסי המשמש ב-**OPT פרק 1** לגזירת תנאי האופטימליות מסדר ראשון ושני!',
      keyTakeaway: 'Vector derivatives treat vectors as single entities, and least-squares errors always sit perfectly orthogonal to column models.',
      keyTakeawayHe: 'נגזרות וקטוריות מתייחסות לוקטורים כישויות אחידות, ושגיאות ריבועים מינימליים תמיד ניצבות לחלוטין למודל העמודות.',
        content: '**Four key gradient identities** used to derive the normal equations:\n1. $\\nabla_x (v^T x) = v$\n2. $\\nabla_x (x^T v) = v$\n3. $\\nabla_x (v^T A^T A x) = A^T A v$ (linear in $x$)\n4. $\\nabla_x (x^T A^T A x) = 2 A^T A x$ (quadratic, symmetric matrix)\n\nFor any matrix $M$: $\\nabla_x(x^T M x) = (M + M^T)x$, which simplifies to $2Mx$ when $M$ is symmetric.\n\n**Orthogonality Property of LS**: The residual $r = b - A\\hat{x}$ of the least squares solution is orthogonal to the column space of $A$:\n$$A^T r = A^T(b - A\\hat{x}) = 0$$\nGeometrically: $\\hat{x}$ is the projection of $b$ onto the column space of $A$, and $r$ is the perpendicular component.',
        proof: 'Proof: LS Orthogonality from Normal Equations\n\nThe normal equation states:\n$$A^T A \\hat{x} = A^T b$$\nRearranging:\n$$A^T A \\hat{x} - A^T b = 0 \\implies A^T(A\\hat{x} - b) = 0 \\implies A^T r = 0$$\n\nAlternatively, we can derive this geometrically. The LS problem minimizes $\\|b - Ax\\|_2^2$ over all $x$. The minimum occurs when $b - A\\hat{x}$ is perpendicular to every direction in which $Ax$ can move (i.e., every column of $A$). This means:\n$$\\langle a_j, r \\rangle = a_j^T r = 0 \\quad \\forall j = 1, ..., n$$\nwhich is exactly $A^T r = 0$. $\\square$',
        example: 'Using the data fit example: $A = \\begin{bmatrix} 1 & 1 \\\\ 2 & 1 \\\\ 3 & 1 \\end{bmatrix}$, $b = \\begin{bmatrix} 2 \\\\ 3 \\\\ 5 \\end{bmatrix}$, $\\hat{x} = [1.5, 0.33]^T$.\n\nResidual: $r = b - A\\hat{x} = \\begin{bmatrix}2\\\\3\\\\5\\end{bmatrix} - \\begin{bmatrix}1.83\\\\3.33\\\\4.83\\end{bmatrix} = \\begin{bmatrix}0.17\\\\-0.33\\\\0.17\\end{bmatrix}$\n\nVerify orthogonality:\n$$A^T r = \\begin{bmatrix} 1 & 2 & 3 \\\\ 1 & 1 & 1 \\end{bmatrix} \\begin{bmatrix}0.17\\\\-0.33\\\\0.17\\end{bmatrix} = \\begin{bmatrix} 0.17 - 0.66 + 0.51 \\\\ 0.17 - 0.33 + 0.17 \\end{bmatrix} = \\begin{bmatrix} 0.02 \\\\ 0.01 \\end{bmatrix} \\approx 0 \\checkmark$$\n(Small rounding errors only.)'
      }
    ],

    quiz: [
      {
        question: 'What is the main purpose of Tikhonov Regularization (regularized least squares)?',
        options: [
          'To make the matrix multiplication faster.',
          'To stabilize ill-conditioned or singular systems by adding a penalty parameter μ to the diagonal.',
          'To eliminate all constraints from the system.',
          'To make the solution equal to zero.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Regularization adds μI to A^T A. This shifts all eigenvalues of the coefficient matrix away from zero, making it strictly positive definite and invertible, which prevents extreme round-off amplification.'
      },
      {
        question: 'Under what condition does the standard full-rank Least Squares normal equation system have a unique solution?',
        options: [
          'Only when the matrix A is symmetric.',
          'When A has full column rank (rank(A) = n), which guarantees A^T A is invertible.',
          'When the number of rows equals the number of columns.',
          'When the right hand side vector b is zero.'
        ],
        correctAnswerIndex: 1,
        explanation: 'If A has full column rank, the columns are linearly independent. This ensures that the symmetric matrix A^T A is strictly positive definite and hence uniquely invertible.'
      }
    ]
  },
  {
    id: 'nla-4-1',
    courseId: 'nla',
    chapterNumber: '4',
    title: 'Matrix Norms & Condition Numbers',
    intro: 'This chapter expands norms from vector spaces to matrix spaces. We define induced matrix norms, examine their sub-multiplicative properties, and derive the condition number to bound numerical error propagation in linear solvers.',
    motivation: 'A solver is only as good as the conditioning of the matrix. If a matrix is close to singular, small roundoff errors in the machine representation will explode, destroying the accuracy of the output. Matrix norms and condition numbers give us the precise limits of how much we can trust our computer\'s results.',
    definitions: [
      {
        id: 'def-nla-4-1-1',
        title: 'Induced Matrix Norms (1, ∞, 2 Norms)',
      titleHe: 'נורמות מושרות של מטריצות',
      simplifiedLogic: 'A matrix induced norm represents the maximum possible scaling or "stretching factor" the matrix can apply to any vector. It measures the "strength" of the operator.\n\n**Visual Summary Comparison:**\n| Norm | Mathematical Name | Computational Recipe | Mental Model |\n| :--- | :--- | :--- | :--- |\n| **$\\|A\\|_1$** | Induced 1-Norm | Max absolute column sum | Maximum stretch for coordinate axis vectors |\n| **$\\|A\\|_\\infty$** | Induced $\\infty$-Norm | Max absolute row sum | Maximum stretch for worst-case sign vectors |\n| **$\\|A\\|_2$** | Induced 2-Norm | Max singular value ($\\sigma_{\\max}$) | Ellipsoidal principal axis stretching |',
      simplifiedLogicHe: 'נורמה מושרית של מטריצה מייצגת את גורם המתיחה או המתיחה המקסימלית האפשרית שהמטריצה יכולה להחיל על וקטור כלשהו. היא מודדת את "העוצמה" של האופרטור.\n\n**טבלת השוואה חזותית:**\n| נורמה | שם מתמטי | שיטת חישוב | מודל מנטלי |\n| :--- | :--- | :--- | :--- |\n| **$\\|A\\|_1$** | נורמת 1 מושרית | סכום עמודה מוחלט מקסימלי | מתיחה מקסימלית לאורך צירי הקואורדינטות |\n| **$\\|A\\|_\\infty$** | נורמת $\\infty$ מושרית | סכום שורה מוחלט מקסימלי | מתיחה מקסימלית עבור וקטורי סימנים גרועים |\n| **$\\|A\\|_2$** | נורמת 2 מושרית | הערך הסינגולרי המקסימלי ($\\sigma_{\\max}$) | מתיחת הציר המרכזי של האליפסואיד |',
      toolboxConnection: 'The induced 2-norm $\\|A\\|_2$ is exactly the largest singular value $\\sigma_{\\max}$ of the SVD, which we use in **NLA Chapter 5** to find the optimal rank-1 approximations!',
      toolboxConnectionHe: 'הנורמה המושרית $\\|A\\|_2$ היא בדיוק הערך הסינגולרי הגדול ביותר $\\sigma_{\\max}$ של ה-SVD, המשמש ב-**NLA פרק 5** למציאת הקירובים הטובים ביותר מדרגה 1!',
      keyTakeaway: 'Induced matrix norms measure the maximum scaling power of a matrix over the unit sphere.',
      keyTakeawayHe: 'נורמות מטריצה מושרות מודדות את כוח המתיחה המקסימלי של מטריצה מעל כדור היחידה.',
        content: 'An induced matrix norm measures the maximum amplification of a vector under matrix multiplication: $\\|A\\| = \\max_{x \\neq 0} \\frac{\\|Ax\\|}{\\|x\\|}$. Common formulas:\n1. Induced 1-Norm (Max Column Sum):\n   $$\\|A\\|_1 = \\max_{1 \\leq j \\leq n} \\sum_{i=1}^m |a_{ij}|$$\n2. Induced $\\infty$-Norm (Max Row Sum):\n   $$\\|A\\|_\\infty = \\max_{1 \\leq i \\leq m} \\sum_{j=1}^n |a_{ij}|$$\n3. Induced 2-Norm (Spectral Norm):\n   $$\\|A\\|_2 = \\sqrt{\\lambda_{\\max}(A^T A)} = \\sigma_{\\max}(A)$$',
        proof: 'Proof: Theorem for Matrix 1-Norm Formula\nWe prove that $\\|A\\|_1 = C$, where $C = \\max_j \\sum_i |a_{ij}|$.\n\n1. Let $x \\neq 0$. We bound $\\|Ax\\|_1$ from above:\n   $$\\|Ax\\|_1 = \\sum_i \\left| \\sum_j a_{ij} x_j \\right| \\leq \\sum_i \\sum_j |a_{ij}| |x_j| = \\sum_j |x_j| \\left( \\sum_i |a_{ij}| \\right)$$\n2. Since $\\sum_i |a_{ij}| \\leq C$ for all columns $j$:\n   $$\\|Ax\\|_1 \\leq C \\sum_j |x_j| = C \\|x\\|_1$$\n   Thus, $\\frac{\\|Ax\\|_1}{\\|x\\|_1} \\leq C$, showing that $\\|A\\|_1 \\leq C$.\n\n3. Now we show the bound is achieved. Let the maximum column sum occur at column $k$, so $\\sum_i |a_{ik}| = C$.\n4. Choose the vector $x = e_k$ (the $k$-th standard basis vector). Then $\\|x\\|_1 = 1$.\n5. Compute $Ax$:\n   $$Ax = A e_k = \\text{the } k\\text{-th column of } A$$\n6. Thus:\n   $$\\|Ax\\|_1 = \\sum_i |a_{ik}| = C$$\n   Since there exists a vector achieving the ratio $C$, the induced norm must be exactly $C$, i.e., $\\|A\\|_1 = \\max_j \\sum_i |a_{ij}|$. A highly parallel proof bounds the $\\infty$-norm.',
        example: 'Let $A = \\begin{bmatrix} -1 & 5 \\\\ 3 & -2 \\end{bmatrix}$.\n- Column 1 sum: $|-1| + |3| = 4$. Column 2 sum: $|5| + |-2| = 7$. Thus $\\|A\\|_1 = 7$.\n- Row 1 sum: $|-1| + |5| = 6$. Row 2 sum: $|3| + |-2| = 5$. Thus $\\|A\\|_\\infty = 6$.'
      },
      {
        id: 'def-nla-4-1-2',
        title: 'Matrix Condition Number & Error Bounds',
      titleHe: 'מספר מצב של מטריצה',
      simplifiedLogic: 'The condition number $\\kappa(A)$ measures how sensitive a linear system is to input errors or numerical noise. If the condition number is close to 1, the matrix is stable; if it is very large, a tiny ripple in the input data leads to a massive tsunami in the output solution.\n\n**Visual Sensitivity Mappings:**\n* **Low Condition ($\\kappa \\approx 1$):** Well-conditioned $\\rightarrow$ Spherical mapping $\\rightarrow$ High stability\n* **High Condition ($\\kappa \\gg 1$):** Ill-conditioned $\\rightarrow$ Extremely narrow, squashed ellipse $\\rightarrow$ Severe sensitivity to noise',
      simplifiedLogicHe: 'מספר המצב $\\kappa(A)$ מודד כמה רגישה מערכת ליניארית לשגיאות קלט או לרעש מספרי. אם מספר המצב קרוב ל-1, המטריצה יציבה; אם הוא גדול מאוד, תנודה קלה בנתוני הקלט תוביל לקריסה של הפתרון.\n\n**מיפוי רגישות חזותי:**\n* **מספר מצב נמוך ($\\kappa \\approx 1$):** מצב טוב $\\rightarrow$ מיפוי כדורי $\\rightarrow$ יציבות גבוהה\n* **מספר מצב גבוה ($\\kappa \\gg 1$):** מצב גרוע $\\rightarrow$ אליפסה צרה ומתוחה מאוד $\\rightarrow$ רגישות קיצונית לרעש',
      toolboxConnection: 'A high condition number in NLA Chapter 4 is the direct mathematical cause of the severe "zigzagging" effect in **OPT Chapter 2**\'s Steepest Descent solver!',
      toolboxConnectionHe: 'מספר מצב גבוה ב-NLA פרק 4 הוא הגורם המתמטי הישיר לתופעת ה"זיגזג" החמורה בפותר הירידה התלולה ב-**OPT פרק 2**!',
      keyTakeaway: 'The condition number acts as an error amplifier for system solvers; high values mean noise destroys accuracy.',
      keyTakeawayHe: 'מספר המצב משמש כאיבר הגברה לשגיאות; ערכים גבוהים פירושם שרעש קל יהרוס לחלוטין את הדיוק.',
        content: 'For a non-singular matrix $A \\in \\mathbb{R}^{n \\times n}$, the condition number with respect to a norm $\\|\\cdot\\|$ is:\n$$\\kappa(A) = \\|A\\| \\cdot \\|A^{-1}\\|$$\nIt represents the worst-case error magnification factor. Always $\\kappa(A) \\geq 1$.',
        proof: 'Proof: Theorem on Relative Error Propagation\nLet $Ax = b$. Suppose $b$ has a perturbation $\\delta b$, giving perturbed solution $x + \\delta x$ such that $A(x + \\delta x) = b + \\delta b$.\n1. Since $Ax = b$, subtracting this yields $A \\delta x = \\delta b \\implies \\delta x = A^{-1} \\delta b$.\n2. Taking norms on both sides:\n   $$\\|\\delta x\\| = \\|A^{-1} \\delta b\\| \\leq \\|A^{-1}\\| \\cdot \\|\\delta b\\|$$\n3. Also, from $Ax = b$, we have:\n   $$\\|b\\| = \\|Ax\\| \\leq \\|A\\| \\cdot \\|x\\| \\implies \\frac{1}{\\|x\\|} \\leq \\frac{\\|A\\|}{\\|b\\|}$$\n4. Combine these two inequalities by multiplying them together:\n   $$\\frac{\\|\\delta x\\|}{\\|x\\|} \\leq \\left( \\|A^{-1}\\| \\cdot \\|\\delta b\\| \\right) \\cdot \\left( \\frac{\\|A\\|}{\\|b\\|} \\right) = (\\|A\\| \\cdot \\|A^{-1}\\|) \\frac{\\|\\delta b\\|}{\\|b\\|} = \\kappa(A) \\frac{\\|\\delta b\\|}{\\|b\\|}$$\n\nExplanation:\nThis proves that the relative error in the output solution $\\frac{\\|\\delta x\\|}{\\|x\\|}$ can be up to $\\kappa(A)$ times larger than the relative error in the input $\\frac{\\|\\delta b\\|}{\\|b\\|}$. If $\\kappa(A) = 10^k$, we can expect to lose $k$ decimal digits of precision during the solve.',
        example: 'Let $A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1.0001 \\end{bmatrix}$. The inverse is $A^{-1} = \\begin{bmatrix} 10001 & -10000 \\\\ -10000 & 10000 \\end{bmatrix}$.\n- Under the $\\infty$-norm:\n  $$\\|A\\|_\\infty = 2.0001, \\quad \\|A^{-1}\\|_\\infty = 20001$$\n  $$\\kappa_\\infty(A) = 2.0001 \\times 20001 = 40004.0001 \\approx 4 \\times 10^4$$\n- If we solve $Ax=b$ with input data perturbed by a tiny 0.01% error, our output solution can be corrupted by up to $40004 \\times 0.01\\% = 400\\%$ error, yielding total garbage!'
      },
      {
        id: 'def-nla-4-1-3',
        title: 'Frobenius Norm, Sub-multiplicativity & Spectral Radius',
      titleHe: 'נורמת פרובניוס, סאב-מולטיפליקטיביות ורדיוס ספקטרלי',
      simplifiedLogic: 'This section details key tools to evaluate matrix sizes and boundaries:\n1. **Frobenius Norm:** Evaluates the overall matrix size as if it were a single flat vector.\n2. **Sub-multiplicativity:** Proves that multiplication cannot multiply scaling indefinitely ($\\|AB\\| \\leq \\|A\\| \\|B\\|$).\n3. **Spectral Radius ($\\rho(A)$):** The absolute largest eigenvalue. It defines the asymptotic behavior of matrix power sequences.',
      simplifiedLogicHe: 'סעיף זה מרכז כלים מרכזיים להערכת גדלים וחסמים של מטריצות:\n1. **נורמת פרובניוס:** מודדת את הגודל הכולל של המטריצה כאילו הייתה וקטור שטוח ארוך.\n2. **תכונת הסאב-מולטיפליקטיביות:** מוכיחה שכפל מטריצות אינו יכול להגדיל את המתיחה ללא גבול ($\\|AB\\| \\leq \\|A\\| \\|B\\|$).\n3. **רדיוס ספקטרלי ($\\rho(A)$):** הערך העצמי הגדול ביותר בערכו המוחלט. הוא מגדיר את ההתנהגות האסימפטוטית של חזקות מטריצה.',
      toolboxConnection: 'The Spectral Radius $\\rho(A)$ is the exact criteria used in **NLA Chapter 6** to prove if preconditioned solvers like Jacobi or Gauss-Seidel will converge!',
      toolboxConnectionHe: 'הרדיוס הספקטרלי $\\rho(A)$ הוא הקריטריון המדויק המשמש ב-**NLA פרק 6** כדי להוכיח האם פותרים איטרטיביים כמו יעקובי או גאוס-סיידל יתכנסו!',
      keyTakeaway: 'Spectral radius sets the asymptotic speed of iterative matrix solvers, while sub-multiplicativity bounds product growth.',
      keyTakeawayHe: 'הרדיוס הספקטרלי קובע את מהירות ההתכנסות האסימפטוטית של פותרים איטרטיביים, בעוד שתכונת הסאב-מולטיפליקטיביות חוסמת גידול של מכפלות.',
        content: '**Frobenius Norm**: An entry-wise matrix norm analogous to the vector $\\ell_2$ norm:\n$$\\|A\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n |a_{ij}|^2} = \\sqrt{\\text{trace}(A^* A)} = \\sqrt{\\sum_{i=1}^p \\sigma_i^2}$$\nIt is not an induced norm, but it satisfies $\\|A\\|_2 \\leq \\|A\\|_F \\leq \\sqrt{n} \\|A\\|_2$.\n\n**Sub-multiplicativity** (Proposition): Any induced matrix norm satisfies:\n$$\\|AB\\| \\leq \\|A\\| \\cdot \\|B\\|$$\n\n**Spectral Radius** (Definition): The largest eigenvalue in magnitude:\n$$\\rho(A) = \\max_{1 \\leq i \\leq n} |\\lambda_i(A)|$$\nFor any induced matrix norm: $\\rho(A) \\leq \\|A\\|$. This is key to analysing the convergence of iterative methods — they converge iff $\\rho(T) < 1$.',
        proof: 'Proof: Sub-multiplicativity of Induced Norms\n\nLet $\\|\\cdot\\|$ be any induced matrix norm, and let $B \\in \\mathbb{R}^{n \\times p}$, $x \\in \\mathbb{R}^p$ with $x \\neq 0$.\n\nFrom the definition of induced norm:\n$$\\|Bx\\| \\leq \\|B\\| \\cdot \\|x\\|$$\nApplying $A$ to both sides:\n$$\\|A(Bx)\\| \\leq \\|A\\| \\cdot \\|Bx\\| \\leq \\|A\\| \\cdot \\|B\\| \\cdot \\|x\\|$$\nSince this holds for all $x \\neq 0$:\n$$\\|AB\\| = \\max_{x \\neq 0} \\frac{\\|(AB)x\\|}{\\|x\\|} \\leq \\|A\\| \\cdot \\|B\\| \\quad \\square$$\n\nProof: Spectral radius bound $\\rho(A) \\leq \\|A\\|$\n\nLet $(\\lambda, v)$ be an eigenpair of $A$ with $\\|v\\| = 1$. Then:\n$$|\\lambda| = |\\lambda| \\cdot \\|v\\| = \\|\\lambda v\\| = \\|Av\\| \\leq \\|A\\| \\cdot \\|v\\| = \\|A\\|$$\nSince this holds for any eigenvalue, $\\rho(A) = \\max_i |\\lambda_i| \\leq \\|A\\|$. $\\square$',
        example: 'Let $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$.\n\n**Frobenius norm**: $\\|A\\|_F = \\sqrt{1^2 + 2^2 + 3^2 + 4^2} = \\sqrt{1+4+9+16} = \\sqrt{30} \\approx 5.48$\n\n**Spectral norm**: Eigenvalues of $A^T A = \\begin{bmatrix}10 & 14\\\\14 & 20\\end{bmatrix}$ are $\\lambda \\approx 29.87$ and $0.13$. So $\\|A\\|_2 = \\sqrt{29.87} \\approx 5.47$.\n\n**Sub-multiplicativity check**: If $B = A$, then $\\|A^2\\|_F \\leq \\|A\\|_F^2 = 30$. Computing directly: $A^2 = \\begin{bmatrix}7 & 10\\\\15 & 22\\end{bmatrix}$, and $\\|A^2\\|_F = \\sqrt{49+100+225+484} = \\sqrt{858} \\approx 29.3 \\leq 30$ ✓'
      }
    ],

    quiz: [
      {
        question: 'Which of the following represents the formula for calculating the induced infinity-norm of a matrix?',
        options: [
          'The square root of the maximum eigenvalue of A^T A.',
          'The maximum absolute column sum.',
          'The maximum absolute row sum.',
          'The sum of squares of all elements.'
        ],
        correctAnswerIndex: 2,
        explanation: 'The induced infinity-norm of a matrix is the maximum absolute row sum, whereas the 1-norm is the maximum absolute column sum.'
      },
      {
        question: 'If a matrix has κ(A) = 10^5, and our right-hand side b is measured with an accuracy of 5 decimal digits, how many digits of accuracy can we expect in the solution x?',
        options: [
          '5 digits of accuracy.',
          'Roughly 0 stable digits (complete loss of accuracy).',
          '10 digits of accuracy.',
          'No digits are lost.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Solving a system loses roughly log10(κ(A)) digits. Here, log10(10^5) = 5 digits are lost, which destroys all 5 digits of input accuracy, leaving the solution completely unreliable.'
      }
    ]
  },
  {
    id: 'nla-5',
    courseId: 'nla',
    chapterNumber: '5',
    title: 'Orthogonalization & The SVD',
    intro: 'This chapter explores orthogonal bases, the Gram-Schmidt process, QR Factorization, and builds to the ultimate matrix decomposition: the Singular Value Decomposition (SVD), which reveals a matrix\'s core geometry and enables low-rank data compression.',
    motivation: 'Orthogonal vectors do not interfere with each other, making calculations numerically robust. The SVD is the single most powerful tool in numerical linear algebra—it solves ill-conditioned least squares, reveals the exact rank of a matrix, and provides the mathematically absolute best low-rank data approximations.',
    definitions: [
      {
        id: 'def-nla-5-1',
        title: 'Gram-Schmidt & QR Factorization',
      titleHe: 'תהליך גרם-שמידט ופירוק QR',
      simplifiedLogic: 'QR factorization factorizes a matrix $A$ into orthogonal columns $Q$ and an upper triangular matrix $R$. Classical Gram-Schmidt (CGS) projects vectors sequentially but is numerically unstable. Modified Gram-Schmidt (MGS) corrects this by projecting all remaining vectors immediately, preserving orthogonality.\n\n**CGS vs. MGS Stability Mapping:**\n| Feature | Classical Gram-Schmidt (CGS) | Modified Gram-Schmidt (MGS) |\n| :--- | :--- | :--- |\n| **Projection Step** | Projects vector against finished base | Projects remaining pool against current vector |\n| **Numerical Stability** | Poor (loses orthogonality in floating point) | High (satisfies non-increasing error bounds) |\n| **Best Used For** | Parallel hardware architectures | General robust QR computations |',
      simplifiedLogicHe: 'פירוק QR מפרק מטריצה $A$ לעמודות אורתוגונליות $Q$ ומטריצה משולשית עליונה $R$. תהליך גרם-שמידט הקלאסי (CGS) מטיל וקטורים באופן סדרתי אך הוא לא יציב מספרית. התהליך המעודכן (MGS) מתקן זאת על ידי הטלת כל הוקטורים הנותרים באופן מיידי, ובכך שומר על האורתוגונליות.\n\n**השוואת יציבות חזותית:**\n| תכונה | גרם-שמידט קלאסי (CGS) | גרם-שמידט מעודכן (MGS) |\n| :--- | :--- | :--- |\n| **שלב ההטלה** | מטיל את הוקטור הנוכחי מול הבסיס המוגמר | מטיל את כל הוקטורים הנותרים מול הוקטור הנוכחי |\n| **יציבות מספרית** | נמוכה (מאבד אורתוגונליות בנקודה צפה) | גבוהה (עומד בחסמי שגיאה יציבים) |\n| **מתאים במיוחד ל-** | ארכיטקטורות חומרה מקביליות | חישובי QR חסונים וכלליים |',
      toolboxConnection: 'QR decomposition is the standard engine inside **OPT Chapter 3** for projecting gradients onto linear constraint hyperplanes safely!',
      toolboxConnectionHe: 'פירוק QR הוא המנוע הסטנדרטי המשמש ב-**OPT פרק 3** להטלת גרדיאנטים על אילוצי שוויון ליניאריים בצורה יציבה ובטוחה!',
      keyTakeaway: 'Modified Gram-Schmidt preserves mathematical orthogonality in floating point by correcting vector pools in real-time.',
      keyTakeawayHe: 'תהליך גרם-שמידט המעודכן שומר על אורתוגונליות מתמטית בחישובי נקודה צפה על ידי תיקון מאגר הוקטורים בזמן אמת.',
        content: '1. Gram-Schmidt Orthogonalization: Converts a set of linearly independent vectors $v_1, ..., v_n$ into an orthonormal basis $q_1, ..., q_n$:\n   $$u_k = v_k - \\sum_{i=1}^{k-1} \\langle q_i, v_k \\rangle q_i, \\quad q_k = \\frac{u_k}{\\|u_k\\|_2}$$\n2. QR Factorization: Gathers this process into matrix form, factoring any matrix $A \\in \\mathbb{R}^{m \\times n}$ ($m \\geq n$) into:\n   $$A = Q R$$\n   where $Q \\in \\mathbb{R}^{m \\times n}$ has orthonormal columns ($Q^T Q = I$) and $R \\in \\mathbb{R}^{n \\times n}$ is upper triangular.',
        proof: 'Proof: Theorem on QR for Least Squares\nTheorem: The least squares solution to $\\min_x \\|Ax - b\\|_2$ can be computed stably using the QR factorization of $A$.\n\nProof:\n1. Factor $A = QR$, where $Q^T Q = I$ and $R$ is upper triangular.\n2. The least squares objective is $f(x) = \\|Ax - b\\|_2^2$.\n3. Substitute $A = QR$ into the Normal Equations:\n   $$(QR)^T (QR) x = (QR)^T b$$\n4. Expand the transposes:\n   $$R^T Q^T Q R x = R^T Q^T b$$\n5. Since $Q^T Q = I$:\n   $$R^T R x = R^T Q^T b$$\n6. Assuming $A$ has full rank, $R$ is non-singular. We can multiply both sides by $(R^T)^{-1}$:\n   $$R x = Q^T b$$\n7. Since $R$ is upper triangular, we can solve this system using backward substitution in $O(n^2)$ steps. This bypasses computing $A^T A$ entirely, which halves the condition number and is highly stable.',
        example: 'Compute the QR factorization of $A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$.\n1. Let $v_1 = [1, 1, 0]^T$ and $v_2 = [1, 0, 1]^T$.\n2. Orthonormalize $v_1$:\n   $$u_1 = v_1 = \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\quad \\|u_1\\|_2 = \\sqrt{2} \\implies q_1 = \\frac{1}{\\sqrt{2}} \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}$$\n3. Orthonormalize $v_2$ against $q_1$:\n   $$\\langle q_1, v_2 \\rangle = \\frac{1}{\\sqrt{2}} (1) = \\frac{1}{\\sqrt{2}}$$\n   $$u_2 = v_2 - \\langle q_1, v_2 \\rangle q_1 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix} - \\frac{1}{2} \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0.5 \\\\ -0.5 \\\\ 1 \\end{bmatrix}$$\n   $$\\|u_2\\|_2 = \\sqrt{0.25 + 0.25 + 1} = \\sqrt{1.5} = \\frac{\\sqrt{6}}{2}$$\n   $$q_2 = \\frac{u_2}{\\|u_2\\|_2} = \\frac{2}{\\sqrt{6}} \\begin{bmatrix} 0.5 \\\\ -0.5 \\\\ 1 \\end{bmatrix} = \\frac{1}{\\sqrt{6}} \\begin{bmatrix} 1 \\\\ -1 \\\\ 2 \\end{bmatrix}$$\n4. Resulting matrices:\n   $$Q = \\begin{bmatrix} 1/\\sqrt{2} & 1/\\sqrt{6} \\\\ 1/\\sqrt{2} & -1/\\sqrt{6} \\\\ 0 & 2/\\sqrt{6} \\end{bmatrix}, \\quad R = \\begin{bmatrix} \\|u_1\\|_2 & \\langle q_1, v_2 \\rangle \\\\ 0 & \\|u_2\\|_2 \\end{bmatrix} = \\begin{bmatrix} \\sqrt{2} & 1/\\sqrt{2} \\\\ 0 & \\sqrt{1.5} \\end{bmatrix}$$'
      },
      {
        id: 'def-nla-5-2',
        title: 'The Singular Value Decomposition (SVD)',
      titleHe: 'פירוק לערכים סינגולריים ומשפט אקארט-יאנג',
      simplifiedLogic: 'The Singular Value Decomposition (SVD) is the ultimate matrix factorization. It decomposes any matrix into rotation ($U$), scaling ($\\Sigma$), and rotation ($V^T$). The **Eckart-Young Theorem** states that the optimal rank-$k$ approximation of a matrix is found by zeroing out all but the largest $k$ singular values.\n\n**SVD Geometry Map:**\n$$\\text{Input Vector } x \\quad \\longrightarrow \\quad \\text{Rotate } V^T \\quad \\longrightarrow \\quad \\text{Scale } \\Sigma \\quad \\longrightarrow \\quad \\text{Rotate } U$$',
      simplifiedLogicHe: 'פירוק לערכים סינגולריים (SVD) הוא הפירוק האולטימטיבי של מטריצות. הוא מפרק כל מטריצה לסיבוב ($U$), מתיחה/כיווץ ($\\Sigma$) וסיבוב נוסף ($V^T$). **משפט אקארט-יאנג** קובע שהקירוב האופטימלי מדרגה $k$ למטריצה מתקבל על ידי איפוס כל הערכים הסינגולריים מלבד ה-$k$ הגדולים ביותר.\n\n**מיפוי גיאומטרי של SVD:**\n$$\\text{וקטור קלט } x \\quad \\longrightarrow \\quad \\text{סיבוב } V^T \\quad \\longrightarrow \\quad \\text{מתיחה } \\Sigma \\quad \\longrightarrow \\quad \\text{סיבוב } U$$',
      toolboxConnection: 'Low-rank SVD approximation is heavily utilized in **OPT Chapter 2** for Principal Component analysis to compress massive Hessian datasets in machine learning optimization.',
      toolboxConnectionHe: 'קירובים מדרגה נמוכה באמצעות SVD משמשים באופן נרחב ב-**OPT פרק 2** לניתוח רכיבים ראשיים (PCA) במטרה לדחוס מטריצות הסיאן ענקיות באופטימיזציה של למידת מכונה.',
      keyTakeaway: 'Eckart-Young proves SVD yields the mathematically best low-rank matrix approximations by focusing energy on major singular vectors.',
      keyTakeawayHe: 'משפט אקארט-יאנג מוכיח ש-SVD מפיק את קירובי המטריצה הטובים ביותר מדרגה נמוכה על ידי ריכוז האנרגיה בוקטורים הסינגולריים הדומיננטיים.',
        content: 'Any matrix $A \\in \\mathbb{R}^{m \\times n}$ can be factored as:\n$$A = U \\Sigma V^T$$\nwhere $U \\in \\mathbb{R}^{m \\times m}$ and $V \\in \\mathbb{R}^{n \\times n}$ are orthogonal matrices ($U^T U = I, V^T V = I$), and $\\Sigma \\in \\mathbb{R}^{m \\times n}$ is diagonal containing singular values $\\sigma_1 \\geq \\sigma_2 \\geq ... \\geq \\sigma_p \\geq 0$ ($p = \\min(m, n)$).',
        proof: 'Proof: Theorem on Existence of the SVD\nWe prove the existence of the SVD by induction on the size of the matrix $A \\in \\mathbb{R}^{m \\times n}$.\n\n1. Let $\\sigma_1 = \\|A\\|_2 = \\max_{\\|x\\|_2=1} \\|Ax\\|_2$. Since the unit sphere is compact, there exist vectors $v_1 \\in \\mathbb{R}^n$ and $u_1 \\in \\mathbb{R}^m$ of norm 1 such that $A v_1 = \\sigma_1 u_1$.\n2. Extend $v_1$ to an orthonormal basis $V_1 = [v_1, \\tilde{V}]$ of $\\mathbb{R}^n$, and extend $u_1$ to an orthonormal basis $U_1 = [u_1, \\tilde{U}]$ of $\\mathbb{R}^m$.\n3. Consider the product:\n   $$U_1^T A V_1 = \\begin{bmatrix} u_1^T \\\\ \\tilde{U}^T \\end{bmatrix} A \\begin{bmatrix} v_1 & \\tilde{V} \\end{bmatrix} = \\begin{bmatrix} u_1^T A v_1 & u_1^T A \\tilde{V} \\\\ \\tilde{U}^T A v_1 & \\tilde{U}^T A \\tilde{V} \\end{bmatrix}$$\n4. Since $A v_1 = \\sigma_1 u_1$ and $u_1^T u_1 = 1$, we have $u_1^T A v_1 = \\sigma_1$. Also, $\\tilde{U}^T A v_1 = \\sigma_1 \\tilde{U}^T u_1 = 0$ since columns are orthogonal. Thus:\n   $$U_1^T A V_1 = \\begin{bmatrix} \\sigma_1 & w^T \\\\ 0 & B \\end{bmatrix}$$\n5. We prove that $w = 0$. Let $x = [\\sigma_1, w^T]^T$. Then:\n   $$\\left\\| \\begin{bmatrix} \\sigma_1 & w^T \\\\ 0 & B \\end{bmatrix} \\begin{bmatrix} \\sigma_1 \\\\ w \\end{bmatrix} \\right\\|_2^2 = \\left\\| \\begin{bmatrix} \\sigma_1^2 + w^T w \\\\ B w \\end{bmatrix} \\right\\|_2^2 \\geq (\\sigma_1^2 + \\|w\\|_2^2)^2$$\n6. On the other hand, the matrix norm is invariant under orthogonal transformation:\n   $$\\left\\| U_1^T A V_1 x \\right\\|_2^2 \\leq \\|A\\|_2^2 \\|x\\|_2^2 = \\sigma_1^2 (\\sigma_1^2 + \\|w\\|_2^2)$$\n7. Thus $(\\sigma_1^2 + \\|w\\|_2^2)^2 \\leq \\sigma_1^2 (\\sigma_1^2 + \\|w\\|_2^2) \\implies \\|w\\|_2^2 \\leq 0 \\implies w = 0$.\n8. By induction on the smaller submatrix $B$, we decompose $B = U_2 \\Sigma_2 V_2^T$, yielding the complete SVD: $A = U \\Sigma V^T$.\n\nBest Low-Rank Approximation (Eckart-Young Theorem):\nThe rank-$k$ truncated SVD matrix $A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$ is the mathematically absolute best rank-$k$ approximation of $A$ in the spectral norm, with error:\n$$\\min_{\\text{rank}(B) \\leq k} \\|A - B\\|_2 = \\|A - A_k\\|_2 = \\sigma_{k+1}$$',
        example: 'Let $A = \\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix}$.\n1. Eigenvalues of $A^T A = \\begin{bmatrix} 9 & 0 \\\\ 0 & 4 \\end{bmatrix}$ are $\\lambda_1 = 9, \\lambda_2 = 4$.\n2. Singular values are $\\sigma_1 = \\sqrt{9} = 3, \\sigma_2 = \\sqrt{4} = 2$.\n3. Orthonormal eigenvectors of $A^T A$ are $v_1 = [1, 0]^T, v_2 = [0, 1]^T \\implies V = I$.\n4. Left singular vectors: $u_1 = A v_1 / \\sigma_1 = [3, 0]^T / 3 = [1, 0]^T$. $u_2 = A v_2 / \\sigma_2 = [0, 2]^T / 2 = [0, 1]^T \\implies U = I$.\n5. SVD: $A = I \\begin{bmatrix} 3 & 0 \\\\ 0 & 2 \\end{bmatrix} I^T$.'
      },
      {
        id: 'def-nla-5-3',
        title: 'Spectral Decomposition & SVD–Eigenvalue Relation',
      titleHe: 'הפסאודו-הופכי של מור-פנרוז ופתרון LS באמצעות SVD',
      simplifiedLogic: 'The Moore-Penrose Pseudo-inverse ($A^\\dagger$) generalizes matrix inversion to non-square and singular matrices. Using SVD, it provides the mathematically shortest, minimum-norm least squares solution to overdetermined or underdetermined systems.\n\n**Comparison Map:**\n* **Invertible System ($A^{-1}$):** $A x = b \\implies x^* = A^{-1} b$ (Exact, unique)\n* **Singular/Overdetermined System ($A^\\dagger$):** $A x \\approx b \\implies x^* = A^\\dagger b$ (Minimum-norm least squares)',
      simplifiedLogicHe: 'הפסאודו-הופכי של מור-פנרוז ($A^\\dagger$) מכליל את מושג ההיפוך עבור מטריצות לא ריבועיות או סינגולריות. באמצעות SVD, הוא מספק את פתרון הריבועים המינימליים בעל הנורמה המינימלית הקצר ביותר למערכות יתר או תת-נקבעות.\n\n**מיפוי השוואתי:**\n* **מערכת הפיכה ($A^{-1}$):** $A x = b \\implies x^* = A^{-1} b$ (פתרון מדויק ויחיד)\n* **מערכת סינגולרית/יתר ($A^\\dagger$):** $A x \\approx b \\implies x^* = A^\\dagger b$ (פתרון ריבועים מינימליים בעל נורמה מינימלית)',
      toolboxConnection: 'The Pseudo-inverse is the mathematical base for the Gauss-Newton step in **OPT Chapter 2** when the Jacobian matrix does not have full rank!',
      toolboxConnectionHe: 'הפסאודו-הופכי הוא הבסיס המתמטי לצעד גאוס-ניוטון ב-**OPT פרק 2** כאשר מטריצת היעקוביאן אינה מדרגה מלאה!',
      keyTakeaway: 'The pseudo-inverse guarantees stable least-squares solutions even when matrices are singular or rectangular.',
      keyTakeawayHe: 'הפסאודו-הופכי מבטיח פתרונות ריבועים מינימליים יציבים גם כאשר המטריצות הן סינגולריות או מלבניות.',
        content: '**Spectral Decomposition** (for normal/Hermitian matrices): If $A \\in \\mathbb{C}^{n \\times n}$ is normal ($A^*A = AA^*$), there exists a unitary $U$ such that:\n$$A = U \\Lambda U^*, \\quad \\Lambda = \\text{diag}(\\lambda_1, ..., \\lambda_n)$$\nwhere columns of $U$ are the eigenvectors and $\\Lambda$ holds eigenvalues. If $A$ is Hermitian, all $\\lambda_i \\in \\mathbb{R}$. If real symmetric, all matrices are real.\n\n**SVD–Eigenvalue Relationship**: Applying SVD $A = U\\Sigma V^T$ to $A^T A$:\n$$A^T A = (U\\Sigma V^T)^T(U\\Sigma V^T) = V\\Sigma^T U^T U \\Sigma V^T = V\\Sigma^2 V^T$$\nTherefore $\\sigma_i = \\sqrt{\\lambda_i(A^T A)}$ — the singular values are the square roots of eigenvalues of $A^T A$.',
        proof: 'Proof: SVD–Spectral Decomposition Connection\n\nLet $A = U\\Sigma V^T$ be the full SVD. We compute $A^T A$:\n$$A^T A = (U\\Sigma V^T)^T(U\\Sigma V^T) = V\\Sigma^T U^T \\cdot U\\Sigma V^T$$\nSince $U^T U = I$ (orthogonality):\n$$A^T A = V \\Sigma^T \\Sigma V^T = V \\Sigma^2 V^T$$\nThis has the form of a spectral decomposition! Comparing to the eigendecomposition $A^T A = Q \\Lambda Q^T$:\n- $Q = V$ (columns of $V$ are eigenvectors of $A^T A$)\n- $\\Lambda = \\Sigma^2$ (eigenvalues are $\\sigma_i^2$)\nTherefore $\\sigma_i = \\sqrt{\\lambda_i(A^T A)} \\geq 0$, confirming singular values are always non-negative. $\\square$',
        example: 'Let $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$.\n\n$A^T A = \\begin{bmatrix}1 & 1\\\\1 & 2\\end{bmatrix}$. Eigenvalues: $\\lambda = \\frac{3 \\pm \\sqrt{5}}{2}$, so $\\lambda_1 \\approx 2.618$, $\\lambda_2 \\approx 0.382$.\n\nSingular values: $\\sigma_1 = \\sqrt{2.618} \\approx 1.618$, $\\sigma_2 = \\sqrt{0.382} \\approx 0.618$.\n\nNote: $\\sigma_1 / \\sigma_2 \\approx 2.618 = \\kappa_2(A)$. The condition number equals the ratio of largest to smallest singular values.'
      },
      {
        id: 'def-nla-5-4',
        title: 'Moore-Penrose Pseudo-inverse & LS via SVD',
        content: '**Pseudo-inverse** (Moore-Penrose): For any $A \\in \\mathbb{R}^{m \\times n}$ with SVD $A = U\\Sigma V^T$, define:\n$$A^\\dagger = V \\Sigma^\\dagger U^T, \\quad (\\Sigma^\\dagger)_{ii} = \\begin{cases} 1/\\sigma_i & \\sigma_i \\neq 0 \\\\ 0 & \\sigma_i = 0 \\end{cases}$$\n- Full-rank: $A^\\dagger = (A^T A)^{-1} A^T$ (standard LS solution)\n- Rank-deficient: $\\hat{x} = A^\\dagger b$ gives the **minimum-norm** solution among all LS minimizers.\n\n**Least Squares via SVD**: Substitute $A = U\\Sigma V^T$ into normal equations. With $\\hat{y} = V^T \\hat{x}$:\n$$\\Sigma^T \\Sigma \\hat{y} = \\Sigma^T U^T b \\implies \\Sigma \\hat{y} = U^T b \\implies \\hat{x} = V\\hat{y}$$\nThis reduces LS to a diagonal system — the most numerically stable approach.',
        proof: 'Proof: SVD Least Squares Derivation\n\nGiven $A = U\\Sigma V^T$ (economic SVD, $U \\in \\mathbb{R}^{m \\times n}$, $V \\in \\mathbb{R}^{n \\times n}$). Normal equations: $A^T A \\hat{x} = A^T b$.\n\nSubstitute SVD:\n$$V\\Sigma^T U^T \\cdot U\\Sigma V^T \\hat{x} = V\\Sigma^T U^T b$$\n$$V \\Sigma^2 V^T \\hat{x} = V\\Sigma^T U^T b$$\nMultiply left by $V^T$ (orthogonal):\n$$\\Sigma^2 V^T \\hat{x} = \\Sigma^T U^T b$$\nLet $\\hat{y} = V^T \\hat{x}$ and since $\\Sigma^2 = \\Sigma^T \\Sigma$ for diagonal $\\Sigma$:\n$$\\Sigma \\hat{y} = U^T b$$\nThis diagonal system gives $\\hat{y}_i = (U^T b)_i / \\sigma_i$ when $\\sigma_i \\neq 0$. Finally $\\hat{x} = V\\hat{y} = V\\Sigma^\\dagger U^T b = A^\\dagger b$. $\\square$',
        example: 'Solve $\\min \\|Ax - b\\|_2$ with $A = \\begin{bmatrix} -1 & -1 \\\\ 1 & 3 \\\\ -1 & -1 \\\\ 1 & 3 \\end{bmatrix}$, $b = [-1, 23, 15, 39]^T$.\n\nUsing SVD: $U, \\Sigma, V$ computed, then:\n1. $\\hat{b} = U^T b \\approx [46.96, 8.43, -0.31]^T$\n2. $\\hat{y} = \\hat{b} / \\sigma \\approx [4.88, 2.15, -0.73]^T$\n3. $\\hat{x} = V\\hat{y} = [2, 3, 4]^T$ ✓\n\nAll three approaches (Normal Equations, QR, SVD) give the same answer $[2, 3, 4]^T$, but SVD is most numerically stable.'
      }
    ],
    quiz: [

      {
        question: 'According to the Eckart-Young Theorem, what is the spectral norm error when approximating A with its optimal rank-k SVD truncated matrix A_k?',
        options: [
          'The sum of all singular values.',
          'Exactly the (k+1)-th singular value, σ_{k+1}.',
          'Zero.',
          'The condition number of A.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The Eckart-Young theorem proves that the minimum spectral norm difference between A and any rank-k matrix is exactly the first omitted singular value σ_{k+1}.'
      },
      {
        question: 'Why is solving a least squares problem using the QR decomposition considered numerically superior to solving it via the Normal Equations?',
        options: [
          'It takes more iterations to converge.',
          'It avoids forming A^T A, which squares the condition number, thus preserving numerical precision.',
          'It forces the solution to be zero.',
          'It only works if the matrix is symmetric.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Forming A^T A numerically squares the condition number, making an ill-conditioned system even worse. QR decomposition solves the system directly using orthogonal transformations, keeping the conditioning stable.'
      }
    ]
  },
  {
    id: 'nla-6',
    courseId: 'nla',
    chapterNumber: '6',
    title: 'Iterative Methods for Linear Systems',
    intro: 'This chapter covers algorithms that solve linear systems iteratively. We start with stationary splittings (Jacobi, Gauss-Seidel), establish rigorous convergence bounds using spectral radius, explore Successive Over-Relaxation (SOR) with Kahan\'s theorem, and study the Steepest Descent method from a quadratic optimization perspective.',
    motivation: 'For sparse systems containing millions of variables, direct factorizations require far too much memory and time. Iterative methods generate highly accurate approximations using only matrix-vector multiplications, completing solves in seconds rather than hours.',
    definitions: [
      {
        id: 'def-nla-6-1',
        title: 'Jacobi & Gauss-Seidel Splittings',
        content: 'We split $A = D - L - U$, where $D$ is diagonal, $-L$ is strictly lower triangular, and $-U$ is strictly upper triangular.\n1. Jacobi Method: Computes coordinates independently:\n   $$D x^{(k+1)} = (L + U) x^{(k)} + b \\implies x^{(k+1)} = D^{-1}(L + U)x^{(k)} + D^{-1}b$$\n2. Gauss-Seidel: Uses newly updated values immediately:\n   $$(D - L) x^{(k+1)} = U x^{(k)} + b \\implies x^{(k+1)} = (D - L)^{-1} U x^{(k)} + (D - L)^{-1} b$$',
        proof: 'Proof: Theorem on Convergence via Spectral Radius & Diagonal Dominance\nTheorem: An iteration of the form $x^{(k+1)} = T x^{(k)} + c$ converges for any initial vector iff the spectral radius of $T$ satisfies $\\rho(T) < 1$.\n\nProof Sketch:\n1. Define the error at step $k$: $e^{(k)} = x^{(k)} - x^*$.\n2. Subtract the fixed-point equation $x^* = T x^* + c$ from the iteration:\n   $$x^{(k+1)} - x^* = T(x^{(k)} - x^*) \\implies e^{(k+1)} = T e^{(k)}$$\n3. By induction, $e^{(k)} = T^k e^{(0)}$.\n4. From linear algebra, $\\lim_{k \\to \\infty} T^k = 0 \\iff \\rho(T) < 1$. Thus, the error decays to zero iff all eigenvalues of $T$ are strictly less than 1 in magnitude.\n\nTheorem: Jacobi converges under Strict Diagonal Dominance (SDD).\n1. SDD means $|a_{ii}| > \\sum_{j \\neq i} |a_{ij}|$ for all $i$.\n2. The Jacobi iteration matrix is $T_J = D^{-1}(L + U)$. Its row-sum norm is:\n   $$\\|T_J\\|_\\infty = \\max_i \\sum_{j \\neq i} \\left| \\frac{a_{ij}}{a_{ii}} \\right| < 1 \\quad (\\text{by SDD})$$\n3. Since $\\rho(T_J) \\leq \\|T_J\\|_\\infty$, we have $\\rho(T_J) < 1$, guaranteeing convergence.',
        example: 'Solve $\\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 5 \\end{bmatrix}$ starting from $x^{(0)} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}^T$.\n- Jacobi: $x_1^{(k+1)} = \\frac{5 - x_2^{(k)}}{3}$, $x_2^{(k+1)} = \\frac{5 - x_1^{(k)}}{3}$\n  - Step 1: $x_1^{(1)} = 1.67, x_2^{(1)} = 1.67$\n  - Step 2: $x_1^{(2)} = \\frac{5-1.67}{3} = 1.11, x_2^{(2)} = 1.11$\n- Gauss-Seidel: $x_1^{(k+1)} = \\frac{5 - x_2^{(k)}}{3}$, $x_2^{(k+1)} = \\frac{5 - x_1^{(k+1)}}{3}$\n  - Step 1: $x_1^{(1)} = 1.67$. Immediately use it: $x_2^{(1)} = \\frac{5 - 1.67}{3} = 1.11$.\n  - Step 2: $x_1^{(2)} = \\frac{5 - 1.11}{3} = 1.30$. $x_2^{(2)} = \\frac{5 - 1.30}{3} = 1.23$.\n  Gauss-Seidel converges much faster to the true solution $[1.25, 1.25]^T$!'
      },
      {
        id: 'def-nla-6-2',
        title: 'SOR & Kahan\'s Convergence Bounds',
        content: 'Successive Over-Relaxation (SOR) accelerates Gauss-Seidel by weighting updates with relaxation parameter $\\omega \\in (0, 2)$:\n$$(D - \\omega L) x^{(k+1)} = ((1 - \\omega)D + \\omega U) x^{(k)} + \\omega b$$\n- Ostrowski-Reich: If $A$ is SPD, SOR converges for any initial guess iff $0 < \\omega < 2$.',
        proof: 'Proof: Theorem on Kahan\'s SOR Convergence Bound\nTheorem: For the SOR method to converge, we must have $0 < \\omega < 2$.\n\nProof:\n1. The SOR iteration matrix is $T_\\omega = (D - \\omega L)^{-1} ((1 - \\omega)D + \\omega U)$.\n2. The determinant of a product is the product of determinants. Since $L$ and $U$ are strictly lower/upper triangular, $(D - \\omega L)$ and $((1-\\omega)D + \\omega U)$ are triangular:\n   $$\\det(D - \\omega L) = \\det(D)$$\n   $$\\det((1 - \\omega)D + \\omega U) = (1 - \\omega)^n \\det(D)$$\n3. Thus:\n   $$\\det(T_\\omega) = \\frac{(1 - \\omega)^n \\det(D)}{\\det(D)} = (1 - \\omega)^n$$\n4. The determinant is also the product of all eigenvalues $\\lambda_i$ of $T_\\omega$:\n   $$\\prod_{i=1}^n \\lambda_i = (1 - \\omega)^n \\implies \\prod_{i=1}^n |\\lambda_i| = |1 - \\omega|^n$$\n5. For the spectral radius $\\rho(T_\\omega) = \\max |\\lambda_i| < 1$ (convergence), the product of the magnitudes must be strictly less than 1:\n   $$|1 - \\omega|^n < 1 \\implies |1 - \\omega| < 1 \\implies 0 < \\omega < 2$$\n   This proves that convergence is mathematically impossible outside of this range!',
        example: 'In a sparse matrix with Jacobi spectral radius $\\rho(T_J) = 0.995$:\n1. The optimal SOR parameter is:\n   $$\\omega_{opt} = \\frac{2}{1 + \\sqrt{1 - 0.995^2}} \\approx 1.82$$\n2. The iteration spectral radius drops from $0.995$ to $\\rho(T_{opt}) = \\omega_{opt} - 1 \\approx 0.82$.\n3. To reduce error by $10^{-4}$, Gauss-Seidel requires over 1000 iterations, while optimal SOR requires only 45!'
      },
      {
        id: 'def-nla-6-3',
        title: 'Variational GS & Steepest Descent (SD)',
        content: 'If $A \\in \\mathbb{R}^{n \\times n}$ is Symmetric Positive Definite, solving $Ax=b$ is equivalent to minimizing the quadratic function:\n$$f(x) = \\frac{1}{2} x^T A x - b^T x$$\n1. Variational GS: Minimizing $f(x)$ sequentially coordinate by coordinate yields exactly the Gauss-Seidel iteration.\n2. Steepest Descent: Minimizes along the negative gradient search direction:\n   $$d^{(k)} = r^{(k)} = b - A x^{(k)} \\implies x^{(k+1)} = x^{(k)} + \\alpha^{(k)} d^{(k)}$$',
        proof: 'Proof: Theorem on Steepest Descent Optimal Step Size\nWe prove the optimal step size $\\alpha^{(k)}$ that minimizes the quadratic function $f(x^{(k)} + \\alpha d^{(k)})$ along the descent direction.\n\n1. Let $\\phi(\\alpha) = f(x^{(k)} + \\alpha d^{(k)}) = \\frac{1}{2} (x^{(k)} + \\alpha d^{(k)})^T A (x^{(k)} + \\alpha d^{(k)}) - b^T (x^{(k)} + \\alpha d^{(k)})$.\n2. Differentiate with respect to the scalar $\\alpha$:\n   $$\\phi\'(\\alpha) = (d^{(k)})^T A (x^{(k)} + \\alpha d^{(k)}) - b^T d^{(k)} = \\alpha (d^{(k)})^T A d^{(k)} - (d^{(k)})^T (b - A x^{(k)})$$\n3. Note that the residual $r^{(k)} = b - A x^{(k)}$. Thus:\n   $$\\phi\'(\\alpha) = \\alpha (d^{(k)})^T A d^{(k)} - (d^{(k)})^T r^{(k)}$$\n4. Set the derivative to zero for optimality:\n   $$\\alpha^{(k)} = \\frac{(d^{(k)})^T r^{(k)}}{(d^{(k)})^T A d^{(k)}}$$\n5. Since in standard Steepest Descent, the direction $d^{(k)} = r^{(k)}$, we get the classical optimal step size formula:\n   $$\\alpha^{(k)} = \\frac{(r^{(k)})^T r^{(k)}}{(r^{(k)})^T A r^{(k)}}$$\n   This mathematically guarantees the maximum possible decrease in the objective at each step.',
        example: 'Solve $f(x) = \\frac{1}{2} x^T \\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix} x - \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix}^T x$ starting at $x^{(0)} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}$.\n1. Residual $r^{(0)} = b - A x^{(0)} = \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix}$. Search direction $d^{(0)} = \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix}$.\n2. Compute $A d^{(0)} = \\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 16 \\end{bmatrix}$.\n3. Compute optimal step size $\\alpha^{(0)}$:\n   $$\\alpha^{(0)} = \\frac{r^T r}{d^T A d} = \\frac{2^2 + 4^2}{2(4) + 4(16)} = \\frac{20}{8 + 64} = \\frac{20}{72} \\approx 0.278$$\n4. Update: $x^{(1)} = x^{(0)} + \\alpha^{(0)} d^{(0)} \\approx \\begin{bmatrix} 0.556 \\\\ 1.111 \\end{bmatrix}^T$.'
      },
      {
        id: 'def-nla-6-4',
        title: 'Error vs Residual & General Iterative Convergence',
        content: 'In iterative solvers, we define two critical vector quantities at step $k$:\n1. **Error Vector**: $e^{(k)} = x^* - x^{(k)}$ where $x^*$ is the exact solution. This is generally uncomputable since $x^*$ is unknown.\n2. **Residual Vector**: $r^{(k)} = b - A x^{(k)} = A e^{(k)}$ which is easily computed at each step.\n\n**General Preconditioned Iteration Framework**: Most iterative methods can be expressed as:\n$$x^{(k+1)} = x^{(k)} + M^{-1}(b - A x^{(k)})$$\nwhere $M$ is a preconditioner (approximation of $A$ that is cheap to invert). The error propagation is governed by:\n$$e^{(k+1)} = (I - M^{-1}A)e^{(k)}$$\nAsymptotic convergence is guaranteed iff the spectral radius of the iteration matrix $\\rho(I - M^{-1}A) < 1$.',
        proof: 'Proof: Convergence Rate Theorem\n\nSubtract the fixed-point iteration $x^* = x^* + M^{-1}(b - Ax^*)$ from the general iteration:\n$$x^{(k+1)} - x^* = (x^{(k)} - x^*) - M^{-1}A(x^{(k)} - x^*)$$\n$$-e^{(k+1)} = -e^{(k)} + M^{-1}A e^{(k)} \\implies e^{(k+1)} = (I - M^{-1}A) e^{(k)}$$\nBy induction:\n$$e^{(k)} = (I - M^{-1}A)^k e^{(0)}$$\nFrom linear algebra, for any vector $e^{(0)}$, $\\lim_{k \\to \\infty} e^{(k)} = 0$ if and only if the spectral radius of the transition matrix satisfies $\\rho(I - M^{-1}A) < 1$. The asymptotic rate of convergence is governed by $- \\log_{10}(\\rho(I - M^{-1}A))$. $\\square$',
        example: 'For a 1D system $2x = 4$ ($A=[2]$) with starting point $x^{(0)}=0$ and preconditioner $M=[3]$:\n- Transition value: $T = I - M^{-1}A = 1 - 2/3 = 1/3$.\n- Spectral radius is $\\rho(T) = 1/3 < 1$, guaranteeing convergence.\n- Step 1: $x^{(1)} = 0 + \\frac{1}{3}(4 - 0) = 4/3 \\approx 1.33$. Error: $e^{(1)} = 2 - 1.33 = 0.67$.\n- Step 2: $x^{(2)} = \\frac{4}{3} + \\frac{1}{3}(4 - \\frac{8}{3}) = \\frac{4}{3} + \\frac{4}{9} = \\frac{16}{9} \\approx 1.78$. Error: $e^{(2)} = 2 - 1.78 = 0.22$.\nObserve that the error at each step decreases exactly by a factor of $1/3$, as predicted!'
      },
      {
        id: 'def-nla-6-5',
        title: 'Steepest Descent Zigzagging & Conjugate Gradients',
        content: '**Zigzag Effect in Steepest Descent**: In Steepest Descent, consecutive search directions are mathematically orthogonal:\n$$\\langle d^{(k+1)}, d^{(k)} \\rangle = 0$$\nIn poorly conditioned narrow valleys (high $\\kappa(A)$), this causes the solver to make extremely slow, zigzagging progress, wasting hundreds of iterations.\n\n**Conjugate Gradient (CG) Method**: Resolves the zigzagging by choosing search directions $p^{(k)}$ that are $A$-conjugate (orthogonal in the energy inner product):\n$$\\langle p^{(j)}, A p^{(i)} \\rangle = 0 \\quad \\forall i \\neq j$$\n**CG Convergence Bound**: In the energy M-norm induced by $A$, the error decreases as:\n$$\\|e^{(k)}\\|_A \\leq 2 \\left( \\frac{\\sqrt{\\kappa(A)} - 1}{\\sqrt{\\kappa(A)} + 1} \\right)^k \\|e^{(0)}\\|_A$$\nThis is dramatically faster than SD, which relies on the unsquarerooted condition number.',
        proof: 'Proof: Orthogonality of SD Search Directions\n\nIn Steepest Descent, the search direction is the residual: $d^{(k)} = r^{(k)} = b - Ax^{(k)}$. The update is $x^{(k+1)} = x^{(k)} + \\alpha^{(k)} r^{(k)}$, where $\\alpha^{(k)}$ minimizes $f(x^{(k)} + \\alpha r^{(k)})$.\n\nLet $\\phi(\\alpha) = f(x^{(k)} + \\alpha r^{(k)})$. At the minimum, the derivative is zero:\n$$\\frac{d}{d\\alpha} f(x^{(k)} + \\alpha r^{(k)}) = \\nabla f(x^{(k+1)})^T r^{(k)} = -(r^{(k+1)})^T r^{(k)} = 0$$\nSince the next search direction is $d^{(k+1)} = r^{(k+1)}$, this proves:\n$$\\langle d^{(k+1)}, d^{(k)} \\rangle = (r^{(k+1)})^T r^{(k)} = 0 \\quad \\square$$',
        example: 'Let $A = \\begin{bmatrix} 10 & 0 \\\\ 0 & 1 \\end{bmatrix}$ (ill-conditioned, $\\kappa(A) = 10$).\n- Steepest Descent convergence rate: $\\rho \\approx \\frac{10-1}{10+1} = \\frac{9}{11} \\approx 0.82$ (slow convergence).\n- Conjugate Gradient convergence rate: $\\rho_{CG} \\approx \\frac{\\sqrt{10}-1}{\\sqrt{10}+1} = \\frac{3.16-1}{3.16+1} = \\frac{2.16}{4.16} \\approx 0.52$ (much faster convergence!).\nFurthermore, CG is guaranteed to converge to the exact solution in at most 2 iterations (since the dimension $n=2$), whereas SD takes over 50 iterations to reach comparable accuracy.'
      }
    ],

    quiz: [
      {
        question: 'According to Kahan\'s Theorem, which range of the relaxation parameter ω makes SOR convergence mathematically possible?',
        options: [
          'ω > 1',
          '0 < ω < 2',
          '-1 < ω < 1',
          'Any real number.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Kahan\'s theorem proves that the product of the SOR eigenvalues is (1-ω)^n. For all eigenvalues to be under 1, we must have |1-ω| < 1, which restricts ω strictly to (0, 2).'
      },
      {
        question: 'How is the optimal step size α^(k) computed in the quadratic Steepest Descent algorithm?',
        options: [
          'By setting α to a constant value like 0.01.',
          'Using the Rayleigh-quotient styled formula α = (r^T r) / (r^T A r), which exactly minimizes the objective along the search direction.',
          'By dividing the iteration count by 10.',
          'Using the largest singular value of the matrix.'
        ],
        correctAnswerIndex: 1,
        explanation: 'This formula is derived analytically by setting the 1-D derivative along the line of search to zero, guaranteeing optimal local energy reduction.'
      }
    ]
  },

  // ==========================================
  //                OPT CHAPTERS
  // ==========================================
  {
    id: 'opt-1',
    courseId: 'opt',
    chapterNumber: '1',
    title: 'Background & Convexity',
    intro: 'Mathematical optimization consists of finding a point $x^*$ that minimizes or maximizes an objective function $f(x)$. This chapter covers multivariate Taylor expansions, derivatives of vectors and matrices (gradients, Hessians, Jacobians), and the foundational mathematics of convex sets and convex functions.',
    motivation: 'Convex optimization is the absolute "gold standard" in numerical modeling. If a problem is convex, we are mathematically guaranteed that any local minimum is the absolute global minimum, allowing us to find the best possible solution without getting trapped in local valley traps.',
    definitions: [
      {
        id: 'def-opt-1-1',
        title: 'Taylor Expansions & Derivatives',
      titleHe: 'פיתוחי טיילור ונגזרות רב-ממדיות',
      simplifiedLogic: 'Multi-dimensional Taylor expansions model complex non-linear functions locally using linear slopes (Gradient vector $\\nabla f$) and second-order curvatures (Hessian matrix $\\nabla^2 f$).\n\n**Linear vs. Quadratic Modeling:**\n* **1st-Order Taylor:** $f(x + \\epsilon) \\approx f(x) + \\nabla f^T \\epsilon$ (Flat plane approximation)\n* **2nd-Order Taylor:** $f(x + \\epsilon) \\approx f(x) + \\nabla f^T \\epsilon + \\frac{1}{2} \\epsilon^T H \\epsilon$ (Quadratic bowl/saddle approximation)',
      simplifiedLogicHe: 'פיתוחי טיילור רב-ממדיים ממדלים פונקציות לא-ליניאריות מורכבות באופן מקומי על ידי שימוש בשיפועים ליניאריים (וקטור הגרדיאנט $\\nabla f$) ועקמומיות מסדר שני (מטריצת ההסיאן $\\nabla^2 f$).\n\n**מידול ליניארי מול ריבועי:**\n* **טיילור מסדר ראשון:** $f(x + \\epsilon) \\approx f(x) + \\nabla f^T \\epsilon$ (קירוב של מישור שטוח)\n* **טיילור מסדר שני:** $f(x + \\epsilon) \\approx f(x) + \\nabla f^T \\epsilon + \\frac{1}{2} \\epsilon^T H \\epsilon$ (קירוב קערה ריבועית או אוכף)',
      toolboxConnection: 'The Hessian matrix $H$ must be Symmetric Positive Definite (SPD) for its eigenvalues to represent positive curvature, directly linking back to energy norms in **NLA Chapter 1**!',
      toolboxConnectionHe: 'מטריצת ההסיאן $H$ חייבת להיות סימטרית וחיובית לחלוטין (SPD) כדי שערכיה העצמיים ייצגו עקמומיות חיובית, מה שקושר אותה ישירות לנורמות אנרגיה ב-**NLA פרק 1**!',
      keyTakeaway: 'Taylor expansions locally linearize or quadratize complex landscapes, providing the maps that optimization solvers navigate.',
      keyTakeawayHe: 'פיתוחי טיילור מציגים קירוב ליניארי או ריבועי מקומי של פונקציות מורכבות, ומספקים את המפות שבהן פותרי אופטימיזציה ניווטים.',
        content: '1. Multivariate Taylor Expansion: A twice continuously differentiable function $f: \\mathbb{R}^n \\to \\mathbb{R}$ can be modeled locally around $x$ as:\n   $$f(x + \\epsilon) = f(x) + \\langle \\nabla f(x), \\epsilon \\rangle + \\frac{1}{2} \\langle \\epsilon, \\nabla^2 f(x) \\epsilon \\rangle + O(\\|\\epsilon\\|^3)$$\n   where $\\nabla f(x) \\in \\mathbb{R}^n$ is the gradient vector, and $\\nabla^2 f(x) = H \\in \\mathbb{R}^{n \\times n}$ is the symmetric Hessian matrix containing second-order partial derivatives:\n   $$H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$$\n2. Jacobian Matrix: For a vector-valued function $f: \\mathbb{R}^n \\to \\mathbb{R}^m$, the Jacobian matrix $J \\in \\mathbb{R}^{m \\times n}$ contains the row gradients of each coordinate function:\n   $$J_{ij} = \\frac{\\partial f_i}{\\partial x_j} \\implies f(x + \\epsilon) - f(x) \\approx J \\epsilon$$',
        proof: 'Proof: Jacobian of standard functions\n1. Let $f(x) = Ax$ for $A \\in \\mathbb{R}^{m \\times n}$ and $x \\in \\mathbb{R}^n$.\n   - Expand the perturbation:\n     $$\\delta f = f(x + \\epsilon) - f(x) = A(x + \\epsilon) - Ax = A \\epsilon$$\n   - Since $\\delta f = J \\epsilon$, it is clear that the Jacobian of $Ax$ is exactly $J = A$.\n2. Let $f(x) = \\phi(x)$, where $\\phi$ is a scalar function applied element-wise to the vector $x$, so $f_i(x) = \\phi(x_i)$.\n   - The Taylor expansion of each component is:\n     $$f_i(x_i + \\epsilon_i) - f_i(x_i) \\approx \\phi\'(x_i) \\epsilon_i$$\n   - Gathering this into vector form:\n     $$\\delta f \\approx \\text{diag}(\\phi\'(x)) \\epsilon$$\n   - Thus, the Jacobian of element-wise function application is a diagonal matrix $J = \\text{diag}(\\phi\'(x))$, where $J_{ii} = \\phi\'(x_i)$.',
        example: 'Let $f(x, y) = x^2 + 3xy$. Find the gradient and Hessian at $(1, 2)$.\n1. Gradient vector:\n   $$\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{bmatrix} = \\begin{bmatrix} 2x + 3y \\\\ 3x \\end{bmatrix} \\implies \\nabla f(1, 2) = \\begin{bmatrix} 2(1) + 3(2) \\\\ 3(1) \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 3 \\end{bmatrix}$$\n2. Hessian matrix:\n   $$\\nabla^2 f = \\begin{bmatrix} \\frac{\\partial^2 f}{\\partial x^2} & \\frac{\\partial^2 f}{\\partial x \\partial y} \\\\ \\frac{\\partial^2 f}{\\partial y \\partial x} & \\frac{\\partial^2 f}{\\partial y^2} \\end{bmatrix} = \\begin{bmatrix} 2 & 3 \\\\ 3 & 0 \\end{bmatrix}$$\nThe Hessian is constant across all points, with determinant $\\det(H) = 0 - 9 = -9 < 0$, showing this is a saddle point.'
      },
      {
        id: 'def-opt-1-2',
        title: 'Convex Sets & Functions',
      titleHe: 'קבוצות ופונקציות קמורות',
      simplifiedLogic: 'Convexity is the absolute "gold standard" in numerical modeling. In a convex set, the straight line between any two points lies entirely inside. In a convex function, the curve bends upwards everywhere, guaranteeing that any local minimum is mathematically the absolute global minimum.\n\n**Visual Geometry Map:**\n* **Convex Function:** $\\theta f(x) + (1-\\theta)f(y) \\geq f(\\theta x + (1-\\theta)y)$ (Secant line lies above the function curve)\n* **Convex Hessian:** $\\nabla^2 f(x) \\succeq 0$ (Curvature is non-negative in all directions)',
      simplifiedLogicHe: 'קמירות היא "תקן הזהב" באופטימיזציה נומרית. בקבוצה קמורה, הקו הישר בין כל שתי נקודות נמצא כולו בתוך הקבוצה. בפונקציה קמורה, העקומה מתעגלת כלפי מעלה בכל כיוון, מה שמבטיח מתמטית שכל מינימום מקומי הוא המינימום הגלובלי המוחלט.\n\n**מיפוי גיאומטרי:**\n* **פונקציה קמורה:** $\\theta f(x) + (1-\\theta)f(y) \\geq f(\\theta x + (1-\\theta)y)$ (מיתר המחבר שתי נקודות נמצא מעל העקומה)\n* **הסיאן קמור:** $\\nabla^2 f(x) \\succeq 0$ (העקמומיות אינה שלילית בכל הכיוונים)',
      toolboxConnection: 'Proving that a matrix is positive semi-definite ($\\nabla^2 f \\succeq 0$) relies on eigenvalue verification tests learned in **NLA Chapter 5**!',
      toolboxConnectionHe: 'הוכחה שמטריצה היא חיובית חצי-לחלוטין ($\\nabla^2 f \\succeq 0$) מבוססת על בדיקות אימות של ערכים עצמיים שנלמדו ב-**NLA פרק 5**!',
      keyTakeaway: 'Convexity guarantees that optimization solvers will not get trapped in suboptimal local valleys.',
      keyTakeawayHe: 'קמירות מבטיחה שפותרי אופטימיזציה לא יילכדו בעמקים מקומיים שאינם אופטימליים.',
        content: '1. Convex Set: A set $C \\subseteq \\mathbb{R}^n$ is convex if for any $x, y \\in C$ and $\\theta \\in [0, 1]$:\n   $$\\theta x + (1 - \\theta) y \\in C$$\n2. Convex Function: A function $f: C \\to \\mathbb{R}$ on a convex set $C$ is convex if for all $x, y \\in C$ and $\\theta \\in [0, 1]$:\n   $$f(\\theta x + (1 - \\theta) y) \\leq \\theta f(x) + (1 - \\theta) f(y)$$\n\nAlternative definitions for twice differentiable functions:\n- First-Order: $f(x_1) \\geq f(x_2) + \\langle \\nabla f(x_2), x_1 - x_2 \\rangle$\n- Second-Order: The Hessian $\\nabla^2 f(x) \\succeq 0$ (positive semi-definite) for all $x$.',
        proof: 'Proof: Theorem on Local Minima of Convex Functions\nTheorem: If $f$ is a convex function over a convex region $C$, any local minimizer $x^*$ is a global minimizer of $f$.\n\nProof by Contradiction:\n1. Suppose $x^*$ is a local minimizer but NOT a global minimizer. Then there exists some point $y \\in C$ such that $f(y) < f(x^*)$.\n2. Since $C$ is convex, the line segment $z(\\theta) = \\theta y + (1 - \\theta) x^*$ must lie in $C$ for all $\\theta \\in [0, 1]$.\n3. Since $f$ is convex, we evaluate $f(z(\\theta))$:\n   $$f(z(\\theta)) = f(\\theta y + (1 - \\theta) x^*) \\leq \\theta f(y) + (1 - \\theta) f(x^*)$$\n4. Substitute our assumption $f(y) < f(x^*)$ into this inequality:\n   $$f(z(\\theta)) < \\theta f(x^*) + (1 - \\theta) f(x^*) = f(x^*)$$\n   So, $f(z(\\theta)) < f(x^*)$ for all $\\theta > 0$.\n5. As $\\theta \\to 0$, $z(\\theta) = \\theta y + (1 - \\theta) x^* \\to x^*$.\n6. This means in any arbitrarily small neighborhood around $x^*$, we can find a point $z(\\theta)$ with a strictly smaller function value than $f(x^*)$.\n7. This directly contradicts the assumption that $x^*$ is a local minimum. Therefore, $x^*$ must be a global minimizer.',
        example: 'Prove that $f(x) = x^2$ is convex over $\\mathbb{R}$ using the second-order definition.\n1. Find the second derivative: $f\'(x) = 2x \\implies f\'\'(x) = 2$.\n2. Since $f\'\'(x) = 2 > 0$ for all $x \\in \\mathbb{R}$, the Hessian is strictly positive definite everywhere.\n3. By the second-order condition, $f(x) = x^2$ is mathematically convex.'
      },
      {
        id: 'def-opt-1-3',
        title: 'Optimality Conditions & Strongly Convex Functions',
      titleHe: 'תנאי אופטימליות ופונקציות קמורות חזק',
      simplifiedLogic: 'How do we mathematically verify if a point is a local minimum? We use three conditions:\n1. **FONC (First-Order Necessary):** Gradient must be zero (flat slope).\n2. **SONC (Second-Order Necessary):** Hessian must be Positive Semi-Definite (non-negative curvature).\n3. **SOSC (Second-Order Sufficient):** Gradient is zero AND Hessian is Positive Definite (strict positive bowl).\n\n**Strong convexity** provides a strict lower bound on curvature, guaranteeing extremely stable convergence rates for iterative algorithms.',
      simplifiedLogicHe: 'כיצד אנו מוודאים מתמטית שנקודה היא מינימום מקומי? אנו משתמשים בשלושה תנאים:\n1. **FONC (תנאי הכרחי מסדר ראשון):** הגרדיאנט חייב להיות אפס (שיפוע שטוח).\n2. **SONC (תנאי הכרחי מסדר שני):** ההסיאן חייב להיות חיובי חצי-לחלוטין (עקמומיות לא שלילית).\n3. **SOSC (תנאי מספיק מסדר שני):** הגרדיאנט הוא אפס וההסיאן הוא חיובי לחלוטין (קערה בעלת עקמומיות חיובית קשיחה).\n\n**קמירות חזקה** מספקת חסם תחתון קשיח לעקמומיות, ובכך מבטיחה קצב התכנסות יציב ומהיר במיוחד עבור אלגוריתמים איטרטיביים.',
      toolboxConnection: 'The quadratic form boundary in strongly convex functions is identical to the energy norm metric in **NLA Chapter 1**!',
      toolboxConnectionHe: 'חסם התבנית הריבועית בפונקציות קמורות חזק זהה לחלוטין למדד נורמת האנרגיה שנלמד ב-**NLA פרק 1**!',
      keyTakeaway: 'SOSC mathematically guarantees a local minimum by verifying a flat slope inside a strictly upward-curving bowl.',
      keyTakeawayHe: 'תנאי SOSC מבטיח מתמטית מינימום מקומי על ידי אימות שיפוע שטוח בתוך קערה המתעגלת כלפי מעלה.',
        content: '**Optimality Conditions for Unconstrained Minimization**:\nLet $f: \\mathbb{R}^n \\to \\mathbb{R}$ be smooth.\n1. **First-Order Necessary Condition (FONC)**: If $x^*$ is a local minimizer of $f$, then the gradient must vanish:\n   $$\\nabla f(x^*) = 0$$\n2. **Second-Order Necessary Condition (SONC)**: If $x^*$ is a local minimizer of $f$, then the Hessian must be positive semi-definite:\n   $$\\nabla^2 f(x^*) \\succeq 0$$\n3. **Second-Order Sufficient Condition (SOSC)**: If $\\nabla f(x^*) = 0$ and the Hessian is strictly positive definite:\n   $$\\nabla^2 f(x^*) \\succ 0$$\n   then $x^*$ is a strict local minimizer of $f$.\n\n**Strongly Convex Functions**: A function $f$ is $\\mu$-strongly convex ($\\mu > 0$) if it has curvature bounded below by a quadratic:\n$$f(y) \\geq f(x) + \\langle \\nabla f(x), y - x \\rangle + \\frac{\\mu}{2} \\|y - x\\|_2^2$$\n**Descent Direction**: A search direction $d$ is a descent direction if it makes an acute angle with the negative gradient:\n$$\\langle \\nabla f(x), d \\rangle < 0$$',
        proof: 'Proof: Theorem on SOSC (Second-Order Sufficient Condition)\n\nLet $\\nabla f(x^*) = 0$ and $\\nabla^2 f(x^*) = H \\succ 0$. Since $H$ is positive definite, its smallest eigenvalue $\\lambda_{\\min} > 0$. For any direction $d \\neq 0$:\n$$d^T H d \\geq \\lambda_{\\min} \\|d\\|_2^2$$\nUsing the second-order Taylor expansion around $x^*$ for small $\\epsilon$:\n$$f(x^* + \\epsilon) = f(x^*) + \\langle \\nabla f(x^*), \\epsilon \\rangle + \\frac{1}{2} \\langle \\epsilon, \\nabla^2 f(x^*) \\epsilon \\rangle + o(\\|\\epsilon\\|_2^2)$$\nSince $\\nabla f(x^*) = 0$:\n$$f(x^* + \\epsilon) - f(x^*) = \\frac{1}{2} \\epsilon^T H \\epsilon + o(\\|\\epsilon\\|_2^2) \\geq \\frac{\\lambda_{\\min}}{2} \\|\\epsilon\\|_2^2 + o(\\|\\epsilon\\|_2^2)$$\nFor sufficiently small $\\|\\epsilon\\|_2$, the quadratic term dominates the higher-order terms, so:\n$$f(x^* + \\epsilon) - f(x^*) > 0 \\implies f(x^* + \\epsilon) > f(x^*)$$\nwhich proves $x^*$ is a strict local minimizer! $\\square$',
        example: 'Let $f(x, y) = x^2 + 2y^2$. Find all stationary points and verify if they are minimizers.\n1. Gradient: $\\nabla f = [2x, 4y]^T$. Set to 0: $2x = 0, 4y = 0 \\implies (x^*, y^*) = (0, 0)$ is the unique stationary point.\n2. Hessian: $\\nabla^2 f = \\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix}$.\n3. Since the Hessian is diagonal with positive eigenvalues (2 and 4), it is strictly positive definite ($H \\succ 0$) everywhere.\n4. By the Second-Order Sufficient Condition, $(0,0)$ is a strict local minimizer (and since $f$ is convex, it is the global minimizer).'
      }
    ],

    quiz: [
      {
        question: 'Which of the following defines a convex set?',
        options: [
          'A set that contains only positive numbers.',
          'A set where the line segment connecting any two points in the set lies entirely within the set.',
          'A set that contains its boundary.',
          'A set shaped like a perfect circle.'
        ],
        correctAnswerIndex: 1,
        explanation: 'By definition, a set is convex if for any two points in the set, every point on the straight line segment between them is also in the set.'
      },
      {
        question: 'If a function is twice continuously differentiable, how can we mathematically prove that it is convex?',
        options: [
          'By showing that the gradient is always positive.',
          'By proving that the Hessian matrix is Positive Semi-Definite (∇^2 f(x) ⪰ 0) for all points in its domain.',
          'By showing that the function has no local minimum.',
          'By showing that the function is linear.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The second-order convexity condition states that a twice-differentiable function is convex if and only if its Hessian matrix is positive semi-definite everywhere, representing non-negative curvature.'
      }
    ]
  },
  {
    id: 'opt-2',
    courseId: 'opt',
    chapterNumber: '2',
    title: 'Iterative Methods for Unconstrained Optimization',
    intro: 'In general optimization, we cannot find local minima analytically. This chapter covers the definitive catalog of iterative solvers: Steepest Descent, Newton\'s method, Quasi-Newton, Coordinate Descent, Gauss-Newton for non-linear fitting, Iterative Re-weighted Least Squares (IRLS), and gradient verification.',
    motivation: 'Whether training massive neural networks or fitting complex physical models, we rely on iterative optimization. Understanding the mathematical trade-offs between linear (Steepest Descent) and quadratic (Newton) methods is the key to writing fast, stable algorithms.',
    definitions: [
      {
        id: 'def-opt-2-1',
        title: 'Steepest Descent, Newton & Armijo Backtracking',
      titleHe: 'ירידה תלולה, ניוטון וחיפוש קו ארמיחו',
      simplifiedLogic: 'Unconstrained solvers find minima iteratively. **Steepest Descent** updates along the negative gradient (cheap but slow). **Newton\'s Method** uses the inverse Hessian to adjust steps based on curvature (expensive but converges quadratically). **Armijo Backtracking** dynamically shrinks step sizes to guarantee sufficient descent.\n\n**Visual Summary Comparison:**\n| Method | Iteration Formula | Convergence Rate | Computational Cost per Step |\n| :--- | :--- | :--- | :--- |\n| **Steepest Descent** | $x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)$ | Linear | **Very Cheap** (only gradient needed) |\n| **Newton\'s Method** | $x_{k+1} = x_k - H_k^{-1} \\nabla f(x_k)$ | Quadratic | **Very Expensive** (requires building/inverting Hessian) |',
      simplifiedLogicHe: 'פותרים ללא אילוצים מוצאים נקודות מינימום באופן איטרטיבי. **ירידה תלולה** מעדכנת לאורך הגרדיאנט השלילי (זול חישובית אך איטי). **שיטת ניוטון** משתמשת בהופכי של ההסיאן כדי להתאים את הצעדים לפי העקמומיות (יקר חישובית אך מתכנס ריבועית). **חיפוש קו ארמיחו** מקטין את גודל הצעד באופן דינמי כדי להבטיח ירידה מספקת.\n\n**טבלת השוואה חזותית:**\n| שיטה | נוסחת איטרציה | קצב התכנסות | עלות חישובית לצעד |\n| :--- | :--- | :--- | :--- |\n| **ירידה תלולה** | $x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)$ | ליניארי | **זול מאוד** (רק חישוב גרדיאנט) |\n| **שיטת ניוטון** | $x_{k+1} = x_k - H_k^{-1} \\nabla f(x_k)$ | ריבועי | **יקר מאוד** (דורש בנייה והיפוך של ההסיאן) |',
      toolboxConnection: 'Solving the Newton step $H d = -g$ is a linear system solver task. If the Hessian is ill-conditioned, we must apply preconditioners learned in **NLA Chapter 6**!',
      toolboxConnectionHe: 'פתרון צעד ניוטון $H d = -g$ הוא משימה של פותר מערכות ליניאריות. אם ההסיאן במצב גרוע (ill-conditioned), עלינו להחיל את התנאים המוקדמים (preconditioners) שנלמדו ב-**NLA פרק 6**!',
      keyTakeaway: 'Newton leverages second-order curvature to take direct paths to the minimum, bypassing the slow linear steps of steepest descent.',
      keyTakeawayHe: 'שיטת ניוטון מנצלת עקמומיות מסדר שני כדי לצעוד ישירות אל המינימום, ועוקפת את הצעדים הליניאריים האיטיים של הירידה התלולה.',
        content: '1. Steepest Descent: Update along negative gradient search direction: $x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)$.\n2. Newton\'s Method: Scales step using the inverse Hessian to capture curvature:\n   $$d_N = -\\left( \\nabla^2 f(x_k) \\right)^{-1} \\nabla f(x_k)$$\n3. Armijo Backtracking Line Search: Dynamically shrinks step size $\\alpha_j = \\beta^j \\alpha_0$ ($0 < \\beta < 1$) until sufficient decrease occurs:\n   $$f(x^{(k)} + \\alpha_j d^{(k)}) \\leq f(x^{(k)}) + c \\alpha_j \\langle \\nabla f, d^{(k)} \\rangle \\quad (0 < c < 1)$$',
        proof: 'Proof: Theorem on Newton\'s Quadratic Convergence\nTheorem: Near a local minimum $x^*$ where $\\nabla^2 f(x^*)$ is strictly positive definite and Lipschitz continuous, Newton\'s method converges quadratically.\n\nProof:\n1. Let the error in iteration $k$ be $e_k = x_k - x^*$. The Newton update is:\n   $$e_{k+1} = e_k - [\\nabla^2 f(x_k)]^{-1} \\nabla f(x_k)$$\n2. By Taylor\'s theorem, since $\\nabla f(x^*) = 0$:\n   $$\\nabla f(x_k) = \\nabla f(x_k) - \\nabla f(x^*) = \\int_0^1 \\nabla^2 f(x^* + t e_k) e_k dt$$\n3. Substitute this into the error equation:\n   $$e_{k+1} = e_k - [\\nabla^2 f(x_k)]^{-1} \\int_0^1 \\nabla^2 f(x^* + t e_k) e_k dt$$\n   $$e_{k+1} = [\\nabla^2 f(x_k)]^{-1} \\int_0^1 \\left( \\nabla^2 f(x_k) - \\nabla^2 f(x^* + t e_k) \\right) e_k dt$$\n4. Since the Hessian is Lipschitz continuous, $\\|\\nabla^2 f(x_k) - \\nabla^2 f(x^* + t e_k)\\|_2 \\leq L (1 - t) \\|e_k\\|_2$. Taking norms:\n   $$\\|e_{k+1}\\|_2 \\leq \\|[\\nabla^2 f(x_k)]^{-1}\\|_2 \\int_0^1 L (1 - t) \\|e_k\\|_2^2 dt = \\frac{L}{2} \\|[\\nabla^2 f(x_k)]^{-1}\\|_2 \\cdot \\|e_k\\|_2^2$$\n5. This yields the quadratic error bound $\\|e_{k+1}\\|_2 \\leq C \\|e_k\\|_2^2$. If the error is $0.01$ at step $k$, it will be $0.0001$ at step $k+1$, achieving extremely rapid convergence!',
        example: 'Minimize $f(x) = (1 - x_1)^2 + 5(x_2 - x_1^2)^2$ (Rosenbrock "Banana" function) starting from $[-1.4, 2.0]^T$.\n- Steepest Descent: Takes hundreds of small, zigzagging steps because of the curved valley. After 100 steps, it is still far from the minimum.\n- Newton\'s Method: Calculates the Hessian at each step. By adjusting step directions based on curvature, it directly targets the bowl, reaching the exact minimum $[1, 1]^T$ in only 9 steps!'
      },
      {
        id: 'def-opt-2-2',
        title: 'Coordinate Descent, Gauss-Newton & IRLS',
      titleHe: 'ירידת קואורדינטות, גאוס-ניוטון ו-IRLS',
      simplifiedLogic: 'This section details specialized iterative solvers:\n1. **Coordinate Descent:** Minimizes one variable at a time (highly efficient for separable problems).\n2. **Gauss-Newton:** Solves non-linear least squares fit problems by approximating the Hessian using only Jacobian products ($J^T J$).\n3. **Iterative Re-weighted Least Squares (IRLS):** Solves non-smooth $L_p$ problems by converting them into sequential weighted least squares problems.',
      simplifiedLogicHe: 'סעיף זה מפרט פותרים איטרטיביים מיוחדים:\n1. **ירידת קואורדינטות:** ממזערת משתנה אחד בכל פעם (יעילה במיוחד לבעיות פריקות).\n2. **גאוס-ניוטון:** פותרת בעיות התאמה לא-ליניאריות בריבועים מינימליים על ידי קירוב ההסיאן באמצעות מכפלות יעקוביאן בלבד ($J^T J$).\n3. **IRLS (ריבועים מינימליים משוקללים איטרטיבית):** פותרת בעיות $L_p$ לא-חלקות על ידי הפיכתן לסדרה של בעיות ריבועים מינימליים משוקללים.',
      toolboxConnection: 'IRLS weighting updates are a direct optimization application of the weighted least squares formulations in **NLA Chapter 3**!',
      toolboxConnectionHe: 'עדכוני המשקלים ב-IRLS הם יישום אופטימיזציה ישיר של נוסחאות הריבועים המינימליים המשוקללים שנלמדו ב-**NLA פרק 3**!',
      keyTakeaway: 'Gauss-Newton avoids computing expensive second derivatives of residuals by approximating Hessians via first-order Jacobian products.',
      keyTakeawayHe: 'שיטת גאוס-ניוטון מונעת חישוב נגזרות שניות יקרות של השאריות על ידי קירוב ההסיאן באמצעות מכפלות יעקוביאן מסדר ראשון.',
        content: '1. Coordinate Descent (CD): Lexicographically minimizes the objective along one coordinate axis at a time, making it highly effective when 1-D forms are simple:\n   $$x_i^{(k+1)} \\leftarrow \\arg\\min_{x_i} f(x_1^{(k+1)}, ..., x_i, ..., x_n^{(k)})$$\n2. Gauss-Newton (GN): Solves non-linear least squares fit problems $\\min \\frac{1}{2}\\|f(\\theta) - y\\|_2^2$ by approximating the Hessian as $J^T J$:\n   $$d_{\\text{GN}} = -(J^T J)^{-1} J^T (f(\\theta) - y)$$\n   (Levenberg-Marquardt adds damping $\\mu I$ for stability: $J^T J + \\mu I$).\n3. Iterative Re-weighted Least Squares (IRLS): Solves $\\ell_p$-norm minimizations $\\min \\|Ax-b\\|_p^p$ by iteratively updating diagonal weights:\n   $$w_i^{(k)} = (|a_i^T x^{(k)} - b_i| + \\epsilon)^{p-2}$$',
        proof: 'Proof: Theorem on IRLS Convergence Rationale\nSuppose we want to minimize the non-quadratic $\\ell_p$ norm $\\min_x \\sum_i \\phi(r_i)$, where $r_i = a_i^T x - b_i$ and $\\phi(r_i) = |r_i|^p$.\n1. Differentiate the objective with respect to $x_j$:\n   $$\\frac{\\partial}{\\partial x_j} \\sum_i |r_i|^p = \\sum_i p |r_i|^{p-1} \\text{sign}(r_i) \\frac{\\partial r_i}{\\partial x_j} = \\sum_i p |r_i|^{p-2} r_i a_{ij}$$\n2. We define the weights $w_i = |r_i|^{p-2}$. The gradient condition then becomes:\n   $$\\sum_i w_i (a_i^T x - b_i) a_{ij} = 0$$\n3. This is exactly the gradient of the weighted least squares problem $\\min_x \\sum_i w_i (a_i^T x - b_i)^2$.\n4. By fixing $w_i^{(k)}$ based on the previous iteration\'s residuals $r_i^{(k)}$, we can solve for $x^{(k+1)}$ using standard linear least squares. This allows us to solve complex non-smooth $\\ell_1$ or $\\ell_p$ problems using standard matrix division!',
        example: 'Solve a 1D $\\ell_1$ norm minimization $\\min_x |x - 1| + |x - 2|$ via IRLS starting at $x^{(0)} = 0$ with $\\epsilon = 0.01$.\n1. Step 1 residuals: $r_1 = -1, r_2 = -2$. Weights $w_i = \\frac{1}{|r_i| + \\epsilon}$:\n   $$w_1 = \\frac{1}{1.01} \\approx 0.99, \\quad w_2 = \\frac{1}{2.01} \\approx 0.50$$\n2. Solve the weighted least squares problem $\\min_x w_1 (x - 1)^2 + w_2 (x - 2)^2$:\n   $$x^{(1)} = \\frac{w_1 (1) + w_2 (2)}{w_1 + w_2} = \\frac{0.99 + 1.00}{0.99 + 0.50} = \\frac{1.99}{1.49} \\approx 1.33$$\n3. The weights update dynamically, guiding $x$ directly to the median optimal point!'
      },
      {
        id: 'def-opt-2-3',
        title: 'Gradient & Jacobian Verification Tests',
      titleHe: 'בדיקות אימות גרדיאנט ויעקוביאן',
      simplifiedLogic: 'Gradients and Jacobians are extremely prone to programming bugs. The **Gradient Test** is an automated sanity check based on the Taylor expansion: if the analytical gradient code is correct, the numerical error ratio $\\Phi(\\epsilon)$ must stay perfectly constant as step size $\\epsilon \\to 0$. If there is a bug, the ratio explodes exponentially!\n\n**Visual Error Verification Map:**\n* **Correct Gradient:** $\\Phi(\\epsilon) \\approx \\text{constant}$ as $\\epsilon \\to 0$ (Perfect quadratic decay)\n* **Buggy Gradient:** $\\Phi(\\epsilon) \\propto 1/\\epsilon \\rightarrow \\infty$ as $\\epsilon \\to 0$ (Linear error explosion)',
      simplifiedLogicHe: 'קוד עבור גרדיאנטים ויעקוביאנים הוא מועד מאוד לשגיאות תכנות. **בדיקת הגרדיאנט** היא אימות אוטומטי המבוסס על פיתוח טיילור: אם הגרדיאנט האנליטי נכון, יחס השגיאה הנומרי $\\Phi(\\epsilon)$ חייב להישאר קבוע לחלוטין ככל שגודל הצעד $\\epsilon \\to 0$. אם יש באג, היחס יתפוצץ אקספוננציאלית!\n\n**מיפוי בדיקת שגיאות:**\n* **גרדיאנט תקין:** $\\Phi(\\epsilon) \\approx \\text{constant}$ כאשר $\\epsilon \\to 0$ (דעיכה ריבועית מושלמת)\n* **גרדיאנט עם באג:** $\\Phi(\\epsilon) \\propto 1/\\epsilon \\rightarrow \\infty$ כאשר $\\epsilon \\to 0$ (התפוצצות שגיאה ליניארית)',
      toolboxConnection: 'The Transpose Test uses the definition of conjugate transpose inner products from **NLA Chapter 1** to verify linear operator implementations!',
      toolboxConnectionHe: 'בדיקת הצמוד (Transpose Test) משתמשת בהגדרת המכפלה הפנימית של הצמוד המרוכב שנלמדה ב-**NLA פרק 1** כדי לאמת מימושי אופרטורים ליניאריים!',
      keyTakeaway: 'Taylor-based verification tests isolate analytical bugs by checking if error decays at a perfect quadratic rate.',
      keyTakeawayHe: 'בדיקות אימות המבוססות על טיילור מבודדות באגים אנליטיים על ידי בדיקה האם השגיאה דועכת בקצב ריבועי מושלם.',
        content: 'Writing code for gradients and Jacobians is highly error-prone. To verify implementation correctness, we perform numerical checks based on Taylor expansions:\n1. The Gradient Test: $\\Phi(\\epsilon) = \\frac{|f(x + \\epsilon d) - f(x) - \\epsilon \\langle g, d \\rangle|}{\\epsilon^2} \\approx \\text{constant}$ as $\\epsilon \\to 0$.\n2. The Jacobian Test: $\\Phi(\\epsilon) = \\frac{\\|f(x + \\epsilon d) - f(x) - \\epsilon J d\\|_2}{\\epsilon^2} \\approx \\text{constant}$ as $\\epsilon \\to 0$.\n3. The Transpose Test: Verifies that $A$ and its conjugate transpose $A^T$ are correct by checking that $\\langle A u, v \\rangle = \\langle u, A^T v \\rangle$ for random vectors $u, v$.',
        proof: 'Proof: Mathematical Rationale of the Gradient Verification Test\nWe prove that if the gradient $g = \\nabla f(x)$ is mathematically correct, then the error term decays quadratically, meaning the ratio $\\Phi(\\epsilon)$ approaches a constant as $\\epsilon \\to 0$.\n\n1. Let $f$ be twice continuously differentiable. The Taylor expansion is:\n   $$f(x + \\epsilon d) = f(x) + \\epsilon \\langle \\nabla f(x), d \\rangle + \\frac{\\epsilon^2}{2} \\langle d, \\nabla^2 f(x) d \\rangle + O(\\epsilon^3)$$\n2. Subtract the first-order approximation from both sides:\n   $$f(x + \\epsilon d) - f(x) - \\epsilon \\langle \\nabla f(x), d \\rangle = \\frac{\\epsilon^2}{2} \\langle d, \\nabla^2 f(x) d \\rangle + O(\\epsilon^3)$$\n3. Divide both sides by $\\epsilon^2$:\n   $$\\frac{f(x + \\epsilon d) - f(x) - \\epsilon \\langle \\nabla f(x), d \\rangle}{\\epsilon^2} = \\frac{1}{2} \\langle d, \\nabla^2 f(x) d \\rangle + O(\\epsilon)$$\n4. Taking the limit as $\\epsilon \\to 0$:\n   $$\\lim_{\\epsilon \\to 0} \\frac{|f(x + \\epsilon d) - f(x) - \\epsilon \\langle \\nabla f(x), d \\rangle|}{\\epsilon^2} = \\frac{1}{2} |\\langle d, \\nabla^2 f(x) d \\rangle|$$\n5. This limit is a finite constant (half the quadratic curvature along direction $d$). If our gradient code has even a tiny typo, the numerator will have an $O(\\epsilon)$ term, causing the ratio to explode like $O(1/\\epsilon)$ as $\\epsilon \\to 0$, immediately detecting the bug!',
        example: 'Verify gradient code for $f(x) = x^2$ at $x=2$ along direction $d=1$.\n1. Correct gradient is $g = 2x = 4$. Let\'s test this correct gradient. Calculate $\\Phi(\\epsilon)$:\n   - $\\epsilon = 0.1 \\implies \\Phi = \\frac{|(2.1)^2 - 4 - 0.1(4)|}{0.01} = \\frac{|4.41 - 4 - 0.4|}{0.01} = \\frac{0.01}{0.01} = 1.00$\n   - $\\epsilon = 0.01 \\implies \\Phi = \\frac{|(2.01)^2 - 4 - 0.01(4)|}{0.0001} = \\frac{|4.0401 - 4 - 0.04|}{0.0001} = \\frac{0.0001}{0.0001} = 1.00$\n   The ratio remains perfectly constant! The gradient is correct!\n2. Let\'s test a buggy gradient $g = 3.9$ (off by 2.5%):\n   - $\\epsilon = 0.1 \\implies \\Phi = \\frac{|4.41 - 4 - 0.1(3.9)|}{0.01} = \\frac{0.02}{0.01} = 2.00$\n   - $\\epsilon = 0.01 \\implies \\Phi = \\frac{|4.0401 - 4 - 0.01(3.9)|}{0.0001} = \\frac{0.0011}{0.0001} = 11.00$\n   - $\\epsilon = 0.001 \\implies \\Phi = \\frac{|4.004001 - 4 - 0.001(3.9)|}{0.000001} = \\frac{0.000101}{0.000001} = 101.00$\n   The ratio exploded by 10x with each division! This instantly flags our gradient as buggy!'
      },
      {
        id: 'def-opt-2-4',
        title: 'Quasi-Newton & Inexact Newton-CG Solvers',
      titleHe: 'פותרי קוואזי-ניוטון וניוטון לא-מדויק (Inexact Newton-CG)',
      simplifiedLogic: 'Newton\'s method is computationally heavy because it requires calculating and inverting the Hessian matrix $H = \\nabla^2 f(x)$ at each step. **Quasi-Newton** methods (like BFGS) approximate $H^{-1}$ using only the change in gradients, keeping the approximation positive definite. **Inexact Newton-CG** solves the Hessian system approximately using Conjugate Gradients, stopping early to save compute.',
      simplifiedLogicHe: 'שיטת ניוטון יקרה חישובית מכיוון שהיא דורשת חישוב והיפוך של מטריצת ההסיאן בכל שלב. שיטות **קוואזי-ניוטון** (כמו BFGS) מעריכות את $H^{-1}$ באמצעות שינויים בגרדיאנטים בלבד, ושומרות על מטריצה חיובית לחלוטין. שיטת **ניוטון לא-מדויק (Newton-CG)** פותרת את מערכת ההסיאן באופן מקורב באמצעות גרדיאנטים צמודים, ונעצרת מוקדם כדי לחסוך זמן חישוב.',
      toolboxConnection: 'Inexact Newton-CG uses the Conjugate Gradient solver from **NLA Chapter 6** as its internal engine!',
      toolboxConnectionHe: 'שיטת ניוטון לא-מדויק משתמשת בפותר הגרדיאנטים הצמודים מ-**NLA פרק 6** כמנוע הפנימי שלה!',
      keyTakeaway: 'Quasi-Newton and Inexact Newton methods bypass the massive cost of Hessian inversion while preserving fast convergence rates.',
      keyTakeawayHe: 'שיטות קוואזי-ניוטון וניוטון לא-מדויק עוקפות את העלות העצומה של היפוך ההסיאן תוך שמירה על קצבי התכנסות מהירים.',
        content: '**Quasi-Newton Methods**: Newton\'s method is computationally heavy because it requires calculating and inverting the Hessian matrix $H = \\nabla^2 f(x)$ at each step. Quasi-Newton methods (like **BFGS** and **L-BFGS**) approximate $H^{-1}$ using only the change in gradients ($y_k = g_{k+1} - g_k$) and coordinates ($s_k = x_{k+1} - x_k$) via the secant equation:\n$$B_{k+1} s_k = y_k \\quad \\text{or} \\quad H_{k+1} y_k = s_k$$\n\n**Descent Direction Theorem**: Any update of the form $d = -M \\nabla f(x)$ is a guaranteed descent direction if $M$ is strictly positive definite ($M \\succ 0$):\n$$\\langle \\nabla f(x), d \\rangle = -\\nabla f(x)^T M \\nabla f(x) < 0$$\nQuasi-Newton updates are engineered to keep the Hessian approximation strictly positive definite.\n\n**Inexact Newton (Newton-PCG)**: Instead of solving the Hessian system exactly ($H d = -g$), we solve it approximately using the Conjugate Gradient (CG) method. We stop CG early once the residual satisfies:\n$$\\|H d + g\\|_2 \\leq \\eta_k \\|g\\|_2 \\quad (\\eta_k \\in (0, 1))$$\nThis saves massive amounts of compute while preserving fast convergence.',
        proof: 'Proof: Theorem on Descent Direction Scaling\n\nWe prove that $d = -M g$ is a descent direction for any $M \\succ 0$, where $g = \\nabla f(x) \\neq 0$.\n\n1. By definition, a direction $d$ is a descent direction if $\\langle g, d \\rangle < 0$.\n2. Substitute $d = -M g$:\n   $$\\langle g, -M g \\rangle = -g^T M g$$\n3. Since $M \\succ 0$ is positive definite, the quadratic form $v^T M v > 0$ for all non-zero vectors $v$.\n4. Since $g \\neq 0$ (not at a stationary point):\n   $$-g^T M g < 0$$\nThis mathematically guarantees that scaling the gradient by any positive definite matrix preserves the descent property, allowing us to safely use Hessian approximations. $\\square$',
        example: 'Let $f(x) = x_1^4 + x_2^4$. Let $x^{(0)} = [1, 1]^T$. Let\'s compare Newton vs Inexact Newton-CG:\n- Newton: Calculates the exact Hessian $H = \\begin{bmatrix} 12x_1^2 & 0 \\\\ 0 & 12x_2^2 \\end{bmatrix} = \\begin{bmatrix} 12 & 0 \\\\ 0 & 12 \\end{bmatrix}$ and solves the system exactly.\n- Inexact Newton-CG: Starts solving the system $\\begin{bmatrix} 12 & 0 \\\\ 0 & 12 \\end{bmatrix} d = -\\begin{bmatrix} 4 \\\\ 4 \\end{bmatrix}$ using CG. We set $\\eta = 0.5$. In the very first iteration, CG finds $d = [-0.33, -0.33]^T$, which gives a residual norm of 0, immediately satisfying the stopping criteria. The solver makes a safe step forward without ever manually building or inverting the full Hessian matrix!'
      }
    ],

    quiz: [
      {
        question: 'In the Gradient Verification Test, what happens to the ratio Φ(ε) as ε approaches zero if the gradient code is 100% correct?',
        options: [
          'It explodes to infinity.',
          'It approaches a constant value (half the directional curvature).',
          'It becomes exactly zero.',
          'It changes randomly.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Because the Taylor error decays quadratically (O(ε^2)), dividing the error by ε^2 results in a constant ratio in the limit. If there is a bug, the error decays only linearly, causing the ratio to blow up like O(1/ε).'
      },
      {
        question: 'What is the primary computational difference between the Gauss-Newton and Levenberg-Marquardt methods?',
        options: [
          'Gauss-Newton only works for linear systems.',
          'Levenberg-Marquardt adds a regularizing damping parameter μI to the J^T J system, stabilizing the search direction when the Jacobian is ill-conditioned.',
          'Levenberg-Marquardt is twice as slow.',
          'Gauss-Newton uses the second derivatives of the residuals.'
        ],
        correctAnswerIndex: 1,
        explanation: 'LM regularizes the GN step by adding μI, preventing division by near-zero singular values, which guarantees stability even for rank-deficient data fitting.'
      }
    ]
  },
  {
    id: 'opt-3',
    courseId: 'opt',
    chapterNumber: '3',
    title: 'Constrained Optimization',
    intro: 'Real-world optimization is rarely free of limits. This chapter covers optimization under constraints: Lagrange Multipliers for equality constraints, the necessary Karush-Kuhn-Tucker (KKT) conditions for inequalities, Penalty and Barrier methods, and the Projected Steepest Descent algorithm.',
    motivation: 'Engineering designs must stay within stress limits; financial portfolios must stay within budgets. Constrained optimization gives us the exact mathematical machinery to solve problems safely along the boundaries of complex feasible regions.',
    definitions: [
      {
        id: 'def-opt-3-1',
        title: 'Lagrange Multipliers (Equality Constraints)',
      titleHe: 'אופטימליזציה עם אילוצים וקבוצות פעילות',
      simplifiedLogic: 'Constrained optimization finds optimal points subject to constraints. An inequality constraint $g_i(x) \\leq 0$ is **active** at $x^*$ if it holds with exact equality ($g_i(x^*) = 0$). Active constraints act as barriers that shape the boundary of our search space.',
      simplifiedLogicHe: 'אופטימיזציה עם אילוצים מוצאת את הנקודות האופטימליות הכפופות למגבלות. אילוץ אי-שוויון $g_i(x) \\leq 0$ מוגדר כ**פעיל** בנקודה $x^*$ אם הוא מתקיים כשוויון מדויק ($g_i(x^*) = 0$). אילוצים פעילים משמשים כמחסומים המעצבים את גבול מרחב החיפוש שלנו.',
      toolboxConnection: 'Identifying active constraints creates a sub-system of linear equality constraints, which we solve using the projections in **NLA Chapter 3**!',
      toolboxConnectionHe: 'זיהוי אילוצים פעילים יוצר תת-מערכת של אילוצי שוויון ליניאריים, אותה אנו פותרים באמצעות ההטלות שנלמדו ב-**NLA פרק 3**!',
      keyTakeaway: 'Active constraints dictate the boundary geometry where the constrained optimal solution must sit.',
      keyTakeawayHe: 'אילוצים פעילים קובעים את גיאומטריית הגבול שבה חייב להימצא הפתרון האופטימלי הכפוף לאילוצים.',
        content: 'To minimize $f(x)$ subject to $m$ equality constraints $h_i(x) = 0$, we define the Lagrangian function:\n$$L(x, \\mu) = f(x) + \\sum_{i=1}^m \\mu_i h_i(x)$$\nwhere $\\mu_i$ are Lagrange multipliers. First-order necessary conditions require finding critical points where the gradient of the Lagrangian vanishes:\n$$\\nabla_x L(x^*, \\mu^*) = 0 \\quad \\text{and} \\quad \\nabla_\\mu L(x^*, \\mu^*) = 0$$',
        proof: 'Proof: Geometric Rationale of Lagrange Multipliers\nWe prove that at a constrained local minimum $x^*$ of $f(x)$ subject to $h(x) = 0$, the gradients $\\nabla f(x^*)$ and $\\nabla h(x^*)$ must be parallel, meaning $\\nabla f(x^*) + \\mu^* \\nabla h(x^*) = 0$.\n\n1. The constraint equation $h(x) = 0$ defines a smooth boundary surface (manifold) in $\\mathbb{R}^n$.\n2. Any curve $z(t)$ lying entirely within this constraint surface and passing through $x^*$ at $t=0$ has a tangent vector $d = z\'(0)$.\n3. Since $h(z(t)) = 0$ for all $t$, we differentiate with respect to $t$ using the chain rule:\n   $$\\left. \\frac{d}{dt} h(z(t)) \\right|_{t=0} = \\langle \\nabla h(x^*), z\'(0) \\rangle = \\langle \\nabla h(x^*), d \\rangle = 0$$\n   This proves that any feasible movement direction $d$ must be strictly orthogonal to the constraint gradient $\\nabla h(x^*)$.\n4. Now, since $x^*$ is a local minimum along this constraint surface, moving along the feasible curve $z(t)$ must not decrease $f$. Thus, the rate of change of $f$ must vanish at $t=0$:\n   $$\\left. \\frac{d}{dt} f(z(t)) \\right|_{t=0} = \\langle \\nabla f(x^*), z\'(0) \\rangle = \\langle \\nabla f(x^*), d \\rangle = 0$$\n5. Geometrically, this means that the objective gradient $\\nabla f(x^*)$ is orthogonal to every tangent direction $d$ that is orthogonal to $\\nabla h(x^*)$.\n6. In $\\mathbb{R}^n$, if a vector is orthogonal to the same subspace as another vector, the two vectors must lie along the same line (they are parallel). Thus, there exists a scalar $\\mu^*$ such that:\n   $$\\nabla f(x^*) = -\\mu^* \\nabla h(x^*) \\implies \\nabla f(x^*) + \\mu^* \\nabla h(x^*) = 0$$\n   This establishes the Lagrangian gradient condition!',
        example: 'Minimize $f(x, y) = x^2 + y^2$ subject to $x + y = 2$.\n1. Lagrangian: $L(x, y, \\mu) = x^2 + y^2 + \\mu(x + y - 2)$.\n2. Compute gradients:\n   - $\\frac{\\partial L}{\\partial x} = 2x + \\mu = 0 \\implies x = -\\mu / 2$\n   - $\\frac{\\partial L}{\\partial y} = 2y + \\mu = 0 \\implies y = -\\mu / 2$\n   - $\\frac{\\partial L}{\\partial \\mu} = x + y - 2 = 0$\n3. Substitute: $(-\\mu/2) + (-\\mu/2) = 2 \\implies -\\mu = 2 \\implies \\mu = -2$.\n4. Solution: $x = 1, y = 1$, with objective value $f(1, 1) = 2$.'
      },
      {
        id: 'def-opt-3-2',
        title: 'Karush-Kuhn-Tucker (KKT) Conditions',
      titleHe: 'תנאי אופטימליות מסדר שני עם אילוצים',
      simplifiedLogic: 'For constrained problems, unconstrained SOSC does not apply. Instead, we require the Lagrangian Hessian to be positive definite only along directions in the **Critical Subspace** (directions that tangent the active constraints). This is because we only care about curvature in directions we can actually step without violating constraints.',
      simplifiedLogicHe: 'עבור בעיות עם אילוצים, תנאי SOSC הרגיל אינו תקף. במקום זאת, אנו דורשים שההסיאן של הלגרנז\'יאן יהיה חיובי לחלוטין רק לאורך כיוונים ב**תת-המרחב הקריטי** (כיוונים המשיקים לאילוצים הפעילים). זאת מכיוון שעקמומיות בכיוונים החורגים מהאילוצים אינה מעניינת אותנו.',
      toolboxConnection: 'Projecting the Lagrangian Hessian onto the critical subspace relies on orthogonal basis projections learned in **NLA Chapter 5**!',
      toolboxConnectionHe: 'הטלת הסיאן הלגרנז\'יאן על תת-המרחב הקריטי מבוססת על הטלות בסיס אורתוגונליות שנלמדו ב-**NLA פרק 5**!',
      keyTakeaway: 'Constrained sufficiency only requires positive curvature along critical directions that tangent the active constraint boundary.',
      keyTakeawayHe: 'תנאי מספיק עם אילוצים דורש עקמומיות חיובית רק לאורך כיוונים קריטיים המשיקים לגבול האילוצים הפעילים.',
        content: 'For the general constrained problem:\n$$\\min_x f(x) \\quad \\text{s.t.} \\quad g_i(x) \\leq 0 \\; (i=1..p), \\quad h_j(x) = 0 \\; (j=1..m)$$\nThe KKT conditions are the first-order necessary conditions for $x^*$ to be optimal:\n1. Stationarity: $\\nabla f(x^*) + \\sum_{i=1}^p \\lambda_i \\nabla g_i(x^*) + \\sum_{j=1}^m \\mu_j \\nabla h_j(x^*) = 0$\n2. Primal Feasibility: $g_i(x^*) \\leq 0$ and $h_j(x^*) = 0$\n3. Dual Feasibility: $\\lambda_i \\geq 0$\n4. Complementary Slackness: $\\lambda_i \\cdot g_i(x^*) = 0 \\quad \\forall i=1...p$',
        proof: 'Proof/Explanation: Complementary Slackness Rationale\nThe complementary slackness condition $\\lambda_i \\cdot g_i(x^*) = 0$ is a vital diagnostic showing how constraints influence our optimum:\n- Case 1: Inactive Constraints ($g_i(x^*) < 0$). Geometrically, the constrained optimum lies strictly inside the feasible region boundary. The constraint does not restrict us locally, so its "shadow price" must be zero, meaning $\\lambda_i = 0$.\n- Case 2: Active Constraints ($g_i(x^*) = 0$). Geometrically, the optimum lies directly on the boundary of the feasible region. The constraint is holding us back, so its multiplier can be strictly positive: $\\lambda_i > 0$.\nIn either case, their product is exactly zero. This condition is crucial for active-set algorithms.',
        example: 'Minimize $f(x) = (x - 3)^2$ subject to $x \\geq 1$ (which is $1 - x \\leq 0$).\n1. Standard form: $g(x) = 1 - x \\leq 0$. Lagrangian: $L(x, \\lambda) = (x-3)^2 + \\lambda(1-x)$.\n2. KKT conditions:\n   - Stationarity: $2(x - 3) - \\lambda = 0 \\implies \\lambda = 2(x - 3)$\n   - Feasibility: $x \\geq 1$, and $\\lambda \\geq 0$\n   - Slackness: $\\lambda(1 - x) = 0$\n3. Test Case 1: $\\lambda = 0 \\implies 2(x-3) = 0 \\implies x=3$. Check primal feasibility: $3 \\geq 1$ (satisfied!). The constraint is inactive, and $x^* = 3$ is our global minimum.\n4. Test Case 2: $\\lambda > 0 \\implies 1-x = 0 \\implies x=1$. Stationarity gives $\\lambda = 2(1-3) = -4$, which violates dual feasibility $\\lambda \\geq 0$. Thus, Case 1 is the only valid solution.'
      },
      {
        id: 'def-opt-3-3',
        title: 'Barrier Methods & Projected Gradient Descent',
      titleHe: 'שיטות קנס ומחסום (Interior Point)',
      simplifiedLogic: 'How do we solve constrained optimization using standard unconstrained solvers? We use two approaches:\n1. **Penalty Methods:** Penalize constraint violations from the outside (by adding a penalty proportional to the violation).\n2. **Barrier Methods:** Prevent violations from ever escaping the interior by adding a logarithmic barrier term (like $- \\mu \\ln(-g_i(x))$) that explodes to infinity at the boundary.\n\n**Visual Penalty vs. Barrier Map:**\n* **Penalty:** Violation occurs $\\rightarrow$ Penalty pulls it back. Fits from **outside** the feasible region.\n* **Barrier:** Solver approaches boundary $\\rightarrow$ Force field explodes $\\rightarrow$ Keeps iterations strictly **inside**.',
      simplifiedLogicHe: 'כיצד אנו פותרים אופטימיזציה עם אילוצים באמצעות פותרים ללא אילוצים? אנו משתמשים בשתי גישות:\n1. **שיטות קנס:** מענישות על חריגה מהאילוצים מבחוץ (על ידי הוספת קנס היחסי לגודל החריגה).\n2. **שיטות מחסום (Interior Point):** מונעות מהאלגוריתם לצאת מתחום האילוצים על ידי הוספת איבר מחסום לוגריתמי (כמו $- \\mu \\ln(-g_i(x))$) המתפוצץ לאינסוף בגבול התחום.\n\n**השוואת קנס מול מחסום:**\n* **שיטת קנס:** מתרחשת חריגה $\\rightarrow$ הקנס מושך את הפתרון חזרה. מגיעה מ**מחוץ** לתחום האפשרי.\n* **שיטת מחסום:** הפותר מתקרב לגבול $\\rightarrow$ שדה הכוח מתפוצץ $\\rightarrow$ שומר על האיטרציות strictly **בתוך** התחום.',
      toolboxConnection: 'The barrier scaling parameter $\\mu$ acts like Tikhonov regularization in **NLA Chapter 3**, where we solve a sequence of regularized problems as $\\mu \\to 0$!',
      toolboxConnectionHe: 'פרמטר המשקל של המחסום $\\mu$ פועל בדומה לרגולריזציית טיכונוב ב-**NLA פרק 3**, שבה אנו פותרים סדרה של בעיות מיוצבות כאשר $\\mu \\to 0$!',
      keyTakeaway: 'Barrier methods enforce inequalities strictly from the inside using logarithmic force fields that explode at constraint boundaries.',
      keyTakeawayHe: 'שיטות מחסום אוכפות אי-שוויונות אך ורק מתוך התחום האפשרי על ידי שימוש בשדות כוח לוגריתמיים המתפוצצים בגבולות האילוצים.',
        content: '1. Barrier Methods (Interior Point): Converts inequality constraints into penalties using a barrier parameter $\\mu > 0$ that approaches 0:\n   $$\\min_x B(x, \\mu) = f(x) - \\mu \\sum_{i=1}^p \\ln(-g_i(x))$$\n2. Projected Gradient Descent: Handles constraints by taking a gradient step and then projecting the resulting vector back onto the feasible set $\\Omega$ using projection operator $P_\\Omega$:\n   $$x^{(k+1)} = P_\\Omega \\left( x^{(k)} - \\alpha^{(k)} \\nabla f(x^{(k)}) \\right)$$',
        proof: 'Proof: Theorem on Barrier Log-Derivative\nWe show how the barrier term $- \\mu \\ln(-g_i(x))$ acts as a force field preventing iterations from escaping the interior of the feasible region.\n\n1. Let $B_i(x) = - \\ln(-g_i(x))$.\n2. Compute the gradient of this barrier term:\n   $$\\nabla B_i(x) = - \\frac{1}{-g_i(x)} \\nabla (-g_i(x)) = \\frac{\\nabla g_i(x)}{-g_i(x)}$$\n3. As $x$ approaches the constraint boundary (where $g_i(x) \\to 0^-$), the denominator approaches zero.\n4. Thus, the gradient magnitude $\\|\\nabla B_i(x)\\|_2 \\to \\infty$.\n5. This mathematically proves that as our solver approaches the boundary, the gradient force explodes, acting as an infinite barrier that keeps iterations strictly inside the feasible region, allowing standard unconstrained solvers to find constrained solutions safely.',
        example: 'Project a point $y = [2.0, 3.0]^T$ onto the unit circle $\\Omega = \\{x \\in \\mathbb{R}^2 \\mid \\|x\\|_2 \\leq 1\\}$.\n1. The projection operator $P_\\Omega(y)$ finds the closest point in $\\Omega$ to $y$:\n   $$P_\\Omega(y) = \\frac{y}{\\|y\\|_2} \\quad \\text{if } \\|y\\|_2 > 1$$\n2. Since $\\|y\\|_2 = \\sqrt{4 + 9} = \\sqrt{13} \\approx 3.61 > 1$, we scale $y$ to the boundary:\n   $$x^* = P_\\Omega(y) = \\frac{1}{\\sqrt{13}} \\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix} \\approx \\begin{bmatrix} 0.55 \\\\ 0.83 \\end{bmatrix}^T$$'
      },
      {
        id: 'def-opt-3-4',
        title: 'LICQ, Active Sets & Projection Operators',
      titleHe: 'תנאי LICQ, קבוצות פעילות ואופרטורי היטל',
      simplifiedLogic: 'Projection operators find the closest point in a domain $\\Omega$ to a target $y$. **Box-Constrained Projection** clips variables element-wise to their bounds. **Linear Equality Projection** projects points onto hyperplanes using Lagrange multipliers.\n\n**Visual Projection Formulation Map:**\n* **Box-Constrained (Clipping):** $(P_\\Omega(x))_i = \\min(u_i, \\max(l_i, x_i))$\n* **Linear Equality Hyperplane:** $P_\\Omega(y) = y - A^T(A A^T)^{-1}(A y - b)$',
      simplifiedLogicHe: 'אופרטורי היטל מוצאים את הנקודה הקרובה ביותר בתחום $\\Omega$ לנקודת יעד $y$. **היטל אילוצי תיבה** קוטם (קליפינג) משתנים איבר-איבר לגבולותיהם. **היטל אילוצי שוויון ליניאריים** מטיל נקודות על תתי-מרחבים באמצעות כופלי לגרנז\'.\n\n**מיפוי נוסחאות היטל:**\n* **אילוצי תיבה (קטימה):** $(P_\\Omega(x))_i = \\min(u_i, \\max(l_i, x_i))$\n* **אילוץ שוויון ליניארי:** $P_\\Omega(y) = y - A^T(A A^T)^{-1}(A y - b)$',
      toolboxConnection: 'Enforcing a box boundary $l \\leq x \\leq u$ is equivalent to enforcing an $L_\\infty$ distance metric from **NLA Chapter 1**! If our step exceeds the boundary, we "clip" it element-wise, which is the exact geometric equivalent of projecting onto a unit sphere in the $L_\\infty$ norm!',
      toolboxConnectionHe: 'אכיפת גבולות תיבה $l \\leq x \\leq u$ שקולה מתמטית לאכיפת מרחק במדד נורמת $L_\\infty$ מ-**NLA פרק 1**! אם הצעד שלנו חורג מהגבול, אנו "קוטמים" אותו איבר-איבר, שזהו המקביל הגיאומטרי המדויק של היטל על כדור היחידה בנורמת $L_\\infty$!',
      keyTakeaway: 'Hyperplane projection finds the closest feasible point by subtracting the orthogonal constraint discrepancy vector.',
      keyTakeawayHe: 'הטלה על על-מישור מוצאת את הנקודה האפשרית הקרובה ביותר על ידי חיסור וקטור פער האילוצים הניצב.',
        content: '**Linear Independence Constraint Qualification (LICQ)**: The KKT necessary conditions are only guaranteed to hold if the constraint gradients are linearly independent at the solution. Specifically, LICQ is satisfied at $x^*$ if the active constraint gradients are linearly independent:\n$$\\{\\nabla g_i(x^*), i \\in \\mathcal{A}(x^*)\\} \\cup \\{\\nabla h_j(x^*), j = 1..m\\} \\text{ are linearly independent}$$\nwhere $\\mathcal{A}(x^*) = \\{i \\mid g_i(x^*) = 0\\}$ is the **Active Set**.\n\n**Box-Constrained Projection**: For a box domain $l \\leq x \\leq u$, the projection operator $P_\\Omega(x)$ is computed element-wise by clipping:\n$$(P_\\Omega(x))_i = \\min(u_i, \\max(l_i, x_i))$$\n\n**Linear Equality Constraint Projection**: To project a point $y$ onto the hyperplane $Ax = b$ (where $A$ has full row rank):\n$$P_\\Omega(y) = y - A^T(A A^T)^{-1}(A y - b)$$\nThis returns the closest point on the plane to $y$.',
        proof: 'Proof: Derivation of Linear Equality Constraint Projection\n\nWe prove that $x^* = y - A^T(A A^T)^{-1}(A y - b)$ is the closest point on $Ax = b$ to $y$.\n\n1. The projection problem is a constrained optimization problem:\n   $$\\min_x \\frac{1}{2} \\|x - y\\|_2^2 \\quad \\text{s.t.} \\quad A x - b = 0$$\n2. The Lagrangian is:\n   $$L(x, \\mu) = \\frac{1}{2} \\|x - y\\|_2^2 + \\mu^T (A x - b)$$\n3. Take the gradient with respect to $x$ and set to zero (Stationarity):\n   $$\\nabla_x L = (x - y) + A^T \\mu = 0 \\implies x^* = y - A^T \\mu$$\n4. Left-multiply this equation by $A$:\n   $$A x^* = A y - A A^T \\mu$$\n5. Since $x^*$ must satisfy $A x^* = b$ (Feasibility):\n   $$b = A y - A A^T \\mu \\implies A A^T \\mu = A y - b$$\n6. Assuming $A$ has full row rank, $A A^T$ is invertible. Solving for $\\mu$:\n   $$\\mu = (A A^T)^{-1} (A y - b)$$\n7. Substitute this back into the stationarity equation:\n   $$x^* = y - A^T (A A^T)^{-1} (A y - b) \\quad \\square$$',
        example: 'Project the point $y = [2, 4]^T$ onto the line $x_1 + x_2 = 2$.\n1. Standard matrix form: $A = \\begin{bmatrix} 1 & 1 \\end{bmatrix}$, $b = [2]$.\n2. Compute $A A^T = 1(1) + 1(1) = [2]$, and $(A A^T)^{-1} = [0.5]$.\n3. Compute discrepancy $A y - b = (2 + 4) - 2 = 4$.\n4. Compute projection step:\n   $$A^T(A A^T)^{-1}(A y - b) = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} [0.5] (4) = \\begin{bmatrix} 2 \\\\ 2 \\end{bmatrix}$$\n5. Compute projected point $x^* = [2, 4]^T - [2, 2]^T = [0, 2]^T$.\n6. Verify feasibility: $0 + 2 = 2$ ✓. Distance is $\\|[2, 4]^T - [0, 2]^T\\|_2 = \\sqrt{4+4} = \\sqrt{8} \\approx 2.83$ (the shortest possible distance).'
      },
      {
        id: 'def-opt-3-5',
        title: 'Penalty Methods & 2nd-Order Constrained Conditions',
        content: '**Penalty Methods**: Converts constrained optimization into a sequence of unconstrained problems. The **Quadratic Penalty** formulation for equality constraints $h(x) = 0$ is:\n$$Q(x, \\mu) = f(x) + \\frac{\\mu}{2} \\sum_{j=1}^m (h_j(x))^2$$\nwhere the penalty parameter $\\mu > 0$ is increased towards $\\infty$ to force feasibility.\n\n**Second-Order Constrained Optimality Conditions**:\nLet $L(x, \\lambda, \\mu)$ be the Lagrangian. We define the **Critical Subspace** $C(x^*)$ of directions that do not immediately increase active constraints.\n1. **Second-Order Necessary Condition (SONC)**: If $x^*$ is a local minimizer, then:\n   $$d^T \\nabla^2_{xx} L(x^*, \\lambda^*, \\mu^*) d \\geq 0 \\quad \\forall d \\in C(x^*)$$\n2. **Second-Order Sufficient Condition (SOSC)**: If KKT is satisfied, and the Hessian is strictly positive definite on the critical subspace:\n   $$d^T \\nabla^2_{xx} L(x^*, \\lambda^*, \\mu^*) d > 0 \\quad \\forall d \\in C(x^*) \\setminus \\{0\\}$$\n   then $x^*$ is a strict constrained local minimizer.',
        proof: 'Proof: Theorem on SOSC (Second-Order Sufficient Condition)\n\nWe prove that if KKT holds and the Lagrangian Hessian $\\nabla^2_{xx} L(x^*, \\lambda^*, \\mu^*)$ is positive definite on the critical subspace $C(x^*)$, then $f(x) > f(x^*)$ for all neighboring feasible points $x \\neq x^*$.\n\n1. Let $x$ be a feasible point close to $x^*$. Let $d = x - x^*$.\n2. Since $x$ and $x^*$ are feasible, $h(x) = h(x^*) = 0$. For active inequalities, $g_i(x) \\leq 0 = g_i(x^*)$.\n3. The Taylor expansion of the Lagrangian with respect to $x$ at $(x^*, \\lambda^*, \\mu^*)$ is:\n   $$L(x, \\lambda^*, \\mu^*) = L(x^*, \\lambda^*, \\mu^*) + \\langle \\nabla_x L(x^*), d \\rangle + \\frac{1}{2} d^T \\nabla^2_{xx} L(x^*) d + o(\\|d\\|_2^2)$$\n4. Since stationarity holds, $\\nabla_x L(x^*) = 0$:\n   $$L(x, \\lambda^*, \\mu^*) = L(x^*, \\lambda^*, \\mu^*) + \\frac{1}{2} d^T \\nabla^2_{xx} L(x^*) d + o(\\|d\\|_2^2)$$\n5. Expanding the Lagrangian definitions and using feasibility ($h_j(x)=0, \\lambda_i \\geq 0, g_i(x) \\leq 0$):\n   $$L(x) = f(x) + \\sum \\lambda_i g_i(x) \\leq f(x) \\quad \\text{and} \\quad L(x^*) = f(x^*) + \\sum \\lambda_i g_i(x^*) = f(x^*)$$\n6. Thus:\n   $$f(x) - f(x^*) \\geq L(x) - L(x^*) = \\frac{1}{2} d^T \\nabla^2_{xx} L(x^*) d + o(\\|d\\|_2^2)$$\n7. Since the displacement $d$ belongs to the critical subspace (to first order), the quadratic term is strictly positive ($d^T \\nabla^2_{xx} L d > 0$), dominating the higher-order terms.\n8. Therefore, $f(x) - f(x^*) > 0 \\implies f(x) > f(x^*)$, proving $x^*$ is a strict local minimizer! $\\square$',
        example: 'Minimize $f(x, y) = -xy$ subject to $x + y = 2$ (Lagrangian $L = -xy + \\mu(x+y-2)$).\n1. We found the stationary point $x^* = 1, y^* = 1$ with multiplier $\\mu^* = 1$.\n2. Compute Lagrangian Hessian:\n   $$\\nabla^2_{xx} L = \\begin{bmatrix} 0 & -1 \\\\ -1 & 0 \\end{bmatrix}$$\n3. The eigenvalues of this Hessian are $-1$ and $+1$, so it is indefinite on $\\mathbb{R}^2$! Let\'s check the critical subspace $C(x^*)$:\n   - Active constraint gradient: $\\nabla h = [1, 1]^T$.\n   - Subspace $C(x^*) = \\{d \\in \\mathbb{R}^2 \\mid d_1 + d_2 = 0\\} \\implies d = [t, -t]^T$.\n4. Evaluate Hessian on $d \\in C(x^*)$:\n   $$d^T \\nabla^2_{xx} L d = \\begin{bmatrix} t & -t \\end{bmatrix} \\begin{bmatrix} 0 & -1 \\\\ -1 & 0 \\end{bmatrix} \\begin{bmatrix} t \\\\ -t \\end{bmatrix} = \\begin{bmatrix} t & -t \\end{bmatrix} \\begin{bmatrix} t \\\\ -t \\end{bmatrix} = t^2 + t^2 = 2t^2$$\n5. For all $t \\neq 0$, $2t^2 > 0$, meaning the Hessian is strictly positive definite on the critical subspace! By SOSC, $(1,1)$ is a strict local minimizer.'
      }
    ],
    quiz: [
      {
        question: 'Which of the KKT conditions requires that inequality constraint multipliers must be non-negative (λ_i ≥ 0)?',
        options: [
          'Complementary Slackness',
          'Dual Feasibility',
          'Primal Feasibility',
          'Stationarity'
        ],
        correctAnswerIndex: 1,
        explanation: 'Dual Feasibility enforces that inequality multipliers are non-negative, representing that relaxing the constraint would decrease (or keep constant) the objective value, never increase it.'
      },
      {
        question: 'What is the primary geometric concept behind Projected Gradient Descent?',
        options: [
          'It forces the objective gradient to be zero.',
          'It takes a standard gradient step and then mathematically projects the point back to the closest feasible point inside the constraint boundary.',
          'It ignores constraints entirely.',
          'It rotates the coordinate axes.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Projected GD ensures feasibility by applying the projection operator P_Ω after each step, mapping any out-of-bounds vector back onto the boundary of the feasible set.'
      }
    ]
  }
];