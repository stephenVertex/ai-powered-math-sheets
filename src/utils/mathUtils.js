// Rename from fractionUtils.js to mathUtils.js

// Difficulty level configurations
const DIFFICULTY_CONFIGS = {
  easy: {
    fractions: {
      maxDenominator: 6,
      maxNumeratorFactor: 1,
    },
    decimals: {
      maxDecimals: 1,
      maxValue: 10,
    }
  },
  medium: {
    fractions: {
      maxDenominator: 12,
      maxNumeratorFactor: 2,
    },
    decimals: {
      maxDecimals: 2,
      maxValue: 100,
    }
  },
  hard: {
    fractions: {
      maxDenominator: 20,
      maxNumeratorFactor: 3,
    },
    decimals: {
      maxDecimals: 3,
      maxValue: 1000,
    }
  }
};

// Generate a random fraction based on difficulty
const generateFraction = (difficulty = 'medium') => {
  const config = DIFFICULTY_CONFIGS[difficulty].fractions;
  const denominator = Math.floor(Math.random() * (config.maxDenominator - 1)) + 2;
  const numerator = Math.floor(Math.random() * (denominator * config.maxNumeratorFactor)) + 1;
  return { numerator, denominator };
};

// Generate a random decimal based on difficulty
const generateDecimal = (difficulty = 'medium') => {
  const config = DIFFICULTY_CONFIGS[difficulty].decimals;
  const value = Math.random() * config.maxValue;
  return Number(value.toFixed(config.maxDecimals));
};

// Find GCD using Euclidean algorithm
const findGCD = (a, b) => {
  return b === 0 ? a : findGCD(b, a % b);
};

// Simplify a fraction
const simplifyFraction = (numerator, denominator) => {
  const gcd = findGCD(Math.abs(numerator), Math.abs(denominator));
  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd
  };
};

// Convert improper fraction to mixed number
const toMixedNumber = (numerator, denominator) => {
  const wholePart = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  return {
    whole: wholePart,
    numerator: remainder,
    denominator: denominator
  };
};

// Add two fractions
const addFractions = (fraction1, fraction2) => {
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
const multiplyFractions = (fraction1, fraction2) => {
  return {
    numerator: fraction1.numerator * fraction2.numerator,
    denominator: fraction1.denominator * fraction2.denominator
  };
};

// Add two decimals
const addDecimals = (decimal1, decimal2) => {
  return Number((decimal1 + decimal2).toFixed(3));
};

// Multiply two decimals
const multiplyDecimals = (decimal1, decimal2) => {
  return Number((decimal1 * decimal2).toFixed(3));
};

// Generate a set of problems
export const generateProblems = (count = 10, problemType = 'fractionAddition', difficulty = 'medium') => {
  const problems = [];
  for (let i = 0; i < count; i++) {
    let problem = { id: i, difficulty, problemType };

    if (problemType.startsWith('fraction')) {
      const fraction1 = generateFraction(difficulty);
      const fraction2 = generateFraction(difficulty);
      const isAddition = problemType === 'fractionAddition';
      
      const rawResult = isAddition 
        ? addFractions(fraction1, fraction2)
        : multiplyFractions(fraction1, fraction2);
      
      const simplified = simplifyFraction(rawResult.numerator, rawResult.denominator);
      const mixed = toMixedNumber(simplified.numerator, simplified.denominator);
      
      problem = {
        ...problem,
        fraction1,
        fraction2,
        answer: simplified,
        mixedAnswer: mixed
      };
    } else {
      const decimal1 = generateDecimal(difficulty);
      const decimal2 = generateDecimal(difficulty);
      const isAddition = problemType === 'decimalAddition';
      
      const answer = isAddition 
        ? addDecimals(decimal1, decimal2)
        : multiplyDecimals(decimal1, decimal2);
      
      problem = {
        ...problem,
        decimal1,
        decimal2,
        answer
      };
    }
    
    problems.push(problem);
  }
  return problems;
}; 