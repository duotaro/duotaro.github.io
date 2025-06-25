const TaskProgressSummary = ({ totalPoints, todayPoints, completionRate, todayTasks, todayDone }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-white/20 shadow-2xl">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{totalPoints}</div>
          <div className="text-purple-200 text-xs">累計pt</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">{todayPoints}</div>
          <div className="text-purple-200 text-xs">今日pt</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-300">{completionRate}%</div>
          <div className="text-purple-200 text-xs">達成率</div>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="text-purple-200 text-xs text-center">
          {todayTasks.filter(task => todayDone.includes(task.id)).length} / {todayTasks.length} タスク完了
        </div>
      </div>
    </div>
  );
};

export default TaskProgressSummary;