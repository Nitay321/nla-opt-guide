// ============================================================
// 🧮 Probability & Statistics — Formula & Definition Data
// Centralized for both English & Hebrew rendering
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

export const formulas: Formula[] = [
  // ==========================================
  // CHAPTER 0: PROBABILITY SPACES & AXIOMS
  // ==========================================
  {
    id: 'kolmogorov-axioms',
    courseId: 'prob',
    category: 'Probability Spaces',
    categoryHe: 'יסודות ההסתברות',
    name: "Kolmogorov's Three Axioms",
    nameHe: 'שלושת האקסיומות של קולמוגורוב',
    equation: 'P(A) \\ge 0, \\quad P(\\Omega) = 1, \\quad P\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = \\sum_{i=1}^{\\infty} P(A_i)',
    description: 'The foundational axioms of probability theory: Non-negativity of any event, Normalization of the entire sample space, and countable additivity of mutually disjoint events.',
    descriptionHe: 'אקסיומות היסוד של תורת ההסתברות: אי-שליליות של כל מאורע, נרמול של מרחב המדגם כולו ל-1, ואדיטיביות בת-מנייה עבור מאורעות זרים.'
  },
  {
    id: 'complement-rule',
    courseId: 'prob',
    category: 'Probability Spaces',
    categoryHe: 'יסודות ההסתברות',
    name: 'Complement Rule',
    nameHe: 'כלל המשלים',
    equation: 'P(A^c) = 1 - P(A)',
    description: 'The probability that an event does not occur is one minus the probability that it does occur.',
    descriptionHe: 'ההסתברות שמאורע מסוים לא יתרחש שווה ל-1 פחות ההסתברות שהוא כן יתרחש.'
  },
  {
    id: 'difference-rule',
    courseId: 'prob',
    category: 'Probability Spaces',
    categoryHe: 'יסודות ההסתברות',
    name: 'Difference Rule',
    nameHe: 'כלל ההפרש',
    equation: 'P(A \\setminus B) = P(A) - P(A \\cap B)',
    description: 'The probability of the set difference between A and B is the probability of A minus the probability of their intersection.',
    descriptionHe: 'ההסתברות להפרש בין קבוצות A ו-B היא ההסתברות של A פחות ההסתברות של החיתוך ביניהן.'
  },
  {
    id: 'probability-monotonicity',
    courseId: 'prob',
    category: 'Probability Spaces',
    categoryHe: 'יסודות ההסתברות',
    name: 'Probability Monotonicity',
    nameHe: 'מונוטוניות ההסתברות',
    equation: 'A \\subseteq B \\implies P(A) \\le P(B)',
    description: 'If event A is contained within event B, then the probability of event A cannot exceed the probability of event B.',
    descriptionHe: 'אם מאורע A מוכל במאורע B, אזי ההסתברות של A אינה יכולה לעלות על ההסתברות של B.'
  },
  {
    id: 'inclusion-exclusion-2',
    courseId: 'prob',
    category: 'Inclusion-Exclusion',
    categoryHe: 'הכלה והפרדה',
    name: 'Inclusion-Exclusion (2 Events)',
    nameHe: 'עקרון ההכלה וההפרדה (2 מאורעות)',
    equation: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
    description: 'Calculates the probability of the union of two overlapping events by summing their individual probabilities and subtracting their intersection to avoid double-counting.',
    descriptionHe: 'מחשב את ההסתברות של איחוד שני מאורעות על ידי סכימת ההסתברויות שלהם והחסרת החיתוך ביניהם כדי למנוע ספירה כפולה.'
  },
  {
    id: 'inclusion-exclusion-3',
    courseId: 'prob',
    category: 'Inclusion-Exclusion',
    categoryHe: 'הכלה והפרדה',
    name: 'Inclusion-Exclusion (3 Events)',
    nameHe: 'עקרון ההכלה וההפרדה (3 מאורעות)',
    equation: 'P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)',
    description: 'Generalization of the inclusion-exclusion principle to three events, systematically adding and subtracting intersections to correct for multiple overlaps.',
    descriptionHe: 'הרחבה של עקרון ההכלה וההפרדה לשלושה מאורעות, המערבת חיבור והחסרה שיטתיים של חיתוך המאורעות כדי לתקן חפיפות מרובות.'
  },
  {
    id: 'conditional-probability',
    courseId: 'prob',
    category: 'Conditional & Bayes',
    categoryHe: 'הסתברות מותנית ובייס',
    name: 'Conditional Probability',
    nameHe: 'הסתברות מותנית',
    equation: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0',
    description: 'The probability of event A occurring given that event B has occurred, which effectively scales the sample space down to the conditioning event B.',
    descriptionHe: 'ההסתברות שמאורע A יתרחש בהינתן שמאורע B כבר התרחש, דבר המצמצם בפועל את מרחב המדגם כולו למאורע B.'
  },
  {
    id: 'law-total-probability',
    courseId: 'prob',
    category: 'Conditional & Bayes',
    categoryHe: 'הסתברות מותנית ובייס',
    name: 'Law of Total Probability',
    nameHe: 'חוק ההסתברות השלמה',
    equation: 'P(A) = \\sum_{i=1}^{n} P(A \\mid B_i) P(B_i)',
    description: 'Calculates the total probability of event A by summing its conditional probabilities across a partition of mutually exclusive and exhaustive events B_i.',
    descriptionHe: 'מחשב את ההסתברות הכוללת של מאורע A על ידי סכימת ההסתברויות המותנות שלו על פני חלוקה (פרטישן) של מאורעות זרים ומשלימים B_i.'
  },
  {
    id: 'bayes-theorem',
    courseId: 'prob',
    category: 'Conditional & Bayes',
    categoryHe: 'הסתברות מותנית ובייס',
    name: "Bayes' Theorem",
    nameHe: 'משפט בייס',
    equation: 'P(B_j \\mid A) = \\frac{P(A \\mid B_j) P(B_j)}{\\sum_{i=1}^{n} P(A \\mid B_i) P(B_i)}',
    description: 'Updates the prior probability of partition event B_j using newly observed evidence A by combining the conditional likelihoods and priors.',
    descriptionHe: 'מעדכן את ההסתברות המוקדמת (prior) של מאורע B_j בהינתן ראיה חדשה A שנצפתה בפועל, על ידי שילוב נראויות מותנות והסתברויות אפריוריות.'
  },

  // ==========================================
  // CHAPTER 1: CONTINUOUS RANDOM VARIABLES & PDF
  // ==========================================
  {
    id: 'single-point-probability',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'Single-Point Probability',
    nameHe: 'הסתברות בנקודה בודדת',
    equation: 'P(X = x) = 0, \\quad \\forall x \\in \\mathbb{R}',
    description: 'For any continuous random variable X, the probability of the variable taking any exact, isolated real value x is mathematically zero.',
    descriptionHe: 'עבור כל משתנה מקרי רציף X, ההסתברות שהמשתנה יקבל ערך ממשי בודד ומדויק x היא אפס מבחינה מתמטית.'
  },
  {
    id: 'cdf-definition',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'Cumulative Distribution Function (CDF)',
    nameHe: 'פונקציית התפלגות מצטברת (CDF)',
    equation: 'F_X(x) = P(X \\le x)',
    description: 'The cumulative distribution function represents the accumulated probability that a random variable X takes a value less than or equal to x.',
    descriptionHe: 'פונקציית ההתפלגות המצטברת מייצגת את ההסתברות המצטברת לכך שהמשתנה המקרי X יקבל ערך קטן או שווה ל-x.'
  },
  {
    id: 'cdf-monotonicity',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'CDF Monotonicity Property',
    nameHe: 'מונוטוניות פונקציית ההתפלגות',
    equation: 'x_1 < x_2 \\implies F_X(x_1) \\le F_X(x_2)',
    description: 'The cumulative distribution function is non-decreasing; as the upper bound increases, the accumulated probability cannot decrease.',
    descriptionHe: 'פונקציית ההתפלגות המצטברת היא פונקציה מונוטונית לא יורדת; ככל שערך החסם העליון גדל, ההסתברות המצטברת אינה יכולה לקטון.'
  },
  {
    id: 'cdf-boundary-limits',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'CDF Boundary Limits',
    nameHe: 'גבולות פונקציית ההתפלגות בקצוות',
    equation: '\\lim_{x \\to -\\infty} F_X(x) = 0, \\quad \\lim_{x \\to \\infty} F_X(x) = 1',
    description: 'As the threshold approaches negative infinity, the accumulated probability goes to zero; as it approaches positive infinity, the probability goes to one.',
    descriptionHe: 'כאשר הסף שואף למינוס אינסוף, ההסתברות המצטברת שואפת לאפס; כאשר הוא שואף לפלוס אינסוף, ההסתברות המצטברת שואפת ל-1.'
  },
  {
    id: 'cdf-right-continuity',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'CDF Right-Continuity',
    nameHe: 'רציפות מימין של פונקציית ההתפלגות',
    equation: '\\lim_{h \\to 0^+} F_X(x + h) = F_X(x)',
    description: 'The CDF is continuous from the right at every point, meaning the limit as h approaches 0 from the positive side equals the function value.',
    descriptionHe: 'פונקציית ההתפלגות המצטברת רציפה מימין בכל נקודה, כלומר הגבול כאשר h שואף ל-0 מהצד החיובי שווה לערך הפונקציה בנקודה.'
  },
  {
    id: 'cdf-interval-probability',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'CDF Interval Probability',
    nameHe: 'הסתברות קטע באמצעות פונקציית ההתפלגות',
    equation: 'P(a < X \\le b) = F_X(b) - F_X(a)',
    description: 'The probability that a continuous random variable falls in the interval (a, b] is given by the difference between the CDF values at the boundaries.',
    descriptionHe: 'ההסתברות שמשתנה מקרי רציף יפול בקטע חצי פתוח (a, b] ניתנת על ידי ההפרש בין ערכי ה-CDF בגבולות הקטע.'
  },
  {
    id: 'pdf-definition',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'Probability Density Function (PDF)',
    nameHe: 'פונקציית צפיפות הסתברות (PDF)',
    equation: 'f_X(x) = \\frac{d}{dx} F_X(x)',
    description: 'The PDF is the derivative of the CDF, representing the rate of probability accumulation or density at any given point x.',
    descriptionHe: 'פונקציית הצפיפות היא הנגזרת של פונקציית ההתפלגות המצטברת, המייצגת את קצב צבירת ההסתברות או את צפיפותה בכל נקודה x.',
  },
  {
    id: 'pdf-non-negativity',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'PDF Non-Negativity Property',
    nameHe: 'אי-שליליות פונקציית הצפיפות',
    equation: 'f_X(x) \\ge 0, \\quad \\forall x \\in \\mathbb{R}',
    description: 'The probability density function can never be negative because accumulated probability is a non-decreasing measure.',
    descriptionHe: 'פונקציית צפיפות ההסתברות לעולם אינה יכולה להיות שלילית, מכיוון שההסתברות המצטברת היא מידה מונוטונית לא יורדת.',
  },
  {
    id: 'pdf-normalization',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'PDF Normalization Constraint',
    nameHe: 'תנאי הנרמול של פונקציית הצפיפות',
    equation: '\\int_{-\\infty}^{\\infty} f_X(x) dx = 1',
    description: 'The total area under the entire probability density function curve must integrate to exactly one, representing certain probability over the real line.',
    descriptionHe: 'השטח הכולל מתחת לעקומת פונקציית צפיפות ההסתברות כולה חייב להיות שווה בדיוק ל-1, דבר המייצג מאורע ודאי מעל הישר הממשי.',
  },
  {
    id: 'pdf-interval-integration',
    courseId: 'prob',
    category: 'Continuous Variables',
    categoryHe: 'משתנים מקריים רציפים',
    name: 'PDF Interval Integration',
    nameHe: 'חישוב הסתברות קטע באמצעות פונקציית צפיפות',
    equation: 'P(a \\le X \\le b) = \\int_{a}^{b} f_X(x) dx',
    description: 'The probability that a continuous random variable X lies in the interval [a, b] is represented by the definite integral of its PDF over that interval.',
    descriptionHe: 'ההסתברות שמשתנה מקרי רציף X יימצא בקטע [a, b] מיוצגת על ידי האינטגרל המסוים של פונקציית הצפיפות שלו מעל קטע זה.',
  },

  // ==========================================
  // CHAPTER 2: SPECIAL CONTINUOUS DISTRIBUTIONS
  // ==========================================
  {
    id: 'uniform-pdf-cdf',
    courseId: 'prob',
    category: 'Continuous Distributions',
    categoryHe: 'התפלגויות רציפות',
    name: 'Uniform Distribution PDF & CDF',
    nameHe: 'פונקציית צפיפות והתפלגות של התפלגות אחידה רציפה',
    equation: 'f_X(x) = \\begin{cases} \\frac{1}{b-a} & a \\le x \\le b \\\\ 0 & \\text{otherwise} \\end{cases}, \\quad F_X(x) = \\begin{cases} 0 & x < a \\\\ \\frac{x-a}{b-a} & a \\le x \\le b \\\\ 1 & x > b \\end{cases}',
    description: 'Models a continuous random variable X where all intervals of equal length in the support [a, b] are equally likely to occur.',
    descriptionHe: 'מדלגת משתנה מקרי רציף X שבו לכל התתי-קטעים בעלי אורך שווה בתוך התומך [a, b] יש הסתברות שווה להתרחש.'
  },
  {
    id: 'uniform-expectation-variance',
    courseId: 'prob',
    category: 'Continuous Distributions',
    categoryHe: 'התפלגויות רציפות',
    name: 'Uniform Expectation & Variance',
    nameHe: 'תוחלת ושונות של התפלגות אחידה',
    equation: '\\mathbb{E}[X] = \\frac{a+b}{2}, \\quad \\text{Var}(X) = \\frac{(b-a)^2}{12}',
    description: 'The expected value (mean) of a uniform distribution is the midpoint of its support, and the variance measures the spread squared divided by 12.',
    descriptionHe: 'התוחלת (הממוצע) של התפלגות אחידה היא נקודת האמצע של התומך שלה, והשונות מודדת את פיזור הערכים הריבועי מחולק ב-12.'
  },
  {
    id: 'exponential-pdf-cdf',
    courseId: 'prob',
    category: 'Continuous Distributions',
    categoryHe: 'התפלגויות רציפות',
    name: 'Exponential Distribution PDF & CDF',
    nameHe: 'פונקציית צפיפות והתפלגות של התפלגות מעריכית',
    equation: 'f_X(x) = \\begin{cases} \\lambda e^{-\\lambda x} & x \\ge 0 \\\\ 0 & \\text{otherwise} \\end{cases}, \\quad F_X(x) = \\begin{cases} 1 - e^{-\\lambda x} & x \\ge 0 \\\\ 0 & x < 0 \\end{cases}',
    description: 'Models the time elapsed between independent Poisson events occurring at a constant average rate lambda.',
    descriptionHe: 'מדלגת את הזמן החולף בין מאורעות פואסוניים בלתי תלויים המתרחשים בקצב ממוצע קבוע למדא.'
  },
  {
    id: 'exponential-expectation-variance',
    courseId: 'prob',
    category: 'Continuous Distributions',
    categoryHe: 'התפלגויות רציפות',
    name: 'Exponential Expectation & Variance',
    nameHe: 'תוחלת ושונות של התפלגות מעריכית',
    equation: '\\mathbb{E}[X] = \\frac{1}{\\lambda}, \\quad \\text{Var}(X) = \\frac{1}{\\lambda^2}',
    description: 'The expected value (mean time to next event) is the reciprocal of the rate parameter lambda, and the standard deviation is equal to the mean.',
    descriptionHe: 'התוחלת (זמן ההמתנה הממוצע למאורע הבא) היא ההופכי של פרמטר הקצב למדא, וסטיית התקן שווה לתוחלת.'
  },
  {
    id: 'memoryless-property',
    courseId: 'prob',
    category: 'Continuous Distributions',
    categoryHe: 'התפלגויות רציפות',
    name: 'Memoryless Property',
    nameHe: 'תכונת חוסר הזיכרון',
    equation: 'P(X \\ge s + t \\mid X \\ge s) = P(X \\ge t), \\quad \\forall s, t \\ge 0',
    description: 'For an exponential random variable, the probability of surviving an additional time t is independent of how long the system has already survived.',
    descriptionHe: 'עבור משתנה מקרי מעריכית, ההסתברות שרכיב ישרוד פרק זמן נוסף t אינה תלויה בכלל במשך הזמן s שהמערכת כבר שרדה עד כה.',
  },
  {
    id: 'minimum-of-exponentials',
    courseId: 'prob',
    category: 'Continuous Distributions',
    categoryHe: 'התפלגויות רציפות',
    name: 'Minimum of Independent Exponentials',
    nameHe: 'מינימום של משתנים מעריכיים בלתי תלויים',
    equation: 'Y = \\min(X_1, \\dots, X_m) \\sim \\text{Exp}\\left(\\sum_{i=1}^{m} \\lambda_i\\right)',
    description: 'If X_1, ..., X_m are independent exponentially distributed random variables with rates lambda_1, ..., lambda_m, then their minimum is also exponentially distributed with a rate equal to the sum of their individual rates.',
    descriptionHe: 'אם X_1, ..., X_m הם משתנים מקריים בלתי תלויים המתפלגים מעריכית עם קצבים למדא_1, ..., למדא_m, אזי המינימום ביניהם מתפלג גם הוא מעריכית עם קצב ששווה לסכום קצביהם האינדיבידואליים.',
  },

  // ==========================================
  // CHAPTER 3: DISCRETE RANDOM VARIABLES
  // ==========================================
  {
    id: 'discrete-pmf-properties',
    courseId: 'prob',
    category: 'Discrete Variables',
    categoryHe: 'משתנים מקריים בדידים',
    name: 'Probability Mass Function (PMF) Constraints',
    nameHe: 'תכונות פונקציית הסתברות (PMF) דיסקרטית',
    equation: 'p_X(x) = P(X = x), \\quad p_X(x) \\ge 0, \\quad \\sum_{x \\in S} p_X(x) = 1',
    description: 'The PMF maps each countable outcome to its exact probability; these values must be non-negative and sum to exactly 1 over the support S.',
    descriptionHe: 'פונקציית ההסתברות מתאימה לכל תוצאה בדידה את ההסתברות המדויקת שלה; ערכים אלו חייבים להיות אי-שליליים ולסכום ל-1 בדיוק מעל התומך S.'
  },
  {
    id: 'discrete-expectation',
    courseId: 'prob',
    category: 'Discrete Variables',
    categoryHe: 'משתנים מקריים בדידים',
    name: 'Discrete Expected Value',
    nameHe: 'תוחלת של משתנה מקרי דיסקרטי',
    equation: '\\mathbb{E}[X] = \\sum_{x \\in S} x \\cdot p_X(x)',
    description: 'Calculates the center of mass or average value of a discrete random variable X by summing all possible values weighted by their probabilities.',
    descriptionHe: 'מחשב את מרכז הכובד או הערך הממוצע של משתנה מקרי דיסקרטי X על ידי סכימת כל הערכים האפשריים כשהם משוקללים בהסתברויות שלהם.'
  },
  {
    id: 'discrete-lotus',
    courseId: 'prob',
    category: 'Discrete Variables',
    categoryHe: 'משתנים מקריים בדידים',
    name: 'Law of the Unconscious Statistician (Discrete LOTUS)',
    nameHe: 'חוק הסטטיסטיקאי ההמום (LOTUS) הדיסקרטי',
    equation: '\\mathbb{E}[h(X)] = \\sum_{x \\in S} h(x) \\cdot p_X(x)',
    description: 'Computes the expectation of a transformed variable h(X) directly using the PMF of X, without first finding the PMF of the new variable h(X).',
    descriptionHe: 'מחשב את התוחלת של משתנה מותמר h(X) ישירות מתוך פונקציית ההסתברות המקורית של X, ללא צורך למצוא תחילה את התפלגותו של המשתנה החדש h(X).'
  },
  {
    id: 'discrete-variance',
    courseId: 'prob',
    category: 'Discrete Variables',
    categoryHe: 'משתנים מקריים בדידים',
    name: 'Discrete Variance Identity',
    nameHe: 'נוסחת השונות של משתנה דיסקרטי',
    equation: '\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2, \\quad \\mathbb{E}[X^2] = \\sum_{x \\in S} x^2 \\cdot p_X(x)',
    description: 'Measures the spread of a discrete random variable by taking the expected value of its squared distance from the mean.',
    descriptionHe: 'מודד את פיזורו של משתנה מקרי דיסקרטי על ידי חישוב התוחלת של מרחקו הריבועי מהממוצע, ומפושט באמצעות נוסחת העזר הנוחה.'
  },
  {
    id: 'binomial-distribution',
    courseId: 'prob',
    category: 'Discrete Distributions',
    categoryHe: 'התפלגויות בדידות',
    name: 'Binomial Distribution PMF & Expectation',
    nameHe: 'התפלגות בינומית: PMF ותוחלת',
    equation: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad \\mathbb{E}[X] = np, \\quad \\text{Var}(X) = np(1-p)',
    description: 'Models the number of successes in n independent Bernoulli trials, each having a success probability p.',
    descriptionHe: 'מדלגת את מספר ההצלחות בתוך סדרה של n ניסויי ברנולי בלתי תלויים, כאשר לכל ניסוי יש הסתברות הצלחה קבועה p.'
  },
  {
    id: 'geometric-distribution',
    courseId: 'prob',
    category: 'Discrete Distributions',
    categoryHe: 'התפלגויות בדידות',
    name: 'Geometric Distribution PMF & Expectation',
    nameHe: 'התפלגות גיאומטרית: PMF ותוחלת',
    equation: 'P(X = k) = (1-p)^{k-1} p, \\quad \\mathbb{E}[X] = \\frac{1}{p}, \\quad \\text{Var}(X) = \\frac{1-p}{p^2}',
    description: 'Models the number of independent Bernoulli trials required to achieve the very first success.',
    descriptionHe: 'מדלגת את מספר ניסויי ברנולי הבלתי תלויים הנדרשים עד לקבלת ההצלחה הראשונה ביותר בסדרה.'
  },
  {
    id: 'poisson-distribution',
    courseId: 'prob',
    category: 'Discrete Distributions',
    categoryHe: 'התפלגויות בדידות',
    name: 'Poisson Distribution PMF & Expectation',
    nameHe: 'התפלגות פואסון: PMF ותוחלת',
    equation: 'P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}, \\quad \\mathbb{E}[X] = \\lambda, \\quad \\text{Var}(X) = \\lambda',
    description: 'Models the number of independent events occurring in a fixed interval with a constant average rate lambda.',
    descriptionHe: 'מדלגת את מספר המאורעות הבלתי תלויים המתרחשים בתוך פרק זמן קבוע או מרחב מוגדר, תחת קצב ממוצע קבוע למדא.'
  },
  {
    id: 'hypergeometric-distribution',
    courseId: 'prob',
    category: 'Discrete Distributions',
    categoryHe: 'התפלגויות בדידות',
    name: 'Hypergeometric Distribution PMF & Expectation',
    nameHe: 'התפלגות היפרגיאומטרית: PMF ותוחלת',
    equation: 'P(X = k) = \\frac{\\binom{D}{k} \\binom{N-D}{n-k}}{\\binom{N}{n}}, \\quad \\mathbb{E}[X] = n \\frac{D}{N}',
    description: 'Models the number of successes in a sample of size n drawn without replacement from a population of size N containing D successes.',
    descriptionHe: 'מדלגת את מספר ההצלחות במדגם בגודל n הנלקח ללא החזרה מתוך אוכלוסייה בגודל N המכילה בסך הכל D פריטים מוגדרים כהצלחה.'
  },

  // ==========================================
  // CHAPTER 4: JOINT DISTRIBUTIONS & INEQUALITIES
  // ==========================================
  {
    id: 'joint-pdf-normalization',
    courseId: 'prob',
    category: 'Joint Distributions',
    categoryHe: 'התפלגויות משותפות',
    name: 'Joint Continuous PDF Normalization',
    nameHe: 'תנאי הנרמול של פונקציית צפיפות משותפת רציפה',
    equation: '\\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} f_{X,Y}(x, y) dx dy = 1',
    description: 'The total volume under the entire joint probability density function must integrate to exactly 1.',
    descriptionHe: 'הנפח הכולל מתחת למשטח פונקציית צפיפות ההסתברות המשותפת של שני משתנים רציפים חייב להסתכם בדיוק ל-1.'
  },
  {
    id: 'marginal-pdf-continuous',
    courseId: 'prob',
    category: 'Joint Distributions',
    categoryHe: 'התפלגויות משותפות',
    name: 'Marginal Density Functions',
    nameHe: 'פונקציות צפיפות שוליות',
    equation: 'f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x, y) dy, \\quad f_Y(y) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x, y) dx',
    description: 'Calculates the individual probability density functions of X and Y from their joint PDF by integrating out the other variable.',
    descriptionHe: 'מחלץ את פונקציות הצפיפות האינדיבידואליות של X ושל Y מתוך הצפיפות המשותפת שלהם על ידי ביצוע אינטגרציה מעל המשתנה השני.'
  },
  {
    id: 'covariance-definition',
    courseId: 'prob',
    category: 'Joint Distributions',
    categoryHe: 'התפלגויות משותפות',
    name: 'Covariance Definition & Identity',
    nameHe: 'הגדרת השונות המשותפת (קובריאנס) ונוסחת העזר',
    equation: '\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mathbb{E}[X])(Y - \\mathbb{E}[Y])] = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]',
    description: 'Measures the linear relationship between two random variables by subtracting the product of their individual means from the expectation of their product.',
    descriptionHe: 'מודד את עוצמת הקשר הליניארי בין שני משתנים מקריים על ידי הפחתת מכפלת התוחלות שלהם מתוך התוחלת של המכפלה שלהם.'
  },
  {
    id: 'variance-of-sum-two',
    courseId: 'prob',
    category: 'Joint Distributions',
    categoryHe: 'התפלגויות משותפות',
    name: 'Variance of a Sum (2 Variables)',
    nameHe: 'שונות של סכום שני משתנים מקריים',
    equation: '\\text{Var}(X \\pm Y) = \\text{Var}(X) + \\text{Var}(Y) \\pm 2\\text{Cov}(X, Y)',
    description: 'The variance of a sum or difference of two random variables is the sum of their variances plus or minus twice their covariance.',
    descriptionHe: 'השונות של סכום או הפרש של שני משתנים מקריים שווה לסכום השונויות שלהם בתוספת או הפחתה של פעמיים השונות המשותפת ביניהם.'
  },
  {
    id: 'pearson-correlation',
    courseId: 'prob',
    category: 'Joint Distributions',
    categoryHe: 'התפלגויות משותפות',
    name: 'Pearson Correlation Coefficient',
    nameHe: 'מקדם המתאם של פירסון',
    equation: '\\rho_{X,Y} = \\frac{\\text{Cov}(X, Y)}{\\sqrt{\\text{Var}(X)\\text{Var}(Y)}}',
    description: 'Dimensionless, normalized measure of the linear correlation between two variables, bounded between -1 and 1.',
    descriptionHe: 'מדד חסר ממדים ומנורמל לקשר הליניארי בין שני משתנים מקריים, החסום תמיד בערכים שבין מינוס 1 לפלוס 1.'
  },
  {
    id: 'markov-inequality',
    courseId: 'prob',
    category: 'Probability Inequalities',
    categoryHe: 'אי-שוויונות',
    name: "Markov's Inequality",
    nameHe: 'אי-שוויון מרקוב',
    equation: 'P(X \\ge c) \\le \\frac{\\mathbb{E}[X]}{c}, \\quad X \\ge 0, \\quad c > 0',
    description: 'Bounds the tail probability of a non-negative random variable X using only its mathematical expectation.',
    descriptionHe: 'חוסם את הסתברות הזנב של משתנה מקרי אי-שלילי X על סמך ידיעת התוחלת המתמטית שלו בלבד.'
  },
  {
    id: 'chebyshev-inequality',
    courseId: 'prob',
    category: 'Probability Inequalities',
    categoryHe: 'אי-שוויונות',
    name: "Chebyshev's Inequality",
    nameHe: "אי-שוויון צ'בישב",
    equation: 'P(|X - \\mu| \\ge c) \\le \\frac{\\text{Var}(X)}{c^2}, \\quad c > 0',
    description: 'Bounds the probability that any random variable X deviates from its mean mu by c or more using its variance.',
    descriptionHe: 'חוסם את ההסתברות שמשתנה מקרי כלשהו X יסטה מהתוחלת שלו במרחק העולה על c, באמצעות שימוש בשונות המשתנה.'
  },
  {
    id: 'hoeffding-inequality',
    courseId: 'prob',
    category: 'Probability Inequalities',
    categoryHe: 'אי-שוויונות',
    name: "Hoeffding's Concentration Inequality",
    nameHe: 'אי-שוויון הריכוזיות של הפדינג',
    equation: 'P(|\\bar{X}_n - p| \\ge \\epsilon) \\le 2 e^{-2n\\epsilon^2}',
    description: 'Exponential concentration bound for the sample mean of independent Bernoulli trials around their true probability parameter.',
    descriptionHe: 'חסם ריכוזיות מעריכי הדוק עבור ממוצע מדגם של ניסויי ברנולי עצמאיים סביב פרמטר ההסתברות האמיתי שלהם.'
  },
  {
    id: 'mills-inequality',
    courseId: 'prob',
    category: 'Probability Inequalities',
    categoryHe: 'אי-שוויונות',
    name: "Mill's Inequality",
    nameHe: 'אי-שוויון מיל',
    equation: 'P(Z \\ge x) \\le \\frac{\\phi(x)}{x} = \\frac{e^{-x^2/2}}{x\\sqrt{2\\pi}}, \\quad P(|Z| \\ge x) \\le \\sqrt{\\frac{2}{\\pi}} \\frac{e^{-x^2/2}}{x} = \\frac{2\\phi(x)}{x}, \\quad \\left(\\frac{1}{x} - \\frac{1}{x^3}\\right)\\phi(x) \\le P(Z \\ge x) \\le \\frac{\\phi(x)}{x}',
    description: 'Provides a highly accurate tail bound for a standard normal distribution without requiring numerical CDF integration.',
    descriptionHe: 'חוסם את הסתברות הזנב של משתנה נורמלי סטנדרטי Z ללא צורך בחישוב נומרי מורכב של פונקציית ההתפלגות המצטברת.'
  },
  {
    id: 'cauchy-schwarz-inequality',
    courseId: 'prob',
    category: 'Probability Inequalities',
    categoryHe: 'אי-שוויונות',
    name: 'Cauchy-Schwarz Inequality',
    nameHe: 'אי-שוויון קושי-שוורץ',
    equation: '(\\mathbb{E}[XY])^2 \\le \\mathbb{E}[X^2]\\mathbb{E}[Y^2]',
    description: 'Fundamental algebraic bound for the expectation of a product of two random variables with finite second moments.',
    descriptionHe: 'אי-שוויון אלגברי יסודי עבור התוחלת של מכפלת שני משתנים מקריים בעלי מומנט שני סופי.'
  },
  {
    id: 'jensen-inequality',
    courseId: 'prob',
    category: 'Probability Inequalities',
    categoryHe: 'אי-שוויונות',
    name: "Jensen's Inequality",
    nameHe: 'אי-שוויון ינסן',
    equation: '\\mathbb{E}[g(X)] \\ge g(\\mathbb{E}[X]) \\quad (g \\text{ is convex})',
    description: 'Relates the expectation of a transformed variable to the transformation of its expected value using convexity.',
    descriptionHe: 'מקשר בין התוחלת של פונקציה המופעלת על משתנה מקרי לבין הפעלת הפונקציה על התוחלת שלו, תוך שימוש בקמירות.'
  },

  // ==========================================
  // CHAPTER 5: MOMENT GENERATING FUNCTIONS
  // ==========================================
  {
    id: 'mgf-definition',
    courseId: 'prob',
    category: 'Moment Generating Functions',
    categoryHe: 'פונקציות יוצרות מומנטים',
    name: 'Moment Generating Function (MGF) Definition',
    nameHe: 'הגדרת פונקציה יוצרת מומנטים (MGF)',
    equation: 'M_X(t) = \\mathbb{E}[e^{tX}] = \\begin{cases} \\sum_{x} e^{tx} p_X(x) & \\text{(Discrete)} \\\\ \\int_{-\\infty}^{\\infty} e^{tx} f_X(x) dx & \\text{(Continuous)} \\end{cases}',
    description: "Defines the Moment Generating Function as the mathematical expectation of e^{tX}. It acts as a unique functional wrapper for a distribution's moments.",
    descriptionHe: 'מגדיר את הפונקציה יוצרת המומנטים כתוחלת המתמטית של e^{tX}. היא משמשת כמעטפת פונקציונלית ייחודית המכילה את כל מומנטי ההתפלגות.'
  },
  {
    id: 'mgf-moment-generation',
    courseId: 'prob',
    category: 'Moment Generating Functions',
    categoryHe: 'פונקציות יוצרות מומנטים',
    name: 'Moment Generation Property',
    nameHe: 'תכונת יצירת המומנטים',
    equation: '\\mathbb{E}[X^n] = M_X^{(n)}(0), \\quad \\text{Var}(X) = M_X\'\'(0) - \\left(M_X\'(0)\\right)^2',
    description: 'The n-th moment of X is obtained by evaluating the n-th derivative of its MGF at t=0.',
    descriptionHe: 'ניתן לחשב את המומנט ה-n של משתנה מקרי על ידי גזירת פונקציית ה-MGF שלו n פעמים והצבת t=0.'
  },
  {
    id: 'mgf-linear-transformation',
    courseId: 'prob',
    category: 'Moment Generating Functions',
    categoryHe: 'פונקציות יוצרות מומנטים',
    name: 'MGF Linear Transformation',
    nameHe: 'טרנספורמציה ליניארית של MGF',
    equation: 'M_{aX+b}(t) = e^{bt} M_X(at)',
    description: 'Shifting a random variable by constant b scales its MGF by e^{bt}, and scaling it by a scales the parameter t to at.',
    descriptionHe: 'הזזה של משתנה מקרי בקבוע b מכפילה את ה-MGF שלו ב-e^{bt}, וכפל שלו בקבוע a מכפיל את משתנה העזר t ל-at.'
  },
  {
    id: 'mgf-independent-sums',
    courseId: 'prob',
    category: 'Moment Generating Functions',
    categoryHe: 'פונקציות יוצרות מומנטים',
    name: 'MGF of Independent Sums',
    nameHe: 'MGF של סכום משתנים בלתי תלויים',
    equation: 'M_{\\sum_{i=1}^n X_i}(t) = \\prod_{i=1}^n M_{X_i}(t)',
    description: 'The MGF of a sum of independent random variables is the product of their individual MGFs.',
    descriptionHe: 'פונקציית ה-MGF של סכום משתנים מקריים בלתי תלויים שווה למכפלת פונקציות ה-MGF האינדיבידואליות שלהם.'
  },
  {
    id: 'mgf-common-distributions',
    courseId: 'prob',
    category: 'Moment Generating Functions',
    categoryHe: 'פונקציות יוצרות מומנטים',
    name: 'Common MGF Reference Table',
    nameHe: 'טבלת ייחוס של MGF נפוצים',
    equation: 'M_{\\text{Geom}}(t) = \\frac{p e^t}{1 - q e^t}, \\quad M_{\\text{Exp}}(t) = \\frac{\\lambda}{\\lambda - t}, \\quad M_{\\text{Poisson}}(t) = e^{\\lambda(e^t-1)}, \\quad M_{\\text{Normal}}(t) = e^{\\mu t + \\frac{1}{2}\\sigma^2 t^2}',
    description: 'Quick reference formulas for standard discrete and continuous distributions (Geometric, Exponential, Poisson, and Normal).',
    descriptionHe: 'נוסחאות ייחוס מהירות עבור התפלגויות סטנדרטיות בדידות ורציפות נפוצות (גיאומטרית, מעריכית, פואסון ונורמלית).'
  },

  // ==========================================
  // CHAPTER 6: LIMIT THEOREMS & CONVERGENCE
  // ==========================================
  {
    id: 'wlln-formula',
    courseId: 'prob',
    category: 'Limit Theorems',
    categoryHe: 'משפטי גבול והתכנסות',
    name: 'Weak Law of Large Numbers (WLLN)',
    nameHe: 'החוק החלש של המספרים הגדולים',
    equation: '\\lim_{n \\to \\infty} P(|\\bar{X}_n - \\mu| \\ge \\epsilon) = 0',
    description: 'States that the sample mean of a sequence of i.i.d. random variables converges in probability to the theoretical population mean.',
    descriptionHe: 'קובע כי ממוצע המדגם של סדרת משתנים מקריים בלתי תלויים ובעלי התפלגות זהה מתכנס בהסתברות אל התוחלת התאורטית באוכלוסייה.'
  },
  {
    id: 'clt-formula',
    courseId: 'prob',
    category: 'Limit Theorems',
    categoryHe: 'משפטי גבול והתכנסות',
    name: 'Central Limit Theorem (CLT)',
    nameHe: 'משפט הגבול המרכזי',
    equation: '\\lim_{n \\to \\infty} P\\left(\\frac{\\sum_{i=1}^n X_i - n\\mu}{\\sigma\\sqrt{n}} \\le z\\right) = \\Phi(z)',
    description: 'States that the sum or average of a large number of independent, identically distributed random variables will be approximately normally distributed, regardless of the original distribution.',
    descriptionHe: 'קובע כי סכום או ממוצע של מספר רב של משתנים מקריים בלתי תלויים ובעלי התפלגות זהה יתפלג בקירוב נורמלית, ללא קשר להתפלגותם המקורית.'
  },

  // ==========================================
  // CHAPTER 7: METHOD OF MOMENTS ESTIMATION (MME)
  // ==========================================
  {
    id: 'moments-comparison',
    courseId: 'stats',
    category: 'Method of Moments',
    categoryHe: 'שיטת המומנטים',
    name: 'Population vs. Sample Moments',
    nameHe: 'מומנטים באוכלוסייה מול מומנטים במדגם',
    equation: '\\mu_k = \\mathbb{E}[X^k], \\quad \\hat{\\mu}_k = \\frac{1}{n} \\sum_{i=1}^n X_i^k',
    description: 'The standard formulas for theoretical population moments and their empirical sample counterparts.',
    descriptionHe: 'הנוסחאות הסטנדרטיות עבור מומנטים תאורטיים של האוכלוסייה מול עמיתיהם האמפיריים במדגם.'
  },
  {
    id: 'mme-system',
    courseId: 'stats',
    category: 'Method of Moments',
    categoryHe: 'שיטת המומנטים',
    name: 'Method of Moments System',
    nameHe: 'מערכת משוואות של שיטת המומנטים',
    equation: '\\mathbb{E}[X^k] = \\frac{1}{n} \\sum_{i=1}^n X_i^k, \\quad k = 1, \\dots, m',
    description: 'Constructs estimators by equating the population moments to the sample moments and solving for the unknown parameters.',
    descriptionHe: 'בונה אומדים על ידי השוואת המומנטים של האוכלוסייה למומנטים של המדגם ופתרון עבור הפרמטרים הלא ידועים.'
  },

  // ==========================================
  // CHAPTER 8: MAXIMUM LIKELIHOOD ESTIMATION (MLE)
  // ==========================================
  {
    id: 'likelihood-func',
    courseId: 'stats',
    category: 'Maximum Likelihood',
    categoryHe: 'אמידת נראות מרבית',
    name: 'Likelihood Function',
    nameHe: 'פונקציית הנראות',
    equation: 'L(\\theta) = \\prod_{i=1}^n f(X_i; \\theta)',
    description: 'The joint PDF/PMF of the sample evaluated as a function of the parameter theta.',
    descriptionHe: 'הצפיפות המשותפת או פונקציית ההסתברות המשותפת של המדגם, המוערכת כפונקציה של הפרמטר.'
  },
  {
    id: 'log-likelihood-func',
    courseId: 'stats',
    category: 'Maximum Likelihood',
    categoryHe: 'אמידת נראות מרבית',
    name: 'Log-Likelihood Function',
    nameHe: 'פונקציית הלוג-נראות',
    equation: '\\ell(\\theta) = \\sum_{i=1}^n \\ln f(X_i; \\theta)',
    description: 'The natural logarithm of the likelihood function, simplifying products into sums.',
    descriptionHe: 'הלוגריתם הטבעי של פונקציית הנראות, המפשט מכפלות לכדי סכומים.'
  },
  {
    id: 'score-equation',
    courseId: 'stats',
    category: 'Maximum Likelihood',
    categoryHe: 'אמידת נראות מרבית',
    name: 'Score Function & Score Equation',
    nameHe: 'פונקציית הציון ומשוואת הציונים',
    equation: 'U(\\theta) = \\frac{\\partial}{\\partial \\theta} \\ell(\\theta) = 0',
    description: 'The derivative of the log-likelihood function set to zero to find parameter candidates.',
    descriptionHe: 'הנגזרת של פונקציית הלוג-נראות אשר מושווית לאפס כדי למצוא מועמדים לאומד.'
  },
  {
    id: 'mle-invariance',
    courseId: 'stats',
    category: 'Maximum Likelihood',
    categoryHe: 'אמידת נראות מרבית',
    name: 'Invariance Property',
    nameHe: 'תכונת האי-שתנות',
    equation: '\\hat{\\tau}_{MLE} = g(\\hat{\\theta}_{MLE})',
    description: "The MLE of any transformed parameter g(theta) is simply the function evaluated at the original parameter's MLE.",
    descriptionHe: 'אומד הנראות המרבית של כל פרמטר מותמר הוא פשוט הפונקציה המופעלת על אומד הנראות המרבית המקורי.'
  },

  // ==========================================
  // CHAPTER 9: CONFIDENCE INTERVALS (CI)
  // ==========================================
  {
    id: 'general-ci-form',
    courseId: 'stats',
    category: 'Confidence Intervals',
    categoryHe: 'מרווחי סמך',
    name: 'General Confidence Interval',
    nameHe: 'מרווח סמך כללי',
    equation: 'P(L(X) \\le \\theta \\le U(X)) = 1 - \\alpha',
    description: 'Defines an interval range that captures the true parameter with probability 1-alpha.',
    descriptionHe: 'מגדיר טווח מרווח הלוכד את הפרמטר האמיתי בהסתברות של 1 פחות אלפא.'
  },
  {
    id: 'z-interval-mean',
    courseId: 'stats',
    category: 'Confidence Intervals',
    categoryHe: 'מרווחי סמך',
    name: 'Z-Interval for Mean (Known Variance)',
    nameHe: 'מרווח סמך Z לתוחלת (שונות ידועה)',
    equation: '\\bar{X} \\pm z_{1-\\alpha/2} \\frac{\\sigma}{\\sqrt{n}}',
    description: 'Confidence interval for the mean of a normal population when the variance is known.',
    descriptionHe: 'מרווח סמך עבור תוחלת של אוכלוסייה נורמלית כאשר השונות ידועה.'
  },
  {
    id: 't-interval-mean',
    courseId: 'stats',
    category: 'Confidence Intervals',
    categoryHe: 'מרווחי סמך',
    name: 't-Interval for Mean (Unknown Variance)',
    nameHe: 'מרווח סמך t לתוחלת (שונות לא ידועה)',
    equation: '\\bar{X} \\pm t_{1-\\alpha/2, n-1} \\frac{S}{\\sqrt{n}}',
    description: 'Confidence interval for the mean of a normal population when the variance is unknown.',
    descriptionHe: 'מרווח סמך עבור תוחלת של אוכלוסייה נורמלית כאשר השונות אינה ידועה.'
  },
  {
    id: 'wald-proportion-ci',
    courseId: 'stats',
    category: 'Confidence Intervals',
    categoryHe: 'מרווחי סמך',
    name: 'Wald Interval for Proportion',
    nameHe: 'מרווח סמך לפרופורציה',
    equation: '\\hat{p} \\pm z_{1-\\alpha/2} \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}',
    description: 'Normal approximation confidence interval for a population proportion.',
    descriptionHe: 'מרווח סמך המבוסס על קירוב נורמלי עבור פרופורציה באוכלוסייה.'
  },
  {
    id: 'chi-square-variance-ci',
    courseId: 'stats',
    category: 'Confidence Intervals',
    categoryHe: 'מרווחי סמך',
    name: 'Chi-Square Interval for Variance',
    nameHe: 'מרווח סמך לשונות',
    equation: '\\left[ \\frac{(n-1)S^2}{\\chi^2_{1-\\alpha/2, n-1}}, \\frac{(n-1)S^2}{\\chi^2_{\\alpha/2, n-1}} \\right]',
    description: 'Confidence interval for the variance of a normal population using Chi-Square distribution.',
    descriptionHe: 'מרווח סמך עבור השונות של אוכלוסייה נורמלית בעזרת התפלגות חי בריבוע.'
  },

  // ==========================================
  // CHAPTER 10: HYPOTHESIS TESTING
  // ==========================================
  {
    id: 'z-test-statistic',
    courseId: 'stats',
    category: 'Hypothesis Testing',
    categoryHe: 'מבחני השערות',
    name: 'One-Sample Z-Test Statistic',
    nameHe: 'סטטיסטי מבחן Z למדגם יחיד',
    equation: 'Z = \\frac{\\bar{X} - \\mu_0}{\\sigma/\\sqrt{n}}',
    description: 'Computes the standard score for a sample mean under a known population variance.',
    descriptionHe: 'מחשב את ציון התקן עבור ממוצע מדגם תחת שונות אוכלוסייה ידועה.'
  },
  {
    id: 't-test-statistic',
    courseId: 'stats',
    category: 'Hypothesis Testing',
    categoryHe: 'מבחני השערות',
    name: 'One-Sample t-Test Statistic',
    nameHe: 'סטטיסטי מבחן t למדגם יחיד',
    equation: 't = \\frac{\\bar{X} - \\mu_0}{S/\\sqrt{n}}',
    description: 'Computes the test statistic for a sample mean under an unknown population variance.',
    descriptionHe: 'מחשב את סטטיסטי המבחן עבור ממוצע מדגם תחת שונות אוכלוסייה שאינה ידועה.'
  },
  {
    id: 'proportion-z-test',
    courseId: 'stats',
    category: 'Hypothesis Testing',
    categoryHe: 'מבחני השערות',
    name: 'Z-Test for Proportion',
    nameHe: 'מבחן Z לפרופורציה',
    equation: 'Z = \\frac{\\hat{p} - p_0}{\\sqrt{\\frac{p_0(1-p_0)}{n}}}',
    description: 'Normal approximation test statistic for a population proportion.',
    descriptionHe: 'סטטיסטי מבחן בקירוב נורמלי עבור פרופורציה באוכלוסייה.'
  },
  {
    id: 'p-value-def',
    courseId: 'stats',
    category: 'Hypothesis Testing',
    categoryHe: 'מבחני השערות',
    name: 'Definition of p-value',
    nameHe: 'הגדרת ערך ה-p (p-value)',
    equation: 'p\\text{-value} = P(\\text{Test Statistic} \\ge \\text{Observed Value} \\mid H_0 \\text{ is true})',
    description: 'The probability of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is correct.',
    descriptionHe: 'ההסתברות לקבלת תוצאות מבחן קיצוניות לפחות כמו אלו שנצפו, תחת ההנחה שהשערת האפס נכונה.'
  },
  {
    id: 'type2-error-power',
    courseId: 'stats',
    category: 'Hypothesis Testing',
    categoryHe: 'מבחני השערות',
    name: 'Type II Error & Power',
    nameHe: 'טעות מסוג שני ועוצמת המבחן',
    equation: '\\beta = P(\\text{Fail to Reject } H_0 \\mid H_1 \\text{ is true}), \\quad \\text{Power} = 1 - \\beta',
    description: 'The probability of failing to reject a false null hypothesis, and its complement representing the power of the test.',
    descriptionHe: 'ההסתברות שלא לדחות השערת אפס שקרית, והמשלים שלה המייצג את עוצמת המבחן.'
  }
,
  // ==========================================
  // CHAPTER 11: ADVANCED STATISTICAL METHODS (PROPERTIES & REGRESSION)
  // ==========================================
  {
    id: 'estimator-bias',
    courseId: 'stats',
    category: 'Estimator Properties',
    categoryHe: 'תכונות אומדים',
    name: 'Estimator Bias',
    nameHe: 'הטיית האומד',
    equation: '\\text{Bias}(\\hat{\\theta}) = \\mathbb{E}[\\hat{\\theta}] - \\theta',
    description: 'Measures the difference between the expected value of an estimator and the true parameter value.',
    descriptionHe: 'מודד את ההפרש בין התוחלת של האומד לבין ערכו האמיתי של הפרמטר.'
  },
  {
    id: 'estimator-mse',
    courseId: 'stats',
    category: 'Estimator Properties',
    categoryHe: 'תכונות אומדים',
    name: 'Mean Square Error (MSE)',
    nameHe: 'טעות ריבועית ממוצעת (MSE)',
    equation: '\\text{MSE}(\\hat{\\theta}) = \\text{Var}(\\hat{\\theta}) + [\\text{Bias}(\\hat{\\theta})]^2',
    description: 'Decomposes the overall squared error of an estimator into its variance and squared bias.',
    descriptionHe: 'מפרק את הטעות הריבועית הכוללת של אומד לשונות שלו ועוד ריבוע ההטיה שלו.'
  },
  {
    id: 'fisher-information',
    courseId: 'stats',
    category: 'Estimator Properties',
    categoryHe: 'תכונות אומדים',
    name: 'Fisher Information',
    nameHe: 'מידע פישר',
    equation: 'I(\\theta) = -n \\mathbb{E}\\left[ \\frac{\\partial^2}{\\partial \\theta^2} \\ln f(X; \\theta) \\right]',
    description: 'Measures the amount of information that an observable random variable X carries about an unknown parameter.',
    descriptionHe: 'מודד את כמות המידע שמשתנה מקרי תצפיתי X נושא אודות הפרמטר הלא ידוע.'
  },
  {
    id: 'cramer-rao-bound',
    courseId: 'stats',
    category: 'Estimator Properties',
    categoryHe: 'תכונות אומדים',
    name: 'Cramer-Rao Lower Bound',
    nameHe: 'חסם קרמר-ראו',
    equation: '\\text{Var}(\\hat{\\theta}) \\ge \\frac{1}{I(\\theta)}',
    description: 'States that the variance of any unbiased estimator is bounded from below by the reciprocal of the Fisher Information.',
    descriptionHe: 'קובע כי השונות של כל אומד בלתי מוטה חסומה מלמטה על ידי ההופכי של מידע פישר.'
  },
  {
    id: 'regression-slope',
    courseId: 'stats',
    category: 'Linear Regression',
    categoryHe: 'רגרסיה ליניארית',
    name: 'Least Squares Slope',
    nameHe: 'שיפוע בריבועים פחותים',
    equation: '\\hat{\\beta}_1 = \\frac{\\sum_{i=1}^n (X_i - \\bar{X})(Y_i - \\bar{Y})}{\\sum_{i=1}^n (X_i - \\bar{X})^2} = \\frac{\\text{Cov}(X, Y)}{\\text{Var}(X)}',
    description: 'The formula for estimating the slope of the simple linear regression line.',
    descriptionHe: 'הנוסחה לאמידת השיפוע של קו הרגרסיה הליניארית הפשוטה.'
  },
  {
    id: 'regression-intercept',
    courseId: 'stats',
    category: 'Linear Regression',
    categoryHe: 'רגרסיה ליניארית',
    name: 'Least Squares Intercept',
    nameHe: 'חותך בריבועים פחותים',
    equation: '\\hat{\\beta}_0 = \\bar{Y} - \\hat{\\beta}_1 \\bar{X}',
    description: 'The formula for estimating the y-intercept of the simple linear regression line.',
    descriptionHe: 'הנוסחה לאמידת החותך של קו הרגרסיה הליניארית הפשוטה.'
  }
];
