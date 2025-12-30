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
window.loginUser = async function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const roleSelect = document.getElementById("role");

  if (!emailInput || !passwordInput || !roleSelect) {
    alert("Login form elements not found");
    return;
  }

  const email = emailInput.value;
  const password = passwordInput.value;
  const role = roleSelect.value;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", res.user.uid));

    if (!snap.exists()) {
      alert("User record not found");
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

/* ================= REGISTER STUDENT ================= */
window.registerStudent = async function () {
  const name = document.getElementById("name")?.value;
  const roll = document.getElementById("roll")?.value;
  const cls = document.getElementById("class")?.value;
  const section = document.getElementById("section")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!name || !roll || !cls || !section || !email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      role: "student",
      name,
      rollNo: roll,
      class: cls,
      section,
      email,
      approved: true
    });

    alert("Registration successful");
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
};
