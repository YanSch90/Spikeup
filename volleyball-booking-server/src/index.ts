import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Stripe from 'stripe';

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

app.post('/create-payment-intent', async (req, res) => {
	const { amount, currency, metadata } = req.body as { amount: number; currency: string; metadata?: any };
	try {
		const pi = await stripe.paymentIntents.create({ amount, currency, metadata, automatic_payment_methods: { enabled: true } });
		res.json({ clientSecret: pi.client_secret });
	} catch (e: any) {
		res.status(400).json({ error: e.message });
	}
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Server running on :${port}`));
