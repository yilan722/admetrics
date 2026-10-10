import React from 'react';
import {
  Layers,
  Sparkles,
  ShieldAlert,
  Database,
  TrendingUp,
  Cpu,
  BarChart3
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalAssetsCount: number;
  totalVariantsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  totalAssetsCount,
  totalVariantsCount
}) => {
  const navItems = [
    { id: 'extractor', label: '网站解析与提炼', icon: Sparkles, badge: 'Step 0' },
    { id: 'matrix', label: '变体矩阵 (3×3×3)', icon: Layers, badge: `${totalVariantsCount}组` },
    { id: 'compliance', label: '防限流合规检测', icon: ShieldAlert, badge: '高危预警' },
    { id: 'graytest', label: '灰度测试与诊断', icon: BarChart3, badge: '千牛/闲鱼' },
    { id: 'assets', label: '六大内容资产库', icon: Database, badge: `${totalAssetsCount}项` },
    { id: 'micro', label: '赢家微创新闭环', icon: TrendingUp, badge: '滚雪球' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('extractor')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  AdMatrix
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
                  AGENCY PRO
                </span>
              </div>
              <p className="text-xs text-slate-400">广告素材敏捷裂变与增长资产中台</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-indigo-500/30 text-indigo-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Multi-Platform Badges */}
          <div className="hidden lg:flex items-center space-x-2 text-xs">
            <span className="text-slate-500">生态联动:</span>
            <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-800/40 text-red-300 font-medium">抖音千川</span>
            <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40 text-amber-300 font-medium">闲鱼淘客</span>
            <span className="px-2 py-0.5 rounded bg-orange-950/60 border border-orange-800/40 text-orange-300 font-medium">千牛淘宝</span>
            <span className="px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40 text-rose-300 font-medium">小红书</span>
          </div>
        </div>
      </div>

      {/* Mobile nav scrollbar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-800 space-x-2 bg-slate-900/90">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-medium ${
                isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
