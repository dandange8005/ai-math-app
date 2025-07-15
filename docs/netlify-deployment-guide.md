# Netlify Deployment Guide

This guide covers the complete process of deploying the AI Math Helper app to Netlify using the Netlify CLI.

## Prerequisites

- Node.js installed on your system
- A Netlify account (sign up at https://netlify.com)
- Your React app built and ready for production

## Step 1: Install Netlify CLI

Install the Netlify CLI globally using npm:

```bash
npm install -g netlify-cli
```

**Note:** You might see a warning about Node.js version compatibility, but the CLI will still work.

Verify the installation:
```bash
netlify --version
```

## Step 2: Basic Netlify Commands

### Authentication
```bash
netlify login          # Login to your Netlify account
netlify logout         # Logout from Netlify
netlify status         # Show current login status and site info
```

### Site Management
```bash
netlify sites:list     # List all your Netlify sites
netlify sites:create   # Create a new site
netlify init           # Initialize Netlify for current project
netlify link           # Link local project to existing Netlify site
netlify unlink         # Unlink from current site
```

### Development Commands
```bash
netlify dev            # Start local dev server with Netlify environment
netlify dev --port=8080 # Start dev server on specific port
```

### Deployment Commands
```bash
netlify deploy         # Deploy to preview URL (draft)
netlify deploy --prod  # Deploy to production
netlify deploy --dir=build --prod  # Deploy specific folder to production
```

### Site Information
```bash
netlify open           # Open site in browser
netlify open:admin     # Open Netlify admin dashboard
netlify help           # Show all available commands
```

## Step 3: Login to Netlify

Before deploying, you need to authenticate with your Netlify account:

```bash
netlify login
```

This will:
- Open your browser to the Netlify authorization page
- Ask you to authorize the CLI
- Save your credentials locally

Verify your login:
```bash
netlify status
```

## Step 4: Build Your App

Before deploying, make sure your React app is built for production:

```bash
npm run build
```

This creates a `build` folder with optimized static files ready for deployment.

## Step 5: Creating a Project on Netlify

### Option 1: Create During First Deployment (Recommended)

Run the deploy command, and Netlify will guide you through project creation:

```bash
netlify deploy --dir build
```

When prompted, select:
- **"+ Create & configure a new project"**
- Choose a team (usually your personal account)
- Enter a site name (or leave blank for auto-generated name)

### Option 2: Create Project First

```bash
netlify sites:create
```

Then link your local project:
```bash
netlify link
```

## Step 6: Deploy Preview

Deploy to a preview URL first to test your app:

```bash
netlify deploy --dir build
```

This will:
- Build your app if configured
- Upload files to Netlify
- Provide a preview URL like: `https://random-id--your-site.netlify.app`
- Show build logs and deployment status

### Preview Deployment Benefits
- Test your app before going live
- Safe to experiment with
- Get a temporary URL for testing
- Verify all features work in production environment

## Step 7: Deploy to Production

Once you've tested the preview and everything works correctly:

```bash
netlify deploy --prod
```

Or with explicit directory:
```bash
netlify deploy --prod --dir build
```

This will:
- Deploy to your main site URL
- Make your app live to the world
- Provide the production URL

## Example Deployment Workflow

Here's the complete workflow for deploying the AI Math Helper app:

```bash
# 1. Install Netlify CLI (one-time setup)
npm install -g netlify-cli

# 2. Login to Netlify (one-time setup)
netlify login

# 3. Build your app
npm run build

# 4. Deploy preview (first time will create project)
netlify deploy --dir build

# 5. Test the preview URL thoroughly

# 6. Deploy to production
netlify deploy --prod

# 7. Check your live site
netlify open
```

## Deployment Output Example

### Preview Deployment
```
🚀 Deploy complete
────────────────────────────────────────────────────────────────

╭───────────────────────── ⬥  Draft deploy is live ⬥  ─────────────────────────╮
│                                                                              │
│                              Deployed draft to                               │
│          https://68769942753a371781a1f489--ai-math-app.netlify.app           │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯

If everything looks good on your draft URL, deploy it to your main project URL with the --prod flag:
netlify deploy --prod
```

### Production Deployment
```
🚀 Deploy complete
────────────────────────────────────────────────────────────────

╭─────────────────────────── ⬥  Site is live ⬥  ───────────────────────────╮
│                                                                          │
│                         https://ai-math-app.netlify.app                  │
│                                                                          │
╰──────────────────────────────────────────────────────────────────────────╯
```

## Troubleshooting

### Common Issues

1. **Build directory not found**
   ```
   Error: The deploy directory "/path/to/=build" has not been found
   ```
   **Solution:** Use `--dir build` (not `--dir=build`)

2. **Not logged in**
   ```
   Error: You must be logged in to run this command
   ```
   **Solution:** Run `netlify login`

3. **Build fails during deployment**
   **Solution:** Run `npm run build` locally first to check for errors

### Deployment Commands Reference

| Command | Purpose |
|---------|---------|
| `netlify deploy --dir build` | Deploy preview |
| `netlify deploy --prod` | Deploy to production |
| `netlify deploy --prod --dir build` | Deploy specific folder to production |
| `netlify status` | Check deployment status |
| `netlify open` | Open deployed site |

## Managing Your Deployed App

### Viewing Your Sites
```bash
netlify sites:list
```

### Opening Your Site
```bash
netlify open           # Open deployed site
netlify open:admin     # Open Netlify dashboard
```

### Checking Status
```bash
netlify status
```

## Setting Up Continuous Deployment

After your initial manual deployment, you can enable automatic deployments whenever you push changes to GitHub.

### Prerequisites for Continuous Deployment

1. Your project must be connected to a GitHub repository
2. You must have a Netlify site already created (from manual deployment)
3. Your site must be linked to the Netlify CLI

### Check Your Current Setup

First, verify your git repository is connected:

```bash
git remote -v
```

Check if your site is linked to Netlify:

```bash
netlify status
```

This should show your current project info, including:
- Current project name
- Admin URL
- Project URL
- Project ID

### Method 1: Via Netlify Dashboard (Recommended)

1. **Open your Netlify dashboard**:
   ```bash
   netlify open:admin
   ```

2. **Navigate to Build Settings**:
   - Go to **Site settings** → **Build & deploy**
   - Look for the **Continuous Deployment** section

3. **Connect to GitHub**:
   - Click **Link site to Git**
   - Choose **GitHub** as your Git provider
   - Authorize Netlify to access your GitHub repositories

4. **Select Repository**:
   - Choose your repository from the list (e.g., `username/ai-math-app`)

5. **Configure Build Settings**:
   - **Branch to deploy**: `main` (or your default branch)
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Base directory**: Leave blank (uses root)

6. **Save and Deploy**:
   - Click **Save** or **Deploy site**
   - Netlify will trigger the first automatic build

### Method 2: Via Netlify CLI (Advanced)

If you prefer using the command line:

1. **Link your site** (if not already linked):
   ```bash
   netlify link
   ```

2. **Initialize continuous deployment**:
   ```bash
   netlify init
   ```

3. **Configure build settings** in the Netlify dashboard as described above.

### Verification

After setup, verify continuous deployment is working:

1. **Check site settings** in the dashboard:
   - Go to **Site settings** → **Build & deploy**
   - Verify the repository is connected
   - Confirm build settings are correct

2. **Test the setup**:
   - Make a small change to your code
   - Commit and push to GitHub:
     ```bash
     git add .
     git commit -m "Test continuous deployment"
     git push origin main
     ```
   - Watch the build process in the Netlify dashboard

### Workflow After Continuous Deployment

Once continuous deployment is set up, your workflow becomes:

#### Before Continuous Deployment (Manual)
```bash
# Make changes locally
npm run build
netlify deploy --prod
```

#### After Continuous Deployment (Automatic)
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main
# 🚀 Netlify automatically builds and deploys!
```

### Build Process

When you push to GitHub, Netlify will:

1. **Clone your repository** to Netlify's build environment
2. **Install dependencies** using `npm install`
3. **Run build command** (`npm run build`)
4. **Deploy the build folder** to your live site
5. **Send notifications** about build success/failure

### Benefits of Continuous Deployment

- **Automatic deployments** on every push to main branch
- **Build logs and status** integrated with GitHub
- **Preview deployments** for pull requests (optional)
- **Rollback capability** to previous deployments
- **Build notifications** via email or Slack
- **No manual CLI commands** required for deployments

### Monitoring Deployments

After setup, you can monitor deployments:

```bash
# Check deployment status
netlify status

# View recent deployments
netlify open:admin

# Open your live site
netlify open
```

### Troubleshooting Continuous Deployment

#### Build Fails After Git Push

1. **Check build logs** in Netlify dashboard
2. **Verify build command** runs locally:
   ```bash
   npm run build
   ```
3. **Check environment variables** if your app uses them

#### Repository Not Found

1. **Verify repository URL** in site settings
2. **Check GitHub permissions** for Netlify app
3. **Re-authorize Netlify** in your GitHub settings

#### Build Command Issues

1. **Ensure package.json** has correct scripts
2. **Verify Node.js version** compatibility
3. **Check for missing dependencies**

### Example: Complete Setup Process

Here's what we did to set up continuous deployment for the AI Math Helper app:

```bash
# 1. Verify git repository connection
git remote -v
# Output: origin https://github.com/dandange8005/ai-math-app.git

# 2. Check Netlify site link
netlify status
# Output: Current project: ai-math-app

# 3. Open Netlify dashboard
netlify open:admin

# 4. Configure in dashboard:
# - Site settings → Build & deploy → Continuous Deployment
# - Link site to Git → GitHub
# - Select repository: dandange8005/ai-math-app
# - Build command: npm run build
# - Publish directory: build
# - Branch: main

# 5. Test deployment
git add .
git commit -m "Enable continuous deployment"
git push origin main
# Netlify automatically builds and deploys!
```

### Next Steps After Setup

1. **Test the automatic deployment** by making a small change
2. **Configure build notifications** in Netlify dashboard
3. **Set up preview deployments** for pull requests
4. **Monitor build performance** and optimize if needed
5. **Consider branch deployments** for development/staging

## Build Optimization

Your React app is automatically optimized during deployment:
- JavaScript bundled and minified
- CSS compressed
- Images optimized
- Static assets cached

Example output:
```
File sizes after gzip:
  86.43 kB  build/static/js/main.b0b633a7.js
  5.49 kB   build/static/css/main.b4462490.css
  1.77 kB   build/static/js/453.15b91c9b.chunk.js
```

## Security and Performance

Netlify automatically provides:
- HTTPS certificates
- Global CDN
- Form handling (if used)
- Redirect rules
- Header customization

## Next Steps

After successful deployment:
1. Test all app functionality on the live site
2. Share the URL with users
3. Monitor performance in Netlify dashboard
4. Set up custom domain if needed
5. Configure continuous deployment for future updates

## Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify CLI Documentation](https://cli.netlify.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Netlify Support](https://support.netlify.com/)

---

**Success!** Your AI Math Helper app is now deployed and accessible worldwide through Netlify's global CDN.