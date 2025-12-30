import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================= LOGIN ================= */
window.loginUser = async () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const roleSelect = document.getElementById("role");

  const email = emailInput.value;
  const password = passwordInput.value;
  const role = roleSelect.value;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", res.user.uid));

    if (!snap.exists()) {
      alert("User data not found");
      return;
    }

    if (snap.data().role !== role) {
      alert("Role mismatch");
      return;
    }

    window.location.href = `${role}.html`;
  } catch (err) {
    alert(err.message);
  }
};

/* ================= REGISTER ================= */
window.registerStudent = async () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      email,
      role: "student",
      approved: true
    });

    alert("Registration successful! Please login.");
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
};
