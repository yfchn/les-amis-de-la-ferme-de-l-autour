import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc
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
  deleteDoc,
  doc,
  setDoc
};

function eventDocRef(eventId) {
  return doc(db, "events", String(eventId));
}

export async function loadEvents() {
  try {
    const snap = await getDocs(collection(db, "events"));

    return snap.docs
      .map(function(documentSnapshot) {
        return documentSnapshot.data();
      })
      .sort(function(a, b) {
        return Number(a.id || 0) - Number(b.id || 0);
      });
  } catch (error) {
    console.error("Impossible de charger les evenements Firestore.", error);
    return [];
  }
}

export async function saveEvent(event) {
  try {
    await setDoc(eventDocRef(event.id), event);
  } catch (error) {
    console.error("Impossible d'enregistrer l'evenement Firestore.", error);
  }
}

export async function updateEvent(event) {
  try {
    await setDoc(eventDocRef(event.id), event, { merge: true });
  } catch (error) {
    console.error("Impossible de mettre a jour l'evenement Firestore.", error);
  }
}

export async function deleteEvent(eventId) {
  try {
    await deleteDoc(eventDocRef(eventId));
  } catch (error) {
    console.error("Impossible de supprimer l'evenement Firestore.", error);
  }
}

export const firestore = {
  loadEvents,
  saveEvent,
  updateEvent,
  deleteEvent
};
