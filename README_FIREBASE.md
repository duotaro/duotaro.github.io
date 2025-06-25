# Firebase統合セットアップガイド

このブランチ（firebase-integration）では、LocalStorageをFirebaseに置き換えてクラウドベースのデータ保存を実装しています。

## 必要な設定

### 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: habit-tracker-app）
4. Google Analyticsの設定（任意）
5. プロジェクトを作成

### 2. Firebase Authentication の設定

1. Firebase Console でプロジェクトを選択
2. 左メニューから「Authentication」を選択
3. 「始める」をクリック
4. 「Sign-in method」タブで「匿名」を有効化

### 3. Cloud Firestore の設定

1. Firebase Console で「Firestore Database」を選択
2. 「データベースの作成」をクリック
3. セキュリティルールを選択：
   - 開発中: 「テストモードで開始」
   - 本番環境: 「ロックモードで開始」（後でルールを設定）

### 4. Firebase設定の取得

1. Firebase Console でプロジェクト設定（歯車アイコン）をクリック
2. 「全般」タブを選択
3. 「マイアプリ」セクションで「ウェブアプリを追加」をクリック
4. アプリ名を入力（例: habit-tracker-web）
5. Firebase Hosting は今回はスキップ
6. 設定オブジェクトをコピー

### 5. 環境変数の設定

`.env.local` ファイルを作成し、以下の値を設定してください：

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Notion API (既存)
NEXT_PUBLIC_NOTION_TOKEN=your-notion-token
URL_PREFIX=
```

### 6. Firestore セキュリティルールの設定（重要）

**方法1: Firebase CLIを使用（推奨）**

1. Firebase CLIをインストール:
```bash
npm install -g firebase-tools
```

2. Firebase プロジェクトにログイン:
```bash
firebase login
firebase use --add  # プロジェクトを選択
```

3. セキュリティルールをデプロイ:
```bash
firebase deploy --only firestore:rules
```

**方法2: Firebase Console で手動設定**

Firebase Console の Firestore Database で「ルール」タブを選択し、`firestore.rules` の内容をコピー＆ペーストして「公開」をクリック。

**セキュリティルールの内容:**
- 許可されたユーザーIDのみアクセス可能
- Firebase匿名認証の有効/無効を制御
- カスタムユーザーIDのホワイトリスト機能
- 未許可アクセスの完全ブロック

**⚠️ 重要**: このルール設定により、サーバーサイドで真のセキュリティが確保されます。クライアントサイドのバイパスは不可能になります。

## データ構造

Firestoreの`habitData`コレクションに、各ユーザーのデータが以下の構造で保存されます：

```javascript
{
  userId: {
    points: {},              // タスクごとの累計ポイント
    oneTimeTasks: [],        // 単発タスクの配列
    startDate: "2024-01-01", // 開始日
    rewardSetting: "...",    // ご褒美設定
    goals: [...],            // 目標設定
    selfTalkMessages: [...], // セルフトークメッセージ
    completionData: {        // 今日の完了状況
      date: "2024-01-01",
      completed: []
    }
  }
}
```

## 主な変更点

1. **LocalStorage → Firebase**: すべてのデータ保存がFirestoreに移行
2. **匿名認証**: パスワード認証後にFirebase匿名認証を実行
3. **リアルタイム同期**: 複数デバイス間でのデータ同期が可能
4. **自動バックアップ**: Firebaseによるデータの自動バックアップ

## 開発・デプロイ手順

1. 環境変数を設定
2. `npm run dev` で開発サーバー起動
3. `npm run build` でビルド
4. Firebase Hostingまたは既存のホスティングサービスにデプロイ

## トラブルシューティング

- **ビルドエラー**: 環境変数が正しく設定されているか確認
- **認証エラー**: Firebase AuthenticationでAnonymous認証が有効か確認
- **データ保存エラー**: Firestoreのセキュリティルールを確認

## セキュリティ注意事項

- 本番環境では適切なFirestoreセキュリティルールを設定してください
- APIキーは公開されても問題ありませんが、セキュリティルールで適切にアクセス制御を行ってください
- パスワード認証は既存のシステムを維持し、Firebase認証と組み合わせて使用しています