import React from 'react';
import styled from 'styled-components';

const StartScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5c94fc;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 48px;
  margin-bottom: 40px;
  color: #ffcb05;
  text-shadow: 4px 4px 0 #ff0000, -4px -4px 0 #ff0000, 4px -4px 0 #ff0000, -4px 4px 0 #ff0000;
  animation: bounce 0.5s infinite alternate;

  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-10px);
    }
  }
`;

const StartButton = styled.button`
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

const Instructions = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  margin-top: 40px;
  line-height: 1.5;
  max-width: 80%;
`;

const StartScreen = ({ onStart }) => {
  return (
    <StartScreenContainer>
      <Title>スーパーマリオ</Title>
      <StartButton onClick={onStart}>スタート</StartButton>
      <Instructions>
        矢印キーで移動、スペースキーでジャンプ<br />
        敵を踏んで倒し、コインを集めよう！
      </Instructions>
    </StartScreenContainer>
  );
};

export default StartScreen; 