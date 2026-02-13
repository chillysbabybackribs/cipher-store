# Immediate Next Steps ⚡

## You're 95% Done! Just Need These Final Steps

### 1️⃣ Get Your Stripe Secret Key (2 minutes)

Currently you have:
- ✅ Publishable Key: Added to `.env.local`
- ❌ Secret Key: Placeholder in `.env.local`

**Do this:**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy the **Secret Key** that starts with `sk_live_`
3. Open `.env.local` in cipher-store
4. Replace: `STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE`
5. With your actual key: `STRIPE_SECRET_KEY=sk_live_...`

Save the file.

### 2️⃣ Set Up Stripe Webhook (5 minutes)

For production, webhooks need a public URL. For now, **test locally first**.

**Local Testing (Development):**
```bash
# Install Stripe CLI (one time)
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Start forwarding webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This gives you a signing secret. Copy it:
1. When you run `stripe listen`, it shows: `whsec_...`
2. Update `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_...`
3. Keep this terminal running while testing

**Production Setup (Later):**
1. Deploy app to your domain
2. Go to https://dashboard.stripe.com/webhooks
3. Click "Add endpoint"
4. URL: `https://yourdomain.com/api/webhooks/stripe`
5. Select events: `checkout.session.completed`, `checkout.session.expired`
6. Copy webhook secret → update `.env.local`

### 3️⃣ Replace Button Components (10-15 minutes)

Find your landing page where buttons say "View Agents" or similar.

**Example: Current code**
```jsx
<button onClick={() => navigate('/pricing')}>View Agents</button>
```

**Replace with:**
```jsx
import CheckoutButton from '@/components/CheckoutButton';

<CheckoutButton 
  productId="healthcare" 
  buttonText="Get Started" 
  className="your-button-class" 
/>
```

Do this for all agent cards on your landing page.

**Available Product IDs:**
- `research` - $299
- `healthcare` - $499
- `legal` - $499
- `realestate` - $399
- `bundle` - $999

### 4️⃣ Start Dev Server & Test (5 minutes)

```bash
cd /home/dp/Desktop/cipher-store

# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward webhooks (keep running)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Visit: http://localhost:3000

Click "Get Started" on any agent card:
1. Enter your email
2. Get redirected to Stripe Checkout
3. Use test card: `4242 4242 4242 4242`
4. Any future date, any CVC
5. Click "Pay"
6. See success page with license key
7. Check `/admin/orders` for order

### 5️⃣ Optional: Add Email Service (10 minutes)

Currently emails print to console. To send real emails:

**Option A: Use Resend (Recommended)**
1. Sign up at https://resend.com (free tier available)
2. Get API key
3. Update `.env.local`: `RESEND_API_KEY=re_...`
4. Verify sender domain in Resend
5. Done! Emails will be sent

**Option B: Use SendGrid, AWS SES, etc.**
- Edit `lib/email.ts` to use your service
- Add API keys to `.env.local`

**If you skip this:** Emails will log to console (fine for testing)

### 6️⃣ Update App URL for Production (when deploying)

When you deploy to your domain, update:
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

This is used for success/cancel redirects after payment.

## ✅ Verification Checklist

After each step, verify:

- [ ] 1: `.env.local` has real secret key
- [ ] 2: `stripe listen` is running and shows "whsec_..."
- [ ] 3: Landing page buttons are replaced with CheckoutButton
- [ ] 4: `npm run dev` starts without errors
- [ ] 5: Can click "Get Started" → enter email → reach Stripe Checkout
- [ ] 6: Can use test card to complete purchase
- [ ] 7: See license key on success page
- [ ] 8: See order in `/admin/orders`
- [ ] 9: (Optional) Receive email with license key

## Critical Files You Modified

These files were created/modified for Stripe integration:

**New API Routes:**
- `/app/api/checkout/route.ts`
- `/app/api/webhooks/stripe/route.ts`
- `/app/api/orders/[id]/route.ts`
- `/app/api/orders/session/[sessionId]/route.ts`
- `/app/api/admin/orders/route.ts`

**New Pages:**
- `/app/order-success/page.tsx`
- `/app/admin/orders/page.tsx`

**New Components:**
- `/components/CheckoutButton.tsx`

**New Utilities:**
- `/lib/license.ts`
- `/lib/email.ts`

**New Database:**
- `/prisma/schema.prisma`
- `/prisma/dev.db` (generated)

**Configuration:**
- `.env.local` (updated with your publishable key)
- `.env.local.example` (template)
- `package.json` (dependencies added)

## What Happens During Purchase

```
User clicks "Get Started"
    ↓
"Enter your email" prompt
    ↓
POST /api/checkout { productId, email }
    ↓
Create Stripe session + save order to database
    ↓
Redirect to Stripe Checkout (hosted)
    ↓
User enters card & completes payment
    ↓
Stripe calls webhook: /api/webhooks/stripe
    ↓
Generate license key
    ↓
Update order: status="completed", licenseKey="..."
    ↓
Send email with license (or log to console)
    ↓
Redirect user to /order-success?session_id=...
    ↓
Show license key & download link
```

## Key Endpoints for Testing

```
POST /api/checkout              → Create checkout session
GET  /api/orders/{id}           → Get order by ID
GET  /api/orders/session/{sid}  → Get order by session
GET  /api/admin/orders          → List all orders
POST /api/webhooks/stripe       → Webhook handler (Stripe calls this)
```

## Common Issues & Fixes

**Issue: "Stripe not loading"**
- Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correct
- Check `.env.local` is loaded
- Restart dev server

**Issue: "Order not created"**
- Check database file exists: `prisma/dev.db`
- Check migration ran: `DATABASE_URL="file:./prisma/dev.db" npx prisma migrate dev`
- Check server logs for errors

**Issue: "Webhook not firing"**
- Make sure `stripe listen` terminal is still running
- Check signing secret is updated in `.env.local`
- Use `stripe trigger checkout.session.completed` to test

**Issue: "License email not sending"**
- If using Resend, check `RESEND_API_KEY` is set
- If not using Resend, check console for log output
- Sender domain must be verified in Resend

## Deployment Checklist

When ready to go live:

- [ ] Replace test keys with live keys
- [ ] Set up Stripe webhook endpoint to your domain
- [ ] Add authentication to `/admin/orders`
- [ ] Set `NEXT_PUBLIC_APP_URL` to your domain
- [ ] Configure email service (Resend/SendGrid/etc)
- [ ] Test entire flow with live card (get refund after)
- [ ] Monitor webhook logs for errors
- [ ] Set up analytics/metrics
- [ ] Document for your team

## Support Files

Created for reference:
- `STRIPE_SETUP.md` - Detailed setup guide
- `STRIPE_INTEGRATION_COMPLETE.md` - Full feature overview
- `LANDING_PAGE_UPDATES.md` - How to update your UI
- `IMMEDIATE_NEXT_STEPS.md` - This file

## You're All Set! 🎉

Everything is ready. Just:
1. Add your secret key to `.env.local`
2. Run `stripe listen` in a terminal
3. Run `npm run dev`
4. Test a purchase
5. See the magic happen!

Questions? Check the setup docs or test with Stripe CLI.
