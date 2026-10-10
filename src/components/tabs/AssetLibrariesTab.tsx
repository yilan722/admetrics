import React, { useState } from 'react';
import {
  Database,
  Plus,
  Search,
  Filter,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Video,
  BarChart3,
  Users,
  Target,
  FileCheck,
  ArrowRight,
  BookmarkCheck
} from 'lucide-react';
import {
  HookAsset,
  SceneAsset,
  SellingPointAsset,
  EvidenceAsset,
  CreatorAsset,
  PerformanceFeedbackAsset,
  PlatformType
} from '../../types/adMatrix';

interface AssetLibrariesTabProps {
  hooks: HookAsset[];
  setHooks: React.Dispatch<React.SetStateAction<HookAsset[]>>;
  scenes: SceneAsset[];
  setScenes: React.Dispatch<React.SetStateAction<SceneAsset[]>>;
  sellingPoints: SellingPointAsset[];
  setSellingPoints: React.Dispatch<React.SetStateAction<SellingPointAsset[]>>;
  evidences: EvidenceAsset[];
  setEvidences: React.Dispatch<React.SetStateAction<EvidenceAsset[]>>;
  creators: CreatorAsset[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorAsset[]>>;
  feedbacks: PerformanceFeedbackAsset[];
  setFeedbacks: React.Dispatch<React.SetStateAction<PerformanceFeedbackAsset[]>>;
  onApplyToMatrix: (type: 'HOOK' | 'SCENE' | 'SELLING_POINT', content: string) => void;
}

export const AssetLibrariesTab: React.FC<AssetLibrariesTabProps> = ({
  hooks,
  setHooks,
  scenes,
  setScenes,
  sellingPoints,
  setSellingPoints,
  evidences,
  setEvidences,
  creators,
  setCreators,
  feedbacks,
  setFeedbacks,
  onApplyToMatrix
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'hook' | 'scene' | 'selling' | 'evidence' | 'creator' | 'feedback'
  >('hook');

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  // Modal for adding a new item
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApply = (type: 'HOOK' | 'SCENE' | 'SELLING_POINT', text: string) => {
    onApplyToMatrix(type, text);
    setAppliedNotice(`已成功将「${text.slice(0, 15)}...」推入当前矩阵！`);
    setTimeout(() => setAppliedNotice(null), 3000);
  };

  const handleAddNewItem = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    if (activeSubTab === 'hook') {
      const newItem: HookAsset = {
        id: `HOOK-${(hooks.length + 1).toString().padStart(3, '0')}`,
        title: newTitle,
        hookText: newContent,
        mechanism: '痛点刺痛',
        avgThreeSecRetention: 44.5,
        avgCtr: 7.5,
        platforms: ['douyin', 'qianniu'],
        testedTimes: 1,
        tags: [newTag || '实战提炼'],
        exampleUse: '实战灰度测试赢家沉淀',
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setHooks([newItem, ...hooks]);
    } else if (activeSubTab === 'scene') {
      const newItem: SceneAsset = {
        id: `SCENE-${(scenes.length + 1).toString().padStart(3, '0')}`,
        title: newTitle,
        scenarioDescription: newContent,
        demographic: newTag || '年轻白领',
        emotionalTrigger: '生活痛点代入',
        avgCvr: 4.5,
        immersionScore: 92,
        props: ['日常道具'],
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setScenes([newItem, ...scenes]);
    } else if (activeSubTab === 'selling') {
      const newItem: SellingPointAsset = {
        id: `SELL-${(sellingPoints.length + 1).toString().padStart(3, '0')}`,
        benefitTitle: newTitle,
        description: newContent,
        targetAudience: newTag || '泛消费人群',
        decisionTrigger: '高性价比与硬核背书',
        winRate: 80.0,
        competitorAdvantage: '差异化明显',
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setSellingPoints([newItem, ...sellingPoints]);
    } else if (activeSubTab === 'evidence') {
      const newItem: EvidenceAsset = {
        id: `EVI-${(evidences.length + 1).toString().padStart(3, '0')}`,
        title: newTitle,
        type: '千牛高频追评',
        contentSnippet: newContent,
        credibilityIndex: 94,
        referenceCount: 1,
        sourceNote: newTag || '真实买家反馈',
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setEvidences([newItem, ...evidences]);
    }

    setNewTitle('');
    setNewContent('');
    setNewTag('');
    setShowAddModal(false);
  };

  const tabsConfig = [
    {
      id: 'hook',
      name: '🎣 1. Hook库 (开场钩子)',
      desc: '记录哪些开头能大幅提高前3秒停留率与完播率',
      count: hooks.length,
      color: 'amber'
    },
    {
      id: 'scene',
      name: '🎬 2. 场景库 (代入场景)',
      desc: '记录哪些具体使用场景更有代入感与情绪共鸣',
      count: scenes.length,
      color: 'emerald'
    },
    {
      id: 'selling',
      name: '✨ 3. 卖点库 (人群心智)',
      desc: '记录不同人群最关心的核心利益点与买单触发点',
      count: sellingPoints.length,
      color: 'indigo'
    },
    {
      id: 'evidence',
      name: '🛡️ 4. 证据库 (实锤背书)',
      desc: '记录闲鱼买家秀、千牛追评、对比、检测与真实反馈',
      count: evidences.length,
      color: 'cyan'
    },
    {
      id: 'creator',
      name: '🌟 5. 达人库 (创作者矩阵)',
      desc: '记录不同达人的内容风格、投产表现与避坑指南',
      count: creators.length,
      color: 'purple'
    },
    {
      id: 'feedback',
      name: '📊 6. 数据反馈库 (效能战报)',
      desc: '记录素材在不同平台、人群、阶段的全周期数据',
      count: feedbacks.length,
      color: 'rose'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>广告公司核心壁垒：六大内容资产中台</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              系统沉淀六大内容资产库 (Asset Capitalization Engine)
            </h1>
            <p className="mt-1 text-xs text-slate-300">
              “素材会衰退，但胜出的 Hook、场景、卖点、证据与达人经验将永久沉淀为团队的增长印钞机。”
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 transition flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>新增资产条目</span>
          </button>
        </div>
      </div>

      {appliedNotice && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-700/60 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
          <span>{appliedNotice}</span>
        </div>
      )}

      {/* 6 Tabs Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {tabsConfig.map((t) => {
          const isActive = activeSubTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id as any)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {t.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                  {t.count}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                {t.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs">
        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="在当前资产库中搜索关键词（如：降噪、工位、闲鱼、万条好评、前3秒...）"
          className="bg-transparent border-none text-white placeholder-slate-500 focus:outline-none w-full"
        />
      </div>

      {/* Tab Content Display */}

      {/* 1. Hook Library */}
      {activeSubTab === 'hook' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hooks
            .filter(h => h.title.includes(searchQuery) || h.hookText.includes(searchQuery) || h.mechanism.includes(searchQuery))
            .map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-amber-800/60 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/40">
                      {item.id}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {item.mechanism}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-2">{item.title}</h4>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-amber-200 leading-relaxed font-mono">
                    {item.hookText}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block">3秒停留率</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {item.avgThreeSecRetention}%
                      </span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block">平均CTR</span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {item.avgCtr}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => handleCopy(item.id, item.hookText)}
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? '已复制' : '复制台词'}</span>
                  </button>

                  <button
                    onClick={() => handleApply('HOOK', item.hookText)}
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
                  >
                    <span>应用至矩阵</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 2. Scene Library */}
      {activeSubTab === 'scene' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenes
            .filter(s => s.title.includes(searchQuery) || s.scenarioDescription.includes(searchQuery) || s.demographic.includes(searchQuery))
            .map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-emerald-800/60 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/40">
                      {item.id}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 font-mono">
                      代入感: {item.immersionScore}分
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-2">{item.title}</h4>

                  <p className="text-xs text-slate-300 leading-relaxed p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    {item.scenarioDescription}
                  </p>

                  <div className="mt-3 space-y-1 text-xs">
                    <div className="text-slate-400">
                      <span className="text-slate-500">适用人群:</span> {item.demographic}
                    </div>
                    <div className="text-slate-400">
                      <span className="text-slate-500">情绪触发:</span> {item.emotionalTrigger}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-mono font-semibold">
                    历史平均CVR: {item.avgCvr}%
                  </span>
                  <button
                    onClick={() => handleCopy(item.id, item.scenarioDescription)}
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>复制场景</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 3. Selling Point Library */}
      {activeSubTab === 'selling' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellingPoints
            .filter(sp => sp.benefitTitle.includes(searchQuery) || sp.description.includes(searchQuery) || sp.targetAudience.includes(searchQuery))
            .map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-indigo-800/60 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900/40">
                      {item.id}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 font-mono">
                      测试胜率: {item.winRate}%
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-2">{item.benefitTitle}</h4>

                  <p className="text-xs text-indigo-200 leading-relaxed p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    {item.description}
                  </p>

                  <div className="mt-3 space-y-1 text-xs">
                    <div className="text-slate-400">
                      <span className="text-slate-500">目标心智人群:</span> {item.targetAudience}
                    </div>
                    <div className="text-slate-400">
                      <span className="text-slate-500">买单动因:</span> {item.decisionTrigger}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => handleCopy(item.id, item.description)}
                    className="text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>复制卖点</span>
                  </button>

                  <button
                    onClick={() => handleApply('SELLING_POINT', item.description)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
                  >
                    <span>应用至矩阵</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 4. Evidence Library */}
      {activeSubTab === 'evidence' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evidences
            .filter(e => e.title.includes(searchQuery) || e.contentSnippet.includes(searchQuery) || e.type.includes(searchQuery))
            .map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-cyan-800/60 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-900/40">
                      {item.id}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {item.type}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-2">{item.title}</h4>

                  <p className="text-xs text-cyan-200 leading-relaxed p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                    {item.contentSnippet}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>可信度指数: <strong className="text-cyan-400 font-mono">{item.credibilityIndex}/100</strong></span>
                    <span>已引用: <strong className="text-white font-mono">{item.referenceCount}次</strong></span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 truncate max-w-[150px]">
                    来源: {item.sourceNote}
                  </span>
                  <button
                    onClick={() => handleCopy(item.id, item.contentSnippet)}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>引用证据</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 5. Creator Library */}
      {activeSubTab === 'creator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creators
            .filter(c => c.creatorName.includes(searchQuery) || c.style.includes(searchQuery) || c.demographicFit.includes(searchQuery))
            .map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-purple-800/60 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-900/40">
                      {item.id}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-800/40">
                      {item.style}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-2">{item.creatorName}</h4>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block">历史投产 ROI</span>
                      <span className="font-mono font-bold text-purple-300 text-sm">{item.historicalRoas}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block">平均 CTR</span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">{item.historicalCtr}%</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-xs">
                    <div className="text-slate-400">
                      <span className="text-slate-500">核心优势:</span> {item.keyStrengths}
                    </div>
                    <div className="text-slate-400">
                      <span className="text-rose-400">避坑要点:</span> {item.avoidPitfalls}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate">
                    {item.cooperationCostTier}
                  </span>
                  <span className="text-slate-500 font-mono">
                    CPM ≈ {item.cpmAvg}元
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 6. Performance Feedback Library */}
      {activeSubTab === 'feedback' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedbacks
            .filter(f => f.materialName.includes(searchQuery) || f.gainsSummary.includes(searchQuery) || f.platform.includes(searchQuery as any))
            .map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-rose-800/60 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/40">
                      {item.id}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 capitalize">
                      {item.platform === 'douyin' ? '抖音' : item.platform === 'xianyu' ? '闲鱼' : item.platform === 'qianniu' ? '千牛' : '小红书'} · {item.stage}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-2">{item.materialName}</h4>

                  <div className="grid grid-cols-3 gap-1.5 text-xs text-center">
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">CTR</span>
                      <span className="font-mono font-bold text-amber-400">{item.ctr}%</span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">CVR</span>
                      <span className="font-mono font-bold text-emerald-400">{item.cvr}%</span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">ROAS</span>
                      <span className="font-mono font-bold text-purple-400">{item.roas}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 p-2 rounded bg-slate-950/60 border border-slate-800 leading-snug">
                    {item.gainsSummary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span>累计消耗: ¥{item.spend}</span>
                  <span className="font-mono">{item.dateAdded}</span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">
              录入新资产至【{tabsConfig.find(t => t.id === activeSubTab)?.name}】
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">资产名称 / 标题</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例如：工位敲键盘分贝暴击Hook / 闲鱼高频验机买家秀..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">内容文案 / 具体描述</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  placeholder="详细台词、脚本内容、背书文本或场景细节..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">标签 / 对应人群 / 渠道备注</label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="例如：职场痛点 / 闲鱼小黄鱼 / 48dB认证"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                取消
              </button>
              <button
                onClick={handleAddNewItem}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/30"
              >
                确认沉淀入库
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
