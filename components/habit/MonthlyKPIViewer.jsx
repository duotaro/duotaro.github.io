import { useState, useContext, useMemo } from 'react';
import MonthlyKPIContext from '../../context/MonthlyKPIContext';

const MonthlyKPIViewer = ({ selectedMonth, onEdit }) => {
  const { getKPIData, getAvailableMonths } = useContext(MonthlyKPIContext);
  const [selectedKPIType, setSelectedKPIType] = useState('primary');
  const [selectedKPIField, setSelectedKPIField] = useState('bounceRate');
  
  const kpiData = getKPIData(selectedMonth);
  const availableMonths = getAvailableMonths();

  // KPIフィールドの定義
  const kpiFields = {
    primary: {
      bounceRate: { label: '直帰率', unit: '%', target: '60%以下' },
      repeatRate: { label: 'リピート率', unit: '%', target: '20%以上' },
      internalLinkClickRate: { label: '内部リンククリック率', unit: '%', target: '15%以上' },
      commentsAndInquiries: { label: 'コメント・問い合わせ数', unit: '件', target: '5件以上' },
      snsShares: { label: 'SNSシェア数', unit: '件', target: '10件以上' }
    },
    secondary: {
      monthlyPV: { label: '月間PV数', unit: 'PV', target: '前月比向上' },
      monthlyPVChange: { label: '前月比', unit: '%', target: '正の成長' },
      searchTrafficRate: { label: '検索流入割合', unit: '%', target: '60%以上' },
      improvedRankingArticles: { label: '検索順位向上記事数', unit: '記事', target: '5記事以上' },
      revisedArticles: { label: '改修完了記事数', unit: '本', target: '12本' },
      newArticles: { label: '新規記事公開数', unit: '本', target: '8本' }
    }
  };

  // 推移データを取得
  const getTrendData = () => {
    if (availableMonths.length < 2) return [];
    
    const last6Months = availableMonths.slice(0, 6).reverse();
    return last6Months.map(month => {
      const data = getKPIData(month);
      const kpiType = selectedKPIType === 'primary' ? 'primaryKPIs' : 'secondaryKPIs';
      
      let value = data[kpiType][selectedKPIField];
      
      // 平均滞在時間の特別処理
      if (selectedKPIField === 'avgStayTime') {
        value = data.primaryKPIs.avgStayTime.minutes * 60 + data.primaryKPIs.avgStayTime.seconds;
      }
      
      return {
        month,
        value: value || 0
      };
    });
  };

  const trendData = getTrendData();

  // グラフの最大値を計算
  const maxValue = useMemo(() => {
    if (trendData.length === 0) return 100;
    const max = Math.max(...trendData.map(item => item.value));
    return Math.ceil(max * 1.2);
  }, [trendData]);

  // 現在のKPIフィールドの詳細情報
  const currentFieldInfo = kpiFields[selectedKPIType][selectedKPIField];

  // 平均滞在時間の表示形式
  const formatStayTime = (minutes, seconds) => {
    if (minutes === 0 && seconds === 0) return '0秒';
    if (minutes === 0) return `${seconds}秒`;
    if (seconds === 0) return `${minutes}分`;
    return `${minutes}分${seconds}秒`;
  };

  // 現在の値を取得
  const getCurrentValue = () => {
    const kpiType = selectedKPIType === 'primary' ? 'primaryKPIs' : 'secondaryKPIs';
    
    if (selectedKPIField === 'avgStayTime') {
      const { minutes, seconds } = kpiData.primaryKPIs.avgStayTime;
      return formatStayTime(minutes, seconds);
    }
    
    const value = kpiData[kpiType][selectedKPIField];
    return `${value}${currentFieldInfo.unit}`;
  };

  return (
    <div className="space-y-6">
      {/* コントロールパネル */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* KPI種別選択 */}
          <div className="flex-1">
            <label className="block text-white/80 text-sm mb-2">KPI種別</label>
            <select
              value={selectedKPIType}
              onChange={(e) => {
                setSelectedKPIType(e.target.value);
                const newFields = Object.keys(kpiFields[e.target.value]);
                if (!newFields.includes(selectedKPIField)) {
                  setSelectedKPIField(newFields[0]);
                }
              }}
              className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="primary">最重要KPI（読者価値）</option>
              <option value="secondary">二次KPI（サイト成長）</option>
            </select>
          </div>

          {/* KPIフィールド選択 */}
          <div className="flex-1">
            <label className="block text-white/80 text-sm mb-2">KPI項目</label>
            <select
              value={selectedKPIField}
              onChange={(e) => setSelectedKPIField(e.target.value)}
              className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {Object.entries(kpiFields[selectedKPIType]).map(([key, field]) => (
                <option key={key} value={key}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>

          {/* 編集ボタン */}
          <div className="flex items-end">
            <button
              onClick={() => onEdit(selectedMonth)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              編集
            </button>
          </div>
        </div>
      </div>

      {/* 現在値表示 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <div className="text-center">
          <h3 className="text-white/80 text-sm mb-2">
            {selectedMonth} - {currentFieldInfo.label}
          </h3>
          <div className="text-3xl font-bold text-white mb-2">
            {getCurrentValue()}
          </div>
          <div className="text-purple-300 text-sm">
            目標: {currentFieldInfo.target}
          </div>
        </div>
      </div>

      {/* 推移グラフ */}
      {trendData.length > 1 && (
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-medium mb-4">
            {currentFieldInfo.label}の推移
          </h3>
          
          <div className="relative h-64 bg-white/5 rounded-lg p-4">
            {/* Y軸 */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/60 pr-2">
              <span>{maxValue}</span>
              <span>{Math.round(maxValue * 0.75)}</span>
              <span>{Math.round(maxValue * 0.5)}</span>
              <span>{Math.round(maxValue * 0.25)}</span>
              <span>0</span>
            </div>

            {/* グラフエリア */}
            <div className="ml-8 h-full relative">
              {/* グリッドライン */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <div
                  key={ratio}
                  className="absolute left-0 right-0 border-t border-white/10"
                  style={{ bottom: `${ratio * 100}%` }}
                />
              ))}


              {/* データポイント */}
              {trendData.map((item, index) => {
                const x = (index / (trendData.length - 1)) * 100;
                const y = 100 - (item.value / maxValue) * 100;
                return (
                  <div
                    key={item.month}
                    className="absolute w-3 h-3 bg-purple-400 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${x}%`,
                      bottom: `${y}%`
                    }}
                    title={`${item.month}: ${item.value}${currentFieldInfo.unit}`}
                  />
                );
              })}
            </div>

            {/* X軸ラベル */}
            <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-white/60 mt-2">
              {trendData.map((item) => (
                <span key={item.month} className="transform -rotate-45 origin-top-left">
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* データ一覧表 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-medium mb-4">月別データ一覧</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 px-3 text-white/80">月</th>
                <th className="text-right py-2 px-3 text-white/80">{currentFieldInfo.label}</th>
                <th className="text-right py-2 px-3 text-white/80">目標達成</th>
              </tr>
            </thead>
            <tbody>
              {trendData.map((item) => {
                const fieldInfo = currentFieldInfo;
                let isTargetMet = false;
                
                // 目標達成判定のロジック（簡易版）
                if (selectedKPIField === 'bounceRate') {
                  isTargetMet = item.value <= 60;
                } else if (selectedKPIField === 'repeatRate') {
                  isTargetMet = item.value >= 20;
                } else if (selectedKPIField === 'internalLinkClickRate') {
                  isTargetMet = item.value >= 15;
                } else if (selectedKPIField === 'commentsAndInquiries') {
                  isTargetMet = item.value >= 5;
                } else if (selectedKPIField === 'snsShares') {
                  isTargetMet = item.value >= 10;
                } else if (selectedKPIField === 'searchTrafficRate') {
                  isTargetMet = item.value >= 60;
                } else if (selectedKPIField === 'improvedRankingArticles') {
                  isTargetMet = item.value >= 5;
                } else if (selectedKPIField === 'revisedArticles') {
                  isTargetMet = item.value >= 12;
                } else if (selectedKPIField === 'newArticles') {
                  isTargetMet = item.value >= 8;
                }

                return (
                  <tr key={item.month} className="border-b border-white/10">
                    <td className="py-2 px-3 text-white">{item.month}</td>
                    <td className="py-2 px-3 text-right text-white">
                      {item.value}{fieldInfo.unit}
                    </td>
                    <td className="py-2 px-3 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        isTargetMet 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {isTargetMet ? '達成' : '未達成'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonthlyKPIViewer;