// Netlify Function for Stripe Webhook
// This function handles successful payments and sends download links via email

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Product catalog with download URLs (must match create-checkout.js)
const PRODUCTS = {
    'sat-math-workbook': {
        name: 'SAT Math Mastery Workbook',
        downloadUrl: 'https://example.com/downloads/sat-math-workbook.pdf'
    },
    'chemistry-workbook': {
        name: 'Chemistry Mastery Workbook',
        downloadUrl: 'https://example.com/downloads/chemistry-workbook.pdf'
    },
    'physics-workbook': {
        name: 'Physics Mastery Workbook',
        downloadUrl: 'https://example.com/downloads/physics-workbook.pdf'
    },
    'complete-sat-guide': {
        name: 'Complete SAT Prep Course Guide',
        downloadUrl: 'https://example.com/downloads/complete-sat-guide.pdf'
    },
    'biology-guide': {
        name: 'Biology Complete Course Guide',
        downloadUrl: 'https://example.com/downloads/biology-guide.pdf'
    },
    'advanced-math-guide': {
        name: 'Advanced Math Course Guide',
        downloadUrl: 'https://example.com/downloads/advanced-math-guide.pdf'
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

    const sig = event.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let stripeEvent;

    try {
        // Verify webhook signature
        stripeEvent = stripe.webhooks.constructEvent(
            event.body,
            sig,
            webhookSecret
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
        };
    }

    // Handle the checkout.session.completed event
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object;
        
        // Get product ID from metadata
        const productId = session.metadata.productId;
        const customerEmail = session.customer_details.email;

        if (!PRODUCTS[productId]) {
            console.error('Invalid product ID:', productId);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid product' })
            };
        }

        const product = PRODUCTS[productId];

        // Send email with download link
        const msg = {
            to: customerEmail,
            from: process.env.FROM_EMAIL || 'examexpertscontact@gmail.com',
            subject: `Your Purchase: ${product.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #8B5CF6;">Thank You for Your Purchase! 🎉</h1>
                    
                    <p>Hi there,</p>
                    
                    <p>Thank you for purchasing <strong>${product.name}</strong> from Exam Experts!</p>
                    
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h2 style="color: #1F2937; margin-top: 0;">Download Your Product</h2>
                        <p>Click the button below to download your study material:</p>
                        <a href="${product.downloadUrl}" 
                           style="display: inline-block; background: linear-gradient(135deg, #8B5CF6, #EC4899); 
                                  color: white; padding: 12px 30px; text-decoration: none; 
                                  border-radius: 25px; font-weight: bold; margin: 10px 0;">
                            Download Now
                        </a>
                        <p style="font-size: 14px; color: #6B7280; margin-top: 15px;">
                            Or copy this link: <a href="${product.downloadUrl}">${product.downloadUrl}</a>
                        </p>
                    </div>
                    
                    <p><strong>Important:</strong> Save this email for your records. You can use the download link at any time.</p>
                    
                    <p>If you have any questions or need assistance, please don't hesitate to contact us at 
                       <a href="mailto:examexpertscontact@gmail.com">examexpertscontact@gmail.com</a></p>
                    
                    <p>Happy studying!</p>
                    
                    <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
                        Best regards,<br>
                        <strong>The Exam Experts Team</strong><br>
                        🎓 Unlock Your Academic Magic!
                    </p>
                </div>
            `,
        };

        try {
            await sgMail.send(msg);
            console.log('Download email sent to:', customerEmail);
        } catch (error) {
            console.error('Error sending email:', error);
            // Don't fail the webhook if email fails
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ received: true })
    };
};
