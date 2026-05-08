const Stripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

const VALID_REP_CODES = (process.env.MEMBER_PROMO_CODES || '')
  .split(',')
  .map(c => c.trim().toUpperCase())
  .filter(Boolean);

const PLAN_CONFIG = {
  'pay-as-you-go': {
    amount: 7500,
    name: 'Pay As You Go – First Hour',
    description: 'No contract or membership. First tutoring hour at $75. Future sessions continue at $75/hr.'
  },
  'four-hour-package': {
    amount: 26000,
    name: '4-Hour Tutoring Package',
    description: 'Four hours of 1:1 tutoring at $65/hr, paid upfront ($260 total). Save $10/hr vs. single sessions.'
  },
  'annual-member': {
    amount: 10000,
    name: 'Annual Membership Registration',
    description: 'One-time $100 annual membership registration. Unlocks the $50/hr member tutoring rate for 12 months.'
  }
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

    if (!stripe) {
      console.error('Missing STRIPE_SECRET_KEY');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Stripe checkout is not configured yet.' })
      };
    }

    const body = JSON.parse(event.body || '{}');
    const plan = String(body.plan || '').trim();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const subject = String(body.subject || '').trim();
    const goals = String(body.goals || '').trim();
    const repCode = String(body.promoCode || '').trim().toUpperCase();

    if (!PLAN_CONFIG[plan]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Please choose a valid plan.' }) };
    }

    if (plan === 'annual-member') {
      if (!repCode) {
        return { statusCode: 400, body: JSON.stringify({ error: 'A rep code is required for the Annual Member rate.' }) };
      }
      if (VALID_REP_CODES.length > 0 && !VALID_REP_CODES.includes(repCode)) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid rep code. Please check your code and try again.' }) };
      }
    }

    if (!name || !email || !subject) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Name, email, and subject are required.' }) };
    }

    const baseUrl = getBaseUrl(event);
    const successUrl = `${baseUrl}/pricing?signup=success&plan=${encodeURIComponent(plan)}`;
    const cancelUrl = `${baseUrl}/pricing?signup=canceled&plan=${encodeURIComponent(plan)}`;
    const selectedPlan = PLAN_CONFIG[plan];
    const safeSubject = sanitizeText(subject, 120);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      phone_number_collection: { enabled: true },
      billing_address_collection: 'auto',
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: selectedPlan.amount,
            product_data: {
              name: selectedPlan.name,
              description: `${selectedPlan.description} Focus: ${safeSubject}`
            }
          }
        }
      ],
      metadata: {
        plan,
        student_name: truncate(name, 200),
        phone: truncate(phone, 200),
        subject: safeSubject,
        goals: truncate(goals, 500),
        promo_code: truncate(repCode, 50)
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to start Stripe checkout right now.' })
    };
  }
};

function getBaseUrl(event) {
  const allowedOrigins = getAllowedOrigins();
  const origin = normalizeOrigin(event.headers.origin);
  if (allowedOrigins.has(origin)) {
    return origin;
  }

  const envUrl = normalizeOrigin(process.env.URL || process.env.DEPLOY_PRIME_URL);
  if (allowedOrigins.has(envUrl)) {
    return envUrl;
  }

  return 'https://examexperts.org';
}

function getAllowedOrigins() {
  const origins = new Set([
    'https://examexperts.org',
    'https://www.examexperts.org',
    'http://localhost:8000',
    'http://localhost:8888',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:8888'
  ]);

  [process.env.URL, process.env.DEPLOY_PRIME_URL].forEach((value) => {
    const origin = normalizeOrigin(value);
    if (origin) {
      origins.add(origin);
    }
  });

  return origins;
}

function normalizeOrigin(value) {
  try {
    if (!value) return '';
    return new URL(String(value).trim()).origin;
  } catch (error) {
    return '';
  }
}

function sanitizeText(value, maxLength) {
  return truncate(String(value || '').replace(/[\r\n<>]+/g, ' ').replace(/\s+/g, ' ').trim(), maxLength);
}

function truncate(value, maxLength) {
  const normalized = String(value || '');
  const ellipsis = '...';
  if (normalized.length <= maxLength) {
    return normalized;
  }

  if (maxLength <= ellipsis.length) {
    return ellipsis.slice(0, maxLength);
  }

  const visibleLength = maxLength - ellipsis.length;
  return `${normalized.slice(0, visibleLength)}${ellipsis}`;
}
