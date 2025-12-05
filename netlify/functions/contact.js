// netlify/functions/contact.js
// Netlify Function: contact form -> SendGrid
// Place at: netlify/functions/contact.js

const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL; // e.g. examexpertscontact@gmail.com
const TO_EMAIL = process.env.TO_EMAIL;     // e.g. examexpertscontact@gmail.com
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET; // optional

if (SENDGRID_API_KEY) sgMail.setApiKey(SENDGRID_API_KEY);

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { Allow: 'POST' },
        body: JSON.stringify({ success: false, error: 'Method Not Allowed' })
      };
    }

    const body = JSON.parse(event.body || '{}');
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const subject = (body.subject || '').trim();
    const message = (body.message || '').trim();
    const recaptchaToken = body.recaptchaToken || '';

    if (!name || !email || !subject || !message) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing required fields' }) };
    }

    // Optional: reCAPTCHA verification
    if (RECAPTCHA_SECRET) {
      if (!recaptchaToken) {
        return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing reCAPTCHA token' }) };
      }

      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(recaptchaToken)}`
      });
      const verifyJson = await verifyRes.json();

      // For reCAPTCHA v3 you may wish to check score >= 0.4; adjust as needed.
      if (!verifyJson.success || (verifyJson.score !== undefined && verifyJson.score < 0.4)) {
        return { statusCode: 403, body: JSON.stringify({ success: false, error: 'reCAPTCHA verification failed' }) };
      }
    }

    if (!SENDGRID_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
      console.error('Missing SendGrid/env config');
      return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Email service not configured' }) };
    }

    const emailHtml = `
      <p>You received a new message from your contact form.</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr/>
      <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `;

    const msg = {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      replyTo: email,
      subject: `Contact form: ${subject} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: emailHtml
    };

    await sgMail.send(msg);

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Contact function error:', err);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Internal server error' }) };
  }
};

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
