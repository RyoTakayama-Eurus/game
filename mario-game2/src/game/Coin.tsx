import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface CoinProps {
  x: number;
  y: number;
}

const rotate = keyframes`
  0% {
    transform: rotateY(0deg);
    width: 20px;
  }
  50% {
    transform: rotateY(90deg);
    width: 5px;
  }
  100% {
    transform: rotateY(180deg);
    width: 20px;
  }
`;

const shine = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const CoinStyle = styled.div<CoinProps>`
  width: 20px;
  height: 20px;
  background-color: #FFD700; // 金色
  border-radius: 50%;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  animation: ${rotate} 1s infinite alternate;
  box-shadow: 0 0 10px #FFFFE0; // 光るエフェクト
  
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 10px;
    height: 10px;
    background-color: #FFA500; // オレンジ色の中心
    border-radius: 50%;
    animation: ${shine} 1s infinite;
  }
`;

export const Coin: React.FC<CoinProps> = ({ x, y }) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? <CoinStyle x={x} y={y} /> : null;
}; 