#!/usr/bin/env node

const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { spawn } = require('child_process');

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

// 数据缓存
const priceCache = {};
const volumeCache = {};
const opportunityHistory = [];
const userContext = {};
const priceAlerts = []; // 价格提醒
const orderBookCache = {}; // 订单簿缓存
const tradeHistory = {}; // 交易历史

// ==================== NoFx AI 分析 ====================

async function analyzeWithNoFx(prompt, data) {
  return new Promise((resolve, reject) => {
    // 构建完整的提示词，包含数据
    const fullPrompt = `${prompt}\n\n数据：\n${JSON.stringify(data, null, 2)}`;
    
    // 调用 oracle 使用 NoFx 引擎
    const oracle = spawn('oracle', [
      '--engine', 'api',
      '--model', 'anthropic/claude-sonnet-4-6',
      '--prompt', fullPrompt
    ]);
    
    let output = '';
    let error = '';
    
    oracle.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    oracle.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    oracle.on('close', (code) => {
      if (code === 0) {
        // 提取实际内容（去掉 oracle 的元信息）
        const lines = output.split('\n');
        const contentStart = lines.findIndex(l => l.includes('Session running') || l.includes('oracle'));
        const content = contentStart >= 0 ? lines.slice(contentStart + 1).join('\n').trim() : output.trim();
        resolve(content || output);
      } else {
        reject(new Error(error || `Oracle exited with code ${code}`));
      }
    });
    
    // 超时处理
    setTimeout(() => {
      oracle.kill();
      reject(new Error('AI 分析超时'));
    }, 30000);
  });
}

// ==================== 数据获取 ====================

// 获取实时价格
async function fetchPrices() {
  try {
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

// 获取24小时数据
async function fetch24hrData() {
  try {
    const response = await axios.get(`${BINANCE_API}/ticker/24hr`);
    const data = {};
    
    response.data.forEach(item => {
      if (config.trading.pairs.includes(item.symbol)) {
        data[item.symbol] = {
          volume: parseFloat(item.quoteVolume),
          priceChange: parseFloat(item.priceChange),
          priceChangePercent: parseFloat(item.priceChangePercent),
          high: parseFloat(item.highPrice),
          low: parseFloat(item.lowPrice),
          trades: parseInt(item.count)
        };
      }
    });
    
    return data;
  } catch (error) {
    console.error('❌ 获取24小时数据失败:', error.message);
    return {};
  }
}

// 获取订单簿深度
async function fetchOrderBook(symbol, limit = 20) {
  try {
    const response = await axios.get(`${BINANCE_API}/depth`, {
      params: { symbol, limit }
    });
    
    return {
      bids: response.data.bids.map(b => ({ price: parseFloat(b[0]), qty: parseFloat(b[1]) })),
      asks: response.data.asks.map(a => ({ price: parseFloat(a[0]), qty: parseFloat(a[1]) }))
    };
  } catch (error) {
    console.error(`❌ 获取 ${symbol} 订单簿失败:`, error.message);
    return null;
  }
}

// 获取最近成交
async function fetchRecentTrades(symbol, limit = 100) {
  try {
    const response = await axios.get(`${BINANCE_API}/trades`, {
      params: { symbol, limit }
    });
    
    return response.data.map(t => ({
      price: parseFloat(t.price),
      qty: parseFloat(t.qty),
      time: t.time,
      isBuyerMaker: t.isBuyerMaker
    }));
  } catch (error) {
    console.error(`❌ 获取 ${symbol} 成交记录失败:`, error.message);
    return [];
  }
}

// ==================== 1. 市场情绪分析 ====================

async function analyzeMarketSentiment() {
  console.log('📊 分析市场情绪...');
  
  const data24hr = await fetch24hrData();
  
  const prompt = `你是加密货币市场分析师。分析以下市场数据，给出每个币种的情绪判断：

要求：
1. 判断看涨🟢/震荡🟡/看跌🔴
2. 分析原因（价格、交易量、波动）
3. 给出操作建议
4. 用简洁的中文回答，每个币种3-4行

格式示例：
BTC: 看涨 🟢
- 24h 涨幅: +2.3%
- 交易量增加 15%
- 建议: 持有，目标 $98,000`;

  try {
    const analysis = await analyzeWithNoFx(prompt, data24hr);
    return { data: data24hr, analysis };
  } catch (error) {
    console.error('❌ 市场情绪分析失败:', error.message);
    return null;
  }
}

// ==================== 2. 智能价格提醒 ====================

function addPriceAlert(userId, symbol, condition, targetPrice) {
  priceAlerts.push({
    userId,
    symbol,
    condition, // 'above', 'below', 'change'
    targetPrice,
    createdAt: Date.now()
  });
  
  console.log(`✅ 添加价格提醒: ${symbol} ${condition} ${targetPrice}`);
}

async function checkPriceAlerts(prices) {
  for (const alert of priceAlerts) {
    const currentPrice = prices[alert.symbol];
    if (!currentPrice) continue;
    
    let triggered = false;
    let message = '';
    
    if (alert.condition === 'below' && currentPrice <= alert.targetPrice) {
      triggered = true;
      message = `🔔 价格提醒\n\n${alert.symbol} 已跌破 $${alert.targetPrice.toLocaleString()}\n当前价格: $${currentPrice.toLocaleString()}`;
    } else if (alert.condition === 'above' && currentPrice >= alert.targetPrice) {
      triggered = true;
      message = `🔔 价格提醒\n\n${alert.symbol} 已突破 $${alert.targetPrice.toLocaleString()}\n当前价格: $${currentPrice.toLocaleString()}`;
    }
    
    if (triggered && bot) {
      // AI 分析建议
      const aiPrompt = `${alert.symbol} 价格${alert.condition === 'below' ? '跌破' : '突破'} $${alert.targetPrice}，当前 $${currentPrice}。给出简短的操作建议（2-3行）。`;
      
      try {
        const suggestion = await analyzeWithNoFx(aiPrompt, { symbol: alert.symbol, price: currentPrice, target: alert.targetPrice });
        message += `\n\n🤖 AI 建议:\n${suggestion}`;
      } catch (err) {
        message += `\n\n🤖 AI 建议: 建议观望，等待市场稳定`;
      }
      
      await bot.sendMessage(alert.userId, message);
      
      // 移除已触发的提醒
      const index = priceAlerts.indexOf(alert);
      if (index > -1) priceAlerts.splice(index, 1);
    }
  }
}

// ==================== 3. 资金流向分析 ====================

async function analyzeMoneyFlow() {
  console.log('💰 分析资金流向...');
  
  const flowData = {};
  
  for (const symbol of config.trading.pairs) {
    const trades = await fetchRecentTrades(symbol, 100);
    if (trades.length === 0) continue;
    
    let buyVolume = 0;
    let sellVolume = 0;
    
    trades.forEach(t => {
      const volume = t.price * t.qty;
      if (t.isBuyerMaker) {
        sellVolume += volume; // 买方是 maker = 主动卖出
      } else {
        buyVolume += volume; // 买方是 taker = 主动买入
      }
    });
    
    flowData[symbol] = {
      buyVolume,
      sellVolume,
      netFlow: buyVolume - sellVolume,
      ratio: buyVolume / (buyVolume + sellVolume)
    };
  }
  
  const prompt = `分析以下资金流向数据，判断市场趋势：

要求：
1. 识别资金流入🟢/流出🔴的币种
2. 分析可能的原因
3. 给出操作建议
4. 用简洁中文，3-4行总结

格式示例：
BTC: 净流入 $5.2M 🟢
- 大单持续买入
- 建议: 可以跟进`;

  try {
    const analysis = await analyzeWithNoFx(prompt, flowData);
    return { data: flowData, analysis };
  } catch (error) {
    console.error('❌ 资金流向分析失败:', error.message);
    return null;
  }
}

// ==================== 4. 支撑/阻力位分析 ====================

async function analyzeSupportResistance(symbol) {
  console.log(`🎯 分析 ${symbol} 支撑/阻力位...`);
  
  const orderBook = await fetchOrderBook(symbol, 50);
  if (!orderBook) return null;
  
  // 找出大单（订单簿中的关键价位）
  const bigBids = orderBook.bids.filter(b => b.qty > orderBook.bids[0].qty * 0.5).slice(0, 3);
  const bigAsks = orderBook.asks.filter(a => a.qty > orderBook.asks[0].qty * 0.5).slice(0, 3);
  
  const data = {
    currentPrice: (orderBook.bids[0].price + orderBook.asks[0].price) / 2,
    support: bigBids.map(b => b.price),
    resistance: bigAsks.map(a => a.price),
    bidDepth: orderBook.bids.reduce((sum, b) => sum + b.qty, 0),
    askDepth: orderBook.asks.reduce((sum, a) => sum + a.qty, 0)
  };
  
  const prompt = `分析 ${symbol} 的支撑和阻力位，给出交易建议：

要求：
1. 判断当前位置（接近支撑/阻力/中间）
2. 突破/跌破的概率
3. 操作建议（入场点、止损点）
4. 用简洁中文，4-5行`;

  try {
    const analysis = await analyzeWithNoFx(prompt, data);
    return { data, analysis };
  } catch (error) {
    console.error('❌ 支撑/阻力位分析失败:', error.message);
    return null;
  }
}

// ==================== 5. 异常波动监控 ====================

async function detectAbnormalMovement(prices, data24hr) {
  const abnormal = [];
  
  for (const symbol of config.trading.pairs) {
    const current = prices[symbol];
    const previous = priceCache[symbol];
    
    if (!previous) continue;
    
    const change = ((current - previous) / previous) * 100;
    
    // 5分钟内波动超过 2%
    if (Math.abs(change) > 2) {
      abnormal.push({
        symbol,
        change: change.toFixed(2),
        current,
        previous,
        volume24h: data24hr[symbol]?.volume || 0
      });
    }
  }
  
  if (abnormal.length > 0) {
    const prompt = `检测到异常波动，分析原因并给出建议：

要求：
1. 判断是否追涨/抄底
2. 风险提示
3. 操作建议
4. 每个币种2-3行`;

    try {
      const analysis = await analyzeWithNoFx(prompt, abnormal);
      return { data: abnormal, analysis };
    } catch (error) {
      console.error('❌ 异常波动分析失败:', error.message);
      return null;
    }
  }
  
  return null;
}

// ==================== 6. 历史回测 ====================

function generateBacktestReport() {
  if (opportunityHistory.length === 0) {
    return '暂无历史数据';
  }
  
  const total = opportunityHistory.length;
  const avgSpread = (opportunityHistory.reduce((sum, o) => sum + parseFloat(o.spread), 0) / total).toFixed(2);
  
  // 按交易对统计
  const pairStats = {};
  opportunityHistory.forEach(o => {
    const key = `${o.pair1}/${o.pair2}`;
    if (!pairStats[key]) pairStats[key] = 0;
    pairStats[key]++;
  });
  
  const bestPair = Object.entries(pairStats).sort((a, b) => b[1] - a[1])[0];
  
  return `📈 策略回测报告

时间范围: 启动至今
监控交易对: ${config.trading.pairs.join(', ')}

发现机会: ${total} 个
平均价差: ${avgSpread}%
最佳交易对: ${bestPair ? bestPair[0] : 'N/A'} (${bestPair ? bestPair[1] : 0} 次)

💡 建议: ${parseFloat(avgSpread) > 0.7 ? '当前策略有效' : '建议调整阈值'}`;
}

// ==================== 套利发现（原有功能）====================

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
            pair1, pair2,
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

// ==================== Telegram 交互 ====================

if (bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `🦞 欢迎使用 OpenClaw Trading Scout Pro！

🆕 全新功能：
• 📊 市场情绪分析
• 🔔 智能价格提醒
• 💰 资金流向分析
• 🎯 支撑/阻力位分析
• ⚠️ 异常波动监控
• 📈 历史回测报告

命令：
/sentiment - 市场情绪分析
/flow - 资金流向分析
/support <币种> - 支撑/阻力位
/backtest - 回测报告
/status - 当前状态

或直接问我：
"BTC 现在多少钱？"
"提醒我 BTC 跌到 95000"
"有什么好机会吗？"`);
  });
  
  bot.onText(/\/sentiment/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, '📊 正在分析市场情绪，请稍候...');
    
    const result = await analyzeMarketSentiment();
    if (result) {
      await bot.sendMessage(chatId, `📊 市场情绪分析\n\n${result.analysis}`);
    } else {
      await bot.sendMessage(chatId, '❌ 分析失败，请稍后重试');
    }
  });
  
  bot.onText(/\/flow/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, '💰 正在分析资金流向，请稍候...');
    
    const result = await analyzeMoneyFlow();
    if (result) {
      await bot.sendMessage(chatId, `💰 资金流向分析\n\n${result.analysis}`);
    } else {
      await bot.sendMessage(chatId, '❌ 分析失败，请稍后重试');
    }
  });
  
  bot.onText(/\/support (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const symbol = match[1].toUpperCase();
    
    if (!symbol.endsWith('USDT')) {
      await bot.sendMessage(chatId, '❌ 请输入正确的交易对，如: /support BTCUSDT');
      return;
    }
    
    await bot.sendMessage(chatId, `🎯 正在分析 ${symbol} 支撑/阻力位...`);
    
    const result = await analyzeSupportResistance(symbol);
    if (result) {
      await bot.sendMessage(chatId, `🎯 ${symbol} 支撑/阻力位分析\n\n${result.analysis}`);
    } else {
      await bot.sendMessage(chatId, '❌ 分析失败，请稍后重试');
    }
  });
  
  bot.onText(/\/backtest/, (msg) => {
    const chatId = msg.chat.id;
    const report = generateBacktestReport();
    bot.sendMessage(chatId, report);
  });
  
  bot.onText(/\/status/, async (msg) => {
    const chatId = msg.chat.id;
    const prices = await fetchPrices();
    
    let status = '📊 当前状态\n\n';
    status += `监控交易对: ${config.trading.pairs.length} 个\n`;
    status += `历史机会: ${opportunityHistory.length} 个\n`;
    status += `价格提醒: ${priceAlerts.length} 个\n\n`;
    status += '当前价格:\n';
    
    Object.entries(prices || {}).forEach(([symbol, price]) => {
      status += `${symbol}: $${price.toLocaleString()}\n`;
    });
    
    bot.sendMessage(chatId, status);
  });
  
  // 自然语言处理
  bot.on('message', async (msg) => {
    if (msg.text.startsWith('/')) return;
    
    const chatId = msg.chat.id;
    const text = msg.text.toLowerCase();
    
    // 价格提醒
    if (text.includes('提醒') || text.includes('alert')) {
      const match = text.match(/(btc|eth|bnb|sol)[^\d]*(\d+)/i);
      if (match) {
        const symbol = match[1].toUpperCase() + 'USDT';
        const targetPrice = parseFloat(match[2]);
        const condition = text.includes('跌') || text.includes('below') ? 'below' : 'above';
        
        addPriceAlert(chatId, symbol, condition, targetPrice);
        await bot.sendMessage(chatId, `✅ 已设置价格提醒\n\n${symbol} ${condition === 'below' ? '跌破' : '突破'} $${targetPrice.toLocaleString()} 时会通知你`);
        return;
      }
    }
    
    // 其他问题用 AI 回答
    const prices = await fetchPrices();
    const data24hr = await fetch24hrData();
    
    const marketInfo = Object.entries(prices || {}).map(([symbol, price]) => 
      `${symbol}: $${price.toLocaleString()} (24h: ${data24hr[symbol]?.priceChangePercent?.toFixed(2) || 'N/A'}%)`
    ).join('\n');
    
    const prompt = `你是加密货币交易助手。用户问题：${msg.text}

当前市场数据：
${marketInfo}

历史机会数: ${opportunityHistory.length}

请用简洁友好的中文回答（3-5行）。`;

    try {
      const response = await analyzeWithNoFx(prompt, { prices, data24hr });
      await bot.sendMessage(chatId, response);
    } catch (error) {
      await bot.sendMessage(chatId, '抱歉，我现在有点忙，请稍后再试 😅');
    }
  });
}

// ==================== 主循环 ====================

async function mainLoop() {
  console.log('\n' + '='.repeat(60));
  console.log(`[${new Date().toLocaleString('zh-CN')}] 🦞 Trading Scout Pro 检查中...`);
  console.log('='.repeat(60));
  
  const prices = await fetchPrices();
  if (!prices) return;
  
  const data24hr = await fetch24hrData();
  
  // 显示当前价格
  console.log('\n📊 当前价格:');
  Object.entries(prices).forEach(([symbol, price]) => {
    const change = data24hr[symbol]?.priceChangePercent || 0;
    const emoji = change > 0 ? '🟢' : change < 0 ? '🔴' : '🟡';
    console.log(`  ${symbol}: $${price.toLocaleString()} ${emoji} ${change.toFixed(2)}%`);
  });
  
  // 检查价格提醒
  await checkPriceAlerts(prices);
  
  // 检查异常波动
  const abnormal = await detectAbnormalMovement(prices, data24hr);
  if (abnormal && bot && config.telegram.chatId) {
    await bot.sendMessage(config.telegram.chatId, `⚠️ 异常波动检测\n\n${abnormal.analysis}`);
  }
  
  // 查找套利机会
  const volumes = {};
  Object.entries(data24hr).forEach(([symbol, data]) => {
    volumes[symbol] = data.volume;
  });
  
  const opportunities = findArbitrageOpportunities(prices, volumes);
  
  if (opportunities.length > 0) {
    console.log(`\n🎯 发现 ${opportunities.length} 个套利机会`);
    
    for (const opp of opportunities) {
      console.log(`\n  ${opp.pair1} / ${opp.pair2}`);
      console.log(`  价差: ${opp.spread}%`);
      console.log(`  建议: ${opp.suggestion}`);
      
      // AI 分析
      const aiPrompt = `分析套利机会，给出可靠性评分(1-10)、建议仓位、风险、时机、总结（每项1行）：`;
      try {
        const analysis = await analyzeWithNoFx(aiPrompt, opp);
        console.log(`  🤖 AI: ${analysis.split('\n')[0]}`);
        
        // 推送通知
        if (bot && config.telegram.chatId) {
          const message = `🎯 套利机会\n\n${opp.pair1}/${opp.pair2}\n价差: ${opp.spread}%\n\n🤖 AI分析:\n${analysis}\n\n💡 ${opp.suggestion}`;
          await bot.sendMessage(config.telegram.chatId, message);
        }
      } catch (err) {
        console.log(`  ⚠️ AI 分析失败`);
      }
      
      opportunityHistory.push(opp);
    }
  } else {
    console.log('\n😴 暂无套利机会');
  }
  
  // 更新缓存
  Object.assign(priceCache, prices);
  Object.assign(volumeCache, volumes);
  
  console.log(`\n📈 统计: 历史机会 ${opportunityHistory.length} 个 | 价格提醒 ${priceAlerts.length} 个`);
  console.log('='.repeat(60));
}

// ==================== 启动 ====================

async function start() {
  console.log('🦞 OpenClaw Trading Scout Pro 启动\n');
  console.log('🆕 全新功能:');
  console.log('  📊 市场情绪分析');
  console.log('  🔔 智能价格提醒');
  console.log('  💰 资金流向分析');
  console.log('  🎯 支撑/阻力位分析');
  console.log('  ⚠️ 异常波动监控');
  console.log('  📈 历史回测报告\n');
  console.log(`监控交易对: ${config.trading.pairs.join(', ')}`);
  console.log(`检查间隔: ${config.trading.checkInterval / 1000} 秒`);
  console.log(`价差阈值: ${config.trading.threshold}%\n`);
  
  await mainLoop();
  setInterval(mainLoop, config.trading.checkInterval);
}

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n\n👋 Trading Scout Pro 停止');
  console.log(`📊 总共发现 ${opportunityHistory.length} 个套利机会`);
  if (bot) bot.stopPolling();
  process.exit(0);
});

// 启动
start().catch(err => {
  console.error('❌ 启动失败:', err);
  process.exit(1);
});
