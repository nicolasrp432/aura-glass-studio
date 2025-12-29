import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
    console.warn('Stripe publishable key missing. Ensure VITE_STRIPE_PUBLISHABLE_KEY is set.');
}

export const stripePromise = loadStripe(stripePublishableKey || '');
