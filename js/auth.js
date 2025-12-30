import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
window.loginUser = async () => {
  const email = email.value;
  const password = password.value;
  const role = role.value;

  const res = await signInWithEmailAndPassword(auth, email, password);
  const snap = await getDoc(doc(db, "users", res.user.uid));

  if (snap.data().role !== role) return alert("Role mismatch");

  window.location.href = `${role}.html`;
};
window.registerStudent = async () => {
  const email = email.value;
  const password = password.value;

  const res = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", res.user.uid), {
    email,
    role: "student",
    approved: true
  });

  alert("Registered! Login now.");
  location.href = "index.html";
};