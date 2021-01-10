import { db } from "./firebase-admin";
import { compareDesc, parseISO } from "date-fns";

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(userId) {
  let snapshot;
  if (userId) {
    snapshot = await db
      .collection("sites")
      .where("authorId", "==", userId)
      .get();
  } else {
    snapshot = await db.collection("sites").get();
  }
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };
}

export async function getUserFeedback(uid) {
  const snapshot = await db
    .collection("feedback")
    .where("authorId", "==", uid)
    .get();
  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}
export async function createCheckout(data, uid) {
  try {
    const Ref = db.collection("payments");
    const doc = await Ref.doc(uid).get();
    const snapshot = await Ref.where("sessionId", "==", data.sessionId).get();
    if (doc.exists) {
      return { error: "Already Subscribed" };
    } else if (snapshot.empty === false) {
      return { error: "Incorrect Session ID." };
    } else {
      db.collection("payments").doc(uid).set(data);
      return { message: "Payment was successful" };
    }
  } catch (error) {
    return { error };
  }
}
export async function getPayments(uid) {
  try {
    const Ref = db.collection("payments");
    const doc = await Ref.doc(uid).get();
    return { ...doc.data() };
  } catch (error) {
    return { error };
  }
}
