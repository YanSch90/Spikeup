import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { db } from '../../src/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { router } from 'expo-router';
import { useAuth } from '../../src/providers/AuthProvider';
import { usePaymentIntents } from '../../src/lib/payments';

export default function Matches() {
	const [matches, setMatches] = useState<any[]>([]);
    const { user } = useAuth();
    const { confirmBookingPayment } = usePaymentIntents();
	useEffect(() => { (async () => {
		const snap = await getDocs(collection(db, 'matches'));
		setMatches(snap.docs.map(d => ({ id: d.id, ...d.data() })));
	})(); }, []);
	return (
		<FlatList
			data={matches}
			keyExtractor={(i) => i.id}
			renderItem={({ item }) => (
				<Card style={{ margin: 12 }}>
					<Card.Title title={item.title} subtitle={new Date(item.dateTime).toLocaleString()} />
					<Card.Content><Text>{item.participantsCount || 0}/{item.maxPlayers} joined</Text></Card.Content>
					<Card.Actions>
						<Button onPress={() => router.push({ pathname: '/match/[id]/chat', params: { id: item.id } })}>Open chat</Button>
						<Button onPress={async () => {
							if (!user) return;
							if (item.isPaid && item.price) {
								await confirmBookingPayment(`${process.env.EXPO_PUBLIC_API_BASE_URL}/create-payment-intent`, { amount: Math.round(item.price * 100), currency: 'usd', metadata: { matchId: item.id, userId: user.uid } });
							}
							await setDoc(doc(db, 'matches', item.id, 'participants', user.uid), { joinedAt: Date.now() });
						}}>Join</Button>
					</Card.Actions>
				</Card>
			)}
			ListEmptyComponent={<View style={{ padding: 16 }}><Text>No matches</Text></View>}
		/>
	);
}
