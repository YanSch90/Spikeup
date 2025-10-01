import { Platform } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

export function PaymentsProvider({ children }: { children: React.ReactNode }) {
	return (
		<StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK!}>
			{children}
		</StripeProvider>
	);
}

export function usePaymentIntents() {
	const { confirmPayment } = useStripe();
	async function confirmBookingPayment(createIntentUrl: string, payload: { amount: number; currency: string; metadata?: any }) {
		const res = await fetch(createIntentUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
		const { clientSecret } = await res.json();
		return await confirmPayment(clientSecret, { paymentMethodType: Platform.select({ ios: 'Card', android: 'Card' }) as any });
	}
	return { confirmBookingPayment };
}
