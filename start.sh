#!/bin/bash
# Trading Scout Startup Script
# Ensures only one instance is running

cd "$(dirname "$0")"

# Kill any existing instances
echo "🔍 Checking for existing instances..."
pkill -9 -f "node.*crypto-scout.js" 2>/dev/null
sleep 2

# Verify all killed
if pgrep -f "node.*crypto-scout.js" > /dev/null; then
    echo "❌ Failed to kill existing instances"
    exit 1
fi

echo "✅ No existing instances found"

# Start new instance
echo "🚀 Starting Trading Scout..."
nohup node crypto-scout.js > scout.log 2>&1 &
NEW_PID=$!

sleep 3

# Verify started
if ps -p $NEW_PID > /dev/null; then
    echo "✅ Trading Scout started successfully (PID: $NEW_PID)"
    echo "📋 Log: tail -f scout.log"
else
    echo "❌ Failed to start Trading Scout"
    exit 1
fi
