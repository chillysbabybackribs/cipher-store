#!/bin/bash

set -e

echo "🔐 Stripe Integration Setup"
echo "=========================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found. Please create it first with your Stripe keys."
    echo ""
    echo "Template:"
    echo "---"
    cat << 'EOF'
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    echo "---"
    exit 1
fi

echo "✅ Found .env.local"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma migrate dev --name init

echo ""
echo "✅ Stripe setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Stripe webhook secret"
echo "2. Run: npm run dev"
echo "3. Test checkout at http://localhost:3000"
echo "4. For webhook testing, use: stripe listen --forward-to localhost:3000/api/webhooks/stripe"
echo ""
