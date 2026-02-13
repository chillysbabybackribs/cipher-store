import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20',
});

const prisma = new PrismaClient();

const PRODUCTS = {
  research: {
    name: 'AI Research Agent',
    description: 'Full-source AI research agent with browser integration',
    price: 29900, // $299 in cents
    id: 'prod_research',
  },
  healthcare: {
    name: 'Healthcare AI Agent',
    description: 'HIPAA-compliant patient intake and appointment scheduling',
    price: 49900, // $499 in cents
    id: 'prod_healthcare',
  },
  legal: {
    name: 'Legal AI Agent',
    description: 'Compliance-ready legal document analysis and discovery',
    price: 49900,
    id: 'prod_legal',
  },
  realestate: {
    name: 'Real Estate AI Agent',
    description: 'Multi-domain real estate research and market analysis',
    price: 39900,
    id: 'prod_realestate',
  },
  bundle: {
    name: 'Full Agent Bundle',
    description: 'All 4 specialized agents with source code and updates',
    price: 99900, // $999 in cents
    id: 'prod_bundle',
  },
};

export async function POST(req: NextRequest) {
  try {
    const { productId, email, customerName } = await req.json();

    if (!productId || !email) {
      return NextResponse.json(
        { error: 'Missing productId or email' },
        { status: 400 }
      );
    }

    const product = PRODUCTS[productId as keyof typeof PRODUCTS];
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/#pricing`,
      customer_email: email,
      metadata: {
        productId,
        customerName: customerName || '',
      },
    });

    // Store order in pending state
    const order = await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        email,
        product: product.name,
        productId,
        price: product.price,
        status: 'pending',
        customerName: customerName || undefined,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      orderId: order.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
