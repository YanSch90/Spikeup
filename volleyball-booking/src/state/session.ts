import { proxy, useSnapshot } from 'valtio';
import { UserProfile, UserRole } from '../types/models';

export const sessionState = proxy<{ profile?: UserProfile; role: UserRole | null }>({
	profile: undefined,
	role: null
});

export function useSession() { return useSnapshot(sessionState); }
