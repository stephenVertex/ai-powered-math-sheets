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
const generateFraction = (difficulty = 'medium', rng) => {
  const config = DIFFICULTY_CONFIGS[difficulty].fractions;
  const denominator = rng.randInt(2, config.maxDenominator);
  const numerator = rng.randInt(1, denominator * config.maxNumeratorFactor);
  return { numerator, denominator };
};

// Generate a random decimal based on difficulty
const generateDecimal = (difficulty = 'medium', rng) => {
  const config = DIFFICULTY_CONFIGS[difficulty].decimals;
  const value = rng.random() * config.maxValue;
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
export const generateProblems = (count = 10, problemType = 'fractionAddition', difficulty = 'medium', rng) => {
  const problems = [];
  for (let i = 0; i < count; i++) {
    let problem = { id: i, difficulty, problemType };

    if (problemType.startsWith('fraction')) {
      const fraction1 = generateFraction(difficulty, rng);
      const fraction2 = generateFraction(difficulty, rng);
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
    } else if (problemType === 'multiplication') {
      let factor1Range, factor2Range;
      
      switch (difficulty) {
        case 'easy':
          factor1Range = { min: 2, max: 9 };
          factor2Range = { min: 2, max: 9 };
          break;
        case 'medium':
          factor1Range = { min: 2, max: 12 };
          factor2Range = { min: 2, max: 12 };
          break;
        case 'hard':
          factor1Range = { min: 2, max: 20 };
          factor2Range = { min: 2, max: 20 };
          break;
        default:
          factor1Range = { min: 2, max: 12 };
          factor2Range = { min: 2, max: 12 };
      }

      const factor1 = rng.randInt(factor1Range.min, factor1Range.max);
      const factor2 = rng.randInt(factor2Range.min, factor2Range.max);
      
      problem = {
        id: Math.floor(rng.random() * 1000000),
        problemType: 'multiplication',
        factor1,
        factor2,
        answer: factor1 * factor2,
        difficulty
      };
    } else {
      const decimal1 = generateDecimal(difficulty, rng);
      const decimal2 = generateDecimal(difficulty, rng);
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

// Seeded random number generator
class SeededRandom {
  constructor(seed) {
    this.seed = seed;
  }

  // Generate random number between 0 and 1
  random() {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  // Generate random integer between min and max (inclusive)
  randInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }
}

export const generateSeed = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const createSeededRandom = (seed) => {
  return new SeededRandom(seed);
};

// Add this near the top of the file with the other utility functions
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}; 