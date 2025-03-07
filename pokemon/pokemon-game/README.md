# ポケモンゲーム

Reactで作成したポケモンゲームアプリケーションです。ポケモンバトルを楽しんだり、ポケモン図鑑を閲覧したりすることができます。

## 機能

- **ポケモン図鑑**: 様々なポケモンの情報を閲覧できます。
- **ポケモンバトル**: ランダムに選ばれたポケモン同士でバトルを行うことができます。

## 技術スタック

- React
- TypeScript
- Styled Components
- Axios

## APIについて

このアプリケーションは[PokeAPI](https://pokeapi.co/)を使用しています。PokeAPIは無料で利用できるポケモンデータのAPIです。

## インストール方法

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/pokemon-game.git

# プロジェクトディレクトリに移動
cd pokemon-game

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start
```

## 使い方

1. アプリケーションを起動すると、ホーム画面が表示されます。
2. ナビゲーションメニューから「ポケモン図鑑」または「バトル」を選択します。
3. ポケモン図鑑では、ポケモンの一覧を閲覧できます。
4. バトル画面では、ランダムに選ばれたポケモン同士でバトルを行うことができます。

## バトルの仕組み

1. プレイヤーと敵のポケモンがランダムに選ばれます。
2. 素早さの高いポケモンが先攻となります。
3. プレイヤーは4つの技の中から1つを選んで攻撃します。
4. 敵のポケモンはランダムな技で反撃します。
5. HPが0になったポケモンが負けとなります。

## 今後の改善点

- より多くのポケモンを追加
- タイプ相性の詳細な実装
- 複数のポケモンを使ったバトル
- ポケモンの捕獲機能
- ユーザーアカウント機能

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 謝辞

- [PokeAPI](https://pokeapi.co/)：ポケモンデータの提供
- ポケモンは株式会社ポケモンの登録商標です。このアプリケーションは非公式であり、株式会社ポケモンとは一切関係ありません。
