// Language translations for Trading Scout
// 交易侦察员多语言支持

const translations = {
  en: {
    // Validation messages
    'config.missing': '❌ Missing required configuration:',
    'config.edit': '\nPlease edit config.json and fill in the following:',
    'config.customPairs.exceeded': '❌ Custom pairs exceeded limit:',
    'config.customPairs.reduce': 'Please reduce the number of pairs in trading.customPairs',
    'config.interval.tooShort': '❌ Price update interval too short:',
    'config.interval.increase': 'Please increase rateLimit.priceUpdateInterval or trading.checkInterval',
    'config.validated': '✅ Configuration validated',
    
    // File errors
    'config.notFound': '❌ Configuration file not found',
    'config.notFound.hint': '\nPlease run: cp config.example.json config.json',
    'config.notFound.edit': 'Then edit config.json to fill in your configuration',
    'config.loadFailed': '❌ Failed to load configuration file:',
    
    // Telegram
    'telegram.initialized': '✅ Telegram Bot initialized successfully',
    'telegram.sent': '✅ Telegram notification sent',
    'telegram.failed': '❌ Failed to send Telegram notification:',
    
    // Startup
    'startup.title': '🦞 OpenClaw Trading Scout Started',
    'startup.powered': '💰 Powered by NOFX Community Data',
    'startup.config': '📋 Configuration:',
    'startup.basePairs': '  Base pairs:',
    'startup.customPairs': '  🔧 Custom pairs:',
    'startup.aiPairs': '  🤖 AI Agent recommendations:',
    'startup.totalPairs': '  Total monitoring:',
    'startup.checkInterval': '  Check interval:',
    'startup.priceUpdate': '  Price update:',
    'startup.volumeUpdate': '  Volume update:',
    'startup.threshold': '  Spread threshold:',
    'startup.minVolume': '  Min volume:',
    'startup.rateLimit': '  API rate limit:',
    'startup.telegram': '  Telegram:',
    'startup.configured': 'Configured ✅',
    'startup.notConfigured': 'Not configured ❌',
    'startup.tagline': '🎯 NOFX Professional Data + AI Analysis = More Profit Opportunities',
    'startup.running': '✅ Trading Scout is running...',
    'startup.stopHint': '💡 Press Ctrl+C to stop',
    
    // Main loop
    'loop.checking': '🦞 Trading Scout checking...',
    'loop.apiStatus': '📊 API Status:',
    'loop.requests': 'requests',
    'loop.remaining': 'remaining',
    'loop.pricesFailed': '⚠️  Failed to fetch prices, skipping this check\n',
    'loop.volumesFailed': '⚠️  Failed to fetch volumes, using cached data\n',
    'loop.currentPrices': '\n📊 Current Prices:',
    'loop.cacheInitialized': '\n✅ Price cache initialized, will start detecting opportunities next check',
    'loop.monitoring': '💡 Monitoring',
    'loop.pairs': 'pairs',
    'loop.base': 'base:',
    'loop.custom': 'custom:',
    'loop.ai': 'AI:',
    'loop.separator': '─'.repeat(50) + '\n',
    
    // Opportunities
    'opp.found': '\n🎯 Found',
    'opp.opportunities': 'arbitrage opportunities:\n',
    'opp.spread': '  Spread:',
    'opp.risk': '| Risk:',
    'opp.suggestion': '  💡 Suggestion:',
    'opp.none': '\n😴 No arbitrage opportunities\n',
    
    // Telegram notification
    'notify.title': '🚨 *Arbitrage Opportunity Found!*',
    'notify.powered': '_Powered by NOFX Precise Data_',
    'notify.pairs': 'Pairs:',
    'notify.spread': 'Spread:',
    'notify.risk': 'Risk Level:',
    'notify.change': 'Change:',
    'notify.suggestion': '💡 Suggestion:',
    'notify.time': '⏰ Time:',
    'notify.tagline': '🎯 *NOFX Professional Data - Discover More Profit Opportunities*',
    'notify.buy': 'Buy',
    'notify.sell': 'Sell',
    
    // Statistics
    'stats.history': '📈 Historical opportunities:',
    'stats.priceUpdate': '🔄 Price update:',
    'stats.volumeUpdate': '📊 Volume update:',
    'stats.ago': 'ago',
    
    // Shutdown
    'shutdown.title': '👋 Trading Scout Stopped',
    'shutdown.total': '📊 Total opportunities found:',
    'shutdown.recent': '\n📝 Recent 5 opportunities:',
    'shutdown.none': '\n😴 No opportunities found during this session',
    'shutdown.thanks': '\n💰 Thanks for using NOFX Trading Scout!',
    
    // Errors
    'error.fetchPrices': '❌ Failed to fetch prices:',
    'error.fetchVolumes': '❌ Failed to fetch volumes:',
    'error.mainLoop': '❌ mainLoop execution failed:',
    
    // Time units
    'time.seconds': 'seconds',
    'time.s': 's',
    
    // Risk levels
    'risk.low': 'low',
    'risk.medium': 'medium',
    'risk.high': 'high',
  },
  
  zh: {
    // Validation messages
    'config.missing': '❌ 缺少必需配置:',
    'config.edit': '\n请编辑 config.json 并填写以下配置:',
    'config.customPairs.exceeded': '❌ 自定义交易对超过限制:',
    'config.customPairs.reduce': '请减少 trading.customPairs 中的交易对数量',
    'config.interval.tooShort': '❌ 价格更新间隔过短:',
    'config.interval.increase': '请增加 rateLimit.priceUpdateInterval 或 trading.checkInterval',
    'config.validated': '✅ 配置验证通过',
    
    // File errors
    'config.notFound': '❌ 配置文件不存在',
    'config.notFound.hint': '\n请运行: cp config.example.json config.json',
    'config.notFound.edit': '然后编辑 config.json 填写你的配置',
    'config.loadFailed': '❌ 配置文件加载失败:',
    
    // Telegram
    'telegram.initialized': '✅ Telegram Bot 初始化成功',
    'telegram.sent': '✅ Telegram 通知已发送',
    'telegram.failed': '❌ Telegram 通知发送失败:',
    
    // Startup
    'startup.title': '🦞 OpenClaw 交易侦察员启动',
    'startup.powered': '💰 由 NOFX 社区精准数据支持',
    'startup.config': '📋 配置信息:',
    'startup.basePairs': '  基础交易对:',
    'startup.customPairs': '  🔧 自定义交易对:',
    'startup.aiPairs': '  🤖 AI 智能体推荐:',
    'startup.totalPairs': '  总监控数:',
    'startup.checkInterval': '  检查间隔:',
    'startup.priceUpdate': '  价格更新:',
    'startup.volumeUpdate': '  交易量更新:',
    'startup.threshold': '  价差阈值:',
    'startup.minVolume': '  最小交易量:',
    'startup.rateLimit': '  API 限流:',
    'startup.telegram': '  Telegram:',
    'startup.configured': '已配置 ✅',
    'startup.notConfigured': '未配置 ❌',
    'startup.tagline': '🎯 NOFX 专业数据 + AI 智能分析 = 发现更多盈利机会',
    'startup.running': '✅ 交易侦察员正在运行...',
    'startup.stopHint': '💡 按 Ctrl+C 停止',
    
    // Main loop
    'loop.checking': '🦞 交易侦察员正在检查...',
    'loop.apiStatus': '📊 API 状态:',
    'loop.requests': '请求',
    'loop.remaining': '剩余',
    'loop.pricesFailed': '⚠️  获取价格失败，跳过本次检查\n',
    'loop.volumesFailed': '⚠️  获取交易量失败，使用缓存数据\n',
    'loop.currentPrices': '\n📊 当前价格:',
    'loop.cacheInitialized': '\n✅ 价格缓存已初始化，下次检查将开始发现机会',
    'loop.monitoring': '💡 监控',
    'loop.pairs': '个交易对',
    'loop.base': '基础:',
    'loop.custom': '自定义:',
    'loop.ai': 'AI:',
    'loop.separator': '─'.repeat(50) + '\n',
    
    // Opportunities
    'opp.found': '\n🎯 发现',
    'opp.opportunities': '个套利机会:\n',
    'opp.spread': '  价差:',
    'opp.risk': '| 风险:',
    'opp.suggestion': '  💡 建议:',
    'opp.none': '\n😴 暂无套利机会\n',
    
    // Telegram notification
    'notify.title': '🚨 *套利机会发现！*',
    'notify.powered': '_由 NOFX 精准数据驱动_',
    'notify.pairs': '交易对:',
    'notify.spread': '价差:',
    'notify.risk': '风险等级:',
    'notify.change': '变化:',
    'notify.suggestion': '💡 建议:',
    'notify.time': '⏰ 时间:',
    'notify.tagline': '🎯 *NOFX 专业数据支持 - 发现更多盈利机会*',
    'notify.buy': '买入',
    'notify.sell': '卖出',
    
    // Statistics
    'stats.history': '📈 历史机会数:',
    'stats.priceUpdate': '🔄 价格更新:',
    'stats.volumeUpdate': '📊 交易量更新:',
    'stats.ago': '前',
    
    // Shutdown
    'shutdown.title': '👋 交易侦察员停止',
    'shutdown.total': '📊 总共发现',
    'shutdown.recent': '\n📝 最近 5 个机会:',
    'shutdown.none': '\n😴 本次运行未发现套利机会',
    'shutdown.thanks': '\n💰 感谢使用 NOFX 交易侦察员！',
    
    // Errors
    'error.fetchPrices': '❌ 获取价格失败:',
    'error.fetchVolumes': '❌ 获取交易量失败:',
    'error.mainLoop': '❌ mainLoop 执行失败:',
    
    // Time units
    'time.seconds': '秒',
    'time.s': '秒',
    
    // Risk levels
    'risk.low': '低',
    'risk.medium': '中',
    'risk.high': '高',
  }
};

// Get translation
function t(key, lang = 'en') {
  return translations[lang]?.[key] || translations.en[key] || key;
}

// Get current language from config
function getCurrentLanguage(config) {
  return config.language || 'en';
}

module.exports = {
  translations,
  t,
  getCurrentLanguage
};
