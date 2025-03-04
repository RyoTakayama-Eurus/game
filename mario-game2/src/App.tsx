import React from 'react';
import './App.css';
import Game from './game/Game';

function App() {
  return (
    <div className="App">
      <h1>スーパーマリオ風ゲーム</h1>
      <p>矢印キーで移動: ←→ で左右移動、↑ でジャンプ</p>
      <Game />
    </div>
  );
}

export default App;
