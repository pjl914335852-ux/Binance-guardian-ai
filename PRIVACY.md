# Privacy Policy

**Last Updated: March 15, 2026**

Binance Guardian AI is committed to protecting your privacy. This document explains how we handle your data.

---

## TL;DR

- ✅ **All data stored locally** on your server
- ✅ **No data collection** by us
- ✅ **No third-party tracking**
- ✅ **You control everything**
- ✅ **Open source** — verify yourself

---

## Data Storage

### What Data is Stored

Binance Guardian AI stores the following data **locally on your server**:

1. **Configuration Data** (`config.json`)
   - Telegram Bot Token
   - Binance API Keys (read-only)
   - OpenAI API Key (optional)
   - User preferences (language, mode, etc.)

2. **User State Data** (`user-state.json`)
   - Current mode (Guardian/Professional)
   - Password hash (if Guardian Mode enabled)
   - Alert settings
   - Lesson progress

3. **Alert Data** (`alerts.json`)
   - Price alerts you've created
   - Alert history

4. **Log Files** (`scout.log`)
   - Bot activity logs
   - Error logs
   - API call logs (no sensitive data)

### Where Data is Stored

- **Location**: Your server (VPS, local machine, etc.)
- **Access**: Only you have access
- **Encryption**: Config files should be protected with proper file permissions

---

## Data We Do NOT Collect

- ❌ We do NOT collect your personal information
- ❌ We do NOT store your data on our servers
- ❌ We do NOT track your usage
- ❌ We do NOT sell your data
- ❌ We do NOT share your data with third parties

**Why?** Because Binance Guardian AI is **self-hosted**. You run it on your own server, so all data stays with you.

---

## Third-Party Services

Binance Guardian AI interacts with the following third-party services:

### 1. Telegram
- **What**: Bot messages, user interactions
- **Why**: To provide the chat interface
- **Data Sent**: Your messages to the bot
- **Privacy Policy**: [Telegram Privacy Policy](https://telegram.org/privacy)

### 2. Binance
- **What**: Market data, account queries (read-only)
- **Why**: To fetch prices, balances, trade history
- **Data Sent**: API requests (no personal data)
- **Privacy Policy**: [Binance Privacy Policy](https://www.binance.com/en/privacy)

### 3. OpenAI (Optional)
- **What**: Voice messages (if voice feature enabled)
- **Why**: Speech-to-text conversion
- **Data Sent**: Audio files (temporary, deleted after processing)
- **Privacy Policy**: [OpenAI Privacy Policy](https://openai.com/privacy)

### 4. NOFX (Optional)
- **What**: Market intelligence data
- **Why**: AI500 rankings, market analysis
- **Data Sent**: API requests (no personal data)
- **Privacy Policy**: Contact NOFX for details

---

## API Keys & Credentials

### How We Handle Your Keys

1. **Storage**: Stored in `config.json` on your server
2. **Transmission**: Only sent to respective services (Binance, OpenAI, etc.)
3. **Logging**: Never logged in plain text
4. **Encryption**: You should encrypt `config.json` or use environment variables

### Best Practices

- ✅ Use **read-only** Binance API keys
- ✅ Set **IP whitelist** on Binance API
- ✅ Use **environment variables** for sensitive keys
- ✅ Set proper **file permissions** (chmod 600 config.json)
- ✅ **Rotate keys** regularly
- ✅ **Never commit** config.json to Git

---

## Logs & Monitoring

### What We Log

- Bot startup/shutdown events
- API calls (without sensitive data)
- Errors and exceptions
- User actions (button clicks, commands)

### What We DON'T Log

- ❌ API keys or passwords
- ❌ Private messages content
- ❌ Account balances
- ❌ Trade details

### Log Retention

- **Location**: `scout.log` on your server
- **Rotation**: Automatically rotated when file size exceeds limit
- **Deletion**: You can delete logs anytime

---

## Security Measures

### Data Protection

1. **Local Storage**: All data on your server
2. **Read-Only API**: Binance API has no trading/withdrawal permissions
3. **Password Protection**: Guardian Mode password is hashed (bcrypt)
4. **No Remote Access**: We cannot access your data

### Your Responsibilities

- 🔒 Secure your server (firewall, SSH keys, etc.)
- 🔒 Protect your `config.json` file
- 🔒 Use strong passwords
- 🔒 Keep software updated
- 🔒 Monitor server access logs

---

## Data Deletion

### How to Delete Your Data

Since all data is stored locally, you can delete it anytime:

```bash
# Stop the bot
pm2 stop crypto-scout

# Delete all data
rm -rf /path/to/Binance-guardian-ai

# Or delete specific files
rm config.json user-state.json alerts.json scout.log
```

### What Happens After Deletion

- All local data is permanently deleted
- No data remains on our servers (because we never had it)
- You can reinstall and start fresh anytime

---

## Children's Privacy

Binance Guardian AI is not intended for users under 18 years old. We do not knowingly collect data from children.

---

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be:
- Documented in this file
- Announced in the [CHANGELOG](CHANGELOG.md)
- Committed to the GitHub repository

**Last Updated**: March 15, 2026

---

## Contact

If you have questions about this privacy policy:
- **GitHub Issues**: [Open an issue](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues)
- **Telegram**: [@Ee_7t](https://t.me/Ee_7t)
- **Email**: privacy@binance-guardian-ai.com

---

## Open Source Transparency

Binance Guardian AI is **open source** (AGPL-3.0). You can:
- ✅ Review the source code
- ✅ Verify data handling
- ✅ Audit security measures
- ✅ Contribute improvements

**GitHub**: https://github.com/pjl914335852-ux/Binance-guardian-ai

---

## Summary

**Your Privacy, Your Control:**
- All data stored locally on your server
- No data collection by us
- No third-party tracking
- You can delete everything anytime
- Open source for transparency

**We believe privacy is a fundamental right. That's why we built Binance Guardian AI to be self-hosted and transparent.** 🛡️
