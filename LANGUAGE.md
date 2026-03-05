# 🌍 Language Support / 语言支持

Trading Scout supports multiple languages with English as the default.

交易侦察员支持多语言，默认为英文。

---

## 🎯 Supported Languages / 支持的语言

- **English** (en) - Default / 默认
- **中文** (zh) - Chinese / 中文

---

## 🔧 How to Switch Language / 如何切换语言

### Method 1: Edit config.json / 方法 1：编辑配置文件

Open `config.json` and set the `language` field:

打开 `config.json` 并设置 `language` 字段：

**For English / 英文：**
```json
{
  "language": "en",
  ...
}
```

**For Chinese / 中文：**
```json
{
  "language": "zh",
  ...
}
```

Then restart the service / 然后重启服务：
```bash
sudo systemctl restart trading-scout
```

---

## 📋 Language Examples / 语言示例

### English (en)

```
==================================================
🦞 OpenClaw Trading Scout Started
💰 Powered by NOFX Community Data
==================================================

📋 Configuration:
  Base pairs: BTCUSDT, ETHUSDT, BNBUSDT, SOLUSDT
  Total monitoring: 4 pairs
  Check interval: 30 seconds
  Spread threshold: 0.5%
  Telegram: Configured ✅

🎯 NOFX Professional Data + AI Analysis = More Profit Opportunities
==================================================

🦞 Trading Scout checking...
📊 API Status: 0/20 requests (20 remaining)

📊 Current Prices:
  BTCUSDT: $71,315.99 (2056.1M)
  ETHUSDT: $2,086.27 (980.0M)
  ...

✅ Price cache initialized, will start detecting opportunities next check
```

### Chinese (zh)

```
==================================================
🦞 OpenClaw 交易侦察员启动
💰 由 NOFX 社区精准数据支持
==================================================

📋 配置信息:
  基础交易对: BTCUSDT, ETHUSDT, BNBUSDT, SOLUSDT
  总监控数: 4 个交易对
  检查间隔: 30 秒
  价差阈值: 0.5%
  Telegram: 已配置 ✅

🎯 NOFX 专业数据 + AI 智能分析 = 发现更多盈利机会
==================================================

🦞 交易侦察员正在检查...
📊 API 状态: 0/20 请求 (剩余 20)

📊 当前价格:
  BTCUSDT: $71,315.99 (2056.1M)
  ETHUSDT: $2,086.27 (980.0M)
  ...

✅ 价格缓存已初始化，下次检查将开始发现机会
```

---

## 🔔 Telegram Notifications / Telegram 通知

### English

```
🚨 Arbitrage Opportunity Found!
Powered by NOFX Precise Data

Pairs: BTCUSDT / ETHUSDT
Spread: 0.8%
Risk Level: medium

BTCUSDT Change: +0.5%
ETHUSDT Change: -0.3%

💡 Suggestion: Buy ETHUSDT, Sell BTCUSDT

⏰ Time: 2026-03-06 03:30:00

🎯 NOFX Professional Data - Discover More Profit Opportunities
```

### Chinese

```
🚨 套利机会发现！
由 NOFX 精准数据驱动

交易对: BTCUSDT / ETHUSDT
价差: 0.8%
风险等级: 中

BTCUSDT 变化: +0.5%
ETHUSDT 变化: -0.3%

💡 建议: 买入 ETHUSDT, 卖出 BTCUSDT

⏰ 时间: 2026-03-06 03:30:00

🎯 NOFX 专业数据支持 - 发现更多盈利机会
```

---

## 🎨 Customization / 自定义

Want to add more languages? Edit `i18n.js`:

想添加更多语言？编辑 `i18n.js`：

```javascript
const translations = {
  en: { ... },
  zh: { ... },
  ja: { ... },  // Japanese
  ko: { ... },  // Korean
  // Add more languages here
};
```

---

## 📝 Notes / 注意事项

1. **Default language is English** / 默认语言是英文
   - If `language` is not set in config.json, English will be used
   - 如果 config.json 中未设置 `language`，将使用英文

2. **Restart required** / 需要重启
   - After changing language, restart the service
   - 更改语言后需要重启服务

3. **Telegram notifications** / Telegram 通知
   - Notifications will use the same language as the console
   - 通知将使用与控制台相同的语言

4. **Log files** / 日志文件
   - Log files will also use the selected language
   - 日志文件也将使用所选语言

---

## ✅ Verification / 验证

After changing language, check the startup message:

更改语言后，检查启动消息：

```bash
# View recent logs / 查看最近的日志
tail -30 /root/.openclaw/workspace/crypto-trading-scout/scout.log

# Or check service status / 或检查服务状态
sudo systemctl status trading-scout
```

You should see messages in your selected language!

你应该看到所选语言的消息！

---

## 🌐 Language Codes / 语言代码

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Supported |
| 中文 | `zh` | ✅ Supported |
| 日本語 | `ja` | 🚧 Coming soon |
| 한국어 | `ko` | 🚧 Coming soon |
| Español | `es` | 🚧 Coming soon |

Want to contribute a translation? Open a Pull Request!

想贡献翻译？提交 Pull Request！
