import React from 'react';
import styled from 'styled-components';

const GameOverContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
`;

const GameOverText = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 48px;
  margin-bottom: 20px;
  color: #ff0000;
  text-shadow: 2px 2px 0 #000;
`;

const ScoreText = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 24px;
  margin-bottom: 40px;
  color: #ffcb05;
`;

const RestartButton = styled.button`
  font-family: 'Press Start 2P', cursive;
  font-size: 24px;
  padding: 15px 30px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 5px 0 #8b0000;

  &:hover {
    transform: translateY(2px);
    box-shadow: 0 3px 0 #8b0000;
  }

  &:active {
    transform: translateY(5px);
    box-shadow: none;
  }
`;

const GameOverScreen = ({ score, onRestart }) => {
  return (
    <GameOverContainer>
      <GameOverText>ゲームオーバー</GameOverText>
      <ScoreText>スコア: {score}</ScoreText>
      <RestartButton onClick={onRestart}>もう一度プレイ</RestartButton>
    </GameOverContainer>
  );
};

export default GameOverScreen; 