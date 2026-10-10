import React from 'react';
import {
  Target,
  Grid3X3,
  Video,
  ShieldCheck,
  Zap,
  TrendingUp,
  Filter,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

interface FlywheelStepperProps {
  currentStepIndex: number;
  onSelectStep: (stepId: string) => void;
  activeTestVariable: string;
}

export const FlywheelStepper: React.FC<FlywheelStepperProps> = ({
  currentStepIndex,
  onSelectStep,
  activeTestVariable
}) => {
  const steps = [
    {
      id: 'step1',
      tab: 'matrix',
      num: '1',
      title: '定义单变量',
      desc: `聚焦: ${activeTestVariable}`,
      icon: Target
    },
    {
      id: 'step2',
      tab: 'matrix',
      num: '2',
      title: '搭建变体矩阵',
      desc: '3卖点×3开场×3形式',
      icon: Grid3X3
    },
    {
      id: 'step3',
      tab: 'matrix',
      num: '3',
      title: '批量生产脚本',
      desc: '分镜/台词/视觉卡',
      icon: Video
    },
    {
      id: 'step4',
      tab: 'compliance',
      num: '4',
      title: '合规防限流排查',
      desc: '拦截违禁/安全改写',
      icon: ShieldCheck
    },
    {
      id: 'step5',
      tab: 'graytest',
      num: '5',
      title: '小预算灰度测试',
      desc: '千牛/闲鱼/抖音数据',
      icon: Zap
    },
    {
      id: 'step6',
      tab: 'graytest',
      num: '6',
      title: 'CTR/CVR诊断',
      desc: '归因瓶颈与处方',
      icon: TrendingUp
    },
    {
      id: 'step7',
      tab: 'graytest',
      num: '7',
      title: '淘汰或放大',
      desc: 'Kill劣质 / Scale爆款',
      icon: Filter
    },
    {
      id: 'step8',
      tab: 'micro',
      num: '8',
      title: '资产沉淀&微创新',
      desc: '入六大库/启动下轮',
      icon: RefreshCw
    }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-md mb-6 backdrop-blur">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <h2 className="text-sm font-bold text-white tracking-wide">
            广告素材增长飞轮流水线 (Agile Growth Pipeline)
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">
            “单变量定义 → 3×3×3裂变 → 防限流审查 → 千牛/闲鱼灰度 → 诊断淘汰或放大 → 沉淀资产库 → 微创新”
          </span>
        </div>
        <div className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
          飞轮运转中
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = currentStepIndex === idx;
          const isPast = currentStepIndex > idx;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.tab)}
              className={`relative text-left p-2.5 rounded-xl transition-all border group flex flex-col justify-between ${
                isCurrent
                  ? 'bg-gradient-to-b from-indigo-950/80 to-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10'
                  : isPast
                  ? 'bg-slate-900/60 border-emerald-900/40 hover:border-emerald-700/60'
                  : 'bg-slate-900/40 border-slate-800/70 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/30'
                      : isPast
                      ? 'bg-emerald-600/80 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step.num}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isCurrent
                      ? 'text-indigo-400'
                      : isPast
                      ? 'text-emerald-400'
                      : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                />
              </div>

              <div>
                <div
                  className={`text-xs font-semibold truncate ${
                    isCurrent
                      ? 'text-white'
                      : isPast
                      ? 'text-slate-200'
                      : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {step.desc}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-700">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
