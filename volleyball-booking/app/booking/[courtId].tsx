import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { db } from '../../src/lib/firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../src/providers/AuthProvider';
import { usePaymentIntents } from '../../src/lib/payments';

export default function BookingScreen() {
	const { courtId } = useLocalSearchParams<{ courtId: string }>();
	const { user } = useAuth();
	const [court, setCourt] = useState<any | null>(null);
	const [loading, setLoading] = useState(false);
	const { confirmBookingPayment } = usePaymentIntents();

	useEffect(() => {
		(async () => {
			if (!courtId) return;
			const snap = await getDoc(doc(db, 'courts', String(courtId)));
			if (snap.exists()) setCourt({ id: snap.id, ...snap.data() });
		})();
	}, [courtId]);

	const bookNow = async () => {
		if (!court || !user) return;
		setLoading(true);
		try {
			const amount = Math.round((court.pricePerHour || 0) * 100);
			await confirmBookingPayment(`${process.env.EXPO_PUBLIC_API_BASE_URL}/create-payment-intent`, { amount, currency: 'usd', metadata: { courtId: court.id, userId: user.uid } });
			await addDoc(collection(db, 'courts', court.id, 'bookings'), {
				playerId: user.uid,
				startTime: Date.now(),
				endTime: Date.now() + 60 * 60 * 1000,
				status: 'confirmed',
				createdAt: serverTimestamp()
			});
			router.replace('/(tabs)/courts');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={{ flex: 1, padding: 16, gap: 12 }}>
			<Text variant="headlineMedium">Book Court</Text>
			<Text>{court?.name}</Text>
			<Text>${court?.pricePerHour}/hr</Text>
			<Button mode="contained" onPress={bookNow} loading={loading} disabled={!court}>Pay & Confirm</Button>
		</View>
	);
}
