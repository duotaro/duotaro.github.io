const SelfTalkModal = ({ onClose, onAdd }) => {
  const handleAdd = () => {
    const textarea = document.getElementById('newSelfTalk');
    if (textarea.value.trim()) {
      onAdd(textarea.value);
      textarea.value = '';
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 max-w-md w-full">
        <h2 className="text-white font-bold text-xl mb-4">新しいセルフトーク</h2>
        <div className="space-y-4">
          <textarea
            className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 h-24 resize-none"
            placeholder="ポジティブなセルフトークメッセージを入力してください"
            id="newSelfTalk"
          />
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
            >
              キャンセル
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 py-3 bg-gradient-to-r from-rose-400 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              追加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfTalkModal;