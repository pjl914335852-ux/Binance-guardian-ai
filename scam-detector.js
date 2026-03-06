// scam-detector.js - 骗局识别模块

class ScamDetector {
  constructor() {
    // 已知诈骗币列表（确认的骗局项目）
    this.scamCoins = new Set([
      'SQUID', 'SQUIDGAME', // Squid Game 骗局
      'BITCONNECT', 'BCC', // BitConnect 庞氏骗局
      'ONECOIN', // OneCoin 传销骗局
      'PLUSTOKEN', // PlusToken 传销骗局
      'MMMPRO', // MMM 庞氏骗局
      'CLOUDTOKEN' // CloudToken 骗局
    ]);
    
    // 高风险币种（已崩盘或有重大问题）
    this.highRiskCoins = new Set([
      'LUNA', 'LUNC', // Terra Luna 崩盘
      'FTT', // FTX Token 崩盘
      'SAFEMOON' // SafeMoon 争议项目
    ]);
    
    // Pi Network 特殊处理（已上部分交易所，但有争议）
    this.piNetworkInfo = {
      symbol: 'PI',
      status: 'controversial', // controversial, not scam
      listedExchanges: ['OKX', 'Huobi', 'Gate.io', 'Bitget'], // 2024年底开始上线
      notListedOn: ['Binance', 'Coinbase', 'Kraken'], // 主流交易所未上线
      warnings: [
        'Pi Network 已在部分交易所上线，但币安、Coinbase 等主流交易所尚未上线',
        '项目从 2019 年开始，主网于 2024 年底才开放',
        '大量用户持有 Pi 币，但流动性有限',
        '警惕私下交易和场外交易的风险'
      ],
      risks: [
        '流动性风险：大量持币者可能同时抛售',
        '价格波动：新上线币种价格极不稳定',
        '场外骗局：很多骗子冒充 Pi 官方进行诈骗'
      ]
    };
    
    // 诈骗特征关键词
    this.scamKeywords = [
      '内部渠道', '私下交易', '内幕消息',
      '保证收益', '稳赚不赔', '零风险',
      '拉人头', '推荐返利', '分销',
      '翻倍', '暴富', '财富自由',
      '限时优惠', '最后机会', '名额有限',
      '官方内购', '白名单', '私募',
      '转账到私人', '微信转账', '支付宝转账'
    ];
    
    // 币安已上线币种（示例，实际应该从 API 获取）
    this.binanceCoins = new Set();
    this.lastUpdate = 0;
  }
  
  // 更新币安币种列表
  async updateBinanceCoins() {
    const now = Date.now();
    // 每小时更新一次
    if (now - this.lastUpdate < 3600000) {
      return;
    }
    
    try {
      const axios = require('axios');
      const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
      
      this.binanceCoins.clear();
      response.data.symbols.forEach(symbol => {
        if (symbol.status === 'TRADING') {
          // 提取基础币种（如 BTCUSDT -> BTC）
          const base = symbol.baseAsset;
          this.binanceCoins.add(base.toUpperCase());
        }
      });
      
      this.lastUpdate = now;
      console.log(`✅ 已更新币安币种列表: ${this.binanceCoins.size} 个币种`);
    } catch (error) {
      console.error('❌ 更新币安币种列表失败:', error.message);
    }
  }
  
  // 检测是否为诈骗币
  async detectScam(coinName, context = '') {
    await this.updateBinanceCoins();
    
    const coin = coinName.toUpperCase().replace(/USDT|BUSD|USD|BTC|ETH/g, '').trim();
    
    const result = {
      isScam: false,
      riskLevel: 'low', // low, medium, high, critical
      reasons: [],
      warnings: [],
      advice: []
    };
    
    // 1. 检查是否在已知诈骗币列表
    if (this.scamCoins.has(coin)) {
      result.isScam = true;
      result.riskLevel = 'critical';
      result.reasons.push('该币种在已知诈骗币列表中');
    }
    
    // 2. 检查是否在币安上线
    if (!this.binanceCoins.has(coin)) {
      result.riskLevel = result.riskLevel === 'critical' ? 'critical' : 'high';
      result.warnings.push('该币种未在币安上线');
      result.advice.push('只在币安官方 App 交易已上线的币种');
    }
    
    // 3. 检查上下文中的诈骗关键词
    const contextLower = context.toLowerCase();
    const foundKeywords = this.scamKeywords.filter(keyword => 
      contextLower.includes(keyword.toLowerCase())
    );
    
    if (foundKeywords.length > 0) {
      result.riskLevel = 'high';
      result.warnings.push(`发现诈骗特征: ${foundKeywords.join('、')}`);
      result.advice.push('警惕任何承诺高回报、要求私下转账的行为');
    }
    
    // 4. 特殊处理 Pi 币
    if (coin === 'PI' || coin === 'PICOIN' || coin === 'PINETWORK') {
      result.riskLevel = 'high';
      result.warnings.push(...this.piNetworkInfo.warnings);
      result.risks = this.piNetworkInfo.risks;
      result.advice.push('Pi 币已在部分交易所上线，但币安尚未上线');
      result.advice.push('如果要交易，只在正规交易所（OKX、Huobi 等）');
      result.advice.push('警惕场外交易和私下购买，极易被骗');
      result.advice.push('不要相信"内部渠道"、"提前购买"等说法');
    }
    
    return result;
  }
  
  // 生成友好的警告消息（长辈模式）
  generateElderlyWarning(coinName, detection, lang = 'zh') {
    const coin = coinName.toUpperCase();
    
    if (lang === 'zh') {
      let message = `🛡️ *安全提醒*\n\n`;
      
      if (detection.isScam) {
        message += `⚠️ *${coin} 是诈骗币！*\n\n`;
        message += `妈，这个币千万不要买！\n\n`;
        
        if (detection.reasons.length > 0) {
          message += `🚨 *为什么是骗局：*\n`;
          detection.reasons.forEach(reason => {
            message += `• ${reason}\n`;
          });
          message += `\n`;
        }
      } else if (detection.riskLevel === 'high') {
        message += `⚠️ *${coin} 风险很高！*\n\n`;
        
        // 特殊处理 Pi 币
        if (coin === 'PI' || coin.includes('PI')) {
          message += `关于 Pi 币的最新情况：\n\n`;
          message += `✅ *好消息：*\n`;
          message += `• Pi 币已在部分交易所上线（OKX、Huobi 等）\n`;
          message += `• 不再是完全的骗局项目\n\n`;
          message += `⚠️ *但是要注意：*\n`;
          message += `• 币安、Coinbase 等主流交易所还没上线\n`;
          message += `• 价格波动极大，风险很高\n`;
          message += `• 很多骗子冒充 Pi 官方进行诈骗\n\n`;
        } else {
          message += `这个币目前还没在币安上线，要小心。\n\n`;
        }
      } else if (detection.riskLevel === 'medium') {
        message += `💡 *关于 ${coin}*\n\n`;
      }
      
      if (detection.warnings.length > 0) {
        message += `⚠️ *风险提示：*\n`;
        detection.warnings.forEach(warning => {
          message += `• ${warning}\n`;
        });
        message += `\n`;
      }
      
      if (detection.risks && detection.risks.length > 0) {
        message += `🚨 *主要风险：*\n`;
        detection.risks.forEach(risk => {
          message += `• ${risk}\n`;
        });
        message += `\n`;
      }
      
      if (detection.advice.length > 0) {
        message += `💡 *安全建议：*\n`;
        detection.advice.forEach(advice => {
          message += `• ${advice}\n`;
        });
        message += `\n`;
      }
      
      // 通用安全提示
      message += `\n🛡️ *记住三不原则：*\n`;
      message += `1. 不相信私聊推荐\n`;
      message += `2. 不转账到私人账户\n`;
      message += `3. 不在不正规的地方买币\n\n`;
      message += `有问题随时问我！`;
      
      return message;
    } else {
      // English version
      let message = `🛡️ *Security Alert*\n\n`;
      
      if (detection.isScam) {
        message += `⚠️ *${coin} is a SCAM!*\n\n`;
        message += `DO NOT buy this coin!\n\n`;
        
        if (detection.reasons.length > 0) {
          message += `🚨 *Why it's a scam:*\n`;
          detection.reasons.forEach(reason => {
            message += `• ${reason}\n`;
          });
          message += `\n`;
        }
      } else if (detection.riskLevel === 'high') {
        message += `⚠️ *${coin} is HIGH RISK!*\n\n`;
        
        // Special handling for Pi coin
        if (coin === 'PI' || coin.includes('PI')) {
          message += `Latest update on Pi coin:\n\n`;
          message += `✅ *Good news:*\n`;
          message += `• Pi coin is now listed on some exchanges (OKX, Huobi, etc.)\n`;
          message += `• Not a complete scam anymore\n\n`;
          message += `⚠️ *But be careful:*\n`;
          message += `• Not listed on major exchanges (Binance, Coinbase)\n`;
          message += `• Extremely volatile, high risk\n`;
          message += `• Many scammers impersonate Pi official\n\n`;
        } else {
          message += `This coin is not listed on Binance yet. Be careful.\n\n`;
        }
      }
      
      if (detection.warnings.length > 0) {
        message += `⚠️ *Warnings:*\n`;
        detection.warnings.forEach(warning => {
          message += `• ${warning}\n`;
        });
        message += `\n`;
      }
      
      if (detection.risks && detection.risks.length > 0) {
        message += `🚨 *Main Risks:*\n`;
        detection.risks.forEach(risk => {
          message += `• ${risk}\n`;
        });
        message += `\n`;
      }
      
      if (detection.advice.length > 0) {
        message += `💡 *Safety Tips:*\n`;
        detection.advice.forEach(advice => {
          message += `• ${advice}\n`;
        });
        message += `\n`;
      }
      
      message += `\n🛡️ *Remember:*\n`;
      message += `1. Don't trust private messages\n`;
      message += `2. Don't transfer to personal accounts\n`;
      message += `3. Only trade on legitimate exchanges\n\n`;
      message += `Ask me if you have questions!`;
      
      return message;
    }
  }
}

module.exports = ScamDetector;
