# Changelog

## [2.7.0] - 2026-03-08

### 🎉 重大更新 - 语音功能 + 界面优化 + 完整教程

#### 新增功能

**🎙️ 语音功能（2个）**
- **语音识别**: OpenAI Whisper API 驱动，发送语音消息自动识别并回答
  - 双语支持（中英文）
  - 成本约 ¥0.1/次对话
  - 自动识别并显示结果
  - 错误提示和故障排除
  
- **语音播报**: 每日安全播报，支持手机自带朗读
  - 5 种骗局类型轮换
  - 8 个安全提示轮换
  - 可分享给家人
  - 按钮触发（非定时推送）

**🔧 交互式语音配置**
- **一键配置**: 点击按钮直接配置 OpenAI API Key
  - 显示当前状态（已启用/未启用）
  - 发送 API Key 自动保存并重启
  - 详细的获取教程
  - 测试功能按钮
  
- **完整设置指南**: 
  - 如何获取 API Key
  - 费用说明（约 ¥0.1/次）
  - 安全提示
  - 常见问题解答

**📊 智能风险评分**
- **4 维度评估**: 安全审计(40%) + 市场排名(30%) + 代币信息(20%) + 骗局检查(10%)
- **5 个风险等级**: 安全、低风险、中风险、高风险、极高风险
- **详细报告**: 包含评分、风险等级、建议
- **历史记录**: 保存评估历史

**🚨 紧急求助功能**
- **5 种自救指南**: 疑似骗局、交易问题、账户安全、技术问题、其他问题
- **详细步骤**: 每种场景都有详细的自救步骤
- **官方资源**: 链接到币安官方支持
- **增强"其他问题"**: 添加费用说明、常见功能、安全提醒

**📖 真实骗局案例**
- **5 个真实案例**: 匿名化处理，每日轮换
- **详细分析**: 真实故事、危险信号、教训总结、防范方法
- **教育意义**: 从真实案例中学习

#### 界面优化

**守护模式菜单（5行）**
- 核心安全功能（检查币种、风险评分）
- 学习功能（今日课程、今日案例）
- 语音和求助（语音播报、紧急求助）
- 设置（语言、帮助）
- 模式切换（居中显示，✅ 标记）

**专业模式菜单（9行）**
- 核心安全功能
- 学习功能
- 语音和求助
- 账户和市场
- 套利设置（阈值、间隔）
- AI 和价格提醒（AI500 排行、价格提醒）
- 推送和系统（推送开关、系统监控）
- 帮助（居中显示）
- 设置和模式

**功能分组优化**
- 相关功能放在一起
- 重要按钮居中显示
- 添加 ✅ 状态标记
- 移除冗余按钮

#### 文档更新

**README.md 完整教程**
- **API 绑定教程**: 
  - Telegram Bot 设置（详细步骤）
  - Binance API 设置（只读权限）
  - OpenAI API 设置（可选）
  - 完整配置文件示例
  - 配置选项表格

- **语音功能启用指南**:
  - 4 步启用教程
  - 成本估算表格
  - 故障排除指南
  - 测试步骤

- **功能说明更新**:
  - 语音识别功能
  - 语音播报功能
  - 智能风险评分
  - 紧急求助
  - 真实案例学习

#### Bug 修复

**语音功能 409 错误修复**
- 添加延迟避免并发请求（100-200ms）
- 所有 API 调用添加错误处理
- 优化消息删除和发送顺序
- 改进错误提示信息

**紧急求助优化**
- 修复"其他问题"内容不显示
- 添加类型检查避免 undefined
- 增强错误处理

**用户体验改进**
- 语音未启用时显示设置按钮
- 识别失败时显示详细原因
- 所有操作添加加载提示
- 优化按钮布局和文字

#### 技术改进

- 新增 `handleVoiceSetup()` - 交互式语音配置
- 新增 `handleVoiceConfigApi()` - API Key 配置处理
- 新增 `userStates` 状态管理 - 处理用户输入流程
- 优化 `handleVoiceMessage()` - 避免 409 错误
- 增强 `handleEmergencyType()` - 完善"其他问题"内容
- 改进错误处理 - 所有异步操作添加 `.catch()`

#### 统计数据

- 总功能数: 35+
- 新增功能: 8 个
- 代码行数: +1,200 行
- 内存使用: ~35MB
- 响应时间: <500ms
- 支持语言: 中文、英文

---

## [2.6.0] - 2026-03-07

### 🎉 重大更新 - 全能守护者

#### 新增功能

**💼 账户管理功能（5个）**
- **充值记录查询**: 查看最近10条充值记录，显示币种、数量、时间、网络、状态
- **提现记录查询**: 查看最近10条提现记录，完整的交易信息
- **充值地址生成**: 支持任意币种，快捷访问常用币种，显示地址和标签/Memo
- **现货交易历史**: 查看最近10条交易，显示价格、数量、买卖方向
- **合约交易历史**: 占位功能，提示风险

**📊 市场数据可视化（3个）**
- **K线图生成**: 24小时K线图，PNG图片输出，1小时间隔，专业图表外观
- **市场深度数据**: 显示前5档买卖盘口，价格和数量，买卖价差计算
- **最新成交记录**: 显示最近15笔成交，价格、数量、时间、买卖方向

**⏰ 价格提醒系统（3个）**
- **价格提醒管理**: 4种提醒类型（价格高于/低于、涨跌幅超过），最多10个活跃提醒
- **提醒创建向导**: 分步骤创建，实时价格显示，示例值引导
- **提醒管理**: 查看活跃/已触发提醒，删除提醒

#### 界面优化

**守护模式 vs 专业模式 UI 差异化**
- **守护模式**: 简化菜单（4行），只显示安全功能，隐藏高级交易功能
- **专业模式**: 完整菜单（8行），所有高级功能可见，包含价格提醒、交易对管理等
- **密码保护**: 守护模式需要密码才能关闭

#### 技术改进

- 新增 `price-alerts.js` 模块 - 完整的价格提醒管理系统
- 集成 chartjs-node-canvas - 专业图表生成
- 自动监控系统 - 每30秒检查价格提醒
- 持久化存储 - 所有配置和提醒自动保存
- 完善的错误处理 - 所有Promise都有错误处理
- 内存优化 - 定时器清理，无内存泄漏

#### Bug修复

- 修复了重复消息问题
- 修复了帮助内容不匹配问题
- 添加了所有Promise的错误处理
- 初始化了priceAlerts配置
- 优化了内存管理

#### 依赖更新

- 新增 chartjs-node-canvas: ^4.1.6
- 新增 chart.js: ^4.4.1

#### 统计数据

- 总功能数: 30+
- 新增功能: 11个
- 代码行数: +2,016行
- 内存使用: ~32MB
- 响应时间: <500ms

---

## [2.5.0] - 2026-03-06

### 💼 Binance Account & Language Switch

#### Added
- **Binance Account Integration:** View your portfolio from Telegram
  - **Spot Holdings:** View all spot balances with pagination
    - Shows free, locked, and total amounts
    - 10 items per page
    - Sorted by total value (highest first)
    - Refresh button to update data
  
  - **Futures Positions:** View all futures positions with pagination
    - Shows position side (LONG/SHORT)
    - Entry price, mark price, leverage
    - Unrealized PnL for each position
    - Total PnL summary
    - 5 items per page
    - Color indicators: 🟢 LONG, 🔴 SHORT
    - Profit indicators: 📈 profit, 📉 loss
  
  - **Earn Products:** Placeholder for future implementation
    - Currently shows info message
    - Requires Binance Earn API permission

- **Language Switch Menu:** Dedicated language switcher
  - Moved from main menu to submenu
  - Shows current language
  - Cleaner UI separation
  - Supports English and Chinese

- **Pagination System:** Handle large datasets
  - Previous/Next buttons
  - Page counter (X/Y pages)
  - Refresh button on each page
  - Smooth navigation

#### Changed
- **Main Menu UI:** Reorganized to 4 rows
  - Row 1: Status, Modify Pairs
  - Row 2: History, Last Summary
  - Row 3: System Monitor, Binance Account (NEW!)
  - Row 4: Language Switch (NEW!), Help
  - Removed inline language buttons

#### Technical
- Added `handleBinanceAccount()` function
- Added `handleLanguageSwitch()` function
- Added `handleSpotHoldings(page)` with pagination
- Added `handleFuturesPositions(page)` with pagination
- Added `handleEarnProducts()` placeholder
- Uses Binance REST API:
  - Spot: `GET /api/v3/account`
  - Futures: `GET /fapi/v2/positionRisk`
- HMAC SHA256 signature authentication
- Read-only API (safe, no trading)
- Callback data format: `spot_holdings_{page}`, `futures_positions_{page}`

#### Fixed
- Fixed NOFX API configuration check in AI500 ranking
- Added `nofx` config to config.json
- Better error handling for missing API keys
- Shows friendly error messages

#### Security
- Read-only API keys required
- No trading permissions needed
- Safe for viewing only
- API keys stored in config.json (not in code)

#### Benefits
- Monitor your positions from Telegram
- No need to open Binance app/website
- Quick portfolio overview
- Real-time PnL tracking
- Pagination for large portfolios
- Multi-language support

---

## [2.4.0] - 2026-03-06

### 🔥 AI500 Ranking & Auto-Push

#### Added
- **AI500 Ranking:** View hot coins with high potential
  - Added "🔥 AI500排行" button in pairs page
  - Display TOP 10 high-score coins from NOFX
  - Show AI500 score, price, 24h change percentage
  - Refresh button to update data in real-time
  - Sorted by AI500 score (highest first)
  - Medal indicators: 🥇🥈🥉 for top 3
  - Score emoji: 🔥 (≥80), ⚡ (≥60), 💫 (<60)

- **AI500 Auto-Push:** Get notified of hot coins automatically
  - Check AI500 hot coins every hour
  - Push notification when AI500 score ≥ 80
  - Only push new high-score coins (avoid duplicates)
  - Auto-cleanup coins that drop below threshold
  - Requires autoPush enabled
  - Shows coin symbol, AI500 score, price, 24h change

#### Changed
- **Pairs Page UI:** Reorganized to 5 rows
  - Row 1: Add Pair, Remove Pair
  - Row 2: Set Interval, Set Threshold
  - Row 3: Toggle Push, Market Overview
  - Row 4: AI500 Ranking (NEW!), Test Alert
  - Row 5: History, Back to Menu

#### Technical
- Added `handleAI500Ranking()` function in telegram-ui.js
- Added `checkAI500HotCoins()` function in crypto-scout.js
- Added `state.lastAI500Check` timestamp
- Added `state.ai500HighScoreCoins` Set for tracking
- Uses NOFX API `getAI500List()` endpoint
- Check interval: 1 hour (3600000ms)
- Push threshold: AI500 score ≥ 80
- Callback handler: `ai500_ranking`

#### Fixed
- Fixed nofxApi variable name (should be nofxAPI)
- Fixed API method name (getAI500List instead of getHighPotentialCoins)

#### Benefits
- Discover hot coins with high potential
- Get notified of new opportunities automatically
- Track AI500 rankings anytime
- NOFX professional data integration
- No need to check website manually

---

## [2.3.0] - 2026-03-06

### 🚀 Language Sync & System Monitor

#### Added
- **System Monitor Feature:** View server status from Telegram
  - Added `/system` command
  - Added "💻 系统监控" button in main menu
  - Real-time display of:
    - System uptime
    - CPU usage (total, user, system, load average)
    - Memory usage (total, used, available, free)
    - Disk usage (total, used, available, percentage)
    - Bot process info (PID, memory)
  - Refresh button to update data
  - No SSH needed to check server health

#### Changed
- **Language Synchronization:** UI language now syncs with daily summaries
  - Click 🇬🇧 English → saves `language: "en"` to config
  - Click 🇨🇳 中文 → saves `language: "zh"` to config
  - Dynamic reload without service restart
  - Changed `const lang` to `let lang` for runtime updates
  - Daily summaries now match UI language

- **Daily Summary Times:** Optimized for better user activity patterns
  - Before: 09:00, 14:00, 20:00
  - After: 08:00, 12:00, 20:00
  - 08:00 - Morning wake up time
  - 12:00 - Lunch time
  - 20:00 - Evening after work

#### Technical
- Added `onConfigChange` callback for dynamic language reload
- System monitor uses Linux commands (free, df, uptime, top)
- Multi-language support for system monitor (EN/ZH)
- Main menu reorganized to 4 rows

#### Benefits
- Unified language experience across all features
- Monitor server health without SSH
- Better timing for daily summaries
- Quick troubleshooting from Telegram

---

## [2.2.0] - 2026-03-06

### 🎯 Major Feature Additions

#### Added
- **Adjustable Threshold:** Control arbitrage sensitivity (0.1%-1.0%)
  - Added "🎯 套利阈值" button in pairs page
  - Default: 0.5%
  - Lower threshold = more opportunities
  - Higher threshold = better quality

- **Market Overview:** Real-time price monitoring
  - Added "📊 市场概览" button in pairs page
  - Shows all monitored pairs with:
    - Current price
    - 24h change percentage
    - 24h trading volume
  - Refresh anytime

- **Test Alert:** Verify bot is working
  - Added "🧪 测试通知" button in pairs page
  - Sends simulated arbitrage notification
  - Check notification format and content

- **Daily Market Summary:** Automated market reports (3x/day)
  - Sends at 09:00, 14:00, 20:00
  - Content includes:
    - 📈 Top 3 gainers
    - 📉 Top 3 losers
    - 📊 Statistics (pairs, volume, opportunities)
    - 🎯 Recent opportunities
  - Keeps users informed even without arbitrage

- **View Last Summary:** Check previous summary anytime
  - Added "📅 上次摘要" button in main menu
  - Cached summary text
  - Shows next summary time if none exists

#### Changed
- **Pairs Page UI:** Reorganized to 5 rows
  - Row 1: Add Pair, Remove Pair
  - Row 2: Set Interval, Set Threshold (NEW!)
  - Row 3: Toggle Push, Market Overview (NEW!)
  - Row 4: Test Alert (NEW!), History
  - Row 5: Back to Menu

- **Main Menu UI:** Added Last Summary button
  - Row 1: Status, Modify Pairs
  - Row 2: History, Last Summary (NEW!)
  - Row 3: Help
  - Row 4: Language switch

#### Technical
- Added `prevPriceCache` for price change tracking
- Added `lastDailySummary` timestamp
- Added `lastSummaryText` for caching
- Added `scheduleDailySummary()` function
- Added `sendDailySummary()` function
- 14 callback handlers registered

#### Benefits
- More control over opportunity frequency
- Better market visibility
- Verify bot is working anytime
- Regular market updates
- Feel like app is actively working

---

## [2.1.0] - 2026-03-06

### 🎉 Major UI/UX Improvements & Bug Fixes

#### Fixed
- **Critical:** Fixed duplicate messages issue caused by multiple bot instances
  - Root cause: manual start + systemd auto-restart = 2 instances
  - Solution: Use systemd exclusively for service management
  - Added `restart.sh` script for safe restarts
  - Added `SERVICE.md` documentation

- **UI Bugs:**
  - Fixed toggle push creating duplicate interfaces (added 500ms delay)
  - Fixed help button not responding (removed duplicate callback handling)
  - Fixed remove pair showing nothing when empty (now shows friendly message with buttons)
  - Fixed help message being too long (split into 2 messages)

#### Added
- **Heartbeat Feature:** Bot sends status report every 2 hours
  - Shows uptime, checks count, opportunities found
  - Lets users know the bot is actively working
  - Added to state: `lastHeartbeat`, `checksCount`

- **UI Enhancements:**
  - Added "Back to Menu" button in pairs page
  - Added "Back to Menu" buttons in both help messages
  - Added "How It Works" section in help (6-step explanation)
  - Added heartbeat feature description in main menu
  - Improved remove pair empty state with Add/Back buttons

- **Documentation:**
  - Added `SERVICE.md` - Service management guide
  - Added `restart.sh` - Safe restart script
  - Updated help text with work principle explanation

#### Changed
- **Remove Pair:** Now only accepts number input (1-N), not pair names
  - Simplified user experience
  - Better validation with range display
  - UI text: "请发送要删除的交易对编号"

- **Help Page:** Split into 2 messages for better readability
  - Message 1: About + How It Works + Heartbeat
  - Message 2: Commands + Features + Tips + Back button
  - Prevents Telegram parsing issues with long messages

#### Technical
- Improved callback query handling consistency
- Better error messages for edge cases
- Log monitoring: ~1KB/minute growth (healthy)
- Service management via systemd only

### Commits
- c875c4c: Add back button to both help messages
- cf91054: Prevent duplicate instances with systemd management
- ee3f15b: Split help message into two parts
- 3cf40cc: Fix help button and remove pair UI issues
- f217bfe: UI improvements and documentation enhancements
- 8af08ed: Fix toggle push UI bug and add heartbeat feature

---

## [2.0.0] - 2026-03-06

### 🚀 NOFX API Integration

#### Added
- NOFX API integration for professional market data
- Signal quality scoring (0-100)
- Fund flow tracking
- Interactive Telegram UI with inline keyboards
- Multi-language support (EN/ZH)
- AI500 score integration
- Enhanced risk assessment

#### Features
- Real-time monitoring (30s interval)
- NOFX data updates (5min interval)
- Interactive commands: /start, /status, /pairs, /history, /help
- Custom pair management
- Refresh interval settings (10-300s)
- Auto-push toggle

---

## [1.0.0] - 2026-03-05

### Initial Release
- Basic price monitoring
- Simple spread detection
- Telegram notifications
- Multi-exchange support
