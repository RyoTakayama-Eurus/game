import React from 'react';
import styled, { keyframes } from 'styled-components';

const walk = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const EnemyCharacter = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  left: ${props => props.position.x}px;
  bottom: ${props => 80 + props.position.y}px;
  background-color: #8b4513;
  border-radius: 20px 20px 0 0;
  transform: ${props => props.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'};
  z-index: 5;
  animation: ${walk} 0.5s infinite;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 20px;
    background-color: #8b4513;
    border-radius: 15px 15px 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5px;
    width: 30px;
    height: 10px;
    background-color: #654321;
    border-radius: 0 0 5px 5px;
  }
`;

const Eyes = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  z-index: 6;

  &::before, &::after {
    content: '';
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    position: relative;
  }

  &::before {
    left: 5px;
  }

  &::after {
    right: 5px;
  }
`;

const Mouth = styled.div`
  position: absolute;
  top: 25px;
  left: 15px;
  width: 10px;
  height: 5px;
  background-color: black;
  border-radius: 0 0 5px 5px;
  z-index: 6;
`;

const Enemy = ({ position, direction }) => {
  return (
    <EnemyCharacter position={position} direction={direction}>
      <Eyes />
      <Mouth />
    </EnemyCharacter>
  );
};

export default Enemy; 