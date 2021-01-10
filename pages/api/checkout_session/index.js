import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: "price_1I6zCDKQUcC8wJJxynxPKRhU",
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_period_days: 14,
        },
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/account`,
      };
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
