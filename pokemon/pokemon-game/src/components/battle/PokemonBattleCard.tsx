import React from 'react';
import { BattlePokemon } from '../../types/pokemon';
import { Card, PokemonImage, TypeBadge, HealthBar, FlexContainer } from '../common/StyledComponents';
import styled from 'styled-components';

interface PokemonBattleCardProps {
  pokemon: BattlePokemon;
  isPlayer: boolean;
}

const BattleCard = styled(Card)<{ isPlayer: boolean }>`
  display: flex;
  flex-direction: ${props => props.isPlayer ? 'row' : 'row-reverse'};
  align-items: center;
  padding: 15px;
  margin: 10px 0;
`;

const PokemonInfo = styled.div`
  flex: 1;
  padding: 0 15px;
`;

const PokemonName = styled.h3`
  text-transform: capitalize;
  margin: 0 0 5px;
`;

const StatsContainer = styled.div`
  margin-top: 10px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
`;

const TypesContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const HealthInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const PokemonBattleCard: React.FC<PokemonBattleCardProps> = ({ pokemon, isPlayer }) => {
  const healthPercentage = (pokemon.currentHp / pokemon.stats.hp) * 100;
  
  return (
    <BattleCard isPlayer={isPlayer}>
      <PokemonImage 
        src={isPlayer ? pokemon.sprites.back_default : pokemon.sprites.front_default} 
        alt={pokemon.name} 
      />
      
      <PokemonInfo>
        <PokemonName>{pokemon.name}</PokemonName>
        
        <TypesContainer>
          {pokemon.types.map(type => (
            <TypeBadge key={type} type={type}>
              {type}
            </TypeBadge>
          ))}
        </TypesContainer>
        
        <HealthInfo>
          <span>HP</span>
          <span>{pokemon.currentHp} / {pokemon.stats.hp}</span>
        </HealthInfo>
        
        <HealthBar percentage={healthPercentage} />
        
        <StatsContainer>
          <StatRow>
            <span>攻撃</span>
            <span>{pokemon.stats.attack}</span>
          </StatRow>
          <StatRow>
            <span>防御</span>
            <span>{pokemon.stats.defense}</span>
          </StatRow>
          <StatRow>
            <span>素早さ</span>
            <span>{pokemon.stats.speed}</span>
          </StatRow>
        </StatsContainer>
      </PokemonInfo>
    </BattleCard>
  );
};

export default PokemonBattleCard; 