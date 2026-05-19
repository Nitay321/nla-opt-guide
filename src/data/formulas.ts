export interface Formula {
  id: string;
  courseId: 'nla' | 'opt';
  category: string;
  categoryHe?: string;
  name: string;
  nameHe?: string;
  equation: string;
  description: string;
  descriptionHe?: string;
}

export const formulas: Formula[] = [
  // ==================== NLA FORMULAS ====================
  {
    id: 'f-nla-vector-norm',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'p-Norm of a Vector',
    equation: '\\|x\\|_p = \\left( \\sum_{i=1}^n |x_i|^p \\right)^{1/p}',
    description: 'General vector norm formula measuring the magnitude of x in R^n. Common instances include: p=1 (absolute sum), p=2 (Euclidean distance), and p=\\infty (maximum coordinate in magnitude).'
  },
  {
    id: 'f-nla-inner-product',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Vector Inner Product (Hermitian)',
    equation: '\\langle u, v \\rangle = u^* v = \\sum_{i=1}^n \\bar{u}_i v_i',
    description: 'Defines the standard complex dot product with conjugate symmetry, linearity, and non-negativity. Induces the 2-norm directly.'
  },
  {
    id: 'f-nla-energy-norm',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Energy Norm (M-Norm)',
    equation: '\\|u\\|_M = \\sqrt{\\langle u, M u \\rangle} = \\sqrt{u^* M u}',
    description: 'A valid weighted vector norm induced by any Hermitian Positive Definite matrix M. Vital in error bounds for Conjugate Gradients.'
  },
  {
    id: 'f-nla-matrix-induced',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Induced Matrix Norm Definition',
    equation: '\\|A\\| = \\max_{x \\neq 0} \\frac{\\|Ax\\|}{\\|x\\|}',
    description: 'The maximum amplification factor of vector length when multiplied by matrix A. Represents the supremum of the vector norm mapping.'
  },
  {
    id: 'f-nla-matrix-1',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Matrix 1-Norm (Max Column Sum)',
    equation: '\\|A\\|_1 = \\max_{1 \\leq j \\leq n} \\sum_{i=1}^m |a_{ij}|',
    description: 'The induced 1-norm of a matrix, calculated by finding the maximum absolute column sum across all columns.'
  },
  {
    id: 'f-nla-matrix-inf',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Matrix ∞-Norm (Max Row Sum)',
    equation: '\\|A\\|_\\infty = \\max_{1 \\leq i \\leq m} \\sum_{j=1}^n |a_{ij}|',
    description: 'The induced infinity-norm of a matrix, calculated by finding the maximum absolute row sum across all rows.'
  },
  {
    id: 'f-nla-matrix-2',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Matrix 2-Norm (Spectral Norm)',
    equation: '\\|A\\|_2 = \\sqrt{\\lambda_{\\max}(A^T A)} = \\sigma_{\\max}(A)',
    description: 'The induced 2-norm of a matrix. Equals the maximum singular value of A, which is the square root of the maximum eigenvalue of A^T A.'
  },
  {
    id: 'f-nla-matrix-f',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Frobenius Matrix Norm',
    equation: '\\|A\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n |a_{ij}|^2} = \\sqrt{\\text{trace}(A^* A)}',
    description: 'An entry-wise norm analogous to the vector 2-norm. Not an induced matrix norm, but sub-multiplicative.'
  },
  {
    id: 'f-nla-cauchy-schwarz',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Cauchy-Schwarz Inequality',
    equation: '|\\langle u, v \\rangle| \\leq \\|u\\|_2 \\cdot \\|v\\|_2',
    description: 'Fundamental bound on the inner product of two vectors. Equality holds iff u and v are linearly dependent (parallel).'
  },
  {
    id: 'f-nla-submult',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Sub-multiplicativity Property',
    equation: '\\|AB\\| \\leq \\|A\\| \\cdot \\|B\\|',
    description: 'Any induced matrix norm satisfies sub-multiplicativity: the norm of the product is at most the product of the norms.'
  },
  {
    id: 'f-nla-spectral-radius',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Spectral Radius',
    equation: '\\rho(A) = \\max_{1 \\leq i \\leq n} |\\lambda_i(A)| \\leq \\|A\\|',
    description: 'The largest eigenvalue in magnitude. Any induced matrix norm upper-bounds the spectral radius. Controls convergence of iterative methods.'
  },
  {
    id: 'f-nla-cond2',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Condition Number via SVD',
    equation: '\\kappa_2(A) = \\frac{\\sigma_{\\max}(A)}{\\sigma_{\\min}(A)} = \\frac{\\lambda_{\\max}(A^T A)^{1/2}}{\\lambda_{\\min}(A^T A)^{1/2}}',
    description: 'The 2-norm condition number equals the ratio of largest to smallest singular values. For SPD matrices, κ₂ = λ_max/λ_min.'
  },
  {
    id: 'f-nla-norm-equiv',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Norm Equivalence Theorem',
    equation: 'c_1 \\|x\\|_b \\leq \\|x\\|_a \\leq c_2 \\|x\\|_b \\quad \\forall x \\in \\mathbb{R}^n',
    description: 'In finite dimensions, all norms are equivalent: convergence in one norm implies convergence in every other norm.'
  },
  {
    id: 'f-nla-cond',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Matrix Condition Number',
    equation: '\\kappa(A) = \\|A\\| \\cdot \\|A^{-1}\\|',
    description: 'Quantifies the maximum relative sensitivity of the solution x in Ax=b to input perturbations. κ(A) ≥ 1, with κ(A) = ∞ if singular.'
  },
  {
    id: 'f-nla-relative-error',
    courseId: 'nla',
    category: 'Matrix & Vector Norms',
    name: 'Relative Error Propagation Bound',
    equation: '\\frac{\\|\\delta x\\|}{\\|x\\|} \\leq \\kappa(A) \\frac{\\|\\delta b\\|}{\\|b\\|}',
    description: 'Rigorous mathematical proof bound establishing that the relative error in the output solution is bounded by the condition number times input relative error.'
  },
  {
    id: 'f-nla-lu',
    courseId: 'nla',
    category: 'Direct Solvers',
    name: 'Naïve LU Decomposition',
    equation: 'A = L \\cdot U',
    description: 'Factors square matrix into unit lower triangular L (1s on diagonal) and upper triangular U. Exists iff all leading principal minors are non-singular.'
  },
  {
    id: 'f-nla-pivoting',
    courseId: 'nla',
    category: 'Direct Solvers',
    name: 'LU Decomposition with Row Pivoting',
    equation: 'P \\cdot A = L \\cdot U',
    description: 'Introduces a permutation matrix P to swap rows, placing the largest absolute column element on the diagonal to enforce stability.'
  },
  {
    id: 'f-nla-schur-complement',
    courseId: 'nla',
    category: 'Direct Solvers',
    name: 'Schur Complement in Cholesky Step',
    equation: 'S = A_{\\text{sub}} - \\frac{v v^T}{\\alpha}',
    description: 'The reduced submatrix computed in Cholesky elimination. If A is Symmetric Positive Definite, its Schur complement is guaranteed SPD.'
  },
  {
    id: 'f-nla-cholesky',
    courseId: 'nla',
    category: 'Direct Solvers',
    name: 'Cholesky Factorization (LLᵀ)',
    equation: 'A = L \\cdot L^T',
    description: 'Unique, highly stable factorization for Symmetric Positive Definite matrices. Requires only (1/3)n^3 flops—exactly half the cost of LU.'
  },
  {
    id: 'f-nla-ls-normal',
    courseId: 'nla',
    category: 'Least Squares Minimization',
    name: 'Least Squares Normal Equations',
    equation: 'A^T A x = A^T b',
    description: 'The system that solves full-rank least squares problems min_x ||Ax - b||_2. Arises from equating the gradient of the error residual to zero.'
  },
  {
    id: 'f-nla-wls',
    courseId: 'nla',
    category: 'Least Squares Minimization',
    name: 'Weighted Least Squares Solution',
    equation: 'x_{\\text{WLS}} = (A^T W A)^{-1} A^T W b',
    description: 'Solves the weighted system min_x ||Ax - b||_W^2 where diagonal matrix W holds inverse variance weights for data points.'
  },
  {
    id: 'f-nla-tikhonov',
    courseId: 'nla',
    category: 'Least Squares Minimization',
    name: 'Regularized Least Squares (Tikhonov)',
    equation: '(A^T A + \\mu I) x = A^T b',
    description: 'Solves regularized least squares min_x (1/2)||Ax - b||^2 + (μ/2)||x||^2. Adds penalty factor μ > 0 to stabilize ill-posed matrices.'
  },
  {
    id: 'f-nla-ls-orthogonality',
    courseId: 'nla',
    category: 'Least Squares Minimization',
    name: 'LS Orthogonality Property',
    equation: 'A^T r = A^T(b - A\\hat{x}) = 0',
    description: 'The residual r = b - Ax̂ of the LS solution is orthogonal to all columns of A. This is the geometric meaning of the normal equations.'
  },
  {
    id: 'f-nla-grad-rules',
    courseId: 'nla',
    category: 'Least Squares Minimization',
    name: 'Key Gradient Rules for LS',
    equation: '\\nabla_x(v^T x) = v, \\quad \\nabla_x(x^T M x) = (M + M^T)x',
    description: 'Fundamental matrix calculus identities used to derive the normal equations. For symmetric M, the quadratic gradient simplifies to 2Mx.'
  },
  {
    id: 'f-nla-gram-schmidt',
    courseId: 'nla',
    category: 'Orthogonalization & SVD',
    name: 'Classical Gram-Schmidt Step',
    equation: 'u_k = v_k - \\sum_{i=1}^{k-1} \\frac{\\langle u_i, v_k \\rangle}{\\langle u_i, u_i \\rangle} u_i',
    description: 'Orthogonalizes vector v_k against previously computed orthogonal basis vectors u_1...u_{k-1}.'
  },
  {
    id: 'f-nla-qr',
    courseId: 'nla',
    category: 'Orthogonalization & SVD',
    name: 'QR Factorization',
    equation: 'A = Q \\cdot R',
    description: 'Factors m x n matrix A into orthogonal matrix Q (Q^T Q = I) and upper triangular R. Used for numerically stable least squares solvers.'
  },
  {
    id: 'f-nla-svd-factor',
    courseId: 'nla',
    category: 'Orthogonalization & SVD',
    name: 'Singular Value Decomposition (SVD)',
    equation: 'A = U \\Sigma V^T = \\sum_{i=1}^r \\sigma_i u_i v_i^T',
    description: 'Decomposes any real m x n matrix A into left singular vectors U, singular values Σ, and right singular vectors V.'
  },
  {
    id: 'f-nla-eckart-young',
    courseId: 'nla',
    category: 'Orthogonalization & SVD',
    name: 'Eckart-Young Spectral Error',
    equation: '\\min_{\\text{rank}(B) \\leq k} \\|A - B\\|_2 = \\|A - A_k\\|_2 = \\sigma_{k+1}',
    description: 'The optimal rank-k SVD approximation theorem showing the spectral-norm error equals the first omitted singular value.'
  },
  {
    id: 'f-nla-spectral-decomp',
    courseId: 'nla',
    category: 'Orthogonalization & SVD',
    name: 'Spectral Decomposition (Eigendecomposition)',
    equation: 'A = U \\Lambda U^*, \\quad \\Lambda = \\text{diag}(\\lambda_1, ..., \\lambda_n)',
    description: 'For normal/Hermitian matrices: orthogonal eigenvectors form U, eigenvalues form Λ. For symmetric real matrices, all values are real.'
  },
  {
    id: 'f-nla-svd-eigen',
    courseId: 'nla',
    category: 'Orthogonalization & SVD',
    name: 'SVD-Eigenvalue Relationship',
    equation: 'A^T A = V \\Sigma^2 V^T \\implies \\sigma_i = \\sqrt{\\lambda_i(A^T A)}',
    description: 'Singular values are the square roots of eigenvalues of A^T A. V contains eigenvectors of A^T A, U contains eigenvectors of AA^T.'
  },
  {
    id: 'f-nla-pseudoinverse',
    courseId: 'nla',
    category: 'Orthogonalization & SVD',
    name: 'Moore-Penrose Pseudo-inverse',
    equation: 'A^\\dagger = V \\Sigma^\\dagger U^T, \\quad (\\Sigma^\\dagger)_{ii} = \\begin{cases} 1/\\sigma_i & \\sigma_i \\neq 0 \\\\ 0 & \\sigma_i = 0 \\end{cases}',
    description: 'Generalized inverse via SVD. For full-rank A: A† = (A^T A)^{-1} A^T. For rank-deficient A, gives minimum-norm LS solution.'
  },
  {
    id: 'f-nla-ls-svd',
    courseId: 'nla',
    category: 'Orthogonalization & SVD',
    name: 'Least Squares via SVD',
    equation: '\\Sigma \\hat{y} = U^T b, \\quad \\hat{x} = V \\hat{y}',
    description: 'Substituting A = UΣV^T into normal equations reduces LS to a trivial diagonal system. The most numerically stable LS approach.'
  },
  {
    id: 'f-nla-jacobi-split',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'Jacobi Iteration Step',
    equation: 'x^{(k+1)} = D^{-1}(L + U)x^{(k)} + D^{-1}b',
    description: 'Solves Ax=b by updating each coordinate independently based on the previous iteration vector values.'
  },
  {
    id: 'f-nla-gs-split',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'Gauss-Seidel Iteration Step',
    equation: 'x^{(k+1)} = (D - L)^{-1} U x^{(k)} + (D - L)^{-1} b',
    description: 'Improves convergence by using newly calculated elements immediately in the current iteration step.'
  },
  {
    id: 'f-nla-kahan-sor',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: "Kahan's SOR Spectral Radius Bound",
    equation: '\\rho(T_\\omega) \\geq |\\omega - 1|',
    description: 'Mandatory convergence bound. Proves the iteration converges only if relaxation factor ω lies strictly between 0 and 2.'
  },
  {
    id: 'f-nla-sor-weight',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'SOR Iteration Scheme',
    equation: 'x_i^{(k+1)} = (1 - \\omega)x_i^{(k)} + \\frac{\\omega}{a_{ii}} \\left[ b_i - \\sum_{j < i} a_{ij}x_j^{(k+1)} - \\sum_{j > i} a_{ij}x_j^{(k)} \\right]',
    description: 'Accelerated relaxation solver governed by parameter ω. Ostrowski-Reich guarantees convergence for SPD systems iff 0 < ω < 2.'
  },
  {
    id: 'f-nla-sor-optimal',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'Optimal SOR Parameter ω',
    equation: '\\omega_{\\text{opt}} = \\frac{2}{1 + \\sqrt{1 - \\rho(T_J)^2}}',
    description: 'The optimal factor ω derived for structured matrices, reducing the iteration spectral radius and accelerating solve speeds.'
  },
  {
    id: 'f-nla-general-iter',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'General Iterative Method',
    equation: 'x^{(k+1)} = x^{(k)} + M^{-1}(b - Ax^{(k)})',
    description: 'Unified framework: M is the preconditioner. Jacobi: M=D, GS: M=D-L, Richardson: M=cI. Error: e^{(k+1)} = (I - M^{-1}A)e^{(k)}.'
  },
  {
    id: 'f-nla-convergence-factor',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'Convergence Factor Theorem',
    equation: '\\lim_{k \\to \\infty} \\frac{\\|e^{(k+1)}\\|}{\\|e^{(k)}\\|} = \\rho(I - M^{-1}A)',
    description: 'The asymptotic convergence rate equals the spectral radius of the iteration matrix T = I - M^{-1}A. Converges iff ρ(T) < 1.'
  },
  {
    id: 'f-nla-sd-optimal-alpha',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'Optimal SD Step Size & Convergence',
    equation: '\\alpha_{\\text{opt}} = \\frac{2}{\\lambda_{\\max} + \\lambda_{\\min}}, \\quad \\rho_{\\min} = \\frac{\\kappa(A) - 1}{\\kappa(A) + 1}',
    description: 'For SPD A, the best constant α gives convergence factor (κ-1)/(κ+1). High condition number → slow convergence.'
  },
  {
    id: 'f-nla-cg-convergence',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'CG Convergence Bound',
    equation: '\\|x^* - x^{(k)}\\|_A \\leq 2 \\|x^* - x^{(0)}\\|_A \\left( \\frac{\\sqrt{\\kappa(A)} - 1}{\\sqrt{\\kappa(A)} + 1} \\right)^k',
    description: 'CG converges based on √κ(A) instead of κ(A), making it dramatically faster than SD. Converges in at most n iterations exactly.'
  },
  {
    id: 'f-nla-error-residual',
    courseId: 'nla',
    category: 'Iterative Solvers',
    name: 'Error vs Residual Vectors',
    equation: 'e^{(k)} = x^* - x^{(k)}, \\quad r^{(k)} = b - Ax^{(k)} = Ae^{(k)}',
    description: 'Error requires knowing x* (usually unknown). Residual is computable and related by r = Ae. Both converge to zero together.'
  },
  {
    id: 'f-nla-power-method',
    courseId: 'nla',
    category: 'Eigenvalue Solvers',
    name: 'Power Method Vector Update',
    equation: 'x^{(k+1)} = \\frac{A x^{(k)}}{\\|A x^{(k)}\\|_2}',
    description: 'Isolates the dominant eigenvalue and its eigenvector. Convergence rate is governed strictly by the ratio |λ₂ / λ₁|.'
  },
  {
    id: 'f-nla-rayleigh-quotient',
    courseId: 'nla',
    category: 'Eigenvalue Solvers',
    name: 'Rayleigh Quotient',
    equation: '\\lambda^{(k)} \\approx R(A, x^{(k)}) = \\frac{(x^{(k)})^T A x^{(k)}}{(x^{(k)})^T x^{(k)}}',
    description: 'Computes highly accurate eigenvalue estimates from normalized eigenvector estimates.'
  },
  {
    id: 'f-nla-shifted-inverse',
    courseId: 'nla',
    category: 'Eigenvalue Solvers',
    name: 'Shifted Inverse Power Iteration',
    equation: 'x^{(k+1)} = \\frac{(A - \\sigma I)^{-1} x^{(k)}}{\\|(A - \\sigma I)^{-1} x^{(k)}\\|_2}',
    description: 'Isolates the eigenvalue closest to the shift value σ. Achieves rapid cubic convergence when combined with Rayleigh Quotient updates.'
  },

  // ==================== OPT FORMULAS ====================
  {
    id: 'f-opt-optimality-1st',
    courseId: 'opt',
    category: 'Optimization Foundations',
    name: 'First-Order Necessary Condition',
    equation: '\\nabla f(x^*) = 0',
    description: 'At any local minimum x* of a smooth unconstrained function, the gradient must vanish. This is necessary but not sufficient.'
  },
  {
    id: 'f-opt-optimality-2nd',
    courseId: 'opt',
    category: 'Optimization Foundations',
    name: 'Second-Order Sufficient Condition',
    equation: '\\nabla f(x^*) = 0 \\text{ and } \\nabla^2 f(x^*) \\succ 0 \\implies x^* \\text{ is a strict local min}',
    description: 'A stationary point with strictly positive definite Hessian is guaranteed to be a strict local minimum.'
  },
  {
    id: 'f-opt-strongly-convex',
    courseId: 'opt',
    category: 'Optimization Foundations',
    name: 'Strongly Convex Function',
    equation: 'f(y) \\geq f(x) + \\nabla f(x)^T(y-x) + \\frac{\\mu}{2}\\|y-x\\|^2, \\quad \\mu > 0',
    description: 'Stronger than convexity: guarantees a unique global minimum and linear convergence rate for gradient descent.'
  },
  {
    id: 'f-opt-taylor',
    courseId: 'opt',
    category: 'Optimization Foundations',
    name: 'Multivariate Taylor Expansion',
    equation: 'f(x + \\epsilon) = f(x) + \\langle \\nabla f(x), \\epsilon \\rangle + \\frac{1}{2} \\langle \\epsilon, \\nabla^2 f(x) \\epsilon \\rangle + O(\\|\\epsilon\\|^3)',
    description: 'Local quadratic model of smooth function f around point x. Forms the analytical basis for all Newton and gradient descent solvers.'
  },
  {
    id: 'f-opt-jacobian',
    courseId: 'opt',
    category: 'Optimization Foundations',
    name: 'Jacobian Matrix Definition',
    equation: 'J_{ij} = \\frac{\\partial f_i}{\\partial x_j} \\implies \\delta f \\approx J \\epsilon',
    description: 'The first-order partial derivative matrix of a vector-valued function f: R^n -> R^m. Gathers gradient row vectors.'
  },
  {
    id: 'f-opt-convex-func',
    courseId: 'opt',
    category: 'Optimization Foundations',
    name: 'Convex Function Algebraic Definition',
    equation: 'f( \\theta x + (1 - \\theta) y ) \\leq \\theta f(x) + (1 - \\theta) f(y)',
    description: 'A function is convex over region Ω if its chord connecting any two points lies completely above its graph.'
  },
  {
    id: 'f-opt-convex-diff1',
    courseId: 'opt',
    category: 'Optimization Foundations',
    name: 'First-Order Convexity Condition',
    equation: 'f(x_1) \\geq f(x_2) + \\langle \\nabla f(x_2), x_1 - x_2 \\rangle',
    description: 'A continuously differentiable function is convex iff its linear tangent planes lie everywhere below its graph.'
  },
  {
    id: 'f-opt-convex-diff2',
    courseId: 'opt',
    category: 'Optimization Foundations',
    name: 'Second-Order Convexity Condition',
    equation: '\\nabla^2 f(x) \\succeq 0 \\quad \\forall x \\in \\Omega',
    description: 'A twice continuously differentiable function is convex iff its Hessian matrix is Positive Semi-Definite everywhere.'
  },
  {
    id: 'f-opt-descent-direction',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Descent Direction Condition',
    equation: '\\langle \\nabla f(x^{(k)}), d \\rangle < 0 \\implies d = -M \\nabla f(x^{(k)}) \\quad (M \\succ 0)',
    description: 'Establishes that vector d is a descent direction if its inner product with the gradient is negative. Any positive-definite scaling M guarantees this.'
  },
  {
    id: 'f-opt-gd',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Gradient Descent Iteration',
    equation: 'x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)',
    description: 'Iterative update taking steps in the opposite direction of the local gradient. Converges linearly to a local minimum.'
  },
  {
    id: 'f-opt-newton',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: "Newton's Optimization Step",
    equation: 'd_N = -(\\nabla^2 f(x_k))^{-1} \\nabla f(x_k)',
    description: 'The search direction computed by minimizing the second-order Taylor expansion. Near local minima, it achieves quadratic convergence.'
  },
  {
    id: 'f-opt-armijo',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Armijo Backtracking Line Search',
    equation: 'f(x^{(k)} + \\alpha_j d^{(k)}) \\leq f(x^{(k)}) + c \\alpha_j \\langle \\nabla f, d^{(k)} \\rangle',
    description: 'Standard backtracking rule to find step size α. Requires sufficient decrease. Employs factor β in (0, 1) and small scalar c.'
  },
  {
    id: 'f-opt-cd',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Coordinate Descent Step',
    equation: 'x_i^{(k+1)} \\leftarrow \\arg\\min_{x_i} f(x_1^{(k+1)}, ..., x_i, ..., x_n^{(k)})',
    description: 'Iteratively minimizes the objective along one coordinate axis at a time. Easy to apply when 1-D minimization has closed forms.'
  },
  {
    id: 'f-opt-gauss-newton',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Gauss-Newton Search Direction',
    equation: 'd_{\\text{GN}} = -(J^T J)^{-1} J^T (f(\\theta) - y_{\\text{obs}})',
    description: 'Approximates the Hessian as J^T J to solve non-linear least squares. Bypasses the costly second-derivative computations of Newton.'
  },
  {
    id: 'f-opt-levenberg',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Levenberg-Marquardt Direction',
    equation: 'd_{\\text{LM}} = -(J^T J + \\mu I)^{-1} J^T (f(\\theta) - y_{\\text{obs}})',
    description: 'Adds a damping parameter μ > 0 to Gauss-Newton, stabilizing the system when the Jacobian is ill-conditioned or low-rank.'
  },
  {
    id: 'f-opt-irls',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'IRLS Weight Update (ℓp norm)',
    equation: 'w_i^{(k)} = \\left( | a_i^T x^{(k)} - b_i | + \\epsilon \\right)^{p-2}',
    description: 'Iterative weight updates to solve non-quadratic norm minimizations via a sequence of diagonally weighted least squares problems.'
  },
  {
    id: 'f-opt-verification',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Gradient Taylor Verification Test',
    equation: '\\lim_{\\epsilon \\to 0} \\frac{|f(x + \\epsilon d) - f(x) - \\epsilon \\langle \\nabla f, d \\rangle|}{\\epsilon^2} = \\frac{1}{2} |\\langle d, \\nabla^2 f(x) d \\rangle|',
    description: 'Numerical test verifying gradient implementations. The error between the function difference and gradient approximation must decay quadratically.'
  },
  {
    id: 'f-opt-lagrange',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'Lagrangian (Equality Constraints)',
    equation: 'L(x, \\mu) = f(x) + \\sum_{i=1}^m \\mu_i h_i(x)',
    description: 'Mathematical objective combining f(x) and constraints h_i(x) = 0. Optimality requires finding critical points of L.'
  },
  {
    id: 'f-opt-kkt-stationarity',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'KKT Stationarity Condition',
    equation: '\\nabla f(x^*) + \\sum_{i=1}^p \\lambda_i \\nabla g_i(x^*) + \\sum_{j=1}^m \\mu_j \\nabla h_j(x^*) = 0',
    description: 'Enforces that the gradient of the Lagrangian vanishes, meaning the objective gradient is a linear combination of constraint gradients.'
  },
  {
    id: 'f-opt-kkt-slackness',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'KKT Complementary Slackness',
    equation: '\\lambda_i \\cdot g_i(x^*) = 0 \\quad \\forall i=1...p',
    description: 'Guarantees that active constraints lie on the boundary (g_i = 0), and inactive constraints have no influence (multiplier λ_i = 0).'
  },
  {
    id: 'f-opt-kkt-dual',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'KKT Dual Feasibility',
    equation: '\\lambda_i \\geq 0 \\quad \\forall i=1...p',
    description: 'Enforces that Lagrange multipliers associated with inequality constraints are non-negative, preserving the minimization direction.'
  },
  {
    id: 'f-opt-log-barrier',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'Logarithmic Barrier Function',
    equation: 'B(x, \\mu) = f(x) - \\mu \\sum_{i=1}^p \\ln(-g_i(x))',
    description: 'An interior point penalty solver. The log term acts as a barrier that approaches infinity as x approaches the constraint boundaries.'
  },
  {
    id: 'f-opt-projected-gd',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'Projected Gradient Descent Step',
    equation: 'x^{(k+1)} = P_{\\Omega} \\left( x^{(k)} - \\alpha^{(k)} \\nabla f(x^{(k)}) \\right)',
    description: 'Iterates like standard gradient descent, but projects the resulting vector back onto the feasible region boundary after each step.'
  },
  {
    id: 'f-opt-penalty-method',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'Quadratic Penalty Method',
    equation: '\\min_x \\left[ f(x) + \\mu \\sum_j (c^{\\text{eq}}_j(x))^2 + \\mu \\sum_l (\\max\\{0, c^{\\text{ieq}}_l(x)\\})^2 \\right]',
    description: 'Converts constrained problem to unconstrained by penalizing constraint violations. As μ → ∞, the solution approaches the true constrained optimum.'
  },
  {
    id: 'f-opt-licq',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'LICQ — Constraint Qualification',
    equation: '\\text{LICQ holds at } x^* \\iff \\text{rank}(J_{\\text{eq}}(x^*)) = m_{\\text{eq}}',
    description: 'Linear Independence Constraint Qualification: constraint gradients are linearly independent at x*. Guarantees existence of unique Lagrange multipliers.'
  },
  {
    id: 'f-opt-lagrangian-general',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'General Lagrangian Function',
    equation: 'L(x, \\lambda^{\\text{eq}}, \\lambda^{\\text{ieq}}) = f(x) + (\\lambda^{\\text{eq}})^T c^{\\text{eq}}(x) + (\\lambda^{\\text{ieq}})^T c^{\\text{ieq}}(x)',
    description: 'Full Lagrangian combining objective with both equality and inequality constraints. KKT conditions are stationary points of this function.'
  },
  {
    id: 'f-opt-2nd-order-constrained',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: '2nd-Order Sufficient Condition (Constrained)',
    equation: 'y^T \\nabla^2_x L(x^*, \\lambda^*) y > 0 \\quad \\forall y \\neq 0 \\text{ s.t. } J_{\\text{eq}} y = 0',
    description: 'At a KKT point, if the Hessian of the Lagrangian is positive definite on the constraint null-space, then x* is a strict local minimum.'
  },
  {
    id: 'f-opt-active-set',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'Active Set at a Feasible Point',
    equation: '\\mathcal{A}(x) = \\{ l : c^{\\text{ieq}}_l(x) = 0 \\}',
    description: 'The set of inequality constraints satisfied with equality at x. Active constraints act like equality constraints; inactive ones have multiplier = 0.'
  },
  {
    id: 'f-opt-box-projection',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'Box-Constraint Projection',
    equation: 'x^{(k+1)}_i = \\begin{cases} a_i & z_i < a_i \\\\ b_i & z_i > b_i \\\\ z_i & \\text{otherwise} \\end{cases}, \\quad z = x^{(k)} - \\alpha \\nabla f',
    description: 'Projected SD for box constraints a ≤ x ≤ b. The projection simply clips each coordinate to the nearest bound — computed in O(n).'
  },
  {
    id: 'f-opt-linear-eq-projection',
    courseId: 'opt',
    category: 'Constrained Optimization',
    name: 'Projection onto Linear Equality Constraint',
    equation: 'P_{Ax=b}(y) = y - A^T(AA^T)^{-1}(Ay - b)',
    description: 'Closest point to y satisfying Ax = b. Used in projected SD for linear constraints; each step stays in the null space of A.'
  },
  {
    id: 'f-opt-sgd',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Stochastic Gradient Descent (SGD)',
    equation: 'w^{(k+1)} = w^{(k)} - \\alpha^{(k)} \\frac{1}{|S|} \\sum_{i \\in S} \\nabla f_i(w^{(k)})',
    description: 'Uses a random mini-batch S ⊂ {1,...,m} to estimate the gradient. Noisy but cheap per iteration — the workhorse of deep learning.'
  },
  {
    id: 'f-opt-momentum',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'SGD with Momentum',
    equation: 'm^{(k)} = \\gamma m^{(k-1)} + \\alpha^{(k)} g^{(k)}, \\quad w^{(k+1)} = w^{(k)} - m^{(k)}',
    description: 'Accumulates gradient directions with decay γ ∈ (0.5, 0.9). Reduces oscillation and accelerates convergence through curved valleys.'
  },
  {
    id: 'f-opt-adam',
    courseId: 'opt',
    category: 'Unconstrained Optimization',
    name: 'Adam Optimizer',
    equation: 'w^{(k+1)} = w^{(k)} - \\alpha^{(k)} \\frac{\\hat{m}^{(k)}}{\\sqrt{\\hat{v}^{(k)}} + \\epsilon}',
    description: 'Combines momentum (m̂) and RMSProp gradient rescaling (v̂) with bias correction. Default optimizer for neural networks. Recommended γ₁=0.9, γ₂=0.999.'
  }
];
