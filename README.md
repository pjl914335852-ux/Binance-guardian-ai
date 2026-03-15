# 🛡️ Binance Guardian AI

**AI-powered crypto security assistant built with OpenClaw + Binance API + Claude.**

Designed to protect everyday users from scams, phishing attacks, and security risks in the crypto ecosystem.

---

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](./LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Powered-blue.svg)](https://openclaw.ai)
[![Version](https://img.shields.io/badge/version-2.9.0-brightgreen.svg)](https://github.com/pjl914335852-ux/binance-guardian-ai/releases)
[![Binance](https://img.shields.io/badge/Binance-Ecosystem-F0B90B.svg)](https://www.binance.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js)](https://nodejs.org)
[![AI Agent](https://img.shields.io/badge/AI-Agent-FF6B6B.svg)](https://openclaw.ai)
[![Telegram](https://img.shields.io/badge/Telegram-Bot-26A5E4.svg?logo=telegram)](https://telegram.org)
[![Security](https://img.shields.io/badge/API-Read--Only-green.svg)](https://github.com/pjl914335852-ux/binance-guardian-ai#security-model)

[English](./README.md) | [中文文档](./README.zh-CN.md) | [Changelog](./CHANGELOG.md)

---

## ⚠️ Security Disclaimer

**IMPORTANT: This project is for educational and demonstration purposes only.**

- ✅ **Safe to Use**: Read-only API access, cannot trade or withdraw
- ⚠️ **Not Financial Advice**: AI suggestions are informational, not investment recommendations
- 🔒 **Your Responsibility**: Always verify information independently
- 💡 **Educational Tool**: Designed to help users learn about crypto security
- 🚫 **No Guarantees**: Scam detection is not 100% accurate, use multiple sources

**Do not rely solely on this tool for investment decisions. Always do your own research (DYOR).**

**📺 Video Demo:** https://youtu.be/dqGWWQHO_CQ

---

## 🎯 Vision

**Making crypto investment accessible and safe for everyone — not just tech-savvy traders.**

Every family deserves an AI crypto security advisor.

---

## ❌ The Problem

Ordinary users face challenges in the crypto world:

- 🎣 **Phishing Websites** - Fake exchanges, fake airdrops
- 💰 **Scam Coins** - Pi coin, OneCoin, pump-and-dump schemes
- 📜 **Contract Scams** - Honeypots, rug pulls, unverified contracts
- 🔑 **Private Key Theft** - Social engineering, fake customer service
- 📚 **Technical Barriers** - Complex jargon, confusing interfaces

**Most security tools are too technical for ordinary users.**

---

## ✅ The Solution

**Binance Guardian AI** — Your 24/7 AI security companion

Built on OpenClaw framework, powered by Claude/Gemini, designed for:
- 👵 **Elderly users** who want to invest safely
- 🔰 **Beginners** learning about crypto
- 👨‍👩‍👧‍👦 **Families** protecting their loved ones

### What It Does

```
🛡️ Monitor Risks      → Detect scams in real-time
🗣️ Explain Simply     → Translate crypto jargon to plain language
📚 Educate Daily      → 30-day safety course
🔔 Alert Instantly    → 24/7 monitoring + notifications
💼 Connect Safely     → Read-only Binance API integration
```

---

## 🏗️ Architecture

![System Architecture](./docs/images/architecture.png)

### Three-Layer Design

```
┌─────────────────────────────────────┐
│         User Layer                  │
│  Telegram Bot / Web Interface       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       AI Agent Layer                │
│  OpenClaw + Claude/Gemini           │
│  Risk Detection + Analysis          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     Integration Layer               │
│  Binance API + Blockchain Explorers │
│  NOFX + Scam Database               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Infrastructure Layer             │
│  VPS + pm2 + Logs + Monitoring      │
└─────────────────────────────────────┘
```

### Architecture Overview

The system consists of four layers:

**User Layer**  
Telegram bot interface for everyday users. Mobile-friendly chat UI with simplified controls for elderly users and advanced features for traders.

**AI Agent Layer**  
OpenClaw agent powered by Claude/Gemini. Performs risk detection, natural language processing, and intelligent decision-making.

**Integration Layer**  
Binance API for market data, 9 blockchain explorers for contract verification, NOFX for AI500 ranking, and public scam databases.

**Infrastructure Layer**  
Lightweight VPS deployment with pm2 process management, logging, monitoring, and configuration management.

**Key Components:**
- **User Layer** - Telegram interface (mobile-friendly)
- **AI Agent** - OpenClaw orchestration + dual-model routing
- **Integration** - Binance API (read-only) + 9 blockchain explorers
- **Infrastructure** - Lightweight VPS deployment (~32MB memory)

---

## 🎬 Demo

**📺 Watch Full Demo Video:**

[![Binance Guardian AI Demo](https://img.youtube.com/vi/dqGWWQHO_CQ/maxresdefault.jpg)](https://youtu.be/dqGWWQHO_CQ)

*Click to watch on YouTube (2 minutes)*

---

### Example Scenario: Airdrop Phishing Detection

<table>
<tr>
<td width="50%">

**User Question:**
```
I received an airdrop link. 
Is it safe?

Link: https://fake-binance-airdrop.com
```

</td>
<td width="50%">

**Guardian AI Response:**
```
⚠️ Potential Phishing Risk Detected

This link is NOT from Binance official.

🚨 Warning Signs:
• Domain is not binance.com
• Suspicious URL pattern
• Not in our verified list

💡 Recommendation:
DO NOT connect your wallet to this site.
DO NOT enter your private keys.

✅ Safe Alternative:
Only use official Binance website:
https://www.binance.com
```

</td>
</tr>
</table>

---

### Scenario 1: Pi Coin Safety Check

<table>
<tr>
<td width="50%">

**User Question:**
```
Can I buy Pi coin?
```

</td>
<td width="50%">

**Guardian AI Response:**
```
⚠️ Pi Coin Risk Warning

Mom, Pi coin hasn't listed on 
Binance yet. Some exchanges 
have trading, but those are IOUs.

🚨 Main Risks:
1. Exchange Difficulty
2. High Scam Rate
3. Compliance Gap

💡 Safety Tips:
• Prioritize Binance/Coinbase
• Don't trust private messages
• Don't click unknown links
```

</td>
</tr>
</table>

---

### Scenario 2: Contract Address Check

<table>
<tr>
<td width="50%">

**User Input:**
```
0x1234567890abcdef...
(paste contract address)
```

</td>
<td width="50%">

**Guardian AI Analysis:**
```
🔍 Contract Security Analysis

🛡️ Security Score: 45/100
🔴 Risk Level: Critical Risk

Network: Base
Contract: Unknown Token

📊 Detection:
❌ Contract not verified
⚠️ Only 50 transactions

💡 Advice:
1. Check holder distribution
2. Look for audit reports
3. Test selling first
4. Only invest what you can lose
```

</td>
</tr>
</table>

---

### Scenario 3: Daily Safety Lesson

<table>
<tr>
<td width="50%">

**User Action:**
```
Click "📚 Today's Lesson"
```

</td>
<td width="50%">

**Guardian AI Teaches:**
```
📚 Day 1: What is Cryptocurrency?

Cryptocurrency is digital money 
that uses encryption for security.

Key Points:
• Decentralized (no bank control)
• Blockchain technology
• Cannot be counterfeited

💡 Remember:
Only invest what you can afford 
to lose!

Progress: 1/30 lessons
```

</td>
</tr>
</table>

---

## ✨ Core Features

### 🛡️ Guardian Mode (For Beginners)

**Simplified 5-Button Interface:**
- 🛡️ **Quick Check** - Instant coin/contract verification
- 📊 **Risk Score** - 4-dimension safety assessment (0-100)
- 📚 **Daily Lesson** - 30-day crypto safety course
- 📖 **Scam Cases** - Real-world examples (anonymized)
- 🎙️ **Voice Report** - Audio safety briefings

**Multi-Chain Support (9 Blockchains):**
- EVM: Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche, Fantom, Base
- Non-EVM: Solana

**Security Scoring:**
- 🟢 80-100: Low Risk
- 🟡 60-79: Medium Risk
- 🟠 40-59: High Risk
- 🔴 0-39: Critical Risk

### ⚙️ Professional Mode (For Traders)

**Advanced Features:**
- 💼 **Account Management** - Deposits, withdrawals, trade history
- 📈 **Market Data** - K-line charts, depth, recent trades
- ⏰ **Price Alerts** - 4 alert types, 30s monitoring
- 🔥 **AI500 Ranking** - NOFX hot coin data
- 💻 **System Monitor** - CPU, memory, disk usage

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+
Telegram Bot Token
Binance API Key (Read-Only)
```

### Installation

```bash
# Clone repository
git clone https://github.com/pjl914335852-ux/Binance-guardian-ai.git
cd Binance-guardian-ai

# Install dependencies
npm install

# Configure
cp config.example.json config.json
nano config.json  # Add your tokens

# Run
node crypto-scout.js
```

### Configuration

**Minimum Required:**

```json
{
  "telegram": {
    "botToken": "YOUR_BOT_TOKEN",
    "chatId": "YOUR_CHAT_ID"
  },
  "cryptoex": {
    "apiKey": "YOUR_BINANCE_API_KEY",
    "apiSecret": "YOUR_BINANCE_API_SECRET"
  }
}
```

**⚠️ Security:** Use **Read-Only** API permissions only!

**Documentation:**
- 📖 [Installation Guide](./docs/INSTALLATION.md)
- 🏗️ [System Architecture](./docs/architecture.md)
- 🔒 [Security Model](./docs/security-model.md)

---

## 🔒 Security Model

### API Key Protection

1. **Read-Only Permissions** - Cannot trade or withdraw
2. **Local Storage** - Keys stored locally, never uploaded
3. **IP Whitelist** - Optional IP restriction
4. **Regular Rotation** - Recommended every 90 days

### Data Privacy

- ✅ All data stored locally
- ✅ No third-party uploads
- ✅ Encrypted password storage (bcrypt)
- ✅ Auto-cleanup of temporary files

### Guardian Mode Protection

- 🔐 Password-protected mode switching
- 👨‍👩‍👧‍👦 Family-safe simplified interface
- ⚠️ Clear risk warnings
- 🚨 Emergency help guides

---

## 🗺️ Roadmap

### ✅ v2.9.0 - Multi-Chain Contract Detection (2026-03-15)
- [x] 9 blockchain support
- [x] 0-100 security scoring
- [x] Contract verification check
- [x] Transaction count analysis

### 🚀 v2.10.0 - Enhanced Contract Analysis (2026 Q2)
- [ ] Honeypot detection
- [ ] Holder distribution analysis
- [ ] Liquidity pool analysis
- [ ] Token lock status check
- [ ] Audit report integration (CertiK/SlowMist API)

### 🤖 v2.11.0 - AI Enhancement (2026 Q2)
- [ ] Advanced AI risk prediction
- [ ] Personalized investment advice
- [ ] Behavior pattern analysis
- [ ] Smart portfolio recommendations

### 🌍 v2.12.0 - Multi-Platform (2026 Q3)
- [ ] WhatsApp integration
- [ ] Discord bot
- [ ] WeChat mini-program
- [ ] Web dashboard

### 📱 v3.0.0 - Mobile App (2026 Q4)
- [ ] iOS native app
- [ ] Android native app
- [ ] Cross-platform sync
- [ ] Push notifications

**Full Roadmap:** [ROADMAP.md](./ROADMAP.md)

---

## 📊 Project Statistics

**Development:**
- 📅 Development Time: 15 days
- 💻 Lines of Code: 6,000+
- 📝 Git Commits: 30+
- 📚 Documentation: 10+ files

**Performance:**
- ⚡ Response Time: <500ms
- 💾 Memory Usage: ~32MB (idle)
- 👥 Concurrent Users: 100+
- 🔄 Uptime: 99.9%
- 💰 Running Cost: ~$11/month

**Coverage:**
- 🔗 Blockchains: 9
- 📊 Scoring Dimensions: 4
- 🛡️ Risk Levels: 4
- 🎯 Features: 30+

---

## 🙏 Acknowledgments

### Technology Partners
- **[OpenClaw](https://openclaw.ai)** - AI framework that made this possible
- **[Binance](https://www.binance.com)** - Open API ecosystem
- **[Anthropic](https://www.anthropic.com)** - Claude model
- **[Google DeepMind](https://deepmind.google)** - Gemini model

### Security Community
- **[SlowMist](https://slowmist.com)** - Security research and case studies
- **[Cos](https://twitter.com/evilcos)** - Security insights that shaped our risk assessment
- **Security researchers** - For sharing cases and best practices

### Open Source
- **[NOFX Community](https://nofx.io)** - Market data and AI500 scoring
- **chartjs-node-canvas** - Data visualization
- **node-telegram-bot-api** - Telegram integration
- **axios** - HTTP requests

**Full Credits:** [ACKNOWLEDGMENTS.md](./ACKNOWLEDGMENTS.md)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Ways to contribute:**
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit pull requests
- 🌍 Help with translations

---

## 📄 License

AGPL-3.0 License - see [LICENSE](./LICENSE) for details

---

## 📞 Contact

- **GitHub:** https://github.com/pjl914335852-ux/Binance-guardian-ai
- **Telegram:** @Ee_7t
- **Issues:** https://github.com/pjl914335852-ux/Binance-guardian-ai/issues

---

## 🌟 Star History

If this project helps you or your family stay safe in crypto, please give us a ⭐!

---

**Making Crypto Investment Safer, One Family at a Time.** 🛡️

**Participating in Binance AI Hackathon 2026**
