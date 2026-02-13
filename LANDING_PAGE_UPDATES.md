# Landing Page Updates for Stripe Integration

## Replace "View Agents" Buttons

All "View Agents" buttons should be replaced with the new `CheckoutButton` component.

### Current Structure (in your landing page component)

Find sections like:
```tsx
<button>View Agents</button>
```

Or:
```tsx
<a href="#pricing">View Agents</a>
```

### Updated Structure

Replace with:
```tsx
import CheckoutButton from '@/components/CheckoutButton';

// In your agent cards or pricing section:
<CheckoutButton 
  productId="research" 
  buttonText="Get Started" 
  className="your-button-styles" 
/>
```

### Product IDs & Pricing

Update your pricing cards to use these product IDs:

```tsx
// Research Agent - $299
<CheckoutButton productId="research" buttonText="Get Started" />

// Healthcare Agent - $499
<CheckoutButton productId="healthcare" buttonText="Get Started" />

// Legal Agent - $499
<CheckoutButton productId="legal" buttonText="Get Started" />

// Real Estate Agent - $399
<CheckoutButton productId="realestate" buttonText="Get Started" />

// Full Bundle - $999
<CheckoutButton productId="bundle" buttonText="Get Started" />
```

## Example Implementation

### Before (Static)
```tsx
<div className="product-card">
  <h3>Healthcare AI Agent</h3>
  <p className="price">$499</p>
  <p>HIPAA-compliant patient intake</p>
  <button onClick={() => alert('Not yet implemented')}>
    Get Started
  </button>
</div>
```

### After (With Checkout)
```tsx
'use client';

import CheckoutButton from '@/components/CheckoutButton';

export default function ProductCard() {
  return (
    <div className="product-card">
      <h3>Healthcare AI Agent</h3>
      <p className="price">$499</p>
      <p>HIPAA-compliant patient intake</p>
      <CheckoutButton 
        productId="healthcare"
        buttonText="Get Started"
        className="btn-primary"
      />
    </div>
  );
}
```

## Pricing Section Update

If you have a pricing table, update it:

```tsx
const PRODUCTS = [
  {
    id: 'research',
    name: 'AI Research Agent',
    price: '$299',
    description: 'Full-source AI research agent with browser integration',
    features: ['Local/Cloud deployment', 'Source code included', 'Updates & support'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare AI Agent',
    price: '$499',
    description: 'HIPAA-compliant patient intake and appointment scheduling',
    features: ['HIPAA-ready', 'Multi-domain', 'Compliance docs'],
  },
  {
    id: 'legal',
    name: 'Legal AI Agent',
    price: '$499',
    description: 'Compliance-ready legal document analysis',
    features: ['Legal discovery', 'Compliance reports', 'Document analysis'],
  },
  {
    id: 'realestate',
    name: 'Real Estate AI Agent',
    price: '$399',
    description: 'Multi-domain real estate research and analysis',
    features: ['Market analysis', 'Property research', 'Valuation tools'],
  },
  {
    id: 'bundle',
    name: 'Full Agent Bundle',
    price: '$999',
    description: 'All 4 specialized agents with source code',
    features: ['All agents included', 'Priority support', 'Free updates'],
  },
];

export default function PricingSection() {
  return (
    <div className="pricing-grid">
      {PRODUCTS.map(product => (
        <div key={product.id} className="pricing-card">
          <h3>{product.name}</h3>
          <p className="price">{product.price}</p>
          <p>{product.description}</p>
          <ul>
            {product.features.map(feature => (
              <li key={feature}>✓ {feature}</li>
            ))}
          </ul>
          <CheckoutButton 
            productId={product.id}
            buttonText="Get Started"
            className="btn-primary"
          />
        </div>
      ))}
    </div>
  );
}
```

## Pages to Update

### 1. **Home Page** (`page.tsx` or index)
- Agent showcase section
- Pricing section
- Call-to-action buttons

### 2. **Products/Agents Page** (if exists)
- Individual agent cards
- Comparison table
- Purchase buttons

### 3. **Pricing Page** (if exists)
- Replace all purchase links
- Add pricing table
- Include feature comparisons

## Add Success Page Link

In your navigation, add a reference to order success:

```tsx
// Link for debugging (optional)
<a href="/order-success?session_id=test">Test Success Page</a>
```

Or just let users get redirected after checkout.

## Add Admin Dashboard Link

For internal use, add admin access (in admin panel or settings):

```tsx
<a href="/admin/orders">View Orders (Admin)</a>
```

## Styling Considerations

The `CheckoutButton` component accepts a `className` prop:

```tsx
<CheckoutButton 
  productId="research"
  buttonText="Get Started"
  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
/>
```

Match your existing button styles by adding the appropriate CSS classes.

## Testing Checklist

- [ ] Replace all "View Agents" buttons with CheckoutButton
- [ ] Test checkout flow with Stripe test card
- [ ] Verify email prompt appears
- [ ] Confirm redirect to Stripe Checkout
- [ ] Check order success page displays correctly
- [ ] Verify admin dashboard shows orders
- [ ] Test with multiple products
- [ ] Check license key generation
- [ ] Test email delivery (or console output)

## Error Handling

The CheckoutButton handles errors gracefully:

```tsx
<CheckoutButton productId="research" />

// If Stripe fails, user sees error message
// If email prompt is canceled, checkout is canceled
// Network errors are caught and displayed
```

No additional error handling needed on your end.

## Mobile Responsiveness

The component is responsive by default. On mobile:
- Button scales appropriately
- Stripe Checkout modal is mobile-optimized
- Success page is mobile-friendly

## Next Steps

1. Make all button replacements
2. Test each product ID
3. Deploy to staging
4. Test with live Stripe test mode
5. Deploy to production with live keys
