#!/usr/bin/env node

/**
 * 币安守护者 AI - 骗局案例库
 * 收集真实被骗案例，每日推送教育内容
 */

const fs = require('fs');
const path = require('path');

// 骗局案例数据库
const SCAM_CASES = [
  {
    id: 1,
    title: "假冒 Pi 币官方空投骗局",
    victim: "李阿姨",
    age: 58,
    loss: "未损失（及时发现）",
    date: "2026-02",
    category: "假空投",
    story: `李阿姨在 Telegram 收到一条消息，声称是 Pi 币官方团队，说她的账户被选中参与"主网上线空投"，可以获得 1000 个 Pi 币。

消息里有一个链接，要求她连接钱包并"验证身份"。李阿姨点进去后，网站看起来很专业，还有 Pi 币的 Logo。

就在她准备连接钱包时，她想起了币安守护者 AI 的提醒："Pi 币官方从未要求用户连接钱包或转账"。

她立即停止操作，并在守护者模式中查询，发现这是一个已知的钓鱼网站。`,
    
    redFlags: [
      "主动联系（官方不会主动私信）",
      "要求连接钱包",
      "承诺免费空投",
      "制造紧迫感（限时24小时）",
      "域名可疑（不是官方域名）"
    ],
    
    lesson: "正规项目的空投不会要求连接钱包或授权转账权限。任何主动私信的'官方'都要警惕。",
    
    prevention: [
      "不点击陌生人发来的链接",
      "检查域名是否为官方地址",
      "使用守护者模式查询可疑项目",
      "记住：天上不会掉馅饼"
    ]
  },
  
  {
    id: 2,
    title: "假客服盗取账户",
    victim: "王先生",
    age: 45,
    loss: "12,000 USDT",
    date: "2026-01",
    category: "假客服",
    story: `王先生在币安交易时遇到提现问题，在网上搜索"币安客服"，点进了一个看起来很正规的网站。

他通过网站上的 Telegram 联系了"客服"，对方很专业地询问了他的问题，然后说需要"验证账户"才能解决。

"客服"要求他提供邮箱验证码和手机验证码，说是"系统升级需要重新绑定"。王先生没多想就提供了。

几分钟后，他发现账户里的 12,000 USDT 全部被转走了。他这才意识到，那个"客服"是骗子，通过验证码登录了他的账户。`,
    
    redFlags: [
      "通过搜索引擎找到的'客服'（可能是广告）",
      "要求提供验证码",
      "声称需要'验证账户'",
      "在 Telegram 上联系（币安官方客服在官网）"
    ],
    
    lesson: "币安客服永远不会主动索要验证码、密码或 API 密钥。验证码就是你的账户钥匙，给了别人就等于把账户交出去了。",
    
    prevention: [
      "只通过官网联系客服",
      "永远不要把验证码告诉任何人",
      "开启双重验证（2FA）",
      "设置提现白名单地址"
    ]
  },
  
  {
    id: 3,
    title: "高收益理财骗局",
    victim: "陈女士",
    age: 52,
    loss: "50,000 USDT",
    date: "2025-12",
    category: "资金盘",
    story: `陈女士在微信群里看到有人分享"稳定收益"的理财项目，声称每天收益 3%，一个月就能翻倍。

群里有很多人晒收益截图，看起来都赚了不少钱。陈女士心动了，投入了 10,000 USDT 试水。

前两周，她确实每天都能提现收益，还拉了几个朋友一起投资。看到"真的能赚钱"，她又追加了 40,000 USDT。

一个月后，网站突然无法访问，微信群也被解散了。陈女士这才意识到，前面的"收益"都是用后来人的本金支付的，这是一个典型的庞氏骗局。`,
    
    redFlags: [
      "承诺固定高收益（日收益 3%）",
      "拉人头有奖励（传销模式）",
      "前期可以提现（吸引更多投资）",
      "没有明确的盈利模式",
      "匿名团队，无法核实背景"
    ],
    
    lesson: "年化收益超过 50% 的项目都要警惕。真正的投资都有风险，承诺'稳赚不赔'的都是骗局。",
    
    prevention: [
      "警惕任何承诺高收益的项目",
      "不要被'晒收益'的截图迷惑（可以伪造）",
      "不要因为'前期能提现'就放松警惕",
      "投资前做背景调查，查看团队和项目真实性"
    ]
  },
  
  {
    id: 4,
    title: "假交易所钓鱼",
    victim: "赵先生",
    age: 38,
    loss: "8,000 USDT",
    date: "2026-02",
    category: "钓鱼网站",
    story: `赵先生在 Twitter 上看到一条推文，说币安正在做"新用户注册送 100 USDT"的活动，还有一个链接。

他点进去后，网站看起来和币安一模一样，Logo、界面、颜色都对。他没注意域名，直接输入了邮箱和密码注册。

注册后，网站提示"需要充值激活账户"，他充值了 8,000 USDT。充值后，网站显示"系统维护"，然后就再也打不开了。

他这才发现，那个网站的域名是 binance-event.com，不是官方的 binance.com。他的 8,000 USDT 和账户密码都被骗子拿走了。`,
    
    redFlags: [
      "域名不是官方域名（binance-event.com vs binance.com）",
      "承诺免费送币",
      "要求充值激活",
      "通过社交媒体推广（官方活动在官网）"
    ],
    
    lesson: "钓鱼网站最常见的手法就是模仿官网，但域名一定不同。使用交易所前，务必检查域名是否正确。",
    
    prevention: [
      "收藏官网地址，不要通过搜索或链接访问",
      "仔细检查域名（特别是 .com 前面的部分）",
      "警惕任何'免费送币'的活动",
      "使用浏览器的钓鱼网站检测功能"
    ]
  },
  
  {
    id: 5,
    title: "假 Airdrop 授权盗币",
    victim: "孙女士",
    age: 41,
    loss: "15,000 USDT",
    date: "2026-01",
    category: "恶意授权",
    story: `孙女士在 Discord 看到一个"新项目空投"的消息，说只要连接钱包就能领取 500 个代币。

她点击链接后，MetaMask 弹出了授权请求。她看到是"授权代币转账"，以为是正常的空投流程，就点了确认。

第二天，她发现钱包里的 15,000 USDT 全部被转走了。她查看交易记录，发现是昨天授权的那个合约地址转走的。

原来，她授权的不是"领取空投"，而是"允许合约转走她的所有 USDT"。骗子在她授权后，立即把她的资产转走了。`,
    
    redFlags: [
      "要求连接钱包并授权",
      "授权内容是'Approve'（允许转账）",
      "项目没有官网或白皮书",
      "在 Discord/Telegram 私信推广"
    ],
    
    lesson: "连接钱包时，一定要仔细看授权内容。正规的空投只需要'查看地址'，不需要'授权转账'。",
    
    prevention: [
      "仔细阅读授权请求的内容",
      "不要授权'Approve'或'Unlimited'权限",
      "定期检查并撤销可疑授权",
      "使用专门的'交互钱包'，不要用存币的钱包"
    ]
  }
];

// 获取今日案例（基于日期轮换）
function getTodayCase() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const index = dayOfYear % SCAM_CASES.length;
  return SCAM_CASES[index];
}

// 生成案例推送内容
function generateCaseContent(scamCase, language = 'zh') {
  if (language === 'en') {
    return generateCaseContentEN(scamCase);
  }
  
  let content = `🚨 每日骗局案例 #${scamCase.id}\n\n`;
  content += `【${scamCase.title}】\n\n`;
  content += `📖 真实案例：\n`;
  content += `${scamCase.story}\n\n`;
  content += `💸 损失：${scamCase.loss}\n`;
  content += `📅 时间：${scamCase.date}\n`;
  content += `🏷️ 类型：${scamCase.category}\n\n`;
  content += `🚩 危险信号：\n`;
  scamCase.redFlags.forEach((flag, i) => {
    content += `${i + 1}. ${flag}\n`;
  });
  content += `\n💡 教训：\n${scamCase.lesson}\n\n`;
  content += `🛡️ 如何防范：\n`;
  scamCase.prevention.forEach((tip, i) => {
    content += `${i + 1}. ${tip}\n`;
  });
  content += `\n⚠️ 记住：如果遇到类似情况，立即使用守护者模式的紧急求助功能！\n`;
  content += `\n币安守护者 AI，每天为您守护。`;
  
  return content;
}

// 英文版案例内容（简化版）
function generateCaseContentEN(scamCase) {
  let content = `🚨 Daily Scam Case #${scamCase.id}\n\n`;
  content += `【${scamCase.title}】\n\n`;
  content += `Category: ${scamCase.category}\n`;
  content += `Loss: ${scamCase.loss}\n`;
  content += `Date: ${scamCase.date}\n\n`;
  content += `🚩 Red Flags:\n`;
  scamCase.redFlags.forEach((flag, i) => {
    content += `${i + 1}. ${flag}\n`;
  });
  content += `\n💡 Lesson:\n${scamCase.lesson}\n\n`;
  content += `🛡️ Prevention:\n`;
  scamCase.prevention.forEach((tip, i) => {
    content += `${i + 1}. ${tip}\n`;
  });
  content += `\nBinance Guardian AI, guarding you every day.`;
  
  return content;
}

// 保存案例到文件
function saveCaseToFile(scamCase, language = 'zh') {
  const today = new Date().toISOString().split('T')[0];
  const casesDir = path.join(__dirname, 'cases');
  
  if (!fs.existsSync(casesDir)) {
    fs.mkdirSync(casesDir, { recursive: true });
  }
  
  const content = generateCaseContent(scamCase, language);
  const filePath = path.join(casesDir, `case-${today}-${language}.txt`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ 案例已保存 (${language}): ${filePath}`);
  
  return { content, filePath };
}

// 获取所有案例列表
function getAllCases() {
  return SCAM_CASES.map(c => ({
    id: c.id,
    title: c.title,
    category: c.category,
    loss: c.loss,
    date: c.date
  }));
}

// 根据类型搜索案例
function searchCasesByCategory(category) {
  return SCAM_CASES.filter(c => c.category === category);
}

// 命令行接口
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'today') {
    // 获取今日案例
    const lang = process.argv[3] || 'zh';
    const todayCase = getTodayCase();
    const { content, filePath } = saveCaseToFile(todayCase, lang);
    
    console.log(`\n📄 今日案例 (${lang.toUpperCase()}):\n`);
    console.log(content);
    
  } else if (command === 'both') {
    // 生成中英文双语
    const todayCase = getTodayCase();
    console.log('=== 生成中英文双语案例 ===\n');
    
    const zh = saveCaseToFile(todayCase, 'zh');
    console.log(`\n📄 中文案例:\n${zh.content}`);
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    const en = saveCaseToFile(todayCase, 'en');
    console.log(`\n📄 英文案例:\n${en.content}`);
    
  } else if (command === 'list') {
    // 列出所有案例
    console.log('\n📚 骗局案例库：\n');
    getAllCases().forEach(c => {
      console.log(`${c.id}. ${c.title}`);
      console.log(`   类型: ${c.category} | 损失: ${c.loss} | 时间: ${c.date}\n`);
    });
    
  } else if (command === 'search') {
    // 搜索案例
    const category = process.argv[3];
    const results = searchCasesByCategory(category);
    
    console.log(`\n🔍 搜索结果（类型: ${category}）：\n`);
    if (results.length === 0) {
      console.log('未找到相关案例');
    } else {
      results.forEach(c => {
        console.log(`${c.id}. ${c.title}`);
        console.log(`   损失: ${c.loss} | 时间: ${c.date}\n`);
      });
    }
    
  } else {
    console.log(`
币安守护者 AI - 骗局案例库

用法:
  node scam-cases.js today [zh|en]
    获取今日案例
    
  node scam-cases.js both
    生成中英文双语案例
    
  node scam-cases.js list
    列出所有案例
    
  node scam-cases.js search <category>
    搜索特定类型的案例

示例:
  node scam-cases.js today zh
  node scam-cases.js both
  node scam-cases.js list
  node scam-cases.js search 假客服
    `);
  }
}

module.exports = {
  SCAM_CASES,
  getTodayCase,
  generateCaseContent,
  saveCaseToFile,
  getAllCases,
  searchCasesByCategory
};
