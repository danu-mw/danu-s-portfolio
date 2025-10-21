# 📧 EmailJS Contact Form Troubleshooting

**Issue:** Contact form showing "Email service is not configured" error  
**Platform:** Cloudflare Pages  
**Status:** Environment variables need to be configured

---

## 🔧 Quick Fix (5 minutes)

### **Step 1: Access Cloudflare Dashboard**

1. Go to: **https://dash.cloudflare.com/**
2. Click **"Workers & Pages"** (left sidebar)
3. Find and click: **"danu-portfolio"**

---

### **Step 2: Add Environment Variables**

1. Click the **"Settings"** tab
2. Scroll down to **"Environment variables"** section
3. Click **"Add variable"** button

---

### **Step 3: Add These 3 Variables**

**Copy and paste these exactly:**

#### Variable 1:
```
Variable name: VITE_EMAILJS_SERVICE_ID
Value: service_0055iu
```
☑️ Check: **Production**  
☑️ Check: **Preview** (optional)

Click **"Save"**

---

#### Variable 2:
```
Variable name: VITE_EMAILJS_TEMPLATE_ID
Value: template_72vsqv7
```
☑️ Check: **Production**  
☑️ Check: **Preview** (optional)

Click **"Save"**

---

#### Variable 3:
```
Variable name: VITE_EMAILJS_PUBLIC_KEY
Value: N97w_YfvEQpPJUBPU
```
☑️ Check: **Production**  
☑️ Check: **Preview** (optional)

Click **"Save"**

---

### **Step 4: Redeploy Your Site**

After adding all 3 variables, you need to trigger a rebuild:

**Option A: Via Dashboard (Fastest)**
1. Go to **"Deployments"** tab
2. Find the latest deployment (top of list)
3. Click the **three dots (•••)** on the right side
4. Select **"Retry deployment"**
5. Wait 2-3 minutes for rebuild

**Option B: Via Git Push**
```powershell
cd "c:\danu's portfolio"

# Make a small change to trigger rebuild
git commit --allow-empty -m "fix: trigger redeploy for environment variables"
git push

# Cloudflare will automatically rebuild in 2-3 minutes
```

---

## ✅ Verify the Fix

1. Wait for deployment to complete (~2-3 minutes)
2. Visit: **https://danu-portfolio.pages.dev/**
3. Scroll to Contact section
4. Fill out the form
5. Click Submit
6. Should see: **"✨ Message sent successfully!"**
7. Check your email inbox!

---

## 🔍 How to Check If Variables Are Set

### In Cloudflare Dashboard:

1. Go to your project → **Settings**
2. Scroll to **"Environment variables"**
3. You should see:
   ```
   VITE_EMAILJS_SERVICE_ID     Production
   VITE_EMAILJS_TEMPLATE_ID    Production
   VITE_EMAILJS_PUBLIC_KEY     Production
   ```

### Check Browser Console:

1. Visit your live site
2. Open DevTools (F12)
3. Go to Console tab
4. Type:
   ```javascript
   console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID)
   ```
5. Should show: `service_0055iu` (not undefined!)

---

## 🐛 Common Issues & Solutions

### Issue 1: "Email service is not configured"
**Cause:** Environment variables not set in Cloudflare  
**Solution:** Follow Step 2 & 3 above to add variables

---

### Issue 2: Variables set but still not working
**Cause:** Site not rebuilt after adding variables  
**Solution:** Trigger redeploy (Step 4)

---

### Issue 3: Shows undefined in console
**Cause:** Variable names don't match exactly  
**Solution:** 
- Must start with `VITE_`
- Must match exactly: `VITE_EMAILJS_SERVICE_ID` (not `EMAILJS_SERVICE_ID`)
- Check for typos

---

### Issue 4: "Failed to send message"
**Possible Causes:**
1. EmailJS service inactive
2. Template deleted
3. Public key invalid
4. Network issues

**Solutions:**
1. Login to EmailJS: https://dashboard.emailjs.com/
2. Check service status
3. Verify template exists
4. Test with different network

---

## 📋 Environment Variables Checklist

Before redeploying, verify:

- [ ] All 3 variables added to Cloudflare
- [ ] Names start with `VITE_`
- [ ] Names match exactly (case-sensitive)
- [ ] Values copied correctly (no extra spaces)
- [ ] "Production" is checked for each variable
- [ ] Clicked "Save" after each variable

---

## 🎯 Quick Verification Script

Run this locally to confirm your .env values:

```powershell
cd "c:\danu's portfolio"
Get-Content .env
```

Should show:
```
VITE_EMAILJS_SERVICE_ID=service_0055iu
VITE_EMAILJS_TEMPLATE_ID=template_72vsqv7
VITE_EMAILJS_PUBLIC_KEY=N97w_YfvEQpPJUBPU
```

These are the exact values to add in Cloudflare!

---

## 🔒 Security Note

**Why use environment variables?**
- Keeps API keys secure
- Not exposed in client code
- Can be changed without code updates
- Different values for dev/production

**Safe to commit:** `.env.example` ✅  
**NEVER commit:** `.env` ❌ (already in .gitignore)

---

## 📞 Alternative Contact Methods

If EmailJS still doesn't work, add backup contact options:

1. **Direct Email Link:**
   ```html
   <a href="mailto:your@email.com">Email Me</a>
   ```

2. **Social Media:**
   - LinkedIn messaging
   - Twitter DMs
   - Instagram DMs

3. **External Form:**
   - Google Forms
   - Typeform
   - Formspree

---

## ✨ After Fix is Complete

Once working, you should see:

✅ Form submits without errors  
✅ Success message displays  
✅ Email arrives in your inbox  
✅ Form fields reset  
✅ No console errors

---

## 🆘 Still Having Issues?

### Check Build Logs:

1. Cloudflare Dashboard → Deployments
2. Click on latest deployment
3. View build logs
4. Look for errors related to environment variables

### Test Locally First:

```powershell
cd "c:\danu's portfolio"
npm run dev
```

Visit: http://localhost:5173  
Test contact form locally

If works locally but not on Cloudflare:
→ Environment variables are definitely the issue!

---

## 📖 Reference

**Your Values:**
- Service ID: `service_0055iu`
- Template ID: `template_72vsqv7`
- Public Key: `N97w_YfvEQpPJUBPU`

**EmailJS Dashboard:**
https://dashboard.emailjs.com/

**Cloudflare Dashboard:**
https://dash.cloudflare.com/

---

## ✅ Success Criteria

Form is working when:
1. No error messages appear
2. Submit button shows "Sending..."
3. Success message displays
4. You receive email within 30 seconds
5. Form clears after submission

---

**Need Help?** Check the contact form code in:  
`src/components/Contact/Contact.jsx`

**Environment Setup:**  
`.env` file in project root

**Deployment Config:**  
Cloudflare Pages → Settings → Environment variables

---

*Last updated: October 21, 2025*  
*Issue: Environment variables not configured in Cloudflare*  
*Fix time: ~5 minutes + 2-3 minute rebuild*
