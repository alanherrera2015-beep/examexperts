# Netlify contact function (SendGrid + reCAPTCHA)

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
