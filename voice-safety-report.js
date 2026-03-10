#!/usr/bin/env node

/**
 * 币安守护者 AI - 每日语音安全播报
 * 每天早上 8 点播报最新骗局预警和安全提示
 */

const fs = require('fs');
const path = require('path');

// 骗局数据库（后续可以扩展为动态更新）
const scamDatabase = [
  {
    name: "假冒 Pi 币官方",
    risk: "高",
    description: "声称 Pi 币即将上线主网，要求用户提前转账购买",
    warning: "Pi 币官方从未要求用户转账购买"
  },
  {
    name: "虚假空投",
    risk: "高",
    description: "要求用户连接钱包并授权，实际是盗取资产",
    warning: "正规空投不会要求授权转账权限"
  },
  {
    name: "假客服诈骗",
    risk: "极高",
    description: "冒充币安客服，要求提供验证码或密码",
    warning: "币安客服永远不会主动索要密码或验证码"
  },
  {
    name: "高收益理财骗局",
    risk: "高",
    description: "承诺日收益 5-10%，实际是资金盘",
    warning: "年化收益超过 50% 的都要警惕"
  },
  {
    name: "假交易所",
    risk: "极高",
    description: "山寨币安等知名交易所，域名相似",
    warning: "务必检查域名是否为官方地址"
  }
];

// 安全提示库
const safetyTips = [
  "永远不要把助记词告诉任何人，包括客服",
  "开启双重验证（2FA），保护账户安全",
  "不要点击陌生人发来的链接",
  "定期检查授权记录，撤销可疑授权",
  "小额测试转账，确认地址无误再转大额",
  "使用硬件钱包存储大额资产",
  "警惕任何承诺高收益的项目",
  "在官方渠道下载 App，不要用第三方链接"
];

// 英文骗局数据库
const scamDatabaseEN = [
  {
    name: "Fake Pi Coin Official",
    risk: "High",
    description: "Claims Pi coin mainnet launch, requires advance payment",
    warning: "Official Pi coin never requires payment transfers"
  },
  {
    name: "Fake Airdrop",
    risk: "High",
    description: "Requires wallet connection and authorization to steal assets",
    warning: "Legitimate airdrops never require transfer authorization"
  },
  {
    name: "Fake Customer Service",
    risk: "Critical",
    description: "Impersonates Binance support, asks for verification codes or passwords",
    warning: "Binance support never proactively asks for passwords or verification codes"
  },
  {
    name: "High-Yield Investment Scam",
    risk: "High",
    description: "Promises 5-10% daily returns, actually a Ponzi scheme",
    warning: "Be cautious of any APY over 50%"
  },
  {
    name: "Fake Exchange",
    risk: "Critical",
    description: "Clones Binance and other exchanges with similar domains",
    warning: "Always verify the official domain address"
  }
];

// 英文安全提示库
const safetyTipsEN = [
  "Never share your seed phrase with anyone, including support staff",
  "Enable two-factor authentication (2FA) to protect your account",
  "Don't click on links from strangers",
  "Regularly check authorization records and revoke suspicious ones",
  "Test with small amounts before large transfers",
  "Use hardware wallets for large holdings",
  "Be wary of any project promising high returns",
  "Download apps only from official channels, not third-party links"
];

// 生成每日播报内容
function generateDailyReport(language = 'zh') {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  
  // 选择语言数据库
  const scamDB = language === 'en' ? scamDatabaseEN : scamDatabase;
  const tipsDB = language === 'en' ? safetyTipsEN : safetyTips;
  
  // 每天轮换展示不同的骗局
  const scamIndex = dayOfYear % scamDB.length;
  const tipIndex = dayOfYear % tipsDB.length;
  
  const todayScam = scamDB[scamIndex];
  const todayTip = tipsDB[tipIndex];
  
  let report;
  
  if (language === 'en') {
    report = `
Good morning, welcome to Binance Guardian AI Security Briefing.

Today is ${today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.

[Today's Scam Alert]
We detected a common scam: ${todayScam.name}.
Risk Level: ${todayScam.risk}.

Scam Characteristics: ${todayScam.description}.

Remember: ${todayScam.warning}.

[Today's Safety Tip]
${todayTip}

[Guardian Reminder]
If you or your family encounter suspicious situations, please use the Guardian Mode emergency help feature immediately. Our community experts will respond within 5 minutes.

Protect your assets, protect your family. Binance Guardian AI, guarding you every day.
`.trim();
  } else {
    report = `
早安，欢迎来到币安守护者 AI 安全播报。

今天是 ${today.getFullYear()} 年 ${today.getMonth() + 1} 月 ${today.getDate()} 日。

【今日骗局预警】
我们检测到一种常见骗局：${todayScam.name}。
风险等级：${todayScam.risk}。

骗局特征：${todayScam.description}。

请记住：${todayScam.warning}。

【今日安全提示】
${todayTip}

【守护者提醒】
如果您或家人遇到可疑情况，请立即使用守护者模式的紧急求助功能。我们的社区专家会在 5 分钟内回复。

保护好您的资产，就是保护您的家人。币安守护者 AI，每天为您守护。
`.trim();
  }

  return report;
}

// 保存播报内容到文件
function saveDailyReport(language = 'zh') {
  const report = generateDailyReport(language);
  const today = new Date().toISOString().split('T')[0];
  const reportPath = path.join(__dirname, 'reports', `safety-report-${today}-${language}.txt`);
  
  // 确保目录存在
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`✅ 播报内容已保存 (${language}): ${reportPath}`);
  console.log(`\n📄 播报内容 (${language.toUpperCase()}):\n`);
  console.log(report);
  
  return { report, reportPath };
}

// 主函数
if (require.main === module) {
  const lang = process.argv[2] || 'zh';
  
  if (lang === 'both') {
    console.log('=== 生成中英文双语播报 ===\n');
    const zhReport = saveDailyReport('zh');
    console.log('\n' + '='.repeat(60) + '\n');
    const enReport = saveDailyReport('en');
    
    console.log('\n\n🎙️ 下一步：');
    console.log('1. 中文语音：');
    console.log(`   openclaw tts --text "$(cat ${zhReport.reportPath})"`);
    console.log('2. 英文语音：');
    console.log(`   openclaw tts --text "$(cat ${enReport.reportPath})"`);
    console.log('3. 设置 cron 任务每天早上 8 点自动播报');
  } else {
    const { report, reportPath } = saveDailyReport(lang);
    
    console.log('\n\n🎙️ 下一步：');
    console.log('1. 使用 TTS 工具生成语音：');
    console.log(`   openclaw tts --text "$(cat ${reportPath})"`);
    console.log('2. 或者在 OpenClaw 中调用 tts 工具');
    console.log('3. 设置 cron 任务每天早上 8 点自动播报');
    console.log('\n💡 生成双语播报：node voice-safety-report.js both');
  }
}

module.exports = { generateDailyReport, saveDailyReport, scamDatabase, safetyTips, scamDatabaseEN, safetyTipsEN };
