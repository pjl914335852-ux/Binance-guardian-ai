# Trading Scout Service Management

## ⚠️ Important: Use systemd to manage the service

The Trading Scout is managed by systemd. **Do NOT start it manually** with `node crypto-scout.js` or you'll get duplicate instances!

## Service Commands

### Restart the bot
```bash
./restart.sh
# or
systemctl restart trading-scout
```

### Check status
```bash
systemctl status trading-scout
```

### View logs
```bash
# Systemd logs
journalctl -u trading-scout -f

# Application logs
tail -f scout.log
```

### Stop the bot
```bash
systemctl stop trading-scout
```

### Start the bot
```bash
systemctl start trading-scout
```

### Disable auto-start on boot
```bash
systemctl disable trading-scout
```

### Enable auto-start on boot
```bash
systemctl enable trading-scout
```

## Troubleshooting

### Multiple instances running?
```bash
# Kill all instances
pkill -9 -f crypto-scout

# Restart via systemd
systemctl restart trading-scout

# Verify only one instance
ps aux | grep crypto-scout | grep -v grep
```

### Bot not responding to commands?
This usually means multiple instances are running (409 Conflict error).

**Solution:**
```bash
./restart.sh
```

## Configuration Changes

After editing `config.json` or `telegram-ui.js`:
```bash
./restart.sh
```

## Deployment

After pushing code to GitHub:
```bash
git pull
./restart.sh
```
