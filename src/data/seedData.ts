import {
  HookAsset,
  SceneAsset,
  SellingPointAsset,
  EvidenceAsset,
  CreatorAsset,
  PerformanceFeedbackAsset,
  MatrixVariant
} from '../types/adMatrix';

export const INITIAL_HOOKS: HookAsset[] = [
  {
    id: 'HOOK-001',
    title: '工位痛点刺痛型',
    hookText: '“如果你的工位旁边有敲青轴机械键盘或者大声打电话的同事，你懂这种崩溃吗？”',
    mechanism: '痛点刺痛',
    avgThreeSecRetention: 46.2,
    avgCtr: 7.4,
    platforms: ['douyin', 'xiaohongshu'],
    testedTimes: 42,
    tags: ['职场痛点', '情绪共鸣', '高停留'],
    exampleUse: '开场特写打工人抓狂表情，分贝仪指针疯狂跳动',
    dateAdded: '2026-09-15'
  },
  {
    id: 'HOOK-002',
    title: '反常识避坑省钱型',
    hookText: '“别急着买上千块的大牌降噪了！今天拿500块的国产代工厂同款去专业消音室硬碰硬……”',
    mechanism: '反常识质疑',
    avgThreeSecRetention: 43.8,
    avgCtr: 8.1,
    platforms: ['douyin', 'xianyu', 'qianniu'],
    testedTimes: 38,
    tags: ['反常识', '性价比', '避坑指南'],
    exampleUse: '直接将两款耳机摆在测试台前，字幕打出“智商税还是真香？”',
    dateAdded: '2026-09-22'
  },
  {
    id: 'HOOK-003',
    title: '闲鱼捡漏/真机验机型',
    hookText: '“闲鱼粉丝问：为什么有人在二手平台全新转卖这款降噪神器？今天直接自费验机！”',
    mechanism: '好奇悬念',
    avgThreeSecRetention: 41.5,
    avgCtr: 6.8,
    platforms: ['xianyu', 'douyin'],
    testedTimes: 27,
    tags: ['闲鱼生态', '真实求证', '打消疑虑'],
    exampleUse: '展示闲鱼聊天记录与未拆封包裹，现场美工刀开箱',
    dateAdded: '2026-10-01'
  },
  {
    id: 'HOOK-004',
    title: '千牛旺旺催单反馈型',
    hookText: '“千牛后台被问爆了：‘真的能隔绝高铁婴儿哭闹声吗？’今天买张高铁二等座亲自去测！”',
    mechanism: '数据实锤',
    avgThreeSecRetention: 45.0,
    avgCtr: 7.9,
    platforms: ['qianniu', 'douyin'],
    testedTimes: 31,
    tags: ['千牛数据', '高可信度', '场景实测'],
    exampleUse: '千牛手机端旺旺消息弹窗滚动特写，主播背上背包准备出发',
    dateAdded: '2026-10-04'
  },
  {
    id: 'HOOK-005',
    title: '极速反差前置型',
    hookText: '“3秒钟，戴上它，听听世界有多安静——（声音瞬间静音处理）”',
    mechanism: '利益前置',
    avgThreeSecRetention: 48.9,
    avgCtr: 8.5,
    platforms: ['douyin', 'xiaohongshu'],
    testedTimes: 56,
    tags: ['听觉冲击', '超高停留', '3秒吸睛'],
    exampleUse: '嘈杂音效在戴上的瞬间骤停，模拟顶级降噪瞬间',
    dateAdded: '2026-09-10'
  }
];

export const INITIAL_SCENES: SceneAsset[] = [
  {
    id: 'SCENE-001',
    title: '开放式工位码字避难所',
    scenarioDescription: '互联网/广告公司开放式大平层，旁边同事在激情开会、机械键盘劈里啪啦、打印机嗡嗡作响。',
    demographic: '一线城市白领 / 大厂程序员 / 广告策划',
    emotionalTrigger: '想专心干活但注意力屡被打断的烦躁感',
    avgCvr: 4.8,
    immersionScore: 94,
    props: ['工位咖啡杯', '显示器键盘', '分贝仪', '疲惫打工人'],
    dateAdded: '2026-09-18'
  },
  {
    id: 'SCENE-002',
    title: '早八早高峰地铁车厢抗噪',
    scenarioDescription: '早高峰挤在地铁车厢，钢轨摩擦尖锐刺耳，车厢广播与人声嘈杂，戴上后听清英语听力/播客。',
    demographic: '年轻通勤族 / 考研考公备考学生',
    emotionalTrigger: '漫长拥挤通勤中的独处治愈感',
    avgCvr: 4.2,
    immersionScore: 91,
    props: ['双肩包', '地铁扶手环', '手机播客界面'],
    dateAdded: '2026-09-25'
  },
  {
    id: 'SCENE-003',
    title: '深夜合租房自习免打扰',
    scenarioDescription: '合租单间内室友在客厅看电视或洗漱，自己在小书桌前挑灯夜战，隔绝门外琐碎声响。',
    demographic: '合租青年 / 自律考证党 / 独居大学生',
    emotionalTrigger: '边界感被侵占的无助与对独立清静空间的渴望',
    avgCvr: 5.1,
    immersionScore: 96,
    props: ['暖光台灯', '笔记教材', '合租门缝微光'],
    dateAdded: '2026-10-02'
  }
];

export const INITIAL_SELLING_POINTS: SellingPointAsset[] = [
  {
    id: 'SELL-001',
    benefitTitle: '48dB自适应双核降噪',
    description: '独立降噪芯片实时检测耳道与外界频段，精准抵消低频与中频噪音，不闷耳压。',
    targetAudience: '对降噪深度与耳压舒适度敏感的数码挑剔人群',
    decisionTrigger: '大牌千元级规格平替，参数实打实有认证报告',
    winRate: 78.5,
    competitorAdvantage: '普通竞品仅35dB且耳压沉重，此款具备通透+深度两档无感切换',
    dateAdded: '2026-09-12'
  },
  {
    id: 'SELL-002',
    benefitTitle: '人体工学0压感佩戴',
    description: '液态记忆海绵耳罩配合轻量化头梁设计，戴眼镜不夹头，连续佩戴6小时无胀痛。',
    targetAudience: '长时间佩戴者（打工人/考研党/近视眼镜人群）',
    decisionTrigger: '解决“降噪虽好但戴半小时耳朵疼死”的长期硬痛点',
    winRate: 83.2,
    competitorAdvantage: '实测克重轻35%，亲肤蛋白皮透气排汗不闷耳',
    dateAdded: '2026-09-20'
  },
  {
    id: 'SELL-003',
    benefitTitle: '工厂直供无品牌溢价',
    description: '去除代言费与线下渠道商层层加价，千牛/闲鱼直营出厂底价，支持7天无理由试戴。',
    targetAudience: '追求极致性价比、厌恶智商税的年轻理性消费者',
    decisionTrigger: '花三分之一预算买到90%以上的大牌体验，附赠运费险试用兜底',
    winRate: 81.0,
    competitorAdvantage: '同芯片同发声单元产品普遍标价699-899元，本店269元到手',
    dateAdded: '2026-10-05'
  }
];

export const INITIAL_EVIDENCES: EvidenceAsset[] = [
  {
    id: 'EVI-001',
    title: '千牛官方店铺万条追评口碑墙',
    type: '千牛高频追评',
    contentSnippet: '“千牛累计销售4.2万单，4.98分高评分。买家晒图：‘戴着在高铁睡得像死猪一样，真后悔没早点买！’多个老客户回购给家人。”',
    credibilityIndex: 95,
    referenceCount: 48,
    sourceNote: '千牛商家后台月度好评率与追评抓取',
    dateAdded: '2026-09-28'
  },
  {
    id: 'EVI-002',
    title: '国家声学检测中心频响曲线与降噪报告',
    type: '第三方实验室测评',
    contentSnippet: '“经国家认可机构CNAS检测：在100Hz-2000Hz频段平均降噪深度达47.8dB，失真率小于0.5%，具备正式检测报告编号CMA-2026。”',
    credibilityIndex: 98,
    referenceCount: 39,
    sourceNote: '国家权威声学报告扫描件与编号水印',
    dateAdded: '2026-09-15'
  },
  {
    id: 'EVI-003',
    title: '闲鱼买家真实使用反馈与转转验机单',
    type: '闲鱼真实买家秀',
    contentSnippet: '“闲鱼优质买家实测：‘用了三个月没任何问题，比我之前买的国际大牌降噪更明显，做工扎实，诚不欺我。’带高清原图实拍。”',
    credibilityIndex: 88,
    referenceCount: 22,
    sourceNote: '闲鱼社区买家真实交流动态与验机评价',
    dateAdded: '2026-10-06'
  }
];

export const INITIAL_CREATORS: CreatorAsset[] = [
  {
    id: 'CRE-001',
    creatorName: '老张硬核开箱拆解',
    style: '硬核评测拆解',
    demographicFit: '25-40岁理性数码男、工程师、极客爱好者',
    historicalRoas: 3.45,
    historicalCtr: 7.2,
    cooperationCostTier: '腰部垂类达人(1000-3000元)',
    cpmAvg: 45,
    keyStrengths: '擅长拿游标卡尺和螺丝刀现场拆解芯片电路板，信任度极高',
    avoidPitfalls: '不能催促念广告词，必须保留客观瑕疵建议才能激发粉丝购买',
    dateAdded: '2026-09-10'
  },
  {
    id: 'CRE-002',
    creatorName: '阿宁的工位逃亡记',
    style: '工位情景短剧',
    demographicFit: '20-30岁初入职场打工人、大学生、文艺青年',
    historicalRoas: 2.85,
    historicalCtr: 8.9,
    cooperationCostTier: '性价比素人(100-500元)',
    cpmAvg: 28,
    keyStrengths: '演技自然，职场神态抓得极准，前3秒留存率常年保持45%以上',
    avoidPitfalls: '后半段转化引导若过于生硬容易引来差评，需用自用体验平滑过渡',
    dateAdded: '2026-09-29'
  },
  {
    id: 'CRE-003',
    creatorName: '闲鱼老哥淘好物',
    style: '反套路避坑指南',
    demographicFit: '闲鱼重度用户、极致性价比党、实用主义买家',
    historicalRoas: 4.12,
    historicalCtr: 9.3,
    cooperationCostTier: '性价比素人(100-500元)',
    cpmAvg: 22,
    keyStrengths: '语言接地气，擅长分析大牌溢价结构，直接引流千牛/闲鱼咨询转化极高',
    avoidPitfalls: '注意规避“保真”、“原单”等闲鱼敏感字眼',
    dateAdded: '2026-10-03'
  }
];

export const INITIAL_FEEDBACKS: PerformanceFeedbackAsset[] = [
  {
    id: 'FDB-001',
    materialName: '工位机械键盘抓狂实测_Hook1×卖点1',
    platform: 'douyin',
    stage: '大促放量期',
    targetCohort: '一线/新一线办公打工人 22-35岁',
    ctr: 7.8,
    cvr: 4.6,
    retention: 47.2,
    roas: 3.82,
    spend: 28500,
    gainsSummary: '超级大爆款！开场3秒分贝仪飙升画面直接拉爆停留率，千牛旺旺询单翻了4倍。',
    dateAdded: '2026-10-02'
  },
  {
    id: 'FDB-002',
    materialName: '闲鱼粉丝拆箱求证_Hook3×卖点3',
    platform: 'xianyu',
    stage: '小预算测试',
    targetCohort: '数码二手淘客/高性价比学生党',
    ctr: 8.4,
    cvr: 5.2,
    retention: 43.0,
    roas: 4.35,
    spend: 3200,
    gainsSummary: '闲鱼咨询率高达14.2%，买家主要关注是否全新正品与运费险。',
    dateAdded: '2026-10-05'
  },
  {
    id: 'FDB-003',
    materialName: '纯口播技术参数介绍_老款变体',
    platform: 'qianniu',
    stage: '冷启动灰度',
    targetCohort: '泛数码人群',
    ctr: 2.1,
    cvr: 1.1,
    retention: 21.5,
    roas: 0.95,
    spend: 1500,
    gainsSummary: '典型反面教材已淘汰。前3秒直接念规格参数导致80%用户划走，果断归档。',
    dateAdded: '2026-09-18'
  }
];

export const PRESET_VARIANTS: MatrixVariant[] = [
  {
    id: 'VAR-01',
    name: '变体01: [工位噪音痛点] × [48dB芯片降噪] × [分贝仪实测]',
    hook: '“如果你的工位旁边有敲青轴机械键盘或者大声打电话的同事，你懂这种崩溃吗？”',
    sellingPoint: '48dB自适应双核降噪，实时消除低频中频干扰，不闷耳压',
    format: '真人出镜实测对比（分贝仪测试）',
    fullScript: '【开场0-3秒】主播抱头抓狂，画面切入旁边同事劈里啪啦的机械键盘，分贝仪直接飙到82dB！“如果你的工位有这种同事，你懂这种崩溃吗？”\n【展开4-12秒】“别急着换工位，试试戴上它——”按下降噪按键，分贝仪瞬间降至36dB，整个世界瞬间开启静音模式！\n【实锤13-20秒】不是普通被动耳罩，而是实打实CNAS认证48dB降噪芯片，千牛官方店万条买家好评，很多程序员和文案直接在评价区说‘这是打工续命神器’。\n【转化21-30秒】今天千牛直营店现货，赠送原装皮质收纳盒与7天无理由试戴运费险，点击左下角体验工位深度宁静！',
    visualStoryboard: [
      '【镜头1：0-3s】特写主播被键盘敲击声逼疯的皱眉面部，分贝仪数字82dB跳红',
      '【镜头2：4-10s】慢动作戴上耳机，背景杂音骤然消散，屏幕波形平缓降至36dB',
      '【镜头3：11-20s】展示检测中心报告复印件与千牛评价真实晒图',
      '【镜头4：21-30s】主播手持产品收纳盒，指向屏幕下方商品卡片'
    ],
    recommendedPlatform: '抖音千川 / 淘宝千牛',
    predicted3sRetention: '46.5%',
    complianceNote: '已通过抖音与千牛广告法预检：无“全国最好/第一”等违禁词，符合规范',
    status: 'TESTING',
    metrics: {
      impressions: 124500,
      clicks: 9580,
      ctr: 7.7,
      threeSecRetention: 46.2,
      completionRate: 24.5,
      inquiries: 740,
      orders: 450,
      cvr: 4.7,
      spend: 4800,
      roas: 3.75
    },
    diagnosis: {
      healthStatus: 'EXCELLENT',
      primaryBottleneck: '无明显瓶颈，已跑通正向投产闭环',
      decisionAction: 'SCALE',
      recommendation: '超级赢家组合！建议立即将预算提升300%，并将此Hook与分贝仪实测形式沉淀至资产库！'
    }
  },
  {
    id: 'VAR-02',
    name: '变体02: [反常识省钱] × [工厂直供底价] × [真假对比拆解]',
    hook: '“别急着买上千块的大牌降噪了！今天拿500块的国产代工厂同款去专业消音室硬碰硬……”',
    sellingPoint: '去除大牌代言与中间溢价，出厂底价高配',
    format: '硬核评测拆解与对比实验',
    fullScript: '【开场0-3秒】桌面左右两边摆放大牌千元款与自研款，“别急着买上千块的大牌了！今天直接拿同门代工厂款做个彻底拆解！”\n【展开4-12秒】拆下耳罩对比发声单元与主控降噪芯片，两者均采用高通方案，声学腔体结构几乎完全一致！\n【实锤13-20秒】闲鱼和千牛不少数码极客专门发帖测试过，降噪深度只差1dB，但价格省下了足足70%！\n【转化21-30秒】官方直营店直接发货，假一赔三带质保卡，点击下方链接领取限时粉丝补贴！',
    visualStoryboard: [
      '【镜头1：0-3s】桌面对比两台机器，标签贴着【1299元】vs【269元】',
      '【镜头2：4-10s】螺丝刀拆解展示内部电路板与降噪微型麦克风阵列',
      '【镜头3：11-20s】展示千牛旺旺用户‘省下千元吃大餐’的晒单反馈截图',
      '【镜头4：21-30s】展示保修卡与官方直发包装盒，引导点击进店'
    ],
    recommendedPlatform: '闲鱼好物 / 抖音数码垂类',
    predicted3sRetention: '42.8%',
    complianceNote: '通过合规筛查：已替换“绝对秒杀”为“性能硬核相当”',
    status: 'TESTING',
    metrics: {
      impressions: 89000,
      clicks: 7200,
      ctr: 8.1,
      threeSecRetention: 42.0,
      completionRate: 21.0,
      inquiries: 580,
      orders: 290,
      cvr: 4.0,
      spend: 3200,
      roas: 3.4
    },
    diagnosis: {
      healthStatus: 'EXCELLENT',
      primaryBottleneck: '完播率稍有下滑，结尾CTA可增加闲鱼/千牛特定礼品促单',
      decisionAction: 'SCALE',
      recommendation: '表现优异！可增加闲鱼端“拍下备注暗号送耳机套”刺激下单。'
    }
  },
  {
    id: 'VAR-03',
    name: '变体03: [闲鱼淘好物求证] × [人体工学0压感] × [沉浸式开箱]',
    hook: '“闲鱼粉丝问：为什么有人在二手平台全新转卖这款降噪神器？今天直接自费验机！”',
    sellingPoint: '液态记忆海绵0压感佩戴，连续戴6小时不夹耳',
    format: '第一人称沉浸式开箱体验',
    fullScript: '【开场0-3秒】“闲鱼粉丝后台私信问我，说看到有人全新转手这款耳机，到底是不是坑？今天自费验机！”\n【展开4-12秒】撕开外封膜，取出耳机，特写蛋白皮耳罩的软糯回弹。“很多人不敢买降噪是因为戴半小时头骨生疼，但这个耳罩像棉花糖一样软。”\n【实锤13-20秒】主播戴上近视眼镜再戴耳机，侧面特写完全没有压痕，慢镜头展示贴合度。\n【转化21-30秒】千牛官方店其实有正规直营补贴，不建议去陌生二手渠道冒险，正品保障还送顺丰包邮！',
    visualStoryboard: [
      '【镜头1：0-3s】手机屏幕展示闲鱼聊天记录截图，美工刀划开密封胶带',
      '【镜头2：4-10s】手指反复慢速揉捏记忆棉耳垫，回弹特写充满治愈感',
      '【镜头3：11-20s】主播戴上近视厚框眼镜，耳机轻松扣上，摇头晃动不脱落',
      '【镜头4：21-30s】屏幕弹出官方店铺正品授权码与正品查询指南'
    ],
    recommendedPlatform: '闲鱼社区 / 淘宝逛逛',
    predicted3sRetention: '39.0%',
    complianceNote: '已通过防限流检测：无引导站外交易违规词，引导官方店铺',
    status: 'TESTING',
    metrics: {
      impressions: 45000,
      clicks: 2250,
      ctr: 5.0,
      threeSecRetention: 38.5,
      completionRate: 18.0,
      inquiries: 90,
      orders: 38,
      cvr: 1.7,
      spend: 1800,
      roas: 1.35
    },
    diagnosis: {
      healthStatus: 'NEEDS_OPTIMIZATION',
      primaryBottleneck: 'CTR正常但CVR偏低（访客进店后犹豫不决）',
      decisionAction: 'ITERATE',
      recommendation: '开箱手感很好但缺乏直接的降噪实锤对比，建议中间加入10秒高铁/工位实测片段补强信任度。'
    }
  }
];
