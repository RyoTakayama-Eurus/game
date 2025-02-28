import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5c94fc;
`;

const GameContainer = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  border: 4px solid #000;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const endGame = (finalScore) => {
    setScore(finalScore);
    setGameState('gameOver');
  };

  const restartGame = () => {
    setGameState('playing');
    setScore(0);
  };

  return (
    <AppContainer>
      <GameContainer>
        {gameState === 'start' && <StartScreen onStart={startGame} />}
        {gameState === 'playing' && <Game onGameOver={endGame} />}
        {gameState === 'gameOver' && (
          <GameOverScreen score={score} onRestart={restartGame} />
        )}
      </GameContainer>
    </AppContainer>
  );
}

export default App; 