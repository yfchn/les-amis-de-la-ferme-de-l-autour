import {
  firestore,
  auth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  onAuthStateChanged
} from "./firebase.js";

window.firestore = firestore;
window.firebaseAuth = {
  auth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  onAuthStateChanged
};
