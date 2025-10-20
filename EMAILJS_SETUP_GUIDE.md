# EmailJS Setup Guide for Contact Form

Your contact form is now configured to use EmailJS! Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's FREE for up to 200 emails/month)
3. Sign up with your email or Google account

## Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended):
   - Select **Gmail**
   - Click **"Connect Account"**
   - Sign in with **danu7mw@gmail.com**
   - Allow EmailJS to access your Gmail
4. Give your service a name (e.g., "Portfolio Contact")
5. Copy the **Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Use this template structure:

**Subject:** 
```
New Portfolio Message from {{name}}
```

**Body:**
```
You have received a new message from your portfolio!

From: {{name}}
Email: {{email}}

Message:
{{message}}

---
Sent via Portfolio Contact Form
```

4. Click **"Save"**
5. Copy the **Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **"Account"** → **"General"** tab
2. Find your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxx`)
3. Copy it

## Step 5: Update Your Code

Open `src/components/Contact/Contact.jsx` and replace these lines (around line 33-35):

```javascript
const serviceId = 'YOUR_SERVICE_ID'      // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID'    // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY'      // Replace with your Public Key
```

**Example:**
```javascript
const serviceId = 'service_abc123'
const templateId = 'template_xyz789'
const publicKey = 'aBcDeFgHiJkLmNoPqRsTuV'
```

## Step 6: Test It!

1. Save the file
2. Go to your portfolio's contact section
3. Fill out the form and click "Send Message"
4. Check your email at **danu7mw@gmail.com** - you should receive the message!

## Troubleshooting

### Not receiving emails?
- Check your EmailJS dashboard for failed sends
- Verify all IDs are correct (no typos)
- Check Gmail spam folder
- Make sure you're connected to the internet

### "Failed to send" error?
- Double-check your Public Key
- Ensure Service and Template IDs match exactly
- Check browser console (F12) for detailed error messages

## Email Limits

**Free Plan:**
- 200 emails per month
- Perfect for a portfolio!

If you need more, EmailJS has paid plans starting at $7/month for 1000 emails.

## Security Note

Your Public Key is safe to be in the code - it's meant to be public. EmailJS handles the actual email sending securely on their servers.

---

**Need Help?** 
- EmailJS Docs: https://www.emailjs.com/docs/
- Contact me if you have issues setting this up!

✨ Once configured, visitors can email you directly from your portfolio! ✨
