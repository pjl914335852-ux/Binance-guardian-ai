# Changelog

## [2.1.0] - 2026-03-06

### 🎉 Major UI/UX Improvements & Bug Fixes

#### Fixed
- **Critical:** Fixed duplicate messages issue caused by multiple bot instances
  - Root cause: manual start + systemd auto-restart = 2 instances
  - Solution: Use systemd exclusively for service management
  - Added `restart.sh` script for safe restarts
  - Added `SERVICE.md` documentation

- **UI Bugs:**
  - Fixed toggle push creating duplicate interfaces (added 500ms delay)
  - Fixed help button not responding (removed duplicate callback handling)
  - Fixed remove pair showing nothing when empty (now shows friendly message with buttons)
  - Fixed help message being too long (split into 2 messages)

#### Added
- **Heartbeat Feature:** Bot sends status report every 2 hours
  - Shows uptime, checks count, opportunities found
  - Lets users know the bot is actively working
  - Added to state: `lastHeartbeat`, `checksCount`

- **UI Enhancements:**
  - Added "Back to Menu" button in pairs page
  - Added "Back to Menu" buttons in both help messages
  - Added "How It Works" section in help (6-step explanation)
  - Added heartbeat feature description in main menu
  - Improved remove pair empty state with Add/Back buttons

- **Documentation:**
  - Added `SERVICE.md` - Service management guide
  - Added `restart.sh` - Safe restart script
  - Updated help text with work principle explanation

#### Changed
- **Remove Pair:** Now only accepts number input (1-N), not pair names
  - Simplified user experience
  - Better validation with range display
  - UI text: "请发送要删除的交易对编号"

- **Help Page:** Split into 2 messages for better readability
  - Message 1: About + How It Works + Heartbeat
  - Message 2: Commands + Features + Tips + Back button
  - Prevents Telegram parsing issues with long messages

#### Technical
- Improved callback query handling consistency
- Better error messages for edge cases
- Log monitoring: ~1KB/minute growth (healthy)
- Service management via systemd only

### Commits
- c875c4c: Add back button to both help messages
- cf91054: Prevent duplicate instances with systemd management
- ee3f15b: Split help message into two parts
- 3cf40cc: Fix help button and remove pair UI issues
- f217bfe: UI improvements and documentation enhancements
- 8af08ed: Fix toggle push UI bug and add heartbeat feature

---

## [2.0.0] - 2026-03-06

### 🚀 NOFX API Integration

#### Added
- NOFX API integration for professional market data
- Signal quality scoring (0-100)
- Fund flow tracking
- Interactive Telegram UI with inline keyboards
- Multi-language support (EN/ZH)
- AI500 score integration
- Enhanced risk assessment

#### Features
- Real-time monitoring (30s interval)
- NOFX data updates (5min interval)
- Interactive commands: /start, /status, /pairs, /history, /help
- Custom pair management
- Refresh interval settings (10-300s)
- Auto-push toggle

---

## [1.0.0] - 2026-03-05

### Initial Release
- Basic price monitoring
- Simple spread detection
- Telegram notifications
- Multi-exchange support
