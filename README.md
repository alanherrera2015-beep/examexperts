# Netlify contact function (SendGrid + reCAPTCHA) & Product Sales (Stripe)

## What this adds

### Contact Form
- netlify/functions/contact.js — receives contact form POSTs and sends email using SendGrid (optional server-side reCAPTCHA verification).

### Product Sales (NEW)
- netlify/functions/create-checkout.js — handles product purchases via Stripe Checkout
- Products section on website with workbooks and course guides for sale
- Secure payment processing through Stripe

### Dependencies
- package.json — includes @sendgrid/mail and stripe dependencies for Netlify functions.
- netlify.toml — tells Netlify where functions live.

## Required environment variables

Set these in Netlify Site → Settings → Build & deploy → Environment:

### Contact Form Variables
- SENDGRID_API_KEY — your SendGrid API key (keep secret; do not commit it)
- FROM_EMAIL — verified SendGrid sender (e.g. examexpertscontact@gmail.com)
- TO_EMAIL — where messages will be delivered (e.g. examexpertscontact@gmail.com)
- RECAPTCHA_SECRET — optional; Google reCAPTCHA secret for server-side verification

### Product Sales Variables (NEW)
- STRIPE_SECRET_KEY — your Stripe secret key (keep secret; do not commit it)
  - Get this from https://dashboard.stripe.com/apikeys
  - Use test keys for development (starts with sk_test_)
  - Use live keys for production (starts with sk_live_)

Important: do NOT paste real secrets into public places. Use the Netlify UI to set these variables.

## Setting up Stripe for Product Sales

1. Create a Stripe account at https://stripe.com
2. Get your API keys from https://dashboard.stripe.com/apikeys
3. For testing:
   - Use test mode keys (starts with sk_test_)
   - Use test credit card: 4242 4242 4242 4242, any future expiry, any CVC
4. For production:
   - Switch to live mode and use live keys (starts with sk_live_)
   - Complete Stripe account setup and business verification
5. Set STRIPE_SECRET_KEY in Netlify environment variables

## Products Available

The website now includes a Products section with the following items for sale:

### Workbooks
- SAT Math Mastery Workbook - $49.99
- ACT Science Workbook - $44.99
- GRE Vocabulary Builder - $39.99

### Course Guides
- Complete SAT Prep Course Guide - $149.99 (Featured)
- MCAT Biology Course Guide - $129.99
- NCLEX Study Guide Bundle - $119.99

All products are configured in the Stripe checkout function and can be easily modified or expanded.

Frontend changes required
- Insert reCAPTCHA client snippet in index.html (replace the placeholder with your site key)
- Replace the contact form submit block in app.js so it POSTs to `/.netlify/functions/contact` and includes an optional `recaptchaToken`.

Quick local test (Netlify CLI)
1. Install dependencies:
   npm install

2. Install Netlify CLI (if needed):
   npm install -g netlify-cli

3. Start local dev:
   netlify dev
   - Function URL: http://localhost:8888/.netlify/functions/contact

Deploy from your machine (no git push required)
1. netlify login
2. netlify init (create a new site; you may skip linking to a Git repo)
3. Set env vars in Netlify UI or via CLI:
   netlify env:set SENDGRID_API_KEY <your_new_sendgrid_key>
   netlify env:set FROM_EMAIL examexpertscontact@gmail.com
   netlify env:set TO_EMAIL examexpertscontact@gmail.com
   netlify env:set RECAPTCHA_SECRET <your_recaptcha_secret>  # optional
4. Deploy:
   netlify deploy --prod --dir=./ --functions=netlify/functions

Test live
- Example curl:
  curl -X POST https://<your-site>.netlify.app/.netlify/functions/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"you@example.com","subject":"Hello","message":"Test message"}'

Security tips
- Rotate any API key that was exposed publicly.
- Use least-privilege API keys (mail send only).
- Verify FROM_EMAIL in SendGrid and configure domain auth (SPF/DKIM) for better deliverability.
