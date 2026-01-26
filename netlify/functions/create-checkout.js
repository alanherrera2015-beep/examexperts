// Netlify Function for Stripe Checkout
// This function creates a Stripe Checkout session for product purchases

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Product catalog with pricing
// IMPORTANT: Replace placeholder download URLs with actual file URLs before deploying to production
// Update these URLs in both create-checkout.js and stripe-webhook.js
const PRODUCTS = {
    'sat-math-workbook': {
        name: 'SAT Math Mastery Workbook',
        price: 4999, // Price in cents
        description: '500+ practice problems with detailed solutions',
        downloadUrl: 'https://example.com/downloads/sat-math-workbook.pdf' // Placeholder - update with actual URL
    },
    'chemistry-workbook': {
        name: 'Chemistry Mastery Workbook',
        price: 4499,
        description: 'Master chemistry from basics to advanced topics',
        downloadUrl: 'https://example.com/downloads/chemistry-workbook.pdf' // Placeholder - update with actual URL
    },
    'physics-workbook': {
        name: 'Physics Mastery Workbook',
        price: 4499,
        description: 'Comprehensive physics workbook',
        downloadUrl: 'https://example.com/downloads/physics-workbook.pdf' // Placeholder - update with actual URL
    },
    'complete-sat-guide': {
        name: 'Complete SAT Prep Course Guide',
        price: 14999,
        description: 'Comprehensive SAT preparation resource',
        downloadUrl: 'https://example.com/downloads/complete-sat-guide.pdf' // Placeholder - update with actual URL
    },
    'biology-guide': {
        name: 'Biology Complete Course Guide',
        price: 8999,
        description: 'Comprehensive biology guide from cell biology to ecology',
        downloadUrl: 'https://example.com/downloads/biology-guide.pdf' // Placeholder - update with actual URL
    },
    'advanced-math-guide': {
        name: 'Advanced Math Course Guide',
        price: 9999,
        description: 'Master advanced mathematics including calculus',
        downloadUrl: 'https://example.com/downloads/advanced-math-guide.pdf' // Placeholder - update with actual URL
    }
};

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { productId } = JSON.parse(event.body);

        // Validate product
        if (!PRODUCTS[productId]) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid product' })
            };
        }

        const product = PRODUCTS[productId];

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        unit_amount: product.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.URL || 'https://examexperts.netlify.app'}?success=true&product=${productId}`,
            cancel_url: `${process.env.URL || 'https://examexperts.netlify.app'}?canceled=true`,
            metadata: {
                productId: productId,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: session.url })
        };

    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to create checkout session',
                message: error.message 
            })
        };
    }
};
