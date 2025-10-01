import 'dotenv/config';
export default {
	expo: {
		name: 'volleyball-booking',
		slug: 'volleyball-booking',
		scheme: 'vbk',
		extra: {},
		plugins: ['expo-router', ['@stripe/stripe-react-native', { merchantIdentifier: 'merchant.com.yourapp', enableGooglePay: true }]],
		experiments: { typedRoutes: true },
	},
};
