// src/components/GuessNumberGame.tsx
import React, { useState } from 'react';

const GuessNumberGame: React.FC = () => {
  // State variables
  const [targetNumber, setTargetNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);

  // Handle guess submission
  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    setAttempts(attempts + 1);

    if (guessNumber < targetNumber) {
      setMessage('Too low! Try again.');
    } else if (guessNumber > targetNumber) {
      setMessage('Too high! Try again.');
    } else {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`);
    }

    // Clear the input field
    setGuess('');
  };

  // Reset the game
  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setMessage('');
    setGuess('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Guess the Number Game</h1>
      <p>Guess a number between 1 and 100:</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Submit Guess</button>
      <button onClick={resetGame} style={{ marginLeft: '10px' }}>Reset Game</button>
      <p>{message}</p>
      <p>Attempts: {attempts}</p>
    </div>
  );
};

export default GuessNumberGame;