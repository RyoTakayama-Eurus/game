import React from 'react';
import { PokedexEntry } from '../../types/pokemon';
import { Card, PokemonImage, TypeBadge, FlexContainer } from './StyledComponents';
import styled from 'styled-components';

interface PokemonCardProps {
  pokemon: PokedexEntry;
  onClick?: () => void;
}

const CardContainer = styled(Card)`
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PokemonName = styled.h3`
  text-transform: capitalize;
  margin: 10px 0 5px;
  text-align: center;
`;

const PokemonId = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

const TypesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
      <FlexContainer direction="column">
        <PokemonImage src={pokemon.image} alt={pokemon.name} />
        <PokemonName>{pokemon.name}</PokemonName>
        <TypesContainer>
          {pokemon.types.map(type => (
            <TypeBadge key={type} type={type}>
              {type}
            </TypeBadge>
          ))}
        </TypesContainer>
      </FlexContainer>
    </CardContainer>
  );
};

export default PokemonCard; 