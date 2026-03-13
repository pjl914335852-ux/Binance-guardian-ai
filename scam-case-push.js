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
  path.join(__dirname, 'config.json'), 'utf8'
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
    const env = fs.readFileSync('/root/anluyy-bot/.env', 'utf8');
    const keyMatch = env.match(/^AI_API_KEY=(.+)$/m);
    const apiKey = keyMatch ? keyMatch[1].trim() : '';
    const body = JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: 'You are a blockchain security educator at a major exchange. Your role is to create educational content that helps users recognize and avoid common crypto risks. Always write from a protective, educational perspective.',
      messages: [{ role: 'user', content: prompt }]
    });
    const req = require('https').request({
      hostname: 'api.ikuncode.cc',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
          const content = json.choices?.[0]?.message?.content || '';
          resolve(content);
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
  const prompt = isZh ? `你是币安官方安全教育专家，负责每日安全提醒。

今日主题：如何识别和防范「${type}」

请用以下格式输出安全教育内容：

🛡️ 今日安全课堂

📌 主题：${type}

📖 真实案例
（描述一个用户差点受骗但及时识别的案例，150字，正面教育角度）

🔍 识别方法
（3点，教用户如何识别这类风险）

✅ 防范建议
（3点实用建议）

💡 今日金句
（一句防骗口诀）

日期：${today}

直接输出，不加前缀。`
  : `You are a Binance security education expert providing daily safety tips.

Today's topic: How to identify and avoid "${type}"

Format:

🛡️ Daily Security Lesson

📌 Topic: ${type}

📖 Real Case Study
(~150 words: describe a user who nearly fell victim but recognized the warning signs in time — positive educational angle)

🔍 How to Identify
(3 points to help users spot this risk)

✅ Prevention Tips
(3 practical tips)

💡 Today's Motto
(One memorable safety phrase)

Date: ${today}

Output directly, no prefix.`;
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
