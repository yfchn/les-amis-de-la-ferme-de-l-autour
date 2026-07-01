import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBiKzEsMcem8vZA_MiQm69aflpS-vdr2X0",
    authDomain: "amis-de-la-ferme-de-l-autour.firebaseapp.com",
    projectId: "amis-de-la-ferme-de-l-autour",
    storageBucket: "amis-de-la-ferme-de-l-autour.firebasestorage.app",
    messagingSenderId: "975414052478",
    appId: "1:975414052478:web:7a0be8865509584485fa2f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
};