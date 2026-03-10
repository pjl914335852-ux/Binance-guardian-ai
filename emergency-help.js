#!/usr/bin/env node

/**
 * 币安守护者 AI - 紧急求助系统
 * 用户遇到可疑情况，一键求助，社区专家响应
 */

const fs = require('fs');
const path = require('path');

// 求助请求数据库路径
const HELP_DB_PATH = path.join(__dirname, 'data', 'help-requests.json');

// 求助类型
const HELP_TYPES = {
  SCAM: { id: 'scam', name: '疑似骗局', priority: 'high', emoji: '🚨' },
  TRANSACTION: { id: 'transaction', name: '交易问题', priority: 'medium', emoji: '💸' },
  ACCOUNT: { id: 'account', name: '账户安全', priority: 'high', emoji: '🔒' },
  TECHNICAL: { id: 'technical', name: '技术问题', priority: 'low', emoji: '🔧' },
  OTHER: { id: 'other', name: '其他问题', priority: 'medium', emoji: '❓' }
};

// 求助状态
const HELP_STATUS = {
  PENDING: { id: 'pending', name: '等待响应', color: '🟡' },
  ASSIGNED: { id: 'assigned', name: '已分配', color: '🟠' },
  RESPONDING: { id: 'responding', name: '处理中', color: '🔵' },
  RESOLVED: { id: 'resolved', name: '已解决', color: '🟢' },
  CLOSED: { id: 'closed', name: '已关闭', color: '⚫' }
};

// 初始化数据目录
function initDataDir() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(HELP_DB_PATH)) {
    fs.writeFileSync(HELP_DB_PATH, JSON.stringify({ requests: [], experts: [] }, null, 2));
  }
}

// 读取求助数据库
function loadHelpDB() {
  initDataDir();
  const data = fs.readFileSync(HELP_DB_PATH, 'utf8');
  return JSON.parse(data);
}

// 保存求助数据库
function saveHelpDB(data) {
  fs.writeFileSync(HELP_DB_PATH, JSON.stringify(data, null, 2));
}

// 创建求助请求
function createHelpRequest(userId, userName, type, description, attachments = []) {
  const db = loadHelpDB();
  
  const helpType = HELP_TYPES[type.toUpperCase()] || HELP_TYPES.OTHER;
  
  const request = {
    id: `help_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    userName,
    type: helpType.id,
    typeName: helpType.name,
    priority: helpType.priority,
    description,
    attachments,
    status: HELP_STATUS.PENDING.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assignedTo: null,
    responses: [],
    resolvedAt: null
  };
  
  db.requests.push(request);
  saveHelpDB(db);
  
  console.log(`\n${helpType.emoji} 紧急求助请求已创建`);
  console.log(`请求 ID: ${request.id}`);
  console.log(`类型: ${helpType.name}`);
  console.log(`优先级: ${helpType.priority}`);
  
  // 通知社区专家
  notifyExperts(request);
  
  return request;
}

// 通知社区专家
function notifyExperts(request) {
  const db = loadHelpDB();
  const helpType = HELP_TYPES[request.type.toUpperCase()];
  
  console.log(`\n📢 正在通知社区专家...`);
  
  // 根据优先级和类型选择专家
  const availableExperts = db.experts.filter(e => 
    e.available && 
    (e.specialties.includes(request.type) || e.specialties.includes('all'))
  );
  
  if (availableExperts.length === 0) {
    console.log(`⚠️  当前没有可用的专家，请求将进入等待队列`);
    return;
  }
  
  console.log(`✅ 找到 ${availableExperts.length} 位可用专家`);
  
  // 生成通知消息
  const message = generateExpertNotification(request);
  
  // 实际应该通过 Telegram 发送给专家
  // 这里只是模拟
  availableExperts.forEach(expert => {
    console.log(`\n📨 通知专家: ${expert.name} (${expert.userId})`);
    console.log(message);
  });
  
  return availableExperts;
}

// 生成专家通知消息
function generateExpertNotification(request) {
  const helpType = HELP_TYPES[request.type.toUpperCase()];
  const status = HELP_STATUS[request.status.toUpperCase()];
  
  let message = `${helpType.emoji} 紧急求助通知\n\n`;
  message += `${status.color} 状态: ${status.name}\n`;
  message += `🆔 请求 ID: ${request.id}\n`;
  message += `👤 用户: ${request.userName}\n`;
  message += `📋 类型: ${helpType.name}\n`;
  message += `⚡ 优先级: ${request.priority}\n`;
  message += `🕐 时间: ${new Date(request.createdAt).toLocaleString('zh-CN')}\n\n`;
  message += `📝 描述:\n${request.description}\n\n`;
  
  if (request.attachments.length > 0) {
    message += `📎 附件: ${request.attachments.length} 个\n\n`;
  }
  
  message += `💡 请在 5 分钟内响应此请求\n`;
  message += `回复 /accept ${request.id} 接受此请求`;
  
  return message;
}

// 专家接受请求
function acceptRequest(requestId, expertId, expertName) {
  const db = loadHelpDB();
  const request = db.requests.find(r => r.id === requestId);
  
  if (!request) {
    return { success: false, message: '请求不存在' };
  }
  
  if (request.status !== HELP_STATUS.PENDING.id) {
    return { success: false, message: '请求已被其他专家接受' };
  }
  
  request.status = HELP_STATUS.ASSIGNED.id;
  request.assignedTo = { id: expertId, name: expertName };
  request.updatedAt = new Date().toISOString();
  
  saveHelpDB(db);
  
  console.log(`\n✅ 专家 ${expertName} 已接受请求 ${requestId}`);
  
  // 通知用户
  const userMessage = `✅ 您的求助请求已被专家 ${expertName} 接受，正在为您处理...`;
  console.log(`\n📨 通知用户: ${request.userName}`);
  console.log(userMessage);
  
  return { success: true, message: '请求已接受', request };
}

// 添加响应
function addResponse(requestId, responderId, responderName, message) {
  const db = loadHelpDB();
  const request = db.requests.find(r => r.id === requestId);
  
  if (!request) {
    return { success: false, message: '请求不存在' };
  }
  
  const response = {
    id: `resp_${Date.now()}`,
    responderId,
    responderName,
    message,
    timestamp: new Date().toISOString()
  };
  
  request.responses.push(response);
  request.status = HELP_STATUS.RESPONDING.id;
  request.updatedAt = new Date().toISOString();
  
  saveHelpDB(db);
  
  console.log(`\n💬 ${responderName} 回复了请求 ${requestId}`);
  
  // 通知用户
  console.log(`\n📨 通知用户: ${request.userName}`);
  console.log(`专家回复: ${message}`);
  
  return { success: true, response };
}

// 解决请求
function resolveRequest(requestId, resolution) {
  const db = loadHelpDB();
  const request = db.requests.find(r => r.id === requestId);
  
  if (!request) {
    return { success: false, message: '请求不存在' };
  }
  
  request.status = HELP_STATUS.RESOLVED.id;
  request.resolution = resolution;
  request.resolvedAt = new Date().toISOString();
  request.updatedAt = new Date().toISOString();
  
  saveHelpDB(db);
  
  console.log(`\n✅ 请求 ${requestId} 已解决`);
  
  // 通知用户
  const userMessage = `✅ 您的求助请求已解决\n\n解决方案:\n${resolution}`;
  console.log(`\n📨 通知用户: ${request.userName}`);
  console.log(userMessage);
  
  return { success: true, request };
}

// 注册专家
function registerExpert(userId, userName, specialties = ['all']) {
  const db = loadHelpDB();
  
  const existing = db.experts.find(e => e.userId === userId);
  if (existing) {
    return { success: false, message: '专家已注册' };
  }
  
  const expert = {
    userId,
    userName,
    specialties,
    available: true,
    registeredAt: new Date().toISOString(),
    resolvedCount: 0,
    rating: 5.0
  };
  
  db.experts.push(expert);
  saveHelpDB(db);
  
  console.log(`\n✅ 专家 ${userName} 注册成功`);
  console.log(`专长: ${specialties.join(', ')}`);
  
  return { success: true, expert };
}

// 获取待处理请求
function getPendingRequests() {
  const db = loadHelpDB();
  return db.requests.filter(r => r.status === HELP_STATUS.PENDING.id);
}

// 获取用户的请求历史
function getUserRequests(userId) {
  const db = loadHelpDB();
  return db.requests.filter(r => r.userId === userId);
}

// 生成求助统计
function generateStats() {
  const db = loadHelpDB();
  
  const stats = {
    total: db.requests.length,
    pending: db.requests.filter(r => r.status === HELP_STATUS.PENDING.id).length,
    assigned: db.requests.filter(r => r.status === HELP_STATUS.ASSIGNED.id).length,
    responding: db.requests.filter(r => r.status === HELP_STATUS.RESPONDING.id).length,
    resolved: db.requests.filter(r => r.status === HELP_STATUS.RESOLVED.id).length,
    experts: db.experts.length,
    availableExperts: db.experts.filter(e => e.available).length
  };
  
  // 平均响应时间
  const resolvedRequests = db.requests.filter(r => r.resolvedAt);
  if (resolvedRequests.length > 0) {
    const totalTime = resolvedRequests.reduce((sum, r) => {
      const created = new Date(r.createdAt);
      const resolved = new Date(r.resolvedAt);
      return sum + (resolved - created);
    }, 0);
    stats.avgResponseTimeMinutes = Math.round(totalTime / resolvedRequests.length / 60000);
  } else {
    stats.avgResponseTimeMinutes = 0;
  }
  
  return stats;
}

// 命令行接口
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'create') {
    // 创建求助请求
    // node emergency-help.js create <userId> <userName> <type> <description>
    const [userId, userName, type, ...descParts] = process.argv.slice(3);
    const description = descParts.join(' ');
    
    if (!userId || !userName || !type || !description) {
      console.log('用法: node emergency-help.js create <userId> <userName> <type> <description>');
      console.log('类型: scam, transaction, account, technical, other');
      process.exit(1);
    }
    
    createHelpRequest(userId, userName, type, description);
    
  } else if (command === 'accept') {
    // 接受请求
    // node emergency-help.js accept <requestId> <expertId> <expertName>
    const [requestId, expertId, expertName] = process.argv.slice(3);
    acceptRequest(requestId, expertId, expertName);
    
  } else if (command === 'respond') {
    // 添加响应
    // node emergency-help.js respond <requestId> <expertId> <expertName> <message>
    const [requestId, expertId, expertName, ...msgParts] = process.argv.slice(3);
    const message = msgParts.join(' ');
    addResponse(requestId, expertId, expertName, message);
    
  } else if (command === 'resolve') {
    // 解决请求
    // node emergency-help.js resolve <requestId> <resolution>
    const [requestId, ...resParts] = process.argv.slice(3);
    const resolution = resParts.join(' ');
    resolveRequest(requestId, resolution);
    
  } else if (command === 'register') {
    // 注册专家
    // node emergency-help.js register <userId> <userName> [specialties...]
    const [userId, userName, ...specialties] = process.argv.slice(3);
    registerExpert(userId, userName, specialties.length > 0 ? specialties : ['all']);
    
  } else if (command === 'pending') {
    // 查看待处理请求
    const pending = getPendingRequests();
    console.log(`\n📋 待处理请求 (${pending.length}):\n`);
    pending.forEach(r => {
      const helpType = HELP_TYPES[r.type.toUpperCase()];
      console.log(`${helpType.emoji} ${r.id}`);
      console.log(`   用户: ${r.userName}`);
      console.log(`   类型: ${r.typeName}`);
      console.log(`   时间: ${new Date(r.createdAt).toLocaleString('zh-CN')}\n`);
    });
    
  } else if (command === 'stats') {
    // 查看统计
    const stats = generateStats();
    console.log(`\n📊 紧急求助系统统计:\n`);
    console.log(`总请求数: ${stats.total}`);
    console.log(`待处理: ${stats.pending}`);
    console.log(`已分配: ${stats.assigned}`);
    console.log(`处理中: ${stats.responding}`);
    console.log(`已解决: ${stats.resolved}`);
    console.log(`\n专家数: ${stats.experts}`);
    console.log(`可用专家: ${stats.availableExperts}`);
    console.log(`\n平均响应时间: ${stats.avgResponseTimeMinutes} 分钟`);
    
  } else {
    console.log(`
币安守护者 AI - 紧急求助系统

用法:
  node emergency-help.js create <userId> <userName> <type> <description>
    创建求助请求
    
  node emergency-help.js accept <requestId> <expertId> <expertName>
    专家接受请求
    
  node emergency-help.js respond <requestId> <expertId> <expertName> <message>
    专家回复请求
    
  node emergency-help.js resolve <requestId> <resolution>
    解决请求
    
  node emergency-help.js register <userId> <userName> [specialties...]
    注册为专家
    
  node emergency-help.js pending
    查看待处理请求
    
  node emergency-help.js stats
    查看统计信息

求助类型:
  scam - 疑似骗局 (高优先级)
  transaction - 交易问题 (中优先级)
  account - 账户安全 (高优先级)
  technical - 技术问题 (低优先级)
  other - 其他问题 (中优先级)

示例:
  node emergency-help.js create 123456 "张阿姨" scam "收到可疑的空投链接"
  node emergency-help.js register 789012 "安全专家小李" scam account
  node emergency-help.js pending
  node emergency-help.js stats
    `);
  }
}

module.exports = {
  createHelpRequest,
  acceptRequest,
  addResponse,
  resolveRequest,
  registerExpert,
  getPendingRequests,
  getUserRequests,
  generateStats,
  HELP_TYPES,
  HELP_STATUS
};
