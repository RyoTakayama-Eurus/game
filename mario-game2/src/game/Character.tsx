import React from 'react';
import styled from 'styled-components';

interface CharacterProps {
  x: number;
  y: number;
  direction: number; // 1: 右向き, -1: 左向き
}

const CharacterSprite = styled.div<CharacterProps>`
  width: 40px;
  height: 40px;
  background-color: #E52521; // マリオの赤色
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: scaleX(${props => props.direction});

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    width: 40px;
    height: 10px;
    background-color: #E52521; // 帽子部分
    border-radius: 20px 20px 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 5px;
    width: 30px;
    height: 5px;
    background-color: #723E17; // 靴部分
    border-radius: 0 0 5px 5px;
  }
`;

const Face = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 20px;
  background-color: #FFDEC7; // 肌色
  border-radius: 15px 15px 10px 10px;
`;

const Eye = styled.div`
  position: absolute;
  top: 5px;
  left: 20px;
  width: 5px;
  height: 5px;
  background-color: #000;
  border-radius: 50%;
`;

const Mustache = styled.div`
  position: absolute;
  top: 15px;
  left: 10px;
  width: 20px;
  height: 3px;
  background-color: #000;
  border-radius: 2px;
`;

export const Character: React.FC<CharacterProps> = ({ x, y, direction }) => {
  return (
    <CharacterSprite x={x} y={y} direction={direction}>
      <Face>
        <Eye />
        <Mustache />
      </Face>
    </CharacterSprite>
  );
}; 