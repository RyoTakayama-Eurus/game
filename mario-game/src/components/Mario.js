import React from 'react';
import styled, { keyframes } from 'styled-components';

const run = keyframes`
  0% { background-position: 0px 0; }
  25% { background-position: -50px 0; }
  50% { background-position: -100px 0; }
  75% { background-position: -150px 0; }
  100% { background-position: 0px 0; }
`;

const MarioCharacter = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: ${props => props.position.x}px;
  bottom: ${props => 80 + props.position.y}px;
  background-color: #ff0000;
  border-radius: 25px 25px 0 0;
  transform: ${props => props.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'};
  z-index: 10;
  animation: ${run} 0.5s infinite;
  transition: bottom 0.1s;

  &::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 5px;
    width: 40px;
    height: 25px;
    background-color: #ff0000;
    border-radius: 50% 50% 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5px;
    width: 40px;
    height: 15px;
    background-color: #3e59ac;
    border-radius: 0 0 5px 5px;
  }
`;

const Face = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 20px;
  z-index: 11;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 5px;
    height: 5px;
    background-color: #000;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 10px;
    width: 10px;
    height: 3px;
    background-color: #000;
    border-radius: 5px;
  }
`;

const Cap = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  width: 50px;
  height: 15px;
  background-color: #ff0000;
  border-radius: 10px 10px 0 0;
  z-index: 12;

  &::before {
    content: 'M';
    position: absolute;
    top: 0;
    left: 20px;
    font-size: 12px;
    font-weight: bold;
    color: white;
  }
`;

const Mario = ({ position, direction, isJumping }) => {
  return (
    <MarioCharacter position={position} direction={direction} isJumping={isJumping}>
      <Face />
      <Cap />
    </MarioCharacter>
  );
};

export default Mario; 