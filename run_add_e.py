with open("admin-app.js", "r", encoding="utf-8") as f:
    s = f.read()

target_str = """         <div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-size:12px; color:#64748b; margin-bottom:6px;">企业碳盘查提交总数</div>' +
           '<div style="font-size:24px; font-weight:800; color:#026961;">68 <span style="font-size:13px;font-weight:400;color:#64748b;">份</span></div>' +
           '<div style="font-size:12px; color:#94a3b8; margin-top:4px;">企业组 52 份 · 个人组 16 份</div>' +
         '</div>' +
       '</div>' +
     '</div>' +
   '</div>';"""

replacement = """         <div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-size:12px; color:#64748b; margin-bottom:6px;">企业碳盘查提交总数</div>' +
           '<div style="font-size:24px; font-weight:800; color:#026961;">68 <span style="font-size:13px;font-weight:400;color:#64748b;">份</span></div>' +
           '<div style="font-size:12px; color:#94a3b8; margin-top:4px;">企业组 52 份 · 个人组 16 份</div>' +
         '</div>' +
       '</div>' +
     '</div>' +
   '</div>' +
   '<div class="admin-card">' +
     '<div class="admin-card__header">' +
       '<div class="admin-card__title"><span>📱 E 阶段（价值链带动 · 碳账户打卡）指标</span></div>' +
       '<span class="tag tag--info">微信小程序同步 · 满分 20分</span>' +
     '</div>' +
     '<div class="admin-card__body">' +
       '<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:16px;">' +
         '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-size:12px; color:#64748b; margin-bottom:6px;">带动打卡总人数</div>' +
           '<div style="font-size:24px; font-weight:800; color:#026961;">9,420 <span style="font-size:13px;font-weight:400;color:#64748b;">人</span></div>' +
           '<div style="font-size:12px; color:#94a3b8; margin-top:4px;">企业战队带动 8,960 人 · 个人选手带动 460 人</div>' +
         '</div>' +
         '<div style="background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0;">' +
           '<div style="font-size:12px; color:#64748b; margin-bottom:6px;">累计打卡碳积分总数</div>' +
           '<div style="font-size:24px; font-weight:800; color:#026961;">288,700 <span style="font-size:13px;font-weight:400;color:#64748b;">分</span></div>' +
           '<div style="font-size:12px; color:#94a3b8; margin-top:4px;">按人数与积分百分位阶梯自动折算 E 阶段得分</div>' +
         '</div>' +
       '</div>' +
     '</div>' +
   '</div>';"""

assert target_str in s, "target_str not found"
s = s.replace(target_str, replacement)
with open("admin-app.js", "w", encoding="utf-8") as f:
    f.write(s)
print("E stage added successfully!")
