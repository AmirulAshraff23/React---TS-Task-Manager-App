// src/App.tsx
import React from 'react';
import GuessNumberGame from './components/GuessNumberGame';
import RockPaperScissors from './components/RockPaperScissors';
import NumberMemoryGame from './components/NumberMemoryGame';

const App: React.FC = () => {
  return (
    <div>
      <h1>Simple Games</h1>
      <GuessNumberGame />
      <RockPaperScissors />
      <NumberMemoryGame />
    </div>
  );
};

export default App;