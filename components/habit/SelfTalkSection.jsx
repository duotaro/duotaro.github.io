const SelfTalkSection = ({ currentSelfTalk, onRefresh, selfTalkMessages, onAddMessage, onRemoveMessage, onShowForm, dayCount }) => {
  return (
    <div className="space-y-6">
      {/* 今日のセルフトーク */}
      <div className="bg-gradient-to-r from-rose-400/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-6 border border-rose-300/30 text-center">
        <h2 className="text-white font-bold text-xl mb-4">今日のマインドセット</h2>
        <div className="text-white text-lg font-medium leading-relaxed mb-4 p-4 bg-white/10 rounded-2xl">
          "💫 {currentSelfTalk}"
        </div>
        <button
          onClick={onRefresh}
          className="bg-gradient-to-r from-rose-400 to-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          🔄 新しいメッセージ
        </button>
      </div>

      {/* セルフトーク一覧 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-red-500 rounded-full mr-2"></div>
            セルフトークメッセージ
          </h2>
          <button
            onClick={onShowForm}
            className="text-rose-300 hover:text-rose-200 transition-colors text-sm"
          >
            + 追加
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {selfTalkMessages.map((message, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
            >
              <p className="text-white text-sm leading-relaxed flex-1 mr-3">
                "{message}"
              </p>
              <button
                onClick={() => onRemoveMessage(index)}
                className="text-rose-300 hover:text-rose-200 opacity-0 group-hover:opacity-100 transition-all text-xs"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* モチベーション統計 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
        <h3 className="text-white font-semibold mb-3">モチベーション統計</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-300">{selfTalkMessages.length}</div>
            <div className="text-purple-200 text-xs">メッセージ数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-300">{dayCount}</div>
            <div className="text-purple-200 text-xs">継続日数</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfTalkSection;