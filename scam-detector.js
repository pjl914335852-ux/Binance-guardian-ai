// scam-detector.js - 骗局识别模块
const ContractAnalyzer = require('./contract-analyzer');

class ScamDetector {
  constructor() {
    this.contractAnalyzer = new ContractAnalyzer();
    
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
        '交易所的 Pi 币（IOU）与手机挖矿的 Pi 可能无法直接互换',
        '警惕私下交易和场外交易的风险'
      ],
      risks: [
        '兑换困难：手机挖的币可能换不成钱',
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
    
    // 检测是否为合约地址
    const isContractAddress = /^0x[a-fA-F0-9]{40}$/.test(coinName.trim());
    
    if (isContractAddress) {
      // 如果是合约地址，调用合约检测逻辑
      return await this.detectScamByContract(coinName.trim(), context);
    }
    
    // 提取币种符号（去掉交易对后缀，但保留主流币）
    let coin = coinName.toUpperCase().trim();
    
    // 如果是交易对格式（如 ETHUSDT），提取基础币种
    if (coin.endsWith('USDT')) {
      coin = coin.replace('USDT', '');
    } else if (coin.endsWith('BUSD')) {
      coin = coin.replace('BUSD', '');
    } else if (coin.endsWith('USD')) {
      coin = coin.replace('USD', '');
    } else if (coin.endsWith('BTC')) {
      coin = coin.replace('BTC', '');
    }
    
    coin = coin.trim();
    
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
      result.advice.push('如果要交易，优先选择大平台（OKX、Huobi 等）');
      result.advice.push('警惕场外交易和私下购买，极易被骗');
      result.advice.push('不要相信"内部渠道"、"提前购买"等说法');
    }
    
    return result;
  }

  // 通过合约地址检测代币安全性
  async detectScamByContract(contractAddress, context = '') {
    const result = {
      isScam: false,
      riskLevel: 'medium',
      reasons: [],
      warnings: [],
      advice: [],
      contractInfo: {}
    };

    try {
      // 检查合约地址格式
      if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
        result.riskLevel = 'high';
        result.warnings.push('合约地址格式不正确');
        result.advice.push('请确认合约地址是否正确复制');
        return result;
      }

      // 调用合约分析器（使用免费 API）
      const analysis = await this.contractAnalyzer.analyzeContract(contractAddress, context);
      
      // 转换分析结果
      result.contractInfo = {
        address: analysis.address,
        network: analysis.network,
        verified: analysis.verified,
        contractName: analysis.contractName,
        txCount: analysis.txCount
      };
      
      result.riskLevel = analysis.riskLevel;
      result.reasons = analysis.risks;
      result.warnings = analysis.warnings;
      result.advice = analysis.advice;

      // 检查上下文中的诈骗关键词
      const contextLower = context.toLowerCase();
      const foundKeywords = this.scamKeywords.filter(keyword => 
        contextLower.includes(keyword.toLowerCase())
      );

      if (foundKeywords.length > 0) {
        result.riskLevel = 'critical';
        result.isScam = true;
        result.reasons.unshift(`⚠️ 消息中包含诈骗关键词：${foundKeywords.join(', ')}`);
      }

    } catch (error) {
      console.error('合约检测错误:', error);
      result.riskLevel = 'high';
      result.warnings.push('⚠️ API 查询失败，无法验证合约安全性');
      result.advice.push('请手动在 Etherscan/BSCScan 查看合约信息');
      result.advice.push('或稍后重试');
    }

    return result;
  }
  
  // 生成友好的警告消息（长辈模式）
  generateElderlyWarning(coinName, detection, lang = 'zh') {
    // 检查是否为合约地址
    const isContractAddress = /^0x[a-fA-F0-9]{40}$/.test(coinName.trim());
    const coin = isContractAddress ? '合约代币' : coinName.toUpperCase();
    
    if (lang === 'zh') {
      let message = `🛡️ *安全提醒*\n\n`;
      
      // 如果是合约地址，特殊处理
      if (isContractAddress) {
        message += `🔍 *合约安全分析*\n\n`;
        message += `合约地址：\`${coinName}\`\n`;
        
        // 显示网络信息
        if (detection.contractInfo.network) {
          const networkName = detection.contractInfo.network === 'bsc' ? 
            'BSC (币安智能链)' : 'Ethereum (以太坊)';
          message += `网络：${networkName}\n`;
        }
        
        // 显示合约名称
        if (detection.contractInfo.contractName && detection.contractInfo.contractName !== 'Unknown') {
          message += `合约名称：${detection.contractInfo.contractName}\n`;
        }
        
        message += `\n`;
        
        // 显示检测结果
        if (detection.reasons.length > 0) {
          message += `📊 *检测结果：*\n`;
          detection.reasons.forEach(reason => {
            message += `${reason}\n`;
          });
          message += `\n`;
        }
        
        // 显示风险提示
        if (detection.warnings.length > 0) {
          message += `⚠️ *风险提示：*\n`;
          detection.warnings.forEach(warning => {
            message += `• ${warning}\n`;
          });
          message += `\n`;
        }
        
        // 显示安全建议
        if (detection.advice.length > 0) {
          message += `💡 *安全建议：*\n`;
          detection.advice.forEach(advice => {
            message += `${advice}\n`;
          });
        }
        
        return message;
      }
      
      // 原有的币种检测逻辑
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
      } else if (detection.riskLevel === 'critical') {
        message += `⚠️ *${coin} 是诈骗币！*\n\n`;
        message += `妈，这个币千万不要买！\n\n`;
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
          message += `• 交易所的币跟手机挖的可能不能直接换\n`;
          message += `• 价格波动极大，风险很高\n`;
          message += `• 很多骗子冒充 Pi 官方进行诈骗\n\n`;
        } else {
          message += `这个币目前还没在大平台上线，要小心。\n\n`;
        }
      } else if (detection.riskLevel === 'medium') {
        message += `💡 *关于 ${coin}*\n\n`;
        message += `这个币已在币安上线，但不是主流币种。\n\n`;
      } else if (detection.riskLevel === 'low') {
        message += `✅ *${coin} 是安全的主流币*\n\n`;
        message += `这个币已在币安上线，可以放心交易。\n\n`;
      }
      
      if (detection.warnings.length > 0 && detection.riskLevel !== 'low') {
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
      
      if (detection.advice.length > 0 && detection.riskLevel !== 'low') {
        message += `💡 *安全建议：*\n`;
        detection.advice.forEach(advice => {
          message += `• ${advice}\n`;
        });
        message += `\n`;
      }
      
      // 通用安全提示（只在有风险时显示）
      if (detection.riskLevel !== 'low') {
        message += `\n🛡️ *记住三不原则：*\n`;
        message += `1. 不相信私聊推荐\n`;
        message += `2. 不转账到私人账户\n`;
        message += `3. 优先选择大平台交易\n\n`;
      }
      
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
      } else if (detection.riskLevel === 'critical') {
        message += `⚠️ *${coin} is a SCAM!*\n\n`;
        message += `DO NOT buy this coin!\n\n`;
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
          message += `• Exchange Pi (IOU) may not be directly convertible with mined Pi\n`;
          message += `• Extremely volatile, high risk\n`;
          message += `• Many scammers impersonate Pi official\n\n`;
        } else {
          message += `This coin is not listed on major platforms yet. Be careful.\n\n`;
        }
      } else if (detection.riskLevel === 'medium') {
        message += `💡 *About ${coin}*\n\n`;
        message += `This coin is listed on Binance, but not a mainstream coin.\n\n`;
      } else if (detection.riskLevel === 'low') {
        message += `✅ *${coin} is a safe mainstream coin*\n\n`;
        message += `This coin is listed on Binance and safe to trade.\n\n`;
      }
      
      if (detection.warnings.length > 0 && detection.riskLevel !== 'low') {
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
      
      if (detection.advice.length > 0 && detection.riskLevel !== 'low') {
        message += `💡 *Safety Tips:*\n`;
        detection.advice.forEach(advice => {
          message += `• ${advice}\n`;
        });
        message += `\n`;
      }
      
      if (detection.riskLevel !== 'low') {
        message += `\n🛡️ *Remember:*\n`;
        message += `1. Don't trust private messages\n`;
        message += `2. Don't transfer to personal accounts\n`;
        message += `3. Prefer major platforms for trading\n\n`;
      }
      
      message += `Ask me if you have questions!`;
      
      return message;
    }
  }

  // 计算详细的风险评分（0-100分）
  async calculateRiskScore(coinName) {
    await this.updateBinanceCoins();
    
    // 提取币种符号
    let coin = coinName.toUpperCase().trim();
    if (coin.endsWith('USDT')) {
      coin = coin.replace('USDT', '');
    } else if (coin.endsWith('BUSD')) {
      coin = coin.replace('BUSD', '');
    } else if (coin.endsWith('USD')) {
      coin = coin.replace('USD', '');
    } else if (coin.endsWith('BTC')) {
      coin = coin.replace('BTC', '');
    }
    coin = coin.trim();

    const result = {
      coin: coin,
      totalScore: 0,
      dimensions: {
        securityAudit: { score: 0, weight: 40, detail: '' },
        marketRanking: { score: 0, weight: 30, detail: '' },
        tokenInfo: { score: 0, weight: 20, detail: '' },
        scamCheck: { score: 0, weight: 10, detail: '' }
      },
      riskLevel: 'unknown',
      recommendations: []
    };

    // 1. 骗局检查（10%）- 最重要的否决项
    if (this.scamCoins.has(coin)) {
      result.dimensions.scamCheck.score = 0;
      result.dimensions.scamCheck.detail = '❌ 已确认骗局项目';
      result.totalScore = 0;
      result.riskLevel = 'critical';
      result.recommendations.push('⛔ 这是已确认的骗局项目，切勿投资！');
      return result;
    } else if (this.highRiskCoins.has(coin)) {
      result.dimensions.scamCheck.score = 30;
      result.dimensions.scamCheck.detail = '⚠️ 高风险项目（已崩盘或有重大问题）';
    } else if (coin === 'PI') {
      result.dimensions.scamCheck.score = 50;
      result.dimensions.scamCheck.detail = '⚠️ 争议项目（部分交易所上线，主流平台未上线）';
    } else {
      result.dimensions.scamCheck.score = 100;
      result.dimensions.scamCheck.detail = '✅ 未在骗局黑名单';
    }

    // 2. 币安上线检查（代币信息 20%）
    if (this.binanceCoins.has(coin)) {
      result.dimensions.tokenInfo.score = 100;
      result.dimensions.tokenInfo.detail = '✅ 已在币安上线';
    } else {
      result.dimensions.tokenInfo.score = 20;
      result.dimensions.tokenInfo.detail = '⚠️ 未在币安上线';
      result.recommendations.push('建议只交易币安已上线的币种');
    }

    // 3. 市场排名（30%）- 简化版，基于常见币种
    const topCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'AVAX', 'DOT', 'MATIC'];
    const midCoins = ['LINK', 'UNI', 'LTC', 'ATOM', 'XLM', 'ALGO', 'VET', 'FIL', 'SAND', 'MANA'];
    
    if (topCoins.includes(coin)) {
      result.dimensions.marketRanking.score = 100;
      result.dimensions.marketRanking.detail = '✅ Top 10 主流币';
    } else if (midCoins.includes(coin)) {
      result.dimensions.marketRanking.score = 70;
      result.dimensions.marketRanking.detail = '🟡 Top 50 知名币';
    } else if (this.binanceCoins.has(coin)) {
      result.dimensions.marketRanking.score = 50;
      result.dimensions.marketRanking.detail = '🟠 币安上线币种';
    } else {
      result.dimensions.marketRanking.score = 20;
      result.dimensions.marketRanking.detail = '🔴 小众币种';
    }

    // 4. 安全审计（40%）- 简化版
    const auditedCoins = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOT', 'AVAX', 'MATIC', 'LINK', 'UNI'];
    
    if (auditedCoins.includes(coin)) {
      result.dimensions.securityAudit.score = 100;
      result.dimensions.securityAudit.detail = '✅ 主流项目，经过多次审计';
    } else if (this.binanceCoins.has(coin)) {
      result.dimensions.securityAudit.score = 60;
      result.dimensions.securityAudit.detail = '🟡 币安上线需通过基础审核';
    } else {
      result.dimensions.securityAudit.score = 30;
      result.dimensions.securityAudit.detail = '⚠️ 无法确认审计状态';
      result.recommendations.push('建议查看 CertiK 或 SlowMist 审计报告');
    }

    // 计算总分
    result.totalScore = Math.round(
      (result.dimensions.securityAudit.score * result.dimensions.securityAudit.weight +
       result.dimensions.marketRanking.score * result.dimensions.marketRanking.weight +
       result.dimensions.tokenInfo.score * result.dimensions.tokenInfo.weight +
       result.dimensions.scamCheck.score * result.dimensions.scamCheck.weight) / 100
    );

    // 确定风险等级
    if (result.totalScore >= 80) {
      result.riskLevel = 'safe';
      result.recommendations.push('✅ 相对安全的投资选择');
    } else if (result.totalScore >= 60) {
      result.riskLevel = 'low';
      result.recommendations.push('🟡 风险较低，但仍需谨慎');
    } else if (result.totalScore >= 40) {
      result.riskLevel = 'medium';
      result.recommendations.push('🟠 中等风险，建议小额投资');
    } else if (result.totalScore >= 20) {
      result.riskLevel = 'high';
      result.recommendations.push('🔴 高风险，不建议新手投资');
    } else {
      result.riskLevel = 'critical';
      result.recommendations.push('⛔ 极高风险，强烈不建议投资');
    }

    return result;
  }

  // 格式化风险评分报告
  formatRiskScoreReport(scoreData, lang = 'zh') {
    if (lang === 'zh') {
      let message = `📊 *风险评分报告*\n\n`;
      message += `币种：*${scoreData.coin}*\n`;
      message += `综合评分：*${scoreData.totalScore}/100*\n\n`;

      // 风险等级
      const levelEmoji = {
        safe: '🟢',
        low: '🟡',
        medium: '🟠',
        high: '🔴',
        critical: '⛔'
      };
      const levelText = {
        safe: '安全',
        low: '低风险',
        medium: '中风险',
        high: '高风险',
        critical: '极高风险'
      };
      message += `风险等级：${levelEmoji[scoreData.riskLevel]} *${levelText[scoreData.riskLevel]}*\n\n`;

      // 各维度评分
      message += `📋 *详细评分：*\n\n`;
      
      message += `🔒 安全审计（${scoreData.dimensions.securityAudit.weight}%）\n`;
      message += `   评分：${scoreData.dimensions.securityAudit.score}/100\n`;
      message += `   ${scoreData.dimensions.securityAudit.detail}\n\n`;

      message += `📈 市场排名（${scoreData.dimensions.marketRanking.weight}%）\n`;
      message += `   评分：${scoreData.dimensions.marketRanking.score}/100\n`;
      message += `   ${scoreData.dimensions.marketRanking.detail}\n\n`;

      message += `💎 代币信息（${scoreData.dimensions.tokenInfo.weight}%）\n`;
      message += `   评分：${scoreData.dimensions.tokenInfo.score}/100\n`;
      message += `   ${scoreData.dimensions.tokenInfo.detail}\n\n`;

      message += `🛡️ 骗局检查（${scoreData.dimensions.scamCheck.weight}%）\n`;
      message += `   评分：${scoreData.dimensions.scamCheck.score}/100\n`;
      message += `   ${scoreData.dimensions.scamCheck.detail}\n\n`;

      // 建议
      if (scoreData.recommendations.length > 0) {
        message += `💡 *投资建议：*\n`;
        scoreData.recommendations.forEach(rec => {
          message += `${rec}\n`;
        });
      }

      return message;
    } else {
      // English version (simplified)
      let message = `📊 *Risk Score Report*\n\n`;
      message += `Coin: *${scoreData.coin}*\n`;
      message += `Total Score: *${scoreData.totalScore}/100*\n\n`;
      message += `Risk Level: *${scoreData.riskLevel.toUpperCase()}*\n\n`;
      
      message += `📋 *Detailed Scores:*\n`;
      message += `Security Audit: ${scoreData.dimensions.securityAudit.score}/100\n`;
      message += `Market Ranking: ${scoreData.dimensions.marketRanking.score}/100\n`;
      message += `Token Info: ${scoreData.dimensions.tokenInfo.score}/100\n`;
      message += `Scam Check: ${scoreData.dimensions.scamCheck.score}/100\n`;
      
      return message;
    }
  }
}

module.exports = ScamDetector;
