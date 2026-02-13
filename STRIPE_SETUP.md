# Stripe Integration Setup Guide

## Prerequisites

1. **Stripe Account**: https://dashboard.stripe.com
2. **API Keys**: Get your keys from Settings → Developers → API keys

## Setup Steps

### 1. Environment Variables

Update `.env.local` with your Stripe keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com (or http://localhost:3000 for dev)
RESEND_API_KEY=re_your_resend_key (optional - for email)
```

### 2. Install Dependencies

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Configure Stripe Webhook

In Stripe Dashboard:
1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded` (optional)
5. Copy the signing secret and add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### 4. Update Checkout Button

Replace "View Agents" buttons with the CheckoutButton component:

```tsx
import CheckoutButton from '@/components/CheckoutButton';

<CheckoutButton 
  productId="research" 
  buttonText="Get Started" 
  className="your-button-class" 
/>
```

## How It Works

### 1. **Checkout Flow**
- User clicks "Get Started" → enters email
- Creates Stripe Checkout session
- Redirects to Stripe-hosted checkout
- Handles success → `/order-success?session_id={id}`

### 2. **Payment Processing**
- Stripe webhook → `/api/webhooks/stripe`
- Webhook verifies signature
- On `checkout.session.completed`:
  - Generates license key
  - Updates order status → "completed"
  - Sends license email

### 3. **License Management**
- License keys stored in database
- Format: `PRODUCT-RANDOM-TIMESTAMP-CHECKSUM`
- Sent to customer email
- Can be retrieved via `/api/orders/{id}?license={key}`

## API Endpoints

### Checkout
```
POST /api/checkout
Body: { productId, email, customerName }
Returns: { sessionId, orderId, url }
```

### Orders
```
GET /api/orders/{id} - Get order by ID
GET /api/orders/session/{sessionId} - Get order by session
```

### Admin Dashboard
```
GET /api/admin/orders - List all orders
GET /api/admin/orders?status=completed - Filter by status
```

Access: `/admin/orders`

## Email Service

Uses Resend for email. If `RESEND_API_KEY` not set, logs to console instead.

**To use Resend:**
1. Sign up: https://resend.com
2. Get API key from dashboard
3. Add to `.env.local`
4. Configure sender domain

## Testing

### Test Mode
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Auth: `4000 0000 0000 3220`

### Webhook Testing
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login and forward webhooks
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Then in another terminal:
```bash
stripe trigger checkout.session.completed
```

## Database

SQLite database at `prisma/dev.db`. Schema:

- **orders**: Order records with license keys
- **webhook_logs**: Webhook event history (for debugging)

Reset database:
```bash
npx prisma migrate reset
```

## Security Considerations

1. **Webhook Verification**: Always verify signature before processing
2. **License Keys**: Store securely, never expose in logs
3. **Admin Access**: Add authentication to `/admin/orders`
4. **API Keys**: Never commit `.env.local`, use `.env.local.example`
5. **HTTPS**: Always use HTTPS in production

## Troubleshooting

### Webhook not firing?
- Check webhook endpoint is accessible from Stripe
- Verify signing secret is correct
- Check logs: `/api/webhooks/stripe` responses

### License email not sending?
- Check `RESEND_API_KEY` is set
- Check sender domain is verified in Resend
- Check email logs in console output

### Orders not appearing?
- Ensure database migration ran: `npx prisma migrate dev`
- Check Stripe webhook is receiving events
- Check `/api/webhooks/stripe` logs

## Next Steps

1. [ ] Add authentication to admin dashboard
2. [ ] Add email templates
3. [ ] Set up license activation endpoint
4. [ ] Add order confirmation email
5. [ ] Implement refund handling
6. [ ] Add subscription support (if needed)
7. [ ] Set up analytics/reporting
