# Binance Guardian AI 🛡️

> Making Crypto Investment Safer - An AI-powered safety assistant built on OpenClaw, designed for beginners and elderly users

[![License: AGPL--3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](./LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Powered-blue.svg)](https://openclaw.ai)
[![Version](https://img.shields.io/badge/version-2.9.0-brightgreen.svg)](https://github.com/pjl914335852-ux/binance-guardian-ai/releases)
[![Binance](https://img.shields.io/badge/Binance-Ecosystem-F0B90B.svg)](https://www.binance.com)
[![Security](https://img.shields.io/badge/API-Read--Only-green.svg)](https://github.com/pjl914335852-ux/binance-guardian-ai#security)

[English](./README.md) | [中文文档](./README.zh-CN.md) | [Changelog](./CHANGELOG.md)

---

## 🔒 Security Declaration

**Zero-Write Access:** Binance Guardian AI strictly requires **Read-Only API permissions**. We never ask for withdrawal or trading permissions. Your assets remain in your control, 100%.

---

## 🎯 Why Binance Guardian?

### Real-World Scenarios

**Scenario 1: Mom Asks**
> "Son, my friend says Pi coin is listing on Binance soon and I should buy now. Is it true?"

**Scenario 2: Beginner Confusion**
> "What is Binance Launchpool? Will I lose money?"

**Scenario 3: Investment Anxiety**
> "My coin dropped 20%, should I sell?"

### Our Solution

**Binance Guardian AI** is an AI safety assistant designed specifically for crypto beginners and elderly users, built on the OpenClaw framework. It can:

- 🛡️ **Identify Scams** - Cross-reference global scam databases, real-time risk detection
- 🗣️ **Plain Language Translation** - Translate crypto jargon into simple terms (Senior Mode)
- 📚 **Safety Education** - Daily lessons, master crypto basics in 30 days
- 💼 **Asset Protection** - Real-time market structure analysis, intelligent risk alerts
- 🔔 **Anomaly Alerts** - 24/7 monitoring, instant notification of account anomalies

---

## 🌟 Core Value

### Value to Binance Ecosystem

1. **User Protection** - Reduce scam victims, protect user assets
2. **User Education** - Lower entry barriers, expand user base
3. **Ecosystem Health** - Promote compliant projects, filter out scams
4. **Brand Enhancement** - Demonstrate Binance's commitment to user safety

### Social Value

1. **Lower Crypto Barriers** - Enable non-technical people to invest safely
2. **Help Elderly Users** - Bring seniors into the crypto world
3. **Reduce Scam Cases** - Identify common scams (Pi coin, air coins)
4. **Improve Industry Image** - Showcase positive value of cryptocurrency

---

## 🏗️ System Architecture

![System Architecture](./docs/images/architecture.png)

**Architecture Overview:**

```
User
 │
 │ Telegram Interface
 ▼
AI Guardian Agent
 │
 ├─► Risk Detection
 ├─► AI Analysis
 └─► Binance API
      │
      ▼
 Security Alert
```

**Key Components:**
- **Telegram Interface** - User-friendly chat interface
- **AI Guardian Agent** - OpenClaw + Claude/Gemini dual-model routing
- **Risk Detection** - 4-dimension scoring engine + scam database
- **AI Analysis** - Natural language processing + plain language translation
- **Binance API** - Real-time market data (read-only)
- **Security Alert** - 24/7 monitoring + instant notifications

---

## ✨ Key Features

### 🛡️ Guardian Mode (Default)

**Core Safety Features:**

#### 1. Quick Safety Check 🛡️
**Fast verification for coins and contract addresses**

**Two Query Methods:**
- ✅ **Coin Name** (BTC, ETH, DOGE, etc.)
- ✅ **Contract Address** (0x1234... format)

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

**Use Cases:**
- Elderly received a recommendation, want quick verification
- Someone sent a contract address, unsure if it's a scam
- Quick judgment on whether to buy

**Instant Results:**
- ✅ **Safe** - Listed on Binance, low risk
- ⚠️ **Risk** - Not on Binance, or has warning signs
- ❌ **Scam** - Known scam, do not invest!

**Example:**
```
User: "0x1234567890abcdef..." (paste contract address)

Guardian: "🔍 Contract Security Analysis

🛡️ Security Score: 45/100
🔴 Risk Level: Critical Risk

Contract Address: 0x1234...
Network: Base
Contract Name: Unknown Token

📊 Detection Results:
❌ Contract not verified
⚠️ Very few transactions (50)

⚠️ Risk Warnings:
• Cannot view contract code, may have backdoors
• Very few users, liquidity may be insufficient

💡 Safety Advice:
1. Check holder distribution (avoid high concentration)
2. Check for CertiK/SlowMist audit
3. Test selling (small amount first)
4. Only invest what you can afford to lose
5. Prefer Binance-listed coins

📌 Disclaimer:
• Detection results are for reference only, may have delays
• On-chain data changes in real-time, verify multiple times
• Investment carries risks, make decisions carefully"
```
• Project team rug pull
• Insufficient liquidity

💡 Safety Advice:
⚠️ Strongly recommend: Only trade Binance-listed coins

If you must buy on-chain tokens:
1. Check if contract is verified on Etherscan/BSCScan
2. Check for CertiK/SlowMist audit
3. View holder distribution (avoid high concentration)
4. Test selling (small amount first)
5. Only invest what you can afford to lose"
```

#### 2. Deep Risk Score 📊
**Professional 4-dimension scoring system (0-100 points)**

**Only Supports Coin Names** (not contract addresses)

**Use Cases:**
- Want to invest, need detailed analysis
- Compare risk levels of multiple coins
- Learn about audit, ranking, market cap

**4 Scoring Dimensions:**
- 🔒 **Security Audit (40%)** - CertiK/SlowMist audit status
- 📈 **Market Ranking (30%)** - CoinMarketCap ranking
- 💎 **Token Info (20%)** - Binance listing + circulating supply
- 🛡️ **Scam Check (10%)** - Blacklist database

**Risk Levels:**
- 🟢 **Safe (80-100)** → Suitable for investment
- 🟡 **Low Risk (60-79)** → Invest with caution
- 🟠 **Medium Risk (40-59)** → Small amount only
- 🔴 **High Risk (20-39)** → Not for beginners
- ⛔ **Extreme Risk (0-19)** → Strongly not recommended

**Example:**
```
User: "BTC"

Guardian: "📊 Risk Score Report

Coin: BTC
Total Score: 96/100

Risk Level: 🟢 Safe

📋 Detailed Scores:

🔒 Security Audit (40%)
   Score: 100/100
   ✅ Mainstream project, multiple audits

📈 Market Ranking (30%)
   Score: 100/100
   ✅ Top 10 mainstream coin

💎 Token Info (20%)
   Score: 100/100
   ✅ Listed on Binance

🛡️ Scam Check (10%)
   Score: 100/100
   ✅ Not on scam blacklist

💡 Investment Advice:
✅ Relatively safe investment choice"
```

**Feature Comparison:**

| Feature | 🛡️ Quick Check | 📊 Risk Score |
|---------|----------------|---------------|
| **Query Method** | Coin name + Contract address | Coin name only |
| **Speed** | ⚡ Instant | 🔍 3-5 seconds |
| **Detail Level** | Simple judgment | Detailed report |
| **Use Case** | Quick verification | Investment research |
| **Suitable For** | Elderly, beginners | Investors, analysts |

#### 3. Scam Coin Database
- Identify known scam coins (Squid, BitConnect, OneCoin, etc.)
- Special handling for controversial coins (Pi Network)
- Auto-sync Binance listing status (hourly updates)
- Risk level assessment (low/medium/high/critical)
- Elderly-friendly warning messages

**Example:**
```
User: "Can I buy Pi coin?"

Guardian: "Mom, Pi coin hasn't listed on Binance yet. Some small exchanges 
have trading, but those are IOUs, not the real coins you mined on your phone.

🚨 Main Risks:
1. Exchange Difficulty - Your mined coins may not be convertible
2. High Scam Rate - Many scammers impersonate officials to steal seed phrases
3. Compliance Gap - Not listed on Binance, Coinbase, or Kraken

💡 Safety Tips:
• Prioritize major platforms like Binance
• Don't trust private messages
• Don't transfer to personal accounts
• Don't click unknown links

Reminder: Coins not on major platforms carry higher risks!"
```

#### 4. Plain Language Translator
Translate 10+ technical terms into simple language:

| Technical Term | Plain Language | Example |
|---------------|----------------|---------|
| Launchpool | Like bank fixed deposit with gift rewards | Deposit 100 USDT, principal stays safe, get new coins daily |
| Launchpad | Like IPO lottery with BNB | Use BNB to draw lots for new coins |
| Staking | Like fixed deposit earning interest | Lock for a period, earn interest |
| Spot | Direct purchase, yours immediately | Buy and own |
| Futures | Borrowing to trade, extremely risky! | ⚠️ Beginners should avoid |
| Market Order | Execute immediately at any price | Fast but price uncertain |
| Limit Order | Set price, execute when reached | Controlled price |
| Stop Loss | Set loss limit, auto-sell when reached | Protect principal |
| Take Profit | Set profit target, auto-sell when reached | Lock in gains |

#### 5. Daily Safety Lessons
10 basic courses (expandable to 30):

**Days 1-7: Basic Safety**
1. How to identify scam coins?
2. How to set secure passwords?
3. What is Two-Factor Authentication (2FA)?
4. How to identify phishing websites?
5. What are private keys? Why are they important?
6. How to safely store cryptocurrency?
7. What are seed phrases?

**Days 8-14: Trading Basics**
8. What is spot trading?
9. What is futures trading? (Warning)
10. How to set stop-loss?

**Advanced Topics (10 themes):**
- DeFi Security
- NFT Safety
- Wallet Security
- Smart Contract Risks
- Phishing Prevention
- Social Engineering
- Exchange Security
- Privacy Protection
- Tax Compliance
- Legal Regulations

#### 6. Voice Safety Report 🎙️
**Daily audio safety briefings for elderly users:**

- **Dual Language** - Chinese and English support
- **Daily Rotation** - 5 scam types + 8 safety tips rotate daily
- **Mobile-Friendly** - Long-press text to use phone's built-in text-to-speech
- **Shareable** - Forward to family members
- **Scheduled Delivery** - Auto-generated at 8:00 AM daily

**Content:**
- Latest scam alerts (fake Pi coin, phishing, fake customer service, etc.)
- Daily safety tips (seed phrases, 2FA, suspicious links, etc.)
- Guardian reminders (emergency help, community support)

**Usage:**
1. Click "🎙️ Voice Report" button
2. Select language (Chinese/English)
3. Long-press message text
4. Select "Speak" (iPhone) or "Read Aloud" (Android)
5. Or forward to elderly family members

**Suitable for:**
- Elderly who prefer audio over text
- Listening while driving
- Sharing with family and friends

#### 7. Voice Recognition 🗣️ (Optional)
**Speak to ask questions - hands-free interaction:**

- **Powered by OpenAI Whisper** - Industry-leading speech recognition
- **Bilingual Support** - Chinese and English
- **Auto-Response** - Recognizes speech and answers automatically
- **Low Cost** - ~¥0.1 per conversation
- **Privacy-Safe** - Temporary files auto-deleted after 1 hour

**How it works:**
1. Click 🎤 button next to input box
2. Speak your question
3. Bot recognizes and displays text
4. Auto-answers your question

**Example:**
```
User: [Voice] "Is Bitcoin safe?"
Bot: 🎙️ Recognized: "Is Bitcoin safe?"
     
     ✅ Bitcoin (BTC) Safety Assessment:
     
     Risk Score: 96/100 (Safe)
     
     • Listed on all major exchanges
     • Largest market cap
     • Most secure blockchain
     • Suitable for beginners
```

**Configuration:**
- Requires OpenAI API Key (see [OPENAI_CONFIG.md](./OPENAI_CONFIG.md))
- Cost: $0.006/minute (~¥0.04/minute)
- Optional feature - works without it

#### 6. Smart Risk Scoring 📊
**4-dimension comprehensive coin safety assessment:**

- **Security Audit (40%)** - CertiK, SlowMist audit status
- **Market Ranking (30%)** - CoinMarketCap/CoinGecko ranking
- **Token Info (20%)** - Binance listing, contract verification
- **Scam Check (10%)** - Known scam database

**5 Risk Levels:**
- 🟢 Safe (80-100) - BTC, ETH, BNB
- 🟡 Low Risk (60-79) - Top 50 coins
- 🟠 Medium Risk (40-59) - Top 100 coins
- 🔴 High Risk (20-39) - New/small coins
- ⛔ Critical Risk (0-19) - Known scams

**Usage:**
- Click "📊 Risk Score" button
- Enter coin name (e.g., "BTC")
- View detailed assessment report
- Save assessment history

#### 7. Emergency Help 🚨
**Self-help guides for 5 common scenarios:**

1. **Suspected Scam** - How to verify, what to do
2. **Trading Issues** - Order problems, withdrawal delays
3. **Account Security** - Unauthorized access, password reset
4. **Technical Problems** - App crashes, network errors
5. **Other Issues** - General guidance

**Features:**
- Detailed step-by-step instructions
- Quick action buttons
- Links to official resources
- Community support info

**Not a live chat** - Provides self-help guides, not real-time expert support

#### 8. Real Scam Case Studies 📖
**Learn from real-world examples:**

- **5 Real Cases** (anonymized):
  1. Fake Pi Coin Airdrop (Aunt Li, no loss)
  2. Fake Customer Service (Mr. Wang, lost 12,000 USDT)
  3. High-Yield Scam (Ms. Chen, lost 50,000 USDT)
  4. Fake Exchange (Mr. Zhao, lost 8,000 USDT)
  5. Fake Airdrop Authorization (Ms. Sun, lost 15,000 USDT)

- **Daily Rotation** - Different case each day
- **Dual Language** - Chinese and English
- **Detailed Analysis** - Story, warning signs, lessons, prevention

**Scheduled Delivery** - Auto-pushed at 9:00 PM daily

#### 9. Smart Message Recognition
Auto-detect user intent:
- Coin inquiry: "Can I buy Pi coin?" → Auto scam detection
- Term inquiry: "What is Launchpool?" → Auto translation
- Safety inquiry: "How to prevent scams?" → Safety tips
- Course inquiry: "What's today's lesson?" → Show daily lesson

---

### ⚙️ Professional Mode

**Advanced Features:**

#### 10. Account Management
- **Deposit History** - View recent 10 deposits with status
- **Withdrawal History** - View recent 10 withdrawals with status
- **Deposit Address** - Generate addresses for any coin (BTC, ETH, USDT, BNB, SOL, XRP)
- **Spot Trade History** - View recent 10 trades with buy/sell indicators
- **Futures Trade History** - Placeholder with risk warning

#### 11. Market Data Visualization
- **K-Line Charts** - 24-hour candlestick charts as PNG images
- **Market Depth** - Order book with top 5 bids/asks, spread calculation
- **Recent Trades** - Last 15 trades with buy/sell direction

#### 12. Price Alert System
- **4 Alert Types:**
  * Price Above - Alert when price exceeds target
  * Price Below - Alert when price falls below target
  * Rise Over - Alert when rise exceeds percentage
  * Fall Over - Alert when fall exceeds percentage
- **Auto Monitoring** - Check every 30 seconds
- **Instant Notifications** - Telegram push when triggered
- **Alert Management** - View active/triggered alerts, delete alerts

#### 13. Spot Holdings & Futures Positions
- View all spot balances with pagination
- View all futures positions with PnL
- Real-time data refresh

#### 14. Market Overview
- Real-time prices for major pairs
- 24h price changes
- Trading volume
- Price change tracking

#### 15. System Monitoring
- CPU usage
- Memory usage
- Disk space
- System load
- Uptime

---

## 🎨 UI Differentiation

### Guardian Mode (Default) 🛡️
**Simplified Menu (5 rows, grouped by function):**
```
┌─────────────────────────────────────┐
│  🛡️ Check Coin  │  📊 Risk Score   │  ← Core Safety
├─────────────────────────────────────┤
│  📚 Today's Lesson │ 📖 Today's Case │  ← Learning
├─────────────────────────────────────┤
│  🎙️ Voice Report │  🚨 Emergency   │  ← Voice & Help
├─────────────────────────────────────┤
│  🇬🇧 English  │  ❓ Help          │  ← Settings
├─────────────────────────────────────┤
│      🛡️ Guardian Mode: ON ✅        │  ← Mode Toggle
└─────────────────────────────────────┘
```

**Features:**
- Only safety functions visible
- Voice report for elderly users
- Emergency self-help guides
- Real scam case studies
- Clean, grouped layout
- Password protection to disable
- Suitable for beginners and elderly

#### 🔑 Forgot Guardian Password?

Send `/resetguardian` to the bot. Only the user whose Telegram ID is set in `guardian.ownerChatId` can reset the password.

**Already installed and need to set ownerChatId?**
1. Get your Telegram ID: message [@userinfobot](https://t.me/userinfobot)
2. Open `config.json`, add `"ownerChatId": YOUR_ID` inside the `guardian` section
3. Restart the bot

```json
"guardian": {
  "enabled": true,
  "ownerChatId": 123456789
}
```

### Professional Mode ⚙️
**Full Menu (9 rows, all features):**
```
┌─────────────────────────────────────┐
│  🛡️ Check Coin  │  📊 Risk Score   │  ← Core Safety
├─────────────────────────────────────┤
│  📚 Today's Lesson │ 📖 Today's Case │  ← Learning
├─────────────────────────────────────┤
│  🎙️ Voice Report │  🚨 Emergency   │  ← Voice & Help
├─────────────────────────────────────┤
│  💼 Binance Account │ 📈 Market     │  ← Account & Market
├─────────────────────────────────────┤
│  🎯 Threshold  │  ⏱️ Interval      │  ← Arbitrage Settings
├─────────────────────────────────────┤
│  🔥 AI500 Ranking │ ⏰ Price Alerts │  ← AI & Alerts
├─────────────────────────────────────┤
│  🔔 Push Toggle │  💻 System       │  ← Push & System
├─────────────────────────────────────┤
│            ❓ Help                  │  ← Help (centered)
├─────────────────────────────────────┤
│  🇬🇧 English  │ ⚙️ Pro Mode: ON ✅ │  ← Settings & Mode
└─────────────────────────────────────┘
```

**Features:**
- All safety + trading features
- Voice report & recognition
- Emergency self-help guides
- Real scam case studies
- Account management
- Market data & charts
- Arbitrage settings
- AI500 ranking
- Price alert system
- Push notifications
- System monitoring
- Clean, grouped layout
- Suitable for experienced users

---

## 💰 The Story of 1 BNB: From Trading to Guardian

### Initial Intent

> "The initial intent of investing 1 BNB was not to seek 100x returns in volatility, but to build an automated sentinel that remains calm even in extreme market conditions, protecting family."

### Transformation

**Early 2024:** This project originated from a simple idea—helping ordinary people participate in cryptocurrency investment more safely. The founder is not a professional developer, but an ordinary investor concerned about family asset safety. Initially, it was just collecting public scam coin lists and manually querying Binance API to help people around avoid pitfalls.

**Mid 2024:** As more friends and family began asking cryptocurrency questions—"Can I buy Pi coin?" "Is this new coin reliable?"—the founder realized that helping ordinary people avoid traps is more important than pursuing profits. Thus began attempting to automate these queries with Telegram Bot, making safety information accessible to more people.

**2025:** The project positioning gradually became clear: rather than pursuing profit maximization, pursue risk minimization. By integrating Binance API, public scam databases, simple term explanations and other resources, the project evolved from manual queries to a semi-automated "information assistant." Key features include coin safety checks, term explanations, and basic safety tips.

**Early 2026:** The emergence of the OpenClaw platform made everything simple. The founder discovered that OpenClaw's AI framework could quickly integrate previously accumulated features and add more intelligent interactions. Binance Guardian AI officially took shape—this is not a complex trading system, but a cryptocurrency guardian truly designed for ordinary people. It integrates multiple public resources and APIs, allowing people without technical backgrounds to safely participate in cryptocurrency investment.

### Philosophy

This is not a "one-person company" commercial project, but a "one-person guardian" social experiment:

- **Not Pursuing Wealth** - Only pursuing safety
- **No Fees** - Completely open-source and free
- **No Complex Operations** - As simple as chatting
- **Never Leaving Family** - 24/7 companionship and protection

### Technical Note

This project is mainly based on the following technologies and public resources:
- **OpenClaw** (2026) - AI assistant framework that makes integration simple
- **Binance API** - Market data and account queries (read-only permissions)
- **Telegram Bot API** - User interaction interface
- **Chart.js** - Data visualization
- **Public Scam Databases** - Risk identification

The founder's role is more of an "integrator" and "product designer" rather than a traditional "developer." 2024-2025 was mainly about manually collecting information and simple scripts; 2026 with OpenClaw truly enabled intelligence and automation. The core value of the project lies in integrating existing technologies into a safety tool friendly to ordinary people.

### Vision

Hope every family has a "digital guardian," making cryptocurrency investment no longer exclusive to young people, allowing elderly people to safely participate in this era's transformation.

**1 BNB is not much, but it's enough to protect a family's safety.**

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Telegram Bot Token (from @BotFather)
- Binance API Key (Read-Only permissions)

### Installation

```bash
# Clone repository
git clone https://github.com/pjl914335852-ux/Binance-guardian-ai.git
cd Binance-guardian-ai

# Install dependencies
npm install

# Copy configuration template
cp config.example.json config.json

# Edit configuration (add your tokens)
nano config.json
```

### Configuration

#### 1. Telegram Bot Setup

**Step 1: Create Bot**
1. Open Telegram, search for `@BotFather`
2. Send `/newbot` command
3. Follow instructions to set bot name and username
4. Copy the bot token (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

**Step 2: Get Your Chat ID**
1. Search for `@userinfobot` in Telegram
2. Start the bot
3. Copy your Chat ID (format: `123456789`)

#### 2. Binance API Setup

**⚠️ Important: Use Read-Only API Keys**

**Step 1: Create API Key**
1. Log in to [Binance](https://www.binance.com)
2. Go to Profile → API Management
3. Click "Create API"
4. Complete security verification (2FA, email, etc.)
5. Label: "Guardian AI - Read Only"

**Step 2: Set Permissions (Critical)**
- ✅ Enable Reading
- ❌ Disable Enable Spot & Margin Trading
- ❌ Disable Enable Futures
- ❌ Disable Enable Withdrawals

**Step 3: Copy Keys**
- API Key: `YOUR_BINANCE_API_KEY`
- Secret Key: `YOUR_BINANCE_API_SECRET`

**Security Tips:**
- Never share your API keys
- Use IP whitelist if possible
- Regularly rotate keys
- Monitor API usage

#### 3. OpenAI API Setup (Optional - For Voice Features)

**Step 1: Get API Key**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Log in or create account
3. Click "Create new secret key"
4. Copy the key (format: `sk-proj-...`)

**Step 2: Add to Config**
```json
{
  "openai": {
    "apiKey": "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

**Cost Estimate:**
- Voice Recognition (Whisper): $0.006/minute (~¥0.04/min)
- Text-to-Speech (TTS): $15/million characters (~¥0.1/1000 chars)
- Average conversation: ~¥0.1

**Features Enabled:**
- 🎙️ Voice message recognition
- 🗣️ Speak to ask questions
- 📢 Voice safety reports (future)

#### 4. Complete Configuration File

Edit `config.json`:

```json
{
  "language": "zh",
  "telegram": {
    "botToken": "YOUR_BOT_TOKEN_HERE",
    "chatId": "YOUR_CHAT_ID_HERE"
  },
  "cryptoex": {
    "apiKey": "YOUR_BINANCE_API_KEY_HERE",
    "apiSecret": "YOUR_BINANCE_API_SECRET_HERE",
    "testnet": false
  },
  "openai": {
    "apiKey": "YOUR_OPENAI_API_KEY_HERE"
  },
  "guardian": {
    "enabled": true,
    "password": "",
    "passwordSet": false,
    "ownerChatId": "YOUR_TELEGRAM_ID"
  },
  "trading": {
    "pairs": ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"],
    "threshold": 0.5,
    "checkInterval": 30000,
    "autoPush": false
  }
}
```

**Configuration Options:**

| Option | Description | Default | Required |
|--------|-------------|---------|----------|
| `language` | Interface language (zh/en) | `zh` | Yes |
| `telegram.botToken` | Telegram bot token | - | Yes |
| `telegram.chatId` | Your Telegram chat ID | - | Yes |
| `cryptoex.apiKey` | Binance API key (read-only) | - | Yes |
| `cryptoex.apiSecret` | Binance API secret | - | Yes |
| `openai.apiKey` | OpenAI API key | - | No |
| `guardian.enabled` | Enable guardian mode | `true` | No |
| `guardian.ownerChatId` | Your Telegram ID — only this user can reset guardian password. Get it from [@userinfobot](https://t.me/userinfobot) | - | Recommended |
| `trading.threshold` | Arbitrage threshold (%) | `0.5` | No |

#### 5. Daily Scam Case Push (scam-case-push.js)

Auto-generates and pushes daily security education content to your Telegram.

**Setup:**
```bash
# Run manually
node scam-case-push.js

# Schedule with cron (9 PM daily)
0 21 * * * node /path/to/scam-case-push.js
```

**Language:** Reads `language` field from `config.json`. Set `"language": "en"` for English.

> ⚠️ **Note on AI Content Generation**
> 
> This script uses an AI API to generate scam education content. If you use a **third-party API proxy** (not official Anthropic/OpenAI), the proxy may have stricter content filters that block security-related topics, returning "I can't discuss that" instead of actual content.
> 
> **Solutions:**
> - Use the official Anthropic API (`api.anthropic.com`) — no content restrictions on educational content
> - Use the official OpenAI API (`api.openai.com`)
> - If using a proxy, ensure it supports security/educational content
| `trading.checkInterval` | Check interval (ms) | `30000` | No |

### Run

```bash
# Start bot
node crypto-scout.js

# Or use systemd (recommended)
sudo systemctl start trading-scout
sudo systemctl enable trading-scout
```

### Enable Voice Features (Optional)

**🎙️ Voice Recognition & Voice Report**

Voice features are powered by OpenAI Whisper API. Follow these steps to enable:

#### Step 1: Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Name it "Binance Guardian AI"
5. Copy the key (starts with `sk-proj-...`)

**💡 Tip:** Keep your API key secure, never share it publicly.

#### Step 2: Add to Configuration

Edit `config.json` and add the `openai` section:

```json
{
  "language": "zh",
  "telegram": {
    "botToken": "YOUR_BOT_TOKEN",
    "chatId": "YOUR_CHAT_ID"
  },
  "cryptoex": {
    "apiKey": "YOUR_BINANCE_API_KEY",
    "apiSecret": "YOUR_BINANCE_API_SECRET"
  },
  "openai": {
    "apiKey": "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
}
```

#### Step 3: Restart Bot

```bash
# If using systemd
sudo systemctl restart trading-scout

# Or if running directly
# Press Ctrl+C to stop, then:
node crypto-scout.js
```

#### Step 4: Test Voice Features

**Voice Recognition:**
1. Open Telegram bot
2. Send a voice message (e.g., "查询 BTC 价格")
3. Bot will recognize and respond

**Voice Report:**
1. Click "🎙️ Voice Report" button
2. Select language (Chinese/English)
3. Receive voice safety report

#### Cost Estimate

| Feature | API | Cost | Estimate |
|---------|-----|------|----------|
| Voice Recognition | Whisper | $0.006/min | ~¥0.04/min |
| Voice Report | TTS | $15/1M chars | ~¥0.1/1000 chars |
| **Average per conversation** | - | - | **~¥0.1** |

**💰 Very affordable!** Most conversations cost less than ¥0.2.

#### Troubleshooting

**Voice recognition not working?**
- Check if `openai.apiKey` is in `config.json`
- Verify API key is valid (starts with `sk-proj-`)
- Check OpenAI account has credits
- Restart bot after adding key

**Voice report button not responding?**
- Voice report works without OpenAI API (uses Telegram's built-in TTS)
- Check bot logs: `tail -f scout.log`

**Need help?**
- See detailed guide: [OPENAI_CONFIG.md](./OPENAI_CONFIG.md)
- Check OpenAI status: https://status.openai.com
- Contact support: Open an issue on GitHub

---

## 📊 Features Statistics

- **Total Features:** 30+
- **New in v2.7.0:** 11 features
- **Code Lines:** +2,016 lines
- **Memory Usage:** ~32MB
- **Response Time:** <500ms
- **Supported Languages:** Chinese, English

---

## 🔒 Security Features

1. **Read-Only API** - 100% read-only permissions, cannot trade or withdraw
2. **Password Protection** - Guardian mode requires password to disable
3. **Risk Warnings** - Clear warnings for all high-risk operations
4. **Data Privacy** - Sensitive information stored locally, not uploaded
5. **Error Handling** - Comprehensive error handling, won't crash

---

## 🎯 Roadmap

### 🚀 v3.0 - Smart Upgrade (2026 Q2)

**AI Enhancements:**
- [ ] Advanced AI risk prediction
- [ ] Personalized investment advice
- [ ] Behavior pattern analysis
- [ ] Smart portfolio recommendations

**Feature Expansion:**
- [ ] Launchpool monitoring
- [ ] Earn products query
- [ ] New coin listing alerts
- [ ] Multi-platform support (WhatsApp, Discord)
- [ ] Video tutorial library
- [ ] Community Q&A
- [ ] User growth system

**Internationalization:**
- [ ] Japanese, Korean, Spanish support
- [ ] Localized safety courses
- [ ] Multi-timezone support

### ✅ v2.8 - Security & Stability (2026-03-08)

**Security Enhancements:**
- [x] Code protection (environment validation)
- [x] License update (AGPL-3.0)
- [x] Security incident handling
- [x] API key rotation
- [x] Sensitive data cleanup

**UI/UX Improvements:**
- [x] Fix duplicate interface issue
- [x] Optimize button response timing
- [x] Add delays to prevent race conditions
- [x] Improve callback handling

**Documentation:**
- [x] GitHub Wiki setup
- [x] Installation guide
- [x] Security best practices
- [x] Incident response documentation

**Technical Improvements:**
- [x] User state management
- [x] Error handling optimization
- [x] Code quality improvements
- [x] Memory leak prevention

### ✅ v2.7 - All-in-One Guardian (2026-03-07)

**Five Core Features:**
- [x] Voice safety reports (daily audio briefings)
- [x] Family guardian mode (risk assessment for elderly)
- [x] Scam case library (5 real anonymized cases)
- [x] Smart risk scoring (4-dimension assessment)
- [x] Emergency help (5 self-help scenarios)

**Account Management:**
- [x] Deposit history
- [x] Withdrawal history
- [x] Deposit address generation
- [x] Spot trade history
- [x] Futures trade history

**Market Data Visualization:**
- [x] K-line chart generation (PNG)
- [x] Market depth data
- [x] Recent trades

**Price Alert System:**
- [x] Price alert management (4 types)
- [x] Alert creation wizard
- [x] Auto monitoring (30s)
- [x] Instant notifications

**UI Improvements:**
- [x] Guardian vs Professional mode differentiation
- [x] Password protection
- [x] Complete error handling
- [x] Voice feature integration

**Technical Improvements:**
- [x] Chart generation (chartjs-node-canvas)
- [x] Persistent storage
- [x] Memory optimization
- [x] Code quality improvements

### 🔧 v2.6 - Guardian Mode (2026-03-06)

**Core Features:**
- [x] Scam detection system (Pi coin, etc.)
- [x] Plain language translator (10+ terms)
- [x] Daily safety lessons (10 basic courses)
- [x] Advanced courses (10 topics)
- [x] Smart message recognition

**User Experience:**
- [x] Guardian mode UI
- [x] Password protection system
- [x] Simplified operation flow
- [x] Quick reply buttons

**Security Enhancements:**
- [x] Read-only API protection
- [x] Password verification mechanism
- [x] Risk warning prompts

### ✅ v2.5 - Binance Ecosystem Integration (2026-03-06)

**Completed Features:**
- [x] Binance account integration
  - [x] Spot holdings query (pagination support)
  - [x] Futures positions query (pagination support)
  - [x] Real-time P&L calculation
- [x] AI500 hot coin rankings
  - [x] NOFX data integration
  - [x] Auto-push high-score coins
- [x] Language switching (Chinese/English)
- [x] System monitoring
- [x] Log rotation management

**Technical Improvements:**
- [x] Read-only API (secure)
- [x] Error handling optimization
- [x] Performance optimization
- [x] Code refactoring

### 📊 v2.4 - Market Analysis (2026-03-06)

- [x] Market overview feature
- [x] Daily market summary
- [x] Arbitrage threshold adjustment
- [x] Test reminder feature

### 🎨 v2.3 - UI Optimization (2026-03-06)

- [x] Main menu reorganization
- [x] System monitoring integration
- [x] Language synchronization
- [x] Button layout optimization

### 🔥 v2.2 - Feature Expansion (2026-03-05)

- [x] Custom trading pairs
- [x] Refresh interval settings
- [x] Auto-push toggle
- [x] Heartbeat reports

### 🎯 v2.1 - Stability Fixes (2026-03-04)

- [x] Fixed duplicate message bug
- [x] Systemd service management
- [x] Help page optimization
- [x] Back button additions

### 🚀 v2.0 - NOFX Integration (2026-03-03)

- [x] NOFX data source integration
- [x] AI500 scoring system
- [x] Professional market analysis

### 🎉 v1.0 - Initial Release (2026-03-01)

- [x] Basic arbitrage monitoring
- [x] Telegram notifications
- [x] Multi-pair support
- [x] Historical records

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're reporting bugs, suggesting features, or submitting code improvements, your input helps make Binance Guardian AI better for everyone.

### How to Contribute

#### 🐛 Report Bugs
Found a bug? Help us fix it!
1. Check [existing issues](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues) to avoid duplicates
2. Create a [new bug report](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues/new?template=bug_report.md)
3. Include:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Node.js version, etc.)
   - Logs or screenshots if applicable

#### 💡 Suggest Features
Have an idea for improvement?
1. Check [existing feature requests](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues?q=is%3Aissue+label%3Aenhancement)
2. Create a [new feature request](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues/new?template=feature_request.md)
3. Describe:
   - What problem it solves
   - How it should work
   - Why it's valuable

#### 🔧 Submit Code
Want to contribute code?
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

#### 💬 Join Discussions
Have questions or ideas? Join our [Discussions](https://github.com/pjl914335852-ux/Binance-guardian-ai/discussions) to:
- Ask questions
- Share use cases
- Discuss improvements
- Help other users

### Code of Conduct

- Be respectful and constructive
- Focus on the issue, not the person
- Help create a welcoming environment
- Follow project guidelines

### Need Help?

- 📖 Check the [Wiki](https://github.com/pjl914335852-ux/Binance-guardian-ai/wiki) for guides
- 💬 Ask in [Discussions](https://github.com/pjl914335852-ux/Binance-guardian-ai/discussions)
- 🐛 Report issues on [GitHub Issues](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 📞 Contact

- **Telegram:** @Ee_7t
- **GitHub:** https://github.com/pjl914335852-ux/Binance-guardian-ai

---

## 🙏 Acknowledgments

- **OpenClaw** - AI assistant framework
- **Binance** - API and ecosystem support
- **SlowMist (慢雾科技)** - Blockchain security research and case studies
- **余弦 (Cos)** - Security insights that shaped our risk assessment
- **NOFX Community** - Market data and insights
- **Open Source Community** - Various tools and libraries

For detailed acknowledgments, see [ACKNOWLEDGMENTS.md](./ACKNOWLEDGMENTS.md)

---

**Making crypto investment safer, one family at a time.** 🛡️
