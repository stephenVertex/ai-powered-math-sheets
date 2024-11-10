// Difficulty level configurations
const DIFFICULTY_CONFIGS = {
  easy: {
    maxDenominator: 6,
    maxNumeratorFactor: 1, // numerator will be <= denominator
  },
  medium: {
    maxDenominator: 12,
    maxNumeratorFactor: 2, // numerator will be <= 2*denominator
  },
  hard: {
    maxDenominator: 20,
    maxNumeratorFactor: 3, // numerator will be <= 3*denominator
  }
};

// Generate a random fraction based on difficulty
export const generateFraction = (difficulty = 'medium') => {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const denominator = Math.floor(Math.random() * (config.maxDenominator - 1)) + 2;
  const numerator = Math.floor(Math.random() * (denominator * config.maxNumeratorFactor)) + 1;
  return { numerator, denominator };
};

// Find GCD using Euclidean algorithm
export const findGCD = (a, b) => {
  return b === 0 ? a : findGCD(b, a % b);
};

// Simplify a fraction
export const simplifyFraction = (numerator, denominator) => {
  const gcd = findGCD(Math.abs(numerator), Math.abs(denominator));
  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd
  };
};

// Convert improper fraction to mixed number
export const toMixedNumber = (numerator, denominator) => {
  const wholePart = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  return {
    whole: wholePart,
    numerator: remainder,
    denominator: denominator
  };
};

// Add two fractions
export const addFractions = (fraction1, fraction2) => {
  const resultDenominator = fraction1.denominator * fraction2.denominator;
  const resultNumerator = 
    (fraction1.numerator * fraction2.denominator) + 
    (fraction2.numerator * fraction1.denominator);
  
  return {
    numerator: resultNumerator,
    denominator: resultDenominator
  };
};

// Multiply two fractions
export const multiplyFractions = (fraction1, fraction2) => {
  return {
    numerator: fraction1.numerator * fraction2.numerator,
    denominator: fraction1.denominator * fraction2.denominator
  };
};

// Generate a set of fraction problems
export const generateProblems = (count = 5, operationType = 'addition', difficulty = 'medium') => {
  const problems = [];
  for (let i = 0; i < count; i++) {
    const fraction1 = generateFraction(difficulty);
    const fraction2 = generateFraction(difficulty);
    
    const rawResult = operationType === 'addition' 
      ? addFractions(fraction1, fraction2)
      : multiplyFractions(fraction1, fraction2);
    
    const simplified = simplifyFraction(rawResult.numerator, rawResult.denominator);
    const mixed = toMixedNumber(simplified.numerator, simplified.denominator);
    
    problems.push({
      id: i,
      fraction1,
      fraction2,
      operationType,
      difficulty,
      answer: simplified,
      mixedAnswer: mixed
    });
  }
  return problems;
}; 