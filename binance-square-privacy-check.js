#!/usr/bin/env node
/**
 * 币安广场发帖隐私检查工具
 * 在发布前检查内容是否包含敏感信息
 */

// 隐私检查规则
const PRIVACY_CHECKS = {
  // 个人身份信息
  identity: {
    patterns: [
      /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g, // 英文姓名
      /[\u4e00-\u9fa5]{2,4}(?:先生|女士|总)(?!\s*[，。！？])/g, // 中文称呼（排除"老师"避免误报）
      /\b\d{6,}\b/g, // 可能的ID号码
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, // 邮箱
      /\b1[3-9]\d{9}\b/g, // 手机号
      /@\w+/g, // 社交媒体账号（除了标签）
    ],
    message: '⚠️ 检测到可能的个人身份信息'
  },
  
  // 具体交易信息
  transactions: {
    patterns: [
      /买[入了]\s*\d+/g,
      /卖[出了]\s*\d+/g,
      /持仓\s*\d+/g,
      /盈利\s*\d+/g,
      /亏损\s*\d+/g,
      /赚[了到]\s*\d+/g,
      /\d+\s*[UuＵ][SsＳ][DdＤ][TtＴ]/g, // USDT金额
      /\d+\s*[Bb][Tt][Cc]/g, // BTC金额
      /\d+\s*[Ee][Tt][Hh]/g, // ETH金额
    ],
    message: '⚠️ 检测到具体的交易金额或持仓信息'
  },
  
  // 钱包地址
  wallets: {
    patterns: [
      /\b0x[a-fA-F0-9]{40}\b/g, // 以太坊地址
      /\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b/g, // 比特币地址
      /\b[A-Z0-9]{32,44}\b/g, // 其他可能的地址
    ],
    message: '⚠️ 检测到钱包地址'
  },
  
  // API密钥
  apiKeys: {
    patterns: [
      /[Aa][Pp][Ii][\s_-]?[Kk][Ee][Yy][\s:=]+[A-Za-z0-9]{20,}/g,
      /[Ss][Ee][Cc][Rr][Ee][Tt][\s:=]+[A-Za-z0-9]{20,}/g,
      /[Tt][Oo][Kk][Ee][Nn][\s:=]+[A-Za-z0-9]{20,}/g,
    ],
    message: '⚠️ 检测到API密钥或令牌'
  },
  
  // 私钥/助记词
  privateKeys: {
    patterns: [
      /\b[a-f0-9]{64}\b/gi, // 私钥格式
      /\b([a-z]+\s+){11}[a-z]+\b/gi, // 12个单词（助记词）
      /\b([a-z]+\s+){23}[a-z]+\b/gi, // 24个单词（助记词）
    ],
    message: '⚠️ 检测到可能的私钥或助记词'
  },
  
  // 具体地址
  locations: {
    patterns: [
      /[\u4e00-\u9fa5]+[省市区县]\s*[\u4e00-\u9fa5]+[路街道]/g,
      /\d+号楼\s*\d+单元/g,
    ],
    message: '⚠️ 检测到具体地址信息'
  }
};

// 敏感词检查（可能违反平台规则）
const SENSITIVE_WORDS = [
  '翻墙', 'VPN', '代理', '科学上网',
  '洗钱', '黑钱', '地下钱庄',
  '操纵', '庄家',
  '保证赚', '稳赚', '必赚', '躺赚',
  '拉人头', '传销', '资金盘',
  '私下交易', '线下交易', '场外交易',
];

// 执行隐私检查
function checkPrivacy(content) {
  const issues = [];
  
  // 检查隐私规则
  for (const [category, check] of Object.entries(PRIVACY_CHECKS)) {
    for (const pattern of check.patterns) {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        // 排除标签（以#开头）
        const realMatches = matches.filter(m => !m.startsWith('#'));
        if (realMatches.length > 0) {
          issues.push({
            category,
            message: check.message,
            matches: realMatches,
            severity: 'high'
          });
        }
      }
    }
  }
  
  // 检查敏感词
  for (const word of SENSITIVE_WORDS) {
    if (content.includes(word)) {
      issues.push({
        category: 'sensitive',
        message: `⚠️ 检测到敏感词: ${word}`,
        matches: [word],
        severity: 'medium'
      });
    }
  }
  
  return issues;
}

// 生成检查报告
function generateReport(content, issues) {
  console.log('\n' + '='.repeat(60));
  console.log('🔒 币安广场发帖隐私检查报告');
  console.log('='.repeat(60));
  
  console.log('\n📄 内容预览：');
  console.log(content.substring(0, 200) + (content.length > 200 ? '...' : ''));
  
  if (issues.length === 0) {
    console.log('\n✅ 隐私检查通过！未发现敏感信息。');
    console.log('\n可以安全发布。');
    return true;
  }
  
  console.log('\n❌ 发现 ' + issues.length + ' 个潜在问题：\n');
  
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.message}`);
    console.log(`   类别: ${issue.category}`);
    console.log(`   严重程度: ${issue.severity === 'high' ? '🔴 高' : '🟡 中'}`);
    console.log(`   匹配内容: ${issue.matches.join(', ')}`);
    console.log('');
  });
  
  console.log('⛔ 建议：请修改内容后再发布！');
  console.log('='.repeat(60) + '\n');
  
  return false;
}

// 主函数
function checkContent(content) {
  const issues = checkPrivacy(content);
  const passed = generateReport(content, issues);
  
  return {
    passed,
    issues,
    content
  };
}

// 如果直接运行
if (require.main === module) {
  // 测试用例
  const testCases = [
    {
      name: '安全内容',
      content: '我的助记词保管方法：手写在纸上，分成两份存放。记住：助记词永远不要数字化！#钱包安全'
    },
    {
      name: '包含交易金额',
      content: '我昨天买了 1000 USDT 的 BTC，现在已经赚了 200 USDT。#交易心得'
    },
    {
      name: '包含钱包地址',
      content: '我的钱包地址是 0x1234567890abcdef1234567890abcdef12345678，大家可以转账。'
    },
    {
      name: '包含敏感词',
      content: '这个项目保证赚钱，稳赚不赔，大家赶紧上车！'
    }
  ];
  
  testCases.forEach(test => {
    console.log(`\n测试: ${test.name}`);
    checkContent(test.content);
  });
}

module.exports = { checkContent, checkPrivacy, generateReport };
