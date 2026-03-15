# Contributing to Binance Guardian AI

Thank you for your interest in contributing to Binance Guardian AI! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and constructive
- Focus on the issue, not the person
- Help create a welcoming environment
- Follow project guidelines

## How to Contribute

### Reporting Bugs

1. Check [existing issues](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues) to avoid duplicates
2. Use the [Bug Report template](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues/new?template=bug_report.md)
3. Include:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node.js version, etc.)
   - Logs or screenshots

### Suggesting Features

1. Check [existing feature requests](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues?q=is%3Aissue+label%3Aenhancement)
2. Use the [Feature Request template](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues/new?template=feature_request.md)
3. Describe:
   - What problem it solves
   - How it should work
   - Why it's valuable

### Submitting Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Code Style

### JavaScript/Node.js

- Use ES6+ syntax
- 2 spaces for indentation
- Semicolons required
- Use `const` and `let`, avoid `var`
- Meaningful variable names

**Example:**
```javascript
// Good
const userBalance = await fetchBalance(userId);

// Bad
var x = await fetchBalance(userId);
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(guardian): add voice safety report feature

fix(scam-detector): correct Pi coin detection logic

docs(readme): update installation guide
```

## Testing

### Manual Testing

Before submitting a PR, test your changes:

1. Install dependencies: `npm install`
2. Copy config: `cp config.example.json config.json`
3. Add your test credentials
4. Run the bot: `node crypto-scout.js`
5. Test all affected features

### Test Checklist

- [ ] Bot starts without errors
- [ ] All buttons respond correctly
- [ ] No console errors
- [ ] Memory usage is reasonable
- [ ] No API rate limit issues

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No merge conflicts

### PR Description

Include:
- What changes were made
- Why the changes were needed
- How to test the changes
- Screenshots (if UI changes)
- Related issues (if any)

**Example:**
```markdown
## Changes
- Added voice safety report feature
- Integrated OpenAI Whisper API
- Added daily scheduled voice reports

## Why
Users requested audio format for elderly users who prefer listening over reading.

## Testing
1. Set OpenAI API key in config.json
2. Click "🎙️ Voice Report" button
3. Verify audio message is sent

## Screenshots
[Attach screenshots]

## Related Issues
Closes #42
```

## Documentation

### When to Update Docs

Update documentation when:
- Adding new features
- Changing existing behavior
- Fixing bugs that affect usage
- Improving installation/setup process

### Documentation Files

- `README.md`: Main project overview
- `CHANGELOG.md`: Version history
- `CONFIG_GUIDE.md`: Configuration details
- `USAGE.md`: Usage instructions
- `wiki/`: Detailed guides

## Getting Help

- **Documentation**: [Wiki](https://github.com/pjl914335852-ux/Binance-guardian-ai/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/pjl914335852-ux/Binance-guardian-ai/discussions)
- **Issues**: [GitHub Issues](https://github.com/pjl914335852-ux/Binance-guardian-ai/issues)
- **Contact**: [@Ee_7t](https://t.me/Ee_7t)

## License

By contributing, you agree that your contributions will be licensed under the AGPL-3.0 License.

---

Thank you for contributing to Binance Guardian AI! 🛡️
