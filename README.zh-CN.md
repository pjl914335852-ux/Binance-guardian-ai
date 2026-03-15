# 🛡️ Binance Guardian AI

**基于 OpenClaw + 币安 API + Claude 构建的 AI 加密资产安全助手。**

旨在保护普通用户免受加密货币生态系统中的骗局、钓鱼攻击和安全风险的侵害。

> **🏆 参与币安 AI 黑客松 2026**

---

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](./LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Powered-blue.svg)](https://openclaw.ai)
[![Version](https://img.shields.io/badge/version-2.9.0-brightgreen.svg)](https://github.com/pjl914335852-ux/binance-guardian-ai/releases)
[![Binance](https://img.shields.io/badge/Binance-Ecosystem-F0B90B.svg)](https://www.binance.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js)](https://nodejs.org)
[![AI Agent](https://img.shields.io/badge/AI-Agent-FF6B6B.svg)](https://openclaw.ai)
[![Telegram](https://img.shields.io/badge/Telegram-Bot-26A5E4.svg?logo=telegram)](https://telegram.org)
[![Security](https://img.shields.io/badge/API-Read--Only-green.svg)](https://github.com/pjl914335852-ux/binance-guardian-ai#security-model)

[English](./README.md) | [中文文档](./README.zh-CN.md) | [更新日志](./CHANGELOG.md)

---

## ⚠️ 安全免责声明

**重要提示：本项目仅供教育和演示目的使用。**

- ✅ **安全使用**：只读 API 权限，无法交易或提现
- ⚠️ **非投资建议**：AI 建议仅供参考，不构成投资建议
- 🔒 **自行负责**：请务必独立验证所有信息
- 💡 **教育工具**：旨在帮助用户学习加密货币安全知识
- 🚫 **无担保**：骗局检测并非 100% 准确，请使用多个信息源

**请勿仅依赖本工具做出投资决策。务必自行研究（DYOR）。**

**📺 视频演示：** https://youtu.be/dqGWWQHO_CQ

---

## 🎯 项目愿景

**让每个家庭都有一个 AI 加密资产安全顾问**

让加密货币投资不再是年轻人的专利，让每个家庭都能安全地参与这个时代的变革。

---

## ❌ 问题背景

普通用户在加密世界面临的挑战：

- 🎣 **钓鱼网站** - 假交易所、假空投
- 💰 **骗局币种** - Pi 币、OneCoin、拉高出货
- 📜 **合约骗局** - 蜜罐、跑路、未验证合约
- 🔑 **私钥被盗** - 社会工程、假客服
- 📚 **技术门槛** - 复杂术语、难懂界面

**大多数安全工具对普通用户来说过于专业。**

---

## ✅ 解决方案

**Binance Guardian AI** — 你的 24/7 AI 安全伙伴

基于 OpenClaw 框架，由 Claude/Gemini 驱动，专为以下用户设计：
- 👵 **长辈用户** - 想安全投资的父母
- 🔰 **新手小白** - 刚接触加密货币的人
- 👨‍👩‍👧‍👦 **家庭守护** - 保护家人资产安全

### 核心功能

```
🛡️ 监控风险      → 实时检测骗局
🗣️ 人话翻译      → 专业术语变白话
📚 每日教育      → 30 天安全课程
🔔 即时警报      → 24/7 监控通知
💼 安全连接      → 只读 API 集成
```

---

## 🏗️ 系统架构

![系统架构图](./docs/images/architecture.png)

### 三层架构设计

```
┌─────────────────────────────────────┐
│         用户层                      │
│  Telegram 机器人 / Web 界面         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       AI 代理层                     │
│  OpenClaw + Claude/Gemini           │
│  风险检测 + 智能分析                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     集成层                          │
│  币安 API + 区块链浏览器            │
│  NOFX + 骗局数据库                  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    基础设施层                       │
│  VPS + pm2 + 日志 + 监控            │
└─────────────────────────────────────┘
```

### 架构概览

系统由四层组成：

**用户层**  
Telegram 机器人界面，面向普通用户。移动端友好的聊天界面，为长辈用户提供简化控制，为交易者提供高级功能。

**AI 代理层**  
由 Claude/Gemini 驱动的 OpenClaw 代理。执行风险检测、自然语言处理和智能决策。

**集成层**  
币安 API 提供市场数据，9 条区块链浏览器用于合约验证，NOFX 提供 AI500 排名，以及公共骗局数据库。

**基础设施层**  
轻量级 VPS 部署，配备 pm2 进程管理、日志记录、监控和配置管理。

**核心组件：**
- **用户层** - Telegram 接口（移动端友好）
- **AI 代理** - OpenClaw 编排 + 双模型路由
- **集成层** - 币安 API（只读）+ 9 条区块链浏览器
- **基础设施** - 轻量级 VPS 部署（~32MB 内存）

---

## 🎬 功能演示

**📺 观看完整演示视频：**

[![Binance Guardian AI 演示](https://img.youtube.com/vi/dqGWWQHO_CQ/maxresdefault.jpg)](https://youtu.be/dqGWWQHO_CQ)

*点击观看 YouTube 视频（2 分钟）*

---

### 示例场景：空投钓鱼检测

<table>
<tr>
<td width="50%">

**用户提问：**
```
我收到了一个空投链接。
安全吗？

链接：https://fake-binance-airdrop.com
```

</td>
<td width="50%">

**Guardian AI 回复：**
```
⚠️ 检测到潜在钓鱼风险

这个链接不是币安官方的。

🚨 警告信号：
• 域名不是 binance.com
• 可疑的 URL 模式
• 不在我们的验证列表中

💡 建议：
不要连接你的钱包到这个网站。
不要输入你的私钥。

✅ 安全替代方案：
只使用币安官方网站：
https://www.binance.com
```

</td>
</tr>
</table>

---

### 场景 1：Pi 币安全检查

<table>
<tr>
<td width="50%">

**用户提问：**
```
Pi 币能买吗？
```

</td>
<td width="50%">

**Guardian AI 回复：**
```
⚠️ Pi 币风险预警

妈，Pi 币目前还没有在币安
上线。有些交易所虽然有交易，
但那些是"欠条"（IOU）。

🚨 主要风险：
1. 兑换困难
2. 诈骗高发
3. 合规缺位

💡 安全建议：
• 优先选择币安等大平台
• 不要相信私聊推荐
• 不要点击不明链接
```

</td>
</tr>
</table>

---

### 场景 2：合约地址检测

<table>
<tr>
<td width="50%">

**用户输入：**
```
0x1234567890abcdef...
（粘贴合约地址）
```

</td>
<td width="50%">

**Guardian AI 分析：**
```
🔍 合约安全分析

🛡️ 安全评分：45/100
🔴 风险等级：极高风险

网络：Base
合约：Unknown Token

📊 检测结果：
❌ 合约未验证
⚠️ 交易数量很少（50 笔）

💡 安全建议：
1. 查看持币地址分布
2. 检查是否有审计报告
3. 小额测试能否卖出
4. 只投入能承受损失的金额
```

</td>
</tr>
</table>

---

### 场景 3：每日安全课程

<table>
<tr>
<td width="50%">

**用户操作：**
```
点击"📚 今日课程"
```

</td>
<td width="50%">

**Guardian AI 教学：**
```
📚 第 1 天：什么是加密货币？

加密货币是使用加密技术保护
的数字货币。

关键要点：
• 去中心化（无银行控制）
• 区块链技术
• 无法伪造

💡 记住：
只投入你能承受损失的金额！

进度：1/30 课程
```

</td>
</tr>
</table>

---

## ✨ 核心功能

### 🛡️ 守护者模式（面向新手）

**简化 5 键界面：**
- 🛡️ **快速验证** - 即时币种/合约检测
- 📊 **风险评分** - 4 维度安全评估（0-100 分）
- 📚 **今日课程** - 30 天加密安全课程
- 📖 **今日案例** - 真实骗局案例（匿名化）
- 🎙️ **语音播报** - 音频安全简报

**多链支持（9 条区块链）：**
- EVM 链：Ethereum、BSC、Polygon、Arbitrum、Optimism、Avalanche、Fantom、Base
- 非 EVM：Solana

**安全评分：**
- 🟢 80-100：低风险
- 🟡 60-79：中等风险
- 🟠 40-59：高风险
- 🔴 0-39：极高风险

### ⚙️ 专业模式（面向交易者）

**高级功能：**
- 💼 **账户管理** - 充值、提现、交易历史
- 📈 **市场数据** - K 线图、深度、最近成交
- ⏰ **价格提醒** - 4 种提醒类型，30 秒监控
- 🔥 **AI500 排行** - NOFX 热点币数据
- 💻 **系统监控** - CPU、内存、磁盘使用

---

## 🚀 快速开始

### 前置要求

```bash
Node.js 18+
Telegram Bot Token
币安 API Key（只读权限）
```

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/pjl914335852-ux/Binance-guardian-ai.git
cd Binance-guardian-ai

# 安装依赖
npm install

# 配置
cp config.example.json config.json
nano config.json  # 添加你的 tokens

# 运行
node crypto-scout.js
```

### 配置文件

**最小配置：**

```json
{
  "telegram": {
    "botToken": "你的_BOT_TOKEN",
    "chatId": "你的_CHAT_ID"
  },
  "cryptoex": {
    "apiKey": "你的_币安_API_KEY",
    "apiSecret": "你的_币安_API_SECRET"
  }
}
```

**⚠️ 安全提示：** 只使用**只读** API 权限！

**文档资源：**
- 📖 [安装指南](./docs/INSTALLATION.md)
- 🏗️ [系统架构](./docs/architecture.md)
- 🔒 [安全模型](./docs/security-model.md)

---

## 🔒 安全模型

### API 密钥保护

1. **只读权限** - 无法交易或提现
2. **本地存储** - 密钥本地保存，不上传
3. **IP 白名单** - 可选 IP 限制
4. **定期轮换** - 建议每 90 天更换

### 数据隐私

- ✅ 所有数据本地存储
- ✅ 不上传第三方
- ✅ 密码加密存储（bcrypt）
- ✅ 临时文件自动清理

### 守护者模式保护

- 🔐 密码保护模式切换
- 👨‍👩‍👧‍👦 家庭安全简化界面
- ⚠️ 清晰的风险警告
- 🚨 紧急帮助指南

---

## 🗺️ 开发路线图

### ✅ v2.9.0 - 多链合约检测（2026-03-15）
- [x] 9 条区块链支持
- [x] 0-100 分安全评分
- [x] 合约验证检查
- [x] 交易数量分析

### 🚀 v2.10.0 - 增强合约分析（2026 Q2）
- [ ] 蜜罐检测
- [ ] 持币地址分布分析
- [ ] 流动性池分析
- [ ] 代币锁定状态检查
- [ ] 审计报告集成（CertiK/SlowMist API）

### 🤖 v2.11.0 - AI 增强（2026 Q2）
- [ ] 高级 AI 风险预测
- [ ] 个性化投资建议
- [ ] 行为模式分析
- [ ] 智能投资组合推荐

### 🌍 v2.12.0 - 多平台扩展（2026 Q3）
- [ ] WhatsApp 集成
- [ ] Discord Bot
- [ ] 微信小程序
- [ ] Web Dashboard

### 📱 v3.0.0 - 移动应用（2026 Q4）
- [ ] iOS 原生应用
- [ ] Android 原生应用
- [ ] 跨平台同步
- [ ] 推送通知

**完整路线图：** [ROADMAP.md](./ROADMAP.md)

---

## 📊 项目统计

**开发数据：**
- 📅 开发时间：15 天
- 💻 代码行数：6,000+
- 📝 Git 提交：30+
- 📚 文档文件：10+

**性能指标：**
- ⚡ 响应时间：<500ms
- 💾 内存占用：~32MB（空闲）
- 👥 并发用户：100+
- 🔄 可用性：99.9%
- 💰 运行成本：~¥80/月

**功能覆盖：**
- 🔗 支持区块链：9 条
- 📊 评分维度：4 个
- 🛡️ 风险等级：4 级
- 🎯 功能模块：30+

---

## 🙏 致谢

### 技术合作伙伴
- **[OpenClaw](https://openclaw.ai)** - 让这个项目成为可能的 AI 框架
- **[Binance](https://www.binance.com)** - 开放的 API 生态
- **[Anthropic](https://www.anthropic.com)** - Claude 模型
- **[Google DeepMind](https://deepmind.google)** - Gemini 模型

### 安全社区
- **[SlowMist（慢雾科技）](https://slowmist.com)** - 安全研究和案例分享
- **[余弦（Cos）](https://twitter.com/evilcos)** - 安全见解帮助我们塑造风险评估体系
- **安全研究者** - 分享案例和最佳实践

### 开源社区
- **[NOFX 社区](https://nofx.io)** - 市场数据和 AI500 评分
- **chartjs-node-canvas** - 数据可视化
- **node-telegram-bot-api** - Telegram 集成
- **axios** - HTTP 请求

**完整致谢名单：** [ACKNOWLEDGMENTS.md](./ACKNOWLEDGMENTS.md)

---

## 🤝 参与贡献

我们欢迎社区贡献！查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详情。

**贡献方式：**
- 🐛 报告 Bug
- 💡 提出功能建议
- 📝 改进文档
- 🔧 提交代码
- 🌍 帮助翻译

---

## 📄 开源协议

AGPL-3.0 License - 查看 [LICENSE](./LICENSE) 了解详情

---

## 📞 联系方式

- **GitHub：** https://github.com/pjl914335852-ux/Binance-guardian-ai
- **Telegram：** @Ee_7t
- **问题反馈：** https://github.com/pjl914335852-ux/Binance-guardian-ai/issues

---

## 🌟 Star 历史

如果这个项目帮助你或你的家人在加密货币投资中保持安全，请给我们一个 ⭐！

---

**让加密货币投资更安全，从保护你的家人开始。** 🛡️

🏆 **本项目参与币安 AI 黑客松 2026**
