import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../src/providers/AuthProvider';
import { PaymentsProvider } from '../src/lib/payments';

export default function RootLayout() {
	return (
		<AuthProvider>
			<PaymentsProvider>
				<PaperProvider>
					<Stack screenOptions={{ headerShown: false }} />
				</PaperProvider>
			</PaymentsProvider>
		</AuthProvider>
	);
}
