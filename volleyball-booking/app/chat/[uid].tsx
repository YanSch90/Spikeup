import { useEffect, useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../../src/lib/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../src/providers/AuthProvider';

export default function DirectChat() {
	const { uid } = useLocalSearchParams<{ uid: string }>();
	const { user } = useAuth();
	const [text, setText] = useState('');
	const [messages, setMessages] = useState<any[]>([]);
	const chatId = useMemo(() => [String(uid), user?.uid].sort().join('_'), [uid, user?.uid]);
	const messagesRef = useMemo(() => collection(db, 'chats', chatId, 'messages'), [chatId]);

	useEffect(() => {
		const q = query(messagesRef, orderBy('createdAt', 'asc'));
		const unsub = onSnapshot(q, (snap) => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
		return () => unsub();
	}, [messagesRef]);

	const send = async () => {
		if (!text.trim()) return;
		await addDoc(messagesRef, { text: text.trim(), senderId: user?.uid, createdAt: serverTimestamp() });
		setText('');
	};

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				contentContainerStyle={{ padding: 12 }}
				data={messages}
				keyExtractor={(i) => i.id}
				renderItem={({ item }) => (
					<View style={{ marginVertical: 6 }}>
						<Text>{item.senderId === user?.uid ? 'Me' : item.senderId}: {item.text}</Text>
					</View>
				)}
			/>
			<View style={{ padding: 12, flexDirection: 'row', gap: 8 }}>
				<TextInput style={{ flex: 1 }} value={text} onChangeText={setText} placeholder="Message" />
				<Button mode="contained" onPress={send}>Send</Button>
			</View>
		</View>
	);
}
