# ⚡ Cloudflare Pages - Quick Deploy Card

## 🎯 YOUR SETUP INFO

### Repository:
```
GitHub: https://github.com/danu-mw/danu-s-portfolio
Branch: master
Framework: React + Vite
```

### Build Configuration:
```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
```

### Environment Variables (Copy These!):
```
VITE_EMAILJS_SERVICE_ID=service_0055iu
VITE_EMAILJS_TEMPLATE_ID=template_72vsqv7
VITE_EMAILJS_PUBLIC_KEY=N97w_YfvEQpPJUBPU
```

---

## 📋 DEPLOYMENT CHECKLIST

### Step 1: Create Account
- [ ] Go to: https://dash.cloudflare.com/sign-up
- [ ] Sign up (use GitHub sign-in for faster setup)
- [ ] Verify email

### Step 2: Create Pages Project
- [ ] Click "Workers & Pages" in sidebar
- [ ] Click "Create application"
- [ ] Select "Pages" tab
- [ ] Click "Connect to Git"

### Step 3: Connect GitHub
- [ ] Click "Connect GitHub"
- [ ] Authorize Cloudflare Pages
- [ ] Select repository: "danu-s-portfolio"
- [ ] Click "Begin setup"

### Step 4: Configure Build
```
Project name: danu-portfolio (or your choice)
Production branch: master
Framework: Vite
Build command: npm run build
Output directory: dist
```

### Step 5: Add Environment Variables
Add these THREE variables:

**Variable 1:**
```
Name: VITE_EMAILJS_SERVICE_ID
Value: service_0055iu
✅ Production
✅ Preview
```

**Variable 2:**
```
Name: VITE_EMAILJS_TEMPLATE_ID
Value: template_72vsqv7
✅ Production
✅ Preview
```

**Variable 3:**
```
Name: VITE_EMAILJS_PUBLIC_KEY
Value: N97w_YfvEQpPJUBPU
✅ Production
✅ Preview
```

### Step 6: Deploy
- [ ] Click "Save and Deploy"
- [ ] Wait 2-3 minutes for build
- [ ] Get your live URL!

---

## 🎉 AFTER DEPLOYMENT

### Your Live URL:
```
https://danu-portfolio.pages.dev
(or whatever project name you chose)
```

### Test Your Site:
- [ ] Hero section with 3D
- [ ] All sections scroll
- [ ] Skills carousel
- [ ] Projects display
- [ ] Testimonials show
- [ ] **Contact form works** (send test email!)
- [ ] Social links work
- [ ] Mobile responsive

### Update README:
```powershell
# Edit README.md
# Add your live URL

git add README.md
git commit -m "docs: add Cloudflare Pages URL"
git push
```

---

## 🔄 FUTURE UPDATES

Every time you push to GitHub:
```powershell
git add .
git commit -m "your changes"
git push
```

✨ **Cloudflare auto-deploys in 2-3 minutes!**

---

## 🌐 START DEPLOYMENT

**👉 CLICK HERE:** https://dash.cloudflare.com/sign-up

Then follow the checklist above!

---

## 💡 QUICK TIPS

**Build fails?**
- Test locally first: `npm run build`
- Check Node version: `node --version` (need 18+)

**Contact form not working?**
- Double-check environment variable names
- Must start with `VITE_`
- Apply to both Production and Preview

**Need help?**
- See: `CLOUDFLARE_DEPLOYMENT.md` for detailed guide
- Cloudflare Docs: https://developers.cloudflare.com/pages/

---

**Time to go live: ~10 minutes! 🚀**

*Keep this file open while deploying!*
