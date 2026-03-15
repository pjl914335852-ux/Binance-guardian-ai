# System Architecture

## Overview

Binance Guardian AI is built on a three-layer architecture designed for scalability, maintainability, and security.

```
┌─────────────────────────────────────────────────────────────┐
│                      User Layer                             │
│  • Telegram Bot Interface                                   │
│  • Mobile-friendly chat UI                                  │
│  • Multi-language support (EN/CN)                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   AI Agent Layer                            │
│  • OpenClaw Framework (orchestration)                       │
│  • Dual-Model Routing (Claude Sonnet 4.6 / Gemini 3.1)     │
│  • Risk Detection Engine (4-dimension scoring)              │
│  • Natural Language Processing                              │
│  • Context Management                                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Integration Layer                          │
│  • Binance API (read-only, market data)                     │
│  • Blockchain Explorers (9 chains)                          │
│    - Etherscan, BSCScan, Polygonscan, etc.                  │
│  • NOFX API (AI500 hot coin ranking)                        │
│  • Scam Database (public sources)                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                Infrastructure Layer                         │
│  • VPS Deployment (1C1G, ~32MB memory)                      │
│  • Process Manager (pm2)                                    │
│  • Logging & Monitoring                                     │
│  • Configuration Management                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer Details

### 1. User Layer

**Purpose**: Provide accessible interface for non-technical users

**Components**:
- **Telegram Bot API**: Primary interface
- **Guardian Mode**: Simplified 5-button UI for elderly users
- **Professional Mode**: Advanced features for traders
- **Multi-language**: English and Chinese support

**Design Principles**:
- Mobile-first (most users access via phone)
- Minimal clicks to core features
- Clear visual feedback (emojis, colors)
- Plain language (no jargon)

---

### 2. AI Agent Layer

**Purpose**: Intelligent risk assessment and natural language interaction

**Components**:

#### OpenClaw Framework
- Agent orchestration and lifecycle management
- Tool calling and function execution
- Context window management
- Session state persistence

#### Dual-Model Routing
- **Claude Sonnet 4.6**: Complex reasoning, risk analysis
- **Gemini 3.1 Flash**: Fast responses, simple queries
- Automatic model selection based on task complexity

#### Risk Detection Engine
Four-dimension scoring system (0-100 points):

1. **Security Audit (40%)**: Contract verification, audit reports
2. **Market Ranking (30%)**: Binance listing, market cap, volume
3. **Token Information (20%)**: Whitepaper, team, roadmap
4. **Scam Check (10%)**: Known scam database, pattern matching

#### Natural Language Processing
- Crypto jargon → plain language translation
- Context-aware responses
- Elderly-friendly explanations
- Multi-turn conversation support

---

### 3. Integration Layer

**Purpose**: Connect to external data sources and APIs

**Components**:

#### Binance API
- **Permissions**: Read-only (no trading/withdrawal)
- **Data**: Real-time prices, 24h volume, market depth
- **Rate Limits**: 1200 requests/minute (weight-based)
- **Security**: API key + secret, IP whitelist optional

#### Blockchain Explorers (9 Chains)
- **EVM Chains**: Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche, Fantom, Base
- **Non-EVM**: Solana
- **Data**: Contract verification, transaction count, holder distribution
- **APIs**: Free public endpoints (no registration)

#### NOFX API
- **Data**: AI500 hot coin ranking
- **Update Frequency**: Real-time
- **Use Case**: Market sentiment analysis

#### Scam Database
- **Sources**: Public scam reports, community submissions
- **Coverage**: Known scam coins, phishing sites, fake contracts
- **Update**: Manual curation + automated scraping

---

### 4. Infrastructure Layer

**Purpose**: Reliable deployment and operations

**Components**:

#### VPS Deployment
- **Specs**: 1 CPU core, 1GB RAM
- **OS**: Ubuntu 20.04 LTS
- **Cost**: ~$11/month
- **Uptime**: 99.9%

#### Process Manager (pm2)
- **Auto-restart**: On crash or server reboot
- **Log rotation**: Prevent disk overflow
- **Monitoring**: CPU, memory, uptime
- **Zero-downtime**: Reload on code updates

#### Logging
- **Levels**: Error, Warn, Info, Debug
- **Rotation**: Daily, max 7 days
- **Format**: JSON for structured parsing
- **Privacy**: No PII in logs

#### Configuration
- **Format**: JSON (config.json)
- **Secrets**: Environment variables or encrypted
- **Validation**: Schema validation on startup
- **Hot-reload**: Some configs without restart

---

## Data Flow

### Quick Safety Check Flow

```
1. User sends coin name or contract address
   ↓
2. Telegram Bot receives message
   ↓
3. OpenClaw Agent parses input
   ↓
4. If contract address:
   - Detect network (EVM/Solana)
   - Show chain selection UI (if EVM)
   - Query blockchain explorer
   - Calculate security score
   ↓
5. If coin name:
   - Query Binance API
   - Query NOFX API
   - Check scam database
   - Calculate risk score
   ↓
6. AI Agent generates plain-language explanation
   ↓
7. Send result to user via Telegram
```

### Price Alert Flow

```
1. User sets alert (coin, condition, threshold)
   ↓
2. Store alert in memory
   ↓
3. Background loop (every 30s):
   - Query Binance API for current price
   - Check all active alerts
   - If condition met → trigger alert
   ↓
4. Send notification to user via Telegram
```

---

## Security Architecture

### API Key Protection

1. **Read-Only Permissions**: Cannot trade or withdraw
2. **Local Storage**: Keys stored in config.json (not in code)
3. **IP Whitelist**: Optional restriction to VPS IP
4. **Rotation**: Recommended every 90 days
5. **Encryption**: bcrypt for password storage

### Data Privacy

- **No Cloud Storage**: All data stored locally on VPS
- **No Third-Party Uploads**: User data never leaves the system
- **Temporary Files**: Auto-cleanup after use
- **Logs**: No PII (personally identifiable information)

### Guardian Mode Protection

- **Password Lock**: Mode switching requires password
- **Simplified UI**: Hides advanced features from elderly users
- **Clear Warnings**: Risk alerts in plain language
- **Emergency Help**: Quick access to safety guides

---

## Scalability Considerations

### Current Limitations
- Single VPS instance (no horizontal scaling)
- In-memory state (lost on restart)
- Manual deployment (no CI/CD)

### Future Improvements (v3.0+)
- **Horizontal Scaling**: Load balancer + multiple instances
- **Database**: PostgreSQL for persistent state
- **Caching**: Redis for frequently accessed data
- **Message Queue**: RabbitMQ for async processing
- **Monitoring**: Prometheus + Grafana
- **CI/CD**: GitHub Actions for automated deployment

---

## Technology Stack

### Core
- **Runtime**: Node.js 18+
- **Framework**: OpenClaw (2026.3)
- **AI Models**: Claude Sonnet 4.6, Gemini 3.1 Flash
- **Interface**: Telegram Bot API

### Libraries
- **HTTP Client**: axios
- **Telegram**: node-telegram-bot-api
- **Charts**: chartjs-node-canvas
- **Crypto**: bcrypt (password hashing)
- **Process**: pm2 (process manager)

### APIs
- **Binance API**: Market data
- **Blockchain Explorers**: Contract verification
- **NOFX API**: AI500 ranking
- **OpenClaw API**: AI orchestration

---

## Performance Metrics

- **Response Time**: <500ms (average)
- **Memory Usage**: ~32MB (idle), ~128MB (peak)
- **CPU Usage**: <5% (idle), <30% (peak)
- **Concurrent Users**: 100+ (tested)
- **Uptime**: 99.9% (30-day average)
- **API Rate Limits**: Well within Binance limits

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Telegram Servers                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      VPS (1C1G)                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              pm2 Process Manager                      │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │     Binance Guardian AI (Node.js)               │  │  │
│  │  │  • Telegram Bot                                 │  │  │
│  │  │  • OpenClaw Agent                               │  │  │
│  │  │  • Risk Detection                               │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Local Storage                            │  │
│  │  • config.json (API keys)                             │  │
│  │  • logs/ (application logs)                           │  │
│  │  • cache/ (temporary data)                            │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    External APIs                            │
│  • Binance API                                              │
│  • Blockchain Explorers (9 chains)                          │
│  • NOFX API                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Monitoring & Observability

### Logs
- **Location**: `/root/Binance-guardian-ai/logs/`
- **Rotation**: Daily, max 7 days
- **Format**: JSON (structured)
- **Levels**: ERROR, WARN, INFO, DEBUG

### Metrics (via pm2)
- **CPU Usage**: Real-time monitoring
- **Memory Usage**: Heap + RSS
- **Uptime**: Since last restart
- **Restart Count**: Auto-restart on crash

### Alerts
- **Process Crash**: pm2 auto-restart + log
- **High Memory**: Warning at 80% usage
- **API Errors**: Log + retry logic

---

## Disaster Recovery

### Backup Strategy
- **Code**: GitHub repository (version controlled)
- **Config**: Manual backup of config.json
- **Logs**: Retained for 7 days
- **State**: In-memory (lost on restart, acceptable for MVP)

### Recovery Procedure
1. SSH into VPS
2. `git pull` latest code
3. Restore config.json from backup
4. `pm2 restart binance-guardian`
5. Verify bot responds in Telegram

### RTO/RPO
- **RTO** (Recovery Time Objective): <5 minutes
- **RPO** (Recovery Point Objective): <1 hour (acceptable data loss)

---

**Last Updated**: 2026-03-15  
**Version**: 2.9.0  
**Maintainer**: Brart (@Ee_7t)
