// netlify/functions/send-confirmation.js
// Sends a branded confirmation email to the student and an admin notification
// after a successful Stripe checkout.

const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.TO_EMAIL;
const SENDGRID_DATA_RESIDENCY = process.env.SENDGRID_DATA_RESIDENCY;

if (SENDGRID_API_KEY) {
  if (!SENDGRID_API_KEY.startsWith('SG.')) {
    console.error('Invalid SENDGRID_API_KEY format: API key must start with "SG."');
  }
  sgMail.setApiKey(SENDGRID_API_KEY);
}

if (SENDGRID_DATA_RESIDENCY === 'eu') {
  sgMail.setDataResidency('eu');
}

const PLAN_LABELS = {
  'pay-as-you-go': 'Pay As You Go ($75/hr)',
  'four-hour-package': '4-Hour Package ($260 total)',
  'annual-member': 'Annual Membership ($100)',
  'trial': '$1 Trial Session'
};

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { Allow: 'POST' },
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    const body = JSON.parse(event.body || '{}');
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const subject = (body.subject || '').trim();
    const plan = (body.plan || '').trim();

    if (!name || !email || !plan) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address' }) };
    }

    if (!SENDGRID_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
      console.error('Missing SendGrid/env config');
      return { statusCode: 500, body: JSON.stringify({ error: 'Email service not configured' }) };
    }

    if (!SENDGRID_API_KEY.startsWith('SG.')) {
      console.error('Invalid SENDGRID_API_KEY: must start with "SG."');
      return { statusCode: 500, body: JSON.stringify({ error: 'Email service configuration error' }) };
    }

    const planLabel = PLAN_LABELS[plan] || plan;

    // ── Student confirmation email ──────────────────────────────────────────
    const studentHtml = `
<div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;">
  <div style="text-align:center;margin-bottom:24px;">
    <img src="https://examexperts.org/images/logo.png" alt="Exam Experts" style="height:60px;">
  </div>

  <div style="background:linear-gradient(135deg,#10B981,#059669);border-radius:16px;padding:32px 24px;text-align:center;color:#ffffff;margin-bottom:24px;">
    <div style="font-size:52px;margin-bottom:8px;">🎉</div>
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;">You're In, ${escapeHtml(name)}!</h1>
    <p style="margin:0;font-size:16px;opacity:0.9;">Your Exam Experts session is confirmed.</p>
  </div>

  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
    <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#065f46;">✅ Payment Confirmed</h2>
    <p style="margin:0 0 8px;color:#374151;"><strong>Plan:</strong> ${escapeHtml(planLabel)}</p>
    ${subject ? `<p style="margin:0 0 8px;color:#374151;"><strong>Focus:</strong> ${escapeHtml(subject)}</p>` : ''}
    ${phone ? `<p style="margin:0;color:#374151;"><strong>Phone on file:</strong> ${escapeHtml(phone)}</p>` : ''}
  </div>

  <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
    <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#1e40af;">📋 What Happens Next</h2>
    <ol style="margin:0;padding-left:20px;color:#374151;line-height:1.8;font-size:15px;">
      <li>Our team will reach out within <strong>24 hours</strong> to schedule your first session.</li>
      <li>We'll match you with the right tutor for your subject.</li>
      <li>You'll receive a calendar invite with Zoom or in-person session details.</li>
    </ol>
  </div>

  <div style="text-align:center;margin-bottom:24px;">
    <p style="color:#374151;margin:0 0 16px;font-size:15px;">Have questions in the meantime?</p>
    <a href="tel:2815415928" style="display:inline-block;background:linear-gradient(135deg,#8B5CF6,#EC4899);color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:50px;font-weight:700;font-size:15px;margin:0 6px 8px;">📞 Call 281-541-5928</a>
    <a href="mailto:examexpertscontact@gmail.com" style="display:inline-block;background:#f3f4f6;color:#374151;text-decoration:none;padding:14px 28px;border-radius:50px;font-weight:600;font-size:15px;margin:0 6px 8px;">✉️ Email Us</a>
  </div>

  <div style="text-align:center;color:#9ca3af;font-size:12px;border-top:1px solid #e5e7eb;padding-top:16px;">
    <p style="margin:0;">Exam Experts · Houston, TX · examexpertscontact@gmail.com · 281-541-5928</p>
    <p style="margin:4px 0 0;">© 2025–2026 Exam Experts. All rights reserved.</p>
  </div>
</div>
    `;

    const studentText = [
      `Hi ${name},`,
      '',
      `Your Exam Experts session is confirmed!`,
      '',
      `Plan: ${planLabel}`,
      subject ? `Focus: ${subject}` : '',
      phone ? `Phone on file: ${phone}` : '',
      '',
      'What happens next:',
      '1. Our team will reach out within 24 hours to schedule your first session.',
      '2. We\'ll match you with the right tutor for your subject.',
      '3. You\'ll receive a calendar invite with Zoom or in-person session details.',
      '',
      'Questions? Call 281-541-5928 or email examexpertscontact@gmail.com',
      '',
      'Exam Experts Team'
    ].filter(line => line !== null).join('\n');

    // ── Admin notification email ────────────────────────────────────────────
    const adminHtml = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="color:#065f46;">New Stripe Checkout Completed 🎉</h2>
  <table style="border-collapse:collapse;width:100%;">
    <tr><td style="padding:8px 0;font-weight:bold;width:120px;">Name:</td><td>${escapeHtml(name)}</td></tr>
    <tr><td style="padding:8px 0;font-weight:bold;">Email:</td><td>${escapeHtml(email)}</td></tr>
    ${phone ? `<tr><td style="padding:8px 0;font-weight:bold;">Phone:</td><td>${escapeHtml(phone)}</td></tr>` : ''}
    <tr><td style="padding:8px 0;font-weight:bold;">Plan:</td><td>${escapeHtml(planLabel)}</td></tr>
    ${subject ? `<tr><td style="padding:8px 0;font-weight:bold;">Focus:</td><td>${escapeHtml(subject)}</td></tr>` : ''}
  </table>
  <p style="margin-top:20px;color:#6b7280;font-size:13px;">Sent automatically by the Exam Experts website.</p>
</div>
    `;

    const adminText = [
      'New Stripe checkout completed.',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      `Plan: ${planLabel}`,
      subject ? `Focus: ${subject}` : ''
    ].filter(line => line !== null).join('\n');

    const messages = [
      {
        to: email,
        from: FROM_EMAIL,
        subject: `You're confirmed! ${planLabel} — Exam Experts`,
        text: studentText,
        html: studentHtml
      },
      {
        to: TO_EMAIL,
        from: FROM_EMAIL,
        subject: `New Checkout: ${name} — ${planLabel}`,
        text: adminText,
        html: adminHtml
      }
    ];

    await Promise.all(messages.map(msg => sgMail.send(msg)));
    console.log('Confirmation emails sent for', email);

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('send-confirmation error:', err);
    if (err.response) {
      console.error('SendGrid response status:', err.response.statusCode);
      console.error('SendGrid response body:', JSON.stringify(err.response.body));
    }
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send confirmation email' }) };
  }
};

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
