# 🚀 Quick Setup Guide

## Get Started in 3 Steps!

### 1️⃣ Install Dependencies
Open PowerShell in the project folder and run:
```powershell
npm install
```

### 2️⃣ Start Development Server
```powershell
npm run dev
```
Visit: http://localhost:3000

### 3️⃣ Customize Your Portfolio

#### ✏️ Update Your Information:

**About Section** (`src/components/About/About.jsx`):
- Line 52: Replace `[Your Name]` with your name

**Skills Section** (`src/components/Skills/Skills.jsx`):
- Lines 8-48: Update the `skillsData` array with your skills

**Projects Section** (`src/components/Projects/Projects.jsx`):
- Lines 8-63: Update the `projectsData` array with your projects
- Replace image URLs with your own screenshots

**Contact Section** (`src/components/Contact/Contact.jsx`):
- Line 94: Update email address
- Line 101: Update phone number
- Line 108: Update location
- Lines 120-175: Update social media links

---

## 🎨 Customization Tips

### Change Colors
Edit `src/index.css` (lines 7-14) to change the magical color palette.

### Add Your Projects
1. Take screenshots of your work
2. Upload to [Imgur](https://imgur.com/) or use [Unsplash](https://unsplash.com/)
3. Update the `projectsData` array in `src/components/Projects/Projects.jsx`

### Modify Skills
Update the skills array with your tools:
```javascript
{ name: "Blender", level: 95, color: "#FF92DC" }
```
- `name`: Tool/skill name
- `level`: 0-100 proficiency
- `color`: Any hex color

---

## 📤 Deploy Your Portfolio

### Option 1: Vercel (Easiest)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Done! ✨

### Option 2: GitHub Pages
1. Update `vite.config.js` line 6:
   ```javascript
   base: '/your-repo-name/'
   ```
2. Run:
   ```powershell
   npm run build
   npm run deploy
   ```

### Option 3: Netlify
1. Build:
   ```powershell
   npm run build
   ```
2. Drag `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

## 🆘 Need Help?

**Common Issues:**

**"Module not found"**
```powershell
rm -r node_modules
npm install
```

**"Port already in use"**
```powershell
# Edit vite.config.js and change port to 3001
```

**Slow performance**
- Reduce particle counts in Scene files
- Lower `count` prop in `<Sparkles />` components

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. ✅ Update personal information
4. ✅ Add your projects
5. ✅ Customize colors/theme
6. ✅ Deploy online
7. ✅ Share with the world!

**You're all set! Happy coding! 🌟**
