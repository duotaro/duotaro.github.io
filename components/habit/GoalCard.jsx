import { CATEGORY_COLORS, TASKS } from '../../const/habitConstants';

const GoalCard = ({ goal, onEdit, onUpdateProgress, expandedSection, onToggleSection }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-2">{goal.title}</h3>
          <p className="text-purple-200 text-sm mb-3">{goal.description}</p>
          <div className="flex items-center gap-4 text-xs text-purple-300">
            <span>📅 {goal.targetDate}</span>
            <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[goal.category] || CATEGORY_COLORS['investment']} text-white`}>
              {TASKS.find(t => t.category === goal.category)?.categoryLabel || "🎯"}
            </span>
          </div>
        </div>
        <button
          onClick={() => onEdit(goal)}
          className="text-cyan-300 hover:text-cyan-200 transition-colors text-lg p-2"
        >
          ✏️
        </button>
      </div>

      {/* 進捗バー */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-semibold">進捗: {goal.progress}%</span>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdateProgress(goal.id, goal.progress - 5)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-all"
            >
              -
            </button>
            <button
              onClick={() => onUpdateProgress(goal.id, goal.progress + 5)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm transition-all"
            >
              +
            </button>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className={`bg-gradient-to-r ${CATEGORY_COLORS[goal.category]} h-3 rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>

      {/* マイルストーン */}
      <div className="space-y-2 mb-4">
        <h4 className="text-white text-sm font-semibold mb-2">マイルストーン</h4>
        {goal.milestones.map((milestone, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-xl ${
              goal.progress >= milestone.target
                ? 'bg-green-500/20 border border-green-400/30'
                : 'bg-white/5 border border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                goal.progress >= milestone.target
                  ? 'bg-green-500 text-white'
                  : 'bg-white/20 text-purple-200'
              }`}>
                {goal.progress >= milestone.target ? '✓' : index + 1}
              </div>
              <span className={`text-sm ${
                goal.progress >= milestone.target ? 'text-green-200' : 'text-white'
              }`}>
                {milestone.title}
              </span>
            </div>
            <span className="text-xs text-purple-300">{milestone.target}%</span>
          </div>
        ))}
      </div>
      
      {/* OKR / WOOP 表示切り替え */}
      <div className="flex gap-2 mt-4 border-t border-white/10 pt-4">
        <button 
          onClick={() => onToggleSection(goal.id, 'okr')} 
          className={`flex-1 py-2 text-sm rounded-lg transition-all ${
            expandedSection.goalId === goal.id && expandedSection.type === 'okr' 
              ? 'bg-teal-500 text-white shadow-lg' 
              : 'bg-white/10 text-purple-200 hover:bg-white/20'
          }`}
        >
          🎯 OKR
        </button>
        <button 
          onClick={() => onToggleSection(goal.id, 'woop')} 
          className={`flex-1 py-2 text-sm rounded-lg transition-all ${
            expandedSection.goalId === goal.id && expandedSection.type === 'woop' 
              ? 'bg-rose-500 text-white shadow-lg' 
              : 'bg-white/10 text-purple-200 hover:bg-white/20'
          }`}
        >
          🧠 WOOP
        </button>
      </div>

      {/* OKR / WOOP 詳細表示エリア */}
      {expandedSection.goalId === goal.id && (
        <div className="mt-4 p-4 bg-black/20 rounded-xl">
          {expandedSection.type === 'okr' && goal.okr && (
            <div className="space-y-3">
              <h4 className="font-bold text-white">🎯 OKR</h4>
              <div>
                <h5 className="font-semibold text-purple-200 text-sm">Objective (目的)</h5>
                <p className="text-white whitespace-pre-wrap text-sm p-2 mt-1 bg-white/5 rounded-md">{goal.okr.objective || "未設定"}</p>
              </div>
              <div>
                <h5 className="font-semibold text-purple-200 text-sm">Key Results (成果指標)</h5>
                <p className="text-white whitespace-pre-wrap text-sm p-2 mt-1 bg-white/5 rounded-md">{goal.okr.keyResults || "未設定"}</p>
              </div>
            </div>
          )}
          {expandedSection.type === 'woop' && goal.woop && (
            <div className="space-y-3">
              <h4 className="font-bold text-white">🧠 WOOP</h4>
              <div>
                <h5 className="font-semibold text-purple-200 text-sm">Wish (望み)</h5>
                <p className="text-white whitespace-pre-wrap text-sm p-2 mt-1 bg-white/5 rounded-md">{goal.woop.wish || "未設定"}</p>
              </div>
              <div>
                <h5 className="font-semibold text-purple-200 text-sm">Outcome (結果)</h5>
                <p className="text-white whitespace-pre-wrap text-sm p-2 mt-1 bg-white/5 rounded-md">{goal.woop.outcome || "未設定"}</p>
              </div>
              <div>
                <h5 className="font-semibold text-purple-200 text-sm">Obstacle (障害)</h5>
                <p className="text-white whitespace-pre-wrap text-sm p-2 mt-1 bg-white/5 rounded-md">{goal.woop.obstacle || "未設定"}</p>
              </div>
              <div>
                <h5 className="font-semibold text-purple-200 text-sm">Plan (計画)</h5>
                <p className="text-white whitespace-pre-wrap text-sm p-2 mt-1 bg-white/5 rounded-md">{goal.woop.plan || "未設定"}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalCard;