import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyALidht8jvl-4ENHkF7iCxIkQatqcbIEsA",
    authDomain: "curso-837bb.firebaseapp.com",
    projectId: "curso-837bb",
    storageBucket: "curso-837bb.appspot.com",
    messagingSenderId: "686047411594",
    appId: "1:686047411594:web:b32996e73ec462e1e85c73",
    measurementId: "G-1EFLM4PVC6"
  };

const firebaseapp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)

export {db, auth}