import { Redirect } from 'expo-router';
import { auth } from '../src/lib/firebase';

export default function Index() {
	const user = auth.currentUser;
	return user ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />;
}
