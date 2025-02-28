import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Mario from './Mario';
import Enemy from './Enemy';
import Platform from './Platform';
import Coin from './Coin';
import ScoreBoard from './ScoreBoard';

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #5c94fc;
  overflow: hidden;
`;

const Ground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: #5a3700;
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    width: 100%;
    height: 20px;
    background-color: #00a800;
  }
`;

const Game = ({ onGameOver }) => {
  const [marioPosition, setMarioPosition] = useState({ x: 100, y: 0 });
  const [marioDirection, setMarioDirection] = useState('right');
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [enemies, setEnemies] = useState([]);
  const [platforms, setPlatforms] = useState([
    { id: 1, x: 300, y: 350, width: 200, height: 30 },
    { id: 2, x: 600, y: 250, width: 200, height: 30 },
    { id: 3, x: 100, y: 200, width: 150, height: 30 },
  ]);
  const [coins, setCoins] = useState([
    { id: 1, x: 350, y: 300 },
    { id: 2, x: 650, y: 200 },
    { id: 3, x: 150, y: 150 },
    { id: 4, x: 450, y: 100 },
  ]);
  
  const gameRef = useRef(null);
  const keysPressed = useRef({});
  const gameLoopRef = useRef(null);
  const enemySpawnTimerRef = useRef(null);
  
  // ゲームの初期化
  useEffect(() => {
    // キー入力のイベントリスナー設定
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
      
      // ジャンプ処理
      if ((e.key === ' ' || e.key === 'ArrowUp') && !isJumping) {
        setIsJumping(true);
      }
    };
    
    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // 敵の生成タイマー
    enemySpawnTimerRef.current = setInterval(() => {
      const newEnemy = {
        id: Date.now(),
        x: Math.random() > 0.5 ? 0 : 800,
        y: 0,
        direction: Math.random() > 0.5 ? 'left' : 'right',
        speed: 2 + Math.random() * 2
      };
      
      setEnemies(prev => [...prev, newEnemy]);
    }, 3000);
    
    // ゲームループの開始
    startGameLoop();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(enemySpawnTimerRef.current);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, []);
  
  // ゲームループ
  const startGameLoop = () => {
    let lastTime = 0;
    
    const gameLoop = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      updateGame(deltaTime);
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };
  
  // ゲーム状態の更新
  const updateGame = (deltaTime) => {
    // マリオの移動
    const newPosition = { ...marioPosition };
    const moveSpeed = 5;
    
    if (keysPressed.current['ArrowLeft']) {
      newPosition.x -= moveSpeed;
      setMarioDirection('left');
    }
    
    if (keysPressed.current['ArrowRight']) {
      newPosition.x += moveSpeed;
      setMarioDirection('right');
    }
    
    // ジャンプ処理
    if (isJumping) {
      // 簡易的な重力と跳躍の計算
      newPosition.y += Math.sin(Date.now() / 100) * 10;
      
      // ジャンプの終了判定
      if (newPosition.y <= 0) {
        newPosition.y = 0;
        setIsJumping(false);
      }
    } else {
      // 地面にいる場合
      newPosition.y = 0;
      
      // プラットフォームの上にいるかチェック
      platforms.forEach(platform => {
        const onPlatform = 
          newPosition.x + 30 > platform.x && 
          newPosition.x < platform.x + platform.width &&
          Math.abs(newPosition.y + 50 - platform.y) < 10;
          
        if (onPlatform) {
          newPosition.y = platform.y - 50;
        }
      });
    }
    
    // 画面端の処理
    if (newPosition.x < 0) newPosition.x = 0;
    if (newPosition.x > 770) newPosition.x = 770;
    
    setMarioPosition(newPosition);
    
    // 敵の更新
    setEnemies(prevEnemies => {
      return prevEnemies.map(enemy => {
        const newX = enemy.direction === 'left' 
          ? enemy.x - enemy.speed 
          : enemy.x + enemy.speed;
          
        // 画面外に出たら削除
        if (newX < -50 || newX > 850) {
          return null;
        }
        
        // マリオとの衝突判定
        const collision = 
          Math.abs(newPosition.x - enemy.x) < 40 && 
          Math.abs(newPosition.y - enemy.y) < 40;
          
        if (collision) {
          // マリオが上から踏んだ場合
          if (newPosition.y > enemy.y) {
            setScore(prev => prev + 100);
            return null;
          } else {
            // ゲームオーバー
            onGameOver(score);
            return enemy;
          }
        }
        
        return { ...enemy, x: newX };
      }).filter(Boolean);
    });
    
    // コインの収集判定
    setCoins(prevCoins => {
      return prevCoins.filter(coin => {
        const collected = 
          Math.abs(newPosition.x - coin.x) < 30 && 
          Math.abs(newPosition.y - coin.y) < 30;
          
        if (collected) {
          setScore(prev => prev + 50);
          return false;
        }
        return true;
      });
    });
  };
  
  return (
    <GameContainer ref={gameRef}>
      <ScoreBoard score={score} />
      <Mario position={marioPosition} direction={marioDirection} isJumping={isJumping} />
      
      {enemies.map(enemy => (
        <Enemy key={enemy.id} position={{ x: enemy.x, y: enemy.y }} direction={enemy.direction} />
      ))}
      
      {platforms.map(platform => (
        <Platform key={platform.id} position={{ x: platform.x, y: platform.y }} width={platform.width} />
      ))}
      
      {coins.map(coin => (
        <Coin key={coin.id} position={{ x: coin.x, y: coin.y }} />
      ))}
      
      <Ground />
    </GameContainer>
  );
};

export default Game; 