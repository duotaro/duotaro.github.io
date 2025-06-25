const SelfTalkBanner = ({ currentSelfTalk, onRefresh }) => {
  return (
    <div className="bg-gradient-to-r from-rose-400/20 to-red-500/20 backdrop-blur-xl rounded-2xl p-4 mb-6 border border-rose-300/30">
      <div className="text-center">
        <div className="text-xs text-rose-200 mb-1">今日のセルフトーク</div>
        <div className="text-white font-medium text-sm leading-relaxed">
          💫 "{currentSelfTalk}"
        </div>
        <button
          onClick={onRefresh}
          className="mt-2 text-xs text-rose-300 hover:text-rose-200 transition-colors"
        >
          🔄 別のメッセージ
        </button>
      </div>
    </div>
  );
};

export default SelfTalkBanner;