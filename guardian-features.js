#!/usr/bin/env node

/**
 * 币安守护者 AI - 新功能集成
 * 将语音播报、风险评分、紧急求助等功能集成到 Bot
 */

const { execSync } = require('child_process');
const path = require('path');

// 导入新功能模块
const VoiceSafetyReport = require('./voice-safety-report');
const RiskScore = require('./risk-score');
const EmergencyHelp = require('./emergency-help');
const FamilyGuardian = require('./family-guardian');
const ScamCases = require('./scam-cases');

class GuardianFeatures {
  constructor(bot, config, lang = 'zh') {
    this.bot = bot;
    this.config = config;
    this.lang = lang;
  }
  
  // 注册新命令
  registerCommands() {
    // /voice - 语音安全播报
    this.bot.onText(/\/voice/, (msg) => {
      this.handleVoiceReport(msg);
    });
    
    // /risk <币种> - 智能风险评分
    this.bot.onText(/\/risk (.+)/, (msg, match) => {
      this.handleRiskScore(msg, match[1]);
    });
    
    // /emergency - 紧急求助
    this.bot.onText(/\/emergency/, (msg) => {
      this.handleEmergencyHelp(msg);
    });
    
    // /case - 今日骗局案例
    this.bot.onText(/\/case/, (msg) => {
      this.handleScamCase(msg);
    });
    
    // /guardian_family - 家人监护
    this.bot.onText(/\/guardian_family/, (msg) => {
      this.handleFamilyGuardian(msg);
    });
  }
  
  // 语音安全播报
  async handleVoiceReport(msg) {
    const chatId = msg.chat.id;
    
    try {
      this.bot.sendMessage(chatId, this.lang === 'zh' ? 
        '🎙️ 正在生成语音安全播报...' :
        '🎙️ Generating voice safety report...'
      );
      
      // 生成中文播报
      const zhReport = VoiceSafetyReport.saveDailyReport('zh');
      
      // 发送中文语音
      this.bot.sendVoice(chatId, zhReport.reportPath, {
        caption: this.lang === 'zh' ? '🎙️ 今日安全播报（中文）' : '🎙️ Today\'s Safety Report (Chinese)'
      });
      
      // 生成英文播报
      const enReport = VoiceSafetyReport.saveDailyReport('en');
      
      // 发送英文语音
      this.bot.sendVoice(chatId, enReport.reportPath, {
        caption: this.lang === 'zh' ? '🎙️ 今日安全播报（英文）' : '🎙️ Today\'s Safety Report (English)'
      });
      
    } catch (error) {
      console.error('Error generating voice report:', error);
      this.bot.sendMessage(chatId, this.lang === 'zh' ? 
        '❌ 生成语音播报失败' :
        '❌ Failed to generate voice report'
      );
    }
  }
  
  // 智能风险评分
  async handleRiskScore(msg, symbol) {
    const chatId = msg.chat.id;
    
    try {
      this.bot.sendMessage(chatId, this.lang === 'zh' ? 
        `🔍 正在评估 ${symbol.toUpperCase()} 的风险...` :
        `🔍 Assessing risk for ${symbol.toUpperCase()}...`
      );
      
      // 计算风险评分
      const assessment = RiskScore.calculateRiskScore(symbol);
      const report = RiskScore.generateRiskReport(assessment);
      
      // 发送报告
      this.bot.sendMessage(chatId, report, { parse_mode: 'Markdown' });
      
    } catch (error) {
      console.error('Error calculating risk score:', error);
      this.bot.sendMessage(chatId, this.lang === 'zh' ? 
        '❌ 风险评估失败' :
        '❌ Risk assessment failed'
      );
    }
  }
  
  // 紧急求助
  async handleEmergencyHelp(msg) {
    const chatId = msg.chat.id;
    
    const text = this.lang === 'zh' ? `
🚨 *紧急求助*

如果你遇到可疑情况，请选择求助类型：

1️⃣ 疑似骗局 - 收到可疑消息或链接
2️⃣ 交易问题 - 交易遇到问题
3️⃣ 账户安全 - 账户异常或被盗
4️⃣ 技术问题 - 使用遇到困难
5️⃣ 其他问题

请回复数字选择类型，或描述你的问题。

💡 社区专家会在 5 分钟内响应！
    `.trim() : `
🚨 *Emergency Help*

If you encounter suspicious situations, please select help type:

1️⃣ Suspected Scam - Received suspicious message or link
2️⃣ Transaction Issue - Problem with transaction
3️⃣ Account Security - Account anomaly or theft
4️⃣ Technical Issue - Usage difficulty
5️⃣ Other Issue

Reply with number to select type, or describe your problem.

💡 Community experts will respond within 5 minutes!
    `.trim();
    
    const keyboard = {
      inline_keyboard: [
        [
          { text: '1️⃣ ' + (this.lang === 'zh' ? '疑似骗局' : 'Scam'), callback_data: 'emergency_scam' },
          { text: '2️⃣ ' + (this.lang === 'zh' ? '交易问题' : 'Transaction'), callback_data: 'emergency_transaction' }
        ],
        [
          { text: '3️⃣ ' + (this.lang === 'zh' ? '账户安全' : 'Account'), callback_data: 'emergency_account' },
          { text: '4️⃣ ' + (this.lang === 'zh' ? '技术问题' : 'Technical'), callback_data: 'emergency_technical' }
        ],
        [
          { text: '5️⃣ ' + (this.lang === 'zh' ? '其他问题' : 'Other'), callback_data: 'emergency_other' }
        ]
      ]
    };
    
    this.bot.sendMessage(chatId, text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  }
  
  // 今日骗局案例
  async handleScamCase(msg) {
    const chatId = msg.chat.id;
    
    try {
      const todayCase = ScamCases.getTodayCase();
      const content = ScamCases.generateCaseContent(todayCase, this.lang);
      
      this.bot.sendMessage(chatId, content, { parse_mode: 'Markdown' });
      
    } catch (error) {
      console.error('Error getting scam case:', error);
      this.bot.sendMessage(chatId, this.lang === 'zh' ? 
        '❌ 获取案例失败' :
        '❌ Failed to get case'
      );
    }
  }
  
  // 家人监护
  async handleFamilyGuardian(msg) {
    const chatId = msg.chat.id;
    
    const text = this.lang === 'zh' ? `
👨‍👩‍👧‍👦 *家人监护模式*

这是一个独特的功能，让你可以远程监护家人的交易安全。

*功能：*
• 添加监护关系（子女监护父母）
• 智能风险评估（4个等级）
• 高风险操作自动通知
• 详细的风险分析和建议

*使用方法：*
1. 添加监护关系
2. 系统自动监控交易
3. 高风险操作立即通知

请选择操作：
    `.trim() : `
👨‍👩‍👧‍👦 *Family Guardian Mode*

A unique feature that lets you remotely monitor your family's trading safety.

*Features:*
• Add guardian relationship (children monitor parents)
• Smart risk assessment (4 levels)
• Auto-notify on high-risk operations
• Detailed risk analysis and suggestions

*How to use:*
1. Add guardian relationship
2. System auto-monitors transactions
3. Immediate notification on high-risk operations

Please select an action:
    `.trim();
    
    const keyboard = {
      inline_keyboard: [
        [
          { text: this.lang === 'zh' ? '➕ 添加监护关系' : '➕ Add Relationship', callback_data: 'guardian_add' },
          { text: this.lang === 'zh' ? '📋 查看监护列表' : '📋 View List', callback_data: 'guardian_list' }
        ],
        [
          { text: this.lang === 'zh' ? '🔙 返回' : '🔙 Back', callback_data: 'start' }
        ]
      ]
    };
    
    this.bot.sendMessage(chatId, text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  }
}

module.exports = GuardianFeatures;
