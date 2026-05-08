# Netlify contact function (SendGrid + reCAPTCHA)

## Google Search Console setup

To make the site appear in Google search results, verify ownership in Google Search Console:

1. Go to [Google Search Console](https://search.google.com/search-console/welcome) and add `https://examexperts.org` as a property.
2. Choose the **HTML tag** verification method and copy the verification `content` value.
3. Add the meta tag to the `<head>` of `index.html` (and optionally all other pages):
   ```html
   <meta name="google-site-verification" content="PASTE_YOUR_CODE_HERE">
   ```
4. Deploy the change to Netlify, then click **Verify** in Google Search Console.
5. After verification, go to **Sitemaps** and submit `https://examexperts.org/sitemap.xml`.
6. Use the **URL Inspection** tool to request indexing for the homepage and key pages.

> **Note:** Google indexing can take anywhere from a few days to a few weeks for a new site. You can use the URL Inspection tool to check indexing status.

What this adds
- netlify/functions/contact.js — receives contact form POSTs and sends email using SendGrid (optional server-side reCAPTCHA verification).
- package.json — includes @sendgrid/mail dependency for Netlify functions.
- netlify.toml — tells Netlify where functions live.

Required environment variables (set these in Netlify Site → Settings → Build & deploy → Environment)
- SENDGRID_API_KEY — your SendGrid API key (keep secret; do not commit it)
- FROM_EMAIL — verified SendGrid sender (e.g. examexpertscontact@gmail.com)
- TO_EMAIL — where messages will be delivered (e.g. examexpertscontact@gmail.com)
- RECAPTCHA_SECRET — optional; Google reCAPTCHA secret for server-side verification

Important: do NOT paste real secrets into public places. Use the Netlify UI to set these variables.

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

## Stripe payment confirmation webhook (go-live)

A new Netlify Function is available at:
- `/.netlify/functions/stripe-webhook`

It enforces the Exam Experts payment confirmation flow:
1. Verifies Stripe webhook signatures.
2. Handles `checkout.session.completed` (one-time) and `invoice.payment_succeeded` (subscription).
3. Upserts the student contact in GoHighLevel (email first, phone fallback).
4. Applies payment/nursing/subscription tags.
5. Sends branded Exam Experts payment confirmation email + SMS.
6. Logs Stripe event IDs as a contact tag (`stripe-event:<event_id>`) to prevent duplicate processing.

### Required environment variables

Stripe:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

GoHighLevel (contact lookup/update/create + SMS):
- `GHL_API_KEY`
- `GHL_LOCATION_ID`
- `GHL_API_BASE_URL` (optional, default `https://services.leadconnectorhq.com`)
- `GHL_API_VERSION` (optional, default `2023-02-21`)
- `GHL_MESSAGE_API_BASE_URL` (optional, default `https://rest.gohighlevel.com`)

Email (student payment confirmation):
- `SENDGRID_API_KEY`
- `PAYMENT_CONFIRMATION_FROM_EMAIL` (or fallback to `FROM_EMAIL`)

Branding/support details (optional):
- `SUPPORT_EMAIL` (default `examexpertscontact@gmail.com`)
- `SUPPORT_PHONE` (default `281-541-5928`)

Optional tag overrides:
- `TAG_PAID_PACKAGE` (default `paid package`)
- `TAG_NURSING_EXAM` (default `nursing exam`)
- `TAG_SUBSCRIPTION_MEMBER` (default `subscription member`)
- `TAG_PAYMENT_CONFIRMED` (default `payment confirmed`)

### Stripe webhook settings

In Stripe Dashboard → Developers → Webhooks:
- Endpoint URL: `https://<your-domain>/.netlify/functions/stripe-webhook`
- Events:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`

Copy the webhook signing secret into Netlify as `STRIPE_WEBHOOK_SECRET`.
