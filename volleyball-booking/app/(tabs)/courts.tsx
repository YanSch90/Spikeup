import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';
import MapView, { Marker } from 'react-native-maps';

export default function Courts() {
	const [courts, setCourts] = useState<any[]>([]);
	useEffect(() => {
		(async () => {
			const snap = await getDocs(query(collection(db, 'courts'), where('active', '==', true)));
			setCourts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
		})();
	}, []);
	return (
		<FlatList
			data={courts}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Card style={{ margin: 12 }}>
					<Card.Title title={item.name} subtitle={item.location?.address} />
					<Card.Content><Text>${item.pricePerHour}/hr</Text></Card.Content>
					<Card.Actions><Button onPress={() => router.push({ pathname: '/booking/[courtId]', params: { courtId: item.id } })}>Book</Button></Card.Actions>
				</Card>
			)}
			ListHeaderComponent={
				courts.length ? (
					<MapView style={{ height: 220, margin: 12 }} initialRegion={{ latitude: courts[0]?.location?.lat ?? 37.77, longitude: courts[0]?.location?.lng ?? -122.42, latitudeDelta: 0.05, longitudeDelta: 0.05 }}>
						{courts.map(c => c.location && (
							<Marker key={c.id} coordinate={{ latitude: c.location.lat, longitude: c.location.lng }} title={c.name} />
						))}
					</MapView>
				) : null
			}
			ListEmptyComponent={<View style={{ padding: 16 }}><Text>No courts</Text></View>}
		/>
	);
}
