import React from 'react';
import { TASKS, CATEGORY_COLORS } from '../../const/habitConstants';

const ScheduleView = () => {
  const getWeekSchedule = () => {
    const schedule = [];
    const today = new Date();
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      const tasksForDay = TASKS.filter(task => task.days.includes(dayOfWeek));

      schedule.push({
        date: date,
        dayName: dayNames[dayOfWeek],
        tasks: tasksForDay
      });
    }
    return schedule;
  };

  const weekSchedule = getWeekSchedule();

  const borderColors = {
    investment: 'border-yellow-400',
    content: 'border-purple-400',
    learning: 'border-blue-400',
    training: 'border-green-400',
    reflection: 'border-indigo-400',
    visualization: 'border-teal-400',
    selftalk: 'border-rose-400',
    mindfulness: 'border-amber-400',
    planning: 'border-slate-400',
    motivation: 'border-fuchsia-400',
    analysis: 'border-cyan-400',
    wellness: 'border-lime-400',
    creativity: 'border-pink-400',
    productivity: 'border-emerald-400',
  };

  return (
    <div className="space-y-6">
      {weekSchedule.map((day, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
          <h2 className="text-white font-semibold mb-4 text-lg">
            {`${day.date.getMonth() + 1}/${day.date.getDate()} (${day.dayName})`}
          </h2>
          {day.tasks.length > 0 ? (
            <div className="space-y-3">
              {day.tasks.map(task => (
                <div key={task.id} className={`bg-white/5 p-3 rounded-lg border-l-4 ${borderColors[task.category] || 'border-gray-400'}`}>
                  <p className="text-white font-medium">{task.label}</p>
                  <p className="text-purple-300 text-sm">{task.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">タスクはありません</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleView;
