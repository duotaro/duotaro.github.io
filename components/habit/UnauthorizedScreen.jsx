import { ALLOWED_USER_IDS } from '../../const/authConstants';

const UnauthorizedScreen = ({ authError, currentUserId, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center text-3xl">
            🚫
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">アクセス拒否</h1>
          <p className="text-red-200">このアプリへのアクセスが許可されていません</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="space-y-6">
            {/* エラーメッセージ */}
            <div className="bg-red-500/20 rounded-xl p-4 border border-red-400/30">
              <p className="text-red-200 text-sm">{authError}</p>
            </div>

            {/* 現在のユーザーID */}
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2 text-sm">現在のユーザーID</h3>
              <p className="text-gray-300 text-xs font-mono bg-black/20 px-2 py-1 rounded">
                {currentUserId || '未設定'}
              </p>
            </div>

            {/* 許可されたID一覧 */}
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-white font-medium mb-2 text-sm">許可されたユーザーID</h3>
              <ul className="space-y-1">
                {ALLOWED_USER_IDS.map((allowedId, index) => (
                  <li key={index} className="text-green-300 text-xs font-mono bg-green-900/20 px-2 py-1 rounded">
                    {allowedId}
                  </li>
                ))}
              </ul>
            </div>

            {/* 説明 */}
            <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-400/20">
              <h3 className="text-blue-200 font-medium text-sm mb-2">📝 解決方法</h3>
              <ol className="text-blue-200 text-xs space-y-1 list-decimal list-inside">
                <li>許可されたユーザーIDのいずれかを使用してください</li>
                <li>設定ページでユーザーIDを変更できます</li>
                <li>Firebase匿名認証を使用することも可能です</li>
              </ol>
            </div>

            {/* ボタン */}
            <div className="space-y-3">
              <button
                onClick={onRetry}
                className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all hover:scale-105"
              >
                🔄 再試行
              </button>
              
              <button
                onClick={() => {
                  // ユーザーID設定をリセット
                  localStorage.removeItem('customUserId');
                  localStorage.removeItem('isUsingCustomId');
                  window.location.reload();
                }}
                className="w-full py-3 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all"
              >
                🔧 設定をリセット
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-purple-200 text-xs">
            ✨ 個人用ハビットトラッカー - セキュリティ保護中
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedScreen;