# GitHub 仓库保护设置指南

## 🔒 保护 master 分支

### 1. 进入仓库设置

1. 打开 https://github.com/pjl914335852-ux/openclaw-trading-scout
2. 点击 **Settings** (设置)
3. 左侧菜单选择 **Branches** (分支)

### 2. 添加分支保护规则

点击 **Add branch protection rule** (添加分支保护规则)

### 3. 配置保护规则

**Branch name pattern (分支名称模式):**
```
master
```

**勾选以下选项：**

#### ✅ Require a pull request before merging
**合并前需要 Pull Request**

- ✅ Require approvals (需要审批)
  - Number of required approvals: **1** (需要 1 个审批)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
    (新提交时取消旧的审批)
  - ✅ Require review from Code Owners (需要代码所有者审批)

#### ✅ Require status checks to pass before merging
**合并前需要状态检查通过**（可选，如果有 CI/CD）

#### ✅ Require conversation resolution before merging
**合并前需要解决所有对话**

#### ✅ Require signed commits
**需要签名提交**（可选，更安全）

#### ✅ Require linear history
**需要线性历史**（保持提交历史清晰）

#### ✅ Include administrators
**包括管理员**（管理员也需要遵守规则）

#### ❌ Allow force pushes (禁用强制推送)
**不允许强制推送**

#### ❌ Allow deletions (禁用删除)
**不允许删除分支**

### 4. 保存设置

点击 **Create** (创建) 或 **Save changes** (保存更改)

---

## 📋 效果

设置后：

1. ✅ **不能直接推送到 master**
   - 必须通过 Pull Request
   - 必须经过你的审批

2. ✅ **所有更改都有记录**
   - 每个 PR 都有讨论记录
   - 可以看到谁提交了什么

3. ✅ **可以拒绝不合适的更改**
   - 审查代码后再决定是否合并
   - 可以要求修改

4. ✅ **保护历史记录**
   - 不能强制推送覆盖历史
   - 不能删除分支

---

## 🔄 贡献流程

### 其他人想贡献代码：

1. **Fork 仓库**
   - 点击右上角 Fork 按钮

2. **克隆到本地**
   ```bash
   git clone https://github.com/他们的用户名/openclaw-trading-scout
   cd openclaw-trading-scout
   ```

3. **创建新分支**
   ```bash
   git checkout -b feature/new-feature
   ```

4. **修改代码并提交**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

5. **创建 Pull Request**
   - 在 GitHub 上点击 "Compare & pull request"
   - 填写 PR 描述
   - 提交 PR

6. **等待审批**
   - 你会收到通知
   - 审查代码
   - 批准或要求修改

7. **合并**
   - 你批准后，点击 "Merge pull request"
   - 代码合并到 master

---

## 👤 你自己想修改代码：

### 方式 1: 通过 Pull Request（推荐）

```bash
# 创建新分支
git checkout -b feature/my-changes

# 修改代码
# ...

# 提交
git add .
git commit -m "My changes"
git push origin feature/my-changes

# 在 GitHub 创建 PR，然后自己审批合并
```

### 方式 2: 临时禁用保护（不推荐）

1. 进入 Settings → Branches
2. 点击保护规则旁的 Edit
3. 取消勾选 "Include administrators"
4. 直接推送到 master
5. **记得重新启用保护！**

---

## 🎯 推荐设置总结

**最小保护（适合个人项目）：**
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ❌ Allow force pushes
- ❌ Allow deletions

**完整保护（适合团队项目）：**
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Dismiss stale approvals
- ✅ Require conversation resolution
- ✅ Require linear history
- ✅ Include administrators
- ❌ Allow force pushes
- ❌ Allow deletions

---

## 📝 注意事项

1. **设置后立即生效**
   - 包括你自己也不能直接推送

2. **紧急修复**
   - 如果需要紧急修复，可以临时禁用保护
   - 修复后记得重新启用

3. **Release 标签**
   - 标签不受分支保护影响
   - 可以直接创建和推送标签

4. **其他分支**
   - 只保护 master 分支
   - 其他分支可以自由推送

---

## ✅ 验证设置

设置完成后，尝试直接推送到 master：

```bash
git push origin master
```

应该看到错误：
```
remote: error: GH006: Protected branch update failed for refs/heads/master.
```

这说明保护设置生效了！✅
