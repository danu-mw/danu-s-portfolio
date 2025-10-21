# Cloudflare Environment Variables Fix

This file triggers a rebuild to apply environment variables.

## ✅ Environment Variables

These must be set in **Cloudflare Dashboard → Settings → Environment Variables**:

```
VITE_EMAILJS_SERVICE_ID = service_0055iu
VITE_EMAILJS_TEMPLATE_ID = template_72vsqv7
VITE_EMAILJS_PUBLIC_KEY = N97w_YfvEQpPJUBPU
```

## 🔧 Common Issues & Solutions

### Issue 1: Variables not taking effect
**Cause:** Cloudflare cached the old build without variables.
**Solution:** 
1. Add/update variables in dashboard
2. Push a new commit (this file does that!)
3. Wait for rebuild (2-3 minutes)

### Issue 2: "Email service is not configured"
**Cause:** Variable names don't match exactly.
**Solution:** 
- Must be EXACT: `VITE_EMAILJS_SERVICE_ID` (not `EMAILJS_SERVICE_ID`)
- Must have `VITE_` prefix
- Check spelling and case

### Issue 3: Variables set but still not working
**Cause:** "Production" environment not checked.
**Solution:**
1. Go to Cloudflare Dashboard
2. Settings → Environment Variables
3. For each variable, check ✅ "Production"
4. Click Save
5. Trigger redeploy

### Issue 4: Works on Vercel but not Cloudflare
**Cause:** Different environment variable handling.
**Solution:**
- Vercel: Automatically applies on next deployment
- Cloudflare: Needs explicit rebuild after adding variables

## 🚀 How to Force Rebuild

### Method 1: Via Dashboard (Recommended)
1. Go to: https://dash.cloudflare.com/
2. Workers & Pages → danu-portfolio
3. Deployments tab
4. Click ••• on latest deployment
5. Click "Retry deployment"

### Method 2: Via Git Push (What we're doing)
```bash
# Make a small change (this file)
git add .
git commit -m "fix: trigger Cloudflare rebuild for env vars"
git push
# Cloudflare auto-deploys in 2-3 minutes
```

## 📋 Verification Steps

After rebuild completes:

1. **Visit:** https://danu-portfolio.pages.dev/
2. **Go to Contact section**
3. **Fill out form**
4. **Click Submit**
5. **Should see:** "✨ Message sent successfully!"
6. **Check email inbox**

## 🔍 Debug in Browser

Open browser console (F12) on your Cloudflare site:

```javascript
// Check if variables are loaded:
console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID)
console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID)
console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
```

**Should show:**
```
Service ID: service_0055iu
Template ID: template_72vsqv7
Public Key: N97w_YfvEQpPJUBPU
```

**If shows `undefined`:**
- Variables not set correctly in Cloudflare
- Need to re-add with exact names
- Must check "Production" environment

## ⚠️ Important Notes

### Cloudflare vs Vercel Differences:

**Vercel:**
- Applies env vars immediately on next deploy
- Easier to configure
- Variables persist across branches

**Cloudflare:**
- Requires rebuild after adding variables
- Must explicitly check "Production"
- More manual but still works great!

### Why Vercel Works but Cloudflare Doesn't:

1. **Timing:** You may have set Vercel vars before first deploy
2. **Cache:** Cloudflare may have cached old build
3. **Environment:** Must check "Production" in Cloudflare

## ✅ Final Checklist

Before expecting it to work:

- [ ] Variables added in Cloudflare dashboard
- [ ] Exact names: `VITE_EMAILJS_SERVICE_ID`, etc.
- [ ] "Production" checked for all 3 variables
- [ ] Values copied correctly (no spaces)
- [ ] Clicked "Save" for each variable
- [ ] Triggered a new deployment (via dashboard or git push)
- [ ] Waited 2-3 minutes for build
- [ ] Cleared browser cache
- [ ] Tested contact form

## 🎯 Expected Timeline

1. **Now:** Committing this file
2. **+1 minute:** Cloudflare detects change
3. **+2-3 minutes:** Build completes
4. **+3-4 minutes:** Available globally
5. **+5 minutes:** Test contact form → Should work!

---

**This file created:** October 21, 2025  
**Purpose:** Trigger Cloudflare rebuild to apply environment variables  
**Status:** Push this commit to trigger rebuild
