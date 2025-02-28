import React from 'react';
import styled from 'styled-components';

const ScoreBoardContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  z-index: 100;
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffcb05;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;

  &::after {
    content: '¥';
    position: absolute;
    top: 2px;
    left: 6px;
    font-size: 12px;
    font-weight: bold;
    color: #b8860b;
  }
`;

const ScoreText = styled.span`
  letter-spacing: 1px;
`;

const ScoreBoard = ({ score }) => {
  return (
    <ScoreBoardContainer>
      <CoinIcon />
      <ScoreText>{score}</ScoreText>
    </ScoreBoardContainer>
  );
};

export default ScoreBoard; 