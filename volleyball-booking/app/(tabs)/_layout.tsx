import { Tabs } from 'expo-router';
import { useRole } from '../../src/providers/RoleGate';
import { Appbar } from 'react-native-paper';

export default function TabsLayout() {
	const role = useRole();
	return (
		<Tabs screenOptions={{ header: (props) => <Appbar.Header><Appbar.Content title={props.route.name} /></Appbar.Header> }}>
			<Tabs.Screen name="courts" options={{ title: 'Courts' }} />
			<Tabs.Screen name="matches" options={{ title: 'Matches' }} />
			<Tabs.Screen name="chat" options={{ title: 'Chat' }} />
			<Tabs.Screen name="profile" options={{ title: 'Profile' }} />
			{role === 'club' && <Tabs.Screen name="club/index" options={{ title: 'Club' }} />}
			{role === 'admin' && <Tabs.Screen name="admin/index" options={{ title: 'Admin' }} />}
		</Tabs>
	);
}
