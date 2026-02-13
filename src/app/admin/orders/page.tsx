'use client';

import { useEffect, useState } from 'react';
import styles from './orders.module.css';

interface Order {
  id: string;
  email: string;
  product: string;
  price: number;
  status: string;
  licenseKey?: string;
  customerName?: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = `/api/admin/orders${filter !== 'all' ? `?status=${filter}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const totalRevenue = filteredOrders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginTop: 0 }}>Orders Dashboard</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          <div style={{
            background: '#1a1a1a',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}>
            <p style={{ color: '#999', margin: '0 0 10px 0' }}>Total Orders</p>
            <p style={{ fontSize: '28px', margin: 0, fontWeight: 'bold' }}>
              {filteredOrders.length}
            </p>
          </div>

          <div style={{
            background: '#1a1a1a',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}>
            <p style={{ color: '#999', margin: '0 0 10px 0' }}>Completed</p>
            <p style={{ fontSize: '28px', margin: 0, fontWeight: 'bold', color: '#00d4ff' }}>
              {filteredOrders.filter(o => o.status === 'completed').length}
            </p>
          </div>

          <div style={{
            background: '#1a1a1a',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}>
            <p style={{ color: '#999', margin: '0 0 10px 0' }}>Revenue</p>
            <p style={{ fontSize: '28px', margin: 0, fontWeight: 'bold' }}>
              ${(totalRevenue / 100).toFixed(2)}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          {(['all', 'completed', 'pending', 'failed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                border: filter === f ? '1px solid #00d4ff' : '1px solid #333',
                background: filter === f ? '#00d4ff' : 'transparent',
                color: filter === f ? '#000' : '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p style={{ color: '#ff6b6b' }}>Error: {error}</p>
        ) : filteredOrders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div style={{
            overflowX: 'auto',
            background: '#1a1a1a',
            borderRadius: '8px',
            border: '1px solid #333',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#999' }}>Date</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#999' }}>Customer</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#999' }}>Product</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#999' }}>Amount</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#999' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#999' }}>License</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom: '1px solid #333',
                      '&:hover': { background: '#252525' },
                    }}
                  >
                    <td style={{ padding: '15px' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div>{order.customerName || 'N/A'}</div>
                      <div style={{ color: '#666', fontSize: '12px' }}>{order.email}</div>
                    </td>
                    <td style={{ padding: '15px' }}>{order.product}</td>
                    <td style={{ padding: '15px' }}>${(order.price / 100).toFixed(2)}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background:
                          order.status === 'completed'
                            ? '#1a4d2e'
                            : order.status === 'pending'
                            ? '#4d3a1a'
                            : '#4d1a1a',
                        color:
                          order.status === 'completed'
                            ? '#4ade80'
                            : order.status === 'pending'
                            ? '#facc15'
                            : '#ff6b6b',
                        fontSize: '12px',
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '15px', fontFamily: 'monospace', fontSize: '11px' }}>
                      {order.licenseKey ? (
                        <span title={order.licenseKey} style={{ color: '#00d4ff' }}>
                          {order.licenseKey.substring(0, 12)}...
                        </span>
                      ) : (
                        <span style={{ color: '#666' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
