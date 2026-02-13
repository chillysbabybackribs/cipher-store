'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Stripe from 'stripe';

interface OrderData {
  id: string;
  product: string;
  status: string;
  licenseKey?: string;
  email?: string;
  customerName?: string;
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        // You'll need to create an endpoint to get order by session ID
        const response = await fetch(`/api/orders/session/${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Wait a moment for webhook to process
    const timer = setTimeout(fetchOrder, 2000);
    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#fff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Processing your order...</h2>
          <p>This may take a moment.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#fff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <a href="/" style={{ color: '#00d4ff', textDecoration: 'none' }}>
            Return home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '20px',
        }}>
          ✓
        </div>
        
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>
          Payment Successful!
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#999',
          marginBottom: '40px',
        }}>
          Thank you for your purchase of <strong>{order?.product}</strong>
        </p>

        {order?.status === 'completed' ? (
          <div style={{
            background: '#1a1a1a',
            padding: '30px',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '1px solid #333',
          }}>
            <p style={{ color: '#999', marginTop: 0 }}>Your license key:</p>
            <code style={{
              display: 'block',
              background: '#0a0a0a',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '14px',
              wordBreak: 'break-all',
              fontFamily: "'Monaco', 'Courier New', monospace",
              marginBottom: '20px',
            }}>
              {order.licenseKey}
            </code>
            <p style={{
              color: '#666',
              fontSize: '14px',
              margin: 0,
            }}>
              Check your email for download instructions
            </p>
          </div>
        ) : (
          <div style={{
            background: '#1a1a1a',
            padding: '30px',
            borderRadius: '8px',
            marginBottom: '30px',
            border: '1px solid #333',
          }}>
            <p style={{ color: '#999' }}>
              Your order is being processed. You'll receive your license key shortly.
            </p>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Order ID: {order?.id}
            </p>
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          marginTop: '30px',
        }}>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#00d4ff',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '600',
            }}
          >
            Return Home
          </a>
          <a
            href="/documentation"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'transparent',
              color: '#00d4ff',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              border: '1px solid #00d4ff',
            }}
          >
            View Docs
          </a>
        </div>
      </div>
    </div>
  );
}
