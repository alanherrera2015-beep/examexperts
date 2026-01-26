// Netlify Function for Stripe Checkout
// This function creates a Stripe Checkout session for product purchases

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Product catalog with pricing
const PRODUCTS = {
    'sat-math-workbook': {
        name: 'SAT Math Mastery Workbook',
        price: 4999, // Price in cents
        description: '500+ practice problems with detailed solutions'
    },
    'act-science-workbook': {
        name: 'ACT Science Workbook',
        price: 4499,
        description: 'Master ACT Science section with 300+ passages'
    },
    'gre-vocab-workbook': {
        name: 'GRE Vocabulary Builder',
        price: 3999,
        description: '2000+ essential GRE words with mnemonics'
    },
    'complete-sat-guide': {
        name: 'Complete SAT Prep Course Guide',
        price: 14999,
        description: 'Comprehensive SAT preparation resource'
    },
    'mcat-bio-guide': {
        name: 'MCAT Biology Course Guide',
        price: 12999,
        description: 'Comprehensive MCAT Biology review'
    },
    'nclex-bundle': {
        name: 'NCLEX Study Guide Bundle',
        price: 11999,
        description: 'Complete NCLEX exam preparation'
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
