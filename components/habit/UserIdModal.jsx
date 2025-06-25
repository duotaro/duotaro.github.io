import { useState } from 'react';

const UserIdModal = ({ 
  onClose, 
  onSetUserId, 
  currentUserId, 
  isUsingCustomId, 
  validateUserId,
  firebaseUserId 
}) => {
  const [inputUserId, setInputUserId] = useState(currentUserId || '');
  const [useCustom, setUseCustom] = useState(isUsingCustomId);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (useCustom) {
      const validationError = validateUserId(inputUserId);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // ページリロードの確認
    const confirmMessage = useCustom 
      ? `ユーザーID "${inputUserId.trim()}" に切り替えます。ページがリロードされます。`
      : 'Firebase匿名認証に戻します。ページがリロードされます。';
    
    if (window.confirm(confirmMessage)) {
      onSetUserId(useCustom, inputUserId);
      // ページをリロードしてデータを反映
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const generateRandomId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setInputUserId(`user-${result}`);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">ユーザーID設定</h2>
          <p className="text-purple-200 text-sm">
            デバイス間でデータを共有する場合は、カスタムユーザーIDを設定してください
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* モード選択 */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="userIdMode"
                checked={!useCustom}
                onChange={() => {
                  setUseCustom(false);
                  setError('');
                }}
                className="w-4 h-4 text-purple-500"
              />
              <div>
                <span className="text-white font-medium">Firebase匿名認証</span>
                <p className="text-purple-200 text-xs">デバイス固有のID（推奨）</p>
                {!useCustom && firebaseUserId && (
                  <p className="text-gray-300 text-xs mt-1">
                    現在のID: {firebaseUserId.substring(0, 8)}...
                  </p>
                )}
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="userIdMode"
                checked={useCustom}
                onChange={() => setUseCustom(true)}
                className="w-4 h-4 text-purple-500"
              />
              <div>
                <span className="text-white font-medium">カスタムユーザーID</span>
                <p className="text-purple-200 text-xs">デバイス間で共有可能</p>
              </div>
            </label>
          </div>

          {/* カスタムID入力 */}
          {useCustom && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputUserId}
                  onChange={(e) => {
                    setInputUserId(e.target.value);
                    setError('');
                  }}
                  placeholder="例: my-habit-data"
                  className="flex-1 p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={generateRandomId}
                  className="px-3 py-3 bg-white/10 border border-white/30 text-white rounded-xl hover:bg-white/20 transition-all text-xs"
                  title="ランダム生成"
                >
                  🎲
                </button>
              </div>
              
              {error && (
                <p className="text-red-300 text-xs">{error}</p>
              )}
              
              <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-400/20">
                <p className="text-yellow-200 text-xs">
                  ⚠️ 同じIDを使用することで、複数のデバイスでデータを共有できます。
                  IDを忘れないよう注意してください。
                </p>
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              設定
            </button>
          </div>
        </form>

        {/* 現在の設定 */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-purple-200 text-xs text-center">
            現在: {isUsingCustomId ? `カスタムID (${currentUserId})` : 'Firebase匿名認証'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserIdModal;