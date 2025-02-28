import styled from 'styled-components';

// コンテナ
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// カード
export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

// ボタン
export const Button = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? '#ff5350' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px;

  &:hover {
    background-color: ${props => props.primary ? '#e74c3c' : '#ddd'};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// グリッド
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

// フレックスコンテナ
export const FlexContainer = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

// タイプバッジ
export const TypeBadge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-right: 5px;
  color: white;
  background-color: ${props => {
    switch (props.type) {
      case 'fire': return '#F08030';
      case 'water': return '#6890F0';
      case 'grass': return '#78C850';
      case 'electric': return '#F8D030';
      case 'ice': return '#98D8D8';
      case 'fighting': return '#C03028';
      case 'poison': return '#A040A0';
      case 'ground': return '#E0C068';
      case 'flying': return '#A890F0';
      case 'psychic': return '#F85888';
      case 'bug': return '#A8B820';
      case 'rock': return '#B8A038';
      case 'ghost': return '#705898';
      case 'dragon': return '#7038F8';
      case 'dark': return '#705848';
      case 'steel': return '#B8B8D0';
      case 'fairy': return '#EE99AC';
      default: return '#A8A878'; // normal
    }
  }};
`;

// ヘルスバー
export const HealthBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px 0;

  &::after {
    content: '';
    display: block;
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: ${props => {
      if (props.percentage > 50) return '#78C850';
      if (props.percentage > 20) return '#F8D030';
      return '#F08030';
    }};
    transition: width 0.3s ease;
  }
`;

// タイトル
export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

// サブタイトル
export const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 20px;
`;

// ポケモン画像コンテナ
export const PokemonImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;

// バトルメッセージ
export const BattleMessage = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  min-height: 50px;
  font-size: 18px;
`; 