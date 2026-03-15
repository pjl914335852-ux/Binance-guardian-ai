const axios = require('axios');

class ContractAnalyzer {
  constructor() {
    // 使用免费的公开 API（无需 key）
    this.etherscanApi = 'https://api.etherscan.io/api';
    this.bscscanApi = 'https://api.bscscan.com/api';
  }

  // 检测网络类型（基于地址特征和上下文）
  detectNetwork(contractAddress, context = '') {
    const contextLower = context.toLowerCase();
    
    // 检查上下文关键词
    if (contextLower.includes('bsc') || contextLower.includes('bnb') || contextLower.includes('pancake')) {
      return 'bsc';
    }
    if (contextLower.includes('eth') || contextLower.includes('ethereum') || contextLower.includes('uniswap')) {
      return 'ethereum';
    }
    
    // 默认尝试以太坊（更常见）
    return 'ethereum';
  }

  // 获取合约信息（免费 API，无需 key）
  async getContractInfo(contractAddress, network = 'ethereum') {
    const apiUrl = network === 'bsc' ? this.bscscanApi : this.etherscanApi;
    
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

  // 分析合约风险
  async analyzeContract(contractAddress, context = '') {
    const network = this.detectNetwork(contractAddress, context);
    const info = await this.getContractInfo(contractAddress, network);

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

    // 风险评估
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
    result.advice.push(`🔍 在 ${network === 'bsc' ? 'BSCScan' : 'Etherscan'} 查看详情：`);
    result.advice.push(`https://${network === 'bsc' ? 'bscscan.com' : 'etherscan.io'}/address/${contractAddress}`);
    result.advice.push('');
    result.advice.push('⚠️ 链上代币风险极高，建议：');
    result.advice.push('1. 查看持币地址分布（避免高度集中）');
    result.advice.push('2. 检查是否有 CertiK/SlowMist 审计');
    result.advice.push('3. 小额测试能否卖出（防止蜜罐）');
    result.advice.push('4. 只投入能承受损失的金额');
    result.advice.push('5. 优先选择币安已上线的币种');

    return result;
  }

  // 格式化分析报告
  formatReport(analysis, lang = 'zh') {
    if (lang === 'zh') {
      let message = `🛡️ *合约安全分析*\n\n`;
      message += `合约地址：\`${analysis.address}\`\n`;
      message += `网络：${analysis.network === 'bsc' ? 'BSC (币安智能链)' : 'Ethereum (以太坊)'}\n\n`;

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
      message += `Network: ${analysis.network === 'bsc' ? 'BSC' : 'Ethereum'}\n\n`;

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
