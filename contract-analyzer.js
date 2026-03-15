const axios = require('axios');

class ContractAnalyzer {
  constructor() {
    // 使用免费的公开 API（无需 key）
    this.apiEndpoints = {
      ethereum: 'https://api.etherscan.io/api',
      bsc: 'https://api.bscscan.com/api',
      polygon: 'https://api.polygonscan.com/api',
      arbitrum: 'https://api.arbiscan.io/api',
      optimism: 'https://api-optimistic.etherscan.io/api',
      avalanche: 'https://api.snowtrace.io/api',
      fantom: 'https://api.ftmscan.com/api',
      base: 'https://api.basescan.org/api'
    };
    
    // Solana RPC
    this.solanaRpc = 'https://api.mainnet-beta.solana.com';
  }

  // 检测网络类型（基于地址特征和上下文）
  detectNetwork(contractAddress, context = '') {
    const contextLower = context.toLowerCase();
    
    // Solana 地址特征：32-44 字符，Base58 编码（不含 0OIl）
    const isSolanaAddress = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(contractAddress);
    
    // 检查上下文关键词（按优先级）
    if (contextLower.includes('sol') || contextLower.includes('solana') || contextLower.includes('raydium') || contextLower.includes('phantom')) {
      return 'solana';
    }
    if (contextLower.includes('bsc') || contextLower.includes('bnb') || contextLower.includes('pancake')) {
      return 'bsc';
    }
    if (contextLower.includes('polygon') || contextLower.includes('matic') || contextLower.includes('quickswap')) {
      return 'polygon';
    }
    if (contextLower.includes('arbitrum') || contextLower.includes('arb')) {
      return 'arbitrum';
    }
    if (contextLower.includes('optimism') || contextLower.includes('op')) {
      return 'optimism';
    }
    if (contextLower.includes('avalanche') || contextLower.includes('avax') || contextLower.includes('traderjoe')) {
      return 'avalanche';
    }
    if (contextLower.includes('fantom') || contextLower.includes('ftm') || contextLower.includes('spookyswap')) {
      return 'fantom';
    }
    if (contextLower.includes('base')) {
      return 'base';
    }
    if (contextLower.includes('eth') || contextLower.includes('ethereum') || contextLower.includes('uniswap')) {
      return 'ethereum';
    }
    
    // 基于地址格式判断
    if (isSolanaAddress && !contractAddress.startsWith('0x')) {
      return 'solana';
    }
    
    // 默认尝试以太坊（最常见）
    return 'ethereum';
  }

  // 获取合约信息（免费 API，无需 key）
  async getContractInfo(contractAddress, network = 'ethereum') {
    // Solana 链处理
    if (network === 'solana') {
      return await this.getSolanaTokenInfo(contractAddress);
    }
    
    // EVM 链处理（Ethereum/BSC/Polygon/Arbitrum/Optimism/Avalanche/Fantom/Base）
    const apiUrl = this.apiEndpoints[network];
    
    if (!apiUrl) {
      // 不支持的网络，返回基本信息
      return {
        verified: null,
        contractName: 'Unknown',
        txCount: 0,
        network: network,
        error: `Unsupported network: ${network}`
      };
    }
    
    try {
      // 1. 检查合约是否验证
      const verifyResponse = await axios.get(apiUrl, {
        params: {
          module: 'contract',
          action: 'getsourcecode',
          address: contractAddress
        },
        timeout: 5000
      });

      const isVerified = verifyResponse.data.status === '1' && 
                        verifyResponse.data.result[0].SourceCode !== '';
      
      const contractName = verifyResponse.data.result[0].ContractName || 'Unknown';
      
      // 2. 获取交易数量
      const txResponse = await axios.get(apiUrl, {
        params: {
          module: 'proxy',
          action: 'eth_getTransactionCount',
          address: contractAddress,
          tag: 'latest'
        },
        timeout: 5000
      });

      const txCount = txResponse.data.result ? 
                     parseInt(txResponse.data.result, 16) : 0;

      return {
        verified: isVerified,
        contractName: contractName,
        txCount: txCount,
        network: network
      };

    } catch (error) {
      console.error('Contract API error:', error.message);
      return {
        verified: null,
        contractName: 'Unknown',
        txCount: 0,
        network: network,
        error: error.message
      };
    }
  }

  // 获取 Solana 代币信息（使用公开 RPC）
  async getSolanaTokenInfo(tokenAddress) {
    try {
      // 使用 Solana 公开 RPC（免费，但有速率限制）
      const rpcUrl = 'https://api.mainnet-beta.solana.com';
      
      // 获取账户信息
      const response = await axios.post(rpcUrl, {
        jsonrpc: '2.0',
        id: 1,
        method: 'getAccountInfo',
        params: [
          tokenAddress,
          { encoding: 'jsonParsed' }
        ]
      }, {
        timeout: 5000
      });

      const accountInfo = response.data.result?.value;
      
      if (!accountInfo) {
        return {
          verified: false,
          contractName: 'Unknown',
          txCount: 0,
          network: 'solana',
          error: 'Token not found'
        };
      }

      // Solana 代币存在即可认为是"已验证"（链上可见）
      return {
        verified: true,
        contractName: 'Solana Token',
        txCount: 0, // Solana RPC 不直接提供交易数
        network: 'solana'
      };

    } catch (error) {
      console.error('Solana RPC error:', error.message);
      return {
        verified: null,
        contractName: 'Unknown',
        txCount: 0,
        network: 'solana',
        error: error.message
      };
    }
  }

  // 分析合约风险
  async analyzeContract(contractAddress, context = '') {
    console.log('[ContractAnalyzer] analyzeContract called with:', { contractAddress, context });
    const network = this.detectNetwork(contractAddress, context);
    console.log('[ContractAnalyzer] Detected network:', network);
    
    let info;
    try {
      info = await this.getContractInfo(contractAddress, network);
      console.log('[ContractAnalyzer] getContractInfo result:', {
        verified: info.verified,
        contractName: info.contractName,
        txCount: info.txCount,
        error: info.error
      });
    } catch (error) {
      console.error('[ContractAnalyzer] getContractInfo failed:', error.message);
      // 如果 API 调用失败，使用默认值
      info = {
        verified: null,
        contractName: 'Unknown',
        txCount: 0,
        network: network,
        error: error.message
      };
    }

    const result = {
      address: contractAddress,
      network: network,
      verified: info.verified,
      contractName: info.contractName,
      txCount: info.txCount,
      riskLevel: 'medium',
      risks: [],
      warnings: [],
      advice: []
    };

    // Solana 链特殊处理
    if (network === 'solana') {
      if (info.verified === false) {
        result.riskLevel = 'high';
        result.risks.push('❌ 代币不存在或地址错误');
        result.warnings.push('无法在 Solana 链上找到该代币');
      } else if (info.verified === true) {
        result.risks.push('✅ 代币存在于 Solana 链上');
        result.warnings.push('⚠️ Solana 链代币风险极高');
        result.warnings.push('大部分 Solana 代币是 Meme 币或土狗');
      } else {
        result.risks.push('⚠️ 无法确认代币状态');
        result.warnings.push('Solana RPC 查询失败或网络问题');
      }
      
      // Solana 安全建议
      result.advice.push(`🔍 在 Solscan 查看详情：`);
      result.advice.push(`https://solscan.io/token/${contractAddress}`);
      result.advice.push('');
      result.advice.push('⚠️ Solana 链代币风险极高，建议：');
      result.advice.push('1. 查看持币地址分布（避免高度集中）');
      result.advice.push('2. 检查流动性池是否锁定');
      result.advice.push('3. 小额测试能否卖出（防止蜜罐）');
      result.advice.push('4. 只投入能承受损失的金额');
      result.advice.push('5. 优先选择币安已上线的币种');
      result.advice.push('');
      result.advice.push('📌 *免责声明：*');
      result.advice.push('• 检测结果仅供参考，可能存在延迟');
      result.advice.push('• 链上数据实时变化，建议多次验证');
      result.advice.push('• 投资有风险，决策需谨慎');
      
      return result;
    }

    // EVM 链（Ethereum/BSC）风险评估
    if (info.verified === false) {
      result.riskLevel = 'high';
      result.risks.push('❌ 合约未验证');
      result.warnings.push('无法查看合约代码，可能存在后门');
    } else if (info.verified === true) {
      result.risks.push('✅ 合约已验证');
      result.warnings.push('可以在区块链浏览器查看源代码');
    } else {
      result.risks.push('⚠️ 无法确认合约验证状态');
      result.warnings.push('API 查询失败或网络问题');
    }

    // 交易数量分析
    if (info.txCount === 0) {
      result.riskLevel = 'high';
      result.risks.push('❌ 合约无交易记录');
      result.warnings.push('可能是新部署的合约或无人使用');
    } else if (info.txCount < 100) {
      result.riskLevel = 'high';
      result.risks.push(`⚠️ 交易数量很少（${info.txCount} 笔）`);
      result.warnings.push('使用人数极少，流动性可能不足');
    } else if (info.txCount < 1000) {
      result.risks.push(`🟡 交易数量较少（${info.txCount} 笔）`);
      result.warnings.push('使用人数不多，需谨慎');
    } else {
      result.risks.push(`✅ 有一定交易量（${info.txCount}+ 笔）`);
    }

    // 合约名称分析
    if (info.contractName && info.contractName !== 'Unknown') {
      result.risks.push(`📝 合约名称：${info.contractName}`);
    }

    // 安全建议
    const explorerInfo = {
      ethereum: { name: 'Etherscan', url: 'etherscan.io' },
      bsc: { name: 'BSCScan', url: 'bscscan.com' },
      polygon: { name: 'PolygonScan', url: 'polygonscan.com' },
      arbitrum: { name: 'Arbiscan', url: 'arbiscan.io' },
      optimism: { name: 'Optimistic Etherscan', url: 'optimistic.etherscan.io' },
      avalanche: { name: 'SnowTrace', url: 'snowtrace.io' },
      fantom: { name: 'FTMScan', url: 'ftmscan.com' },
      base: { name: 'BaseScan', url: 'basescan.org' }
    };
    
    const explorer = explorerInfo[network] || { name: 'Block Explorer', url: 'etherscan.io' };
    
    result.advice.push(`🔍 在 ${explorer.name} 查看详情：`);
    result.advice.push(`https://${explorer.url}/address/${contractAddress}`);
    result.advice.push('');
    result.advice.push('⚠️ 链上代币风险极高，建议：');
    result.advice.push('1. 查看持币地址分布（避免高度集中）');
    result.advice.push('2. 检查是否有 CertiK/SlowMist 审计');
    result.advice.push('3. 小额测试能否卖出（防止蜜罐）');
    result.advice.push('4. 只投入能承受损失的金额');
    result.advice.push('5. 优先选择币安已上线的币种');
    result.advice.push('');
    result.advice.push('📌 *免责声明：*');
    result.advice.push('• 检测结果仅供参考，可能存在延迟');
    result.advice.push('• 链上数据实时变化，建议多次验证');
    result.advice.push('• 投资有风险，决策需谨慎');

    // 计算安全评分（0-100）
    let score = 50; // 基础分
    
    // 合约验证状态（+30/-30）
    if (info.verified === true) {
      score += 30;
    } else if (info.verified === false) {
      score -= 30;
    }
    
    // 交易数量（+20/-20）
    if (info.txCount >= 1000) {
      score += 20;
    } else if (info.txCount >= 100) {
      score += 10;
    } else if (info.txCount > 0) {
      score -= 10;
    } else {
      score -= 20;
    }
    
    // 确保分数在 0-100 范围内
    score = Math.max(0, Math.min(100, score));
    
    // 根据分数确定风险等级
    let riskLevelText = '';
    let riskEmoji = '';
    if (score >= 80) {
      result.riskLevel = 'low';
      riskLevelText = '低风险';
      riskEmoji = '🟢';
    } else if (score >= 60) {
      result.riskLevel = 'medium';
      riskLevelText = '中等风险';
      riskEmoji = '🟡';
    } else if (score >= 40) {
      result.riskLevel = 'high';
      riskLevelText = '高风险';
      riskEmoji = '🟠';
    } else {
      result.riskLevel = 'critical';
      riskLevelText = '极高风险';
      riskEmoji = '🔴';
    }
    
    result.score = score;
    result.riskLevelText = riskLevelText;
    result.riskEmoji = riskEmoji;

    console.log('[ContractAnalyzer] Final result:', {
      score: result.score,
      riskLevelText: result.riskLevelText,
      riskEmoji: result.riskEmoji,
      riskLevel: result.riskLevel
    });

    return result;
  }

  // 格式化分析报告
  formatReport(analysis, lang = 'zh') {
    if (lang === 'zh') {
      let message = `🛡️ *合约安全分析*\n\n`;
      message += `合约地址：\`${analysis.address}\`\n`;
      
      // 显示网络类型
      const networkName = {
        'bsc': 'BSC (币安智能链)',
        'ethereum': 'Ethereum (以太坊)',
        'solana': 'Solana (SOL链)',
        'polygon': 'Polygon (MATIC)',
        'arbitrum': 'Arbitrum (ARB)',
        'optimism': 'Optimism (OP)',
        'avalanche': 'Avalanche (AVAX)',
        'fantom': 'Fantom (FTM)',
        'base': 'Base'
      };
      message += `网络：${networkName[analysis.network] || analysis.network}\n\n`;

      message += `📊 *检测结果：*\n`;
      analysis.risks.forEach(risk => {
        message += `${risk}\n`;
      });
      message += `\n`;

      if (analysis.warnings.length > 0) {
        message += `⚠️ *风险提示：*\n`;
        analysis.warnings.forEach(warning => {
          message += `• ${warning}\n`;
        });
        message += `\n`;
      }

      if (analysis.advice.length > 0) {
        message += `💡 *安全建议：*\n`;
        analysis.advice.forEach(advice => {
          message += `${advice}\n`;
        });
      }

      return message;
    } else {
      let message = `🛡️ *Contract Security Analysis*\n\n`;
      message += `Contract: \`${analysis.address}\`\n`;
      
      // 显示网络类型
      const networkName = {
        'bsc': 'BSC',
        'ethereum': 'Ethereum',
        'solana': 'Solana',
        'polygon': 'Polygon',
        'arbitrum': 'Arbitrum',
        'optimism': 'Optimism',
        'avalanche': 'Avalanche',
        'fantom': 'Fantom',
        'base': 'Base'
      };
      message += `Network: ${networkName[analysis.network] || analysis.network}\n\n`;

      message += `📊 *Detection Results:*\n`;
      analysis.risks.forEach(risk => {
        message += `${risk}\n`;
      });
      message += `\n`;

      if (analysis.warnings.length > 0) {
        message += `⚠️ *Risk Warnings:*\n`;
        analysis.warnings.forEach(warning => {
          message += `• ${warning}\n`;
        });
        message += `\n`;
      }

      if (analysis.advice.length > 0) {
        message += `💡 *Safety Advice:*\n`;
        analysis.advice.forEach(advice => {
          message += `${advice}\n`;
        });
      }

      return message;
    }
  }
}

module.exports = ContractAnalyzer;
