 window.ADMIN_INITIAL_DATA = {
   // 赛程全局阶段
   currentStage: 'S2_PRELIM_IN_PROGRESS', // S1_REGISTER, S2_PRELIM_IN_PROGRESS, S3_PRELIM_AUDIT, S4_PRELIM_PUBLISHED, S5_FINALS_PREP, S6_GCMC_PUBLISHED
 
   // 核心运营统计指标
   stats: {
     totalEnterprises: 42,
     pendingAuditCount: 3,
     totalPlayers: 218, // 企业组选手 + 个人组选手
     vipOrPointsGranted: 196, // 已发月度VIP/1000积分
     cSubmittedCount: 156, // C阶段已提交模型数
     checkinActiveCount: 8960, // 碳账户打卡带动总人次
   },
 
   // 模块1：企业资质审核列表
   enterprises: [
     {
       id: 'ENT-2026-001',
       name: '安踏体育用品集团有限公司',
       taxNo: '91350500611589742M',
       industry: '鞋服与消费品',
       leaderName: '张远航',
       leaderPhone: '13800138001',
       licenseUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
       logoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80',
       submitTime: '2026-11-18 10:24:15',
       auditStatus: 'APPROVED', // PENDING, APPROVED, REJECTED
       auditTime: '2026-11-18 14:30:00',
       auditor: '系统管理员 (王专员)',
       secretKey: 'CA-KEY-2026-ANTA88',
       rejectReason: '',
       memberCount: 8,
       inviteCount: 3, // 第6-8人 +6% 影响力加成
       bonusPercent: 6,
       trackChoice: 'SELF_OWNED', // SELF_OWNED (自有产品) | ASSIGNED (统一命题)
     },
     {
       id: 'ENT-2026-002',
       name: '小鹏汽车科技（广州）有限公司',
       taxNo: '91440101MA59K0PY7X',
       industry: '新能源汽车与交通',
       leaderName: '何星远',
       leaderPhone: '13922118833',
       licenseUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
       logoUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&auto=format&fit=crop&q=80',
       submitTime: '2026-11-19 09:12:00',
       auditStatus: 'APPROVED',
       auditTime: '2026-11-19 11:20:00',
       auditor: '系统管理员 (李专员)',
       secretKey: 'CA-KEY-2026-XPENG9',
       rejectReason: '',
       memberCount: 10,
       inviteCount: 5, // 第6-10人满额 +10% 影响力加成
       bonusPercent: 10,
       trackChoice: 'ASSIGNED',
     },
     {
       id: 'ENT-2026-003',
       name: '得力集团绿色办公科技有限公司',
       taxNo: '91330226144061439D',
       industry: '轻工制造与文具',
       leaderName: '陈立新',
       leaderPhone: '13758209966',
       licenseUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
       logoUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=200&auto=format&fit=crop&q=80',
       submitTime: '2026-11-20 15:45:22',
       auditStatus: 'APPROVED',
       auditTime: '2026-11-20 17:00:00',
       auditor: '系统管理员 (王专员)',
       secretKey: 'CA-KEY-2026-DELI66',
       rejectReason: '',
       memberCount: 6,
       inviteCount: 1, // 第6人 +2%
       bonusPercent: 2,
       trackChoice: 'ASSIGNED',
     },
     {
       id: 'ENT-2026-004',
       name: '国轩高科动力能源动力电池事业部',
       taxNo: '91340100788574163P',
       industry: '动力电池与储能',
       leaderName: '宋兆峰',
       leaderPhone: '13605517722',
       licenseUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
       logoUrl: '',
       submitTime: '2026-11-21 08:30:10',
       auditStatus: 'PENDING',
       auditTime: '',
       auditor: '',
       secretKey: '',
       rejectReason: '',
       memberCount: 0,
       inviteCount: 0,
       bonusPercent: 0,
       trackChoice: 'SELF_OWNED',
     },
     {
       id: 'ENT-2026-005',
       name: '内蒙古蒙牛乳业（集团）股份有限公司',
       taxNo: '91150100701463121Y',
       industry: '食品与现代农业',
       leaderName: '赵清宇',
       leaderPhone: '13847106655',
       licenseUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
       logoUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=200&auto=format&fit=crop&q=80',
       submitTime: '2026-11-21 11:15:40',
       auditStatus: 'PENDING',
       auditTime: '',
       auditor: '',
       secretKey: '',
       rejectReason: '',
       memberCount: 0,
       inviteCount: 0,
       bonusPercent: 0,
       trackChoice: 'ASSIGNED',
     },
     {
       id: 'ENT-2026-006',
       name: '绿源低碳科技（苏州）有限责任公司',
       taxNo: '91320500MA1W98827L',
       industry: '节能环保与咨询',
       leaderName: '钱晓东',
       leaderPhone: '13913501199',
       licenseUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
       logoUrl: '',
       submitTime: '2026-11-21 14:02:18',
       auditStatus: 'REJECTED',
       auditTime: '2026-11-21 15:10:00',
       auditor: '系统管理员 (李专员)',
       secretKey: '',
       rejectReason: '营业执照复印件未加盖企业公章且照片模糊反光，请拍摄清晰原件重新上传。',
       memberCount: 0,
       inviteCount: 0,
       bonusPercent: 0,
       trackChoice: 'ASSIGNED',
     },
   ],
 
   // 模块2：团队与选手花名册
   teamRoster: [
     {
       teamId: 'ENT-2026-001',
       teamName: '安踏体育 · 零碳跑者战队',
       members: [
         { role: '组长', name: '张远航', phone: '13800138001', inviter: '-', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 38.5, cEntScore: 37.0 },
         { role: '组员', name: '李清源', phone: '13800138002', inviter: '张远航', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 37.0, cEntScore: 36.5 },
         { role: '组员', name: '王零碳', phone: '13800138003', inviter: '张远航', regStatus: '已注册', benefitStatus: '老会员赠1000积分', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 36.0, cEntScore: 35.5 },
         { role: '组员', name: '赵绿创', phone: '13800138004', inviter: '张远航', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 35.5, cEntScore: 34.0 },
         { role: '组员', name: '陈思源', phone: '13800138005', inviter: '张远航', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 39.0, cEntScore: 38.0 },
         { role: '组员', name: '刘宏博', phone: '13800138006', inviter: '李清源', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 37.5, cEntScore: 36.0 },
         { role: '组员', name: '孙敏达', phone: '13800138007', inviter: '张远航', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '待提交', cProdScore: 36.5, cEntScore: 0 },
         { role: '组员', name: '吴天佑', phone: '13800138008', inviter: '王零碳', regStatus: '未注册', benefitStatus: '待注册后触发', cProdStatus: '未提交', cEntStatus: '未提交', cProdScore: 0, cEntScore: 0 },
       ],
     },
     {
       teamId: 'ENT-2026-002',
       teamName: '小鹏科技 · 绿色智行先锋队',
       members: [
         { role: '组长', name: '何星远', phone: '13922118833', inviter: '-', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 39.5, cEntScore: 38.5 },
         { role: '组员', name: '朱鹏飞', phone: '13922118834', inviter: '何星远', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 38.0, cEntScore: 37.5 },
         { role: '组员', name: '胡晓楠', phone: '13922118835', inviter: '何星远', regStatus: '已注册', benefitStatus: '老会员赠1000积分', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 39.0, cEntScore: 38.0 },
         { role: '组员', name: '高晨光', phone: '13922118836', inviter: '何星远', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 37.5, cEntScore: 37.0 },
         { role: '组员', name: '马越峰', phone: '13922118837', inviter: '何星远', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 38.0, cEntScore: 37.5 },
         { role: '组员', name: '白云飞', phone: '13922118838', inviter: '朱鹏飞', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 36.5, cEntScore: 36.0 },
         { role: '组员', name: '田梦琪', phone: '13922118839', inviter: '何星远', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 37.0, cEntScore: 36.5 },
         { role: '组员', name: '郭子仪', phone: '13922118840', inviter: '高晨光', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 38.5, cEntScore: 37.5 },
         { role: '组员', name: '周志鹏', phone: '13922118841', inviter: '何星远', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 37.5, cEntScore: 38.0 },
         { role: '组员', name: '郑宇航', phone: '13922118842', inviter: '何星远', regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdStatus: '已提交', cEntStatus: '已提交', cProdScore: 39.0, cEntScore: 38.5 },
       ],
     },
   ],
 
   // 个人组选手列表
   individualPlayers: [
     { id: 'IND-2026-001', name: '林晓碳', phone: '13910886621', organization: '同济大学环境与低碳学院', inviter: '张远航', inviteSuccessCount: 4, bonusPercent: 8, regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdScore: 38.0, cEntScore: 37.5, checkinPoints: 2450, totalPrelimScore: 92.5 },
     { id: 'IND-2026-002', name: '陆澄宇', phone: '13811223344', organization: '普华永道气候与ESG咨询部', inviter: '-', inviteSuccessCount: 5, bonusPercent: 10, regStatus: '已注册', benefitStatus: '老会员赠1000积分', cProdScore: 39.0, cEntScore: 38.5, checkinPoints: 2680, totalPrelimScore: 96.0 },
     { id: 'IND-2026-003', name: '沈蔚然', phone: '13700998877', organization: '上海环境能源交易所研究中心', inviter: '-', inviteSuccessCount: 2, bonusPercent: 4, regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdScore: 37.5, cEntScore: 36.0, checkinPoints: 1890, totalPrelimScore: 88.0 },
     { id: 'IND-2026-004', name: '韩子谦', phone: '13612345678', organization: '清华大学核研院', inviter: '陆澄宇', inviteSuccessCount: 1, bonusPercent: 2, regStatus: '已注册', benefitStatus: '已开通月度VIP', cProdScore: 36.5, cEntScore: 35.0, checkinPoints: 1520, totalPrelimScore: 84.5 },
   ],
 
   // 模块3：1对1行业配对考题库
   questionPairs: [
     {
       pairCode: '#PAIR-2026-01',
       industry: '鞋服与消费品',
       prodTaskTitle: '标准跑鞋全生命周期碳足迹核算模型 (ISO 14067)',
       prodOpenTime: '2026-11-20 16:00',
       prodPkgFile: '首届碳管理大赛_产品碳考题包_01_运动鞋.zip',
       corpTaskTitle: '大型品牌鞋服集团2025年度企业碳盘查 (ISO 14064-1)',
       corpOpenTime: '2026-11-30 00:00',
       corpPkgFile: '首届碳管理大赛_企业碳考题包_01_鞋服集团.zip',
       assignedTeamsCount: 14,
       downloadCount: 88,
       status: 'RELEASED',
     },
     {
       pairCode: '#PAIR-2026-02',
       industry: '新能源汽车与交通',
       prodTaskTitle: '纯电动中型SUV动力总成与白车身碳足迹核算',
       prodOpenTime: '2026-11-20 16:00',
       prodPkgFile: '首届碳管理大赛_产品碳考题包_02_纯电动乘用车.zip',
       corpTaskTitle: '智能整车制造基地范围一二三温室气体核算与排放源解析',
       corpOpenTime: '2026-11-30 00:00',
       corpPkgFile: '首届碳管理大赛_企业碳考题包_02_整车制造基地.zip',
       assignedTeamsCount: 18,
       downloadCount: 126,
       status: 'RELEASED',
     },
     {
       pairCode: '#PAIR-2026-03',
       industry: '轻工制造与办公文具',
       prodTaskTitle: '全降解环保中性笔与再生纸装订册碳足迹分析',
       prodOpenTime: '2026-11-20 16:00',
       prodPkgFile: '首届碳管理大赛_产品碳考题包_03_文具轻工.zip',
       corpTaskTitle: '多园区文教办公文具制造企业碳盘查及供应链范围三估算',
       corpOpenTime: '2026-11-30 00:00',
       corpPkgFile: '首届碳管理大赛_企业碳考题包_03_轻工文具制造.zip',
       assignedTeamsCount: 6,
       downloadCount: 38,
       status: 'RELEASED',
     },
     {
       pairCode: '#PAIR-2026-04',
       industry: '动力电池与储能',
       prodTaskTitle: '三元锂动力电芯 (100Ah) 全生命周期碳足迹核算 (欧盟电池法案要求)',
       prodOpenTime: '2026-11-20 16:00',
       prodPkgFile: '首届碳管理大赛_产品碳考题包_04_动力电芯.zip',
       corpTaskTitle: '新能源电芯与模组量产基地组织温室气体盘查及绿电抵扣核定',
       corpOpenTime: '2026-11-30 00:00',
       corpPkgFile: '首届碳管理大赛_企业碳考题包_04_电池制造工厂.zip',
       assignedTeamsCount: 8,
       downloadCount: 52,
       status: 'RELEASED',
     },
   ],
 
   // 模块4：CREOS 评分记录
   creosReviews: [
     {
       teamId: 'ENT-2026-001',
       teamName: '安踏体育 · 零碳跑者战队',
       trackChoice: 'SELF_OWNED',
       prodModelUrl: 'https://agent.carbonstop.com/share/pcf-model-2026-anta-shoe-0921',
       corpModelUrl: 'https://agent.carbonstop.com/share/ocf-model-2026-anta-group-1130',
       cProdScore: 37.5,
       cEntScore: 36.2,
       cTeamAvgScore: 73.7, // 37.5 + 36.2 全队算术均分
       eCheckinScore: 18.0, // 打卡得分
       bonusRatio: 0.06, // +6%
       prelimTotalScore: 97.2, // (73.7 + 18.0) * 1.06 = 97.2
       prelimRank: 2,
       rScore: 32.0, // 满分35
       oScore: 18.5, // 满分20
       sScore: 23.0, // 满分25
       defenseScore: 18.5, // 满分20
       finalTotalScore: 92.0, // 决赛单独打分：32 + 18.5 + 23 + 18.5 = 92.0
       finalAward: '金奖 (第一名)',
     },
     {
       teamId: 'ENT-2026-002',
       teamName: '小鹏科技 · 绿色智行先锋队',
       trackChoice: 'ASSIGNED',
       prodModelUrl: 'https://agent.carbonstop.com/share/pcf-xpeng-g6-suv-2026',
       corpModelUrl: 'https://agent.carbonstop.com/share/ocf-xpeng-zhaoqing-base',
       cProdScore: 38.8,
       cEntScore: 38.0,
       cTeamAvgScore: 76.8,
       eCheckinScore: 20.0,
       bonusRatio: 0.10, // 满额 +10%
       prelimTotalScore: 100.0, // 封顶 100
       prelimRank: 1,
       rScore: 33.5,
       oScore: 19.0,
       sScore: 24.0,
       defenseScore: 19.0,
       finalTotalScore: 95.5,
       finalAward: '特等奖 / GCMC年度低碳卓越标杆',
     },
     {
       teamId: 'ENT-2026-003',
       teamName: '得力集团绿色办公科技有限公司',
       trackChoice: 'ASSIGNED',
       prodModelUrl: 'https://agent.carbonstop.com/share/pcf-deli-pen-eco-1122',
       corpModelUrl: 'https://agent.carbonstop.com/share/ocf-deli-ningbo-hq-2026',
       cProdScore: 34.0,
       cEntScore: 33.5,
       cTeamAvgScore: 67.5,
       eCheckinScore: 15.0,
       bonusRatio: 0.02,
       prelimTotalScore: 84.15,
       prelimRank: 3,
       rScore: 29.5,
       oScore: 16.0,
       sScore: 20.5,
       defenseScore: 16.5,
       finalTotalScore: 82.5,
       finalAward: '银奖 (第二名)',
     },
   ],
 
   // 模块5：碳账户小程序打卡榜单 (E阶段数据源)
   checkinRankings: {
     lastSyncTime: '2026-11-21 16:30:00 (自动定时同步)',
     enterpriseList: [
       { rank: 1, enterpriseName: '小鹏汽车科技（广州）有限公司', secretKey: 'CA-KEY-2026-XPENG9', checkinUsersCount: 3250, totalCarbonPoints: 98600, convertedEScore: 20.0 },
       { rank: 2, enterpriseName: '安踏体育用品集团有限公司', secretKey: 'CA-KEY-2026-ANTA88', checkinUsersCount: 2480, totalCarbonPoints: 76200, convertedEScore: 18.0 },
       { rank: 3, enterpriseName: '内蒙古蒙牛乳业（集团）股份有限公司', secretKey: 'CA-KEY-2026-MENGN6', checkinUsersCount: 1680, totalCarbonPoints: 52400, convertedEScore: 16.0 },
       { rank: 4, enterpriseName: '得力集团绿色办公科技有限公司', secretKey: 'CA-KEY-2026-DELI66', checkinUsersCount: 1120, totalCarbonPoints: 34900, convertedEScore: 15.0 },
       { rank: 5, enterpriseName: '国轩高科动力能源动力电池事业部', secretKey: 'CA-KEY-2026-GX7788', checkinUsersCount: 890, totalCarbonPoints: 26800, convertedEScore: 14.0 },
     ],
     individualList: [
       { rank: 1, playerName: '陆澄宇', phone: '13811223344', organization: '普华永道气候与ESG咨询部', inviteUsersCount: 5, totalPoints: 2680, convertedEScore: 20.0 },
       { rank: 2, playerName: '林晓碳', phone: '13910886621', organization: '同济大学环境与低碳学院', inviteUsersCount: 4, totalPoints: 2450, convertedEScore: 19.0 },
       { rank: 3, playerName: '沈蔚然', phone: '13700998877', organization: '上海环境能源交易所研究中心', inviteUsersCount: 2, totalPoints: 1890, convertedEScore: 17.0 },
       { rank: 4, playerName: '韩子谦', phone: '13612345678', organization: '清华大学核研院', inviteUsersCount: 1, totalPoints: 1520, convertedEScore: 15.0 },
     ],
   },
 };
