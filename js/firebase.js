import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArFBokw4CrQwmAC8rMtCawdJoDlJ5Q2Fo",
  authDomain: "amis-de-la-ferme-de-lautour.firebaseapp.com",
  projectId: "amis-de-la-ferme-de-lautour",
  storageBucket: "amis-de-la-ferme-de-lautour.firebasestorage.app",
  messagingSenderId: "892215794436",
  appId: "1:892215794436:web:a241e31daab405aebf4e51"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc
};
export async function loadAppData() {
  const { getDoc, doc } = await import("https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js");

  const ref = doc(db, "settings", "appData");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  return null;
}

export async function saveAppData(data) {
  const { setDoc, doc } = await import("https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js");

  const ref = doc(db, "settings", "appData");
  await setDoc(ref, data);
}