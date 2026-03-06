// plain-translator.js - 人话翻译模块

class PlainTranslator {
  constructor() {
    // 专业术语 -> 大白话翻译字典
    this.translations = {
      // 基础概念
      'launchpool': {
        zh: {
          term: 'Launchpool（新币挖矿）',
          plain: '就像银行的定期存款送礼品活动',
          explanation: `
📝 *简单理解：*
1. 你把闲钱（BNB 或 USDT）存进去
2. 本金不动，随时可以取出
3. 每天送你一些新币作为奖励

💰 *举例：*
存 100 USDT，7 天后：
• 本金还是 100 USDT（不会少）
• 额外得到一些新币（白送的）

✅ *安全性：* 很安全，本金不会亏
⏰ *时间：* 通常 7-30 天
          `.trim()
        },
        en: {
          term: 'Launchpool',
          plain: 'Like a bank deposit with free gifts',
          explanation: `
📝 *Simple explanation:*
1. Deposit your idle funds (BNB or USDT)
2. Principal stays safe, withdraw anytime
3. Earn new tokens daily as rewards

💰 *Example:*
Deposit 100 USDT for 7 days:
• Principal: 100 USDT (unchanged)
• Bonus: Some new tokens (free)

✅ *Safety:* Very safe, no loss of principal
⏰ *Duration:* Usually 7-30 days
          `.trim()
        }
      },
      
      'launchpad': {
        zh: {
          term: 'Launchpad（新币认购）',
          plain: '就像新股申购，用 BNB 抽签买新币',
          explanation: `
📝 *简单理解：*
1. 用 BNB 参与抽签
2. 中签了可以用优惠价买新币
3. 没中签 BNB 会退回

💰 *举例：*
用 10 BNB 参与：
• 中签：用 5 BNB 买到新币（优惠价）
• 没中签：10 BNB 全部退回

✅ *风险：* 中签后新币可能涨也可能跌
⏰ *时间：* 通常 1-2 天
          `.trim()
        },
        en: {
          term: 'Launchpad',
          plain: 'Like IPO lottery, use BNB to buy new tokens',
          explanation: `
📝 *Simple explanation:*
1. Use BNB to participate in lottery
2. If selected, buy new tokens at discount
3. If not selected, BNB is returned

💰 *Example:*
Participate with 10 BNB:
• Selected: Buy new tokens with 5 BNB (discount)
• Not selected: All 10 BNB returned

✅ *Risk:* New tokens may go up or down
⏰ *Duration:* Usually 1-2 days
          `.trim()
        }
      },
      
      'staking': {
        zh: {
          term: 'Staking（质押）',
          plain: '就像定期存款，锁定一段时间赚利息',
          explanation: `
📝 *简单理解：*
1. 把币存进去锁定（不能动）
2. 到期后本金 + 利息一起返还
3. 利息比银行高，但有风险

💰 *举例：*
质押 100 USDT，年化 10%，锁 30 天：
• 30 天后：100 USDT + 0.82 USDT 利息

✅ *风险：* 锁定期间不能取出，币价可能跌
⏰ *时间：* 7 天到 90 天不等
          `.trim()
        },
        en: {
          term: 'Staking',
          plain: 'Like fixed deposit, lock funds to earn interest',
          explanation: `
📝 *Simple explanation:*
1. Lock your coins for a period
2. Get principal + interest when unlocked
3. Higher interest than banks, but has risks

💰 *Example:*
Stake 100 USDT, 10% APY, 30 days:
• After 30 days: 100 USDT + 0.82 USDT interest

✅ *Risk:* Cannot withdraw during lock period
⏰ *Duration:* 7 to 90 days
          `.trim()
        }
      },
      
      'spot': {
        zh: {
          term: 'Spot（现货）',
          plain: '就是直接买币，买了就是你的',
          explanation: `
📝 *简单理解：*
1. 用钱直接买币（一手交钱一手交货）
2. 买了就是你的，可以随时卖
3. 涨了赚钱，跌了亏钱

💰 *举例：*
用 1000 USDT 买 BTC：
• 买入价：70,000 USDT/BTC
• 买到：0.0143 BTC
• 涨到 80,000：赚 143 USDT
• 跌到 60,000：亏 143 USDT

✅ *风险：* 只会亏你投入的钱，不会欠债
          `.trim()
        },
        en: {
          term: 'Spot Trading',
          plain: 'Buy coins directly, own them immediately',
          explanation: `
📝 *Simple explanation:*
1. Buy coins with money (direct purchase)
2. You own them, can sell anytime
3. Profit when price goes up, loss when down

💰 *Example:*
Buy BTC with 1000 USDT:
• Buy price: 70,000 USDT/BTC
• Get: 0.0143 BTC
• Price up to 80,000: Profit 143 USDT
• Price down to 60,000: Loss 143 USDT

✅ *Risk:* Can only lose what you invested
          `.trim()
        }
      },
      
      'futures': {
        zh: {
          term: 'Futures（合约）',
          plain: '就是借钱炒币，风险极高！',
          explanation: `
⚠️ *重要警告：新手不要碰！*

📝 *简单理解：*
1. 用 100 块可以买 1000 块的币（10倍杠杆）
2. 涨 10% 你赚 100%（翻倍）
3. 跌 10% 你亏 100%（爆仓，钱没了）

💰 *举例：*
用 100 USDT 开 10 倍杠杆：
• 涨 10%：赚 100 USDT（翻倍）
• 跌 10%：亏 100 USDT（爆仓）

❌ *风险：* 极高！99% 的人都亏钱
💡 *建议：* 新手千万不要碰合约
          `.trim()
        },
        en: {
          term: 'Futures Trading',
          plain: 'Borrow money to trade, EXTREMELY RISKY!',
          explanation: `
⚠️ *WARNING: Not for beginners!*

📝 *Simple explanation:*
1. Use $100 to trade $1000 worth (10x leverage)
2. 10% up = 100% profit (double)
3. 10% down = 100% loss (liquidation)

💰 *Example:*
Use 100 USDT with 10x leverage:
• 10% up: Profit 100 USDT (double)
• 10% down: Loss 100 USDT (liquidated)

❌ *Risk:* EXTREME! 99% lose money
💡 *Advice:* Beginners should NEVER trade futures
          `.trim()
        }
      },
      
      'market order': {
        zh: {
          term: 'Market Order（市价单）',
          plain: '立即成交，不管价格',
          explanation: `
📝 *简单理解：*
就像去菜市场买菜，老板说多少钱就多少钱，立即买到。

💰 *举例：*
• 你想买 BTC
• 点"市价买入"
• 立即成交，不管当前价格

✅ *优点：* 快，立即成交
❌ *缺点：* 价格可能不理想
          `.trim()
        },
        en: {
          term: 'Market Order',
          plain: 'Buy/sell immediately at current price',
          explanation: `
📝 *Simple explanation:*
Like buying vegetables at market, accept whatever price, get it immediately.

💰 *Example:*
• You want to buy BTC
• Click "Market Buy"
• Executed immediately at current price

✅ *Pros:* Fast, immediate execution
❌ *Cons:* Price may not be ideal
          `.trim()
        }
      },
      
      'limit order': {
        zh: {
          term: 'Limit Order（限价单）',
          plain: '设定价格，到了才买',
          explanation: `
📝 *简单理解：*
就像网购设置价格提醒，降到你想要的价格才买。

💰 *举例：*
• BTC 现在 70,000
• 你设置 65,000 买入
• 等价格跌到 65,000 才成交

✅ *优点：* 价格由你控制
❌ *缺点：* 可能等不到，不成交
          `.trim()
        },
        en: {
          term: 'Limit Order',
          plain: 'Set your price, buy when it reaches',
          explanation: `
📝 *Simple explanation:*
Like setting price alert when shopping, only buy when price drops to your target.

💰 *Example:*
• BTC now at 70,000
• You set limit buy at 65,000
• Only executes when price drops to 65,000

✅ *Pros:* You control the price
❌ *Cons:* May not execute if price doesn't reach
          `.trim()
        }
      },
      
      'stop loss': {
        zh: {
          term: 'Stop Loss（止损）',
          plain: '设定亏损底线，到了自动卖出',
          explanation: `
📝 *简单理解：*
就像给自己设个"亏损警戒线"，亏到这个数就自动卖掉，防止亏更多。

💰 *举例：*
• 70,000 买入 BTC
• 设置止损 63,000（亏 10%）
• 跌到 63,000 自动卖出
• 最多亏 10%，不会亏更多

✅ *为什么要止损：* 防止小亏变大亏
💡 *建议：* 每次买币都要设止损
          `.trim()
        },
        en: {
          term: 'Stop Loss',
          plain: 'Set loss limit, auto-sell when reached',
          explanation: `
📝 *Simple explanation:*
Like setting a "loss alarm", automatically sell when loss reaches this level to prevent bigger losses.

💰 *Example:*
• Buy BTC at 70,000
• Set stop loss at 63,000 (10% loss)
• Auto-sell when price drops to 63,000
• Maximum loss: 10%

✅ *Why stop loss:* Prevent small loss from becoming big loss
💡 *Advice:* Always set stop loss when buying
          `.trim()
        }
      },
      
      'take profit': {
        zh: {
          term: 'Take Profit（止盈）',
          plain: '设定盈利目标，到了自动卖出',
          explanation: `
📝 *简单理解：*
就像给自己设个"赚钱目标"，赚到这个数就自动卖掉，落袋为安。

💰 *举例：*
• 70,000 买入 BTC
• 设置止盈 77,000（赚 10%）
• 涨到 77,000 自动卖出
• 锁定 10% 利润

✅ *为什么要止盈：* 防止赚了又亏回去
💡 *建议：* 见好就收，不要太贪心
          `.trim()
        },
        en: {
          term: 'Take Profit',
          plain: 'Set profit target, auto-sell when reached',
          explanation: `
📝 *Simple explanation:*
Like setting a "profit goal", automatically sell when profit reaches this level to lock in gains.

💰 *Example:*
• Buy BTC at 70,000
• Set take profit at 77,000 (10% profit)
• Auto-sell when price rises to 77,000
• Lock in 10% profit

✅ *Why take profit:* Prevent giving back profits
💡 *Advice:* Take profits when you can, don't be greedy
          `.trim()
        }
      }
    };
  }
  
  // 翻译术语
  translate(term, lang = 'zh') {
    const termLower = term.toLowerCase().trim();
    
    // 查找匹配的术语
    for (const [key, value] of Object.entries(this.translations)) {
      if (termLower.includes(key.toLowerCase())) {
        return value[lang] || value['zh'];
      }
    }
    
    return null;
  }
  
  // 生成友好的解释消息
  generateExplanation(term, lang = 'zh') {
    const translation = this.translate(term, lang);
    
    if (!translation) {
      if (lang === 'zh') {
        return `抱歉，我还不知道"${term}"是什么意思。\n\n你可以问我：\n• Launchpool 是什么？\n• 什么是合约？\n• 止损怎么设置？`;
      } else {
        return `Sorry, I don't know what "${term}" means yet.\n\nYou can ask me:\n• What is Launchpool?\n• What is futures?\n• How to set stop loss?`;
      }
    }
    
    if (lang === 'zh') {
      let message = `💡 *${translation.term}*\n\n`;
      message += `🗣️ *人话翻译：*\n${translation.plain}\n\n`;
      message += translation.explanation;
      message += `\n\n还有不懂的吗？继续问我！`;
      return message;
    } else {
      let message = `💡 *${translation.term}*\n\n`;
      message += `🗣️ *Plain English:*\n${translation.plain}\n\n`;
      message += translation.explanation;
      message += `\n\nAny more questions? Keep asking!`;
      return message;
    }
  }
  
  // 检测消息中是否包含需要翻译的术语
  detectTerms(message) {
    const detected = [];
    const messageLower = message.toLowerCase();
    
    for (const term of Object.keys(this.translations)) {
      if (messageLower.includes(term.toLowerCase())) {
        detected.push(term);
      }
    }
    
    return detected;
  }
}

module.exports = PlainTranslator;
