import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { sessionState } from '../state/session';
import type { UserProfile } from '../types/models';

type Ctx = { user: User | null; profile?: UserProfile; signOutUser: () => Promise<void>; };
const Ctx = createContext<Ctx>({ user: null, signOutUser: async () => {} });
export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<UserProfile | undefined>(undefined);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (u) => {
			setUser(u);
			if (u) {
				const snap = await getDoc(doc(db, 'users', u.uid));
				const p = snap.exists() ? ({ uid: u.uid, ...(snap.data() as any) }) : undefined;
				setProfile(p as any);
				sessionState.profile = p as any;
				sessionState.role = (p?.role ?? null) as any;
			} else {
				setProfile(undefined);
				sessionState.profile = undefined;
				sessionState.role = null;
			}
		});
		return () => unsub();
	}, []);

	return <Ctx.Provider value={{ user, profile, signOutUser: () => signOut(auth) }}>{children}</Ctx.Provider>;
}
export function useAuth() { return useContext(Ctx); }
