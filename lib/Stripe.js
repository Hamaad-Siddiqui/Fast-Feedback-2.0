import getStripe from "@/utils/stripe";
import poster from "@/utils/poster";
import fetcher from "@/utils/fetcher";

export const createCheckout = async () => {
  const response = await poster("/api/checkout_session");
  if (response.status === 500) {
    console.error(response.message);
    return;
  }
  const stripe = await getStripe();
  const { error } = await stripe.redirectToCheckout({
    sessionId: response.id,
  });
  console.warn(error.message);
};
export const goToBillingPortal = async (token) => {
  const response = await fetcher("/api/billing_portal", token).then((data) => {
    window.location.href = data.url;
  });
  if (response?.status === 500) {
    console.error(response.message);
    return;
  }
};
