import React, { useState } from 'react';
import {
  TrendingUp,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Layers,
  Award,
  CheckCircle,
  HelpCircle,
  Flame,
  Zap,
  Repeat
} from 'lucide-react';
import { MatrixVariant, TestVariableType } from '../../types/adMatrix';
import { PRESET_VARIANTS } from '../../data/seedData';

interface MicroInnovationTabProps {
  winnerVariant: MatrixVariant | null;
  onLaunchNextCycle: (newSetup: {
    testVariable: TestVariableType;
    sellingPoints: string[];
    hooks: string[];
    formats: string[];
  }) => void;
}

export const MicroInnovationTab: React.FC<MicroInnovationTabProps> = ({
  winnerVariant,
  onLaunchNextCycle
}) => {
  const currentWinner = winnerVariant || PRESET_VARIANTS[0];

  const [selectedStrategy, setSelectedStrategy] = useState<'HOOK_LOCKED' | 'SCENE_LOCKED' | 'PROOF_LOCKED'>('HOOK_LOCKED');
  const [launchedNotice, setLaunchedNotice] = useState(false);

  const strategies = [
    {
      id: 'HOOK_LOCKED',
      title: '策略 1: 锁死赢家Hook，微创新3个使用场景 (横向扩人群)',
      desc: '当前Hook已证实具备46.2%超高停留力。保持开头0-3秒不变，仅微创新中段的代入场景，拓宽至职场、通勤与自习人群。',
      variable: 'SCENE' as TestVariableType,
      setup: {
        sellingPoints: [
          '48dB自适应双核降噪（胜出卖点）',
          '人体工学0压感佩戴',
          '大牌三分之一价格直供'
        ],
        hooks: [
          currentWinner.hook, // 胜出Hook保持不变
          currentWinner.hook,
          currentWinner.hook
        ],
        formats: [
          '场景A: 开放式工位码字抗噪实测',
          '场景B: 早高峰地铁钢轨轰鸣车厢抗噪',
          '场景C: 深夜合租房挑灯备考抗噪'
        ]
      }
    },
    {
      id: 'SCENE_LOCKED',
      title: '策略 2: 锁死工位场景，微创新3套证据背书 (深挖信任度)',
      desc: '工位痛点代入感极强（CVR 4.7%）。保持场景不变，微创新不同信任实锤（千牛好评墙 vs CNAS消音室报告 vs 闲鱼验机单）。',
      variable: 'SELLING_POINT' as TestVariableType,
      setup: {
        sellingPoints: [
          '证据A: 千牛官方店1.2万条买家真实追评墙',
          '证据B: 国家声学CNAS消音室48dB检测报告',
          '证据C: 闲鱼买家使用3个月实拍反馈与转转验机'
        ],
        hooks: [
          currentWinner.hook,
          '“千牛后台被问爆了：‘真的能隔绝高铁婴儿哭闹声吗？’今天买张高铁票去测！”',
          '“闲鱼粉丝问：为什么有人全新转卖这款降噪神器？自费验机！”'
        ],
        formats: [
          '真人出镜实测对比（分贝仪测试）',
          '显微镜/螺丝刀拆解发声芯片',
          '真实买家晒单原图滑动'
        ]
      }
    },
    {
      id: 'PROOF_LOCKED',
      title: '策略 3: 锁死内容骨架，微创新3种促单紧迫感CTA (拉爆下单率)',
      desc: '解决“看了很心动但犹豫不决”问题。保持前20秒不变，微创新结尾5秒促单（暗号立减 vs 赠送原装皮套 vs 7天运费险试戴）。',
      variable: 'FORMAT' as TestVariableType,
      setup: {
        sellingPoints: [
          '促单A: 点击下方领券备注“暗号”立减20元',
          '促单B: 前50名加赠价值89元原装皮质收纳包',
          '促单C: 赠送双向运费险，支持试戴7天不满意全额退'
        ],
        hooks: [
          currentWinner.hook,
          '“工位上最烦的3种噪音，戴上它的瞬间直接消失……”',
          '“3秒钟，戴上它，听听世界有多安静——”'
        ],
        formats: [
          '结尾镜头特写顺丰包邮箱与保修卡',
          '结尾展示赠品皮套与配件全家福',
          '结尾展示手把手点击小黄车领券操作'
        ]
      }
    }
  ];

  const activeStrategyObj = strategies.find(s => s.id === selectedStrategy) || strategies[0];

  const handleLaunch = () => {
    onLaunchNextCycle({
      testVariable: activeStrategyObj.variable,
      sellingPoints: activeStrategyObj.setup.sellingPoints,
      hooks: activeStrategyObj.setup.hooks,
      formats: activeStrategyObj.setup.formats
    });
    setLaunchedNotice(true);
    setTimeout(() => setLaunchedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-950/40 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>素材增长滚雪球模式 (Continuous Agile Flywheel)</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight sm:text-3xl">
            提取胜出变体基因，启动下一轮微创新
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            顶级广告公司的核心打法不是盲目重拍，而是
            <strong className="text-amber-400">【赢家微创新】</strong>：
            锁定上一轮跑通的高停留Hook或高转化场景，仅微调1个单变量（新场景/新背书/新促单），
            以最低成本持续产出高胜率变体！
          </p>
        </div>
      </div>

      {/* Winner DNA Card */}
      <div className="bg-slate-900 border border-indigo-900/60 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              本轮获胜变体基因档案 (Winner DNA Profile)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
            胜出ID: {currentWinner.id}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">
              🎣 获胜 Hook 基因 (停留率 46.2%)
            </span>
            <p className="text-xs text-slate-200 line-clamp-2 font-mono">
              {currentWinner.hook}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-indigo-400 font-bold uppercase block mb-1">
              ✨ 获胜卖点基因 (CVR 4.7%)
            </span>
            <p className="text-xs text-slate-200 line-clamp-2">
              {currentWinner.sellingPoint}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-emerald-400 font-bold uppercase block mb-1">
              🎥 获胜形式基因
            </span>
            <p className="text-xs text-slate-200 line-clamp-2">
              {currentWinner.format}
            </p>
          </div>
        </div>
      </div>

      {/* 3 Strategy Choices */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>选择下一轮微创新裂变策略 (Select Next Mutation Model)</span>
          </h3>
          <span className="text-xs text-slate-400">
            系统将自动将赢家基因导入 Step 1 & 2
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategies.map((strat) => {
            const isSelected = selectedStrategy === strat.id;
            return (
              <div
                key={strat.id}
                onClick={() => setSelectedStrategy(strat.id as any)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-950/80 to-slate-950 border-indigo-500 shadow-xl ring-1 ring-indigo-500/50'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-400">
                      单变量: {strat.variable}
                    </span>
                    {isSelected && (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-white mb-2 leading-snug">
                    {strat.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {strat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-indigo-300 font-semibold flex items-center justify-between">
                  <span>点击选中策略</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Next Round Matrix Setup & Launch Button */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              下一轮矩阵配置预览: 【{activeStrategyObj.title}】
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              锁死获胜元素，仅裂变 3 个新变量，保持高胜率
            </p>
          </div>

          <button
            onClick={handleLaunch}
            className="py-2.5 px-5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition"
          >
            <Repeat className="w-4 h-4" />
            <span>立即注入矩阵并开启新一轮迭代 (Launch Cycle)</span>
          </button>
        </div>

        {launchedNotice && (
          <div className="p-3 bg-emerald-950/70 border border-emerald-700/60 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>已成功注入新变体矩阵配置！请前往【变体矩阵 (3×3×3)】查看并批量生成新脚本。</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-indigo-400 block">卖点配置:</span>
            {activeStrategyObj.setup.sellingPoints.map((s, i) => (
              <p key={i} className="text-slate-300 truncate">• {s}</p>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-amber-400 block">Hook配置:</span>
            {activeStrategyObj.setup.hooks.map((h, i) => (
              <p key={i} className="text-slate-300 truncate">• {h}</p>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-emerald-400 block">形式/场景配置:</span>
            {activeStrategyObj.setup.formats.map((f, i) => (
              <p key={i} className="text-slate-300 truncate">• {f}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
