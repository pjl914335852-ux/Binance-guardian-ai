# Security Model

## Overview

Binance Guardian AI is designed with security as a core principle. This document outlines the security architecture, threat model, and best practices.

---

## Security Principles

### 1. Read-Only by Design

**API Permissions**:
- ✅ **Allowed**: Read market data, account balances, order history
- ❌ **Denied**: Place orders, withdraw funds, transfer assets

**Why This Matters**:
- Even if API keys are compromised, attackers cannot steal funds
- Users can safely share bot access with family members
- Reduces liability and regulatory concerns

**Implementation**:
```javascript
// config.json
{
  "cryptoex": {
    "apiKey": "YOUR_API_KEY",
    "apiSecret": "YOUR_API_SECRET",
    "permissions": ["READ"] // Enforced by Binance
  }
}
```

---

### 2. Local Data Storage

**No Cloud Uploads**:
- All user data stored locally on VPS
- No third-party analytics or tracking
- No data sent to external servers (except API calls)

**Data Locations**:
- **Config**: `/root/Binance-guardian-ai/config.json`
- **Logs**: `/root/Binance-guardian-ai/logs/`
- **Cache**: `/root/Binance-guardian-ai/cache/` (temporary)

**Privacy Guarantees**:
- User chat history: Not stored (Telegram handles this)
- API keys: Stored locally, never logged
- Personal info: Not collected

---

### 3. Encryption & Hashing

**Password Storage**:
```javascript
const bcrypt = require('bcrypt');

// Hashing (one-way)
const hashedPassword = await bcrypt.hash(password, 10);

// Verification
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

**Why bcrypt**:
- Industry-standard password hashing
- Salted (prevents rainbow table attacks)
- Slow by design (prevents brute-force)

**API Key Storage**:
- Stored in plaintext in `config.json` (local file)
- File permissions: `chmod 600` (owner read/write only)
- Alternative: Environment variables or encrypted vault

---

### 4. Input Validation

**User Input Sanitization**:
```javascript
// Contract address validation
function isValidAddress(address) {
  // EVM: 0x + 40 hex chars
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) return 'evm';
  
  // Solana: Base58, 32-44 chars
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) return 'solana';
  
  return null;
}
```

**SQL Injection Prevention**:
- Not applicable (no SQL database in v2.9.0)
- Future: Use parameterized queries

**XSS Prevention**:
- Telegram Bot API handles escaping
- No web interface in v2.9.0

---

## Threat Model

### Threats We Protect Against

#### 1. API Key Theft
**Attack Vector**: Attacker gains access to VPS or config.json

**Mitigation**:
- Read-only permissions (cannot withdraw)
- IP whitelist (optional, restrict to VPS IP)
- Regular key rotation (every 90 days)
- File permissions (`chmod 600 config.json`)

**Residual Risk**: Attacker can read balances and order history (acceptable)

---

#### 2. Man-in-the-Middle (MITM)
**Attack Vector**: Attacker intercepts API calls

**Mitigation**:
- HTTPS for all API calls (enforced by axios)
- Certificate validation (default in Node.js)
- No custom certificate handling

**Residual Risk**: Minimal (HTTPS is industry standard)

---

#### 3. Phishing (Users)
**Attack Vector**: Fake bot impersonates Guardian AI

**Mitigation**:
- Official bot username: `@afrxa_bot`
- Verify bot in Telegram settings
- Never ask for private keys or seed phrases
- Clear warnings in bot messages

**User Education**:
```
⚠️ Security Reminder:
• Never share your private keys
• Never send funds to unknown addresses
• Always verify bot username (@afrxa_bot)
• Guardian AI will NEVER ask for your seed phrase
```

---

#### 4. Scam Detection Bypass
**Attack Vector**: Scammer creates new scam not in database

**Mitigation**:
- Multi-source verification (Binance + NOFX + Scam DB)
- AI-powered pattern recognition
- Clear disclaimer: "Detection is not 100% accurate"
- Encourage users to DYOR (Do Your Own Research)

**Residual Risk**: New scams may not be detected immediately (acceptable)

---

#### 5. Denial of Service (DoS)
**Attack Vector**: Attacker floods bot with requests

**Mitigation**:
- Rate limiting (Telegram Bot API built-in)
- Process manager (pm2) auto-restart on crash
- Resource monitoring (CPU, memory)

**Residual Risk**: Sophisticated DDoS could overwhelm VPS (acceptable for MVP)

---

### Threats We Do NOT Protect Against

#### 1. Compromised User Device
- If user's phone is hacked, attacker can access Telegram
- **Mitigation**: User responsibility (2FA, device security)

#### 2. Binance Account Compromise
- If user's Binance account is hacked, attacker can withdraw funds
- **Mitigation**: User responsibility (2FA, strong password)

#### 3. Social Engineering
- If user is tricked into sending funds to scammer
- **Mitigation**: Education, warnings, but cannot prevent

#### 4. Zero-Day Exploits
- Unknown vulnerabilities in Node.js, OpenClaw, or dependencies
- **Mitigation**: Regular updates, security patches

---

## Security Best Practices

### For Developers

#### 1. API Key Management
```bash
# Never commit API keys to Git
echo "config.json" >> .gitignore

# Use environment variables (optional)
export BINANCE_API_KEY="your_key"
export BINANCE_API_SECRET="your_secret"

# Restrict file permissions
chmod 600 config.json
```

#### 2. Dependency Security
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

#### 3. Code Review
- Review all external contributions
- Check for hardcoded secrets
- Validate input sanitization
- Test error handling

#### 4. Logging Security
```javascript
// ❌ BAD: Log sensitive data
console.log('API Key:', apiKey);

// ✅ GOOD: Log without secrets
console.log('API call successful');
```

---

### For Users

#### 1. API Key Setup
```
1. Log in to Binance
2. Go to API Management
3. Create new API key
4. Enable ONLY "Read" permissions
5. (Optional) Add IP whitelist
6. Copy key and secret to config.json
7. Never share your API key publicly
```

#### 2. Bot Verification
```
1. Search for @afrxa_bot in Telegram
2. Check bot profile:
   - Username: @afrxa_bot
   - Verified badge (if available)
3. Start conversation
4. Never trust bots that DM you first
```

#### 3. Password Security
```
✅ Strong password:
- 12+ characters
- Mix of letters, numbers, symbols
- Unique (not reused)

❌ Weak password:
- "password123"
- "binance"
- Your birthday
```

#### 4. Regular Audits
```
Weekly:
- Check Binance API key activity
- Review bot logs for errors
- Verify no unauthorized access

Monthly:
- Rotate API keys
- Update bot to latest version
- Review security settings
```

---

## Guardian Mode Security

### Purpose
Protect elderly users from accidentally accessing advanced features or making mistakes.

### Features

#### 1. Password Lock
```javascript
// Mode switching requires password
if (mode === 'professional') {
  const password = await promptPassword();
  if (!verifyPassword(password)) {
    return 'Incorrect password';
  }
}
```

#### 2. Simplified UI
- Only 5 buttons visible in Guardian Mode
- Hides: Trading, withdrawals, advanced settings
- Shows: Safety checks, education, help

#### 3. Clear Warnings
```
⚠️ High Risk Detected

Mom, this coin looks very risky:
• Not listed on Binance
• Many scam reports
• Unverified contract

💡 Suggestion: Don't invest in this coin.
```

#### 4. Emergency Help
```
🚨 Emergency Help

If you think you've been scammed:
1. Stop all transactions immediately
2. Change your passwords
3. Contact Binance support
4. Report to local authorities
```

---

## Compliance & Legal

### Disclaimer
```
⚠️ IMPORTANT DISCLAIMER

This project is for educational and demonstration purposes only.

• Not financial advice
• Not investment recommendations
• No guarantees of accuracy
• Use at your own risk

Always do your own research (DYOR) before investing.
```

### Data Privacy (GDPR-like)
- **Data Collection**: Minimal (only what's needed)
- **Data Storage**: Local (not shared)
- **Data Deletion**: User can delete config.json anytime
- **Data Portability**: User owns all data

### Regulatory Compliance
- **Not a Financial Advisor**: No investment advice
- **Not a Trading Platform**: Read-only access
- **Not a Custodian**: No control over user funds
- **Educational Tool**: Designed for learning

---

## Incident Response

### If API Key is Compromised

**Immediate Actions**:
1. Log in to Binance
2. Disable compromised API key
3. Create new API key (read-only)
4. Update config.json
5. Restart bot (`pm2 restart binance-guardian`)

**Investigation**:
1. Check Binance API activity logs
2. Review VPS access logs
3. Scan for malware
4. Change all passwords

**Prevention**:
1. Enable IP whitelist
2. Rotate keys every 90 days
3. Monitor for unusual activity

---

### If Bot is Hacked

**Immediate Actions**:
1. Stop bot (`pm2 stop binance-guardian`)
2. Disconnect VPS from internet
3. Backup logs and config
4. Investigate breach

**Recovery**:
1. Reinstall OS (if needed)
2. Pull latest code from GitHub
3. Restore config from backup
4. Restart bot with new API keys

**Post-Mortem**:
1. Document what happened
2. Identify root cause
3. Implement fixes
4. Update security docs

---

## Security Roadmap

### v2.10.0 (Q2 2026)
- [ ] Two-factor authentication (2FA) for mode switching
- [ ] Encrypted config file (AES-256)
- [ ] Audit logging (who did what, when)
- [ ] Rate limiting per user

### v2.11.0 (Q2 2026)
- [ ] Anomaly detection (unusual API activity)
- [ ] Automated security scans (npm audit in CI/CD)
- [ ] Penetration testing
- [ ] Bug bounty program

### v3.0.0 (Q4 2026)
- [ ] Hardware security module (HSM) for key storage
- [ ] Multi-signature for critical operations
- [ ] Blockchain-based audit trail
- [ ] Third-party security audit

---

## Security Contacts

### Report a Vulnerability
- **Email**: (Not public yet, use GitHub Issues)
- **GitHub**: https://github.com/pjl914335852-ux/Binance-guardian-ai/issues
- **Telegram**: @Ee_7t (for urgent issues)

### Responsible Disclosure
1. Report vulnerability privately (don't post publicly)
2. Allow 90 days for fix before public disclosure
3. Provide detailed reproduction steps
4. (Optional) Suggest a fix

### Acknowledgments
Security researchers who responsibly disclose vulnerabilities will be credited in:
- SECURITY.md
- CHANGELOG.md
- README.md

---

## Conclusion

Security is an ongoing process, not a one-time achievement. We continuously improve our security posture based on:
- User feedback
- Security research
- Industry best practices
- Regulatory changes

**Remember**: No system is 100% secure. Always practice good security hygiene and never invest more than you can afford to lose.

---

**Last Updated**: 2026-03-15  
**Version**: 2.9.0  
**Maintainer**: Brart (@Ee_7t)  
**Security Contact**: @Ee_7t (Telegram)
