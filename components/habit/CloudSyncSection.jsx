import { useState } from 'react';
import { useEmailAuth } from '../../hooks/useEmailAuth';
import { useSyncData } from '../../hooks/useSyncData';
import EmailAuthForm from './EmailAuthForm';

const CloudSyncSection = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [lastSyncInfo, setLastSyncInfo] = useState({ localStorage: null, firestore: null });
  const auth = useEmailAuth();
  const sync = useSyncData();

  const handleSyncToFirestore = async () => {
    if (!auth.user) {
      setShowAuthForm(true);
      return;
    }

    const success = await sync.syncToFirestore(auth.user.uid);
    if (success) {
      setLastSyncInfo(prev => ({ 
        ...prev, 
        firestore: new Date().toLocaleString('ja-JP') 
      }));
    }
  };

  const handleSyncFromFirestore = async () => {
    if (!auth.user) {
      setShowAuthForm(true);
      return;
    }

    const success = await sync.syncFromFirestore(auth.user.uid);
    if (success) {
      setLastSyncInfo(prev => ({ 
        ...prev, 
        localStorage: new Date().toLocaleString('ja-JP') 
      }));
      // 同期後はページリロードを推奨
      setTimeout(() => {
        if (window.confirm('同期が完了しました。ページをリロードして最新データを反映しますか？')) {
          window.location.reload();
        }
      }, 1000);
    }
  };

  const handleLogout = async () => {
    await auth.logout();
    setShowAuthForm(false);
    sync.setSyncStatus('');
  };

  const handleAuthSuccess = (user) => {
    setShowAuthForm(false);
    console.log('認証成功:', user);
  };

  if (showAuthForm) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></div>
            Firebase 認証
          </h2>
          <button
            onClick={() => setShowAuthForm(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <EmailAuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
      <h2 className="text-white font-semibold text-lg mb-4 flex items-center">
        <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></div>
        クラウド同期
      </h2>

      {/* 認証状態表示 */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">認証状態</h3>
            <p className="text-gray-300 text-sm">
              {auth.user ? `ログイン中: ${auth.user.email}` : '未ログイン'}
            </p>
          </div>
          {auth.user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors text-sm"
            >
              ログアウト
            </button>
          ) : (
            <button
              onClick={() => setShowAuthForm(true)}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-colors text-sm"
            >
              ログイン
            </button>
          )}
        </div>
      </div>

      {/* 同期ボタン */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div>
            <h3 className="text-white font-medium">📤 ローカル → クラウド</h3>
            <p className="text-gray-300 text-sm">
              現在のブラウザデータをクラウドに保存
            </p>
            {lastSyncInfo.firestore && (
              <p className="text-green-300 text-xs mt-1">
                最終同期: {lastSyncInfo.firestore}
              </p>
            )}
          </div>
          <button
            onClick={handleSyncToFirestore}
            disabled={sync.isSyncing}
            className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 disabled:bg-gray-500/20 text-green-200 disabled:text-gray-400 rounded-lg transition-colors"
          >
            {sync.isSyncing ? '同期中...' : 'アップロード'}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div>
            <h3 className="text-white font-medium">📥 クラウド → ローカル</h3>
            <p className="text-gray-300 text-sm">
              クラウドのデータを現在のブラウザに同期
            </p>
            {lastSyncInfo.localStorage && (
              <p className="text-blue-300 text-xs mt-1">
                最終同期: {lastSyncInfo.localStorage}
              </p>
            )}
          </div>
          <button
            onClick={handleSyncFromFirestore}
            disabled={sync.isSyncing}
            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 disabled:bg-gray-500/20 text-blue-200 disabled:text-gray-400 rounded-lg transition-colors"
          >
            {sync.isSyncing ? '同期中...' : 'ダウンロード'}
          </button>
        </div>
      </div>

      {/* 同期状態表示 */}
      {sync.syncStatus && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/20 rounded-xl">
          <p className="text-blue-200 text-sm">{sync.syncStatus}</p>
        </div>
      )}

      {/* 注意事項 */}
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-xl">
        <h4 className="text-yellow-200 font-medium text-sm mb-2">⚠️ 注意事項</h4>
        <ul className="text-yellow-200 text-xs space-y-1">
          <li>• 同期前に必要に応じてデータのバックアップを取ってください</li>
          <li>• クラウド→ローカル同期は現在のデータを上書きします</li>
          <li>• メール認証が必要です</li>
          <li>• 同期後はページをリロードして最新データを確認してください</li>
        </ul>
      </div>
    </div>
  );
};

export default CloudSyncSection;