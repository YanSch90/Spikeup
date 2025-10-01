export type UserRole = 'admin' | 'club' | 'player';

export interface UserProfile {
	uid: string;
	email: string;
	role: UserRole;
	displayName?: string;
	rating?: number;
}

export interface Court {
	id: string;
	clubId: string;
	name: string;
	location: { lat: number; lng: number; address?: string };
	pricePerHour: number;
	amenities?: string[];
	active: boolean;
}

export interface Booking {
	id: string;
	courtId: string;
	playerId: string;
	startTime: number;
	endTime: number;
	status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
	paymentIntentId?: string;
}

export interface Match {
	id: string;
	title: string;
	dateTime: number;
	clubId?: string;
	courtId?: string;
	maxPlayers: number;
	isPaid: boolean;
	price?: number;
}
