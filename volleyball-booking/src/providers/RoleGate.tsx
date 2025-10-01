import { useAuth } from './AuthProvider';
import { sessionState } from '../state/session';
import type { UserRole } from '../types/models';

export function useRole(): UserRole | null {
	void useAuth();
	return sessionState.role;
}
