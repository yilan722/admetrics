export type TestVariableType = 'HOOK' | 'SCENE' | 'SELLING_POINT' | 'FORMAT';

export type PlatformType = 'douyin' | 'xianyu' | 'qianniu' | 'xiaohongshu';

export interface ExtractedProductInfo {
  productName: string;
  category: string;
  brandTone: string;
  targetAudience: string[];
  corePainPoints: string[];
  sellingPoints: string[];
  usageScenes: string[];
  evidenceClues: string[];
  recommendedHooks: string[];
  summary: string;
}

export interface MatrixVariant {
  id: string;
  name: string;
  sellingPoint: string;
  hook: string;
  format: string;
  fullScript: string;
  visualStoryboard: string[];
  recommendedPlatform: string;
  predicted3sRetention: string;
  complianceNote: string;
  // Test metrics (if tested in gray stage)
  status?: 'PENDING' | 'TESTING' | 'SCALED' | 'KILLED';
  metrics?: {
    impressions: number;
    clicks: number;
    ctr: number; // percentage
    threeSecRetention: number; // percentage
    completionRate: number; // percentage
    inquiries: number; // 闲鱼咨询 / 千牛旺旺询单
    orders: number;
    cvr: number; // percentage
    spend: number;
    roas: number;
  };
  diagnosis?: {
    healthStatus: 'EXCELLENT' | 'NEEDS_OPTIMIZATION' | 'CRITICAL_BOTTLENECK';
    primaryBottleneck: string;
    decisionAction: 'SCALE' | 'ITERATE' | 'KILL';
    recommendation: string;
  };
}

export interface ComplianceIssue {
  word: string;
  category: '极限词' | '导流违规' | '虚假夸大' | '涉假嫌疑' | '绝对化承诺';
  reason: string;
  suggestion: string;
}

export interface PlatformComplianceResult {
  pass: boolean;
  riskLevel: 'PASS' | 'LOW' | 'MEDIUM' | 'HIGH';
  issues: string[];
}

export interface ComplianceCheckResult {
  riskLevel: 'PASS' | 'LOW' | 'MEDIUM' | 'HIGH';
  overallScore: number;
  platformStatus: Record<PlatformType, PlatformComplianceResult>;
  flaggedWords: ComplianceIssue[];
  safeRewrittenText: string;
  complianceTips: string[];
}

// The 6 Core Asset Libraries
export interface HookAsset {
  id: string;
  title: string;
  hookText: string;
  mechanism: '痛点刺痛' | '反常识质疑' | '好奇悬念' | '利益前置' | '情绪共鸣' | '数据实锤';
  avgThreeSecRetention: number; // e.g. 42.8%
  avgCtr: number; // e.g. 6.2%
  platforms: PlatformType[];
  testedTimes: number;
  tags: string[];
  exampleUse: string;
  dateAdded: string;
}

export interface SceneAsset {
  id: string;
  title: string;
  scenarioDescription: string;
  demographic: string; // e.g. 职场打工人 / 租房独居年轻人
  emotionalTrigger: string;
  avgCvr: number; // e.g. 4.8%
  immersionScore: number; // 0 - 100
  props: string[]; // 道具/场景要素
  dateAdded: string;
}

export interface SellingPointAsset {
  id: string;
  benefitTitle: string;
  description: string;
  targetAudience: string;
  decisionTrigger: string; // 为什么买单
  winRate: number; // percentage
  competitorAdvantage: string;
  dateAdded: string;
}

export interface EvidenceAsset {
  id: string;
  title: string;
  type: '闲鱼真实买家秀' | '千牛高频追评' | '第三方实验室测评' | '真伪对比实测' | '工艺细节实拍';
  contentSnippet: string;
  credibilityIndex: number; // 0 - 100
  referenceCount: number;
  sourceNote: string;
  dateAdded: string;
}

export interface CreatorAsset {
  id: string;
  creatorName: string;
  style: '硬核评测拆解' | '工位情景短剧' | '老板/工厂白牌直发' | '沉浸式白噪音开箱' | '反套路避坑指南';
  demographicFit: string;
  historicalRoas: number;
  historicalCtr: number;
  cooperationCostTier: '性价比素人(100-500元)' | '腰部垂类达人(1000-3000元)' | '头部标杆(5000元+)';
  cpmAvg: number;
  keyStrengths: string;
  avoidPitfalls: string;
  dateAdded: string;
}

export interface PerformanceFeedbackAsset {
  id: string;
  materialName: string;
  platform: PlatformType;
  stage: '冷启动灰度' | '小预算测试' | '大促放量期' | '衰退期优化';
  targetCohort: string;
  ctr: number;
  cvr: number;
  retention: number;
  roas: number;
  spend: number;
  gainsSummary: string;
  dateAdded: string;
}
