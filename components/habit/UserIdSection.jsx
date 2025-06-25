import { useUserIdManager } from '../../hooks/useUserIdManager';
import UserIdModal from './UserIdModal';

const UserIdSection = ({ firebaseUserId }) => {
  const {
    customUserId,
    isUsingCustomId,
    showUserIdInput,
    setShowUserIdInput,
    setUserIdMode,
    validateUserId
  } = useUserIdManager();

  const currentDisplayId = isUsingCustomId ? customUserId : firebaseUserId;
  const displayType = isUsingCustomId ? 'カスタムID' : 'Firebase匿名認証';

  return (
    <>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 mb-6 border border-white/20 shadow-xl">
        <h2 className="text-white font-semibold mb-4 flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2"></div>
          ユーザーID管理
        </h2>

        <div className="space-y-4">
          {/* 現在の設定表示 */}
          <div className="bg-white/5 rounded-xl p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-purple-200 text-sm">認証方式</span>
                <span className="text-white text-sm font-medium">{displayType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-purple-200 text-sm">ユーザーID</span>
                <span className="text-white text-xs font-mono bg-black/20 px-2 py-1 rounded">
                  {currentDisplayId ? `${currentDisplayId.substring(0, 12)}${currentDisplayId.length > 12 ? '...' : ''}` : '未設定'}
                </span>
              </div>
            </div>
          </div>

          {/* 説明 */}
          <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-400/20">
            <h3 className="text-blue-200 font-medium text-sm mb-2">📱 デバイス間データ共有</h3>
            <ul className="text-blue-200 text-xs space-y-1">
              <li>• <strong>Firebase匿名認証</strong>: デバイス固有（推奨）</li>
              <li>• <strong>カスタムID</strong>: 複数デバイスで同じデータを共有</li>
              <li>• 同じカスタムIDを使用することでデータ同期が可能</li>
            </ul>
          </div>

          {/* ボタン */}
          <button
            onClick={() => setShowUserIdInput(true)}
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            👤 ユーザーID設定を変更
          </button>

          {/* 注意事項 */}
          <div className="bg-yellow-500/10 rounded-xl p-3 border border-yellow-400/20">
            <p className="text-yellow-200 text-xs">
              ⚠️ ユーザーIDを変更すると、異なるデータセットにアクセスすることになります。
              変更前にバックアップを取ることをお勧めします。
            </p>
          </div>
        </div>
      </div>

      {/* ユーザーID設定モーダル */}
      {showUserIdInput && (
        <UserIdModal
          onClose={() => setShowUserIdInput(false)}
          onSetUserId={setUserIdMode}
          currentUserId={customUserId}
          isUsingCustomId={isUsingCustomId}
          validateUserId={validateUserId}
          firebaseUserId={firebaseUserId}
        />
      )}
    </>
  );
};

export default UserIdSection;