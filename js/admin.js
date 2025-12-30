import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.addTeacher = async function () {
  const nameInput = document.getElementById("tname");
  const deptInput = document.getElementById("dept");
  const emailInput = document.getElementById("temail");
  const passInput = document.getElementById("tpass");

  if (!nameInput || !deptInput || !emailInput || !passInput) {
    alert("Admin form fields missing");
    return;
  }

  const name = nameInput.value;
  const dept = deptInput.value;
  const email = emailInput.value;
  const password = passInput.value;

  if (!name || !dept || !email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      role: "teacher",
      name,
      department: dept,
      email
    });

    alert("Teacher account created successfully");

    nameInput.value = "";
    deptInput.value = "";
    emailInput.value = "";
    passInput.value = "";
  } catch (err) {
    alert(err.message);
  }
};
