import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Character } from './Character';
import { Platform } from './Platform';
import { Enemy } from './Enemy';
import { Coin } from './Coin';

const GameContainer = styled.div`
  width: 800px;
  height: 500px;
  border: 2px solid #333;
  position: relative;
  overflow: hidden;
  background-color: #6B8CFF;
  margin: 0 auto;
`;

const GameOverlay = styled.div<{ gameOver: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => (props.gameOver ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  z-index: 100;
`;

const RestartButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  margin-top: 20px;
  background-color: #E52521;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #FF4D49;
  }
`;

const ScoreBoard = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 20px;
  z-index: 10;
`;

// プラットフォームの初期配置
const initialPlatforms = [
  { id: 1, x: 0, y: 450, width: 800, height: 50 }, // 地面
  { id: 2, x: 200, y: 350, width: 100, height: 20 },
  { id: 3, x: 400, y: 250, width: 100, height: 20 },
  { id: 4, x: 600, y: 350, width: 100, height: 20 },
];

// コインの初期配置
const initialCoins = [
  { id: 1, x: 250, y: 320 },
  { id: 2, x: 450, y: 220 },
  { id: 3, x: 650, y: 320 },
  { id: 4, x: 300, y: 400 },
];

// 敵の初期配置
const initialEnemies = [
  { id: 1, x: 300, y: 410, direction: 1, speed: 1 },
  { id: 2, x: 500, y: 410, direction: -1, speed: 1.5 },
];

const Game: React.FC = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [character, setCharacter] = useState({
    x: 50,
    y: 400,
    velocityY: 0,
    isJumping: false,
    direction: 1, // 1: 右向き, -1: 左向き
  });
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [coins, setCoins] = useState(initialCoins);
  const [enemies, setEnemies] = useState(initialEnemies);
  
  const gameLoopRef = useRef<number | null>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // キー入力の処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // ゲームループ
  useEffect(() => {
    const gameLoop = () => {
      if (gameOver) return;

      // キャラクターの移動
      setCharacter(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let newVelocityY = prev.velocityY;
        let newIsJumping = prev.isJumping;
        let newDirection = prev.direction;

        // 左右移動
        if (keysPressed.current['ArrowLeft']) {
          newX = Math.max(0, newX - 5);
          newDirection = -1;
        }
        if (keysPressed.current['ArrowRight']) {
          newX = Math.min(760, newX + 5);
          newDirection = 1;
        }

        // ジャンプ
        if (keysPressed.current['ArrowUp'] && !newIsJumping) {
          newVelocityY = -15;
          newIsJumping = true;
        }

        // 重力
        newVelocityY += 0.8;
        newY += newVelocityY;

        // プラットフォームとの衝突判定
        let onPlatform = false;
        platforms.forEach(platform => {
          const characterBottom = newY + 40;
          const platformTop = platform.y;
          
          if (
            newX + 40 > platform.x &&
            newX < platform.x + platform.width &&
            characterBottom >= platformTop &&
            characterBottom <= platformTop + 10 &&
            prev.velocityY >= 0
          ) {
            newY = platformTop - 40;
            newVelocityY = 0;
            newIsJumping = false;
            onPlatform = true;
          }
        });

        // 画面外に落ちた場合はゲームオーバー
        if (newY > 500) {
          setGameOver(true);
        }

        return {
          x: newX,
          y: newY,
          velocityY: newVelocityY,
          isJumping: newIsJumping,
          direction: newDirection,
        };
      });

      // 敵の移動
      setEnemies(prev => {
        return prev.map(enemy => {
          let newX = enemy.x + enemy.speed * enemy.direction;
          
          // 端に到達したら向きを変える
          if (newX <= 0 || newX >= 780) {
            return {
              ...enemy,
              x: newX <= 0 ? 0 : 780,
              direction: -enemy.direction,
            };
          }
          
          return {
            ...enemy,
            x: newX,
          };
        });
      });

      // 敵との衝突判定
      enemies.forEach(enemy => {
        if (
          character.x + 30 > enemy.x &&
          character.x < enemy.x + 30 &&
          character.y + 40 > enemy.y &&
          character.y < enemy.y + 30
        ) {
          // 上から踏んだ場合は敵を倒す
          if (character.velocityY > 0 && character.y + 40 <= enemy.y + 10) {
            setEnemies(prev => prev.filter(e => e.id !== enemy.id));
            setScore(prev => prev + 100);
            // 跳ね返る
            setCharacter(prev => ({
              ...prev,
              velocityY: -10,
            }));
          } else {
            // それ以外はゲームオーバー
            setGameOver(true);
          }
        }
      });

      // コインとの衝突判定
      coins.forEach(coin => {
        if (
          character.x + 30 > coin.x &&
          character.x < coin.x + 20 &&
          character.y + 40 > coin.y &&
          character.y < coin.y + 20
        ) {
          setCoins(prev => prev.filter(c => c.id !== coin.id));
          setScore(prev => prev + 50);
        }
      });

      // 全てのコインを集めたらクリア
      if (coins.length === 0) {
        // ここでゲームクリアの処理を追加することもできます
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current !== null) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameOver, character.x, character.y, platforms, coins, enemies]);

  const handleRestart = () => {
    setGameOver(false);
    setScore(0);
    setCharacter({
      x: 50,
      y: 400,
      velocityY: 0,
      isJumping: false,
      direction: 1,
    });
    setPlatforms(initialPlatforms);
    setCoins(initialCoins);
    setEnemies(initialEnemies);
  };

  return (
    <GameContainer>
      <ScoreBoard>スコア: {score}</ScoreBoard>
      
      <Character x={character.x} y={character.y} direction={character.direction} />
      
      {platforms.map(platform => (
        <Platform
          key={platform.id}
          x={platform.x}
          y={platform.y}
          width={platform.width}
          height={platform.height}
        />
      ))}
      
      {coins.map(coin => (
        <Coin key={coin.id} x={coin.x} y={coin.y} />
      ))}
      
      {enemies.map(enemy => (
        <Enemy key={enemy.id} x={enemy.x} y={enemy.y} />
      ))}
      
      <GameOverlay gameOver={gameOver}>
        <div>ゲームオーバー</div>
        <div>スコア: {score}</div>
        <RestartButton onClick={handleRestart}>リスタート</RestartButton>
      </GameOverlay>
    </GameContainer>
  );
};

export default Game; 