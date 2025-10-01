# Volleyball Booking App (Expo + Firebase + Stripe)

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps and start the app:

```bash
npm install
npm run start
```

## Backend (Stripe)
In `../volleyball-booking-server`:

```bash
npm install
cp .env.example .env # add STRIPE_SECRET_KEY
npm run dev
```

## Features
- Auth (Firebase)
- Courts list & Matches list
- Match chat (Firestore)
- Role-based tabs (Admin/Club/Player)
- Stripe PaymentIntent backend scaffold
