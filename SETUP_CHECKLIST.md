# Setup Checklist ✅

## Installation & Configuration

- [x] **Dependencies installed**
  ```bash
  npm install
  ```
  ✅ Stripe, Prisma, Resend added

- [x] **Database migrated**
  ```bash
  DATABASE_URL="file:./prisma/dev.db" npx prisma migrate dev --name init
  ```
  ✅ SQLite database created with `orders` and `webhook_logs` tables

- [x] **Environment file created**
  ```bash
  .env.local exists with:
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ✅
  - DATABASE_URL ✅
  - STRIPE_SECRET_KEY (placeholder)
  - STRIPE_WEBHOOK_SECRET (placeholder)
  - RESEND_API_KEY (optional)
  ```

---

## Code Implementation

- [x] **API Routes**
  - [x] `/api/checkout` - Create Stripe sessions
  - [x] `/api/webhooks/stripe` - Handle Stripe events
  - [x] `/api/orders/[id]` - Retrieve orders
  - [x] `/api/orders/session/[sessionId]` - Get order by session
  - [x] `/api/admin/orders` - Admin order list

- [x] **Pages**
  - [x] `/order-success` - Success page after payment
  - [x] `/admin/orders` - Order management dashboard

- [x] **Components**
  - [x] `CheckoutButton.tsx` - Reusable checkout component

- [x] **Utilities**
  - [x] `lib/license.ts` - License key generation
  - [x] `lib/email.ts` - Email service (Resend/console)

- [x] **Database**
  - [x] `prisma/schema.prisma` - Schema definition
  - [x] Migrations - Database version control

---

## Next Steps (Do These Now)

### Step 1: Add Stripe Secret Key ⚡ CRITICAL
- [ ] Log in to https://dashboard.stripe.com/apikeys
- [ ] Copy your `sk_live_...` secret key
- [ ] Edit `.env.local`
- [ ] Replace: `STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE`
- [ ] Paste your actual key
- [ ] Save file

### Step 2: Test Locally
- [ ] Open Terminal 1
- [ ] Run: `cd /home/dp/Desktop/cipher-store && npm run dev`
- [ ] Wait for "Ready in Xs" message
- [ ] Open Terminal 2

### Step 3: Set Up Webhook Listener
- [ ] In Terminal 2, run: `stripe login`
- [ ] Authenticate with your Stripe account
- [ ] Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- [ ] Copy the webhook signing secret (looks like `whsec_...`)

### Step 4: Add Webhook Secret
- [ ] Edit `.env.local`
- [ ] Replace: `STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE`
- [ ] Paste the secret from step 3
- [ ] Save file
- [ ] Go back to Terminal 1 and restart: `Ctrl+C` then `npm run dev`

### Step 5: Update Landing Page
- [ ] Find your landing page component
- [ ] Replace all `<button>View Agents</button>` with:
  ```tsx
  import CheckoutButton from '@/components/CheckoutButton';
  <CheckoutButton productId="healthcare" buttonText="Get Started" />
  ```
- [ ] Use correct product IDs (research, healthcare, legal, realestate, bundle)
- [ ] Test each button

### Step 6: Test Purchase Flow
- [ ] Visit http://localhost:3000 in browser
- [ ] Click "Get Started" on any agent card
- [ ] Enter any test email
- [ ] Should redirect to Stripe Checkout
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Expiry: Any future date (e.g., 12/26)
- [ ] CVC: Any 3 digits (e.g., 123)
- [ ] Name: Any name
- [ ] Click "Pay"

### Step 7: Verify Success
- [ ] See success page with license key
- [ ] License key format: `PRODUCT-RANDOM-TIMESTAMP-CHECKSUM`
- [ ] Visit http://localhost:3000/admin/orders
- [ ] See your order in the list
- [ ] Status should be "completed"
- [ ] License key should be visible

---

## Optional: Email Service Setup

### Use Resend (Recommended)
- [ ] Go to https://resend.com
- [ ] Sign up (free tier available)
- [ ] Get API key from dashboard
- [ ] Edit `.env.local`: `RESEND_API_KEY=re_...`
- [ ] Verify sender domain in Resend
- [ ] Test email by purchasing again

### Or Use Console (Development)
- [ ] Leave `RESEND_API_KEY` empty
- [ ] Emails will print to console in Terminal 1
- [ ] Perfect for testing without email service

---

## Verification Checklist

### Code Quality
- [ ] No TypeScript errors: `npm run build`
- [ ] Database migrations successful
- [ ] No missing dependencies

### Functionality
- [ ] Checkout button appears on landing page
- [ ] Clicking button opens email prompt
- [ ] Email prompt validates email
- [ ] Canceling prompt doesn't break anything
- [ ] Submitting redirects to Stripe Checkout
- [ ] Stripe Checkout loads correctly
- [ ] Test payment completes
- [ ] Success page displays license key
- [ ] Admin dashboard shows order
- [ ] Order status is "completed"
- [ ] License key is non-empty

### Integration
- [ ] Webhook receives events (check Stripe CLI terminal)
- [ ] Database updates on payment
- [ ] License key is unique per order
- [ ] Email is sent (or console output visible)

### Database
- [ ] `prisma/dev.db` exists
- [ ] Can run Prisma Studio: `DATABASE_URL="file:./prisma/dev.db" npx prisma studio`
- [ ] Orders table has records
- [ ] Webhook logs table has events

---

## Troubleshooting

### Issue: "Stripe not loading in browser"
```
✓ Check NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is correct
✓ Restart dev server: Ctrl+C then npm run dev
✓ Clear browser cache
```

### Issue: "Webhook secret not found"
```
✓ Make sure stripe listen is running in Terminal 2
✓ Look for "whsec_..." in Terminal 2 output
✓ Copy it exactly to .env.local
✓ Restart dev server
```

### Issue: "Database error"
```
✓ Check DATABASE_URL in .env.local
✓ Verify prisma/dev.db exists
✓ Run: DATABASE_URL="file:./prisma/dev.db" npx prisma migrate dev
```

### Issue: "Order not appearing"
```
✓ Check webhook is running (stripe listen window)
✓ Check browser console for errors
✓ Check server logs (Terminal 1)
✓ Use Stripe CLI to test: stripe trigger checkout.session.completed
```

---

## Production Deployment

When ready to deploy to production:

- [ ] Use live Stripe keys (not test keys)
- [ ] Set `NEXT_PUBLIC_APP_URL` to your domain
- [ ] Deploy app to your hosting
- [ ] Set up production webhook endpoint in Stripe Dashboard
- [ ] Point webhook URL to: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Configure email service with verified domain
- [ ] Add authentication to `/admin/orders`
- [ ] Test complete flow with live card
- [ ] Monitor webhook logs for errors
- [ ] Set up uptime monitoring

---

## File Inventory

### Created/Modified Files
```
✅ app/api/checkout/route.ts
✅ app/api/webhooks/stripe/route.ts
✅ app/api/orders/[id]/route.ts
✅ app/api/orders/session/[sessionId]/route.ts
✅ app/api/admin/orders/route.ts
✅ app/order-success/page.tsx
✅ app/admin/orders/page.tsx
✅ components/CheckoutButton.tsx
✅ lib/license.ts
✅ lib/email.ts
✅ prisma/schema.prisma
✅ prisma/dev.db (generated)
✅ .env.local (updated)
✅ .env.local.example (created)
✅ package.json (dependencies added)
```

### Documentation Files
```
✅ STRIPE_SETUP.md
✅ STRIPE_INTEGRATION_COMPLETE.md
✅ LANDING_PAGE_UPDATES.md
✅ IMMEDIATE_NEXT_STEPS.md
✅ SETUP_CHECKLIST.md (this file)
```

---

## How It All Works

```
User clicks "Get Started"
    ↓
[CheckoutButton.tsx] Opens email prompt
    ↓
User enters email and clicks OK
    ↓
[POST /api/checkout] Creates Stripe session + saves order
    ↓
[Frontend] Redirects to Stripe Checkout URL
    ↓
[Stripe.com] User enters card details
    ↓
[Stripe] Payment processed
    ↓
[Stripe Webhook] Calls /api/webhooks/stripe
    ↓
[Webhook Handler] Verifies signature
    ↓
[lib/license.ts] Generates license key
    ↓
[Prisma] Updates order: status="completed"
    ↓
[lib/email.ts] Sends license to customer email
    ↓
[Frontend] Redirects to /order-success page
    ↓
User sees license key and download link
```

---

## Key Endpoints Reference

```bash
# Create Checkout Session
POST /api/checkout
{ "productId": "healthcare", "email": "user@example.com" }

# Get Order by ID
GET /api/orders/cld123abc

# Get Order by Session ID
GET /api/orders/session/cs_live_...

# Admin Orders List
GET /api/admin/orders?status=completed

# Success Page
GET /order-success?session_id=cs_live_...

# Admin Dashboard
GET /admin/orders

# Stripe Webhook (Stripe calls this)
POST /api/webhooks/stripe
Headers: stripe-signature: ...
```

---

## Quick Command Reference

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
DATABASE_URL="file:./prisma/dev.db" npx prisma studio  # Database UI

# Database
DATABASE_URL="file:./prisma/dev.db" npx prisma migrate dev --name name
DATABASE_URL="file:./prisma/dev.db" npx prisma migrate reset

# Testing
stripe login                   # Authenticate with Stripe
stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Webhooks
stripe trigger checkout.session.completed  # Test webhook
```

---

## Ready to Go! 🎉

You have everything you need. The checklist above will get you:

1. ✅ Local testing complete
2. ✅ Payment processing working
3. ✅ Orders being created
4. ✅ License keys generated
5. ✅ Admin dashboard functional
6. ✅ Ready for production deployment

**Estimated time to complete:** 30-45 minutes

**Next critical steps:**
1. Add your Stripe secret key
2. Start webhook listener
3. Test a purchase
4. Celebrate! 🎉
