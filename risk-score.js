#!/usr/bin/env node

/**
 * 币安守护者 AI - 智能风险评分
 * 整合多个 Binance Skills，综合评估币种风险
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 风险评分权重
const RISK_WEIGHTS = {
  audit: 0.40,      // 安全审计 40%
  market: 0.30,     // 市场排名 30%
  info: 0.20,       // 代币信息 20%
  scam: 0.10        // 骗局数据库 10%
};

// 评分等级
const SCORE_LEVELS = {
  SAFE: { min: 80, max: 100, level: '安全', color: '🟢', advice: '相对安全的投资选择' },
  LOW_RISK: { min: 60, max: 79, level: '低风险', color: '🟡', advice: '可以考虑，但要控制仓位' },
  MEDIUM_RISK: { min: 40, max: 59, level: '中风险', color: '🟠', advice: '谨慎投资，做好风险管理' },
  HIGH_RISK: { min: 20, max: 39, level: '高风险', color: '🔴', advice: '不建议投资，风险极高' },
  CRITICAL: { min: 0, max: 19, level: '极高风险', color: '⛔', advice: '强烈不建议，可能是骗局' }
};

// 本地骗局数据库（从 scam-detector.js 导入）
const KNOWN_SCAMS = [
  'pi', 'picoin', 'pinetwork',
  'squid', 'squidgame',
  'luna', 'ust',
  'ftt', 'ftx'
];

// 评估安全审计分数（模拟 token-audit）
function assessAuditScore(symbol) {
  // 实际应该调用 Binance Skills 的 token-audit
  // 这里用模拟数据
  
  const symbolLower = symbol.toLowerCase();
  
  // 主流币高分
  if (['btc', 'eth', 'bnb', 'usdt', 'usdc'].includes(symbolLower)) {
    return {
      score: 95,
      details: {
        contract: '已审计',
        team: '公开透明',
        liquidity: '充足',
        holders: '分散'
      }
    };
  }
  
  // 已知骗局 0 分
  if (KNOWN_SCAMS.includes(symbolLower)) {
    return {
      score: 0,
      details: {
        contract: '未审计或有问题',
        team: '匿名或可疑',
        liquidity: '不足',
        holders: '高度集中'
      }
    };
  }
  
  // 其他币种中等分数
  return {
    score: 50,
    details: {
      contract: '部分审计',
      team: '部分公开',
      liquidity: '一般',
      holders: '较分散'
    }
  };
}

// 评估市场排名分数（模拟 crypto-market-rank）
function assessMarketScore(symbol) {
  // 实际应该调用 Binance Skills 的 crypto-market-rank
  
  const symbolLower = symbol.toLowerCase();
  
  // 主流币高分
  const mainCoins = {
    'btc': { rank: 1, score: 100 },
    'eth': { rank: 2, score: 98 },
    'bnb': { rank: 4, score: 95 },
    'usdt': { rank: 3, score: 95 },
    'usdc': { rank: 5, score: 93 }
  };
  
  if (mainCoins[symbolLower]) {
    return {
      score: mainCoins[symbolLower].score,
      details: {
        rank: mainCoins[symbolLower].rank,
        marketCap: '> $100B',
        volume24h: '> $10B',
        exchanges: '100+'
      }
    };
  }
  
  // 已知骗局 0 分
  if (KNOWN_SCAMS.includes(symbolLower)) {
    return {
      score: 0,
      details: {
        rank: 'N/A',
        marketCap: '未知或归零',
        volume24h: '极低',
        exchanges: '很少或下架'
      }
    };
  }
  
  // 其他币种
  return {
    score: 40,
    details: {
      rank: '100+',
      marketCap: '< $1B',
      volume24h: '< $100M',
      exchanges: '10-50'
    }
  };
}

// 评估代币信息分数（模拟 query-token-info）
function assessInfoScore(symbol) {
  // 实际应该调用 Binance Skills 的 query-token-info
  
  const symbolLower = symbol.toLowerCase();
  
  // 主流币高分
  if (['btc', 'eth', 'bnb', 'usdt', 'usdc'].includes(symbolLower)) {
    return {
      score: 90,
      details: {
        website: '有官网',
        whitepaper: '有白皮书',
        community: '活跃',
        development: '持续开发'
      }
    };
  }
  
  // 已知骗局 0 分
  if (KNOWN_SCAMS.includes(symbolLower)) {
    return {
      score: 0,
      details: {
        website: '无或关闭',
        whitepaper: '无或抄袭',
        community: '死寂',
        development: '停止'
      }
    };
  }
  
  // 其他币种
  return {
    score: 50,
    details: {
      website: '有',
      whitepaper: '有',
      community: '一般',
      development: '缓慢'
    }
  };
}

// 检查骗局数据库
function checkScamDatabase(symbol) {
  const symbolLower = symbol.toLowerCase();
  
  if (KNOWN_SCAMS.includes(symbolLower)) {
    return {
      score: 0,
      isScam: true,
      reason: '已知骗局或高风险项目'
    };
  }
  
  return {
    score: 100,
    isScam: false,
    reason: '未在骗局数据库中'
  };
}

// 综合评分
function calculateRiskScore(symbol) {
  console.log(`\n🔍 正在评估 ${symbol.toUpperCase()} 的风险...\n`);
  
  // 1. 安全审计
  const audit = assessAuditScore(symbol);
  console.log(`📋 安全审计: ${audit.score}/100`);
  
  // 2. 市场排名
  const market = assessMarketScore(symbol);
  console.log(`📊 市场排名: ${market.score}/100`);
  
  // 3. 代币信息
  const info = assessInfoScore(symbol);
  console.log(`ℹ️  代币信息: ${info.score}/100`);
  
  // 4. 骗局检查
  const scam = checkScamDatabase(symbol);
  console.log(`🚨 骗局检查: ${scam.isScam ? '⚠️ 警告' : '✅ 通过'}`);
  
  // 计算加权总分
  const totalScore = Math.round(
    audit.score * RISK_WEIGHTS.audit +
    market.score * RISK_WEIGHTS.market +
    info.score * RISK_WEIGHTS.info +
    scam.score * RISK_WEIGHTS.scam
  );
  
  // 确定风险等级
  let level = SCORE_LEVELS.SAFE;
  for (const [key, value] of Object.entries(SCORE_LEVELS)) {
    if (totalScore >= value.min && totalScore <= value.max) {
      level = value;
      break;
    }
  }
  
  return {
    symbol: symbol.toUpperCase(),
    totalScore,
    level,
    breakdown: {
      audit,
      market,
      info,
      scam
    },
    timestamp: new Date().toISOString()
  };
}

// 生成风险报告
function generateRiskReport(assessment) {
  const { symbol, totalScore, level, breakdown } = assessment;
  
  let report = `\n${'='.repeat(60)}\n`;
  report += `${level.color} ${symbol} 风险评估报告\n`;
  report += `${'='.repeat(60)}\n\n`;
  
  report += `📊 综合评分: ${totalScore}/100\n`;
  report += `⚠️  风险等级: ${level.level}\n`;
  report += `💡 投资建议: ${level.advice}\n\n`;
  
  report += `${'─'.repeat(60)}\n`;
  report += `详细评分:\n\n`;
  
  report += `📋 安全审计 (权重 ${RISK_WEIGHTS.audit * 100}%):\n`;
  report += `   分数: ${breakdown.audit.score}/100\n`;
  Object.entries(breakdown.audit.details).forEach(([key, value]) => {
    report += `   • ${key}: ${value}\n`;
  });
  
  report += `\n📊 市场排名 (权重 ${RISK_WEIGHTS.market * 100}%):\n`;
  report += `   分数: ${breakdown.market.score}/100\n`;
  Object.entries(breakdown.market.details).forEach(([key, value]) => {
    report += `   • ${key}: ${value}\n`;
  });
  
  report += `\nℹ️  代币信息 (权重 ${RISK_WEIGHTS.info * 100}%):\n`;
  report += `   分数: ${breakdown.info.score}/100\n`;
  Object.entries(breakdown.info.details).forEach(([key, value]) => {
    report += `   • ${key}: ${value}\n`;
  });
  
  report += `\n🚨 骗局检查 (权重 ${RISK_WEIGHTS.scam * 100}%):\n`;
  report += `   ${breakdown.scam.isScam ? '⚠️ 警告' : '✅ 通过'}: ${breakdown.scam.reason}\n`;
  
  report += `\n${'='.repeat(60)}\n`;
  report += `生成时间: ${new Date(assessment.timestamp).toLocaleString('zh-CN')}\n`;
  report += `${'='.repeat(60)}\n`;
  
  return report;
}

// 保存评估结果
function saveAssessment(assessment) {
  const assessmentsDir = path.join(__dirname, 'assessments');
  if (!fs.existsSync(assessmentsDir)) {
    fs.mkdirSync(assessmentsDir, { recursive: true });
  }
  
  const filename = `${assessment.symbol.toLowerCase()}-${Date.now()}.json`;
  const filepath = path.join(assessmentsDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(assessment, null, 2));
  console.log(`\n✅ 评估结果已保存: ${filepath}`);
  
  return filepath;
}

// 命令行接口
if (require.main === module) {
  const symbol = process.argv[2];
  
  if (!symbol) {
    console.log(`
币安守护者 AI - 智能风险评分

用法:
  node risk-score.js <symbol>

示例:
  node risk-score.js BTC
  node risk-score.js DOGE
  node risk-score.js PI

评分维度:
  • 安全审计 (40%)
  • 市场排名 (30%)
  • 代币信息 (20%)
  • 骗局检查 (10%)

风险等级:
  🟢 安全 (80-100)
  🟡 低风险 (60-79)
  🟠 中风险 (40-59)
  🔴 高风险 (20-39)
  ⛔ 极高风险 (0-19)
    `);
    process.exit(1);
  }
  
  // 执行评估
  const assessment = calculateRiskScore(symbol);
  const report = generateRiskReport(assessment);
  
  console.log(report);
  
  // 保存结果
  saveAssessment(assessment);
}

module.exports = {
  calculateRiskScore,
  generateRiskReport,
  saveAssessment,
  SCORE_LEVELS,
  RISK_WEIGHTS
};
