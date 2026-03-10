# Installation Guide

Complete guide to setting up your own Binance Guardian AI bot.

## Prerequisites

### System Requirements
- **OS**: Linux (Ubuntu 20.04+ recommended) or macOS
- **Node.js**: v18.0.0 or higher
- **RAM**: 512MB minimum, 1GB recommended
- **Disk**: 500MB free space

### Required Accounts
1. **Telegram Account** - To create and use the bot
2. **Binance Account** (Optional) - For account management features
3. **OpenAI Account** (Optional) - For voice recognition features

## Quick Start

```bash
# 1. Clone repository
git clone https://github.com/pjl914335852-ux/Binance-guardian-ai.git
cd Binance-guardian-ai

# 2. Install dependencies
npm install

# 3. Configure
cp config.example.json config.json
nano config.json  # Add your credentials

# 4. Start
npm start
```

## Detailed Setup

See [Configuration Guide](Configuration-Guide) for step-by-step instructions on:
- Creating Telegram Bot
- Setting up Binance API
- Configuring OpenAI (optional)
- Running as systemd service

## Verification

Test your bot:
1. Send `/start` in Telegram
2. Type "BTC" to check Bitcoin
3. Try voice message (if configured)

## Troubleshooting

Common issues and solutions in [Troubleshooting Guide](Troubleshooting).

---

**Next Steps**: [Quick Start Tutorial](Quick-Start-Tutorial)
