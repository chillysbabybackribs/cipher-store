import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';
import { generateLicenseKey } from '@/lib/license';
import { sendLicenseEmail } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20',
});

const prisma = new PrismaClient();

async function handlePaymentSuccess(event: Stripe.CheckoutSessionCompletedEvent) {
  const session = event.data.object as Stripe.Checkout.Session;

  // Find the order
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
  });

  if (!order) {
    console.error(`Order not found for session ${session.id}`);
    return;
  }

  // Generate license key
  const licenseKey = generateLicenseKey(order.id, order.productId);

  // Update order with license and completed status
  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      status: 'completed',
      licenseKey,
      stripePaymentId: session.payment_intent as string,
    },
  });

  // Send license email
  try {
    await sendLicenseEmail({
      email: order.email,
      customerName: order.customerName || 'Customer',
      product: order.product,
      licenseKey,
      downloadUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/download/${order.id}?license=${licenseKey}`,
    });
  } catch (emailError) {
    console.error('Failed to send license email:', emailError);
    // Don't fail the webhook if email fails - order is still completed
  }
}

async function handlePaymentFailed(event: Stripe.CheckoutSessionExpiredEvent) {
  const session = event.data.object as Stripe.Checkout.Session;

  const order = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
  });

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'failed' },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const body = await req.text();
    const sig = headersList.get('stripe-signature');

    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Log webhook
    await prisma.webhookLog.create({
      data: {
        event: event.type,
        data: JSON.stringify(event.data),
      },
    });

    // Handle specific events
    switch (event.type) {
      case 'checkout.session.completed':
        await handlePaymentSuccess(event as Stripe.CheckoutSessionCompletedEvent);
        break;

      case 'checkout.session.expired':
        await handlePaymentFailed(event as Stripe.CheckoutSessionExpiredEvent);
        break;

      // Add other event handlers as needed
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
