import { useState } from 'react';

const OneTimeTaskInput = ({ onAddTask }) => {
  const [newOneTimeTask, setNewOneTimeTask] = useState("");
  const [newOneTimeTaskPoints, setNewOneTimeTaskPoints] = useState('3');

  const handleAdd = () => {
    onAddTask(newOneTimeTask, newOneTimeTaskPoints, setNewOneTimeTask, setNewOneTimeTaskPoints);
  };

  return (
    <div className="flex gap-2 mb-4 items-start">
      <textarea
        value={newOneTimeTask}
        onChange={(e) => setNewOneTimeTask(e.target.value)}
        placeholder="タスクを改行で区切って複数入力できます。&#10;例：&#10;・買い物に行く&#10;・XXさんに電話する"
        className="flex-1 p-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 h-24 resize-y"
      />
      <div className="flex flex-col gap-2 shrink-0">
        <input
          type="number"
          value={newOneTimeTaskPoints}
          onChange={(e) => setNewOneTimeTaskPoints(e.target.value)}
          className="w-24 p-3 bg-white/20 border border-white/30 rounded-xl text-white text-center placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="各pt"
          min="1"
        />
        <button
          onClick={handleAdd}
          disabled={!newOneTimeTask.trim()}
          className="w-24 py-3 bg-gradient-to-r from-lime-400 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          一括追加
        </button>
      </div>
    </div>
  );
};

export default OneTimeTaskInput;