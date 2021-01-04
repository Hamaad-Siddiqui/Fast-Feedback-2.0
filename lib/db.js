import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
export function createSite(data) {
  const site = firestore.collection("sites").doc();
  site.set(data);
  return site;
}
export function createFeedback(data) {
  firestore.collection("feedback").add(data);
}
export function deleteFeedback(id) {
  firestore.collection("feedback").doc(id).delete();
}
