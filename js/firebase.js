import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
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
export const auth = getAuth(app);

export const db = getFirestore(app);

export {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc
};

export {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  onAuthStateChanged
};

function eventDocRef(eventId) {
  return doc(db, "events", String(eventId));
}

function histoDocRef(histoId) {
  return doc(db, "histo", String(histoId));
}

function membreDocRef(membreId) {
  return doc(db, "membres", String(membreId));
}

function adhesionDocRef(adhesionId) {
  return doc(db, "adhesions", String(adhesionId));
}

function galerieDocRef(galerieId) {
  return doc(db, "galerie", String(galerieId));
}

function contactDocRef() {
  return doc(db, "settings", "contact");
}

function textesDocRef() {
  return doc(db, "settings", "textes");
}

function histoFirestoreData(item) {
  const data = {
    id: item.id,
    date: item.date,
    titre: item.titre,
    desc: item.desc,
    type: item.type,
    gold: item.gold
  };

  if (Object.prototype.hasOwnProperty.call(item, "photo")) {
    data.photo = item.photo;
  }

  return data;
}

function membreFirestoreData(membre) {
  return {
    id: membre.id,
    prenom: membre.prenom,
    nom: membre.nom,
    role: membre.role,
    disc: membre.disc,
    pres: membre.pres
  };
}

function adhesionFirestoreData(adhesion) {
  return {
    id: adhesion.id,
    nom: adhesion.nom,
    prix: adhesion.prix,
    lien: adhesion.lien,
    desc: adhesion.desc
  };
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

export async function loadHisto() {
  try {
    const snap = await getDocs(collection(db, "histo"));

    return snap.docs
      .map(function(documentSnapshot) {
        const item = documentSnapshot.data();

        const histo = {
          id: item.id,
          date: item.date,
          titre: item.titre,
          desc: item.desc,
          type: item.type,
          gold: item.gold
        };

        if (Object.prototype.hasOwnProperty.call(item, "photo")) {
          histo.photo = item.photo;
        }

        return histo;
      })
      .sort(function(a, b) {
        return Number(a.id || 0) - Number(b.id || 0);
      });
  } catch (error) {
    console.error("Impossible de charger l'historique Firestore.", error);
    return null;
  }
}

export async function saveHistoItem(item) {
  try {
    await setDoc(histoDocRef(item.id), histoFirestoreData(item));
  } catch (error) {
    console.error("Impossible d'enregistrer l'historique Firestore.", error);
  }
}

export async function deleteHistoItem(histoId) {
  try {
    await deleteDoc(histoDocRef(histoId));
  } catch (error) {
    console.error("Impossible de supprimer l'historique Firestore.", error);
  }
}

export async function loadGalerie() {
  try {
    const snap = await getDocs(collection(db, "galerie"));

    return snap.docs
      .map(function(documentSnapshot) {
        const galerie = documentSnapshot.data();

        return {
          id: galerie.id,
          url: galerie.url,
          leg: galerie.leg
        };
      })
      .sort(function(a, b) {
        return Number(a.id || 0) - Number(b.id || 0);
      });
  } catch (error) {
    console.error("Impossible de charger la galerie Firestore.", error);
    return null;
  }
}

export async function saveGalerieEntry(galerie) {
  try {
    await setDoc(galerieDocRef(galerie.id), galerie);
  } catch (error) {
    console.error("Impossible d'enregistrer la galerie Firestore.", error);
  }
}

export async function deleteGalerieEntry(galerieId) {
  try {
    await deleteDoc(galerieDocRef(galerieId));
  } catch (error) {
    console.error("Impossible de supprimer la galerie Firestore.", error);
  }
}

export async function loadMembres() {
  try {
    const snap = await getDocs(collection(db, "membres"));

    return snap.docs
      .map(function(documentSnapshot) {
        const membre = documentSnapshot.data();

        return {
          id: membre.id,
          prenom: membre.prenom,
          nom: membre.nom,
          role: membre.role,
          disc: membre.disc,
          pres: membre.pres
        };
      })
      .sort(function(a, b) {
        return Number(a.id || 0) - Number(b.id || 0);
      });
  } catch (error) {
    console.error("Impossible de charger les membres Firestore.", error);
    return null;
  }
}

export async function saveMembre(membre) {
  try {
    await setDoc(membreDocRef(membre.id), membreFirestoreData(membre));
  } catch (error) {
    console.error("Impossible d'enregistrer le membre Firestore.", error);
  }
}

export async function deleteMembre(membreId) {
  try {
    await deleteDoc(membreDocRef(membreId));
  } catch (error) {
    console.error("Impossible de supprimer le membre Firestore.", error);
  }
}

export async function loadAdhesions() {
  try {
    const snap = await getDocs(collection(db, "adhesions"));

    return snap.docs
      .map(function(documentSnapshot) {
        const adhesion = documentSnapshot.data();

        return {
          id: adhesion.id,
          nom: adhesion.nom,
          prix: adhesion.prix,
          lien: adhesion.lien,
          desc: adhesion.desc
        };
      })
      .sort(function(a, b) {
        return Number(a.id || 0) - Number(b.id || 0);
      });
  } catch (error) {
    console.error("Impossible de charger les adhesions Firestore.", error);
    return null;
  }
}

export async function saveAdhesion(adhesion) {
  try {
    await setDoc(adhesionDocRef(adhesion.id), adhesionFirestoreData(adhesion));
  } catch (error) {
    console.error("Impossible d'enregistrer l'adhesion Firestore.", error);
  }
}

export async function deleteAdhesion(adhesionId) {
  try {
    await deleteDoc(adhesionDocRef(adhesionId));
  } catch (error) {
    console.error("Impossible de supprimer l'adhesion Firestore.", error);
  }
}

export async function loadContact() {
  try {
    const snap = await getDoc(contactDocRef());

    if (!snap.exists()) {
      return undefined;
    }

    return snap.data();
  } catch (error) {
    console.error("Impossible de charger le contact Firestore.", error);
    return null;
  }
}

export async function saveContact(contact) {
  try {
    await setDoc(contactDocRef(), contact);
  } catch (error) {
    console.error("Impossible d'enregistrer le contact Firestore.", error);
  }
}

export async function loadTextes() {
  try {
    const snap = await getDoc(textesDocRef());

    if (!snap.exists()) {
      return undefined;
    }

    return snap.data();
  } catch (error) {
    console.error("Impossible de charger les textes Firestore.", error);
    return null;
  }
}

export async function saveTextes(textes) {
  try {
    await setDoc(textesDocRef(), textes);
  } catch (error) {
    console.error("Impossible d'enregistrer les textes Firestore.", error);
  }
}

export const firestore = {
  loadEvents,
  saveEvent,
  updateEvent,
  deleteEvent,
  loadHisto,
  saveHistoItem,
  deleteHistoItem,
  loadGalerie,
  saveGalerieEntry,
  deleteGalerieEntry,
  loadMembres,
  saveMembre,
  deleteMembre,
  loadAdhesions,
  saveAdhesion,
  deleteAdhesion,
  loadContact,
  saveContact,
  loadTextes,
  saveTextes
};
