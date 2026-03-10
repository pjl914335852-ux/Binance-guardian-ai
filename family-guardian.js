#!/usr/bin/env node

/**
 * 币安守护者 AI - 家人监护模式
 * 子女可以远程监控父母的交易，高风险操作自动通知
 */

const fs = require('fs');
const path = require('path');

// 监护关系数据库（实际应该用数据库，这里用 JSON 文件演示）
const GUARDIAN_DB_PATH = path.join(__dirname, 'data', 'guardians.json');

// 风险等级定义
const RISK_LEVELS = {
  LOW: { level: 1, name: '低风险', color: '🟢' },
  MEDIUM: { level: 2, name: '中风险', color: '🟡' },
  HIGH: { level: 3, name: '高风险', color: '🟠' },
  CRITICAL: { level: 4, name: '极高风险', color: '🔴' }
};

// 风险规则
const RISK_RULES = {
  // 单笔交易金额占总资产比例
  singleTradeRatio: {
    low: 0.05,      // < 5%
    medium: 0.15,   // 5-15%
    high: 0.30,     // 15-30%
    critical: 0.30  // > 30%
  },
  
  // 币种风险等级
  coinRisk: {
    btc: 'LOW',
    eth: 'LOW',
    bnb: 'LOW',
    usdt: 'LOW',
    usdc: 'LOW',
    // 主流币
    sol: 'MEDIUM',
    ada: 'MEDIUM',
    dot: 'MEDIUM',
    // 山寨币默认高风险
    default: 'HIGH'
  },
  
  // 操作类型风险
  operationRisk: {
    spot_buy: 'LOW',
    spot_sell: 'LOW',
    futures_open: 'HIGH',
    futures_close: 'MEDIUM',
    margin_borrow: 'HIGH',
    withdraw: 'MEDIUM',
    transfer: 'LOW'
  }
};

// 初始化数据目录
function initDataDir() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(GUARDIAN_DB_PATH)) {
    fs.writeFileSync(GUARDIAN_DB_PATH, JSON.stringify({ relationships: [] }, null, 2));
  }
}

// 读取监护关系
function loadGuardians() {
  initDataDir();
  const data = fs.readFileSync(GUARDIAN_DB_PATH, 'utf8');
  return JSON.parse(data);
}

// 保存监护关系
function saveGuardians(data) {
  fs.writeFileSync(GUARDIAN_DB_PATH, JSON.stringify(data, null, 2));
}

// 添加监护关系
function addGuardianRelationship(elderUserId, guardianUserId, elderName, guardianName) {
  const db = loadGuardians();
  
  // 检查是否已存在
  const existing = db.relationships.find(
    r => r.elderUserId === elderUserId && r.guardianUserId === guardianUserId
  );
  
  if (existing) {
    return { success: false, message: '监护关系已存在' };
  }
  
  db.relationships.push({
    elderUserId,
    guardianUserId,
    elderName,
    guardianName,
    createdAt: new Date().toISOString(),
    enabled: true,
    riskThreshold: 'MEDIUM' // 默认中风险及以上通知
  });
  
  saveGuardians(db);
  return { success: true, message: '监护关系添加成功' };
}

// 移除监护关系
function removeGuardianRelationship(elderUserId, guardianUserId) {
  const db = loadGuardians();
  db.relationships = db.relationships.filter(
    r => !(r.elderUserId === elderUserId && r.guardianUserId === guardianUserId)
  );
  saveGuardians(db);
  return { success: true, message: '监护关系已移除' };
}

// 获取用户的监护人列表
function getGuardiansForElder(elderUserId) {
  const db = loadGuardians();
  return db.relationships.filter(r => r.elderUserId === elderUserId && r.enabled);
}

// 获取用户监护的长辈列表
function getEldersForGuardian(guardianUserId) {
  const db = loadGuardians();
  return db.relationships.filter(r => r.guardianUserId === guardianUserId && r.enabled);
}

// 评估交易风险
function assessTradeRisk(trade, userBalance) {
  const risks = [];
  let maxRiskLevel = RISK_LEVELS.LOW;
  
  // 1. 检查交易金额占比
  const tradeRatio = trade.amount / userBalance;
  if (tradeRatio > RISK_RULES.singleTradeRatio.critical) {
    risks.push({
      type: 'amount',
      level: RISK_LEVELS.CRITICAL,
      message: `单笔交易金额过大（${(tradeRatio * 100).toFixed(1)}% 总资产）`
    });
    maxRiskLevel = RISK_LEVELS.CRITICAL;
  } else if (tradeRatio > RISK_RULES.singleTradeRatio.high) {
    risks.push({
      type: 'amount',
      level: RISK_LEVELS.HIGH,
      message: `单笔交易金额较大（${(tradeRatio * 100).toFixed(1)}% 总资产）`
    });
    if (maxRiskLevel.level < RISK_LEVELS.HIGH.level) maxRiskLevel = RISK_LEVELS.HIGH;
  } else if (tradeRatio > RISK_RULES.singleTradeRatio.medium) {
    risks.push({
      type: 'amount',
      level: RISK_LEVELS.MEDIUM,
      message: `单笔交易金额中等（${(tradeRatio * 100).toFixed(1)}% 总资产）`
    });
    if (maxRiskLevel.level < RISK_LEVELS.MEDIUM.level) maxRiskLevel = RISK_LEVELS.MEDIUM;
  }
  
  // 2. 检查币种风险
  const coinSymbol = trade.symbol.toLowerCase();
  const coinRiskLevel = RISK_RULES.coinRisk[coinSymbol] || RISK_RULES.coinRisk.default;
  const coinRisk = RISK_LEVELS[coinRiskLevel];
  
  if (coinRisk.level >= RISK_LEVELS.MEDIUM.level) {
    risks.push({
      type: 'coin',
      level: coinRisk,
      message: `${trade.symbol} 是${coinRisk.name}币种`
    });
    if (maxRiskLevel.level < coinRisk.level) maxRiskLevel = coinRisk;
  }
  
  // 3. 检查操作类型风险
  const opRiskLevel = RISK_RULES.operationRisk[trade.operation] || 'MEDIUM';
  const opRisk = RISK_LEVELS[opRiskLevel];
  
  if (opRisk.level >= RISK_LEVELS.HIGH.level) {
    risks.push({
      type: 'operation',
      level: opRisk,
      message: `${trade.operation} 是${opRisk.name}操作`
    });
    if (maxRiskLevel.level < opRisk.level) maxRiskLevel = opRisk;
  }
  
  return {
    riskLevel: maxRiskLevel,
    risks,
    shouldNotify: maxRiskLevel.level >= RISK_LEVELS.MEDIUM.level
  };
}

// 生成风险通知消息
function generateRiskNotification(elderName, trade, riskAssessment) {
  const { riskLevel, risks } = riskAssessment;
  
  let message = `${riskLevel.color} 家人监护提醒\n\n`;
  message += `您监护的 ${elderName} 正在进行一笔交易：\n\n`;
  message += `📊 交易详情：\n`;
  message += `• 币种：${trade.symbol}\n`;
  message += `• 操作：${trade.operation}\n`;
  message += `• 金额：${trade.amount} USDT\n`;
  message += `• 时间：${new Date(trade.timestamp).toLocaleString('zh-CN')}\n\n`;
  message += `⚠️ 风险评估：${riskLevel.name}\n\n`;
  
  if (risks.length > 0) {
    message += `风险因素：\n`;
    risks.forEach(risk => {
      message += `${risk.level.color} ${risk.message}\n`;
    });
  }
  
  message += `\n💡 建议：\n`;
  if (riskLevel.level >= RISK_LEVELS.HIGH.level) {
    message += `• 建议立即联系 ${elderName} 确认交易意图\n`;
    message += `• 警惕可能的诈骗或误操作\n`;
    message += `• 如有疑问，请使用紧急求助功能\n`;
  } else {
    message += `• 建议关注交易结果\n`;
    message += `• 提醒 ${elderName} 注意风险管理\n`;
  }
  
  return message;
}

// 监控交易并通知监护人
async function monitorTradeAndNotify(elderUserId, trade, userBalance) {
  // 获取监护人列表
  const guardians = getGuardiansForElder(elderUserId);
  
  if (guardians.length === 0) {
    return { notified: false, message: '无监护人' };
  }
  
  // 评估风险
  const riskAssessment = assessTradeRisk(trade, userBalance);
  
  // 检查是否需要通知
  if (!riskAssessment.shouldNotify) {
    return { notified: false, message: '风险等级低，无需通知' };
  }
  
  // 通知所有监护人
  const notifications = [];
  for (const guardian of guardians) {
    // 检查风险阈值
    const thresholdLevel = RISK_LEVELS[guardian.riskThreshold];
    if (riskAssessment.riskLevel.level < thresholdLevel.level) {
      continue;
    }
    
    const message = generateRiskNotification(guardian.elderName, trade, riskAssessment);
    
    // 这里应该调用 Telegram API 发送消息
    // 示例：await sendTelegramMessage(guardian.guardianUserId, message);
    
    notifications.push({
      guardianUserId: guardian.guardianUserId,
      guardianName: guardian.guardianName,
      message,
      timestamp: new Date().toISOString()
    });
    
    console.log(`\n📨 通知监护人: ${guardian.guardianName}`);
    console.log(message);
  }
  
  return {
    notified: true,
    count: notifications.length,
    notifications,
    riskLevel: riskAssessment.riskLevel.name
  };
}

// 命令行接口
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'add') {
    // 添加监护关系
    // node family-guardian.js add <elderUserId> <guardianUserId> <elderName> <guardianName>
    const [elderUserId, guardianUserId, elderName, guardianName] = process.argv.slice(3);
    const result = addGuardianRelationship(elderUserId, guardianUserId, elderName, guardianName);
    console.log(result.message);
    
  } else if (command === 'remove') {
    // 移除监护关系
    // node family-guardian.js remove <elderUserId> <guardianUserId>
    const [elderUserId, guardianUserId] = process.argv.slice(3);
    const result = removeGuardianRelationship(elderUserId, guardianUserId);
    console.log(result.message);
    
  } else if (command === 'list') {
    // 列出监护关系
    // node family-guardian.js list <userId> [elder|guardian]
    const [userId, role = 'guardian'] = process.argv.slice(3);
    
    if (role === 'elder') {
      const guardians = getGuardiansForElder(userId);
      console.log(`\n👨‍👩‍👧‍👦 ${userId} 的监护人列表：`);
      guardians.forEach(g => {
        console.log(`• ${g.guardianName} (${g.guardianUserId}) - 阈值: ${g.riskThreshold}`);
      });
    } else {
      const elders = getEldersForGuardian(userId);
      console.log(`\n👴👵 ${userId} 监护的长辈列表：`);
      elders.forEach(e => {
        console.log(`• ${e.elderName} (${e.elderUserId}) - 阈值: ${e.riskThreshold}`);
      });
    }
    
  } else if (command === 'test') {
    // 测试风险评估
    // node family-guardian.js test
    const testTrade = {
      symbol: 'DOGE',
      operation: 'spot_buy',
      amount: 5000,
      timestamp: Date.now()
    };
    const userBalance = 10000;
    
    console.log('\n🧪 测试风险评估：');
    console.log('交易:', testTrade);
    console.log('总资产:', userBalance, 'USDT');
    
    const assessment = assessTradeRisk(testTrade, userBalance);
    console.log('\n风险评估结果:');
    console.log('• 风险等级:', assessment.riskLevel.color, assessment.riskLevel.name);
    console.log('• 是否通知:', assessment.shouldNotify ? '是' : '否');
    console.log('• 风险因素:');
    assessment.risks.forEach(r => {
      console.log(`  ${r.level.color} ${r.message}`);
    });
    
    // 测试通知
    console.log('\n📨 测试通知消息：');
    const message = generateRiskNotification('张阿姨', testTrade, assessment);
    console.log(message);
    
  } else {
    console.log(`
币安守护者 AI - 家人监护模式

用法:
  node family-guardian.js add <elderUserId> <guardianUserId> <elderName> <guardianName>
    添加监护关系
    
  node family-guardian.js remove <elderUserId> <guardianUserId>
    移除监护关系
    
  node family-guardian.js list <userId> [elder|guardian]
    列出监护关系
    
  node family-guardian.js test
    测试风险评估和通知

示例:
  node family-guardian.js add 123456 789012 "张阿姨" "小明"
  node family-guardian.js list 789012 guardian
  node family-guardian.js test
    `);
  }
}

module.exports = {
  addGuardianRelationship,
  removeGuardianRelationship,
  getGuardiansForElder,
  getEldersForGuardian,
  assessTradeRisk,
  generateRiskNotification,
  monitorTradeAndNotify,
  RISK_LEVELS,
  RISK_RULES
};
