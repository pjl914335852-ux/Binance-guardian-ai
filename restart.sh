#!/bin/bash
# Trading Scout Restart Script
# Uses systemd to manage the service (prevents duplicate instances)

echo "🔄 Restarting Trading Scout via systemd..."

# Kill any rogue manual instances
pkill -9 -f "node crypto-scout.js" 2>/dev/null
sleep 1

# Restart via systemd
systemctl restart trading-scout

sleep 2

# Check status
if systemctl is-active --quiet trading-scout; then
    PID=$(systemctl show -p MainPID --value trading-scout)
    echo "✅ Trading Scout restarted successfully (PID: $PID)"
    echo "📋 Status: systemctl status trading-scout"
    echo "📋 Logs: journalctl -u trading-scout -f"
    echo "📋 Or: tail -f /root/.openclaw/workspace/crypto-trading-scout/scout.log"
else
    echo "❌ Failed to start Trading Scout"
    systemctl status trading-scout --no-pager
    exit 1
fi
