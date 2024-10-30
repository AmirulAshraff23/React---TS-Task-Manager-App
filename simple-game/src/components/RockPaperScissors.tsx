// src/components/RockPaperScissors.tsx
import React, { useState } from 'react';

const choices = ['Rock', 'Paper', 'Scissors'];

const RockPaperScissors: React.FC = () => {
  const [userChoice, setUserChoice] = useState<string | null>(null); // Fixed variable name
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');

  const playGame = (choice: string) => {
    const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice); // Fixed variable name
    setComputerChoice(computerRandomChoice);
    
    if (choice === computerRandomChoice) {
      setResult('It\'s a draw!');
    } else if (
      (choice === 'Rock' && computerRandomChoice === 'Scissors') ||
      (choice === 'Paper' && computerRandomChoice === 'Rock') ||
      (choice === 'Scissors' && computerRandomChoice === 'Paper')
    ) {
      setResult('You win!');
    } else {
      setResult('You lose!');
    }
  };

  const resetGame = () => {
    setUserChoice(null); // Fixed variable name
    setComputerChoice(null);
    setResult('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Rock, Paper, Scissors</h1>
      <div>
        {choices.map(choice => (
          <button key={choice} onClick={() => playGame(choice)} style={{ margin: '5px' }}>
            {choice}
          </button>
        ))}
      </div>
      {userChoice && computerChoice && (
        <div>
          <p>You chose: {userChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>Result: {result}</p>
        </div>
      )}
      <button onClick={resetGame} style={{ marginTop: '10px' }}>Reset Game</button>
    </div>
  );
};

export default RockPaperScissors;
