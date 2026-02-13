'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface CheckoutButtonProps {
  productId: string;
  buttonText?: string;
  className?: string;
}

export default function CheckoutButton({
  productId,
  buttonText = 'Get Started',
  className = '',
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get user email (you might want to prompt for this)
      const email = prompt('Enter your email:');
      if (!email) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          email,
          customerName: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`${className} ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Loading...' : buttonText}
      </button>
      {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
    </>
  );
}
