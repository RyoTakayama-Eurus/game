import React, { useState, useEffect } from 'react';
import { getPokemon, getRandomPokemon } from '../../services/pokemonService';
import { BattlePokemon, Move, Pokemon } from '../../types/pokemon';
import PokemonBattleCard from './PokemonBattleCard';
import { Container, Button, BattleMessage, FlexContainer, Title } from '../common/StyledComponents';
import styled from 'styled-components';

const BattleContainer = styled(Container)`
  max-width: 800px;
`;

const BattleArena = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const MovesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
`;

const MoveButton = styled(Button)<{ moveType: string }>`
  background-color: ${props => {
    switch (props.moveType) {
      case 'fire': return '#F08030';
      case 'water': return '#6890F0';
      case 'grass': return '#78C850';
      case 'electric': return '#F8D030';
      case 'normal': return '#A8A878';
      default: return '#A8A878';
    }
  }};
  color: white;
  width: 100%;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Battle: React.FC = () => {
  const [playerPokemon, setPlayerPokemon] = useState<BattlePokemon | null>(null);
  const [enemyPokemon, setEnemyPokemon] = useState<BattlePokemon | null>(null);
  const [battleMessage, setBattleMessage] = useState<string>('バトルを開始します！');
  const [isBattleOver, setIsBattleOver] = useState<boolean>(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    startBattle();
  }, []);

  const startBattle = async () => {
    setIsLoading(true);
    setBattleMessage('バトルを開始します！');
    setIsBattleOver(false);
    
    try {
      // プレイヤーとエネミーのポケモンをランダムに取得
      const playerData = await getRandomPokemon();
      const enemyData = await getRandomPokemon();
      
      // バトル用のポケモンデータに変換
      const player = convertToBattlePokemon(playerData);
      const enemy = convertToBattlePokemon(enemyData);
      
      setPlayerPokemon(player);
      setEnemyPokemon(enemy);
      
      // 素早さが高い方が先攻
      setIsPlayerTurn(player.stats.speed >= enemy.stats.speed);
      
      setBattleMessage(`${player.name} と ${enemy.name} のバトルが始まった！`);
    } catch (error) {
      console.error('バトルの開始に失敗しました:', error);
      setBattleMessage('エラーが発生しました。もう一度試してください。');
    } finally {
      setIsLoading(false);
    }
  };

  const convertToBattlePokemon = (pokemon: Pokemon): BattlePokemon => {
    return {
      ...pokemon,
      currentHp: pokemon.stats.hp
    };
  };

  const handleMoveSelect = (move: Move) => {
    if (!playerPokemon || !enemyPokemon || !isPlayerTurn || isBattleOver) return;
    
    // プレイヤーの攻撃
    executeMove(playerPokemon, enemyPokemon, move, true);
  };

  const executeMove = (attacker: BattlePokemon, defender: BattlePokemon, move: Move, isPlayer: boolean) => {
    // ダメージ計算（簡易版）
    const attackStat = attacker.stats.attack;
    const defenseStat = defender.stats.defense;
    const power = move.power;
    
    // タイプ相性は簡略化
    const effectiveness = 1;
    
    // ダメージ計算式（簡易版）
    let damage = Math.floor(((2 * 50 / 5 + 2) * power * attackStat / defenseStat) / 50 + 2) * effectiveness;
    damage = Math.max(1, damage); // 最低1ダメージ
    
    // HPを減らす
    const newDefenderHp = Math.max(0, defender.currentHp - damage);
    
    // メッセージを設定
    setBattleMessage(`${attacker.name}の${move.name}！ ${defender.name}に${damage}のダメージ！`);
    
    // 状態を更新
    if (isPlayer) {
      setEnemyPokemon(prev => prev ? { ...prev, currentHp: newDefenderHp } : null);
      
      // 敵のHPが0になったかチェック
      if (newDefenderHp <= 0 && enemyPokemon) {
        setBattleMessage(`${enemyPokemon.name}は倒れた！ あなたの勝利！`);
        setIsBattleOver(true);
        return;
      }
      
      // ターンを敵に渡す
      setIsPlayerTurn(false);
      
      // 敵の攻撃を遅延実行
      setTimeout(() => {
        if (enemyPokemon && playerPokemon) {
          const randomMove = enemyPokemon.moves[Math.floor(Math.random() * enemyPokemon.moves.length)];
          executeMove(enemyPokemon, playerPokemon, randomMove, false);
        }
      }, 1500);
    } else {
      setPlayerPokemon(prev => prev ? { ...prev, currentHp: newDefenderHp } : null);
      
      // プレイヤーのHPが0になったかチェック
      if (newDefenderHp <= 0 && playerPokemon) {
        setBattleMessage(`${playerPokemon.name}は倒れた！ あなたの敗北...`);
        setIsBattleOver(true);
        return;
      }
      
      // ターンをプレイヤーに戻す
      setIsPlayerTurn(true);
    }
  };

  const handleRunAway = () => {
    setBattleMessage('バトルから逃げ出した！');
    setIsBattleOver(true);
  };

  if (isLoading) {
    return (
      <BattleContainer>
        <Title>ポケモンバトル</Title>
        <div>ポケモンデータを読み込み中...</div>
      </BattleContainer>
    );
  }

  return (
    <BattleContainer>
      <Title>ポケモンバトル</Title>
      
      <BattleArena>
        {enemyPokemon && (
          <PokemonBattleCard pokemon={enemyPokemon} isPlayer={false} />
        )}
        
        {playerPokemon && (
          <PokemonBattleCard pokemon={playerPokemon} isPlayer={true} />
        )}
      </BattleArena>
      
      <BattleMessage>{battleMessage}</BattleMessage>
      
      {isBattleOver ? (
        <ActionButtons>
          <Button primary onClick={startBattle}>
            新しいバトルを開始
          </Button>
        </ActionButtons>
      ) : (
        <>
          <MovesContainer>
            {playerPokemon?.moves.map((move, index) => (
              <MoveButton
                key={index}
                onClick={() => handleMoveSelect(move)}
                disabled={!isPlayerTurn}
                moveType={move.type}
              >
                {move.name} ({move.power})
              </MoveButton>
            ))}
          </MovesContainer>
          
          <ActionButtons>
            <Button onClick={handleRunAway}>
              逃げる
            </Button>
          </ActionButtons>
        </>
      )}
    </BattleContainer>
  );
};

export default Battle; 