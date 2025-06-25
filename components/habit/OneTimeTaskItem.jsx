const OneTimeTaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 transition-all hover:bg-white/15">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 mr-3">
          <h3 className="text-white font-medium text-sm leading-tight mb-1">{task.text}</h3>
          <span className="text-yellow-300 text-xs font-bold">+{task.points}pt</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onComplete(task.id)}
            className="w-12 h-12 rounded-full font-semibold text-xs transition-all duration-200 flex items-center justify-center bg-gradient-to-r from-green-400 to-emerald-500 hover:shadow-lg hover:scale-110 text-white shadow-lg"
          >
            完了
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="w-8 h-8 rounded-full font-semibold text-xs transition-all duration-200 flex items-center justify-center bg-red-500/50 hover:bg-red-500/80 text-white opacity-50 group-hover:opacity-100"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneTimeTaskItem;