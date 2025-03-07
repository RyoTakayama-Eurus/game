# スーパーマリオ風ゲーム

Reactで作成したシンプルなスーパーマリオ風のゲームです。

## 特徴

- キーボード操作でマリオを動かせます
- プラットフォームの上を移動
- 敵キャラクターとの衝突判定
- コインの収集
- スコアシステム

## プレイ方法

- **左矢印キー**：左に移動
- **右矢印キー**：右に移動
- **上矢印キー**：ジャンプ

## ゲームのルール

- 敵キャラクターを上から踏むと倒せます
- 敵キャラクターに横から当たるとゲームオーバーになります
- コインを集めるとスコアが加算されます
- 画面外に落ちるとゲームオーバーになります

## インストール方法

このリポジトリをクローンした後、以下のコマンドを実行します：

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm start
```

## 使用技術

- React
- TypeScript
- Styled Components

## 今後の拡張予定

- より多くのレベル
- パワーアップアイテム
- サウンドエフェクト
- モバイル対応
