import { useState } from 'react';
import { REVIEW_TEXT } from '../../const/habitConstants';
import { VISUALIZATION_TEMPLATES } from '../../const/templateConstants';

const TemplateSection = () => {
  const [activeTab, setActiveTab] = useState('goals');
  const [activeBukeiTab, setActiveBukeiTab] = useState('new-article');
  const [articlePath, setArticlePath] = useState('');
  const [imagePath, setImagePath] = useState('');
  
  // チェックボックスの状態管理（新規記事生成用）
  const [checkedSections, setCheckedSections] = useState({
    'idea-selection': false,
    'generation-request': false,
    'content-improvement': false,
    'review': false,
    'release': false
  });

  // チェックボックスの状態管理（応用記事改修用）
  const [checkedApplicationSections, setCheckedApplicationSections] = useState({
    'quality-check': false,
    'revision-execution': false,
    'content-brushup': false,
    'review': false,
    'release': false
  });

  // チェックボックスの状態管理（古典記事改修用）
  const [checkedClassicSections, setCheckedClassicSections] = useState({
    'revision-execution': false,
    'content-brushup': false,
    'review': false,
    'release': false
  });

  const handleSectionCheck = (sectionId) => {
    setCheckedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleApplicationSectionCheck = (sectionId) => {
    setCheckedApplicationSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleClassicSectionCheck = (sectionId) => {
    setCheckedClassicSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getSectionData = () => {
    const displayArticlePath = articlePath || 'history/bukei_shichisyo/app/src/data/articles_md/application/weiliauzi/health_lifestyle_learning/substance_over_style_weight_management.md';
    const displayImagePath = imagePath || 'history/bukei_shichisyo/app/public/articles/application/weiliauzi/relationships/images/substance_over_style_weight_management_hero.png';
    
    return [
      {
        id: 'idea-selection',
        title: '推奨アイデア選抜',
        content: `### 推奨記事ネタ生成スクリプト実行

history/bukei_shichisyo/docs/article/idea/weekly_idea_report.md
にある推奨アイデアが使えそうなら、ここは飛ばしても良い。
\`\`\`
cd /Users/taroyamauchi/Desktop/tyamauchi/idea/history/bukei_shichisyo/docs/article/create

python3 article_idea_generator.py
\`\`\`

### 推奨アイデア選抜
history/bukei_shichisyo/docs/article/idea/weekly_idea_report.md
の「推奨記事アイデア Top 5」からアイデアを選出`
      },
      {
        id: 'generation-request',
        title: '生成依頼',
        content: `### 生成依頼プロンプト修正
history/bukei_shichisyo/docs/article/create/PLEASE_CREATE_NEW_ARTICLE.md
- ### 古典の教え WHY
- ### 解決したい悩み　WHAT
- ### 3. 採用アイデア
の内容を、選出アイデアの内容で上書き

### 依頼
以下のプロンプトを投げて作成依頼
\`\`\`
history/bukei_shichisyo/docs/article/create/PLEASE_CREATE_NEW_ARTICLE.md
こちらにお願いを記載しました。読んで作業を開始ください。 
\`\`\``
      },
      {
        id: 'content-improvement',
        title: '記事内容ブラッシュアップ',
        content: `### タイトル確認
タイトルの内容を確認する。
\`\`\`
作成した記事のタイトルが history/bukei_shichisyo/docs/article/TITLE_GUIDE.md のガイドラインに則っているか確認してください。
必要であれば修正してください。
\`\`\`
`
      },
      {
        id: 'review',
        title: 'ヒーロー画像追加',
        content: `
#### Canvaで画像生成
https://www.canva.com/design/DAGsomAbSJo/A07GpGb2A_lnPz5eXm2Wyg/edit?ui=eyJEIjp7IlAiOnsiQiI6ZmFsc2V9fX0
ここで記事タイトル入れて、ダウンロード

#### PNGファイルを配置して変換
history/bukei_shichisyo/app/public/articles配下の適切な位置に配置
WebP変換
\`\`\`
武経七書サイトの記事画像最適化を実行してください。

  【作業内容】
  1. 対象ファイル確認: 
    対象記事ファイル：
    - ${displayArticlePath}
    対象画像：
    - ${displayImagePath}
  2. PNG画像の検出とサイズ確認
  3. WebP変換実行（cwebp -q 85）
  4. 変換結果の検証（サイズ比較、品質確認）
  5. 記事ファイルの画像パス追加、もしくは更新（.png → .webp）
  （例）「images:
  hero:
    src: '/articles/application/liutao/relationships/images/conversation_tension_management_hero.png'
    alt: '敵人の情は、得て知るべし。'
    caption: '敵人の情は、得て知るべし。'」
  6. pngファイルの削除

  【変換設定】
  - 品質: 85%
  - 形式: PNG → WebP
  - 解像度: 維持（1600x800px推奨）
  - 透明度: 対応

  【期待効果】
  - ファイルサイズ: 80-90%削減
  - 品質: 劣化なし
  - 読み込み速度: 大幅改善

  確認作業は不要です。全ての最適化が完了するまで継続してください。
\`\`\`

記事マークダウンに以下のような形式でデータ投入
\`\`\`
images:
  hero:
    src: '/articles/application/liutao/relationships/images/conversation_tension_management_hero.png'
    alt: '敵人の情は、得て知るべし。'
    caption: '敵人の情は、得て知るべし。'
\`\`\`
`
      },
      {
        id: 'internalLink',
        title: '内部リンク化',
        content: `
        修正いただいた記事(${displayArticlePath})に対して内部リンク化を実施したいです。現在、リンクが少なすぎる、リンクが多すぎる、無効なリンクがある、リンクがあるべきではないところにリンクがあるなどの問題があります。

以下の手順で改善してください：

1. **ガイドライン確認**: history/bukei_shichisyo/docs/article/link/INTERNAL_LINKING_GUIDE.mdを参照
2. **現状分析**: 既存のリンク数、配置場所、有効性を確認
3. **問題修正**: 無効なリンク削除、禁止セクションからのリンク除去、過多なリンクの削減
4-1. **適切配置**: 古典記事の場合、「抽象化」セクション（Markdown）に2-3つのリンクを配置
4-2. **適切配置**: 応用記事の場合、YAMLフロントマスターを含んだ記事全体に3-5つのリンクを配置
5. **最終確認**: 記事あたり2-3個、各セクション最大2個の制約を遵守

**重要**: YAMLフロントマターの編集時は構造を壊さないよう注意してください。
`
      },
      {
        id: 'release',
        title: 'リリース',
        content: `
        ### 記事生成
\`\`\`
yarn articles:generate
\`\`\`

### リリース
\`\`\`
yarn deploy:production
\`\`\`
`
      }
    ];
  };

  const getApplicationSectionData = () => {
    const displayArticlePath = articlePath || 'history/bukei_shichisyo/app/src/data/articles_md/application/sunzi/life_hacks/unified_command_time_management.md';
    const displayImagePath = imagePath || 'history/bukei_shichisyo/app/public/articles/application/sunzi/life_hacks/images/unified_command_time_management.png';
    
    return [
      {
        id: 'revision-execution',
        title: '記事改修実行',
        content: `

#### AI依頼用プロンプトを修正
以下の依頼用のプロンプトがある。
history/bukei_shichisyo/docs/article/update/AI_ARTICLE_REVISION_PROMPT.md

この中の
・## 改修対象記事
・## 参考記事
を対象のものに置き換える

#### 改修依頼
以下のプロンプトで修正依頼
\`\`\`
history/bukei_shichisyo/docs/article/update/AI_ARTICLE_REVISION_PROMPT.md
に要望を記載しました。ご確認の上、作業をお願いします。
\`\`\``
      },{
        id: 'revision-title',
        title: 'タイトル改修実行',
        content: `
\`\`\`
記事（${displayArticlePath}）のタイトルが history/bukei_shichisyo/docs/article/TITLE_GUIDE.md のガイドラインに則っているか確認してください。
必要であれば修正してください。
\`\`\``
      },
      {
        id: 'content-brushup',
        title: '記事内容ブラッシュアップ',
        content: `### ヒーロー画像追加
#### Canvaで画像生成
https://www.canva.com/design/DAGsomAbSJo/A07GpGb2A_lnPz5eXm2Wyg/edit?ui=eyJEIjp7IlAiOnsiQiI6ZmFsc2V9fX0
ここで記事タイトル入れて、ダウンロード

#### PNGファイルを配置して変換
history/bukei_shichisyo/app/public/articles配下の適切な位置に配置
WebP変換
\`\`\`
武経七書サイトの記事画像最適化を実行してください。

  【作業内容】
  1. 対象ファイル確認: 
    対象記事ファイル：
    - ${displayArticlePath}
    対象画像：
    - ${displayImagePath}
  2. PNG画像の検出とサイズ確認
  3. WebP変換実行（cwebp -q 85）
  4. 変換結果の検証（サイズ比較、品質確認）
  5. 記事ファイルの画像パス追加、もしくは更新（.png → .webp）
  （例）「images:
  hero:
    src: '/articles/application/liutao/relationships/images/conversation_tension_management_hero.png'
    alt: '敵人の情は、得て知るべし。'
    caption: '敵人の情は、得て知るべし。'」
  6. pngファイルの削除

  【変換設定】
  - 品質: 85%
  - 形式: PNG → WebP
  - 解像度: 維持（1600x800px推奨）
  - 透明度: 対応

  【期待効果】
  - ファイルサイズ: 80-90%削減
  - 品質: 劣化なし
  - 読み込み速度: 大幅改善

  確認作業は不要です。全ての最適化が完了するまで継続してください。
\`\`\`
`
      },
      {
        id: 'content-brushup-internal-link',
        title: '内部リンク化',
        content: `### 内部リンク化
該当記事に対して、以下のプロンプトで依頼
\`\`\`
修正いただいた記事(${displayArticlePath})に対して内部リンク化を実施したいです。現在、リンクが少なすぎる、リンクが多すぎる、無効なリンクがある、リンクがあるべきではないところにリンクがあるなどの問題があります。

以下の手順で改善してください：

1. **ガイドライン確認**: history/bukei_shichisyo/docs/article/link/INTERNAL_LINKING_GUIDE.mdを参照
2. **現状分析**: 既存のリンク数、配置場所、有効性を確認
3. **問題修正**: 無効なリンク削除、禁止セクションからのリンク除去、過多なリンクの削減
4-1. **適切配置**: 古典記事の場合、「抽象化」セクション（Markdown）に2-3つのリンクを配置
4-2. **適切配置**: 応用記事の場合、YAMLフロントマスターを含んだ記事全体に3-5つのリンクを配置
5. **最終確認**: 記事あたり2-3個、各セクション最大2個の制約を遵守

**重要**: YAMLフロントマターの編集時は構造を壊さないよう注意してください。
\`\`\`
`
      },
      {
        id: 'review',
        title: 'レビュー',
        content: `\`\`\`
cd history/bukei_shichisyo/app/
yarn dev
\`\`\`
検証環境にて、画像表示、内部リンク、表示項目、内容のレビューを行う。`
      },
      {
        id: 'release',
        title: 'リリース',
        content: `\`\`\`
cd history/bukei_shichisyo/app/
yarn deploy:production
\`\`\``
      }
    ];
  };

  const getClassicSectionData = () => {
    const displayArticlePath = articlePath || 'history/bukei_shichisyo/app/src/data/articles_md/classic/sunzi/01_keihen.md';
    const displayImagePath = imagePath || 'history/bukei_shichisyo/app/public/articles/classic/sunzi/images/01_keihen_hero.png';
    
    return [
      {
        id: 'revision-execution',
        title: 'AI依頼用プロンプト修正と改修依頼',
        content: `### AI依頼用プロンプトを修正
以下の依頼用のプロンプトがある。
history/bukei_shichisyo/docs/article/update/classic/CLASSIC_ARTICLE_IMPROVEMENT_PROMPT.md
**改修対象**: を対象ファイルに変更して以下の依頼を実施

### 改修依頼
以下のプロンプトで修正依頼
\`\`\`
history/bukei_shichisyo/docs/article/update/classic/CLASSIC_ARTICLE_IMPROVEMENT_PROMPT.md
に要望を記載しました。ご確認の上、作業をお願いします。
\`\`\``
      },
      {
        id: 'content-brushup',
        title: '画像追加',
        content: `### ヒーロー画像追加
#### Canvaで画像生成
https://www.canva.com/design/DAGsomAbSJo/A07GpGb2A_lnPz5eXm2Wyg/edit?ui=eyJEIjp7IlAiOnsiQiI6ZmFsc2V9fX0
ここで記事タイトル入れて、ダウンロード

#### PNGファイルを配置して変換
history/bukei_shichisyo/app/public/articles配下の適切な位置に配置
WebP変換
\`\`\`
武経七書サイトの記事画像最適化を実行してください。

  【作業内容】
  1. 対象ファイル確認: 
    対象記事ファイル：
    - ${displayArticlePath}
    対象画像：
    - ${displayImagePath}
  2. PNG画像の検出とサイズ確認
  3. WebP変換実行（cwebp -q 85）
  4. 変換結果の検証（サイズ比較、品質確認）
  5. 記事ファイルの画像パス追加、もしくは更新（.png → .webp）
  （例）「images:
  hero:
    src: '/articles/application/liutao/relationships/images/conversation_tension_management_hero.png'
    alt: '敵人の情は、得て知るべし。'
    caption: '敵人の情は、得て知るべし。'」
  6. pngファイルの削除

  【変換設定】
  - 品質: 85%
  - 形式: PNG → WebP
  - 解像度: 維持（1600x800px推奨）
  - 透明度: 対応

  【期待効果】
  - ファイルサイズ: 80-90%削減
  - 品質: 劣化なし
  - 読み込み速度: 大幅改善

  確認作業は不要です。全ての最適化が完了するまで継続してください。
\`\`\`
`
      },
      {
        id: 'content-brushup-internal-link',
        title: '内部リンク化',
        content: `内部リンク化
該当記事に対して、以下のプロンプトで依頼
\`\`\`
修正いただいた記事(${displayArticlePath})に対して内部リンク化を実施したいです。現在、リンクが少なすぎる、リンクが多すぎる、無効なリンクがある、リンクがあるべきではないところにリンクがあるなどの問題があります。

以下の手順で改善してください：

1. **ガイドライン確認**: history/bukei_shichisyo/docs/article/link/INTERNAL_LINKING_GUIDE.mdを参照
2. **現状分析**: 既存のリンク数、配置場所、有効性を確認
3. **問題修正**: 無効なリンク削除、禁止セクションからのリンク除去、過多なリンクの削減
4-1. **適切配置**: 古典記事の場合、「抽象化」セクション（Markdown）に2-3つのリンクを配置
4-2. **適切配置**: 応用記事の場合、YAMLフロントマスターを含んだ記事全体に3-5つのリンクを配置
5. **最終確認**: 記事あたり2-3個、各セクション最大2個の制約を遵守

**重要**: YAMLフロントマターの編集時は構造を壊さないよう注意してください。
\`\`\`

`
      }
    ];
  };

  return (
    <div className="space-y-6">
      {/* タブナビゲーション */}
      <div className="flex bg-white/10 backdrop-blur-xl rounded-2xl p-1 border border-white/20">
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeTab === 'goals'
              ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg"
              : "text-purple-200 hover:text-white hover:bg-white/10"
          }`}
        >
          🎯 目標
        </button>
        <button
          onClick={() => setActiveTab('bukei')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            activeTab === 'bukei'
              ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg"
              : "text-purple-200 hover:text-white hover:bg-white/10"
          }`}
        >
          ⚔️ 武経
        </button>
      </div>

      {/* タブコンテンツ */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
            <h2 className="text-white font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
              レビュー用テキスト
            </h2>
            <textarea
              value={REVIEW_TEXT}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              readOnly
            />
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
            <h2 className="text-white font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
              ビジュアライゼーション（成果イメージ）
            </h2>
            <textarea
              value={VISUALIZATION_TEMPLATES.OUTCOME_VISUALIZATION}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              readOnly
            />
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
            <h2 className="text-white font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
              ビジュアライゼーション（プロセスイメージ）
            </h2>
            <textarea
              value={VISUALIZATION_TEMPLATES.PROCESS_VISUALIZATION}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              readOnly
            />
          </div>
        </div>
      )}

      {activeTab === 'bukei' && (
        <div className="space-y-6">
          {/* 武経サブタブナビゲーション */}
          <div className="flex bg-white/10 backdrop-blur-xl rounded-2xl p-1 border border-white/20">
            <button
              onClick={() => setActiveBukeiTab('new-article')}
              className={`flex-1 py-3 px-2 rounded-xl font-semibold text-xs transition-all duration-200 ${
                activeBukeiTab === 'new-article'
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg"
                  : "text-purple-200 hover:text-white hover:bg-white/10"
              }`}
            >
              📝 新規記事生成
            </button>
            <button
              onClick={() => setActiveBukeiTab('classic-revision')}
              className={`flex-1 py-3 px-2 rounded-xl font-semibold text-xs transition-all duration-200 ${
                activeBukeiTab === 'classic-revision'
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg"
                  : "text-purple-200 hover:text-white hover:bg-white/10"
              }`}
            >
              📜 古典記事改修
            </button>
            <button
              onClick={() => setActiveBukeiTab('application-revision')}
              className={`flex-1 py-3 px-2 rounded-xl font-semibold text-xs transition-all duration-200 ${
                activeBukeiTab === 'application-revision'
                  ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg"
                  : "text-purple-200 hover:text-white hover:bg-white/10"
              }`}
            >
              🔧 応用記事改修
            </button>
          </div>

          {/* サブタブコンテンツ */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
            {activeBukeiTab === 'new-article' && (
              <div className="space-y-4">
                <h2 className="text-white font-semibold mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2"></div>
                  新規記事生成
                </h2>
                
                {/* テキストエリア1: 記事パス */}
                <div>
                  <label className="block text-green-200 text-sm font-medium mb-2">
                    記事パス
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                    value={articlePath}
                    onChange={(e) => setArticlePath(e.target.value)}
                  />
                </div>
                
                {/* テキストエリア2: 画像パス */}
                <div>
                  <label className="block text-green-200 text-sm font-medium mb-2">
                    画像パス
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                  />
                </div>
                
                {/* セクション別フロー */}
                <div className="space-y-4">
                  <h3 className="text-green-200 font-medium">新規記事生成フロー</h3>
                  {getSectionData().map((section) => (
                    <div key={section.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start space-x-3 mb-3">
                        <input
                          type="checkbox"
                          id={section.id}
                          checked={checkedSections[section.id]}
                          onChange={() => handleSectionCheck(section.id)}
                          className="mt-1 w-4 h-4 text-green-500 bg-white/20 border-white/30 rounded focus:ring-green-400 focus:ring-2"
                        />
                        <label htmlFor={section.id} className="flex-1">
                          <h4 className="text-white font-medium mb-2 text-sm">
                            {section.title}
                          </h4>
                          <textarea
                            value={section.content}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white text-xs h-72 resize-none focus:outline-none focus:ring-1 focus:ring-green-400 font-mono"
                            readOnly
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeBukeiTab === 'classic-revision' && (
              <div className="space-y-4">
                <h2 className="text-white font-semibold mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></div>
                  古典記事改修
                </h2>
                
                {/* テキストエリア1: 記事パス */}
                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">
                    記事パス
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    value={articlePath}
                    onChange={(e) => setArticlePath(e.target.value)}
                  />
                </div>
                
                {/* テキストエリア2: 画像パス */}
                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">
                    画像パス
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                  />
                </div>
                
                {/* セクション別フロー */}
                <div className="space-y-4">
                  <h3 className="text-yellow-200 font-medium">古典記事改修フロー</h3>
                  {getClassicSectionData().map((section) => (
                    <div key={section.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start space-x-3 mb-3">
                        <input
                          type="checkbox"
                          id={`classic-${section.id}`}
                          checked={checkedClassicSections[section.id]}
                          onChange={() => handleClassicSectionCheck(section.id)}
                          className="mt-1 w-4 h-4 text-yellow-500 bg-white/20 border-white/30 rounded focus:ring-yellow-400 focus:ring-2"
                        />
                        <label htmlFor={`classic-${section.id}`} className="flex-1">
                          <h4 className="text-white font-medium mb-2 text-sm">
                            {section.title}
                          </h4>
                          <textarea
                            value={section.content}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white text-xs h-72 resize-none focus:outline-none focus:ring-1 focus:ring-yellow-400 font-mono"
                            readOnly
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeBukeiTab === 'application-revision' && (
              <div className="space-y-4">
                <h2 className="text-white font-semibold mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
                  応用記事改修
                </h2>
                
                {/* テキストエリア1: 記事パス */}
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">
                    記事パス
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    value={articlePath}
                    onChange={(e) => setArticlePath(e.target.value)}
                  />
                </div>
                
                {/* テキストエリア2: 画像パス */}
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">
                    画像パス
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                  />
                </div>
                
                {/* セクション別フロー */}
                <div className="space-y-4">
                  <h3 className="text-purple-200 font-medium">記事改修フロー</h3>
                  {getApplicationSectionData().map((section) => (
                    <div key={section.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-start space-x-3 mb-3">
                        <input
                          type="checkbox"
                          id={`app-${section.id}`}
                          checked={checkedApplicationSections[section.id]}
                          onChange={() => handleApplicationSectionCheck(section.id)}
                          className="mt-1 w-4 h-4 text-purple-500 bg-white/20 border-white/30 rounded focus:ring-purple-400 focus:ring-2"
                        />
                        <label htmlFor={`app-${section.id}`} className="flex-1">
                          <h4 className="text-white font-medium mb-2 text-sm">
                            {section.title}
                          </h4>
                          <textarea
                            value={section.content}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white text-xs h-72 resize-none focus:outline-none focus:ring-1 focus:ring-purple-400 font-mono"
                            readOnly
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSection;