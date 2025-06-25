const GoalEditModal = ({ goalFormData, onFormChange, onSubmit, onCancel }) => {
  if (!goalFormData) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 backdrop-blur-xl rounded-3xl p-6 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <h2 className="text-white font-bold text-xl mb-4">
            目標を編集
          </h2>
          <div className="space-y-4">
            {/* 基本情報 */}
            <div>
              <label className="text-purple-200 text-sm mb-1 block">目標タイトル</label>
              <input 
                name="title" 
                value={goalFormData.title} 
                onChange={onFormChange} 
                type="text" 
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400" 
              />
            </div>
            <div>
              <label className="text-purple-200 text-sm mb-1 block">詳細説明</label>
              <textarea 
                name="description" 
                value={goalFormData.description} 
                onChange={onFormChange} 
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white h-20 resize-y focus:outline-none focus:ring-2 focus:ring-purple-400" 
              />
            </div>
            
            {/* OKR */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <h3 className="text-lg font-bold text-white mb-2">🎯 OKR</h3>
              <div>
                <label className="text-purple-200 text-sm mb-1 block">Objective (目的)</label>
                <textarea 
                  name="okr.objective" 
                  value={goalFormData.okr.objective} 
                  onChange={onFormChange} 
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white h-20 resize-y focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  placeholder="目標達成によって実現したい状態を入力" 
                />
              </div>
              <div className="mt-4">
                <label className="text-purple-200 text-sm mb-1 block">Key Results (成果指標)</label>
                <textarea 
                  name="okr.keyResults" 
                  value={goalFormData.okr.keyResults} 
                  onChange={onFormChange} 
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white h-28 resize-y focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  placeholder="・成果指標1&#10;・成果指標2" 
                />
              </div>
            </div>

            {/* WOOP */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <h3 className="text-lg font-bold text-white mb-2">🧠 WOOP</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-purple-200 text-sm mb-1 block">Wish (望み)</label>
                  <textarea 
                    name="woop.wish" 
                    value={goalFormData.woop.wish} 
                    onChange={onFormChange} 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white h-24 resize-y focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  />
                </div>
                <div>
                  <label className="text-purple-200 text-sm mb-1 block">Outcome (結果)</label>
                  <textarea 
                    name="woop.outcome" 
                    value={goalFormData.woop.outcome} 
                    onChange={onFormChange} 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white h-24 resize-y focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  />
                </div>
                <div>
                  <label className="text-purple-200 text-sm mb-1 block">Obstacle (障害)</label>
                  <textarea 
                    name="woop.obstacle" 
                    value={goalFormData.woop.obstacle} 
                    onChange={onFormChange} 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white h-24 resize-y focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  />
                </div>
                <div>
                  <label className="text-purple-200 text-sm mb-1 block">Plan (計画)</label>
                  <textarea 
                    name="woop.plan" 
                    value={goalFormData.woop.plan} 
                    onChange={onFormChange} 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white h-24 resize-y focus:outline-none focus:ring-2 focus:ring-purple-400" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-teal-400 to-sky-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalEditModal;