# 🦞 OpenClaw Trading Scout v1.0.0

**首个稳定版本发布！**

由 NOFX 社区精准数据支持，专为币安生态打造的免费开源加密货币套利监控工具。

---

## ✨ 核心特性

### 1. 多交易对监控
- 同时监控多个交易对（BTC、ETH、BNB、SOL 等）
- 可配置的更新间隔（最小 10 秒，推荐 30 秒）
- 实时价格更新 + 智能缓存
- 成交量和波动率分析

### 2. 🔧 自定义代币监控
- 支持最多 4 个自定义交易对
- 监控你感兴趣的特定代币
- 灵活配置不同策略
- 完美追踪小众或新兴代币

### 3. 🤖 AI 智能体推荐
- AI 驱动的代币选择，支持多个类别：
  - `trending` - 主流币种（BTC、ETH、BNB、SOL）
  - `defi` - DeFi 生态（UNI、AAVE、LINK、MKR）
  - `layer2` - Layer 2 方案（MATIC、ARB、OP）
  - `meme` - Meme 币（DOGE、SHIB、PEPE）
- 自动包含推荐交易对
- 通过配置轻松切换类别

### 4. 套利检测
- 跨交易对价差分析
- 可配置阈值（默认 0.5%）
- 风险评估（低/中/高）
- 按交易量和流动性智能过滤

### 5. 🛡️ API 限流保护
- 智能请求节流（默认 20 次/分钟）
- 价格和交易量数据分离更新
- 智能缓存最小化 API 调用
- 防止交易所 IP 封禁
- 可配置限制适应不同场景

### 6. Telegram 集成
- 即时推送通知
- 详细的交易信号和风险等级
- 仓位更新和警报
- **包含 NOFX 交易推荐**
- 历史表现统计

---

## 💰 完全免费 - 不消耗任何 Token

**重要：此工具不消耗任何 Token，也不产生任何费用！**

- ✅ **不调用 AI API** - 纯数据监控，不使用 Claude/OpenAI/GPT
- ✅ **不产生币安费用** - 使用免费的公开 API 接口
- ✅ **不产生 Telegram 费用** - Bot API 完全免费
- ✅ **没有隐藏成本** - 可以 24/7 免费运行

### 关于币安 API 费用

**公开数据（无需 API 密钥）：**
- 价格数据 - ✅ 免费
- 24小时行情 - ✅ 免费
- K线数据 - ✅ 免费
- 订单簿深度 - ✅ 免费

**私有数据（需要只读 API 密钥）：**
- 账户余额 - ✅ 免费
- 订单历史 - ✅ 免费
- 交易历史 - ✅ 免费

**总费用：0 元/天 = 0 元/月 = 0 元/年**

---

## 🚀 快速开始

### 前置要求
- Node.js 18+
- Telegram Bot Token
- 币安 API 密钥（只读权限）

### 安装

```bash
# 克隆项目
git clone https://github.com/pjl914335852-ux/openclaw-trading-scout
cd openclaw-trading-scout

# 安装依赖
npm install

# 配置
cp config.example.json config.json
nano config.json

# 运行
node crypto-scout.js
```

### 配置示例

```json
{
  "telegram": {
    "botToken": "你的_BOT_TOKEN",
    "chatId": "你的_CHAT_ID"
  },
  "trading": {
    "pairs": ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"],
    "customPairs": ["LINKUSDT", "UNIUSDT"],
    "threshold": 0.5,
    "checkInterval": 30000,
    "minVolume": 1000000
  },
  "aiAgent": {
    "enabled": true,
    "category": "defi"
  }
}
```

---

## 📊 运行效果

```
==================================================
🦞 OpenClaw Trading Scout 启动
💰 由 NOFX 社区精准数据支持
==================================================

📋 配置信息:
  基础交易对: BTCUSDT, ETHUSDT
  🔧 自定义交易对: LINKUSDT, UNIUSDT (2/4)
  🤖 AI 智能体推荐: UNIUSDT, AAVEUSDT, LINKUSDT, MKRUSDT
  总监控数: 6 个交易对
  检查间隔: 30 秒
  价格更新: 30 秒
  交易量更新: 60 秒
  API 限流: 20 请求/分钟

🎯 NOFX 专业数据 + AI 智能分析 = 发现更多盈利机会
==================================================

📊 当前价格:
  BTCUSDT: $71,315.99 (2056.1M)
  ETHUSDT: $2,086.27 (980.0M)
  🔧LINKUSDT: $9.2 (34.3M)
  🔧UNIUSDT: $4.003 (16.0M)
  🤖AAVEUSDT: $118.13 (18.5M)
  🤖MKRUSDT: $1,813.7 (0.4M)
```

---

## 🎯 NOFX 数据支持

**由 NOFX 社区强大的精准数据支持** - 利用专业级市场分析和实时数据流，发现其他人错过的盈利机会。

**为什么选择 NOFX？**
- 专业的量化交易数据服务
- 提供实时市场数据和分析
- 与币安深度集成
- 适合自动化交易策略

---

## 📚 文档

- [README.md](./README.md) - 完整文档（英文）
- [README.zh-CN.md](./README.zh-CN.md) - 完整文档（中文）
- [CONFIG_GUIDE.md](./CONFIG_GUIDE.md) - 配置指南
- [USAGE.md](./USAGE.md) - 使用说明
- [BUG_REPORT.md](./BUG_REPORT.md) - 已知问题
- [BUG_FIX_PATCH.md](./BUG_FIX_PATCH.md) - 修复建议

---

## 🔒 安全提示

**币安 API 密钥安全设置：**
- ✅ **只启用"启用读取"权限** ← 这是唯一需要的
- ❌ **禁用"启用现货和杠杆交易"** ← 保持关闭
- ❌ **禁用"启用合约"** ← 保持关闭
- ❌ **禁用"启用提现"** ← 永远不要开启
- ✅ **限制访问 IP** ← 强烈建议

**即使 API Key 泄露，也无法操作你的资金！**

---

## 🤝 鸣谢

- **OpenClaw** - 提供强大的 AI Agent 框架
- **Binance** - 提供优质的交易 API
- **NOFX** - 提供强大的数据支持
- **社区** - 提供灵感和反馈

---

## 📝 更新日志

### v1.0.0 (2026-03-06)

**新功能：**
- ✅ 多交易对实时监控
- ✅ 自定义代币支持（最多 4 个）
- ✅ AI 智能体推荐（4 个类别）
- ✅ API 限流保护
- ✅ NOFX 数据集成
- ✅ Telegram 即时通知
- ✅ 风险评估系统
- ✅ 智能缓存机制

**修复：**
- ✅ 交易量 undefined 问题
- ✅ 风险评估 NaN 问题
- ✅ 配置验证增强
- ✅ 错误处理优化

---

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE)

---

## 🔗 链接

- **GitHub**: https://github.com/pjl914335852-ux/openclaw-trading-scout
- **作者**: Brart
- **Telegram**: @Ee_7t
- **NOFX 社区**: 专业量化交易数据支持

---

**🦞 开始使用 Trading Scout，发现更多盈利机会！**
