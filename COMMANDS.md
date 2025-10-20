# 🎮 Development Commands Cheat Sheet

## Essential Commands

### Install Dependencies
```powershell
npm install
```

### Start Development Server
```powershell
npm run dev
```
- Opens at `http://localhost:3000`
- Hot reload enabled
- Press `Ctrl+C` to stop

### Build for Production
```powershell
npm run build
```
- Creates optimized build in `dist/` folder
- Minified and compressed
- Ready for deployment

### Preview Production Build
```powershell
npm run preview
```
- Test production build locally
- Runs on `http://localhost:4173`

### Deploy to GitHub Pages
```powershell
npm run deploy
```
- Builds and deploys to gh-pages branch
- Make sure to update `base` in vite.config.js first

---

## Useful Development Tips

### Clear Cache & Reinstall
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### Check for Updates
```powershell
npm outdated
```

### Update All Packages
```powershell
npm update
```

### Install Specific Package
```powershell
npm install package-name
npm install package-name@version
```

### Uninstall Package
```powershell
npm uninstall package-name
```

---

## Git Commands (for version control)

### Initialize Git Repository
```powershell
git init
git add .
git commit -m "Initial commit: Magic Portfolio"
```

### Create GitHub Repository
```powershell
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Update Repository
```powershell
git add .
git commit -m "Update: description of changes"
git push
```

---

## Debugging

### Check Node Version
```powershell
node --version
npm --version
```
Requirements: Node 16+ and npm 7+

### View All Installed Packages
```powershell
npm list
```

### Clear npm Cache
```powershell
npm cache clean --force
```

### Run with Debug Info
```powershell
npm run dev -- --debug
npm run build -- --debug
```

---

## Performance Testing

### Analyze Bundle Size
```powershell
npm run build
# Check dist/ folder size
```

### Check for Unused Dependencies
```powershell
npm prune
```

---

## Environment Variables

Create `.env` file in root:
```
VITE_API_URL=https://your-api.com
VITE_GA_ID=your-google-analytics-id
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Quick Fixes

**Problem: "EACCES: permission denied"**
```powershell
# Run as administrator or:
npm config set prefix ~/.npm-global
```

**Problem: Port 3000 in use**
Edit `vite.config.js`:
```javascript
server: {
  port: 3001 // or any other port
}
```

**Problem: Module not found**
```powershell
npm install
```

**Problem: Old version cached**
```powershell
# Clear browser cache
# Or hard refresh: Ctrl+Shift+R
```

---

## Keyboard Shortcuts (VS Code)

- `Ctrl + ` ` - Open terminal
- `Ctrl + Shift + P` - Command palette
- `Ctrl + P` - Quick file search
- `Ctrl + /` - Toggle comment
- `Alt + Shift + F` - Format document
- `F5` - Start debugging

---

## Helpful npm Scripts You Can Add

Add these to `package.json` under `"scripts"`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist",
  "clean": "rm -rf node_modules dist",
  "fresh": "npm run clean && npm install",
  "check": "npm outdated",
  "format": "prettier --write \"src/**/*.{js,jsx,css}\""
}
```

---

**Happy Developing! 🚀✨**
