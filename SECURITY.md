# 🔒 Security Documentation

## Environment Variables Setup

This project uses environment variables to securely store sensitive credentials like EmailJS API keys.

### Files Overview

- **`.env`** - Contains your actual credentials (NEVER commit to Git)
- **`.env.example`** - Template file showing required variables (safe to commit)
- **`.gitignore`** - Ensures `.env` is not tracked by Git

### Required Environment Variables

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Setup Instructions

1. **Copy the example file:**
   ```powershell
   Copy-Item .env.example .env
   ```

2. **Get your EmailJS credentials:**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up / Log in
   - Navigate to Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Copy the **Service ID**

3. **Create an email template:**
   - Go to Email Templates → Create New Template
   - Design your template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Copy the **Template ID**

4. **Get your Public Key:**
   - Go to Account → API Keys
   - Copy your **Public Key**

5. **Update `.env` file:**
   ```env
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

### Usage in Code

The Contact component uses environment variables like this:

```javascript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
```

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client.

### Security Best Practices

✅ **DO:**
- Keep `.env` in `.gitignore`
- Use `.env.example` as a template for other developers
- Rotate API keys if they're accidentally exposed
- Use different keys for development and production

❌ **DON'T:**
- Commit `.env` file to Git
- Share your `.env` file publicly
- Hardcode credentials in source code
- Use production keys in development

### Checking if Environment Variables are Set

The code includes validation:

```javascript
if (!serviceId || !templateId || !publicKey) {
  setError('Email service is not configured. Please contact me directly.')
  setSending(false)
  return
}
```

This ensures the form gracefully handles missing configuration.

### Deployment

When deploying to hosting services (Vercel, Netlify, etc.):

1. Add environment variables in the hosting platform's dashboard
2. Use the same variable names (`VITE_EMAILJS_SERVICE_ID`, etc.)
3. Never include `.env` in your deployment

### Troubleshooting

**Problem:** Contact form shows "Email service is not configured"

**Solution:**
1. Check if `.env` file exists in project root
2. Verify variable names match exactly (case-sensitive)
3. Restart development server after changing `.env`
4. Check for typos in variable values

**Problem:** Environment variables not loading

**Solution:**
```powershell
# Stop the dev server (Ctrl+C)
# Restart it
npm run dev
```

### Emergency: Credentials Exposed

If you accidentally commit credentials to Git:

1. **Immediately rotate your EmailJS keys:**
   - Delete the exposed service
   - Create a new service with new credentials
   - Update `.env` with new keys

2. **Remove from Git history:**
   ```powershell
   # This is complex - consider making repo private or creating new repo
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **Force push (⚠️ Warning: rewrites history):**
   ```powershell
   git push origin --force --all
   ```

### Additional Security Measures

1. **Rate Limiting:** EmailJS has built-in rate limiting
2. **Email Validation:** Form includes basic email validation
3. **Error Handling:** Sensitive error details not exposed to users
4. **HTTPS Only:** Always deploy with HTTPS enabled

---

**Last Updated:** October 21, 2025  
**Reviewed By:** Security Best Practices Team
