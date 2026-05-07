const Stripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

const PLAN_CONFIG = {
  'school-year': {
    amount: 10000,
    name: '5-Step Analogy Method Enrollment',
    description: 'One-time enrollment for the school-year plan. Tutoring continues at $50/hr for the rest of the school year.'
  },
  'pay-as-you-go': {
    amount: 7500,
    name: '5-Step Analogy Method First Hour',
    description: 'First tutoring hour for the no-enrollment plan. Future sessions remain $75/hr with no enrollment fee.'
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

    if (!PLAN_CONFIG[plan]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Please choose a valid plan.' }) };
    }

    if (!name || !email || !subject) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Name, email, and subject are required.' }) };
    }

    const baseUrl = getBaseUrl(event);
    const successUrl = `${baseUrl}/pricing?signup=success&plan=${encodeURIComponent(plan)}`;
    const cancelUrl = `${baseUrl}/pricing?signup=canceled&plan=${encodeURIComponent(plan)}`;
    const selectedPlan = PLAN_CONFIG[plan];

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
              description: `${selectedPlan.description} Focus: ${subject}`
            }
          }
        }
      ],
      metadata: {
        plan,
        student_name: truncate(name, 200),
        phone: truncate(phone, 200),
        subject: truncate(subject, 200),
        goals: truncate(goals, 500)
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

  const forwardedHost = String(event.headers['x-forwarded-host'] || event.headers.host || '').trim();
  const forwardedProto = String(event.headers['x-forwarded-proto'] || 'https').trim().toLowerCase();
  if (/^[a-z0-9.-]+(?::\d+)?$/i.test(forwardedHost) && /^https?$/.test(forwardedProto)) {
    const candidateOrigin = normalizeOrigin(`${forwardedProto}://${forwardedHost}`);
    if (allowedOrigins.has(candidateOrigin)) {
      return candidateOrigin;
    }
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

function truncate(value, maxLength) {
  return String(value || '').slice(0, maxLength);
}
