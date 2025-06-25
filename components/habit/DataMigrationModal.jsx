import { useDataMigration } from '../../hooks/useDataMigration';

const DataMigrationModal = ({ userId, onComplete, onSkip }) => {
  const { 
    isMigrating, 
    migrationStatus, 
    migrateFromLocalStorage, 
    checkLocalStorageData,
    downloadBackup
  } = useDataMigration(userId);

  const { hasData, data } = checkLocalStorageData();

  const handleMigrate = async () => {
    const success = await migrateFromLocalStorage();
    if (success) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  if (!hasData) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-2xl">
              ✨
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">新規スタート</h2>
            <p className="text-purple-200 mb-6">
              LocalStorageにデータが見つかりませんでした。<br />
              新しく習慣化を始めましょう！
            </p>
            <button
              onClick={onSkip}
              className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all hover:scale-105"
            >
              開始する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-2xl">
            📦
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">データ移行</h2>
          <p className="text-purple-200 mb-6">
            LocalStorageに既存のデータが見つかりました。<br />
            Firebaseに移行しますか？
          </p>

          {/* データプレビュー */}
          <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
            <h3 className="text-white font-semibold mb-2 text-sm">移行されるデータ:</h3>
            <ul className="text-purple-200 text-xs space-y-1">
              {Object.keys(data.points).length > 0 && (
                <li>✅ ポイントデータ ({Object.keys(data.points).length}項目)</li>
              )}
              {data.startDate && (
                <li>✅ 開始日: {data.startDate}</li>
              )}
              {data.oneTimeTasks.length > 0 && (
                <li>✅ 単発タスク ({data.oneTimeTasks.length}個)</li>
              )}
              {data.rewardSetting && (
                <li>✅ ご褒美設定</li>
              )}
              {data.goals && (
                <li>✅ 目標設定</li>
              )}
              {data.selfTalk && (
                <li>✅ セルフトークメッセージ</li>
              )}
            </ul>
          </div>

          {migrationStatus && (
            <div className="mb-4 p-3 bg-blue-500/20 rounded-xl">
              <p className="text-blue-200 text-sm">{migrationStatus}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleMigrate}
              disabled={isMigrating}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isMigrating ? '移行中...' : '📤 データを移行する'}
            </button>
            
            <button
              onClick={downloadBackup}
              disabled={isMigrating}
              className="w-full py-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              💾 バックアップをダウンロード
            </button>
            
            <button
              onClick={onSkip}
              disabled={isMigrating}
              className="w-full py-3 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all disabled:opacity-50"
            >
              スキップ（新規開始）
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataMigrationModal;