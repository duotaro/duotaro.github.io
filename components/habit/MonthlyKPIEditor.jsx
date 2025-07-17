import { useState, useContext, useEffect } from 'react';
import MonthlyKPIContext from '../../context/MonthlyKPIContext';

const MonthlyKPIEditor = ({ selectedMonth, onClose }) => {
  const { getKPIData, updateKPIData } = useContext(MonthlyKPIContext);
  const [kpiData, setKpiData] = useState(null);
  const [activeTab, setActiveTab] = useState('primary'); // 'primary' or 'secondary'

  useEffect(() => {
    if (selectedMonth) {
      setKpiData(getKPIData(selectedMonth));
    }
  }, [selectedMonth, getKPIData]);

  const handleSave = () => {
    if (kpiData && selectedMonth) {
      updateKPIData(selectedMonth, kpiData);
      onClose();
    }
  };

  const updatePrimaryKPI = (field, value) => {
    setKpiData(prev => ({
      ...prev,
      primaryKPIs: {
        ...prev.primaryKPIs,
        [field]: value
      }
    }));
  };

  const updateSecondaryKPI = (field, value) => {
    setKpiData(prev => ({
      ...prev,
      secondaryKPIs: {
        ...prev.secondaryKPIs,
        [field]: value
      }
    }));
  };

  const updateStayTime = (field, value) => {
    setKpiData(prev => ({
      ...prev,
      primaryKPIs: {
        ...prev.primaryKPIs,
        avgStayTime: {
          ...prev.primaryKPIs.avgStayTime,
          [field]: parseInt(value) || 0
        }
      }
    }));
  };

  if (!kpiData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-xl">
              月次KPI編集 - {selectedMonth}
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-xl p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>

          {/* タブ */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('primary')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'primary'
                  ? 'bg-purple-500 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              最重要KPI
            </button>
            <button
              onClick={() => setActiveTab('secondary')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'secondary'
                  ? 'bg-purple-500 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              二次KPI
            </button>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          {activeTab === 'primary' && (
            <div className="space-y-4">
              <h3 className="text-white font-medium mb-4">最重要KPI（読者価値）</h3>
              
              {/* 平均滞在時間 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  平均滞在時間 (目標: 3分以上)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={kpiData.primaryKPIs.avgStayTime.minutes}
                    onChange={(e) => updateStayTime('minutes', e.target.value)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="分"
                    min="0"
                  />
                  <span className="text-white/80">分</span>
                  <input
                    type="number"
                    value={kpiData.primaryKPIs.avgStayTime.seconds}
                    onChange={(e) => updateStayTime('seconds', e.target.value)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="秒"
                    min="0"
                    max="59"
                  />
                  <span className="text-white/80">秒</span>
                </div>
              </div>

              {/* 直帰率 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  直帰率 (目標: 60%以下)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.primaryKPIs.bounceRate}
                    onChange={(e) => updatePrimaryKPI('bounceRate', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="text-white/80">%</span>
                </div>
              </div>

              {/* リピート率 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  リピート率 (目標: 20%以上)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.primaryKPIs.repeatRate}
                    onChange={(e) => updatePrimaryKPI('repeatRate', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="text-white/80">%</span>
                </div>
              </div>

              {/* 内部リンククリック率 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  内部リンククリック率 (目標: 15%以上)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.primaryKPIs.internalLinkClickRate}
                    onChange={(e) => updatePrimaryKPI('internalLinkClickRate', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="text-white/80">%</span>
                </div>
              </div>

              {/* コメント・問い合わせ数 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  コメント・問い合わせ数 (目標: 5件以上)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.primaryKPIs.commentsAndInquiries}
                    onChange={(e) => updatePrimaryKPI('commentsAndInquiries', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                  />
                  <span className="text-white/80">件</span>
                </div>
              </div>

              {/* SNSシェア数 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  SNSシェア数 (目標: 10件以上)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.primaryKPIs.snsShares}
                    onChange={(e) => updatePrimaryKPI('snsShares', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                  />
                  <span className="text-white/80">件</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'secondary' && (
            <div className="space-y-4">
              <h3 className="text-white font-medium mb-4">二次KPI（サイト成長）</h3>
              
              {/* 月間PV数 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  月間PV数
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.secondaryKPIs.monthlyPV}
                    onChange={(e) => updateSecondaryKPI('monthlyPV', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                  />
                  <span className="text-white/80">PV</span>
                </div>
              </div>

              {/* 前月比 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  前月比
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.secondaryKPIs.monthlyPVChange}
                    onChange={(e) => updateSecondaryKPI('monthlyPVChange', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                  />
                  <span className="text-white/80">%</span>
                </div>
              </div>

              {/* 検索流入割合 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  検索流入割合 (目標: 60%以上)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.secondaryKPIs.searchTrafficRate}
                    onChange={(e) => updateSecondaryKPI('searchTrafficRate', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="text-white/80">%</span>
                </div>
              </div>

              {/* 検索順位向上記事数 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  検索順位向上記事数 (目標: 5記事以上)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.secondaryKPIs.improvedRankingArticles}
                    onChange={(e) => updateSecondaryKPI('improvedRankingArticles', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                  />
                  <span className="text-white/80">記事</span>
                </div>
              </div>

              {/* 改修完了記事数 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  改修完了記事数 (目標: 12本)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.secondaryKPIs.revisedArticles}
                    onChange={(e) => updateSecondaryKPI('revisedArticles', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                  />
                  <span className="text-white/80">本</span>
                </div>
              </div>

              {/* 新規記事公開数 */}
              <div>
                <label className="block text-white/80 text-sm mb-2">
                  新規記事公開数 (目標: 8本)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={kpiData.secondaryKPIs.newArticles}
                    onChange={(e) => updateSecondaryKPI('newArticles', parseInt(e.target.value) || 0)}
                    className="flex-1 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="0"
                    min="0"
                  />
                  <span className="text-white/80">本</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="p-6 border-t border-white/20">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              保存
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyKPIEditor;