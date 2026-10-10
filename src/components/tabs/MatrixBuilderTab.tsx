import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  Send,
  Copy,
  Check,
  Plus,
  Trash2,
  HelpCircle,
  FileSpreadsheet,
  Tv,
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { MatrixVariant, TestVariableType } from '../../types/adMatrix';
import { generateMatrixVariants } from '../../services/api';

interface MatrixBuilderTabProps {
  variants: MatrixVariant[];
  setVariants: React.Dispatch<React.SetStateAction<MatrixVariant[]>>;
  onSendToCompliance: (text: string) => void;
  onSendToGrayTest: (variant: MatrixVariant) => void;
  activeTestVariable: TestVariableType;
  setActiveTestVariable: (v: TestVariableType) => void;
}

export const MatrixBuilderTab: React.FC<MatrixBuilderTabProps> = ({
  variants,
  setVariants,
  onSendToCompliance,
  onSendToGrayTest,
  activeTestVariable,
  setActiveTestVariable
}) => {
  const [productName, setProductName] = useState('新一代声学降噪耳机 Pro');
  const [sellingPoints, setSellingPoints] = useState<string[]>([
    '48dB自适应双核降噪，工位一键开启静音自习室模式',
    '人体工学0感记忆棉佩戴，连戴6小时不胀痛不夹耳',
    '同芯片大牌三分之一价格，千牛与闲鱼口碑断层第一'
  ]);
  const [hooks, setHooks] = useState<string[]>([
    '“如果你的工位旁边有敲青轴机械键盘或者大声打电话的同事，你懂这种崩溃吗？”',
    '“别急着买上千块的大牌降噪了！今天拿500块的国产代工厂同款去专业消音室硬碰硬……”',
    '“闲鱼粉丝问：为什么有人在二手平台全新转卖这款降噪神器？今天直接自费验机！”'
  ]);
  const [formats, setFormats] = useState<string[]>([
    '真人出镜实测对比（分贝仪测试）',
    '第一人称沉浸式工位白噪音vlog',
    '闲鱼买家真实验机开箱+千牛评价拆解'
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<MatrixVariant | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const testVariableOptions: { type: TestVariableType; label: string; desc: string; icon: string }[] = [
    { type: 'HOOK', label: '核心变量: 开场Hook', desc: '测试不同开场台词与画面对【前3秒停留率】的影响', icon: '🎣' },
    { type: 'SCENE', label: '核心变量: 使用场景', desc: '测试工位加班 vs 地铁通勤 vs 宿舍自习对【代入共鸣】的影响', icon: '🎬' },
    { type: 'SELLING_POINT', label: '核心变量: 利益卖点', desc: '测试48dB降噪 vs 0压感舒适 vs 工厂底价对【转化率CVR】的影响', icon: '✨' },
    { type: 'FORMAT', label: '核心变量: 呈现形式', desc: '测试硬核仪器实测 vs 第一人称vlog vs 买家开箱对【信任感】的影响', icon: '🎥' }
  ];

  const handleBatchGenerate = async () => {
    setLoading(true);
    try {
      const generated = await generateMatrixVariants({
        productName,
        testVariable: activeTestVariable,
        sellingPoints,
        hooks,
        formats,
        brandTone: '科技硬核、高性价比、解决痛点'
      });
      setVariants(generated);
      if (generated.length > 0) {
        setSelectedVariant(generated[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = (v: MatrixVariant) => {
    navigator.clipboard.writeText(`${v.name}\n\n【完整脚本】\n${v.fullScript}\n\n【视觉分镜】\n${v.visualStoryboard.join('\n')}`);
    setCopiedId(v.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Define Test Variable */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                1
              </span>
              <h2 className="text-base font-bold text-white">
                定义测试任务 (每次只测试 1 个核心变量)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              广告公司素材敏捷测试铁律：控制变量法。锁定受众、出价与落地页，仅改变一个变量，精准归因胜负。
            </p>
          </div>
          <div className="text-xs text-amber-400 bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-800/40 font-medium">
            铁律: 变量不混淆，归因才有效
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {testVariableOptions.map((opt) => {
            const isSelected = activeTestVariable === opt.type;
            return (
              <button
                key={opt.type}
                onClick={() => setActiveTestVariable(opt.type)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg">{opt.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  )}
                </div>
                <div className={`text-xs font-bold ${isSelected ? 'text-indigo-300' : 'text-slate-200'}`}>
                  {opt.label}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: 3x3x3 Matrix Grid Configuration */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h2 className="text-base font-bold text-white">
                搭建变体矩阵配置 (3 卖点 × 3 开场Hook × 3 形式 = 27 组变体)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              推广标的: <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-indigo-300 ml-1 font-semibold"
              />
            </p>
          </div>

          <button
            onClick={handleBatchGenerate}
            disabled={loading}
            className="py-2.5 px-5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>AI正在裂变变体脚本...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>一键批量裂变生产 3×3×3 矩阵脚本</span>
              </>
            )}
          </button>
        </div>

        {/* 3 Columns: 3 Selling Points x 3 Hooks x 3 Formats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Column A: 3 Selling Points */}
          <div className="bg-slate-950/80 border border-indigo-950/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                <span>✨ 3 大核心卖点 (Selling Points)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">解决人群痛点</span>
            </div>
            {sellingPoints.map((sp, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-400">卖点 {idx + 1}</span>
                <textarea
                  value={sp}
                  onChange={(e) => {
                    const newArr = [...sellingPoints];
                    newArr[idx] = e.target.value;
                    setSellingPoints(newArr);
                  }}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            ))}
          </div>

          {/* Column B: 3 Hooks */}
          <div className="bg-slate-950/80 border border-amber-950/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <span>🎣 3 大开场Hook (0-3s 抓手)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">前3秒停留率关键</span>
            </div>
            {hooks.map((hk, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-400">Hook {idx + 1}</span>
                <textarea
                  value={hk}
                  onChange={(e) => {
                    const newArr = [...hooks];
                    newArr[idx] = e.target.value;
                    setHooks(newArr);
                  }}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            ))}
          </div>

          {/* Column C: 3 Formats */}
          <div className="bg-slate-950/80 border border-emerald-950/60 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <span>🎥 3 种呈现形式 (Formats)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">视觉与真实度</span>
            </div>
            {formats.map((fmt, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-400">形式 {idx + 1}</span>
                <textarea
                  value={fmt}
                  onChange={(e) => {
                    const newArr = [...formats];
                    newArr[idx] = e.target.value;
                    setFormats(newArr);
                  }}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Batch Generated Matrix Variants Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
              3
            </span>
            <div>
              <h2 className="text-base font-bold text-white">
                批量裂变产出变体库 ({variants.length} 组组合)
              </h2>
              <p className="text-xs text-slate-400">
                每组均配齐【0-3s抓手台词 + 完整促单脚本 + 4段视觉分镜指令 + 推荐通道】
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <span>点击任意变体查看详情并送测</span>
          </div>
        </div>

        {/* Variant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variants.map((v) => {
            const isSelected = selectedVariant?.id === v.id;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-950/60 to-slate-950 border-indigo-500 ring-1 ring-indigo-500/50 shadow-lg'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                      {v.id}
                    </span>
                    <span className="text-[11px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded font-mono">
                      预计3s留存: {v.predicted3sRetention}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-2 line-clamp-1">
                    {v.name}
                  </h4>

                  <div className="space-y-1.5 text-[11px] mb-3">
                    <div className="p-1.5 rounded bg-amber-950/20 border border-amber-900/30 text-amber-200 line-clamp-2">
                      <span className="font-semibold text-amber-400 mr-1">Hook:</span>
                      {v.hook}
                    </div>
                    <div className="p-1.5 rounded bg-indigo-950/20 border border-indigo-900/30 text-indigo-200 line-clamp-2">
                      <span className="font-semibold text-indigo-400 mr-1">卖点:</span>
                      {v.sellingPoint}
                    </div>
                    <div className="p-1.5 rounded bg-emerald-950/20 border border-emerald-900/30 text-emerald-200 line-clamp-1">
                      <span className="font-semibold text-emerald-400 mr-1">形式:</span>
                      {v.format}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate max-w-[140px]">
                    {v.recommendedPlatform}
                  </span>
                  <span className="text-indigo-400 font-semibold flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>查看脚本</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Variant Detail Modal / Panel */}
        {selectedVariant && (
          <div className="bg-slate-950 border border-indigo-900/60 rounded-2xl p-6 shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-indigo-600 text-white">
                    {selectedVariant.id} 详情
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    {selectedVariant.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  推荐平台: <span className="text-indigo-300 font-semibold">{selectedVariant.recommendedPlatform}</span> | 预测停留率: <span className="text-amber-300">{selectedVariant.predicted3sRetention}</span>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyScript(selectedVariant)}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center space-x-1 transition"
                >
                  {copiedId === selectedVariant.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === selectedVariant.id ? '已复制脚本' : '复制脚本'}</span>
                </button>

                <button
                  onClick={() => onSendToCompliance(selectedVariant.fullScript)}
                  className="px-3 py-1.5 text-xs bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 border border-amber-700/60 rounded-lg flex items-center space-x-1.5 transition font-semibold"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>防限流合规检测 (Step 4)</span>
                </button>

                <button
                  onClick={() => onSendToGrayTest(selectedVariant)}
                  className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-1.5 transition shadow-md shadow-indigo-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>送入灰度测试 (Step 5)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Full Script */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>📜 完整15-30秒口播/台词脚本</span>
                  <span className="text-[10px] text-emerald-400 font-normal">
                    {selectedVariant.complianceNote}
                  </span>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap select-text">
                  {selectedVariant.fullScript}
                </div>
              </div>

              {/* Visual Storyboard Steps */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300">
                  🎥 视觉分镜与运镜指导 (Storyboard Shots)
                </div>
                <div className="space-y-2">
                  {selectedVariant.visualStoryboard.map((shot, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2"
                    >
                      <span className="w-5 h-5 rounded-md bg-indigo-950 text-indigo-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 border border-indigo-800/50">
                        {idx + 1}
                      </span>
                      <span>{shot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
