import React, { useState } from 'react';
import {
  Globe,
  Sparkles,
  ArrowRight,
  BookmarkPlus,
  CheckCircle2,
  AlertCircle,
  Copy,
  Layers,
  FileText
} from 'lucide-react';
import { ExtractedProductInfo } from '../../types/adMatrix';
import { extractProductFromUrl } from '../../services/api';

interface UrlExtractorTabProps {
  onSyncToMatrix: (data: ExtractedProductInfo) => void;
  onSaveToLibraries: (data: ExtractedProductInfo) => void;
}

export const UrlExtractorTab: React.FC<UrlExtractorTabProps> = ({
  onSyncToMatrix,
  onSaveToLibraries
}) => {
  const [url, setUrl] = useState('https://brand-audio.com/anc-pro-headphones');
  const [rawContent, setRawContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [syncedStatus, setSyncedStatus] = useState<string | null>(null);

  const [extractedData, setExtractedData] = useState<ExtractedProductInfo>({
    productName: '新一代声学自适应主动降噪耳机 Pro',
    category: '数码办公 / 消费电子 / 工位好物',
    brandTone: '科技硬核、极简舒适、打工人嘴替、高性价比',
    targetAudience: ['开放式工位职场白领', '早晚高峰地铁通勤族', '合租/考研考公自律学生'],
    corePainPoints: [
      '工位同事打电话、敲机械键盘太吵，注意力每隔10分钟被打断一次',
      '普通头戴耳机耳压太重，戴不到1小时就夹得头疼耳热',
      '千元大牌降噪耳机动辄溢价数倍，百元杂牌降噪形同虚设'
    ],
    sellingPoints: [
      'CNAS认证48dB双核动态降噪，开启瞬间工位变成深夜自习室',
      '液态记忆棉0压感工学设计，带眼镜佩戴6小时依然轻柔无压',
      '千牛/闲鱼直营出厂价格打穿底线，附赠7天无理由试戴运费险'
    ],
    usageScenes: [
      '开放式办公区深度码字/赶方案，瞬间隔绝周边交谈与键盘敲击',
      '早高峰地铁钢轨摩擦与报站轰鸣中，清晰沉浸听播客',
      '深夜合租房挑灯备考，物理隔绝隔壁室友洗漱吹风机杂音'
    ],
    evidenceClues: [
      '千牛官方旗舰店累计好评超4.2万条，4.98分声誉口碑背书',
      '国家声学中心CNAS实验室出具的48dB频响降噪报告扫描件',
      '闲鱼买家真实使用3个月实拍返图与转转验机单'
    ],
    recommendedHooks: [
      '“如果你的工位旁边有敲青轴机械键盘或者大声打电话的同事，你懂这种崩溃吗？”',
      '“别急着买上千块的大牌降噪了！今天拿500块的国产代工厂同款去专业消音室硬碰硬……”',
      '“闲鱼粉丝问：为什么有人在二手平台全新转卖这款降噪神器？今天直接自费验机！”'
    ],
    summary: '百元级深度降噪天花板，用实打实实验室数据+千牛万条好评解决工位与通勤噪音痛点。'
  });

  const presetExamples = [
    {
      label: '数码好物: 48dB降噪耳机',
      url: 'https://brand-audio.com/anc-pro-headphones',
      brief: '主打48dB深度降噪与0压感佩戴，千牛旗舰店销量4.2万件，好评率4.98，针对工位嘈杂与地铁通勤。'
    },
    {
      label: '美妆护肤: 次抛玻尿酸精华',
      url: 'https://derm-lab.cn/b5-hyaluronic-serum',
      brief: '无菌B5玻尿酸次抛修护精华，针对换季泛红、熬夜垮脸。千牛真实买家追评超8000条，强调退红迅速无香精防腐剂。'
    },
    {
      label: '办公神器: 矮轴机械键盘',
      url: 'https://ergodesk.com/slim-wireless-keyboard',
      brief: '人体工学超薄无线矮轴键盘，静音红轴设计不扰民，Mac/Win双模切换，解决手腕酸痛与工位走线杂乱。'
    },
    {
      label: '闲鱼高消: 99新原装微单相机',
      url: 'https://xianyu.taobao.com/item/camera-a7m3-like-new',
      brief: '闲鱼同城验机99新成色全画幅微单，带原厂快门次数截图与验机报告，适合自媒体新手与学生党第一台入门神器。'
    }
  ];

  const handleExtract = async () => {
    setLoading(true);
    setSyncedStatus(null);
    try {
      const data = await extractProductFromUrl(url, rawContent);
      setExtractedData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (item: typeof presetExamples[0]) => {
    setUrl(item.url);
    setRawContent(item.brief);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(JSON.stringify(extractedData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>智能创意解析引擎 (Creative Angle Extractor)</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight sm:text-3xl">
            输入网站或推广资料，秒级提炼爆款推广素材要素
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            自动从独立站、电商落地页或产品详情提炼核心卖点、人群痛点、真实代入场景与权威背书，为后续
            <span className="text-indigo-400 font-semibold">【3卖点 × 3开场 × 3形式】</span>
            变体矩阵与六大资产库提供精准输入。
          </p>
        </div>
      </div>

      {/* Input Section & Preset Chips */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">推广目标解析源 (URL 或 落地页资料)</h3>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 flex-shrink-0">快速填入示范:</span>
            {presetExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => handleApplyPreset(ex)}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition flex-shrink-0"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                目标推广网站 / 落地页 URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/product-landing-page"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                补充详情页描述 / 营销卖点文案 (选填，支持直接粘贴千牛/闲鱼商品描述)
              </label>
              <textarea
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                rows={3}
                placeholder="粘贴商品详情页文案、千牛买家评价摘要或闲鱼转卖描述..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleExtract}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>正在深度解析提炼推广要素...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>一键智能拆解并提取营销要素 (AI Mining)</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Guidance Card */}
          <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                <FileText className="w-4 h-4" />
                <span>广告公司创意拆解标准 (Agency Framework)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>痛点不仅是需求：</strong>深挖“为什么必须现在买、不买有什么日常折磨”。</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>卖点转化为利益：</strong>不讲抽象技术名词，只讲“给特定人群带来什么省心和体面”。</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>证据是成交基石：</strong>提取千牛真实追评、权威质检证书或闲鱼买家验机记录，打消购买疑虑。</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>防限流前置：</strong>提炼出的词汇自动避开抖音/千牛违规极限词，为后续矩阵裂变奠定安全基石。</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>状态: 模型已就绪</span>
              <span className="font-mono text-emerald-400">Gemini 3.8 Flash + 本地规则库</span>
            </div>
          </div>
        </div>
      </div>

      {/* Extracted Product DNA Breakdown */}
      {extractedData && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-white">
                  {extractedData.productName}
                </h3>
                <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-indigo-300 border border-slate-700 font-medium">
                  {extractedData.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                品牌基调: <span className="text-slate-300">{extractedData.brandTone}</span> | 核心主张: <span className="text-indigo-300">{extractedData.summary}</span>
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopySummary}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center space-x-1.5 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? '已复制JSON' : '复制数据'}</span>
              </button>

              <button
                onClick={() => {
                  onSaveToLibraries(extractedData);
                  setSyncedStatus('已沉淀至六大资产库！');
                  setTimeout(() => setSyncedStatus(null), 3000);
                }}
                className="px-3 py-1.5 text-xs bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/60 rounded-lg flex items-center space-x-1.5 transition"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>沉淀至六大资产库</span>
              </button>

              <button
                onClick={() => {
                  onSyncToMatrix(extractedData);
                  setSyncedStatus('已同步至变体矩阵！');
                  setTimeout(() => setSyncedStatus(null), 3000);
                }}
                className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center space-x-1.5 transition shadow-md shadow-indigo-600/30"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>一键同步到变体矩阵 (3×3×3)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {syncedStatus && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-700/50 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{syncedStatus}</span>
            </div>
          )}

          {/* 6 Key Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Target Audience & Pain Points */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
                  <span>🎯 目标受众与痛点</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">3 类画像</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {extractedData.targetAudience.map((aud, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-md bg-rose-950/40 text-rose-300 border border-rose-800/40"
                  >
                    {aud}
                  </span>
                ))}
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-400 font-semibold block">刺痛痛点:</span>
                {extractedData.corePainPoints.map((p, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start space-x-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{p}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* 2. Selling Points */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1">
                  <span>✨ 核心卖点 (利益点明确)</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">3 大卖点</span>
              </div>
              <div className="space-y-2">
                {extractedData.sellingPoints.map((s, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-200"
                  >
                    <span className="font-bold text-indigo-400 mr-1.5">卖点 {i + 1}:</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Recommended Hooks */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                  <span>🎣 推荐开场Hook (止停抓手)</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">3 个句式</span>
              </div>
              <div className="space-y-2">
                {extractedData.recommendedHooks.map((h, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-amber-950/30 border border-amber-900/40 text-xs text-amber-200"
                  >
                    <span className="font-bold text-amber-400 mr-1.5">Hook {i + 1}:</span>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Usage Scenes */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                  <span>🎬 代入使用场景 (画面感强)</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">3 个场景</span>
              </div>
              <div className="space-y-2">
                {extractedData.usageScenes.map((sc, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-xs text-emerald-200"
                  >
                    <span className="font-bold text-emerald-400 mr-1.5">场景 {i + 1}:</span>
                    {sc}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Evidences & Credibility */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
                  <span>🛡️ 证据与实锤背书 (信任基石)</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">3 类背书</span>
              </div>
              <div className="space-y-2">
                {extractedData.evidenceClues.map((e, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-900/40 text-xs text-cyan-200"
                  >
                    <span className="font-bold text-cyan-400 mr-1.5">证据 {i + 1}:</span>
                    {e}
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Quick Strategy Summary */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
                  📊 广告操盘手变体建议
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  当前品类属于高痛点、高信任门槛产品。建议在变体矩阵中将
                  <strong className="text-amber-300">【痛点刺痛型Hook】</strong>
                  与
                  <strong className="text-cyan-300">【千牛真实追评/CNAS报告证据】</strong>
                  结合，重点在抖音千川与闲鱼进行小预算AB测试。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>准备就绪</span>
                <span className="text-indigo-400 font-semibold cursor-pointer" onClick={() => onSyncToMatrix(extractedData)}>
                  立即裂变变体矩阵 →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
