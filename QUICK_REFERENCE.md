# 🚀 Binance Guardian AI - 快速参考指南

## 📋 常用命令

### Bot 管理
```bash
# 查看状态
pm2 status binance-guardian

# 重启 bot
pm2 restart binance-guardian

# 查看日志
pm2 logs binance-guardian --lines 100

# 停止 bot
pm2 stop binance-guardian

# 启动 bot
pm2 start binance-guardian
```

### Git 操作
```bash
# 查看状态
cd /root/Binance-guardian-ai && git status

# 提交更改
git add -A
git commit -m "描述"
git push

# 查看日志
git log --oneline -10

# 创建标签
git tag -a v2.9.1 -m "版本说明"
git push origin v2.9.1
```

### 版本更新
```bash
# 更新版本号
cd /root/Binance-guardian-ai
npm version 2.9.1 --no-git-tag-version

# 提交
git add package.json package-lock.json
git commit -m "chore: 更新版本到 v2.9.1"
git push
```

## 📁 重要文件位置

### 核心代码
- `/root/Binance-guardian-ai/crypto-scout.js` - 主程序
- `/root/Binance-guardian-ai/contract-analyzer.js` - 合约分析
- `/root/Binance-guardian-ai/scam-detector.js` - 诈骗检测
- `/root/Binance-guardian-ai/telegram-ui.js` - Telegram 界面

### 配置文件
- `/root/Binance-guardian-ai/config.json` - 主配置
- `/root/Binance-guardian-ai/package.json` - 项目配置

### 文档
- `/root/Binance-guardian-ai/README.md` - 英文文档
- `/root/Binance-guardian-ai/README.zh-CN.md` - 中文文档
- `/root/Binance-guardian-ai/CHANGELOG.md` - 更新日志
- `/root/Binance-guardian-ai/ROADMAP.md` - 路线图
- `/root/Binance-guardian-ai/PROJECT_INTRO.md` - 项目介绍

### 推广材料
- `/root/Binance-guardian-ai/.github/PROMOTION/social-media-posts.md` - 社交媒体版本
- `/root/Binance-guardian-ai/.github/PROMOTION/v2.9.0-release-summary.md` - 发布总结
- `/root/Binance-guardian-ai/.github/PROMOTION/release-v2.9.0.md` - Release 说明

## 🔧 常见问题

### Bot 无响应
```bash
# 检查进程
pm2 status

# 查看日志
pm2 logs binance-guardian --lines 50

# 重启
pm2 restart binance-guardian
```

### 内存占用过高
```bash
# 查看内存
pm2 status

# 重启释放内存
pm2 restart binance-guardian
```

### Git 推送失败
```bash
# 检查远程
git remote -v

# 拉取最新
git pull origin master

# 再次推送
git push
```

## 📊 监控命令

### 实时监控
```bash
# pm2 监控
pm2 monit

# 系统资源
htop

# 磁盘空间
df -h
```

### 日志查看
```bash
# 实时日志
pm2 logs binance-guardian

# 最近 100 行
pm2 logs binance-guardian --lines 100 --nostream

# 错误日志
pm2 logs binance-guardian --err
```

## 🚀 发布流程

### 1. 开发新功能
```bash
# 修改代码
vim contract-analyzer.js

# 测试
pm2 restart binance-guardian
# 在 Telegram 中测试功能
```

### 2. 提交代码
```bash
git add -A
git commit -m "feat: 新功能描述"
git push
```

### 3. 更新文档
```bash
# 更新 CHANGELOG.md
vim CHANGELOG.md

# 更新 README
vim README.md
vim README.zh-CN.md

# 提交
git add -A
git commit -m "docs: 更新文档"
git push
```

### 4. 发布版本
```bash
# 更新版本号
npm version 2.9.1 --no-git-tag-version

# 创建标签
git tag -a v2.9.1 -m "Release v2.9.1"

# 推送
git push
git push origin v2.9.1
```

### 5. 创建 Release
1. 访问 https://github.com/pjl914335852-ux/Binance-guardian-ai/releases
2. 点击 "Draft a new release"
3. 选择标签 v2.9.1
4. 使用 `.github/PROMOTION/release-v2.9.1.md` 的内容
5. 发布

## 📱 社交媒体发布

### Twitter/X
使用 `.github/PROMOTION/social-media-posts.md` 中的 Twitter 版本

### LinkedIn
使用 `.github/PROMOTION/social-media-posts.md` 中的 LinkedIn 版本

### 微信公众号
使用 `.github/PROMOTION/social-media-posts.md` 中的微信版本

## 🔗 重要链接

- **GitHub**: https://github.com/pjl914335852-ux/Binance-guardian-ai
- **视频演示**: https://youtu.be/dqGWWQHO_CQ
- **Telegram Bot**: @afrxa_bot
- **Issues**: https://github.com/pjl914335852-ux/Binance-guardian-ai/issues

## 📞 联系方式

- **GitHub**: @pjl914335852-ux
- **Telegram**: @Ee_7t

---

**最后更新**: 2026-03-15
**当前版本**: v2.9.0
