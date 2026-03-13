/**
 * binance-square-post-safe.js
 * 币安广场安全发帖模块（隐私检查 + API 发布）
 */

const https = require('https');
const path = require('path');

const config = JSON.parse(require('fs').readFileSync(
  path.join(__dirname, 'config.json'), 'utf8'
));

const API_KEY = config.binanceSquare?.apiKey || '';

// 隐私检查：过滤敏感内容
function privacyCheck(content) {
  const patterns = [
    /https?:\/\//i,           // 链接
    /t\.me\//i,               // Telegram 链接
    /微信|wechat|whatsapp/i,  // 联系方式
    /\+\d{10,}/,              // 电话号码
    /@\w+/,                   // @用户名
  ];
  for (const p of patterns) {
    if (p.test(content)) {
      return { safe: false, reason: `内容包含敏感信息: ${p}` };
    }
  }
  return { safe: true };
}

// 发帖到币安广场
function postToSquare(content) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ bodyTextOnly: content });
    const req = https.request({
      hostname: 'www.binance.com',
      port: 443,
      path: '/bapi/composite/v1/public/pgc/openApi/content/add',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-Square-OpenAPI-Key': API_KEY,
        'clienttype': 'binanceSkill'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function safePost(content) {
  // 隐私检查
  const check = privacyCheck(content);
  if (!check.safe) {
    return { success: false, reason: 'privacy_check_failed', error: check.reason };
  }

  if (!API_KEY) {
    return { success: false, reason: 'no_api_key', error: '未配置币安广场 API Key' };
  }

  try {
    const result = await postToSquare(content);
    if (result.code === '000000' || result.success) {
      const postId = result.data?.id || result.data?.postId || '';
      return {
        success: true,
        url: postId ? `https://www.binance.com/square/post/${postId}` : 'https://www.binance.com/square'
      };
    } else {
      return { success: false, reason: 'api_error', error: result.message || JSON.stringify(result) };
    }
  } catch(e) {
    return { success: false, reason: 'request_failed', error: e.message };
  }
}

module.exports = { safePost };
