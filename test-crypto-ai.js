#!/usr/bin/env node

// 测试 AI 分析功能
const { execSync } = require('child_process');

console.log('🧪 测试 AI 分析功能\n');

// 模拟一个套利机会
const opportunity = {
  pair1: 'BTCUSDT',
  pair2: 'ETHUSDT',
  spread: '0.85',
  change1: '0.45',
  change2: '-0.40'
};

const marketData = {
  volumes: {
    'BTCUSDT': 15234567890,
    'ETHUSDT': 8765432100
  }
};

console.log('📊 模拟套利机会:');
console.log(`  交易对: ${opportunity.pair1} / ${opportunity.pair2}`);
console.log(`  价差: ${opportunity.spread}%`);
console.log(`  ${opportunity.pair1} 变化: ${opportunity.change1}%`);
console.log(`  ${opportunity.pair2} 变化: ${opportunity.change2}%`);
console.log(`  ${opportunity.pair1} 24h交易量: $${marketData.volumes[opportunity.pair1].toLocaleString()}`);
console.log(`  ${opportunity.pair2} 24h交易量: $${marketData.volumes[opportunity.pair2].toLocaleString()}\n`);

console.log('🤖 调用 AI 分析...\n');

const prompt = `你是一个专业的加密货币交易分析师。请分析以下套利机会：

交易对: ${opportunity.pair1} / ${opportunity.pair2}
价差: ${opportunity.spread}%
${opportunity.pair1} 变化: ${opportunity.change1}%
${opportunity.pair2} 变化: ${opportunity.change2}%
${opportunity.pair1} 24h交易量: $${marketData.volumes[opportunity.pair1].toLocaleString()}
${opportunity.pair2} 24h交易量: $${marketData.volumes[opportunity.pair2].toLocaleString()}

请提供：
1. 可靠性评分（1-10分，10分最高）
2. 建议仓位大小（保守/适中/激进）
3. 主要风险点
4. 最佳执行时机
5. 一句话总结

请用简洁专业的语言回答，每项用一行。`;

try {
  const result = execSync(`oracle --engine api --model anthropic/claude-sonnet-4-6 --prompt "${prompt.replace(/"/g, '\\"')}"`, {
    encoding: 'utf8',
    timeout: 30000
  });
  
  console.log('✅ AI 分析结果:\n');
  console.log(result);
  
  console.log('\n🎉 测试成功！AI 分析功能正常工作。');
  
} catch (error) {
  console.error('❌ AI 分析失败:', error.message);
  console.log('\n可能的原因：');
  console.log('1. oracle 命令未安装或不在 PATH 中');
  console.log('2. OpenClaw 未正确配置');
  console.log('3. 网络连接问题');
}
