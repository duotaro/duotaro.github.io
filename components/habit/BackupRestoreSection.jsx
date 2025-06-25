import { useState, useRef } from 'react';
import { useDataMigration } from '../../hooks/useDataMigration';

const BackupRestoreSection = ({ userId }) => {
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [restoreData, setRestoreData] = useState(null);
  const fileInputRef = useRef(null);
  
  const { 
    isMigrating, 
    migrationStatus, 
    downloadBackup,
    restoreFromBackup,
    checkLocalStorageData
  } = useDataMigration(userId);

  const { hasData } = checkLocalStorageData();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setRestoreData(data);
        setShowRestoreConfirm(true);
      } catch (error) {
        alert('無効なバックアップファイルです');
      }
    };
    reader.readAsText(file);
  };

  const handleRestore = () => {
    if (restoreData) {
      const success = restoreFromBackup(restoreData);
      if (success) {
        setShowRestoreConfirm(false);
        setRestoreData(null);
        // ページをリロードしてデータを反映
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 mb-6 border border-white/20 shadow-xl">
      <h2 className="text-white font-semibold mb-4 flex items-center">
        <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-2"></div>
        データバックアップ・復元
      </h2>

      {migrationStatus && (
        <div className="mb-4 p-3 bg-blue-500/20 rounded-xl">
          <p className="text-blue-200 text-sm">{migrationStatus}</p>
        </div>
      )}

      <div className="space-y-3">
        {/* バックアップ */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-white font-medium mb-2 text-sm">📤 データバックアップ</h3>
          <p className="text-purple-200 text-xs mb-3">
            現在のLocalStorageデータをJSONファイルとしてダウンロードします
          </p>
          <button
            onClick={downloadBackup}
            disabled={!hasData || isMigrating}
            className="w-full py-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
          >
            {hasData ? '💾 バックアップをダウンロード' : 'データがありません'}
          </button>
        </div>

        {/* 復元 */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-white font-medium mb-2 text-sm">📥 データ復元</h3>
          <p className="text-purple-200 text-xs mb-3">
            バックアップファイルからLocalStorageデータを復元します
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isMigrating}
            className="w-full py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
          >
            📁 バックアップファイルを選択
          </button>
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-500/10 rounded-xl p-3 border border-yellow-400/20">
          <p className="text-yellow-200 text-xs">
            ⚠️ 復元を実行すると現在のLocalStorageデータが上書きされます。実行前にバックアップを取ることをお勧めします。
          </p>
        </div>
      </div>

      {/* 復元確認モーダル */}
      {showRestoreConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl max-w-sm w-full">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl">
                ⚠️
              </div>
              <h3 className="text-white font-bold mb-2">データ復元の確認</h3>
              <p className="text-purple-200 text-sm mb-4">
                現在のデータが上書きされます。<br />
                復元を実行しますか？
              </p>
              
              {restoreData && (
                <div className="bg-white/5 rounded-lg p-3 mb-4 text-left">
                  <p className="text-white text-xs font-medium mb-1">復元されるデータ:</p>
                  <p className="text-purple-200 text-xs">
                    バックアップ日時: {restoreData.backupDate ? new Date(restoreData.backupDate).toLocaleString('ja-JP') : '不明'}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowRestoreConfirm(false);
                    setRestoreData(null);
                  }}
                  className="flex-1 py-2 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-sm"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleRestore}
                  className="flex-1 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm"
                >
                  復元実行
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupRestoreSection;