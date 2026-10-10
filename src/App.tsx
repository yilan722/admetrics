import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FlywheelStepper } from './components/FlywheelStepper';
import { UrlExtractorTab } from './components/tabs/UrlExtractorTab';
import { MatrixBuilderTab } from './components/tabs/MatrixBuilderTab';
import { ComplianceCheckTab } from './components/tabs/ComplianceCheckTab';
import { GrayTestTab } from './components/tabs/GrayTestTab';
import { AssetLibrariesTab } from './components/tabs/AssetLibrariesTab';
import { MicroInnovationTab } from './components/tabs/MicroInnovationTab';

import {
  ExtractedProductInfo,
  MatrixVariant,
  TestVariableType,
  HookAsset,
  SceneAsset,
  SellingPointAsset,
  EvidenceAsset,
  CreatorAsset,
  PerformanceFeedbackAsset
} from './types/adMatrix';

import {
  INITIAL_HOOKS,
  INITIAL_SCENES,
  INITIAL_SELLING_POINTS,
  INITIAL_EVIDENCES,
  INITIAL_CREATORS,
  INITIAL_FEEDBACKS,
  PRESET_VARIANTS
} from './data/seedData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('extractor');
  const [activeTestVariable, setActiveTestVariable] = useState<TestVariableType>('HOOK');

  // Matrix variants
  const [variants, setVariants] = useState<MatrixVariant[]>(PRESET_VARIANTS);
  const [winnerVariant, setWinnerVariant] = useState<MatrixVariant | null>(PRESET_VARIANTS[0]);

  // Six Asset Libraries
  const [hooks, setHooks] = useState<HookAsset[]>(INITIAL_HOOKS);
  const [scenes, setScenes] = useState<SceneAsset[]>(INITIAL_SCENES);
  const [sellingPoints, setSellingPoints] = useState<SellingPointAsset[]>(INITIAL_SELLING_POINTS);
  const [evidences, setEvidences] = useState<EvidenceAsset[]>(INITIAL_EVIDENCES);
  const [creators, setCreators] = useState<CreatorAsset[]>(INITIAL_CREATORS);
  const [feedbacks, setFeedbacks] = useState<PerformanceFeedbackAsset[]>(INITIAL_FEEDBACKS);

  // Script text queued for compliance check
  const [complianceQueueText, setComplianceQueueText] = useState<string>('');

  // Step index calculation for stepper
  const getStepIndex = () => {
    switch (activeTab) {
      case 'extractor':
        return 0;
      case 'matrix':
        return 1;
      case 'compliance':
        return 3;
      case 'graytest':
        return 4;
      case 'assets':
        return 7;
      case 'micro':
        return 7;
      default:
        return 0;
    }
  };

  // Sync extracted product data to matrix
  const handleSyncToMatrix = (data: ExtractedProductInfo) => {
    setActiveTab('matrix');
  };

  // Save extracted data into the 6 asset libraries
  const handleSaveExtractedToLibraries = (data: ExtractedProductInfo) => {
    // Save Hooks
    data.recommendedHooks.forEach((hk, idx) => {
      setHooks(prev => [
        {
          id: `HOOK-NEW-${Date.now()}-${idx}`,
          title: `提炼Hook: ${data.productName.slice(0, 8)}`,
          hookText: hk,
          mechanism: '痛点刺痛',
          avgThreeSecRetention: 43.5,
          avgCtr: 7.2,
          platforms: ['douyin', 'qianniu'],
          testedTimes: 0,
          tags: ['AI提取', data.category],
          exampleUse: `针对${data.targetAudience[0] || '目标人群'}`,
          dateAdded: new Date().toISOString().split('T')[0]
        },
        ...prev
      ]);
    });

    // Save Scenes
    data.usageScenes.forEach((sc, idx) => {
      setScenes(prev => [
        {
          id: `SCENE-NEW-${Date.now()}-${idx}`,
          title: `提炼场景: ${data.productName.slice(0, 8)}`,
          scenarioDescription: sc,
          demographic: data.targetAudience[idx % data.targetAudience.length] || '核心人群',
          emotionalTrigger: '痛点代入与共鸣',
          avgCvr: 4.2,
          immersionScore: 90,
          props: ['工位/生活实景'],
          dateAdded: new Date().toISOString().split('T')[0]
        },
        ...prev
      ]);
    });

    // Save Evidences
    data.evidenceClues.forEach((ev, idx) => {
      setEvidences(prev => [
        {
          id: `EVI-NEW-${Date.now()}-${idx}`,
          title: `提炼背书: ${data.productName.slice(0, 8)}`,
          type: '千牛高频追评',
          contentSnippet: ev,
          credibilityIndex: 92,
          referenceCount: 0,
          sourceNote: '详情页提炼与真实反馈',
          dateAdded: new Date().toISOString().split('T')[0]
        },
        ...prev
      ]);
    });
  };

  // Save winning variant elements into asset libraries
  const handleSaveWinningVariantToLibraries = (variant: MatrixVariant) => {
    setWinnerVariant(variant);

    // Add winning Hook
    const newHook: HookAsset = {
      id: `HOOK-WIN-${Date.now()}`,
      title: `胜出Hook: ${variant.name.slice(0, 12)}`,
      hookText: variant.hook,
      mechanism: '痛点刺痛',
      avgThreeSecRetention: variant.metrics?.threeSecRetention || 46.2,
      avgCtr: variant.metrics?.ctr || 7.7,
      platforms: ['douyin', 'qianniu', 'xianyu'],
      testedTimes: 12,
      tags: ['灰度胜出', '高转化'],
      exampleUse: variant.visualStoryboard[0] || '实测开场',
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setHooks(prev => [newHook, ...prev]);

    // Add feedback performance record
    const newFeedback: PerformanceFeedbackAsset = {
      id: `FDB-${Date.now()}`,
      materialName: variant.name,
      platform: 'qianniu',
      stage: '小预算测试',
      targetCohort: '高意向购买人群',
      ctr: variant.metrics?.ctr || 7.7,
      cvr: variant.metrics?.cvr || 4.7,
      retention: variant.metrics?.threeSecRetention || 46.2,
      roas: variant.metrics?.roas || 3.75,
      spend: variant.metrics?.spend || 3500,
      gainsSummary: `胜出变体！${variant.diagnosis?.recommendation || '已跑通投产闭环'}`,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  // Send script to compliance tab
  const handleSendToCompliance = (scriptText: string) => {
    setComplianceQueueText(scriptText);
    setActiveTab('compliance');
  };

  // Send variant to gray test tab
  const handleSendToGrayTest = (variant: MatrixVariant) => {
    setActiveTab('graytest');
  };

  // Launch next micro-innovation cycle
  const handleLaunchNextCycle = (newSetup: {
    testVariable: TestVariableType;
    sellingPoints: string[];
    hooks: string[];
    formats: string[];
  }) => {
    setActiveTestVariable(newSetup.testVariable);
    setActiveTab('matrix');
  };

  // Apply asset to matrix
  const handleApplyAssetToMatrix = (type: 'HOOK' | 'SCENE' | 'SELLING_POINT', content: string) => {
    setActiveTab('matrix');
  };

  const totalAssetsCount =
    hooks.length + scenes.length + sellingPoints.length + evidences.length + creators.length + feedbacks.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalAssetsCount={totalAssetsCount}
        totalVariantsCount={variants.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Visual Growth Flywheel Stepper */}
        <FlywheelStepper
          currentStepIndex={getStepIndex()}
          onSelectStep={(tabId) => setActiveTab(tabId)}
          activeTestVariable={
            activeTestVariable === 'HOOK'
              ? '开场Hook'
              : activeTestVariable === 'SCENE'
              ? '使用场景'
              : activeTestVariable === 'SELLING_POINT'
              ? '利益卖点'
              : '呈现形式'
          }
        />

        {/* Tab 0: Website Extraction */}
        {activeTab === 'extractor' && (
          <UrlExtractorTab
            onSyncToMatrix={handleSyncToMatrix}
            onSaveToLibraries={handleSaveExtractedToLibraries}
          />
        )}

        {/* Tab 1: Matrix Builder (3x3x3) */}
        {activeTab === 'matrix' && (
          <MatrixBuilderTab
            variants={variants}
            setVariants={setVariants}
            onSendToCompliance={handleSendToCompliance}
            onSendToGrayTest={handleSendToGrayTest}
            activeTestVariable={activeTestVariable}
            setActiveTestVariable={setActiveTestVariable}
          />
        )}

        {/* Tab 2: Compliance & Anti-Shadowban Scanner */}
        {activeTab === 'compliance' && (
          <ComplianceCheckTab
            initialText={complianceQueueText}
            onSendToGrayTest={() => setActiveTab('graytest')}
          />
        )}

        {/* Tab 3: Gray Test & Diagnosis */}
        {activeTab === 'graytest' && (
          <GrayTestTab
            variants={variants}
            onScaleVariant={(v) => handleSaveWinningVariantToLibraries(v)}
            onKillVariant={(id) => {
              setVariants(prev => prev.map(x => x.id === id ? { ...x, status: 'KILLED' } : x));
            }}
            onSaveToLibraries={handleSaveWinningVariantToLibraries}
            onStartMicroInnovation={(v) => {
              setWinnerVariant(v);
              setActiveTab('micro');
            }}
          />
        )}

        {/* Tab 4: Six Asset Libraries */}
        {activeTab === 'assets' && (
          <AssetLibrariesTab
            hooks={hooks}
            setHooks={setHooks}
            scenes={scenes}
            setScenes={setScenes}
            sellingPoints={sellingPoints}
            setSellingPoints={setSellingPoints}
            evidences={evidences}
            setEvidences={setEvidences}
            creators={creators}
            setCreators={setCreators}
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
            onApplyToMatrix={handleApplyAssetToMatrix}
          />
        )}

        {/* Tab 5: Micro-Innovation Engine */}
        {activeTab === 'micro' && (
          <MicroInnovationTab
            winnerVariant={winnerVariant}
            onLaunchNextCycle={handleLaunchNextCycle}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-slate-400">AdMatrix 广告公司敏捷飞轮引擎</span>
            <span>· 六大资产库沉淀模式已激活</span>
          </div>
          <div>
            定义任务 → 3×3×3变体裂变 → 防限流合规 → 千牛/闲鱼灰度 → CTR/CVR诊断 → 淘汰/放大 → 资产沉淀 → 微创新
          </div>
        </div>
      </footer>
    </div>
  );
}
