// safety-lessons.js - 每日安全课堂模块

class SafetyLessons {
  constructor() {
    // 30 天安全课程
    this.lessons = {
      zh: [
        // 第 1-7 天：基础安全知识
        {
          day: 1,
          title: '如何识别诈骗币？',
          content: `
📚 *今日安全课堂 (第 1 课)*

*主题：如何识别诈骗币？*

🚨 *三大特征：*
1. 承诺高回报（"一个月翻 10 倍"）
2. 让你拉人头（"推荐 3 个人送币"）
3. 不在币安上线（"私下交易更便宜"）

✅ *安全原则：*
• 只在币安官方 App 交易
• 不相信私聊推荐
• 不转账到私人账户

💡 *记住：* 天上不会掉馅饼，高回报必有高风险。

明天的课程：如何设置安全的密码
          `.trim()
        },
        {
          day: 2,
          title: '如何设置安全的密码？',
          content: `
📚 *今日安全课堂 (第 2 课)*

*主题：如何设置安全的密码？*

🔐 *密码要求：*
1. 至少 12 位
2. 包含大小写字母、数字、符号
3. 不要用生日、电话号码
4. 每个平台用不同密码

✅ *好密码示例：*
• Bn@2026!MyS3cur3
• Cr7pt0#Safe2024

❌ *坏密码示例：*
• 123456
• password
• 19900101（生日）

💡 *建议：* 用密码管理器（如 1Password）

明天的课程：什么是双重验证（2FA）？
          `.trim()
        },
        {
          day: 3,
          title: '什么是双重验证（2FA）？',
          content: `
📚 *今日安全课堂 (第 3 课)*

*主题：什么是双重验证（2FA）？*

🔐 *简单理解：*
就像银行卡需要密码 + 短信验证码，双重保护。

🛡️ *为什么要开启：*
• 即使密码被盗，黑客也进不去
• 多一层保护，多一份安全

✅ *如何开启：*
1. 下载 Google Authenticator
2. 币安 App → 安全 → 双重验证
3. 扫码绑定
4. 备份恢复码（很重要！）

⚠️ *注意：* 恢复码要保存好，手机丢了靠它找回

明天的课程：如何识别钓鱼网站？
          `.trim()
        },
        {
          day: 4,
          title: '如何识别钓鱼网站？',
          content: `
📚 *今日安全课堂 (第 4 课)*

*主题：如何识别钓鱼网站？*

🎣 *什么是钓鱼网站：*
假冒币安官网，骗你输入密码，盗走你的币。

🚨 *识别方法：*
1. 看网址：必须是 binance.com
2. 看锁头：浏览器地址栏有锁头图标
3. 看证书：点击锁头查看证书

❌ *假网站特征：*
• binance-cn.com（多了 -cn）
• binnance.com（多了一个 n）
• binance.co（少了 m）

✅ *安全建议：*
• 只用币安官方 App
• 不点击陌生链接
• 收藏官网地址

明天的课程：什么是私钥？为什么重要？
          `.trim()
        },
        {
          day: 5,
          title: '什么是私钥？为什么重要？',
          content: `
📚 *今日安全课堂 (第 5 课)*

*主题：什么是私钥？为什么重要？*

🔑 *简单理解：*
私钥就像你家的钥匙，谁有钥匙谁就能进你家。

⚠️ *为什么重要：*
• 私钥 = 你的币
• 私钥丢了 = 币丢了
• 私钥被盗 = 币被盗

🛡️ *如何保护：*
1. 永远不要告诉任何人
2. 不要截图、不要拍照
3. 不要存在手机、电脑
4. 抄在纸上，锁在保险柜

❌ *常见骗局：*
• "客服"让你提供私钥 → 100% 骗子
• "升级"需要输入私钥 → 100% 骗子

💡 *记住：* 币安客服永远不会问你要私钥

明天的课程：如何安全存储加密货币？
          `.trim()
        },
        {
          day: 6,
          title: '如何安全存储加密货币？',
          content: `
📚 *今日安全课堂 (第 6 课)*

*主题：如何安全存储加密货币？*

💼 *三种存储方式：*

1. *交易所（币安）*
   • 优点：方便交易
   • 缺点：交易所被黑客攻击风险
   • 适合：经常交易的币

2. *软件钱包（Trust Wallet）*
   • 优点：自己掌控私钥
   • 缺点：手机丢了币就丢了
   • 适合：中等金额

3. *硬件钱包（Ledger）*
   • 优点：最安全
   • 缺点：要花钱买设备
   • 适合：大额资产

💡 *建议：*
• 小额：放币安（方便）
• 中额：软件钱包
• 大额：硬件钱包

明天的课程：什么是助记词？
          `.trim()
        },
        {
          day: 7,
          title: '什么是助记词？',
          content: `
📚 *今日安全课堂 (第 7 课)*

*主题：什么是助记词？*

📝 *简单理解：*
助记词就是 12 个英文单词，是你钱包的"万能钥匙"。

🔑 *为什么重要：*
• 手机丢了，用助记词可以恢复钱包
• 助记词 = 私钥 = 你的币

🛡️ *如何保护：*
1. 抄在纸上（不要截图）
2. 多抄几份，分开存放
3. 永远不要告诉任何人
4. 不要存在云盘、邮箱

❌ *常见骗局：*
• "验证钱包"需要输入助记词 → 骗子
• "升级"需要助记词 → 骗子
• "客服"要助记词 → 骗子

💡 *记住：* 任何人要你的助记词，都是骗子

下周课程：交易基础知识
          `.trim()
        },
        
        // 第 8-14 天：交易基础
        {
          day: 8,
          title: '什么是现货交易？',
          content: `
📚 *今日安全课堂 (第 8 课)*

*主题：什么是现货交易？*

💰 *简单理解：*
就是直接买币，买了就是你的，像买股票一样。

📊 *交易流程：*
1. 用 USDT 买 BTC
2. BTC 涨了，卖出赚钱
3. BTC 跌了，卖出亏钱

✅ *优点：*
• 简单易懂
• 风险可控（最多亏本金）
• 适合新手

❌ *缺点：*
• 只能做多（买涨）
• 收益有限

💡 *建议：* 新手先从现货开始，不要碰合约

明天的课程：什么是合约交易？（警告）
          `.trim()
        },
        {
          day: 9,
          title: '什么是合约交易？（警告）',
          content: `
📚 *今日安全课堂 (第 9 课)*

*主题：什么是合约交易？*

⚠️ *重要警告：新手不要碰！*

💰 *简单理解：*
借钱炒币，用 100 块可以买 1000 块的币（10倍杠杆）。

📊 *风险示例：*
• 涨 10% → 你赚 100%（翻倍）
• 跌 10% → 你亏 100%（爆仓，钱没了）

❌ *为什么不要碰：*
• 99% 的人都亏钱
• 极易爆仓（钱瞬间没了）
• 心理压力巨大

💡 *真实案例：*
很多人玩合约，一夜之间从 10 万亏到 0。

🛡️ *建议：*
• 新手永远不要碰合约
• 即使是老手，也要控制仓位
• 不要借钱炒币

明天的课程：如何设置止损？
          `.trim()
        },
        {
          day: 10,
          title: '如何设置止损？',
          content: `
📚 *今日安全课堂 (第 10 课)*

*主题：如何设置止损？*

🛡️ *什么是止损：*
给自己设个"亏损警戒线"，亏到这个数就自动卖掉。

💰 *举例：*
• 70,000 买入 BTC
• 设置止损 63,000（亏 10%）
• 跌到 63,000 自动卖出
• 最多亏 10%，不会亏更多

✅ *为什么要止损：*
• 防止小亏变大亏
• 保护本金
• 避免情绪化决策

📊 *止损建议：*
• 新手：5-10%
• 老手：10-20%
• 永远不要超过 20%

💡 *记住：* 每次买币都要设止损，这是铁律

明天的课程：如何设置止盈？
          `.trim()
        }
        // ... 可以继续添加更多课程
      ],
      en: [
        // English version of lessons
        {
          day: 1,
          title: 'How to Identify Scam Coins?',
          content: `
📚 *Daily Safety Lesson (Day 1)*

*Topic: How to Identify Scam Coins?*

🚨 *Three Red Flags:*
1. Promise high returns ("10x in a month")
2. Require recruiting ("Refer 3 people get free coins")
3. Not listed on Binance ("Private deals are cheaper")

✅ *Safety Rules:*
• Only trade on Binance official app
• Don't trust private messages
• Don't transfer to personal accounts

💡 *Remember:* If it sounds too good to be true, it probably is.

Tomorrow's lesson: How to Set a Secure Password
          `.trim()
        }
        // ... more English lessons
      ]
    };
  }
  
  // 获取今天的课程
  getTodayLesson(lang = 'zh') {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const lessonIndex = (dayOfMonth - 1) % this.lessons[lang].length;
    
    return this.lessons[lang][lessonIndex];
  }
  
  // 获取指定天数的课程
  getLesson(day, lang = 'zh') {
    const lessons = this.lessons[lang];
    const lesson = lessons.find(l => l.day === day);
    
    return lesson || lessons[0];
  }
  
  // 生成课程消息
  generateLessonMessage(lesson, lang = 'zh') {
    return lesson.content;
}
  
  // 搜索 Web3 安全内容（进阶课程）
  async searchWeb3SafetyContent(topic, lang = 'zh') {
    try {
      const sources = [
        {
          name: 'CertiK 安全博客',
          url: 'https://www.certik.com/resources/blog',
          description: '区块链安全审计公司的官方博客'
        },
        {
          name: 'SlowMist 安全团队',
          url: 'https://slowmist.medium.com/',
          description: '慢雾科技的安全研究文章'
        },
        {
          name: 'Binance Academy',
          url: 'https://academy.binance.com/zh/articles',
          description: '币安官方教育平台'
        }
      ];
      
      const content = lang === 'zh' ? `
📚 *进阶安全课程*

*主题：${topic}*

🔍 *推荐学习资源：*

${sources.map((s, i) => `
${i + 1}. *${s.name}*
   ${s.description}
   🔗 ${s.url}
`).join('\n')}

💡 *学习建议：*
• 这些都是公开的免费资源
• 内容由专业安全团队提供
• 建议收藏后慢慢学习
• 有问题随时问我

🛡️ *安全提示：*
• 只访问官方网站
• 不要点击陌生链接
• 学习过程中保持警惕

想了解具体内容？告诉我你想学什么方面！
      `.trim() : `
📚 *Advanced Safety Course*

*Topic: ${topic}*

🔍 *Recommended Resources:*

${sources.map((s, i) => `
${i + 1}. *${s.name}*
   ${s.description}
   🔗 ${s.url}
`).join('\n')}

💡 *Learning Tips:*
• All free public resources
• Content from professional security teams
• Bookmark and learn gradually
• Ask me anytime

🛡️ *Safety Tips:*
• Only visit official websites
• Don't click unknown links
• Stay vigilant while learning

Want specific content? Tell me what you want to learn!
      `.trim();
      
      return content;
    } catch (error) {
      console.error('❌ Failed to search Web3 safety content:', error.message);
      return null;
    }
  }
  
  // 生成进阶课程列表
  getAdvancedTopics(lang = 'zh') {
    const topics = {
      zh: [
        { id: 'defi', name: 'DeFi 安全', desc: '去中心化金融的风险与防范' },
        { id: 'nft', name: 'NFT 安全', desc: '数字藏品交易注意事项' },
        { id: 'wallet', name: '钱包安全', desc: '各类钱包的安全使用' },
        { id: 'smart-contract', name: '智能合约风险', desc: '如何识别合约漏洞' },
        { id: 'phishing', name: '钓鱼攻击防范', desc: '常见钓鱼手段及应对' },
        { id: 'social-engineering', name: '社交工程攻击', desc: '如何防范人为欺诈' },
        { id: 'exchange-security', name: '交易所安全', desc: '选择和使用交易所的技巧' },
        { id: 'privacy', name: '隐私保护', desc: '如何保护个人信息' },
        { id: 'tax', name: '税务合规', desc: '加密货币税务知识' },
        { id: 'regulation', name: '法律法规', desc: '各国加密货币政策' }
      ],
      en: [
        { id: 'defi', name: 'DeFi Security', desc: 'Risks and prevention in decentralized finance' },
        { id: 'nft', name: 'NFT Security', desc: 'Digital collectibles trading tips' },
        { id: 'wallet', name: 'Wallet Security', desc: 'Safe use of various wallets' },
        { id: 'smart-contract', name: 'Smart Contract Risks', desc: 'How to identify contract vulnerabilities' },
        { id: 'phishing', name: 'Phishing Prevention', desc: 'Common phishing tactics and responses' },
        { id: 'social-engineering', name: 'Social Engineering', desc: 'How to prevent human fraud' },
        { id: 'exchange-security', name: 'Exchange Security', desc: 'Tips for choosing and using exchanges' },
        { id: 'privacy', name: 'Privacy Protection', desc: 'How to protect personal information' },
        { id: 'tax', name: 'Tax Compliance', desc: 'Cryptocurrency tax knowledge' },
        { id: 'regulation', name: 'Legal Regulations', desc: 'Crypto policies in different countries' }
      ]
    };
    
    return topics[lang] || topics['zh'];
  }
}

module.exports = SafetyLessons;
