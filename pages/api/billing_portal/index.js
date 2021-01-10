import Stripe from "stripe";
import { getPayments } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const data = await getPayments(uid);
    const portalsession = await stripe.billingPortal.sessions.create({
      customer: data.customerId,
      return_url: "https://fast-feedback-dev.vercel.app/account",
      // return_url: `${req.headers.origin}/account`,
    });
    res.status(200).json({ url: portalsession.url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
