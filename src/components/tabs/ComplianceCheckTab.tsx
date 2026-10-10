import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Info
} from 'lucide-react';
import { PlatformType, ComplianceCheckResult } from '../../types/adMatrix';
import { checkAdCompliance } from '../../services/api';

interface ComplianceCheckTabProps {
  initialText?: string;
  onSendToGrayTest?: (script: string) => void;
}

export const ComplianceCheckTab: React.FC<ComplianceCheckTabProps> = ({
  initialText = '',
  onSendToGrayTest
}) => {
  const [inputText, setInputText] = useState(
    initialText ||
      `【开场0-3秒】“别再买上千块的智商税了！今天扒一扒全网第一的降噪神器，绝对100%隔绝所有工位噪音，秒杀所有国际大牌！”\n【展开4-12秒】“这是顶级代工厂原单直出，只要加v私聊客服，今天拍下立减150元！”\n【转化21-30秒】“终身保修，假一赔十，赶紧微信私聊我抢购！”`
  );

  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([
    'douyin',
    'xiaohongshu',
    'xianyu',
    'qianniu'
  ]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComplianceCheckResult | null>(null);
  const [copied, setCopied] = useState(false);

  const platformsMeta: { key: PlatformType; name: string; tag: string; rules: string }[] = [
    {
      key: 'douyin',
      name: '抖音 / 巨量千川',
      tag: '重点防限流',
      rules: '严禁新广告法极限词（第一/顶级）、虚假夸大（100%有效）、私域导流（加v/微信）。触碰会导致投流被拒或自然流严重限流。'
    },
    {
      key: 'xianyu',
      name: '闲鱼生态',
      tag: '防封号下架',
      rules: '严禁站外导流（微信/加v/走线下/转账）及涉假嫌疑词（原单/高仿/超A）。触碰会被系统直接下架商品甚至永久禁言。'
    },
    {
      key: 'qianniu',
      name: '千牛 / 淘宝天猫',
      tag: '天猫广告法',
      rules: '严查极限词、绝对化承诺、违规好评返现引导。违者将扣减店铺信用分、商品降权或广告下架。'
    },
    {
      key: 'xiaohongshu',
      name: '小红书种草',
      tag: '防判定营销号',
      rules: '重度排斥硬广营销号话术、外部导流、医美医疗级违规夸大。触碰会导致笔记违规不收录，无法出现在搜索页。'
    }
  ];

  const handleScan = async (textToScan?: string) => {
    const text = textToScan || inputText;
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await checkAdCompliance(text, selectedPlatforms);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleScan(inputText);
  }, []);

  const handleApplySafeRewrite = () => {
    if (result?.safeRewrittenText) {
      setInputText(result.safeRewrittenText);
      handleScan(result.safeRewrittenText);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePlatform = (p: PlatformType) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(item => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>合规风控与防限流雷达 (Anti-Shadowban Engine)</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight sm:text-3xl">
            多平台违规审查与一键合规净版重写
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            严密筛查抖音、闲鱼、千牛、小红书的
            <strong className="text-amber-400">【绝对化极限词】</strong>、
            <strong className="text-rose-400">【站外导流高压线】</strong>、
            <strong className="text-cyan-400">【虚假功效承诺】</strong>与
            <strong className="text-purple-400">【假货仿品嫌疑】</strong>
            ，确保素材在各大渠道稳定跑量，杜绝隐形降权与限流！
          </p>
        </div>
      </div>

      {/* Target Platforms Toggle Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-slate-300">
            审查目标平台 (已配置多通道风控词库):
          </span>
          <span className="text-xs text-slate-500">
            勾选以应用该平台专项合规红线
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {platformsMeta.map((p) => {
            const isChecked = selectedPlatforms.includes(p.key);
            return (
              <div
                key={p.key}
                onClick={() => togglePlatform(p.key)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-slate-950 border-amber-500/60 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{p.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isChecked ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {p.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {p.rules}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Text Inspector & Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Text Area */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <span>待检推广文案 / 视频分镜台词</span>
              </label>
              <span className="text-xs text-slate-500 font-mono">
                {inputText.length} 字符
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={12}
              placeholder="在此粘贴推广文案、脚本台词或闲鱼/千牛商品介绍..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono resize-y"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={() => handleScan()}
              disabled={loading}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-md shadow-amber-600/20 flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>正在扫描各平台违规与限流风险...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>立即执行合规筛查 (Run Check)</span>
                </>
              )}
            </button>

            {result?.safeRewrittenText && (
              <button
                onClick={handleApplySafeRewrite}
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-1.5 transition shadow-md shadow-emerald-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>一键采纳合规净版改写</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Scan Results & Risk Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          {result && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
              {/* Score Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-slate-400">综合合规安全分:</span>
                    <span
                      className={`text-2xl font-black font-mono ${
                        result.overallScore >= 85
                          ? 'text-emerald-400'
                          : result.overallScore >= 65
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.overallScore} / 100
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    风险评级:{' '}
                    <span
                      className={`font-bold ${
                        result.riskLevel === 'PASS'
                          ? 'text-emerald-400'
                          : result.riskLevel === 'LOW'
                          ? 'text-indigo-400'
                          : result.riskLevel === 'MEDIUM'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.riskLevel === 'PASS'
                        ? '完全合规 (建议投放)'
                        : result.riskLevel === 'LOW'
                        ? '低危建议 (可微调)'
                        : result.riskLevel === 'MEDIUM'
                        ? '中危警告 (需修正)'
                        : '高危限流警告 (严禁直接上线)'}
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {result.overallScore >= 85 ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </div>

              {/* Platform Status Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(result.platformStatus).map(([plat, status]) => (
                  <div
                    key={plat}
                    className={`p-2 rounded-xl border text-center ${
                      status.pass
                        ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                    }`}
                  >
                    <div className="text-[11px] font-semibold capitalize">
                      {plat === 'douyin' ? '抖音千川' : plat === 'xianyu' ? '闲鱼生态' : plat === 'qianniu' ? '千牛淘宝' : '小红书'}
                    </div>
                    <div className="text-xs font-bold mt-0.5 flex items-center justify-center space-x-1">
                      {status.pass ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span>通过</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-rose-400" />
                          <span>限流拦截</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Flagged Sensitive Words List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>
                    检出雷区词汇 ({result.flaggedWords.length} 项)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    点击替换建议可一键修复
                  </span>
                </div>

                {result.flaggedWords.length === 0 ? (
                  <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>太棒了！未发现违规违禁词与限流雷区，可在各平台放心投放。</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {result.flaggedWords.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-1.5">
                            <span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold font-mono">
                              {item.word}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight">
                            {item.reason}
                          </p>
                        </div>

                        <div className="text-right sm:flex-shrink-0">
                          <span className="text-[10px] text-slate-500 block">建议替换:</span>
                          <span className="text-emerald-400 font-semibold font-mono text-xs">
                            {item.suggestion}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Safe Rewritten Text Preview */}
              {result.safeRewrittenText && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center space-x-1 text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI 生成合规净版文案 (避开限流，保留吸引力)</span>
                    </span>
                    <button
                      onClick={() => handleCopy(result.safeRewrittenText)}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? '已复制' : '复制改写版'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-950 border border-emerald-900/40 rounded-xl p-3 text-xs text-emerald-200 leading-relaxed font-mono whitespace-pre-wrap">
                    {result.safeRewrittenText}
                  </div>
                </div>
              )}

              {/* Compliance Tips */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 flex items-center space-x-1">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  <span>资深广告审核规避技巧 (Pro Tips):</span>
                </div>
                {result.complianceTips.map((tip, i) => (
                  <p key={i} className="text-[11px] text-slate-400 flex items-start space-x-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{tip}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
