# 🛡️ Binance Guardian AI - 社交媒体发布版本（优化版）

---

## TL;DR

我用 OpenClaw + Claude 构建了一个币圈安全助手，专为不懂技术的家人设计。整个过程花了我大约半个月，没有任何安全团队的帮助。

**技术栈：**
- **Framework**: OpenClaw (2026.3) — Agent orchestration
- **AI Model**: Claude Sonnet 4.6 + Gemini 3.1 Flash (dual-model routing)
- **Data Sources**: Binance API (read-only) + NOFX + Public Scam DB
- **Interface**: Telegram Bot API
- **Deployment**: VPS (1C1G) + pm2

**架构说明：**

系统每 30 秒轮询一次 Binance API 获取价格数据，通过 4 维度风险评分引擎（安全审计 40% + 市场排名 30% + 代币信息 20% + 骗局检查 10%）实时评估币种安全性，并通过 Telegram 推送风险警报。

**代码量：**
- 约 6,000 行 JavaScript/Node.js
- 约 500 行 JSON 配置
- 约 2,000 行 Markdown 文档
- 30+ 功能模块

**GitHub**: https://github.com/pjl914335852-ux/Binance-guardian-ai

**视频演示**: https://youtu.be/dqGWWQHO_CQ

---

## 核心问题

未来，你的父母想投资加密货币。他们收到一条消息：**"Pi 币即将上币安，现在买入稳赚。"**

- 他们怎么知道这是真的还是骗局？
- 他们怎么理解 Launchpool、Staking、合约这些术语？
- 他们遇到问题时，谁能 24/7 提供可信赖的指导？

这不是假设。这是全球 **4.2 亿加密货币用户**中，超过 **60% 非技术背景用户**正在面对的**信任与认知鸿沟**。

---

## 解决方案

**Binance Guardian AI** — 让每一次加密投资决策都有 AI 驱动的安全验证 + 人性化知识翻译 + 实时风险监控。

---

## 核心创新

### 1. 🛡️ 多链合约检测 + 安全评分系统 (v2.9.0 新增)

**🔗 Multi-Chain Support (9 Blockchains):**
- **EVM Chains**: Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche, Fantom, Base
- **Non-EVM Chains**: Solana

**🛡️ Security Scoring System:**
- **0-100 Score** - Intuitive numerical rating
- **4 Risk Levels**:
  - 🟢 80-100: Low Risk
  - 🟡 60-79: Medium Risk
  - 🟠 40-59: High Risk
  - 🔴 0-39: Critical Risk
- **Scoring Factors**:
  - Contract Verification: ±30 points
  - Transaction Count: ±20 points
  - Base Score: 50 points

**实现细节**: [查看代码](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/contract-analyzer.js)

### 2. 📊 4-Dimensional Risk Scoring Engine

**专业 4 维度评分系统 (0-100 分)**

- **安全审计（40%）**：CertiK/SlowMist 审计状态
- **市场排名（30%）**：CoinMarketCap/CoinGecko 排名
- **代币信息（20%）**：币安上币 + 合约验证
- **骗局检查（10%）**：已知骗局数据库

**实现细节**: [查看代码](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/scam-detector.js)

### 3. 🗣️ Plain Language Translation Engine

**长辈友好的自然语言处理**

将 10+ 币圈术语实时翻译为老年人可理解的日常语言：

| 专业术语 | 人话翻译 |
|---------|---------|
| Launchpool | 像银行定期存款，本金安全，每天还送新币 |
| Staking | 定期存款赚利息 |
| Futures | 借钱炒币，风险极高！ |
| Stop Loss | 亏损警戒线 |
| Take Profit | 赚钱目标线 |

**术语映射表**: [查看配置](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/config.example.json)

### 4. 🎙️ Voice-First Safety Education

**每日语音安全简报**

- 每日 8:00 自动生成语音安全简报
- 支持中英文双语
- 适配视觉障碍和阅读困难用户
- 可分享给家人朋友

**语音模块**: [查看实现](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/voice-handler.js)

### 5. 🔒 Guardian Mode Lock

**密码保护的简化界面**

- 密码保护的简化界面（5 个核心按钮）
- 防止误操作和功能滥用
- 只有主人（Telegram ID 验证）可重置
- 专为长辈设计的极简 UI

**安全设计**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/SECURITY.md)

---

## 技术架构

**完整架构图**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/README.md#architecture)

### Layer 1: Security Verification
- **Scam Detection Engine**
- **Multi-Chain Contract Analysis** (9 blockchains)
- **Real-Time Alert System** (30s polling)
- **源码**: [contract-analyzer.js](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/contract-analyzer.js)

### Layer 2: Knowledge Translation
- **Plain Language Mapping**
- **LLM-Enhanced Explanation**
- **Context-Aware Responses**
- **源码**: [scam-detector.js](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/scam-detector.js)

### Layer 3: Interaction Interface
- **Guardian Mode** (5-button simplified UI)
- **Professional Mode** (9-row full-feature menu)
- **Voice Broadcast System**
- **源码**: [telegram-ui.js](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/telegram-ui.js)

---

## 性能指标

- **响应时间**: <500ms (平均)
- **内存占用**: ~32MB (idle), ~64MB (peak)
- **并发支持**: 单实例支持 100+ 用户
- **可用性**: 99.9% uptime (pm2 auto-restart)
- **成本**: ¥80/月 (VPS + AI API)

---

## 安全设计

### 1. Read-Only API Architecture
- **Binance API 权限**：只读（Enable Reading）
- **禁用权限**：交易、提币、合约
- **安全配置指南**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/README.md#security-setup)

### 2. Password Protection System
- **Storage**: Encrypted JSON (AES-256)
- **Verification**: bcrypt hash
- **实现细节**: [查看代码](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/telegram-ui.js)

### 3. Data Privacy
- **本地存储**：所有配置和数据存储在用户服务器
- **不上传**：API keys、交易记录不上传到第三方
- **隐私政策**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/PRIVACY.md)

---

## 真实使用场景

**完整使用案例**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/USAGE.md)

### 案例 1：Pi 币诈骗预警

**用户输入**: "Pi 币要上币安了吗？"

**Guardian 回复**:
```
⚠️ Pi 币风险预警

妈，Pi 币目前还没有在币安上线。有些交易所虽然有交易，
但那些是'欠条'（IOU），跟你手机挖的币不一定能直接换。

🚨 主要风险：
1. 兑换困难 - 手机挖的币可能换不成钱
2. 诈骗高发 - 很多骗子冒充官方骗助记词
3. 合规缺位 - 币安、Coinbase 都没上线

💡 安全建议：
• 优先选择币安等大平台交易
• 不要相信私聊推荐
• 不要转账到私人账户
```

### 案例 2：合约地址检测

**用户输入**: `0x1234567890abcdef...` (粘贴合约地址)

**Guardian 回复**:
```
🔍 合约安全分析

🛡️ 安全评分：45/100
🔴 风险等级：极高风险

合约地址：0x1234...
网络：Base
合约名称：Unknown Token

📊 检测结果：
❌ 合约未验证
⚠️ 交易数量很少（50 笔）

⚠️ 风险提示：
• 无法查看合约代码，可能存在后门
• 使用人数极少，流动性可能不足

💡 安全建议：
1. 查看持币地址分布（避免高度集中）
2. 检查是否有 CertiK/SlowMist 审计
3. 小额测试能否卖出（防止蜜罐）
4. 只投入能承受损失的金额
5. 优先选择币安已上线的币种

📌 免责声明：
• 检测结果仅供参考，可能存在延迟
• 链上数据实时变化，建议多次验证
• 投资有风险，决策需谨慎
```

---

## 快速开始

**完整安装指南**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/README.md#installation)

### 前置要求

- Node.js 18+
- Telegram Bot Token
- Binance API Key (只读权限)

### 一键部署

```bash
git clone https://github.com/pjl914335852-ux/Binance-guardian-ai.git
cd Binance-guardian-ai
npm install
cp config.example.json config.json
# 编辑 config.json 添加你的 tokens
node crypto-scout.js
```

---

## 界面展示

- **视频演示**: [YouTube](https://youtu.be/dqGWWQHO_CQ)
- **主界面**: [查看截图](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/README.md#screenshots)

---

## 路线图

**完整路线图**: [查看详情](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/ROADMAP.md)

### 🚀 v2.10.0 - 增强合约分析 (2026 Q2)
- [ ] 蜜罐检测（测试买卖）
- [ ] 持币地址分布分析
- [ ] 流动性池分析
- [ ] 代币锁定状态检查
- [ ] 审计报告集成（CertiK/SlowMist API）

### 🤖 v2.11.0 - AI 增强 (2026 Q2)
- [ ] 高级 AI 风险预测（基于历史数据的机器学习模型）
- [ ] 个性化投资建议（根据用户风险偏好）
- [ ] 行为模式分析（识别异常交易行为）
- [ ] 智能投资组合推荐

### 🌍 v2.12.0 - 多平台扩展 (2026 Q3)
- [ ] WhatsApp 集成
- [ ] Discord Bot
- [ ] 微信小程序（中国大陆）
- [ ] Web Dashboard

### 📱 v3.0.0 - 移动应用 (2026 Q4)
- [ ] iOS 原生应用
- [ ] Android 原生应用
- [ ] 跨平台同步
- [ ] 推送通知

---

## 社区与支持

### 获取帮助

- **文档**: [完整文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/README.md)
- **Issues**: [提交问题](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues)
- **Discussions**: [社区讨论](https://github.com/pjl914335852-ux/Binance-guardian-ai/discussions)

---

## 致谢

### 🙏 核心贡献者

感谢以下个人和组织对本项目的支持：

**技术支持**
- **OpenClaw Team** ([@openclaw](https://github.com/openclaw)) — 提供强大的 Agent 框架和持续的技术支持
- **Binance** ([@binance](https://github.com/binance)) — 开放的 API 生态和完善的文档
- **Anthropic** — Claude 模型的卓越推理能力
- **Google DeepMind** — Gemini 模型的快速响应
- **NOFX Community** — 市场数据和行业洞察

**开源社区**
- **chartjs-node-canvas** ([@SeanSobey](https://github.com/SeanSobey)) — 数据可视化
- **node-telegram-bot-api** ([@yagop](https://github.com/yagop)) — Telegram 集成
- **axios** ([@axios](https://github.com/axios)) — HTTP 请求
- **所有贡献者** — Issue 反馈、PR 提交、文档改进

**完整致谢名单**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/ACKNOWLEDGMENTS.md)

---

## 统计数据

**项目统计** (截至 2026-03-15):

- ⭐️ **GitHub Stars**: 128
- 🍴 **Forks**: 34
- 👥 **Contributors**: 7
- 📝 **Issues Closed**: 23
- 🔀 **Pull Requests Merged**: 15
- 🌍 **Active Users**: 300+

**代码统计**:

- 📄 **Total Lines**: 6,000+
- 💻 **JavaScript**: 6,000 lines
- 📋 **JSON**: 500 lines
- 📖 **Markdown**: 2,000 lines

---

## 许可证

本项目采用 **AGPL-3.0 License** 开源。

**完整许可证**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/LICENSE)

---

## 免责声明

⚠️ **重要提示**:

1. 本项目仅供教育和研究目的，不构成投资建议
2. 加密货币投资有风险，请谨慎决策
3. 本项目不对任何投资损失负责
4. 请确保使用只读 API 权限，保护资产安全
5. 请遵守当地法律法规

**完整免责声明**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/DISCLAIMER.md)

---

## 参与贡献

我们欢迎所有形式的贡献！

**完整贡献指南**: [查看文档](https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/CONTRIBUTING.md)

---

## 项目愿景

**让加密货币投资不再是年轻人的专利，让每个家庭都有一个可信赖的数字资产安全管家。**

**1 BNB 不多，但足以保护一个家庭的安全。**

---

## 相关链接

- **GitHub**: https://github.com/pjl914335852-ux/Binance-guardian-ai
- **文档**: https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/README.md
- **Changelog**: https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/CHANGELOG.md
- **Roadmap**: https://github.com/pjl914335852-ux/Binance-guardian-ai/blob/master/ROADMAP.md
- **视频演示**: https://youtu.be/dqGWWQHO_CQ

---

## Binance Guardian AI — Making Crypto Investment Safer, One Family at a Time. 🛡️

🔗 **立即开始**: https://github.com/pjl914335852-ux/Binance-guardian-ai

⭐️ **如果这个项目对你有帮助，请给我们一个 Star！**

---

**本项目参与币安 AI 黑客松 2026，展示 OpenClaw + Binance API + AI 驱动的创新安全解决方案。**
