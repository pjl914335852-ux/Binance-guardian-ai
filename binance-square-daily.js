#!/usr/bin/env node
/**
 * 币安广场每日自动发帖（AI生成版）
 * 脚本自己调 AI 生成内容 + 隐私检查 + 自动发布
 */

const https = require('https');
const { safePost } = require('./binance-square-post-safe.js');

const botConfig = JSON.parse(require('fs').readFileSync(
  require('path').join(__dirname, 'config.json'), 'utf8'
));

const AI_CONFIG = {
  baseUrl: botConfig.ai?.baseUrl || 'https://api.openai.com/v1',
  apiKey: botConfig.ai?.apiKey || '',
  model: botConfig.ai?.model || 'gpt-4o-mini'
};

if (!AI_CONFIG.apiKey) {
  console.error('❌ 未配置 AI API Key，请在 config.json 的 ai.apiKey 填入你的 key');
  process.exit(1);
}

const THEMES = [
  '风险管理实战经验',
  '市场心理与情绪控制',
  '加密货币安全防骗',
  '长期投资思维',
  '新手常见错误',
  'DeFi使用心得',
  '仓位管理技巧',
  '牛熊市应对策略',
  '链上数据解读',
  '项目研究方法'
];

function callAI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: AI_CONFIG.model,
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    });

    const aiUrl = new URL(AI_CONFIG.baseUrl + '/chat/completions');
    const req = https.request({
      hostname: aiUrl.hostname,
      port: 443,
      path: aiUrl.pathname,
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

async function generateContent(theme) {
  const prompt = `你是一个有真实加密货币投资经验的普通用户，在币安广场分享心得。

今天的主题：${theme}

要求：
- 用第一人称，像朋友聊天一样自然
- 150-200字，不要太长
- 必须有具体的真实案例或数字（可以匿名化）
- 有一个核心观点，有反思或教训
- 结尾加2-3个相关话题标签（#xxx格式）
- 不要用"首先其次最后"这种格式
- 不要提及任何平台名称、用户名、真实姓名
- 不要包含任何链接或联系方式

直接输出内容，不要加任何前缀说明。`;

  return await callAI(prompt);
}

async function main() {
  const dayIndex = Math.floor(Date.now() / 86400000) % THEMES.length;
  const theme = THEMES[dayIndex];

  console.log(`📅 今日主题：${theme}`);
  console.log('🤖 AI 生成内容中...');

  let content;
  try {
    content = await generateContent(theme);
    if (!content || content.length < 50) throw new Error('内容太短');
    console.log('✅ 内容生成完成\n');
    console.log(content.slice(0, 80) + '...\n');
  } catch(e) {
    console.error('❌ AI 生成失败:', e.message);
    process.exit(1);
  }

  const result = await safePost(content);

  if (result.success) {
    console.log(`✅ 发帖成功！`);
    console.log(`🔗 链接：${result.url}`);
    process.exit(0);
  } else {
    console.error(`❌ 发帖失败：${result.reason} - ${result.error || ''}`);
    process.exit(1);
  }
}

main().catch(e => {
  console.error('❌ 执行出错：', e.message);
  process.exit(1);
});
