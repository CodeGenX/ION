# Git Workflow & Best Practices

This guide establishes the Git workflow for the ION project.

---

## Quick Start - For Each New Story

```bash
# 1. Start from master
git checkout master
git pull origin master

# 2. Create feature branch
git checkout -b feature/story-X-description

# 3. Work, commit, push
git add .
git commit -m "feat: description"
git push -u origin feature/story-X-description

# 4. Create PR on GitHub
# 5. After merge, clean up
git checkout master
git pull origin master
git branch -d feature/story-X-description
Branch Naming Convention
Format: feature/<story-id>-<2-4-word-description>

Good Examples:

feature/story-1-portfolio-widget
feature/story-2-user-authentication
feature/bugfix-connection-pooling
Bad Examples:

my-changes ❌
fix ❌
story1 ❌
Commit Message Format
<type>: <subject>
Types:

feat - New feature
fix - Bug fix
docs - Documentation
test - Tests
refactor - Code restructuring
chore - Maintenance
Examples:

git commit -m "feat: add portfolio health widget"
git commit -m "fix: correct database connection pooling"
git commit -m "docs: update deployment guide"
Daily Workflow
Starting Your Day
git checkout master
git pull origin master
git status
Starting New Work
git checkout -b feature/story-X-description
git push -u origin feature/story-X-description
During Development
git status              # Check changes
git add <files>         # Stage files
git commit -m "msg"     # Commit
git push                # Push to remote
Pull Request Process
When to Create PR
✅ Story complete and working
✅ Tests pass
✅ Code tested in browser
Steps
Push branch: git push -u origin feature/branch-name
Go to GitHub repository
Click "Compare & pull request"
Fill in title and description
Click "Create pull request"
Review and merge
Delete branch on GitHub
After PR is Merged
# 1. Switch to master
git checkout master

# 2. Pull merged changes
git pull origin master

# 3. Delete local branch
git branch -d feature/story-X-description

# 4. Verify clean
git status

Common Commands
# Status
git status
git log --oneline -10
git branch -a

# Undo changes
git checkout -- <file>          # Discard file changes
git restore --staged <file>     # Unstage file
git reset --soft HEAD~1         # Undo last commit (keep changes)

# Sync with master
git checkout master
git pull origin master
git checkout feature/your-branch
git merge master

Troubleshooting

"Your branch has diverged"
# Reset to match remote
git fetch origin
git reset --hard origin/master

"Merge Conflict"
Open conflicted file
Find markers: <<<<<<< HEAD and >>>>>>>
Manually resolve
Stage file: git add <file>
Complete merge: git commit

"Cannot push to master"
# NEVER push to master directly
# Always use feature branches and PRs
git checkout -b feature/my-changes
git push -u origin feature/my-changes

Best Practices
✅ DO:
Branch from latest master
Use descriptive names
Commit often
Push regularly
Create PRs for all changes
Delete branches after merge

❌ DON'T:
Commit directly to master
Use vague commit messages
Push broken code
Keep old branches around

Complete Example Workflow
# 1. Start
git checkout master
git pull origin master

# 2. Create branch
git checkout -b feature/story-4-risk-widget

# 3. Make changes
# ... write code ...

# 4. Commit
git add src/components/RiskWidget.svelte
git commit -m "feat: add risk indicators widget"

# 5. Push
git push -u origin feature/story-4-risk-widget

# 6. Create PR on GitHub

# 7. After merge
git checkout master
git pull origin master
git branch -d feature/story-4-risk-widget
Remember: Commit often, push regularly, use feature branches! EOF