import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { TextInput, List, Button } from 'react-native-paper';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';
import { router } from 'expo-router';

export default function ChatList() {
	const [qstr, setQstr] = useState('');
	const [users, setUsers] = useState<any[]>([]);

	const search = async () => {
		const snap = await getDocs(query(collection(db, 'users'), where('email', '>=', qstr), where('email', '<=', qstr + '\uf8ff')));
		setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flexDirection: 'row', padding: 12, gap: 8 }}>
				<TextInput style={{ flex: 1 }} placeholder="Search users by email" value={qstr} onChangeText={setQstr} />
				<Button onPress={search} mode="contained">Search</Button>
			</View>
			<FlatList
				data={users}
				keyExtractor={(i) => i.id}
				renderItem={({ item }) => (
					<List.Item
						title={item.email}
						onPress={() => router.push({ pathname: '/chat/[uid]', params: { uid: item.id } })}
					/>
				)}
			/>
		</View>
	);
}
