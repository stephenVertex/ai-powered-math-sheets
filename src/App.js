import React, { useState, useCallback } from 'react';
import { generateProblems, generateSeed, createSeededRandom } from './utils/mathUtils';
import './App.css';

function App() {
  const [problems, setProblems] = useState([]);
  const [problemType, setProblemType] = useState('fractionAddition');
  const [difficulty, setDifficulty] = useState('medium');
  const [studentName, setStudentName] = useState('');
  const [seed, setSeed] = useState(generateSeed());
  const [customSeed, setCustomSeed] = useState('');

  const handleGenerateProblems = useCallback(() => {
    let seedToUse;
    
    if (customSeed.length === 5) {
      // Use the existing custom seed
      seedToUse = parseInt(customSeed, 10);
    } else {
      // Generate a new seed
      seedToUse = generateSeed();
    }
    
    setSeed(seedToUse);
    setCustomSeed(''); // Clear the seed input after generating problems
    const rng = createSeededRandom(seedToUse);
    setProblems(generateProblems(10, problemType, difficulty, rng));
  }, [problemType, difficulty, customSeed]);

  const getOperationSymbol = (type) => {
    return type.includes('Addition') ? '+' : '×';
  };

  const renderProblem = (problem) => {
    if (problem.problemType.startsWith('fraction')) {
      return (
        <div className="fraction-problem">
          <span className="fraction">
            {problem.fraction1.numerator}/{problem.fraction1.denominator}
          </span>
          {' '}{getOperationSymbol(problem.problemType)}{' '}
          <span className="fraction">
            {problem.fraction2.numerator}/{problem.fraction2.denominator}
          </span>
          {' = '}
          <span className="answer">?</span>
        </div>
      );
    } else {
      return (
        <div className="decimal-problem">
          {problem.decimal1}
          {' '}{getOperationSymbol(problem.problemType)}{' '}
          {problem.decimal2}
          {' = '}
          <span className="answer">?</span>
        </div>
      );
    }
  };

  const renderAnswer = (problem) => {
    if (problem.problemType.startsWith('fraction')) {
      return (
        <>
          <p>
            Improper fraction: {problem.answer.numerator}/{problem.answer.denominator}
          </p>
          <p>
            Mixed number: {
              problem.mixedAnswer.numerator === 0 
                ? problem.mixedAnswer.whole 
                : `${problem.mixedAnswer.whole} ${problem.mixedAnswer.numerator}/${problem.mixedAnswer.denominator}`
            }
          </p>
        </>
      );
    } else {
      return (
        <p>
          Answer: {problem.answer}
        </p>
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDrillType = (type) => {
    return type
      .replace('fraction', 'Fraction ')
      .replace('decimal', 'Decimal ')
      .replace('Addition', 'Addition')
      .replace('Multiplication', 'Multiplication');
  };

  const handleSeedChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setCustomSeed(value);
    if (value.length === 5) {
      setSeed(parseInt(value, 10));
    }
  };

  return (
    <div className="App">
      <div className="no-print">
        <h1>Math Practice</h1>
        
        <div className="controls">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Student Name (optional)"
            className="control-select"
          />

          <input
            type="text"
            className="seed-input control-select"
            placeholder="Seed # (optional)"
            value={customSeed}
            onChange={handleSeedChange}
            maxLength={5}
          />

          <select 
            value={problemType} 
            onChange={(e) => setProblemType(e.target.value)}
            className="control-select"
          >
            <option value="fractionAddition">Fraction Addition</option>
            <option value="fractionMultiplication">Fraction Multiplication</option>
            <option value="decimalAddition">Decimal Addition</option>
            <option value="decimalMultiplication">Decimal Multiplication</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="control-select"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button onClick={handleGenerateProblems}>Generate New Problems</button>
          {problems.length > 0 && (
            <button onClick={handlePrint}>Print Worksheet</button>
          )}
        </div>
      </div>
      
      {problems.length > 0 && (
        <>
          <div className="print-only worksheet-header">
            <h1>Math Practice Worksheet</h1>
            <h2>{formatDrillType(problemType)} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
            <p>Worksheet ID: <span className="seed-display">{seed}</span></p>
            <div className="student-info">
              <p>Name: {studentName ? <strong>{studentName}</strong> : "_____________________"}</p>
              <p>Date: <strong>{new Date().toLocaleDateString()}</strong></p>
            </div>
          </div>

          <div className="problems-grid print-problems">
            {problems.map((problem, index) => (
              <div key={problem.id} className="problem" data-difficulty={problem.difficulty}>
                <div className="problem-content">
                  <h3>Problem {index + 1}</h3>
                  {renderProblem(problem)}
                  <div className="work-space"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="print-only page-break"></div>

          <div className="answer-key">
            <h2>Answer Key <span className="seed-display">ID: {seed}</span></h2>
            <div className="answers-grid">
              {problems.map((problem, index) => (
                <div key={problem.id} className="answer-item">
                  <h3>Problem {index + 1}</h3>
                  {renderAnswer(problem)}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
