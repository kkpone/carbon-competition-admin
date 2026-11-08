 window.adminState = {
   activeNav: 'overview',
   auditFilter: 'ALL',
   auditSearch: '',
   teamsTab: 'ENTERPRISE',
   teamsSearch: '',
   selectedTeamDetail: null,
   reviewTab: 'PRELIM_C',
   data: JSON.parse(JSON.stringify(ADMIN_INITIAL_DATA)),
 };
 
 function showToast(message, type) {
   const container = document.getElementById('toast-container');
   if (!container) return;
   const el = document.createElement('div');
   el.className = 'toast';
   el.innerHTML = '<span>🔔</span><span>' + message + '</span>';
   container.appendChild(el);
   setTimeout(() => {
     el.style.opacity = '0';
     el.style.transform = 'translateY(-10px)';
     el.style.transition = 'all 0.3s';
     setTimeout(() => el.remove(), 300);
   }, 3000);
 }
 
 function openFrontPortal() {
   window.open('https://kkpone.github.io/carbon-agent/system/carbonAgent?section=competition', '_blank');
 }
 
 function resetDemoData() {
   adminState.data = JSON.parse(JSON.stringify(ADMIN_INITIAL_DATA));
   renderCurrentView();
   updateBadges();
   showToast('仿真业务数据已恢复初始状态');
 }
 
 function handleStageChange(newStage) {
   adminState.data.currentStage = newStage;
   const stageMap = {
     S1_REGISTER: '报名与组队中 (11.16 - 11.27)',
     S2_PRELIM_IN_PROGRESS: '初赛进行中 (11.22 - 12.06 C+E阶段)',
     S3_PRELIM_AUDIT: '初赛评阅与核验 (12.07 - 12.08)',
     S4_PRELIM_PUBLISHED: '初赛入围名单公示 (12.09)',
     S5_FINALS_PREP: '决赛准备与评审答辩 (12.09 - 12.15 R/O/S阶段)',
     S6_GCMC_PUBLISHED: 'GCMC 最终获奖名单发布 (12.18)',
   };
   const textEl = document.getElementById('current-stage-text');
   if (textEl) textEl.textContent = '当前阶段：' + (stageMap[newStage] || newStage);
   showToast('全局赛程阶段已切换为：' + stageMap[newStage]);
   if (adminState.activeNav === 'publish' || adminState.activeNav === 'overview') {
     renderCurrentView();
   }
 }
 
 function switchNav(tabKey) {
   adminState.activeNav = tabKey;
   document.querySelectorAll('.admin-menu-item').forEach(el => {
     el.classList.toggle('active', el.getAttribute('data-tab') === tabKey);
   });
   renderCurrentView();
 }
 
 function updateBadges() {
   const pendingCount = adminState.data.enterprises.filter(e => e.auditStatus === 'PENDING').length;
   const badgeEl = document.getElementById('menu-audit-badge');
   if (badgeEl) {
     badgeEl.textContent = pendingCount;
     badgeEl.style.display = pendingCount > 0 ? 'inline-block' : 'none';
   }
 }
 
 function renderCurrentView() {
   const container = document.getElementById('admin-main-content');
   if (!container) return;
 
   switch (adminState.activeNav) {
     case 'overview':
       container.innerHTML = renderOverviewView();
       break;
     case 'audit':
       container.innerHTML = renderAuditView();
       break;
     case 'teams':
       container.innerHTML = renderTeamsView();
       break;
     case 'questions':
       container.innerHTML = renderQuestionsView();
       break;
     case 'review':
       container.innerHTML = renderReviewView();
       break;
     case 'checkin':
       container.innerHTML = renderCheckinView();
       break;
     case 'publish':
       container.innerHTML = renderPublishView();
       break;
     default:
       container.innerHTML = renderOverviewView();
   }
 }
 
 function renderOverviewView() {
   const stats = adminState.data.stats;
   const pendingList = adminState.data.enterprises.filter(e => e.auditStatus === 'PENDING');
 
   return '<div class="page-header">' +
     '<div class="page-header__left">' +
       '<h2>📊 赛事运行综合控制看板</h2>' +
       '<p>实时监控全国各赛道报名走势、资质审核漏斗、CREOS 模型评阅进度与碳账户打卡活跃度</p>' +
     '</div>' +
     '<div class="page-header__actions">' +
       '<button class="btn btn--secondary" onclick="showToast(\'已导出《首届中国企业碳管理大赛_运营日报.xlsx》\')">📥 导出运营日报</button>' +
       '<button class="btn btn--primary" onclick="switchNav(\'audit\')">⚡ 优先处理资质待审 (' + pendingList.length + ')</button>' +
     '</div>' +
   '</div>' +
   '<div class="stat-grid">' +
     '<div class="stat-card">' +
       '<div class="stat-card__label"><span>参赛企业报名总数</span><span>🏢</span></div>' +
       '<div class="stat-card__val">' + stats.totalEnterprises + ' <span style="font-size:14px;font-weight:400;color:#64748b;">家</span></div>' +
       '<div class="stat-card__hint">涉及制造业、互联网、新能源、快消等各类企业</div>' +
     '</div>' +
     '<div class="stat-card" style="border-left: 4px solid var(--admin-warning);">' +
       '<div class="stat-card__label"><span>待审企业资质申请</span><span>⏳</span></div>' +
       '<div class="stat-card__val" style="color:var(--admin-warning);">' + pendingList.length + ' <span style="font-size:14px;font-weight:400;color:#64748b;">单</span></div>' +
       '<div class="stat-card__hint">48小时服务响应承诺率：98.2%</div>' +
     '</div>' +
     '<div class="stat-card">' +
       '<div class="stat-card__label"><span>参赛选手总规模</span><span>👥</span></div>' +
       '<div class="stat-card__val">' + stats.totalPlayers + ' <span style="font-size:14px;font-weight:400;color:#64748b;">人</span></div>' +
       '<div class="stat-card__hint">企业战队 168 人 · 个人组选手 50 人</div>' +
     '</div>' +
     '<div class="stat-card" style="border-left: 4px solid var(--admin-success);">' +
       '<div class="stat-card__label"><span>权益发放履约率 (月度VIP/1000积分)</span><span>🎁</span></div>' +
       '<div class="stat-card__val" style="color:var(--admin-success);">' + stats.vipOrPointsGranted + ' <span style="font-size:14px;font-weight:400;color:#64748b;">人 (90%)</span></div>' +
       '<div class="stat-card__hint">已全部自动下发短信通知激活</div>' +
     '</div>' +
   '</div>' +
   '<div class="admin-card">' +
     '<div class="admin-card__header">' +
       '<div class="admin-card__title"><span>⚠️ 赛事运营关键节点监控 & 今日待办</span></div>' +
       '<span class="tag tag--info">距离初赛提交截止仅剩 15 天</span>' +
     '</div>' +
     '<div class="admin-card__body">' +
       '<div class="alert-banner alert-banner--warning">' +
         '<span>📌</span>' +
         '<div><strong>初赛关键提醒：</strong> 11月27日 24:00 起前台所有报名入口将自动失效。当前有 <strong>' + pendingList.length + '</strong> 家企业营业执照等待人工核验，请尽快完成审核以释放密钥。</div>' +
       '</div>' +
       '<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-top:16px;">' +
         '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-size:13px; font-weight:700; margin-bottom:8px; color:#04252b;">🏢 企业资质快速核验</div>' +
           '<p style="font-size:12px; color:#64748b; margin-bottom:12px;">国轩高科、蒙牛乳业等企业已上传营业执照，等待专员查验真实性与发密钥。</p>' +
           '<button class="btn btn--sm btn--primary" onclick="switchNav(\'audit\')">立即前往审核</button>' +
         '</div>' +
         '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-size:13px; font-weight:700; margin-bottom:8px; color:#04252b;">✍️ C阶段模型评阅池</div>' +
           '<p style="font-size:12px; color:#64748b; margin-bottom:12px;">已提交 ' + stats.cSubmittedCount + ' 份碳足迹与盘查模型，专家打分系统已开放链接核阅。</p>' +
           '<button class="btn btn--sm btn--secondary" onclick="switchNav(\'review\')">查看评阅台</button>' +
         '</div>' +
         '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-size:13px; font-weight:700; margin-bottom:8px; color:#04252b;">📱 碳账户打卡实时同步</div>' +
           '<p style="font-size:12px; color:#64748b; margin-bottom:12px;">微信小程序累计活跃打卡 8,960 人次，支持随时通过 API 拉取最新企业榜与个人榜。</p>' +
           '<button class="btn btn--sm btn--secondary" onclick="switchNav(\'checkin\')">同步打卡数据</button>' +
         '</div>' +
       '</div>' +
     '</div>' +
   '</div>';
 }
 
 function renderAuditView() {
   let list = adminState.data.enterprises;
   if (adminState.auditFilter !== 'ALL') {
     list = list.filter(e => e.auditStatus === adminState.auditFilter);
   }
   if (adminState.auditSearch.trim()) {
     const q = adminState.auditSearch.trim().toLowerCase();
     list = list.filter(e => e.name.toLowerCase().includes(q) || e.taxNo.toLowerCase().includes(q) || e.leaderPhone.includes(q) || e.leaderName.includes(q));
   }
   const pendingCount = adminState.data.enterprises.filter(e => e.auditStatus === 'PENDING').length;
 
   return '<div class="page-header">' +
     '<div class="page-header__left">' +
       '<h2>🏢 企业参赛资质与营业执照审核</h2>' +
       '<p>人工核验企业名称、统一社会信用代码与营业执照真伪。审核通过将自动生成碳账户密钥、发放组长月度VIP并下发短信通知。</p>' +
     '</div>' +
     '<div class="page-header__actions">' +
       '<button class="btn btn--secondary" onclick="showToast(\'已导出《企业参赛资质审核总台账.xlsx》\')">📥 导出审核台账 (Excel)</button>' +
     '</div>' +
   '</div>' +
   '<div class="filter-bar">' +
     '<div class="filter-bar__left">' +
       '<input type="text" class="search-input" placeholder="搜索企业名称、税号、组长手机..." value="' + adminState.auditSearch + '" oninput="adminState.auditSearch=this.value;renderCurrentView();" />' +
       '<select class="filter-select" onchange="adminState.auditFilter=this.value;renderCurrentView();">' +
         '<option value="ALL" ' + (adminState.auditFilter==='ALL'?'selected':'') + '>全部状态 (' + adminState.data.enterprises.length + ')</option>' +
         '<option value="PENDING" ' + (adminState.auditFilter==='PENDING'?'selected':'') + '>待审核 (' + pendingCount + ')</option>' +
         '<option value="APPROVED" ' + (adminState.auditFilter==='APPROVED'?'selected':'') + '>已通过</option>' +
         '<option value="REJECTED" ' + (adminState.auditFilter==='REJECTED'?'selected':'') + '>已驳回</option>' +
       '</select>' +
     '</div>' +
     '<div><span style="font-size:12.5px;color:#64748b;">共有 <strong>' + list.length + '</strong> 条记录</span></div>' +
   '</div>' +
   '<div class="admin-table-container">' +
     '<table class="admin-table">' +
       '<thead>' +
         '<tr>' +
           '<th>提交时间</th>' +
           '<th>企业名称</th>' +
           '<th>统一社会信用代码</th>' +
           '<th>组长信息</th>' +
           '<th>营业执照 / Logo</th>' +
           '<th>审核状态</th>' +
           '<th>专属碳账户密钥</th>' +
           '<th style="text-align:right;">操作</th>' +
         '</tr>' +
       '</thead>' +
       '<tbody>' +
         list.map(e => (
           '<tr>' +
             '<td style="color:#64748b;font-size:12px;">' + e.submitTime + '</td>' +
             '<td>' +
               '<div style="font-weight:700;color:#04252b;">' + e.name + '</div>' +
               '<div style="font-size:11px;color:#64748b;">编号：' + e.id + '</div>' +
             '</td>' +
             '<td style="font-family:monospace;font-size:12px;">' + e.taxNo + '</td>' +
             '<td>' +
               '<div>' + e.leaderName + '</div>' +
               '<div style="font-size:12px;color:#64748b;font-family:monospace;">' + e.leaderPhone + '</div>' +
             '</td>' +
             '<td>' +
               '<div style="display:flex;gap:6px;align-items:center;">' +
                 '<button class="btn btn--sm btn--secondary" onclick="viewLicenseModal(\'' + e.id + '\')">📄 预览执照</button>' +
                 (e.logoUrl ? '<span title="已上传企业Logo" style="cursor:help;">🖼️</span>' : '<span title="未上传Logo" style="color:#cbd5e1;">-</span>') +
               '</div>' +
             '</td>' +
             '<td>' +
               (e.auditStatus === 'APPROVED' ? '<span class="tag tag--success">✅ 已通过</span>' : '') +
               (e.auditStatus === 'PENDING' ? '<span class="tag tag--warning">⏳ 待审核</span>' : '') +
               (e.auditStatus === 'REJECTED' ? '<span class="tag tag--danger">❌ 已驳回</span>' : '') +
               (e.rejectReason ? '<div style="font-size:11px;color:#ef4444;margin-top:4px;max-width:160px;" title="' + e.rejectReason + '">原因：' + e.rejectReason + '</div>' : '') +
             '</td>' +
             '<td>' +
               (e.secretKey ? '<span style="font-family:monospace;font-weight:700;color:#026961;">' + e.secretKey + '</span>' : '<span style="color:#94a3b8;">审核后生成</span>') +
             '</td>' +
             '<td style="text-align:right;">' +
               (e.auditStatus === 'PENDING' ? (
                 '<div style="display:flex;gap:6px;justify-content:flex-end;">' +
                   '<button class="btn btn--sm btn--primary" onclick="approveAuditModal(\'' + e.id + '\')">通过并下发</button>' +
                   '<button class="btn btn--sm btn--danger" onclick="rejectAuditModal(\'' + e.id + '\')">驳回</button>' +
                 '</div>'
               ) : (
                 '<button class="btn btn--sm btn--secondary" onclick="showToast(\'处理专员：' + (e.auditor || '管理员') + ' · 时间：' + (e.auditTime || '-') + '\')">审核记录</button>'
               )) +
             '</td>' +
           '</tr>'
         )).join('') +
       '</tbody>' +
     '</table>' +
   '</div>';
 }
 
 function viewLicenseModal(entId) {
   const ent = adminState.data.enterprises.find(e => e.id === entId);
   if (!ent) return;
 
   const modalRoot = document.getElementById('modal-root');
   modalRoot.innerHTML = '<div class="modal-overlay" onclick="closeModal()">' +
     '<div class="modal-dialog" onclick="event.stopPropagation()">' +
       '<div class="modal-header">' +
         '<div class="modal-title">📄 营业执照核验预览 · ' + ent.name + '</div>' +
         '<button class="modal-close" onclick="closeModal()">×</button>' +
       '</div>' +
       '<div class="modal-body">' +
         '<div style="margin-bottom:14px; background:#f8fafc; padding:12px; border-radius:8px; font-size:13px; line-height:1.6;">' +
           '<div><strong>统一社会信用代码：</strong>' + ent.taxNo + '</div>' +
           '<div><strong>申报组长：</strong>' + ent.leaderName + ' (' + ent.leaderPhone + ')</div>' +
           '<div><strong>当前状态：</strong>' + ent.auditStatus + '</div>' +
         '</div>' +
         '<div style="text-align:center; background:#04252b; padding:20px; border-radius:10px;">' +
           '<img src="' + ent.licenseUrl + '" style="max-width:100%; max-height:400px; border-radius:6px; box-shadow:0 4px 12px rgba(0,0,0,0.5);" alt="营业执照" />' +
           '<div style="color:#94a3b8; font-size:12px; margin-top:10px;">(系统已调取市场监督管理电子营业执照校验接口，红章真实有效)</div>' +
         '</div>' +
       '</div>' +
       '<div class="modal-footer">' +
         '<button class="btn btn--secondary" onclick="closeModal()">关闭</button>' +
         (ent.auditStatus === 'PENDING' ? (
           '<button class="btn btn--danger" onclick="closeModal();rejectAuditModal(\'' + ent.id + '\')">驳回申请</button>' +
           '<button class="btn btn--primary" onclick="closeModal();approveAuditModal(\'' + ent.id + '\')">审核通过并下发密钥</button>'
         ) : '') +
       '</div>' +
     '</div>' +
   '</div>';
 }
 
 function approveAuditModal(entId) {
   const ent = adminState.data.enterprises.find(e => e.id === entId);
   if (!ent) return;
 
   const newSecretKey = 'CA-KEY-2026-' + ent.name.substring(0, 2) + Math.floor(1000 + Math.random() * 9000);
 
   const modalRoot = document.getElementById('modal-root');
   modalRoot.innerHTML = '<div class="modal-overlay" onclick="closeModal()">' +
     '<div class="modal-dialog" onclick="event.stopPropagation()">' +
       '<div class="modal-header">' +
         '<div class="modal-title">✅ 审核通过确认 · ' + ent.name + '</div>' +
         '<button class="modal-close" onclick="closeModal()">×</button>' +
       '</div>' +
       '<div class="modal-body">' +
         '<div class="alert-banner alert-banner--success">' +
           '<span>💡</span>' +
           '<div>确认通过该企业的参赛资质审核？点击确认后，系统将自动执行以下业务动作：</div>' +
         '</div>' +
         '<ul style="font-size:13.5px; line-height:1.8; color:#334155; padding-left:20px;">' +
           '<li>自动生成该企业专属碳账户密钥：<strong style="color:#026961;">' + newSecretKey + '</strong></li>' +
           '<li>向组长手机号 <strong>' + ent.leaderPhone + '</strong> 发送资质审核通过短信，提醒在 11月27日前完成组员添加</li>' +
           '<li>自动为组长开通 Carbon Agent 月度会员（若原本已是会员，则自动发放 1000 积分）</li>' +
           '<li>前台自动解锁「参赛小组成员管理 (3~10人)」及材料提交页密钥展示</li>' +
         '</ul>' +
       '</div>' +
       '<div class="modal-footer">' +
         '<button class="btn btn--secondary" onclick="closeModal()">取消</button>' +
         '<button class="btn btn--primary" onclick="confirmApprove(\'' + ent.id + '\', \'' + newSecretKey + '\')">确认通过并触发下发</button>' +
       '</div>' +
     '</div>' +
   '</div>';
 }
 
 function confirmApprove(entId, secretKey) {
   const ent = adminState.data.enterprises.find(e => e.id === entId);
   if (ent) {
     ent.auditStatus = 'APPROVED';
     ent.secretKey = secretKey;
     ent.auditTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
     ent.auditor = '系统管理员 (当前专员)';
     ent.rejectReason = '';
     adminState.data.stats.pendingAuditCount = Math.max(0, adminState.data.stats.pendingAuditCount - 1);
     adminState.data.stats.vipOrPointsGranted += 1;
   }
   closeModal();
   renderCurrentView();
   updateBadges();
   showToast('已成功通过【' + ent.name + '】的资质审核！密钥已生成并下发短信');
 }
 
 function rejectAuditModal(entId) {
   const ent = adminState.data.enterprises.find(e => e.id === entId);
   if (!ent) return;
 
   const modalRoot = document.getElementById('modal-root');
   modalRoot.innerHTML = '<div class="modal-overlay" onclick="closeModal()">' +
     '<div class="modal-dialog" onclick="event.stopPropagation()">' +
       '<div class="modal-header">' +
         '<div class="modal-title">❌ 驳回资质申请 · ' + ent.name + '</div>' +
         '<button class="modal-close" onclick="closeModal()">×</button>' +
       '</div>' +
       '<div class="modal-body">' +
         '<div style="font-size:13px; color:#64748b; margin-bottom:12px;">请输入具体的驳回原因，系统将以短信通知申报人（' + ent.leaderPhone + '）进行材料修改：</div>' +
         '<div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px;">' +
           '<button class="btn btn--sm btn--secondary" onclick="setRejectReason(\'营业执照图片模糊反光，关键信息无法辨认，请重新上传清晰扫描件\')">执照模糊</button>' +
           '<button class="btn btn--sm btn--secondary" onclick="setRejectReason(\'统一社会信用代码与营业执照登记信息不一致，请核对后重新填写\')">税号不符</button>' +
           '<button class="btn btn--sm btn--secondary" onclick="setRejectReason(\'营业执照复印件未加盖公章，不符合大赛真实性要求\')">未盖公章</button>' +
           '<button class="btn btn--sm btn--secondary" onclick="setRejectReason(\'该企业已有其他团队申报参赛，每家企业原则上限报1队，请内部协商协调\')">企业重名</button>' +
         '</div>' +
         '<textarea id="reject-reason-input" class="search-input" style="width:100%; height:90px; padding:10px; background-image:none;" placeholder="请输入具体修改要求..."></textarea>' +
       '</div>' +
       '<div class="modal-footer">' +
         '<button class="btn btn--secondary" onclick="closeModal()">取消</button>' +
         '<button class="btn btn--danger" onclick="confirmReject(\'' + ent.id + '\')">确认驳回并发送短信通知</button>' +
       '</div>' +
     '</div>' +
   '</div>';
 }
 
 function setRejectReason(text) {
   const input = document.getElementById('reject-reason-input');
   if (input) input.value = text;
 }
 
 function confirmReject(entId) {
   const input = document.getElementById('reject-reason-input');
   const reason = input ? input.value.trim() : '';
   if (!reason) {
     alert('请输入驳回原因');
     return;
   }
 
   const ent = adminState.data.enterprises.find(e => e.id === entId);
   if (ent) {
     ent.auditStatus = 'REJECTED';
     ent.rejectReason = reason;
     ent.auditTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
     ent.auditor = '系统管理员 (当前专员)';
   }
   closeModal();
   renderCurrentView();
   updateBadges();
   showToast('已驳回【' + ent.name + '】的申请，修改短信已下发');
 }
 
 function closeModal() {
   const modalRoot = document.getElementById('modal-root');
   if (modalRoot) modalRoot.innerHTML = '';
 }
 
 function renderTeamsView() {
   const teams = adminState.data.teamRoster;
   const individuals = adminState.data.individualPlayers;
 
   return '<div class="page-header">' +
     '<div class="page-header__left">' +
       '<h2>👥 参赛队伍花名册、邀请加成与权益发放</h2>' +
       '<p>管理企业组战队成员（3~10人）与个人组选手。监控裂变邀请人数、影响力加成百分比（最高10%）及会员/积分发放状态。</p>' +
     '</div>' +
     '<div class="page-header__actions">' +
       '<button class="btn btn--secondary" onclick="showToast(\'已导出《首届中国企业碳管理大赛_参赛选手总花名册.xlsx》\')">📥 导出参赛花名册 (Excel)</button>' +
       '<button class="btn btn--primary" onclick="showToast(\'已重新校验并批量补发未开通权益，并下发短信通知！\');">⚡ 批量补发未到账权益</button>' +
     '</div>' +
   '</div>' +
   '<div style="display:flex; gap:10px; margin-bottom:16px;">' +
     '<button class="btn ' + (adminState.teamsTab==='ENTERPRISE'?'btn--primary':'btn--secondary') + '" onclick="adminState.teamsTab=\'ENTERPRISE\';renderCurrentView();">🏢 企业组战队列表 (' + teams.length + ')</button>' +
     '<button class="btn ' + (adminState.teamsTab==='INDIVIDUAL'?'btn--primary':'btn--secondary') + '" onclick="adminState.teamsTab=\'INDIVIDUAL\';renderCurrentView();">👤 个人组选手列表 (' + individuals.length + ')</button>' +
   '</div>' +
   (adminState.teamsTab === 'ENTERPRISE' ? renderEnterpriseTeamsList(teams) : renderIndividualPlayersList(individuals));
 }
 
 function renderEnterpriseTeamsList(teams) {
   return '<div class="admin-table-container">' +
     '<table class="admin-table">' +
       '<thead>' +
         '<tr>' +
           '<th>战队企业名称</th>' +
           '<th>组长姓名</th>' +
           '<th>组长手机</th>' +
           '<th>当前组员数</th>' +
           '<th>邀请裂变人数</th>' +
           '<th>影响力加成系数</th>' +
           '<th>C阶段提交进度</th>' +
           '<th style="text-align:right;">操作</th>' +
         '</tr>' +
       '</thead>' +
       '<tbody>' +
         teams.map(t => {
           const ent = adminState.data.enterprises.find(e => e.id === t.teamId) || {};
           const leader = t.members.find(m => m.role === '组长') || {};
           const submittedCount = t.members.filter(m => m.cProdStatus === '已提交' && m.cEntStatus === '已提交').length;
           return '<tr>' +
             '<td>' +
               '<div style="font-weight:700;color:#04252b;">' + t.teamName + '</div>' +
               '<div style="font-size:11px;color:#64748b;">密钥：' + (ent.secretKey || '-') + '</div>' +
             '</td>' +
             '<td>' + (leader.name || '-') + '</td>' +
             '<td style="font-family:monospace;">' + (leader.phone || '-') + '</td>' +
             '<td><span class="tag tag--info">' + t.members.length + ' / 10 人</span></td>' +
             '<td>' + (ent.inviteCount || 0) + ' 人</td>' +
             '<td><span class="tag tag--success">+' + (ent.bonusPercent || 0) + '%</span></td>' +
             '<td><span style="font-size:12px;color:#64748b;">全队 ' + submittedCount + ' / ' + t.members.length + ' 人双项已交</span></td>' +
             '<td style="text-align:right;">' +
               '<button class="btn btn--sm btn--primary" onclick="viewTeamMembersModal(\'' + t.teamId + '\')">查看组员与权益</button>' +
             '</td>' +
           '</tr>';
         }).join('') +
       '</tbody>' +
     '</table>' +
   '</div>';
 }
 
 function renderIndividualPlayersList(individuals) {
   return '<div class="admin-table-container">' +
     '<table class="admin-table">' +
       '<thead>' +
         '<tr>' +
           '<th>选手姓名</th>' +
           '<th>手机号</th>' +
           '<th>成功邀请人数</th>' +
           '<th>影响力加成</th>' +
           '<th>会员 / 积分履约状态</th>' +
           '<th>碳账户打卡积分</th>' +
           '<th style="text-align:right;">操作</th>' +
         '</tr>' +
       '</thead>' +
       '<tbody>' +
         individuals.map(p => (
           '<tr>' +
             '<td style="font-weight:700;color:#04252b;">' + p.name + '</td>' +
             '<td style="font-family:monospace;">' + p.phone + '</td>' +
             '<td>' + p.inviteSuccessCount + ' 人</td>' +
             '<td><span class="tag tag--success">+' + p.bonusPercent + '%</span></td>' +
             '<td><span class="tag tag--success">' + p.benefitStatus + '</span></td>' +
             '<td><strong style="color:#026961;">' + p.checkinPoints + '</strong> 分</td>' +
             '<td style="text-align:right;">' +
               '<button class="btn btn--sm btn--secondary" onclick="showToast(\'已向 ' + p.name + ' 重新补发月度会员并发送短信通知\')">补发权益</button>' +
             '</td>' +
           '</tr>'
         )).join('') +
       '</tbody>' +
     '</table>' +
   '</div>';
 }
 
 function viewTeamMembersModal(teamId) {
   const team = adminState.data.teamRoster.find(t => t.teamId === teamId);
   if (!team) return;
 
   const modalRoot = document.getElementById('modal-root');
   modalRoot.innerHTML = '<div class="modal-overlay" onclick="closeModal()">' +
     '<div class="modal-dialog modal-dialog--lg" onclick="event.stopPropagation()">' +
       '<div class="modal-header">' +
         '<div class="modal-title">👥 战队花名册与组员权益明细 · ' + team.teamName + '</div>' +
         '<button class="modal-close" onclick="closeModal()">×</button>' +
       '</div>' +
       '<div class="modal-body">' +
         '<div class="alert-banner alert-banner--info">' +
           '<span>ℹ️</span>' +
           '<div>当前队伍共 ' + team.members.length + ' 人。根据规则，第 6~10 位组员每添加 1 人，全队初赛总分系数 +2%（当前已享加成：<strong>+' + Math.min(10, Math.max(0, team.members.length - 5) * 2) + '%</strong>）。</div>' +
         '</div>' +
         '<div class="admin-table-container">' +
           '<table class="admin-table">' +
             '<thead>' +
               '<tr>' +
                 '<th>角色</th>' +
                 '<th>姓名</th>' +
                 '<th>手机号</th>' +
                 '<th>邀请人来源</th>' +
                 '<th>注册状态</th>' +
                 '<th>会员权益发放</th>' +
                 '<th>产品碳提交</th>' +
                 '<th>企业碳提交</th>' +
               '</tr>' +
             '</thead>' +
             '<tbody>' +
               team.members.map(m => (
                 '<tr>' +
                   '<td>' + (m.role === '组长' ? '<span class="tag tag--warning">👑 组长</span>' : '<span class="tag tag--neutral">组员</span>') + '</td>' +
                   '<td style="font-weight:600;">' + m.name + '</td>' +
                   '<td style="font-family:monospace;">' + m.phone + '</td>' +
                   '<td>' + (m.inviter === '-' ? '-' : '<span class="tag tag--info">由 ' + m.inviter + ' 邀请</span>') + '</td>' +
                   '<td>' + (m.regStatus === '已注册' ? '<span class="tag tag--success">已注册</span>' : '<span class="tag tag--danger">未注册</span>') + '</td>' +
                   '<td><span class="tag tag--success">' + m.benefitStatus + '</span></td>' +
                   '<td>' + (m.cProdStatus === '已提交' ? '<span class="tag tag--success">已交 (' + m.cProdScore + '分)</span>' : '<span class="tag tag--neutral">' + m.cProdStatus + '</span>') + '</td>' +
                   '<td>' + (m.cEntStatus === '已提交' ? '<span class="tag tag--success">已交 (' + m.cEntScore + '分)</span>' : '<span class="tag tag--neutral">' + m.cEntStatus + '</span>') + '</td>' +
                 '</tr>'
               )).join('') +
             '</tbody>' +
           '</table>' +
         '</div>' +
       '</div>' +
       '<div class="modal-footer">' +
         '<button class="btn btn--secondary" onclick="closeModal()">关闭</button>' +
         '<button class="btn btn--primary" onclick="showToast(\'已向未注册组员发送催注册短信通知\');">📲 一键短信提醒未注册队员</button>' +
       '</div>' +
     '</div>' +
   '</div>';
 }
 
 function renderQuestionsView() {
   const list = adminState.data.questionPairs;
 
   return '<div class="page-header">' +
     '<div class="page-header__left">' +
       '<h2>📚 1对1 配对考题库管理</h2>' +
       '<p>产品碳考题（11.20 16:00 开放下载）与企业碳考题（11.30 00:00 开放下载）严格按题目 1对1 对应，供前台选择主办方产品的选手下载。</p>' +
     '</div>' +
     '<div class="page-header__actions">' +
       '<button class="btn btn--primary" onclick="showToast(\'已打开新增考题包配置窗口\')">➕ 新增 1对1 考题包</button>' +
     '</div>' +
   '</div>' +
   '<div class="alert-banner alert-banner--info">' +
     '<span>📌</span>' +
     '<div><strong>考题配对与分配规则：</strong> 产品碳和企业碳的考题一一对应。选手若选择「主办方产品」，系统匹配对应的考题包进行下载；选手若选择「自有产品」，则使用企业自身真实数据核算。</div>' +
   '</div>' +
   '<div class="admin-table-container">' +
     '<table class="admin-table">' +
       '<thead>' +
         '<tr>' +
           '<th>配对题号</th>' +
           '<th>任务一：产品碳足迹考题 (11.20开放)</th>' +
           '<th>任务二：企业碳盘查考题 (11.30开放)</th>' +
           '<th>已分配队伍</th>' +
           '<th>下载次数</th>' +
           '<th>状态</th>' +
           '<th style="text-align:right;">操作</th>' +
         '</tr>' +
       '</thead>' +
       '<tbody>' +
         list.map(q => (
           '<tr>' +
             '<td style="font-family:monospace;font-weight:700;color:#026961;">' + q.pairCode + '</td>' +
             '<td>' +
               '<div style="font-weight:600;">' + q.prodTaskTitle + '</div>' +
               '<div style="font-size:11px;color:#64748b;">附件：' + q.prodPkgFile + ' · ' + q.prodOpenTime + '</div>' +
             '</td>' +
             '<td>' +
               '<div style="font-weight:600;">' + q.corpTaskTitle + '</div>' +
               '<div style="font-size:11px;color:#64748b;">附件：' + q.corpPkgFile + ' · ' + q.corpOpenTime + '</div>' +
             '</td>' +
             '<td>' + q.assignedTeamsCount + ' 队</td>' +
             '<td>' + q.downloadCount + ' 次</td>' +
             '<td><span class="tag tag--success">已发布</span></td>' +
             '<td style="text-align:right;">' +
               '<button class="btn btn--sm btn--secondary" onclick="showToast(\'正在下载考题包：' + q.pairCode + '\')">下载</button>' +
             '</td>' +
           '</tr>'
         )).join('') +
       '</tbody>' +
     '</table>' +
   '</div>';
 }
 
 function renderReviewView() {
   const list = adminState.data.creosReviews;
 
   return '<div class="page-header">' +
     '<div class="page-header__left">' +
       '<h2>✍️ CREOS 专家评审与在线打分系统</h2>' +
       '<p>支持在线调阅 Carbon Agent 建模链接，产品碳 (40分) + 企业碳 (40分)，企业组支持全员提交系统自动计算全队算术均分。</p>' +
     '</div>' +
     '<div class="page-header__actions">' +
       '<button class="btn btn--secondary" onclick="showToast(\'正在导出专家评审汇总打分表 (Excel)...\')">📥 导出评审打分表</button>' +
     '</div>' +
   '</div>' +
   '<div style="display:flex; gap:10px; margin-bottom:16px;">' +
     '<button class="btn ' + (adminState.reviewTab==='PRELIM_C'?'btn--primary':'btn--secondary') + '" onclick="adminState.reviewTab=\'PRELIM_C\';renderCurrentView();">初赛 C 阶段评审 (产品碳 40 + 企业碳 40)</button>' +
     '<button class="btn ' + (adminState.reviewTab==='FINAL_ROS'?'btn--primary':'btn--secondary') + '" onclick="adminState.reviewTab=\'FINAL_ROS\';renderCurrentView();">决赛 R / O / S 方案与现场答辩评审 (100分)</button>' +
   '</div>' +
   (adminState.reviewTab === 'PRELIM_C' ? renderPrelimCReviewTable(list) : renderFinalRosReviewTable(list));
 }
 
 function renderPrelimCReviewTable(list) {
   return '<div class="admin-table-container">' +
     '<table class="admin-table">' +
       '<thead>' +
         '<tr>' +
           '<th>战队 / 企业名称</th>' +
           '<th>核算对象来源</th>' +
           '<th>产品碳模型链接</th>' +
           '<th>企业碳模型链接</th>' +
           '<th>产品碳打分 (40分)</th>' +
           '<th>企业碳打分 (40分)</th>' +
           '<th>C阶段全队均分 (80分)</th>' +
           '<th>打卡分 (20分)</th>' +
           '<th>加成系数</th>' +
           '<th>初赛总分</th>' +
           '<th style="text-align:right;">操作</th>' +
         '</tr>' +
       '</thead>' +
       '<tbody>' +
         list.map(r => (
           '<tr>' +
             '<td style="font-weight:700;color:#04252b;">' + r.teamName + '</td>' +
             '<td>' + (r.trackChoice === 'SELF_OWNED' ? '<span class="tag tag--info">自有产品</span>' : '<span class="tag tag--neutral">主办方产品</span>') + '</td>' +
             '<td><a href="' + r.prodModelUrl + '" target="_blank" style="color:#026961;text-decoration:none;font-size:12px;">🔗 查看产品碳模型</a></td>' +
             '<td><a href="' + r.corpModelUrl + '" target="_blank" style="color:#026961;text-decoration:none;font-size:12px;">🔗 查看企业碳模型</a></td>' +
             '<td><strong style="color:#026961;">' + r.cProdScore + '</strong> / 40</td>' +
             '<td><strong style="color:#026961;">' + r.cEntScore + '</strong> / 40</td>' +
             '<td><span class="tag tag--info">' + r.cTeamAvgScore + ' 分</span></td>' +
             '<td>' + r.eCheckinScore + ' 分</td>' +
             '<td><span class="tag tag--success">+' + Math.round(r.bonusRatio*100) + '%</span></td>' +
             '<td><strong style="color:#e11d48;font-size:15px;">' + r.prelimTotalScore + '</strong></td>' +
             '<td style="text-align:right;">' +
               '<button class="btn btn--sm btn--primary" onclick="openScoringModal(\'' + r.teamId + '\')">评阅打分</button>' +
             '</td>' +
           '</tr>'
         )).join('') +
       '</tbody>' +
     '</table>' +
   '</div>';
 }
 
 function renderFinalRosReviewTable(list) {
   return '<div class="admin-table-container">' +
     '<table class="admin-table">' +
       '<thead>' +
         '<tr>' +
           '<th>入围战队</th>' +
           '<th>R 减排方案 (35分)</th>' +
           '<th>O 抵消方案 (20分)</th>' +
           '<th>S 传播与案例 (25分)</th>' +
           '<th>现场答辩质询 (20分)</th>' +
           '<th>决赛独立总分 (100分)</th>' +
           '<th>拟授奖项</th>' +
           '<th style="text-align:right;">操作</th>' +
         '</tr>' +
       '</thead>' +
       '<tbody>' +
         list.map(r => (
           '<tr>' +
             '<td style="font-weight:700;color:#04252b;">' + r.teamName + '</td>' +
             '<td>' + r.rScore + ' 分</td>' +
             '<td>' + r.oScore + ' 分</td>' +
             '<td>' + r.sScore + ' 分</td>' +
             '<td>' + r.defenseScore + ' 分</td>' +
             '<td><strong style="color:#e11d48;font-size:16px;">' + r.finalTotalScore + '</strong></td>' +
             '<td><span class="tag tag--warning">' + r.finalAward + '</span></td>' +
             '<td style="text-align:right;">' +
               '<button class="btn btn--sm btn--primary" onclick="showToast(\'已进入【' + r.teamName + '】的决赛打分表\')">录入答辩分</button>' +
             '</td>' +
           '</tr>'
         )).join('') +
       '</tbody>' +
     '</table>' +
   '</div>';
 }
 
 function openScoringModal(teamId) {
   const record = adminState.data.creosReviews.find(r => r.teamId === teamId);
   if (!record) return;
 
   const modalRoot = document.getElementById('modal-root');
   modalRoot.innerHTML = '<div class="modal-overlay" onclick="closeModal()">' +
     '<div class="modal-dialog modal-dialog--lg" onclick="event.stopPropagation()">' +
       '<div class="modal-header">' +
         '<div class="modal-title">✍️ C 阶段量化碳排放评审打分 · ' + record.teamName + '</div>' +
         '<button class="modal-close" onclick="closeModal()">×</button>' +
       '</div>' +
       '<div class="modal-body">' +
         '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">' +
           '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
             '<h4 style="color:#026961; margin-bottom:12px;">任务一：产品碳足迹核算模型 (满分40分)</h4>' +
             '<div style="font-size:12px; margin-bottom:10px;"><a href="' + record.prodModelUrl + '" target="_blank" style="color:#026961; text-decoration:none;">🔗 点击调阅 Carbon Agent 产品碳模型详情</a></div>' +
             '<div style="display:flex; flex-direction:column; gap:8px; font-size:13px;">' +
               '<label>1. 系统边界与生命周期功能单位 (8分)：</label><input type="number" max="8" min="0" value="7.5" class="search-input" style="width:100%;" />' +
               '<label>2. BOM物料清单与活动数据质量 (10分)：</label><input type="number" max="10" min="0" value="9.5" class="search-input" style="width:100%;" />' +
               '<label>3. 因子库选取与分配逻辑 (10分)：</label><input type="number" max="10" min="0" value="9.5" class="search-input" style="width:100%;" />' +
               '<label>4. 建模严密性与热点敏感度分析 (12分)：</label><input type="number" max="12" min="0" value="11.0" class="search-input" style="width:100%;" />' +
             '</div>' +
           '</div>' +
           '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
             '<h4 style="color:#026961; margin-bottom:12px;">任务二：企业组织碳盘查模型 (满分40分)</h4>' +
             '<div style="font-size:12px; margin-bottom:10px;"><a href="' + record.corpModelUrl + '" target="_blank" style="color:#026961; text-decoration:none;">🔗 点击调阅 Carbon Agent 企业碳模型详情</a></div>' +
             '<div style="display:flex; flex-direction:column; gap:8px; font-size:13px;">' +
               '<label>1. 组织边界与运营控制权清晰度 (6分)：</label><input type="number" max="6" min="0" value="5.8" class="search-input" style="width:100%;" />' +
               '<label>2. 范围一直接温室气体排放核算 (10分)：</label><input type="number" max="10" min="0" value="9.5" class="search-input" style="width:100%;" />' +
               '<label>3. 范围二电力与热力双轨报告 (10分)：</label><input type="number" max="10" min="0" value="9.0" class="search-input" style="width:100%;" />' +
               '<label>4. 范围三价值链排查与底稿证据链 (14分)：</label><input type="number" max="14" min="0" value="12.5" class="search-input" style="width:100%;" />' +
             '</div>' +
           '</div>' +
         '</div>' +
       '</div>' +
       '<div class="modal-footer">' +
         '<button class="btn btn--secondary" onclick="closeModal()">取消</button>' +
         '<button class="btn btn--primary" onclick="closeModal();showToast(\'已保存评阅成绩，系统已自动重新加权计算全队算术均分！\');">保存评分并更新均分</button>' +
       '</div>' +
     '</div>' +
   '</div>';
 }
 
 function renderCheckinView() {
   const checkinData = adminState.data.checkinRankings;
 
   return '<div class="page-header">' +
     '<div class="page-header__left">' +
       '<h2>📱 碳账户微信小程序打卡积分同步中枢</h2>' +
       '<p>打通微信小程序独立碳账户。支持 API 实时拉取企业打卡榜与个人打卡榜，并自动按百分位阶梯折算 E 阶段得分（满分20分）。</p>' +
     '</div>' +
     '<div class="page-header__actions">' +
       '<button class="btn btn--secondary" onclick="showToast(\'已打开线下核验积分表导入窗口\')">📥 导入线下核验积分表 (Excel)</button>' +
       '<button class="btn btn--primary" onclick="syncMiniProgramApi()">⚡ 立即从小程序同步最新打卡数据</button>' +
     '</div>' +
   '</div>' +
   '<div class="alert-banner alert-banner--success">' +
     '<span>🔄</span>' +
     '<div>上次同步时间：<strong>' + checkinData.lastSyncTime + '</strong> · 小程序连接正常 · E阶段得分折算规则：人数规模满分10分 + 企业总积分百分位排名满分10分</div>' +
   '</div>' +
   '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">' +
     '<div class="admin-card">' +
       '<div class="admin-card__header">' +
         '<div class="admin-card__title">🏢 企业带动打卡积分榜</div>' +
         '<span class="tag tag--info">按企业密钥汇总</span>' +
       '</div>' +
       '<div class="admin-table-container">' +
         '<table class="admin-table">' +
           '<thead>' +
             '<tr>' +
               '<th>排名</th>' +
               '<th>企业名称</th>' +
               '<th>打卡人数</th>' +
               '<th>累计打卡积分</th>' +
               '<th>E阶段折算分</th>' +
             '</tr>' +
           '</thead>' +
           '<tbody>' +
             checkinData.enterpriseList.map(e => (
               '<tr>' +
                 '<td><strong>#' + e.rank + '</strong></td>' +
                 '<td>' + e.enterpriseName + '</td>' +
                 '<td>' + e.checkinUsersCount + ' 人</td>' +
                 '<td><strong style="color:#026961;">' + e.totalCarbonPoints + '</strong></td>' +
                 '<td><span class="tag tag--success">' + e.convertedEScore + ' / 20</span></td>' +
               '</tr>'
             )).join('') +
           '</tbody>' +
         '</table>' +
       '</div>' +
     '</div>' +
     '<div class="admin-card">' +
       '<div class="admin-card__header">' +
         '<div class="admin-card__title">👤 个人选手打卡积分榜</div>' +
         '<span class="tag tag--info">按选手手机号汇总</span>' +
       '</div>' +
       '<div class="admin-table-container">' +
         '<table class="admin-table">' +
           '<thead>' +
             '<tr>' +
           '<th>排名</th>' +
           '<th>选手姓名</th>' +
           '<th>累计打卡积分</th>' +
           '<th>E阶段折算分</th>' +
             '</tr>' +
           '</thead>' +
           '<tbody>' +
             checkinData.individualList.map(i => (
               '<tr>' +
                 '<td><strong>#' + i.rank + '</strong></td>' +
                 '<td>' + i.playerName + '</td>' +
                 '<td><strong style="color:#026961;">' + i.totalPoints + '</strong></td>' +
                 '<td><span class="tag tag--success">' + i.convertedEScore + ' / 20</span></td>' +
               '</tr>'
             )).join('') +
           '</tbody>' +
         '</table>' +
       '</div>' +
     '</div>' +
   '</div>';
 }
 
 function syncMiniProgramApi() {
   showToast('正在请求微信小程序开放接口同步最新打卡流水...');
   setTimeout(() => {
     adminState.data.checkinRankings.lastSyncTime = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' (手动触发更新)';
     renderCurrentView();
     showToast('✅ 碳账户小程序打卡积分已同步完成，全员 E 阶段得分已重新加权！');
   }, 800);
 }
 
 function renderPublishView() {
   const currentStage = adminState.data.currentStage;
 
   return '<div class="page-header">' +
     '<div class="page-header__left">' +
       '<h2>🏆 赛果控制台与前台奖项公开发布</h2>' +
       '<p>一键控制前台大赛页（初赛入围名单、GCMC 最终获奖名单）的公开发布状态与证书防伪编号生成。</p>' +
     '</div>' +
   '</div>' +
   '<div class="admin-card">' +
     '<div class="admin-card__header">' +
       '<div class="admin-card__title">🎛️ 赛事生命周期与前台结果展示开关</div>' +
     '</div>' +
     '<div class="admin-card__body">' +
       '<div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px;">' +
         '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-weight:700; margin-bottom:6px;">阶段一：初赛进行中</div>' +
           '<p style="font-size:12px; color:#64748b; margin-bottom:12px;">前台结果页提示“比赛正在火热进行中”，不透出入围榜单。</p>' +
           '<button class="btn btn--sm ' + (currentStage==='S2_PRELIM_IN_PROGRESS'?'btn--primary':'btn--secondary') + '" onclick="handleStageChange(\'S2_PRELIM_IN_PROGRESS\')">' +
             (currentStage==='S2_PRELIM_IN_PROGRESS'?'✅ 当前处于此阶段':'设为初赛中') +
           '</button>' +
         '</div>' +
         '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-weight:700; margin-bottom:6px;">阶段二：发布初赛入围名单</div>' +
           '<p style="font-size:12px; color:#64748b; margin-bottom:12px;">12月09日公示：前台正式展示初赛入围榜（排名 1, 2, 3...）并解锁入围战队决赛R/O/S提交。</p>' +
           '<button class="btn btn--sm ' + (currentStage==='S4_PRELIM_PUBLISHED'?'btn--primary':'btn--secondary') + '" onclick="handleStageChange(\'S4_PRELIM_PUBLISHED\')">' +
             (currentStage==='S4_PRELIM_PUBLISHED'?'✅ 正在公示入围榜':'一键发布初赛入围名单') +
           '</button>' +
         '</div>' +
         '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-weight:700; margin-bottom:6px;">阶段三：发布 GCMC 最终获奖名单</div>' +
           '<p style="font-size:12px; color:#64748b; margin-bottom:12px;">12月18日发布：公开金奖、银奖、铜奖及单项奖，前台提供获奖证书下载。</p>' +
           '<button class="btn btn--sm ' + (currentStage==='S6_GCMC_PUBLISHED'?'btn--primary':'btn--secondary') + '" onclick="handleStageChange(\'S6_GCMC_PUBLISHED\')">' +
             (currentStage==='S6_GCMC_PUBLISHED'?'✅ 正在公示最终获奖':'一键发布最终获奖名单') +
           '</button>' +
         '</div>' +
       '</div>' +
     '</div>' +
   '</div>' +
   '<div class="admin-card">' +
     '<div class="admin-card__header">' +
       '<div class="admin-card__title">🏅 最终奖项发布清单预览 (GCMC 2026)</div>' +
       '<button class="btn btn--sm btn--primary" onclick="showToast(\'已向所有获奖队伍发送官方贺信与颁奖盛典邀请函！\')">📢 向获奖战队发送颁奖典礼邀请函</button>' +
     '</div>' +
     '<div class="admin-table-container">' +
       '<table class="admin-table">' +
         '<thead>' +
           '<tr>' +
             '<th>奖项级别</th>' +
             '<th>获奖战队 / 企业</th>' +
             '<th>决赛总分</th>' +
             '<th>入围奖项名称</th>' +
             '<th>证书防伪编号</th>' +
             '<th>前台公示状态</th>' +
           '</tr>' +
         '</thead>' +
         '<tbody>' +
           '<tr>' +
             '<td><span class="tag tag--warning">🥇 金奖 (1名)</span></td>' +
             '<td style="font-weight:700;">小鹏科技 · 绿色智行先锋队</td>' +
             '<td><strong style="color:#e11d48;">95.5</strong></td>' +
             '<td>首届中国企业碳管理大赛金奖</td>' +
             '<td style="font-family:monospace;">GCMC-2026-CERT-0001</td>' +
             '<td><span class="tag tag--success">已同步前台</span></td>' +
           '</tr>' +
           '<tr>' +
             '<td><span class="tag tag--info">🥈 银奖 (2名)</span></td>' +
             '<td style="font-weight:700;">安踏体育 · 零碳跑者战队</td>' +
             '<td><strong style="color:#e11d48;">92.0</strong></td>' +
             '<td>首届中国企业碳管理大赛银奖</td>' +
             '<td style="font-family:monospace;">GCMC-2026-CERT-0002</td>' +
             '<td><span class="tag tag--success">已同步前台</span></td>' +
           '</tr>' +
           '<tr>' +
             '<td><span class="tag tag--neutral" style="color:#b45309;background:#fef3c7;">🥉 铜奖 (3名)</span></td>' +
             '<td style="font-weight:700;">得力集团绿色办公科技有限公司</td>' +
             '<td><strong style="color:#e11d48;">82.5</strong></td>' +
             '<td>首届中国企业碳管理大赛铜奖</td>' +
             '<td style="font-family:monospace;">GCMC-2026-CERT-0003</td>' +
             '<td><span class="tag tag--success">已同步前台</span></td>' +
           '</tr>' +
         '</tbody>' +
       '</table>' +
     '</div>' +
   '</div>';
 }
 
 document.addEventListener('DOMContentLoaded', () => {
   renderCurrentView();
   updateBadges();
 });
