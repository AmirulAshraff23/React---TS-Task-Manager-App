// src/components/NumberMemoryGame.tsx
import React, { useState, useEffect } from 'react';

const NumberMemoryGame: React.FC = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showNumber, setShowNumber] = useState<boolean>(false);

  const generateNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setNumber(randomNumber);
    setShowNumber(true);
    
    // Hide the number after 3 seconds
    setTimeout(() => {
      setShowNumber(false);
    }, 3000);
  };

  const checkGuess = () => {
    if (parseInt(userInput) === number) {
      setMessage('Correct! You remembered the number.');
    } else {
      setMessage(`Wrong! The number was ${number}.`);
    }
    setUserInput('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Number Memory Game</h1>
      <button onClick={generateNumber}>Generate Number</button>
      {showNumber && <h2>{number}</h2>}
      <input
        type="number"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter the number"
        style={{ marginTop: '10px' }}
      />
      <button onClick={checkGuess} style={{ marginLeft: '10px' }}>Check Guess</button>
      <p>{message}</p>
    </div>
  );
};

export default NumberMemoryGame;