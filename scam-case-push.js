#!/usr/bin/env node
/**
 * 骗局案例每日推送（AI生成版）
 * 每天生成全新案例 + 直接发送到 Telegram
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// 从 config.json 读取 Bot 配置
const config = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'crypto-trading-scout/config.json'), 'utf8'
));
const BOT_TOKEN = config.telegram.botToken;
const CHAT_ID = config.telegram.chatId;

// AI 配置（从环境变量或 .env 读取）
function getApiKey() {
  if (process.env.AI_API_KEY) return process.env.AI_API_KEY;
  try {
    const env = fs.readFileSync('/root/anluyy-bot/.env', 'utf8');
    const match = env.match(/^AI_API_KEY=(.+)$/m);
    return match ? match[1].trim() : '';
  } catch(e) { return ''; }
}

const AI_CONFIG = {
  hostname: 'api.ikuncode.cc',
  apiKey: getApiKey(),
  model: 'claude-sonnet-4-6'
};

const CASE_TYPES_ZH = [
  '假冒官方客服骗局', '虚假空投授权盗币', '高收益理财骗局',
  '假冒交易所钓鱼网站', '浪漫杀猪盘', '假冒项目方私信',
  '虚假套利机器人', '假冒名人推荐', '钱包助记词钓鱼',
  '假冒技术支持远程控制'
];

const CASE_TYPES_EN = [
  'Fake Official Support Scam', 'Fake Airdrop Authorization Theft', 'High-Yield Investment Fraud',
  'Fake Exchange Phishing Site', 'Romance Pig-Butchering Scam', 'Fake Project Team DM',
  'Fake Arbitrage Bot', 'Fake Celebrity Endorsement', 'Wallet Seed Phrase Phishing',
  'Fake Tech Support Remote Control'
];

// 语言检测：从 config.json 读取，默认中文
const lang = config.language || config.lang || 'zh';
const isZh = lang === 'zh' || lang === 'zh-CN';
const CASE_TYPES = isZh ? CASE_TYPES_ZH : CASE_TYPES_EN;

function callAI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: AI_CONFIG.model,
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }]
    });
    const req = https.request({
      hostname: AI_CONFIG.hostname,
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      },
      rejectUnauthorized: false
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.choices?.[0]?.message?.content || '');
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function sendTelegram(text) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += 4000) chunks.push(text.slice(i, i + 4000));
    const sendChunk = (idx) => {
      if (idx >= chunks.length) return resolve();
      const body = JSON.stringify({ chat_id: CHAT_ID, text: chunks[idx] });
      const req = https.request({
        hostname: 'api.telegram.org',
        path: `/bot${BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
      }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          const json = JSON.parse(data);
          if (!json.ok) return reject(new Error(json.description));
          setTimeout(() => sendChunk(idx + 1), 500);
        });
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    };
    sendChunk(0);
  });
}

async function generateCase(type) {
  const today = new Date().toLocaleDateString(isZh ? 'zh-CN' : 'en-US');
  const prompt = isZh ? `你是一个加密货币安全专家，每天分享真实骗局案例教育用户。

今日案例类型：${type}

请生成一个真实感强的骗局案例报告，格式如下：

🚨 今日安全警报

【案例类型】${type}

【案例经过】
（150字左右，描述受害者如何一步步被骗，要有细节，真实感强）

【骗局手法分析】
（3-4点，说明骗子用了哪些心理技巧）

【防范要点】
（3点，简洁实用的防范建议）

【今日提醒】
（一句话总结，朗朗上口）

日期：${today}

直接输出内容，不要加任何前缀。`
  : `You are a crypto security expert sharing real scam cases to educate users.

Today's case type: ${type}

Generate a realistic scam case report in this format:

🚨 Daily Security Alert

[Case Type] ${type}

[What Happened]
(~150 words, describe step-by-step how the victim was scammed, with realistic details)

[Scam Tactics Analysis]
(3-4 points explaining psychological tricks used)

[Prevention Tips]
(3 concise, practical tips)

[Today's Reminder]
(One memorable sentence summary)

Date: ${today}

Output the content directly, no prefix.`;
  return await callAI(prompt);
}

async function main() {
  const dayIndex = Math.floor(Date.now() / 86400000) % CASE_TYPES.length;
  const caseType = CASE_TYPES[dayIndex];

  console.log(`📅 今日案例类型：${caseType}`);
  console.log('🤖 AI 生成案例中...');

  let content;
  try {
    content = await generateCase(caseType);
    if (!content || content.length < 100) throw new Error('内容太短');
    console.log('✅ 案例生成完成');
  } catch(e) {
    console.error('❌ AI 生成失败:', e.message);
    process.exit(1);
  }

  await sendTelegram(content);
  console.log('✅ 推送成功！');
}

main().catch(e => {
  console.error('❌ 执行出错：', e.message);
  process.exit(1);
});
