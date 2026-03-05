#!/usr/bin/env node

const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { execSync } = require('child_process');

// 加载配置
let config;
try {
  config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (err) {
  console.error('❌ 配置文件加载失败，请复制 config.example.json 为 config.json 并填写配置');
  process.exit(1);
}

// 初始化 Telegram Bot
let bot;
if (config.telegram.botToken) {
  bot = new TelegramBot(config.telegram.botToken, { polling: true });
}

// 币安 API 基础 URL
const BINANCE_API = config.binance.testnet 
  ? 'https://testnet.binance.vision/api/v3'
  : 'https://api.binance.com/api/v3';

// 价格缓存
const priceCache = {};
const opportunityHistory = [];
const userContext = {}; // 用户对话上下文

// ==================== AI 分析功能 ====================

// 调用 OpenClaw AI 分析
async function aiAnalyze(opportunity, marketData) {
  try {
    const prompt = `你是一个专业的加密货币交易分析师。请分析以下套利机会：

交易对: ${opportunity.pair1} / ${opportunity.pair2}
价差: ${opportunity.spread}%
${opportunity.pair1} 变化: ${opportunity.change1}%
${opportunity.pair2} 变化: ${opportunity.change2}%
${opportunity.pair1} 24h交易量: $${marketData.volumes[opportunity.pair1]?.toLocaleString() || 'N/A'}
${opportunity.pair2} 24h交易量: $${marketData.volumes[opportunity.pair2]?.toLocaleString() || 'N/A'}

请提供：
1. 可靠性评分（1-10分，10分最高）
2. 建议仓位大小（保守/适中/激进）
3. 主要风险点
4. 最佳执行时机
5. 一句话总结

请用简洁专业的语言回答，每项用一行。`;

    // 调用 oracle CLI（OpenClaw 的命令行工具）
    const result = execSync(`echo "${prompt.replace(/"/g, '\\"')}" | oracle --model anthropic/claude-sonnet-4-6 --quiet`, {
      encoding: 'utf8',
      timeout: 15000
    });

    return parseAIResponse(result);
  } catch (error) {
    console.error('❌ AI 分析失败:', error.message);
    return {
      score: 5,
      position: '适中',
      risks: '无法获取 AI 分析',
      timing: '立即',
      summary: '建议人工判断'
    };
  }
}

// 解析 AI 响应
function parseAIResponse(response) {
  const lines = response.trim().split('\n').filter(l => l.trim());
  
  return {
    score: extractNumber(lines[0]) || 5,
    position: extractText(lines[1]) || '适中',
    risks: extractText(lines[2]) || '未知风险',
    timing: extractText(lines[3]) || '立即',
    summary: extractText(lines[4]) || '建议谨慎操作',
    fullResponse: response
  };
}

function extractNumber(text) {
  const match = text.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function extractText(text) {
  // 移除序号和标签
  return text.replace(/^\d+\.\s*/, '').replace(/^[^:：]+[:：]\s*/, '').trim();
}

// ==================== 自然语言交互 ====================

// 处理用户消息
async function handleUserMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();
  
  // 忽略命令
  if (text.startsWith('/')) return;
  
  console.log(`📱 收到用户消息: ${text}`);
  
  try {
    // 构建上下文
    const context = userContext[chatId] || [];
    context.push({ role: 'user', content: msg.text });
    
    // 获取当前市场数据
    const prices = await fetchPrices();
    const volumes = await fetchVolumes();
    
    const marketInfo = Object.entries(prices).map(([symbol, price]) => 
      `${symbol}: $${price.toLocaleString()} (24h量: $${volumes[symbol]?.toLocaleString() || 'N/A'})`
    ).join('\n');
    
    const prompt = `你是一个加密货币交易助手。用户问题：${msg.text}

当前市场数据：
${marketInfo}

历史机会数: ${opportunityHistory.length}
最近机会: ${opportunityHistory.slice(-3).map(o => `${o.pair1}/${o.pair2} 价差${o.spread}%`).join(', ') || '暂无'}

请用简洁友好的语言回答用户问题。如果用户询问价格、机会、建议等，基于上述数据回答。`;

    const response = execSync(`echo "${prompt.replace(/"/g, '\\"')}" | oracle --model anthropic/claude-sonnet-4-6 --quiet`, {
      encoding: 'utf8',
      timeout: 15000
    });
    
    // 保存上下文
    context.push({ role: 'assistant', content: response });
    userContext[chatId] = context.slice(-10); // 保留最近10条
    
    await bot.sendMessage(chatId, response.trim());
    console.log('✅ AI 回复已发送');
    
  } catch (error) {
    console.error('❌ AI 回复失败:', error.message);
    await bot.sendMessage(chatId, '抱歉，我现在有点忙，请稍后再试 😅');
  }
}

// 注册消息处理
if (bot) {
  bot.on('message', handleUserMessage);
  
  // 注册命令
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `🦞 欢迎使用 OpenClaw Trading Scout！

我可以帮你：
• 24/7 监控币安交易机会
• AI 分析每个套利机会
• 回答你的交易问题

试试问我：
"BTC 现在多少钱？"
"有什么好机会吗？"
"帮我分析 ETH"

监控中的交易对: ${config.trading.pairs.join(', ')}`);
  });
  
  bot.onText(/\/status/, async (msg) => {
    const chatId = msg.chat.id;
    const prices = await fetchPrices();
    
    let status = '📊 当前状态\n\n';
    status += `监控交易对: ${config.trading.pairs.length} 个\n`;
    status += `历史机会: ${opportunityHistory.length} 个\n\n`;
    status += '当前价格:\n';
    
    Object.entries(prices || {}).forEach(([symbol, price]) => {
      status += `${symbol}: $${price.toLocaleString()}\n`;
    });
    
    bot.sendMessage(chatId, status);
  });
}

// ==================== 原有功能 ====================

// 获取实时价格
async function fetchPrices() {
  try {
    const symbols = config.trading.pairs.join(',');
    const response = await axios.get(`${BINANCE_API}/ticker/price`, {
      params: { symbols: `["${config.trading.pairs.join('","')}"]` }
    });
    
    const prices = {};
    response.data.forEach(item => {
      prices[item.symbol] = parseFloat(item.price);
    });
    
    return prices;
  } catch (error) {
    console.error('❌ 获取价格失败:', error.message);
    return null;
  }
}

// 获取24小时交易量
async function fetchVolumes() {
  try {
    const response = await axios.get(`${BINANCE_API}/ticker/24hr`);
    const volumes = {};
    
    response.data.forEach(item => {
      if (config.trading.pairs.includes(item.symbol)) {
        volumes[item.symbol] = parseFloat(item.quoteVolume);
      }
    });
    
    return volumes;
  } catch (error) {
    console.error('❌ 获取交易量失败:', error.message);
    return {};
  }
}

// 计算价差套利机会
function findArbitrageOpportunities(prices, volumes) {
  const opportunities = [];
  
  const pairs = Object.keys(prices);
  
  for (let i = 0; i < pairs.length; i++) {
    for (let j = i + 1; j < pairs.length; j++) {
      const pair1 = pairs[i];
      const pair2 = pairs[j];
      
      if (volumes[pair1] < config.trading.minVolume || volumes[pair2] < config.trading.minVolume) {
        continue;
      }
      
      if (priceCache[pair1] && priceCache[pair2]) {
        const change1 = ((prices[pair1] - priceCache[pair1]) / priceCache[pair1]) * 100;
        const change2 = ((prices[pair2] - priceCache[pair2]) / priceCache[pair2]) * 100;
        const spread = Math.abs(change1 - change2);
        
        if (spread > config.trading.threshold) {
          opportunities.push({
            pair1,
            pair2,
            spread: spread.toFixed(2),
            change1: change1.toFixed(2),
            change2: change2.toFixed(2),
            suggestion: change1 > change2 ? `买入 ${pair2}, 卖出 ${pair1}` : `买入 ${pair1}, 卖出 ${pair2}`,
            timestamp: new Date().toISOString()
          });
        }
      }
    }
  }
  
  return opportunities;
}

// 发送 Telegram 通知（增强版）
async function sendTelegramAlert(opportunity, aiAnalysis) {
  if (!bot || !config.telegram.chatId) return;
  
  const scoreEmoji = aiAnalysis.score >= 8 ? '🔥' : aiAnalysis.score >= 6 ? '✅' : '⚠️';
  
  const message = `
${scoreEmoji} *套利机会发现！*

*交易对:* ${opportunity.pair1} / ${opportunity.pair2}
*价差:* ${opportunity.spread}%
*${opportunity.pair1} 变化:* ${opportunity.change1}%
*${opportunity.pair2} 变化:* ${opportunity.change2}%

🤖 *AI 分析:*
*可靠性:* ${aiAnalysis.score}/10 ${scoreEmoji}
*建议仓位:* ${aiAnalysis.position}
*主要风险:* ${aiAnalysis.risks}
*执行时机:* ${aiAnalysis.timing}

💡 *建议:* ${opportunity.suggestion}
📝 *总结:* ${aiAnalysis.summary}

⏰ ${new Date(opportunity.timestamp).toLocaleString('zh-CN')}
  `.trim();
  
  try {
    await bot.sendMessage(config.telegram.chatId, message, { parse_mode: 'Markdown' });
    console.log('✅ Telegram 通知已发送（含 AI 分析）');
  } catch (error) {
    console.error('❌ Telegram 通知发送失败:', error.message);
  }
}

// 记录日志
function log(message) {
  const timestamp = new Date().toLocaleString('zh-CN');
  const logMessage = `[${timestamp}] ${message}`;
  
  console.log(logMessage);
  
  if (config.logging.enabled) {
    fs.appendFileSync(config.logging.file, logMessage + '\n');
  }
}

// 主循环
async function mainLoop() {
  log('🦞 Trading Scout 正在检查...');
  
  const prices = await fetchPrices();
  if (!prices) return;
  
  const volumes = await fetchVolumes();
  
  console.log('\n📊 当前价格:');
  Object.entries(prices).forEach(([symbol, price]) => {
    console.log(`  ${symbol}: $${price.toLocaleString()}`);
  });
  
  const opportunities = findArbitrageOpportunities(prices, volumes);
  
  if (opportunities.length > 0) {
    console.log(`\n🎯 发现 ${opportunities.length} 个套利机会:\n`);
    
    for (const opp of opportunities) {
      console.log(`  ${opp.pair1} / ${opp.pair2}`);
      console.log(`  价差: ${opp.spread}%`);
      console.log(`  建议: ${opp.suggestion}`);
      
      // AI 分析
      console.log('  🤖 AI 分析中...');
      const aiAnalysis = await aiAnalyze(opp, { volumes });
      console.log(`  可靠性: ${aiAnalysis.score}/10`);
      console.log(`  建议仓位: ${aiAnalysis.position}`);
      console.log(`  总结: ${aiAnalysis.summary}\n`);
      
      // 发送通知
      await sendTelegramAlert(opp, aiAnalysis);
      
      // 记录历史
      opportunityHistory.push({ ...opp, aiAnalysis });
    }
  } else {
    console.log('\n😴 暂无套利机会\n');
  }
  
  Object.assign(priceCache, prices);
  
  console.log(`📈 历史机会数: ${opportunityHistory.length}`);
  console.log('─'.repeat(50) + '\n');
}

// 启动
async function start() {
  console.log('🦞 OpenClaw Trading Scout AI 版本启动\n');
  console.log(`监控交易对: ${config.trading.pairs.join(', ')}`);
  console.log(`检查间隔: ${config.trading.checkInterval / 1000} 秒`);
  console.log(`价差阈值: ${config.trading.threshold}%`);
  console.log(`最小交易量: $${config.trading.minVolume.toLocaleString()}`);
  console.log(`🤖 AI 分析: 已启用`);
  console.log(`💬 自然语言交互: ${bot ? '已启用' : '未启用'}\n`);
  console.log('─'.repeat(50) + '\n');
  
  await mainLoop();
  setInterval(mainLoop, config.trading.checkInterval);
}

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n\n👋 Trading Scout 停止');
  console.log(`📊 总共发现 ${opportunityHistory.length} 个套利机会`);
  if (bot) bot.stopPolling();
  process.exit(0);
});

// 启动
start().catch(err => {
  console.error('❌ 启动失败:', err);
  process.exit(1);
});
