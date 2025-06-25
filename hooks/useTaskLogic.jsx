import { TASKS } from '../const/habitConstants';

export const useTaskLogic = (todayDone, setPoints, setTodayDone, oneTimeTasks, setOneTimeTasks) => {
  // 今日の曜日を取得
  const getTodayDayOfWeek = () => {
    return new Date().getDay();
  };

  // 今日やるべきタスクを取得
  const getTodayTasks = () => {
    const today = getTodayDayOfWeek();
    return TASKS.filter(task => task.days.includes(today));
  };

  // 今日完了したタスクを取得
  const getCompletedTodayTasks = () => {
    return TASKS.filter(task => todayDone.includes(task.id));
  };

  // 追加可能なタスクを取得
  const getAddableTasks = () => {
    const todayTaskIds = getTodayTasks().map(task => task.id);
    return TASKS.filter(task => 
      !todayTaskIds.includes(task.id) && !todayDone.includes(task.id)
    );
  };

  // タスク完了処理
  const handleComplete = (taskId) => {
    if (todayDone.includes(taskId)) return;
    const task = TASKS.find(t => t.id === taskId);
    const pointsToAdd = task ? task.points : 1;
    setPoints((prev) => ({ ...prev, [taskId]: (prev[taskId] || 0) + pointsToAdd }));
    setTodayDone((prev) => [...prev, taskId]);
  };

  // 単発タスク追加
  const handleAddOneTimeTask = (newOneTimeTask, newOneTimeTaskPoints, setNewOneTimeTask, setNewOneTimeTaskPoints) => {
    const taskLines = newOneTimeTask.trim().split('\n');

    if (taskLines.length === 0 || taskLines[0] === '') {
        setNewOneTimeTask("");
        return;
    }

    const points = parseInt(newOneTimeTaskPoints, 10);
    const pointsToAdd = !isNaN(points) && points > 0 ? points : 1;

    const newTasks = taskLines
        .map(line => line.trim())
        .filter(line => line !== "")
        .map((line, index) => ({
            id: `one-time-${Date.now()}-${index}`,
            text: line,
            points: pointsToAdd,
            completed: false
        }));

    if (newTasks.length > 0) {
        setOneTimeTasks(prev => [...newTasks, ...prev]);
        setNewOneTimeTask("");
        setNewOneTimeTaskPoints('3');
    }
  };

  // 単発タスク完了
  const handleCompleteOneTimeTask = (taskId) => {
    if (todayDone.includes(taskId)) return;
    const task = oneTimeTasks.find(t => t.id === taskId);
    if (!task) return;

    setPoints(prev => ({ ...prev, [taskId]: (prev[taskId] || 0) + task.points }));
    setTodayDone(prev => [...prev, taskId]);
  };

  // 単発タスク削除
  const handleDeleteOneTimeTask = (taskId) => {
    setOneTimeTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return {
    getTodayTasks,
    getCompletedTodayTasks,
    getAddableTasks,
    handleComplete,
    handleAddOneTimeTask,
    handleCompleteOneTimeTask,
    handleDeleteOneTimeTask
  };
};