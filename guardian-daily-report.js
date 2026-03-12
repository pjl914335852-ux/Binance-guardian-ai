/**
 * 守护者每日市场简报
 * 面向新手/中老年用户，语言简单易懂
 * 每天早上9点推送
 */

const https = require('https');

// 获取恐惧贪婪指数
async function getFearGreedIndex() {
  return new Promise((resolve) => {
    https.get('https://api.alternative.me/fng/?limit=1', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const value = parseInt(json.data[0].value);
          const classification = json.data[0].value_classification;
          resolve({ value, classification });
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// 获取BTC/ETH价格
async function getPrices(binanceClient) {
  try {
    const btc = await binanceClient.prices('BTCUSDT');
    const eth = await binanceClient.prices('ETHUSDT');
    const bnb = await binanceClient.prices('BNBUSDT');
    return {
      BTC: parseFloat(btc.BTCUSDT),
      ETH: parseFloat(eth.ETHUSDT),
      BNB: parseFloat(bnb.BNBUSDT)
    };
  } catch {
    return null;
  }
}

// 获取24小时涨跌
async function get24hChange(binanceClient) {
  try {
    const btc = await binanceClient.dailyStats('BTCUSDT');
    return parseFloat(btc.priceChangePercent);
  } catch {
    return null;
  }
}

// 把恐惧贪婪指数翻译成大白话
function translateFearGreed(value) {
  if (value <= 20) return { emoji: '😱', desc: '极度恐惧', tip: '市场很恐慌，很多人在抛售。新手不建议此时购买。' };
  if (value <= 40) return { emoji: '😰', desc: '恐惧', tip: '市场情绪偏悲观，观望为主。' };
  if (value <= 60) return { emoji: '😐', desc: '中性', tip: '市场情绪平稳，正常观察即可。' };
  if (value <= 80) return { emoji: '😄', desc: '贪婪', tip: '市场情绪偏乐观，注意不要追高。' };
  return { emoji: '🤩', desc: '极度贪婪', tip: '市场过热，历史上这种时候容易出现回调，新手要小心！' };
}

// 把涨跌幅翻译成大白话
function translateChange(change) {
  if (change === null) return '暂时获取不到';
  const abs = Math.abs(change);
  const direction = change >= 0 ? '涨' : '跌';
  if (abs < 1) return `基本持平，小幅${direction}了 ${abs.toFixed(1)}%`;
  if (abs < 3) return `${direction}了 ${abs.toFixed(1)}%，波动正常`;
  if (abs < 5) return `${direction}幅较大，达到 ${abs.toFixed(1)}%，注意风险`;
  return `大幅${direction}了 ${abs.toFixed(1)}%，市场波动剧烈，新手谨慎操作`;
}

// 生成新手友好的每日简报
async function generateGuardianDailyReport(binanceClient) {
  const [fgi, prices, btcChange] = await Promise.all([
    getFearGreedIndex(),
    getPrices(binanceClient),
    get24hChange(binanceClient)
  ]);

  const now = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  });

  let report = `🌅 *守护者每日简报*\n`;
  report += `📅 ${now}\n\n`;

  // 市场情绪
  if (fgi) {
    const fg = translateFearGreed(fgi.value);
    report += `📊 *今日市场情绪*\n`;
    report += `${fg.emoji} ${fg.desc}（指数：${fgi.value}/100）\n`;
    report += `💡 ${fg.tip}\n\n`;
  }

  // BTC行情（用大白话）
  if (prices && btcChange !== null) {
    const changeDesc = translateChange(btcChange);
    report += `₿ *比特币今日行情*\n`;
    report += `• 当前价格：$${prices.BTC.toLocaleString('en-US', {maximumFractionDigits: 0})}\n`;
    report += `• 过去24小时：${changeDesc}\n\n`;
  }

  // 安全提示（每天轮换）
  const tips = [
    '🔐 提醒：正规平台不会主动要求你提供密码或助记词。',
    '⚠️ 提醒：高收益承诺往往是骗局的开始，"稳赚不赔"不存在。',
    '📵 提醒：陌生人拉你进的投资群，99%都是骗局。',
    '🔑 提醒：助记词就是你的钱，永远不要截图或发给任何人。',
    '💸 提醒：转账前多确认一次地址，转错了找不回来的。',
    '🚫 提醒：有人说帮你"解冻资产"或"退税"，直接拉黑。',
    '📞 提醒：币安客服不会主动私信你，遇到自称客服的要小心。',
  ];
  const todayTip = tips[new Date().getDay() % tips.length];
  report += `🛡️ *今日安全提示*\n${todayTip}\n\n`;

  report += `_守护者 · 让加密投资更安全_`;

  return report;
}

module.exports = { generateGuardianDailyReport };
