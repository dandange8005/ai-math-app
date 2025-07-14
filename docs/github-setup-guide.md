# GitHub Setup Guide

This guide documents how to install GitHub CLI and upload your project to GitHub.

## Prerequisites

- macOS with Homebrew installed
- Local Git repository (already initialized)
- GitHub account

## Step 1: Install GitHub CLI

### Check if Homebrew is installed
```bash
which brew
```
If Homebrew is not installed, visit [brew.sh](https://brew.sh) to install it first.

### Install GitHub CLI via Homebrew
```bash
brew install gh
```

This will install the GitHub CLI tool (`gh`) which allows you to interact with GitHub from the command line.

## Step 2: Authenticate GitHub CLI

### Start the authentication process
```bash
gh auth login --web
```

### Authentication options
When prompted, choose:
1. **GitHub.com** (unless using GitHub Enterprise)
2. **HTTPS** (recommended for most users)
3. **Yes** to authenticate with your GitHub credentials
4. **Login with a web browser** (easiest option)

### Complete authentication in browser
1. A browser window will open automatically
2. Follow the GitHub login prompts
3. Authorize the GitHub CLI application
4. Return to terminal when complete

### Verify authentication
```bash
gh auth status
```

Expected output:
```
github.com
  ✓ Logged in to github.com account your-username (keyring)
  - Active account: true
  - Git operations protocol: https
  - Token: gho_************************************
```

## Step 3: Prepare Local Repository

### Navigate to your project directory
```bash
cd "/path/to/your/ai-math-app"
```

### Check git status
```bash
git status
```

### Stage all files (if not already committed)
```bash
git add .
```

### Create initial commit (if needed)
```bash
git commit -m "Initial commit: Complete AI Math Helper implementation

- Built personalized math learning app for Ethan (Year 6) and Daniel (Year 4)
- 35 interactive exercises across 7 targeted math areas
- Progress tracking with local storage persistence
- Responsive design with instant feedback system
- Comprehensive documentation in /docs folder
- TypeScript implementation with React 18

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Step 4: Create GitHub Repository

### Create the repository on GitHub
```bash
gh repo create ai-math-app --public --description "Personalized math learning app for Ethan and Daniel - Interactive exercises targeting specific learning gaps"
```

**Options explained:**
- `ai-math-app` - Repository name
- `--public` - Makes repository publicly visible (use `--private` for private)
- `--description` - Repository description shown on GitHub

**Expected output:**
```
https://github.com/your-username/ai-math-app
```

## Step 5: Connect Local Repository to GitHub

### Add GitHub remote
```bash
git remote add origin https://github.com/your-username/ai-math-app.git
```

### Rename default branch to main (GitHub standard)
```bash
git branch -M main
```

### Push code to GitHub
```bash
git push -u origin main
```

**Expected output:**
```
branch 'main' set up to track 'origin/main'.
To https://github.com/your-username/ai-math-app.git
 * [new branch]      main -> main
```

## Step 6: Verify Upload

### Check repository online
1. Visit your repository URL: `https://github.com/your-username/ai-math-app`
2. Verify all files are present
3. Check that documentation is properly formatted

### Verify remote connection locally
```bash
git remote -v
```

Expected output:
```
origin  https://github.com/your-username/ai-math-app.git (fetch)
origin  https://github.com/your-username/ai-math-app.git (push)
```

## Common Issues and Solutions

### Authentication Issues

**Problem**: `You are not logged into any GitHub hosts`
```bash
# Solution: Re-authenticate
gh auth login --web
```

**Problem**: Browser doesn't open automatically
```bash
# Solution: Use device flow instead
gh auth login
# Then select "Login with a web browser" and manually copy the URL
```

### Repository Creation Issues

**Problem**: Repository name already exists
```bash
# Solution: Use a different name or add suffix
gh repo create ai-math-app-2024 --public --description "..."
```

**Problem**: `--push` flag error
```bash
# Solution: Create repository first, then push separately
gh repo create ai-math-app --public --description "..."
git remote add origin https://github.com/username/ai-math-app.git
git push -u origin main
```

### Push Issues

**Problem**: `remote origin already exists`
```bash
# Solution: Remove existing remote and re-add
git remote remove origin
git remote add origin https://github.com/username/ai-math-app.git
```

**Problem**: Authentication failed during push
```bash
# Solution: Re-authenticate GitHub CLI
gh auth login --web
```

## Future Git Operations

### Making changes and updating GitHub
```bash
# After making changes to your code
git add .
git commit -m "Describe your changes"
git push
```

### Pulling changes from GitHub
```bash
git pull origin main
```

### Checking repository status
```bash
git status
gh repo view
```

## Repository Features

Once uploaded, your GitHub repository includes:

### Automatic Features
- **README.md** - Project overview (from Create React App)
- **Issues** - Track bugs and feature requests
- **Pull Requests** - Code review workflow
- **Actions** - Automated testing/deployment (can be added)
- **Releases** - Version management
- **Wiki** - Additional documentation

### Repository Structure
```
ai-math-app/
├── docs/                    # Comprehensive documentation
├── src/                     # React application source code
├── public/                  # Static assets
├── CLAUDE.md               # Development guidance
├── idea.md                 # Original project concept
├── package.json            # Project dependencies
└── README.md               # Basic project info
```

### Next Steps
- **Deploy to web**: Use Netlify, Vercel, or GitHub Pages
- **Collaborate**: Add collaborators via GitHub settings
- **Track issues**: Use GitHub Issues for bug reports and features
- **Set up CI/CD**: Automate testing and deployment

## Security Notes

- Never commit sensitive information (API keys, passwords)
- Use `.gitignore` to exclude sensitive files
- GitHub CLI stores authentication securely in keychain
- Repository visibility can be changed in GitHub settings

---

**Documentation created**: Current session  
**GitHub CLI version**: 2.75.0  
**Git version**: Standard macOS Git