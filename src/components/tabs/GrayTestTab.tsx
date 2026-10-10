import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Filter,
  CheckCircle2,
  XCircle,
  RefreshCw,
  BookmarkPlus,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Store,
  Video,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { MatrixVariant, PlatformType } from '../../types/adMatrix';
import { PRESET_VARIANTS } from '../../data/seedData';
import { diagnosePerformance } from '../../services/api';

interface GrayTestTabProps {
  variants: MatrixVariant[];
  onScaleVariant: (variant: MatrixVariant) => void;
  onKillVariant: (variantId: string) => void;
  onSaveToLibraries: (variant: MatrixVariant) => void;
  onStartMicroInnovation: (variant: MatrixVariant) => void;
}

export const GrayTestTab: React.FC<GrayTestTabProps> = ({
  variants,
  onScaleVariant,
  onKillVariant,
  onSaveToLibraries,
  onStartMicroInnovation
}) => {
  const [testList, setTestList] = useState<MatrixVariant[]>(
    variants.length > 0 ? variants : PRESET_VARIANTS
  );

  const [selectedVariant, setSelectedVariant] = useState<MatrixVariant>(
    testList[0] || PRESET_VARIANTS[0]
  );

  const [platformChannel, setPlatformChannel] = useState<'qianniu' | 'xianyu' | 'douyin'>('qianniu');

  // Editable test metrics state
  const [metrics, setMetrics] = useState({
    impressions: selectedVariant.metrics?.impressions || 89000,
    clicks: selectedVariant.metrics?.clicks || 6850,
    ctr: selectedVariant.metrics?.ctr || 7.7,
    threeSecRetention: selectedVariant.metrics?.threeSecRetention || 46.2,
    completionRate: selectedVariant.metrics?.completionRate || 23.5,
    inquiries: selectedVariant.metrics?.inquiries || 620,
    orders: selectedVariant.metrics?.orders || 320,
    cvr: selectedVariant.metrics?.cvr || 4.7,
    spend: selectedVariant.metrics?.spend || 3500,
    roas: selectedVariant.metrics?.roas || 3.75
  });

  const [diagnosing, setDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(
    selectedVariant.diagnosis || {
      healthStatus: 'EXCELLENT',
      ctrScore: 92,
      cvrScore: 88,
      retentionScore: 85,
      primaryBottleneck: '无明显瓶颈，已跑通正向投产闭环',
      detailedDiagnosis: 'CTR高达7.7%，CVR达4.7%，前3秒停留率46.2%。吸睛力与买家成交转化双高，属于超级赢家组合！',
      decisionAction: 'SCALE',
      assetAction: {
        saveToHookLibrary: true,
        saveToSceneLibrary: true,
        saveToProofLibrary: true,
        reason: '数据全面领跑，可拆解沉淀至六大资产库'
      },
      microInnovationSuggestions: [
        '保持当前获胜Hook与卖点，微创新2个不同使用场景进行横向裂变',
        '将此变体视频脚本授权给达人库中契合的腰部达人进行二次翻拍',
        '在千牛与闲鱼端同步配置同款视觉主图与问答模块'
      ]
    }
  );

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Switch active variant
  const handleSelectVariant = (v: MatrixVariant) => {
    setSelectedVariant(v);
    const m = v.metrics || {
      impressions: 50000,
      clicks: 3000,
      ctr: 6.0,
      threeSecRetention: 38.0,
      completionRate: 18.0,
      inquiries: 240,
      orders: 95,
      cvr: 3.1,
      spend: 2000,
      roas: 2.2
    };
    setMetrics(m);
    if (v.diagnosis) {
      setDiagnosisResult(v.diagnosis);
    }
  };

  // Run Diagnosis
  const handleRunDiagnosis = async () => {
    setDiagnosing(true);
    setSavedStatus(null);
    try {
      const diag = await diagnosePerformance(metrics, platformChannel);
      setDiagnosisResult(diag);
    } catch (err) {
      console.error(err);
    } finally {
      setDiagnosing(false);
    }
  };

  // Preset Data Scenarios
  const applyPresetScenario = (scenario: 'WINNER' | 'CLICK_NO_CONVERT' | 'BAD_HOOK') => {
    if (scenario === 'WINNER') {
      const newM = {
        impressions: 125000,
        clicks: 9600,
        ctr: 7.68,
        threeSecRetention: 47.5,
        completionRate: 25.0,
        inquiries: 850,
        orders: 450,
        cvr: 4.69,
        spend: 4800,
        roas: 3.85
      };
      setMetrics(newM);
    } else if (scenario === 'CLICK_NO_CONVERT') {
      const newM = {
        impressions: 98000,
        clicks: 8100,
        ctr: 8.26,
        threeSecRetention: 43.0,
        completionRate: 20.0,
        inquiries: 180,
        orders: 72,
        cvr: 0.89,
        spend: 3800,
        roas: 1.12
      };
      setMetrics(newM);
    } else {
      const newM = {
        impressions: 35000,
        clicks: 720,
        ctr: 2.05,
        threeSecRetention: 19.5,
        completionRate: 7.2,
        inquiries: 30,
        orders: 8,
        cvr: 1.11,
        spend: 1500,
        roas: 0.65
      };
      setMetrics(newM);
    }
  };

  const handleSaveAssets = () => {
    onSaveToLibraries(selectedVariant);
    setSavedStatus('已成功沉淀胜出Hook、场景与证据至六大资产库！');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>千牛 / 闲鱼 / 抖音 灰度测试诊断室</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight sm:text-3xl">
            小预算投流测试与 CTR/CVR 效能处方
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            输入真实投放数据（展现、点击率CTR、3秒留存、千牛询单/闲鱼我想要、转化率CVR、投产ROAS），
            自动归因瓶颈：<strong className="text-amber-400">“前3秒流失 vs 货不对板 vs 缺乏实锤证据”</strong>，
            做出<strong className="text-emerald-400">【放大放量】</strong>或<strong className="text-rose-400">【果断淘汰】</strong>决策，并将赢家元素沉淀进六大资产库。
          </p>
        </div>
      </div>

      {/* Select Variant & Quick Presets */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-white">当前灰度测试变体:</span>
            <select
              value={selectedVariant.id}
              onChange={(e) => {
                const found = testList.find(x => x.id === e.target.value);
                if (found) handleSelectVariant(found);
              }}
              className="bg-slate-950 border border-slate-700 text-xs text-indigo-300 rounded-lg px-3 py-1.5 font-bold focus:outline-none focus:border-indigo-500"
            >
              {testList.map(v => (
                <option key={v.id} value={v.id}>
                  {v.id}: {v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto">
            <span className="text-xs text-slate-400 flex-shrink-0">一键模拟实战场景:</span>
            <button
              onClick={() => applyPresetScenario('WINNER')}
              className="px-2.5 py-1 text-xs bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-300 rounded-lg transition"
            >
              🔥 场景A: 超级爆款组 (高CTR+高CVR)
            </button>
            <button
              onClick={() => applyPresetScenario('CLICK_NO_CONVERT')}
              className="px-2.5 py-1 text-xs bg-amber-950/60 hover:bg-amber-900 border border-amber-700/50 text-amber-300 rounded-lg transition"
            >
              ⚠️ 场景B: 吸引人但货不对板 (高CTR+低CVR)
            </button>
            <button
              onClick={() => applyPresetScenario('BAD_HOOK')}
              className="px-2.5 py-1 text-xs bg-rose-950/60 hover:bg-rose-900 border border-rose-800/50 text-rose-300 rounded-lg transition"
            >
              ❌ 场景C: 开头严重流失 (低停留+低CTR)
            </button>
          </div>
        </div>

        {/* Channel Selector */}
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400">数据源通道:</span>
          <button
            onClick={() => setPlatformChannel('qianniu')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              platformChannel === 'qianniu'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>千牛 / 淘宝天猫后台</span>
          </button>
          <button
            onClick={() => setPlatformChannel('xianyu')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              platformChannel === 'xianyu'
                ? 'bg-amber-600 text-slate-950'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>闲鱼小黄鱼卖家后台</span>
          </button>
          <button
            onClick={() => setPlatformChannel('douyin')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              platformChannel === 'douyin'
                ? 'bg-red-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>抖音 / 巨量千川后台</span>
          </button>
        </div>
      </div>

      {/* Metrics Inputs & 4-Quadrant Visual Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Metric Sliders & Inputs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {platformChannel === 'qianniu' ? '千牛店铺核心指标' : platformChannel === 'xianyu' ? '闲鱼生态核心指标' : '抖音千川投放指标'}
            </span>
            <span className="text-xs text-indigo-400 font-mono">灰度样本期</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Impressions & Clicks */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">展现曝光量 (Imp)</label>
                <input
                  type="number"
                  value={metrics.impressions}
                  onChange={(e) => setMetrics({ ...metrics, impressions: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">点击数 (Clicks)</label>
                <input
                  type="number"
                  value={metrics.clicks}
                  onChange={(e) => {
                    const clk = Number(e.target.value);
                    const newCtr = metrics.impressions > 0 ? (clk / metrics.impressions) * 100 : metrics.ctr;
                    setMetrics({ ...metrics, clicks: clk, ctr: Number(newCtr.toFixed(2)) });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>
            </div>

            {/* CTR Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">点击率 CTR (%)</span>
                <span className="font-mono font-bold text-amber-400">{metrics.ctr}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15"
                step="0.1"
                value={metrics.ctr}
                onChange={(e) => setMetrics({ ...metrics, ctr: parseFloat(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            {/* 3s Retention */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">前 3 秒停留率 (%) (Hook指标)</span>
                <span className="font-mono font-bold text-indigo-400">{metrics.threeSecRetention}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="0.5"
                value={metrics.threeSecRetention}
                onChange={(e) => setMetrics({ ...metrics, threeSecRetention: parseFloat(e.target.value) })}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* Inquiries & Orders */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">
                  {platformChannel === 'xianyu' ? '闲鱼咨询我想要' : '千牛旺旺询单数'}
                </label>
                <input
                  type="number"
                  value={metrics.inquiries}
                  onChange={(e) => setMetrics({ ...metrics, inquiries: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">成交单量 (Orders)</label>
                <input
                  type="number"
                  value={metrics.orders}
                  onChange={(e) => {
                    const ord = Number(e.target.value);
                    const newCvr = metrics.clicks > 0 ? (ord / metrics.clicks) * 100 : metrics.cvr;
                    setMetrics({ ...metrics, orders: ord, cvr: Number(newCvr.toFixed(2)) });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>
            </div>

            {/* CVR Slider */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">成交转化率 CVR (%) (承接指标)</span>
                <span className="font-mono font-bold text-emerald-400">{metrics.cvr}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="10"
                step="0.1"
                value={metrics.cvr}
                onChange={(e) => setMetrics({ ...metrics, cvr: parseFloat(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Spend & ROAS */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-slate-400 block mb-1">消耗预算 (元)</label>
                <input
                  type="number"
                  value={metrics.spend}
                  onChange={(e) => setMetrics({ ...metrics, spend: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">投产比 ROAS</label>
                <input
                  type="number"
                  step="0.1"
                  value={metrics.roas}
                  onChange={(e) => setMetrics({ ...metrics, roas: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleRunDiagnosis}
            disabled={diagnosing}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50"
          >
            {diagnosing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>正在执行归因诊断...</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>执行效能归因诊断 (Diagnose)</span>
              </>
            )}
          </button>
        </div>

        {/* Right: AI Diagnostic Report & 4-Quadrant Matrix */}
        <div className="lg:col-span-7 space-y-4">
          {diagnosisResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
              {/* Decision Action Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    操盘手决策指示 (Action Signal)
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`text-xl font-black px-3 py-1 rounded-xl font-mono ${
                        diagnosisResult.decisionAction === 'SCALE'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                          : diagnosisResult.decisionAction === 'KILL'
                          ? 'bg-rose-950 text-rose-300 border border-rose-600'
                          : 'bg-amber-950 text-amber-300 border border-amber-600'
                      }`}
                    >
                      {diagnosisResult.decisionAction === 'SCALE'
                        ? '🔥 放大预算 (SCALE)'
                        : diagnosisResult.decisionAction === 'KILL'
                        ? '⛔ 果断淘汰 (KILL)'
                        : '🔄 灰度微调 (ITERATE)'}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">
                      {diagnosisResult.decisionAction === 'SCALE'
                        ? '指标全面超预期，立即追投放大'
                        : diagnosisResult.decisionAction === 'KILL'
                        ? '指标严重不及格，终止预算损耗'
                        : '保留部分优势，微创单变量重测'}
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSaveAssets}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/60 flex items-center space-x-1.5 transition"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>沉淀进资产库</span>
                  </button>

                  <button
                    onClick={() => onStartMicroInnovation(selectedVariant)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center space-x-1.5 transition shadow-md shadow-indigo-600/30"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>启动微创新 →</span>
                  </button>
                </div>
              </div>

              {savedStatus && (
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-700/50 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{savedStatus}</span>
                </div>
              )}

              {/* 4-Quadrant Visual Mini Map */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>CTR × CVR 创意定位象限</span>
                  <span className="font-mono text-indigo-400">
                    当前: CTR {metrics.ctr}% | CVR {metrics.cvr}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Quadrant 2: High CTR, Low CVR */}
                  <div
                    className={`p-3 rounded-lg border transition ${
                      metrics.ctr >= 5.0 && metrics.cvr < 2.5
                        ? 'bg-amber-950/40 border-amber-500 text-amber-200 ring-1 ring-amber-500/50'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>高CTR × 低CVR</span>
                      <span className="text-[10px]">⚠️ 货不对板</span>
                    </div>
                    <p className="text-[11px] mt-1 leading-tight text-slate-400">
                      开场很吸睛，但买家进店后心理落差大或缺乏真实评价背书。
                    </p>
                  </div>

                  {/* Quadrant 1: High CTR, High CVR */}
                  <div
                    className={`p-3 rounded-lg border transition ${
                      metrics.ctr >= 5.0 && metrics.cvr >= 2.5
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>高CTR × 高CVR</span>
                      <span className="text-[10px]">🔥 超级爆款</span>
                    </div>
                    <p className="text-[11px] mt-1 leading-tight text-slate-400">
                      前3秒吸睛，落地承接强，实锤证据到位，直接加大预算放量！
                    </p>
                  </div>

                  {/* Quadrant 3: Low CTR, Low CVR */}
                  <div
                    className={`p-3 rounded-lg border transition ${
                      metrics.ctr < 5.0 && metrics.cvr < 2.5
                        ? 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/50'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>低CTR × 低CVR</span>
                      <span className="text-[10px]">⛔ 无效变体</span>
                    </div>
                    <p className="text-[11px] mt-1 leading-tight text-slate-400">
                      前3秒严重划走（Hook失效），素材无人问津，立即停投淘汰。
                    </p>
                  </div>

                  {/* Quadrant 4: Low CTR, High CVR */}
                  <div
                    className={`p-3 rounded-lg border transition ${
                      metrics.ctr < 5.0 && metrics.cvr >= 2.5
                        ? 'bg-indigo-950/40 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/50'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>低CTR × 高CVR</span>
                      <span className="text-[10px]">💎 精准小众</span>
                    </div>
                    <p className="text-[11px] mt-1 leading-tight text-slate-400">
                      人群匹配度极高，但封面和前奏不够有噱头，微调Hook即可拉升。
                    </p>
                  </div>
                </div>
              </div>

              {/* Diagnosis Details */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300">
                    🔍 核心症结诊断: <span className="text-amber-400">{diagnosisResult.primaryBottleneck}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {diagnosisResult.detailedDiagnosis}
                  </p>
                </div>

                {/* Suggestions List */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-indigo-400 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>广告操盘手优化处方 (下一轮微创新动作):</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {diagnosisResult.microInnovationSuggestions.map((sug: string, i: number) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
