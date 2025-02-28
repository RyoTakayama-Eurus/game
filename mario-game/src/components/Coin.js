import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotateY(0deg); width: 20px; }
  50% { transform: rotateY(90deg); width: 5px; }
  100% { transform: rotateY(180deg); width: 20px; }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const CoinItem = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left: ${props => props.position.x}px;
  bottom: ${props => props.position.y}px;
  background-color: #ffcb05;
  border-radius: 50%;
  z-index: 4;
  animation: ${spin} 1s infinite, ${float} 2s infinite;
  box-shadow: 0 0 10px rgba(255, 203, 5, 0.7);

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    background-color: #ffd740;
    border-radius: 50%;
  }

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

const Coin = ({ position }) => {
  return <CoinItem position={position} />;
};

export default Coin; 