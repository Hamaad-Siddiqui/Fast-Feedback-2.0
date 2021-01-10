import Stripe from "stripe";
import { createCheckout } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    if (!id.startsWith("cs_")) throw Error("Incorrect Session ID");
    const data = await stripe.checkout.sessions.retrieve(id, {
      expand: ["payment_intent"],
    });
    const receipt = {
      satus: data.payment_status,
      sessionId: data.id,
      customerId: data.customer,
      subscription: data.subscription,
      amount_total: data.amount_total,
      success_url: data.success_url,
      cancel_url: data.cancel_url,
    };
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const result = await createCheckout(receipt, uid);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
