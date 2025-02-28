import React from 'react';
import styled from 'styled-components';

const PlatformBlock = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: 30px;
  left: ${props => props.position.x}px;
  bottom: ${props => props.position.y}px;
  background-color: #c84c0c;
  border: 2px solid #8b2203;
  border-radius: 5px;
  z-index: 3;
  box-shadow: 0 3px 0 #8b2203;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    height: 5px;
    background-color: #e86a2d;
    border-radius: 3px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 5px;
    right: 5px;
    height: 5px;
    background-color: #e86a2d;
    border-radius: 3px;
  }
`;

const Platform = ({ position, width }) => {
  return <PlatformBlock position={position} width={width} />;
};

export default Platform; 