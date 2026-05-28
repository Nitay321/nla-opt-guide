// ============================================================
// 🧮 Probability & Statistics — Formula & Definition Data
// Overwritten entirely in ENGLISH for Phase 4 core tracking
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
    category: 'Matrix & Vector Norms',
    name: "Kolmogorov's Three Axioms",
    equation: 'P(A) \\ge 0, \\quad P(\\Omega) = 1, \\quad P\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = \\sum_{i=1}^{\\infty} P(A_i)',
    description: 'The foundational axioms of probability theory: Non-negativity of any event, Normalization of the entire sample space, and countable additivity of mutually disjoint events.'
  },
  {
    id: 'complement-rule',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Complement Rule',
    equation: 'P(A^c) = 1 - P(A)',
    description: 'The probability that an event does not occur is one minus the probability that it does occur.'
  },
  {
    id: 'difference-rule',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Difference Rule',
    equation: 'P(A \\setminus B) = P(A) - P(A \\cap B)',
    description: 'The probability of the set difference between A and B is the probability of A minus the probability of their intersection.'
  },
  {
    id: 'probability-monotonicity',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Probability Monotonicity',
    equation: 'A \\subseteq B \\implies P(A) \\le P(B)',
    description: 'If event A is contained within event B, then the probability of event A cannot exceed the probability of event B.'
  },
  {
    id: 'inclusion-exclusion-2',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: 'Inclusion-Exclusion (2 Events)',
    equation: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
    description: 'Calculates the probability of the union of two overlapping events by summing their individual probabilities and subtracting their intersection to avoid double-counting.'
  },
  {
    id: 'inclusion-exclusion-3',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: 'Inclusion-Exclusion (3 Events)',
    equation: 'P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(A \\cap C) - P(B \\cap C) + P(A \\cap B \\cap C)',
    description: 'Generalization of the inclusion-exclusion principle to three events, systematically adding and subtracting intersections to correct for multiple overlaps.'
  },
  {
    id: 'conditional-probability',
    courseId: 'prob',
    category: 'Orthogonalization & SVD',
    name: 'Conditional Probability',
    equation: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0',
    description: 'The probability of event A occurring given that event B has occurred, which effectively scales the sample space down to the conditioning event B.'
  },
  {
    id: 'law-total-probability',
    courseId: 'prob',
    category: 'Iterative Solvers',
    name: 'Law of Total Probability',
    equation: 'P(A) = \\sum_{i=1}^{n} P(A \\mid B_i) P(B_i)',
    description: 'Calculates the total probability of event A by summing its conditional probabilities across a partition of mutually exclusive and exhaustive events B_i.'
  },
  {
    id: 'bayes-theorem',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: "Bayes' Theorem",
    equation: 'P(B_j \\mid A) = \\frac{P(A \\mid B_j) P(B_j)}{\\sum_{i=1}^{n} P(A \\mid B_i) P(B_i)}',
    description: 'Updates the prior probability of partition event B_j using newly observed evidence A by combining the conditional likelihoods and priors.'
  },

  // ==========================================
  // CHAPTER 1: CONTINUOUS RANDOM VARIABLES & PDF
  // ==========================================
  {
    id: 'single-point-probability',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: 'Single-Point Probability',
    equation: 'P(X = x) = 0, \\quad \\forall x \\in \\mathbb{R}',
    description: 'For any continuous random variable X, the probability of the variable taking any exact, isolated real value x is mathematically zero.'
  },
  {
    id: 'cdf-definition',
    courseId: 'prob',
    category: 'Iterative Solvers',
    name: 'Cumulative Distribution Function (CDF)',
    equation: 'F_X(x) = P(X \\le x)',
    description: 'The cumulative distribution function represents the accumulated probability that a random variable X takes a value less than or equal to x.'
  },
  {
    id: 'cdf-monotonicity',
    courseId: 'prob',
    category: 'Iterative Solvers',
    name: 'CDF Monotonicity Property',
    equation: 'x_1 < x_2 \\implies F_X(x_1) \\le F_X(x_2)',
    description: 'The cumulative distribution function is non-decreasing; as the upper bound increases, the accumulated probability cannot decrease.'
  },
  {
    id: 'cdf-boundary-limits',
    courseId: 'prob',
    category: 'Iterative Solvers',
    name: 'CDF Boundary Limits',
    equation: '\\lim_{x \\to -\\infty} F_X(x) = 0, \\quad \\lim_{x \\to \\infty} F_X(x) = 1',
    description: 'As the threshold approaches negative infinity, the accumulated probability goes to zero; as it approaches positive infinity, the probability goes to one.'
  },
  {
    id: 'cdf-right-continuity',
    courseId: 'prob',
    category: 'Iterative Solvers',
    name: 'CDF Right-Continuity',
    equation: '\\lim_{h \\to 0^+} F_X(x + h) = F_X(x)',
    description: 'The CDF is continuous from the right at every point, meaning the limit as h approaches 0 from the positive side equals the function value.'
  },
  {
    id: 'cdf-interval-probability',
    courseId: 'prob',
    category: 'Iterative Solvers',
    name: 'CDF Interval Probability',
    equation: 'P(a < X \\le b) = F_X(b) - F_X(a)',
    description: 'The probability that a continuous random variable falls in the interval (a, b] is given by the difference between the CDF values at the boundaries.'
  },
  {
    id: 'pdf-definition',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: 'Probability Density Function (PDF)',
    equation: 'f_X(x) = \\frac{d}{dx} F_X(x)',
    description: 'The PDF is the derivative of the CDF, representing the rate of probability accumulation or density at any given point x.'
  },
  {
    id: 'pdf-non-negativity',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: 'PDF Non-Negativity Property',
    equation: 'f_X(x) \\ge 0, \\quad \\forall x \\in \\mathbb{R}',
    description: 'The probability density function can never be negative because accumulated probability is a non-decreasing measure.'
  },
  {
    id: 'pdf-normalization',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: 'PDF Normalization Constraint',
    equation: '\\int_{-\\infty}^{\\infty} f_X(x) dx = 1',
    description: 'The total area under the entire probability density function curve must integrate to exactly one, representing certain probability over the real line.'
  },
  {
    id: 'pdf-interval-integration',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: 'PDF Interval Integration',
    equation: 'P(a \\le X \\le b) = \\int_{a}^{b} f_X(x) dx',
    description: 'The probability that a continuous random variable X lies in the interval [a, b] is represented by the definite integral of its PDF over that interval.'
  },

  // ==========================================
  // CHAPTER 2: SPECIAL CONTINUOUS DISTRIBUTIONS
  // ==========================================
  {
    id: 'uniform-pdf-cdf',
    courseId: 'prob',
    category: 'Matrix & Vector Norms',
    name: 'Uniform Distribution PDF & CDF',
    equation: 'f_X(x) = \\begin{cases} \\frac{1}{b-a} & a \\le x \\le b \\\\ 0 & \\text{otherwise} \\end{cases}, \\quad F_X(x) = \\begin{cases} 0 & x < a \\\\ \\frac{x-a}{b-a} & a \\le x \\le b \\\\ 1 & x > b \\end{cases}',
    description: 'Models a continuous random variable X where all intervals of equal length in the support [a, b] are equally likely to occur.'
  },
  {
    id: 'uniform-expectation-variance',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Uniform Expectation & Variance',
    equation: '\\mathbb{E}[X] = \\frac{a+b}{2}, \\quad \\text{Var}(X) = \\frac{(b-a)^2}{12}',
    description: 'The expected value (mean) of a uniform distribution is the midpoint of its support, and the variance measures the spread squared divided by 12.'
  },
  {
    id: 'exponential-pdf-cdf',
    courseId: 'prob',
    category: 'Orthogonalization & SVD',
    name: 'Exponential Distribution PDF & CDF',
    equation: 'f_X(x) = \\begin{cases} \\lambda e^{-\\lambda x} & x \\ge 0 \\\\ 0 & \\text{otherwise} \\end{cases}, \\quad F_X(x) = \\begin{cases} 1 - e^{-\\lambda x} & x \\ge 0 \\\\ 0 & x < 0 \\end{cases}',
    description: 'Models the time elapsed between independent Poisson events occurring at a constant average rate lambda.'
  },
  {
    id: 'exponential-expectation-variance',
    courseId: 'prob',
    category: 'Orthogonalization & SVD',
    name: 'Exponential Expectation & Variance',
    equation: '\\mathbb{E}[X] = \\frac{1}{\\lambda}, \\quad \\text{Var}(X) = \\frac{1}{\\lambda^2}',
    description: 'The expected value (mean time to next event) is the reciprocal of the rate parameter lambda, and the standard deviation is equal to the mean.'
  },
  {
    id: 'memoryless-property',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: 'Memoryless Property',
    equation: 'P(X \\ge s + t \\mid X \\ge s) = P(X \\ge t), \\quad \\forall s, t \\ge 0',
    description: 'For an exponential random variable, the probability of surviving an additional time t is independent of how long the system has already survived.'
  },
  {
    id: 'minimum-of-exponentials',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: 'Minimum of Independent Exponentials',
    equation: 'Y = \\min(X_1, \\dots, X_m) \\sim \\text{Exp}\\left(\\sum_{i=1}^{m} \\lambda_i\\right)',
    description: 'If X_1, ..., X_m are independent exponentially distributed random variables with rates lambda_1, ..., lambda_m, then their minimum is also exponentially distributed with a rate equal to the sum of their individual rates.'
  },

  // ==========================================
  // CHAPTER 3: DISCRETE RANDOM VARIABLES
  // ==========================================
  {
    id: 'discrete-pmf-properties',
    courseId: 'prob',
    category: 'Iterative Solvers',
    name: 'Probability Mass Function (PMF) Constraints',
    equation: 'p_X(x) = P(X = x), \\quad p_X(x) \\ge 0, \\quad \\sum_{x \\in S} p_X(x) = 1',
    description: 'The PMF maps each countable outcome to its exact probability; these values must be non-negative and sum to exactly 1 over the support S.'
  },
  {
    id: 'discrete-expectation',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Discrete Expected Value',
    equation: '\\mathbb{E}[X] = \\sum_{x \\in S} x \\cdot p_X(x)',
    description: 'Calculates the center of mass or average value of a discrete random variable X by summing all possible values weighted by their probabilities.'
  },
  {
    id: 'discrete-lotus',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Law of the Unconscious Statistician (Discrete LOTUS)',
    equation: '\\mathbb{E}[h(X)] = \\sum_{x \\in S} h(x) \\cdot p_X(x)',
    description: 'Computes the expectation of a transformed variable h(X) directly using the PMF of X, without first finding the PMF of the new variable h(X).'
  },
  {
    id: 'discrete-variance',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Discrete Variance Identity',
    equation: '\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2, \\quad \\mathbb{E}[X^2] = \\sum_{x \\in S} x^2 \\cdot p_X(x)',
    description: 'Measures the spread of a discrete random variable by taking the expected value of its squared distance from the mean.'
  },
  {
    id: 'binomial-distribution',
    courseId: 'prob',
    category: 'Matrix & Vector Norms',
    name: 'Binomial Distribution PMF & Expectation',
    equation: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad \\mathbb{E}[X] = np, \\quad \\text{Var}(X) = np(1-p)',
    description: 'Models the number of successes in n independent Bernoulli trials, each having a success probability p.'
  },
  {
    id: 'geometric-distribution',
    courseId: 'prob',
    category: 'Orthogonalization & SVD',
    name: 'Geometric Distribution PMF & Expectation',
    equation: 'P(X = k) = (1-p)^{k-1} p, \\quad \\mathbb{E}[X] = \\frac{1}{p}, \\quad \\text{Var}(X) = \\frac{1-p}{p^2}',
    description: 'Models the number of independent Bernoulli trials required to achieve the very first success.'
  },
  {
    id: 'poisson-distribution',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: 'Poisson Distribution PMF & Expectation',
    equation: 'P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}, \\quad \\mathbb{E}[X] = \\lambda, \\quad \\text{Var}(X) = \\lambda',
    description: 'Models the number of independent events occurring in a fixed interval with a constant average rate lambda.'
  },
  {
    id: 'hypergeometric-distribution',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: 'Hypergeometric Distribution PMF & Expectation',
    equation: 'P(X = k) = \\frac{\\binom{D}{k} \\binom{N-D}{n-k}}{\\binom{N}{n}}, \\quad \\mathbb{E}[X] = n \\frac{D}{N}',
    description: 'Models the number of successes in a sample of size n drawn without replacement from a population of size N containing D successes.'
  },
  // ==========================================
  // CHAPTER 4: JOINT DISTRIBUTIONS & INEQUALITIES
  // ==========================================
  {
    id: 'joint-pdf-normalization',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: 'Joint Continuous PDF Normalization',
    equation: '\\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} f_{X,Y}(x, y) dx dy = 1',
    description: 'The total volume under the entire joint probability density function must integrate to exactly 1.'
  },
  {
    id: 'marginal-pdf-continuous',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: 'Marginal Density Functions',
    equation: 'f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x, y) dy, \\quad f_Y(y) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x, y) dx',
    description: 'Calculates the individual probability density functions of X and Y from their joint PDF by integrating out the other variable.'
  },
  {
    id: 'covariance-definition',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Covariance Definition & Identity',
    equation: '\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mathbb{E}[X])(Y - \\mathbb{E}[Y])] = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]',
    description: 'Measures the linear relationship between two random variables by subtracting the product of their individual means from the expectation of their product.'
  },
  {
    id: 'variance-of-sum-two',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Variance of a Sum (2 Variables)',
    equation: '\\text{Var}(X \\pm Y) = \\text{Var}(X) + \\text{Var}(Y) \\pm 2\\text{Cov}(X, Y)',
    description: 'The variance of a sum or difference of two random variables is the sum of their variances plus or minus twice their covariance.'
  },
  {
    id: 'pearson-correlation',
    courseId: 'prob',
    category: 'Orthogonalization & SVD',
    name: 'Pearson Correlation Coefficient',
    equation: '\\rho_{X,Y} = \\frac{\\text{Cov}(X, Y)}{\\sqrt{\\text{Var}(X)\\text{Var}(Y)}}',
    description: 'Dimensionless, normalized measure of the linear correlation between two variables, bounded between -1 and 1.'
  },
  {
    id: 'markov-inequality',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: "Markov's Inequality",
    equation: 'P(X \\ge c) \\le \\frac{\\mathbb{E}[X]}{c}, \\quad X \\ge 0, \\quad c > 0',
    description: 'Bounds the tail probability of a non-negative random variable X using only its mathematical expectation.'
  },
  {
    id: 'chebyshev-inequality',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: "Chebyshev's Inequality",
    equation: 'P(|X - \\mu| \\ge c) \\le \\frac{\\text{Var}(X)}{c^2}, \\quad c > 0',
    description: 'Bounds the probability that any random variable X deviates from its mean mu by c or more using its variance.'
  },
  {
    id: 'hoeffding-inequality',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: "Hoeffding's Concentration Inequality",
    equation: 'P(|\\bar{X}_n - p| \\ge \\epsilon) \\le 2 e^{-2n\\epsilon^2}',
    description: 'Exponential concentration bound for the sample mean of independent Bernoulli trials around their true probability parameter.'
  },
  // ==========================================
  // CHAPTER 5: MOMENT GENERATING FUNCTIONS
  // ==========================================
  {
    id: 'mgf-definition',
    courseId: 'prob',
    category: 'Eigenvalue Solvers',
    name: 'Moment Generating Function (MGF) Definition',
    equation: 'M_X(t) = \\mathbb{E}[e^{tX}] = \\begin{cases} \\sum_{x} e^{tx} p_X(x) & \\text{(Discrete)} \\\\ \\int_{-\\infty}^{\\infty} e^{tx} f_X(x) dx & \\text{(Continuous)} \\end{cases}',
    description: 'Defines the Moment Generating Function as the mathematical expectation of e^{tX}. It acts as a unique functional wrapper for a distribution\'s moments.'
  },
  {
    id: 'mgf-moment-generation',
    courseId: 'prob',
    category: 'Direct Solvers',
    name: 'Moment Generation Property',
    equation: '\\mathbb{E}[X^n] = M_X^{(n)}(0), \\quad \\text{Var}(X) = M_X\'\'(0) - \\left(M_X\'(0)\\right)^2',
    description: 'The n-th moment of X is obtained by evaluating the n-th derivative of its MGF at t=0.'
  },
  {
    id: 'mgf-linear-transformation',
    courseId: 'prob',
    category: 'Matrix & Vector Norms',
    name: 'MGF Linear Transformation',
    equation: 'M_{aX+b}(t) = e^{bt} M_X(at)',
    description: 'Shifting a random variable by constant b scales its MGF by e^{bt}, and scaling it by a scales the parameter t to at.'
  },
  {
    id: 'mgf-independent-sums',
    courseId: 'prob',
    category: 'Least Squares Minimization',
    name: 'MGF of Independent Sums',
    equation: 'M_{\\sum_{i=1}^n X_i}(t) = \\prod_{i=1}^n M_{X_i}(t)',
    description: 'The MGF of a sum of independent random variables is the product of their individual MGFs.'
  },
  {
    id: 'mgf-common-distributions',
    courseId: 'prob',
    category: 'Orthogonalization & SVD',
    name: 'Common MGF Reference Table',
    equation: 'M_{\\text{Geom}}(t) = \\frac{p e^t}{1 - q e^t}, \\quad M_{\\text{Exp}}(t) = \\frac{\\lambda}{\\lambda - t}, \\quad M_{\\text{Poisson}}(t) = e^{\\lambda(e^t-1)}, \\quad M_{\\text{Normal}}(t) = e^{\\mu t + \\frac{1}{2}\\sigma^2 t^2}',
    description: 'Quick reference formulas for standard discrete and continuous distributions (Geometric, Exponential, Poisson, and Normal).'
  },

];
