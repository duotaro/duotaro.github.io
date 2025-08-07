# 月次KPI管理機能実装記録

**実装日**: 2025-01-17  
**要望書**: `docs/UPDATE.md`  

## 実装概要

既存の習慣化アプリの目標ページに月次KPI管理機能を追加しました。localStorageでのデータ管理とFirebase同期に対応しています。

## 実装した機能

### 1. データ構造設計

**月次KPIデータ構造** (localStorage: `monthlyKPIs`)
```javascript
{
  "2025-01": { // YYYY-MM形式
    primaryKPIs: {
      avgStayTime: { minutes: 0, seconds: 0 }, // 平均滞在時間
      bounceRate: 0, // 直帰率（%）
      repeatRate: 0, // リピート率（%）
      internalLinkClickRate: 0, // 内部リンククリック率（%）
      commentsAndInquiries: 0, // コメント・問い合わせ数
      snsShares: 0 // SNSシェア数
    },
    secondaryKPIs: {
      monthlyPV: 0, // 月間PV数
      monthlyPVChange: 0, // 前月比（%）
      searchTrafficRate: 0, // 検索流入割合（%）
      improvedRankingArticles: 0, // 検索順位向上記事数
      revisedArticles: 0, // 改修完了記事数
      newArticles: 0 // 新規記事公開数
    },
    lastUpdated: "2025-01-17T..."
  }
}
```

### 2. 作成したファイル

#### Context
- `context/MonthlyKPIContext.jsx`
  - localStorage自動保存/読み込み
  - CRUD操作
  - データエクスポート/インポート
  - Firebase同期機能

#### コンポーネント
- `components/habit/MonthlyKPIEditor.jsx`
  - KPI入力・編集用モーダル
  - 最重要KPI/二次KPIのタブ切り替え
  - 各KPI項目の入力フォーム

- `components/habit/MonthlyKPIViewer.jsx`
  - KPI表示・推移グラフ
  - KPI種別・項目選択
  - 月別データ一覧表
  - 目標達成状況表示

- `components/habit/MonthlyKPISection.jsx`
  - メインKPI管理画面
  - 月選択・新規追加・削除
  - データエクスポート/インポート

### 3. 既存ファイルの更新

#### Provider追加
- `pages/_app.js`
  - MonthlyKPIProviderを追加

#### UI統合
- `pages/index.js`
  - 目標ページにサブタブを追加
  - 「🎯 目標管理」と「📊 月次KPI」の切り替え
  - MonthlyKPISectionコンポーネントの統合

#### Firebase同期対応
- `hooks/useSyncData.jsx`
  - アップロード時にmonthlyKPIsを含める
  - ダウンロード時にmonthlyKPIsを復元

## 主要機能

### KPI管理
- ✅ 月毎のKPIデータCRUD操作
- ✅ 最重要KPI（読者価値）6項目の管理
- ✅ 二次KPI（サイト成長）6項目の管理
- ✅ 現在月の自動選択

### 表示・分析
- ✅ プルダウンでKPI項目選択
- ✅ 推移グラフ（データポイント表示）
- ✅ 目標達成状況の可視化
- ✅ 月別データ一覧表

### データ管理
- ✅ データエクスポート（JSON）
- ✅ データインポート（JSON）
- ✅ 月別データ削除
- ✅ Firebase同期（既存のアップロード/ダウンロードボタン）

## KPI項目一覧

### 最重要KPI（読者価値）
1. **平均滞在時間** - 目標: 3分以上
2. **直帰率** - 目標: 60%以下
3. **リピート率** - 目標: 20%以上
4. **内部リンククリック率** - 目標: 15%以上
5. **コメント・問い合わせ数** - 目標: 5件以上
6. **SNSシェア数** - 目標: 10件以上

### 二次KPI（サイト成長）
1. **月間PV数** - 前月比向上
2. **前月比** - 正の成長
3. **検索流入割合** - 目標: 60%以上
4. **検索順位向上記事数** - 目標: 5記事以上
5. **改修完了記事数** - 目標: 12本
6. **新規記事公開数** - 目標: 8本

## アクセス方法

1. アプリにアクセス
2. 「🎯 目標」タブをクリック
3. 「📊 月次KPI」サブタブを選択
4. KPI管理画面で各種操作を実行

## Firebase同期

既存の設定画面の同期機能に統合済み:
- **📤 アップロード**: KPIデータも一緒にFirestoreに保存
- **📥 ダウンロード**: KPIデータも一緒に復元

## 技術的詳細

### ファイル構成
```
context/
  MonthlyKPIContext.jsx          # KPI管理Context

components/habit/
  MonthlyKPIEditor.jsx           # KPI編集モーダル
  MonthlyKPIViewer.jsx           # KPI表示・グラフ
  MonthlyKPISection.jsx          # メイン管理画面

pages/
  _app.js                        # Provider追加
  index.js                       # UI統合

hooks/
  useSyncData.jsx                # Firebase同期対応
```

### localStorage キー
- `monthlyKPIs`: 月次KPIデータ

### Firestore パス
- `habitData/{userId}.monthlyKPIs`

## ビルド状況

- ✅ ビルド成功
- ✅ 型チェック通過
- ✅ 静的エクスポート完了

## 今後の改善案

1. **グラフ機能の拡張**
   - 複数KPIの比較表示
   - より詳細なグラフ表示

2. **分析機能の追加**
   - KPI相関分析
   - 達成率レポート

3. **目標設定の柔軟化**
   - 月別目標値の設定
   - 動的目標値の変更

## 実装時間

約2-3時間での実装完了（設計、開発、テスト含む）