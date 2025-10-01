import { View } from 'react-native';
import { Button, TextInput, SegmentedButtons } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../src/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<'player'|'club'>('player');

	const onRegister = async () => {
		const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
		await setDoc(doc(db, 'users', cred.user.uid), { role, email, createdAt: Date.now() });
		router.replace('/(tabs)');
	};

	return (
		<View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 12 }}>
			<TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
			<TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
			<SegmentedButtons
				value={role}
				onValueChange={v => setRole(v as any)}
				buttons={[{value:'player', label:'Player'},{value:'club', label:'Club'}]}
			/>
			<Button mode="contained" onPress={onRegister}>Sign up</Button>
		</View>
	);
}
