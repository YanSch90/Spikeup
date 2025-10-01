import { View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/lib/firebase';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			await signInWithEmailAndPassword(auth, email.trim(), password);
			router.replace('/(tabs)');
		} catch (e) {
			console.warn(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 12 }}>
			<Text variant="headlineMedium">Welcome back</Text>
			<TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
			<TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
			<Button mode="contained" onPress={onLogin} loading={loading}>Log in</Button>
			<Button onPress={() => router.push('/(auth)/register')}>Create account</Button>
		</View>
	);
}
