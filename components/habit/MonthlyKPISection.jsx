import { useState, useContext } from 'react';
import MonthlyKPIContext from '../../context/MonthlyKPIContext';
import MonthlyKPIEditor from './MonthlyKPIEditor';
import MonthlyKPIViewer from './MonthlyKPIViewer';

const MonthlyKPISection = () => {
  const { 
    getCurrentMonthKey, 
    getAvailableMonths, 
    deleteKPIData,
    exportMonthlyData,
    importMonthlyData
  } = useContext(MonthlyKPIContext);
  
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthKey());
  const [showEditor, setShowEditor] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [monthToDelete, setMonthToDelete] = useState('');

  const availableMonths = getAvailableMonths();
  const currentMonth = getCurrentMonthKey();

  // 新しい月を追加
  const addNewMonth = () => {
    const input = prompt('追加する月を入力してください (YYYY-MM形式):', currentMonth);
    if (input && /^\d{4}-\d{2}$/.test(input)) {
      setSelectedMonth(input);
      setShowEditor(true);
    } else if (input) {
      alert('正しい形式で入力してください (例: 2025-01)');
    }
  };

  // データエクスポート
  const handleExport = () => {
    const data = exportMonthlyData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monthly-kpi-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // データインポート
  const handleImport = () => {
    if (importMonthlyData(importData)) {
      alert('✅ データのインポートが完了しました！');
      setShowImportModal(false);
      setImportData('');
    } else {
      alert('❌ データのインポートに失敗しました。JSONフォーマットを確認してください。');
    }
  };

  // 月削除の確認
  const confirmDelete = (month) => {
    setMonthToDelete(month);
    setShowDeleteConfirm(true);
  };

  // 月削除の実行
  const executeDelete = () => {
    deleteKPIData(monthToDelete);
    setShowDeleteConfirm(false);
    setMonthToDelete('');
    if (selectedMonth === monthToDelete) {
      setSelectedMonth(currentMonth);
    }
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-semibold text-xl mb-2 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
              月次KPI管理
            </h2>
            <p className="text-white/70 text-sm">
              月間のKPIデータを管理して、サイトの成長を追跡しましょう
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={addNewMonth}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105 text-sm"
            >
              ＋ 新しい月
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105 text-sm"
            >
              📊 エクスポート
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105 text-sm"
            >
              📥 インポート
            </button>
          </div>
        </div>
      </div>

      {/* 月選択 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <label className="text-white/80 text-sm font-medium">表示する月:</label>
          <div className="flex-1">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full lg:w-auto px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value={currentMonth}>{currentMonth} (今月)</option>
              {availableMonths.filter(month => month !== currentMonth).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          
          {availableMonths.includes(selectedMonth) && selectedMonth !== currentMonth && (
            <button
              onClick={() => confirmDelete(selectedMonth)}
              className="px-3 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
            >
              🗑️ 削除
            </button>
          )}
        </div>
      </div>

      {/* KPIビューア */}
      <MonthlyKPIViewer 
        selectedMonth={selectedMonth}
        onEdit={(month) => {
          setSelectedMonth(month);
          setShowEditor(true);
        }}
      />

      {/* エディターモーダル */}
      {showEditor && (
        <MonthlyKPIEditor
          selectedMonth={selectedMonth}
          onClose={() => setShowEditor(false)}
        />
      )}

      {/* インポートモーダル */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">データインポート</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-white/60 hover:text-white text-xl p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">
                    JSONデータを貼り付けてください:
                  </label>
                  <textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    className="w-full h-32 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder='{"2025-01": {"primaryKPIs": {...}, "secondaryKPIs": {...}}}'
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleImport}
                    disabled={!importData.trim()}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    インポート実行
                  </button>
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 削除確認モーダル */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-red-400/20 w-full max-w-md">
            <div className="p-6">
              <div className="text-center space-y-4">
                <div className="text-red-400 text-4xl">⚠️</div>
                <h3 className="text-white font-semibold text-lg">データ削除の確認</h3>
                <p className="text-white/80 text-sm">
                  {monthToDelete}のKPIデータを削除しますか？<br />
                  この操作は取り消せません。
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={executeDelete}
                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                  >
                    削除する
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyKPISection;