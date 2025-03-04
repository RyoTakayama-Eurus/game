import React from 'react';
import styled from 'styled-components';

interface PlatformProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const PlatformStyle = styled.div<PlatformProps>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: #8B4513; // 茶色
  border-top: 5px solid #A0522D; // 上部の縁取り
  
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #CD853F; // 明るい茶色のハイライト
  }
`;

export const Platform: React.FC<PlatformProps> = ({ x, y, width, height }) => {
  return <PlatformStyle x={x} y={y} width={width} height={height} />;
}; 