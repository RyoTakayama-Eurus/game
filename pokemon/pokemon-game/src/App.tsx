import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Pokedex from './components/pokedex/Pokedex';
import Battle from './components/battle/Battle';
import { Button, Container, Title } from './components/common/StyledComponents';

// グローバルスタイル
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    color: #333;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #ff5350;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2.5rem;
`;

const Navigation = styled.nav`
  background-color: #333;
  padding: 10px 0;
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const NavButton = styled(Button)`
  background-color: ${props => props.primary ? '#ff5350' : 'transparent'};
  color: white;
  border: ${props => props.primary ? 'none' : '1px solid white'};
  
  &:hover {
    background-color: ${props => props.primary ? '#e74c3c' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
`;

// アプリケーションの画面タイプ
type ScreenType = 'home' | 'pokedex' | 'battle';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');

  // 画面の切り替え
  const renderScreen = () => {
    switch (currentScreen) {
      case 'pokedex':
        return <Pokedex />;
      case 'battle':
        return <Battle />;
      default:
        return (
          <Container>
            <Title>ポケモンゲームへようこそ！</Title>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <p>このゲームでは、ポケモンバトルを楽しんだり、ポケモン図鑑を閲覧したりすることができます。</p>
              <p>上部のナビゲーションから、利用したい機能を選択してください。</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <Button primary onClick={() => setCurrentScreen('battle')}>
                バトルを始める
              </Button>
              <Button onClick={() => setCurrentScreen('pokedex')}>
                ポケモン図鑑を見る
              </Button>
            </div>
          </Container>
        );
    }
  };

  return (
    <AppContainer>
      <GlobalStyle />
      
      <Header>
        <HeaderTitle>ポケモンゲーム</HeaderTitle>
      </Header>
      
      <Navigation>
        <NavContainer>
          <NavButton 
            primary={currentScreen === 'home'} 
            onClick={() => setCurrentScreen('home')}
          >
            ホーム
          </NavButton>
          <NavButton 
            primary={currentScreen === 'pokedex'} 
            onClick={() => setCurrentScreen('pokedex')}
          >
            ポケモン図鑑
          </NavButton>
          <NavButton 
            primary={currentScreen === 'battle'} 
            onClick={() => setCurrentScreen('battle')}
          >
            バトル
          </NavButton>
        </NavContainer>
      </Navigation>
      
      <main>
        {renderScreen()}
      </main>
      
      <Footer>
        <p>© 2023 ポケモンゲーム - Reactで作成</p>
        <p>このアプリケーションはPokeAPIを使用しています。</p>
      </Footer>
    </AppContainer>
  );
}

export default App;
