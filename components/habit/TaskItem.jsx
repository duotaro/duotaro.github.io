import { CATEGORY_COLORS } from '../../const/habitConstants';

const TaskItem = ({ task, isCompleted, onComplete }) => {
  return (
    <div
      className={`group bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 transition-all duration-300 ${
        isCompleted 
          ? 'opacity-70 bg-green-500/10 border-green-400/30' 
          : 'hover:bg-white/15 hover:scale-[1.02] hover:shadow-xl'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-purple-200 bg-white/10 px-2 py-1 rounded-full">
              {task.categoryLabel}
            </span>
            <span className="text-yellow-300 text-xs font-bold">+{task.points}pt</span>
          </div>
          <h3 className="text-white font-medium text-sm leading-tight mb-2">{task.label}</h3>
          <div className="text-purple-200 text-xs">⏰ {task.time}</div>
        </div>
        <button
          onClick={() => onComplete(task.id)}
          disabled={isCompleted}
          className={`ml-3 flex-shrink-0 w-12 h-12 rounded-full font-semibold text-xs transition-all duration-200 flex items-center justify-center ${
            isCompleted
              ? "bg-green-500/30 text-green-200 cursor-not-allowed"
              : `bg-gradient-to-r ${CATEGORY_COLORS[task.category]} hover:shadow-lg hover:scale-110 text-white shadow-lg`
          }`}
        >
          {isCompleted ? "✓" : "完了"}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;