const Stripe = require('stripe');
const sgMail = require('@sendgrid/mail');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.PAYMENT_CONFIRMATION_FROM_EMAIL || process.env.FROM_EMAIL || '';
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'examexpertscontact@gmail.com';
const SUPPORT_PHONE = process.env.SUPPORT_PHONE || '281-541-5928';

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_API_BASE_URL = (process.env.GHL_API_BASE_URL || 'https://services.leadconnectorhq.com').replace(/\/+$/, '');
const GHL_API_VERSION = process.env.GHL_API_VERSION || '2023-02-21';
const GHL_MESSAGE_API_BASE_URL = (process.env.GHL_MESSAGE_API_BASE_URL || 'https://rest.gohighlevel.com').replace(/\/+$/, '');

const TAG_PAID_PACKAGE = process.env.TAG_PAID_PACKAGE || 'paid package';
const TAG_NURSING_EXAM = process.env.TAG_NURSING_EXAM || 'nursing exam';
const TAG_SUBSCRIPTION_MEMBER = process.env.TAG_SUBSCRIPTION_MEMBER || 'subscription member';
const TAG_PAYMENT_CONFIRMED = process.env.TAG_PAYMENT_CONFIRMED || 'payment confirmed';

const processedEventIds = new Set();

if (SENDGRID_API_KEY && SENDGRID_API_KEY.startsWith('SG.')) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const PLAN_NAMES = {
  'pay-as-you-go': 'Pay As You Go',
  'four-hour-package': '4-Hour Package',
  'annual-member': 'Annual Member Rate'
};

exports.handler = async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { Allow: 'POST' },
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    if (!stripe || !STRIPE_WEBHOOK_SECRET) {
      console.error('Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Stripe webhook is not configured.' })
      };
    }

    const signature = getHeader(event.headers, 'stripe-signature');
    if (!signature) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing Stripe signature.' }) };
    }

    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || '', 'base64').toString('utf8')
      : (event.body || '');

    const stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);

    if (!isHandledStripeEvent(stripeEvent.type)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ received: true, ignored: true, eventType: stripeEvent.type })
      };
    }

    if (processedEventIds.has(stripeEvent.id)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ received: true, duplicate: true, eventId: stripeEvent.id })
      };
    }

    const payment = await buildPaymentPayload(stripeEvent);
    if (!payment.email && !payment.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Unable to identify student (missing email and phone).' })
      };
    }

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing GoHighLevel configuration (GHL_API_KEY/GHL_LOCATION_ID).' })
      };
    }

    const contactResult = await upsertStudentContact(payment, stripeEvent.id);
    if (contactResult.duplicate) {
      processedEventIds.add(stripeEvent.id);
      return {
        statusCode: 200,
        body: JSON.stringify({ received: true, duplicate: true, eventId: stripeEvent.id, contactId: contactResult.contact?.id || null })
      };
    }

    await sendPaymentConfirmationEmail(payment);
    await sendPaymentConfirmationSms(contactResult.contact?.id, payment);

    const eventLogTag = makeEventTag(stripeEvent.id);
    await addTagsToContact(contactResult.contact.id, [
      TAG_PAYMENT_CONFIRMED,
      TAG_PAID_PACKAGE,
      makePackageTag(payment.packageName),
      ...(payment.isNursingExam ? [TAG_NURSING_EXAM] : []),
      ...(payment.isSubscription ? [TAG_SUBSCRIPTION_MEMBER] : []),
      eventLogTag
    ]);

    processedEventIds.add(stripeEvent.id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        received: true,
        processed: true,
        eventId: stripeEvent.id,
        contactId: contactResult.contact.id
      })
    };
  } catch (error) {
    console.error('stripe-webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process Stripe webhook.' })
    };
  }
};

function isHandledStripeEvent(eventType) {
  return eventType === 'checkout.session.completed' || eventType === 'invoice.payment_succeeded';
}

async function buildPaymentPayload(stripeEvent) {
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const metadata = session.metadata || {};
    const studentName = metadata.student_name || session.customer_details?.name || session.customer_details?.email || '';
    const packageName = inferPackageName(metadata.plan, session);
    const amount = formatMoney(session.amount_total, session.currency || 'usd');

    return {
      eventType: stripeEvent.type,
      email: safeText(session.customer_details?.email),
      phone: normalizePhone(session.customer_details?.phone || metadata.phone || ''),
      firstName: extractFirstName(studentName, session.customer_details?.email),
      fullName: safeText(studentName),
      packageName,
      amount,
      paymentDate: formatDate(session.created),
      transactionId: safeText(session.payment_intent || session.id),
      isSubscription: session.mode === 'subscription',
      isNursingExam: inferIsNursing(packageName, metadata.subject),
      rawSubject: safeText(metadata.subject)
    };
  }

  const invoice = stripeEvent.data.object;
  const customer = await fetchStripeCustomer(invoice.customer);
  const metadata = invoice.metadata || {};
  const lineDescription = invoice.lines?.data?.[0]?.description || '';
  const packageName =
    safeText(metadata.package_name) ||
    safeText(invoice.description) ||
    safeText(lineDescription) ||
    'Subscription Payment';

  return {
    eventType: stripeEvent.type,
    email: safeText(invoice.customer_email || customer?.email),
    phone: normalizePhone(invoice.customer_phone || customer?.phone || metadata.phone || ''),
    firstName: extractFirstName(customer?.name || invoice.customer_name || invoice.customer_email || '', invoice.customer_email || customer?.email),
    fullName: safeText(customer?.name || invoice.customer_name || ''),
    packageName,
    amount: formatMoney(invoice.amount_paid ?? invoice.total, invoice.currency || 'usd'),
    paymentDate: formatDate(invoice.created),
    transactionId: safeText(invoice.payment_intent || invoice.charge || invoice.id),
    isSubscription: true,
    isNursingExam: inferIsNursing(packageName, metadata.subject),
    rawSubject: safeText(metadata.subject)
  };
}

function inferPackageName(plan, session) {
  if (plan && PLAN_NAMES[plan]) {
    return PLAN_NAMES[plan];
  }
  const line = session.line_items?.data?.[0]?.description || '';
  return safeText(line) || 'Tutoring Package';
}

async function fetchStripeCustomer(customerId) {
  if (!customerId || !stripe) return null;
  try {
    return await stripe.customers.retrieve(customerId);
  } catch (error) {
    console.warn('Unable to retrieve Stripe customer:', error?.message || error);
    return null;
  }
}

async function upsertStudentContact(payment, stripeEventId) {
  let contact = null;

  if (payment.email) {
    contact = await findContactByEmail(payment.email);
  }
  if (!contact && payment.phone) {
    contact = await findContactByPhone(payment.phone);
  }

  const existingTags = new Set(Array.isArray(contact?.tags) ? contact.tags : []);
  const eventTag = makeEventTag(stripeEventId);
  if (existingTags.has(eventTag)) {
    return { contact, duplicate: true };
  }

  if (!contact) {
    contact = await createContact(payment);
  } else {
    contact = await updateContact(contact.id, payment);
  }

  return { contact, duplicate: false };
}

async function findContactByEmail(email) {
  if (!email) return null;
  const result = await ghlRequest('/contacts/search', {
    method: 'POST',
    body: {
      locationId: GHL_LOCATION_ID,
      query: { email }
    }
  });

  return extractFirstContact(result);
}

async function findContactByPhone(phone) {
  if (!phone) return null;
  const result = await ghlRequest('/contacts/search', {
    method: 'POST',
    body: {
      locationId: GHL_LOCATION_ID,
      query: { phone }
    }
  });

  return extractFirstContact(result);
}

function extractFirstContact(response) {
  const contact = response?.contact || response?.data?.contact;
  if (contact && contact.id) return contact;

  const contacts = response?.contacts || response?.data?.contacts || response?.meta?.contacts || [];
  if (Array.isArray(contacts) && contacts.length > 0) {
    return contacts[0];
  }

  return null;
}

async function createContact(payment) {
  const [firstName, ...lastParts] = splitName(payment.fullName || payment.firstName);
  const payload = {
    locationId: GHL_LOCATION_ID,
    firstName: firstName || payment.firstName,
    lastName: lastParts.join(' '),
    email: payment.email || undefined,
    phone: payment.phone || undefined,
    source: 'Stripe Payment',
    tags: compact([
      TAG_PAID_PACKAGE,
      makePackageTag(payment.packageName),
      payment.isNursingExam ? TAG_NURSING_EXAM : '',
      payment.isSubscription ? TAG_SUBSCRIPTION_MEMBER : ''
    ])
  };

  const result = await ghlRequest('/contacts/', {
    method: 'POST',
    body: payload
  });

  const contact = result?.contact || result;
  if (!contact?.id) {
    throw new Error('Failed to create contact in GoHighLevel.');
  }
  return contact;
}

async function updateContact(contactId, payment) {
  const [firstName, ...lastParts] = splitName(payment.fullName || payment.firstName);
  const payload = {
    firstName: firstName || payment.firstName || undefined,
    lastName: lastParts.join(' ') || undefined,
    email: payment.email || undefined,
    phone: payment.phone || undefined
  };

  const result = await ghlRequest(`/contacts/${encodeURIComponent(contactId)}`, {
    method: 'PUT',
    body: payload
  });

  return result?.contact || { id: contactId, ...(result || {}) };
}

async function addTagsToContact(contactId, tags) {
  const normalizedTags = compact(tags).map(t => safeText(t, 100));
  if (normalizedTags.length === 0) return;

  await ghlRequest(`/contacts/${encodeURIComponent(contactId)}/tags`, {
    method: 'POST',
    body: { tags: normalizedTags }
  });
}

async function sendPaymentConfirmationEmail(payment) {
  if (!payment.email) {
    console.warn('Skipping payment confirmation email: no student email.');
    return;
  }

  if (!SENDGRID_API_KEY || !SENDGRID_API_KEY.startsWith('SG.') || !FROM_EMAIL) {
    throw new Error('Missing email configuration for payment confirmation (SENDGRID_API_KEY/FROM_EMAIL).');
  }

  const subject = 'Payment Confirmed — Welcome to Exam Experts 🎉';
  const text = [
    `Hi ${payment.firstName},`,
    '',
    'Thank you for your payment — you’re officially enrolled with Exam Experts.',
    '',
    'Order details:',
    `• Program: ${payment.packageName}`,
    `• Amount Paid: ${payment.amount}`,
    `• Payment Date: ${payment.paymentDate}`,
    `• Transaction ID: ${payment.transactionId}`,
    '',
    'Your next steps:',
    '1. Watch for your onboarding message.',
    '2. Save this email for your records.',
    '3. Reply if you need help at any time.',
    '',
    'We’re excited to help you pass with confidence.',
    `— The Exam Experts Team`,
    `${SUPPORT_EMAIL} | ${SUPPORT_PHONE}`
  ].join('\n');

  const html = `
    <p>Hi ${escapeHtml(payment.firstName)},</p>
    <p>Thank you for your payment — you’re officially enrolled with Exam Experts.</p>
    <p><strong>Order details:</strong><br>
      • Program: ${escapeHtml(payment.packageName)}<br>
      • Amount Paid: ${escapeHtml(payment.amount)}<br>
      • Payment Date: ${escapeHtml(payment.paymentDate)}<br>
      • Transaction ID: ${escapeHtml(payment.transactionId)}
    </p>
    <p><strong>Your next steps:</strong><br>
      1. Watch for your onboarding message.<br>
      2. Save this email for your records.<br>
      3. Reply if you need help at any time.
    </p>
    <p>We’re excited to help you pass with confidence.<br>
      — The Exam Experts Team<br>
      ${escapeHtml(SUPPORT_EMAIL)} | ${escapeHtml(SUPPORT_PHONE)}
    </p>
  `;

  await sgMail.send({
    to: payment.email,
    from: FROM_EMAIL,
    subject,
    text,
    html
  });
}

async function sendPaymentConfirmationSms(contactId, payment) {
  if (!payment.phone || !contactId) {
    console.warn('Skipping payment confirmation SMS: missing phone or contactId.');
    return;
  }

  const message = `Hi ${payment.firstName}, this is Exam Experts. Your payment of ${payment.amount} for ${payment.packageName} is confirmed ✅ We’re excited to have you! Questions? Reply here or contact us at ${SUPPORT_PHONE}.`;

  const response = await fetch(`${GHL_MESSAGE_API_BASE_URL}/v1/conversations/messages/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contactId,
      message,
      type: 'SMS'
    })
  });

  if (!response.ok) {
    const body = await safeJson(response);
    throw new Error(`Failed to send payment SMS (${response.status}): ${JSON.stringify(body)}`);
  }
}

async function ghlRequest(path, options = {}) {
  const url = `${GHL_API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      Version: GHL_API_VERSION,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await safeJson(response);
  if (!response.ok) {
    throw new Error(`GoHighLevel request failed (${response.status}) ${path}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch (error) {
    return {};
  }
}

function getHeader(headers = {}, key) {
  const lowerKey = key.toLowerCase();
  for (const [headerName, headerValue] of Object.entries(headers)) {
    if (headerName.toLowerCase() === lowerKey) {
      return headerValue;
    }
  }
  return '';
}

function extractFirstName(name = '', email = '') {
  const source = safeText(name).trim() || safeText(email).split('@')[0] || 'there';
  const firstWord = source.split(/\s+/)[0] || 'there';
  return capitalize(firstWord.replace(/[^a-zA-Z\-']/g, '')) || 'there';
}

function splitName(name = '') {
  const cleaned = safeText(name).trim();
  if (!cleaned) return ['', ''];
  return cleaned.split(/\s+/);
}

function inferIsNursing(packageName = '', subject = '') {
  const value = `${packageName} ${subject}`.toLowerCase();
  return /(nursing|nclex|med\s*surg|pharm|patho|fundamentals|anatomy|physiology)/.test(value);
}

function makePackageTag(packageName = '') {
  const slug = String(packageName || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  return slug ? `package:${slug}` : 'package:unknown';
}

function makeEventTag(eventId = '') {
  return `stripe-event:${safeText(eventId, 120)}`;
}

function normalizePhone(phone = '') {
  const trimmed = safeText(phone, 30);
  if (!trimmed) return '';

  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';

  if (hasPlus) {
    return `+${digits}`;
  }

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  return `+${digits}`;
}

function formatMoney(amountCents, currency = 'usd') {
  const value = Number(amountCents || 0) / 100;
  const normalizedCurrency = String(currency || 'usd').toUpperCase();
  if (!Number.isFinite(value)) {
    return '$0.00';
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: normalizedCurrency,
      minimumFractionDigits: 2
    }).format(value);
  } catch (error) {
    return `$${value.toFixed(2)}`;
  }
}

function formatDate(unixSeconds) {
  const date = new Date(Number(unixSeconds || 0) * 1000);
  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleDateString('en-US');
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function safeText(value = '', max = 300) {
  return String(value || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function compact(items) {
  return items.filter(Boolean);
}

function capitalize(value) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
