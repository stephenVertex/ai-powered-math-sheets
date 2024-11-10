import React, { useState } from 'react';
import { generateProblems } from './utils/fractionUtils';
import './App.css';

function App() {
  const [problems, setProblems] = useState([]);
  const [operationType, setOperationType] = useState('addition');
  const [difficulty, setDifficulty] = useState('medium');

  const handleGenerateProblems = () => {
    setProblems(generateProblems(10, operationType, difficulty));
  };

  const getOperationSymbol = (type) => {
    return type === 'addition' ? '+' : '×';
  };

  return (
    <div className="App">
      <h1>Fraction Practice</h1>
      
      <div className="controls">
        <select 
          value={operationType} 
          onChange={(e) => setOperationType(e.target.value)}
          className="control-select"
        >
          <option value="addition">Addition</option>
          <option value="multiplication">Multiplication</option>
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
      </div>
      
      <div className="problems-grid">
        {problems.map((problem, index) => (
          <div key={problem.id} className="problem" data-difficulty={problem.difficulty}>
            <div className="problem-content">
              <h3>Problem {index + 1}</h3>
              <div className="fraction-problem">
                <span className="fraction">
                  {problem.fraction1.numerator}/{problem.fraction1.denominator}
                </span>
                {' '}{getOperationSymbol(problem.operationType)}{' '}
                <span className="fraction">
                  {problem.fraction2.numerator}/{problem.fraction2.denominator}
                </span>
                {' = '}
                <span className="answer">?</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {problems.length > 0 && (
        <div className="answer-key">
          <h2>Answer Key</h2>
          <div className="answers-grid">
            {problems.map((problem, index) => (
              <div key={problem.id} className="answer-item">
                <h3>Problem {index + 1}</h3>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
