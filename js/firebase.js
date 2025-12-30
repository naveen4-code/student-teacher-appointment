import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCow7Qd_dH_vLEpyyn1S2W9blh_-w7SgOE",
  authDomain: "student-teacher-appointm-8a95e.firebaseapp.com",
  projectId: "student-teacher-appointm-8a95e",
  storageBucket: "student-teacher-appointm-8a95e.firebasestorage.app",
  messagingSenderId: "1079028108312",
  appId: "1:1079028108312:web:0effd22514a3388441076d"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
