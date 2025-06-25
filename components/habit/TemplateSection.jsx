import { REVIEW_TEXT } from '../../const/habitConstants';
import { VISUALIZATION_TEMPLATES } from '../../const/templateConstants';

const TemplateSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
        <h2 className="text-white font-semibold mb-3 flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
          レビュー用テキスト
        </h2>
        <textarea
          value={REVIEW_TEXT}
          className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          readOnly
        />
      </div>
      
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
        <h2 className="text-white font-semibold mb-3 flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
          ビジュアライゼーション（成果イメージ）
        </h2>
        <textarea
          value={VISUALIZATION_TEMPLATES.OUTCOME_VISUALIZATION}
          className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          readOnly
        />
      </div>
      
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
        <h2 className="text-white font-semibold mb-3 flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2"></div>
          ビジュアライゼーション（プロセスイメージ）
        </h2>
        <textarea
          value={VISUALIZATION_TEMPLATES.PROCESS_VISUALIZATION}
          className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          readOnly
        />
      </div>
    </div>
  );
};

export default TemplateSection;