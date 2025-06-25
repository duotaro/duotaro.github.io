import { useAuthentication } from '../../hooks/useAuthentication';

const AuthLogin = () => {
  const {
    passwordInput,
    setPasswordInput,
    passwordError,
    handlePasswordSubmit
  } = useAuthentication();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-3xl">
            🔒
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">習慣化アプリ</h1>
          <p className="text-purple-200">パスワードを入力してください</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-center text-lg"
                placeholder="パスワードを入力"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-300 text-sm mt-2 text-center animate-pulse">
                  ❌ {passwordError}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!passwordInput.trim()}
              className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              🚪 ログイン
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-200 text-xs">
              ✨ あなただけの習慣化の記録を守ります
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;