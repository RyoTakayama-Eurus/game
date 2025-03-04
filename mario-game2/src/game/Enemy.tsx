import React from 'react';
import styled from 'styled-components';

interface EnemyProps {
  x: number;
  y: number;
}

const EnemyStyle = styled.div<EnemyProps>`
  width: 30px;
  height: 30px;
  background-color: #8B4513; // 茶色
  border-radius: 50%;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 15px;
    background-color: #A0522D; // 暗い茶色
    border-radius: 10px 10px 5px 5px;
  }
`;

const Feet = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Foot = styled.div`
  width: 10px;
  height: 5px;
  background-color: #000;
  border-radius: 0 0 5px 5px;
`;

const Eye = styled.div`
  position: absolute;
  top: 10px;
  width: 4px;
  height: 4px;
  background-color: #FFF;
  border-radius: 50%;

  &:first-child {
    left: 8px;
  }

  &:last-child {
    right: 8px;
  }
`;

export const Enemy: React.FC<EnemyProps> = ({ x, y }) => {
  return (
    <EnemyStyle x={x} y={y}>
      <Eye />
      <Eye />
      <Feet>
        <Foot />
        <Foot />
      </Feet>
    </EnemyStyle>
  );
}; 