import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from '../../src/providers/AuthProvider';

export default function Profile() {
	const { user, signOutUser } = useAuth();
	return (
		<View style={{ flex: 1, padding: 16, gap: 12 }}>
			<Text variant="headlineMedium">Profile</Text>
			<Text>{user?.email}</Text>
			<Button mode="contained" onPress={signOutUser}>Sign out</Button>
		</View>
	);
}
