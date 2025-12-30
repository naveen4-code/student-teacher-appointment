import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDocs,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
window.addTeacher = async function () {
  const nameEl = document.getElementById("tname");
  const deptEl = document.getElementById("dept");
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");
  if (!nameEl || !deptEl || !emailEl || !passEl) {
    alert("Form elements not found. Check input IDs.");
    return;
  }
  const name = nameEl.value.trim();
  const dept = deptEl.value.trim();
  const email = emailEl.value.trim();
  const password = passEl.value.trim();
  if (!name || !dept || !email || !password) {
    alert("Fill all fields");
    return;
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      name,
      department: dept,
      email,
      role: "teacher"
    });
    alert("Teacher added successfully");
    nameEl.value = "";
    deptEl.value = "";
    emailEl.value = "";
    passEl.value = "";
    loadTeachers();
  } catch (err) {
    alert(err.message);
  }
};
const table = document.getElementById("teacherTable");
async function loadTeachers() {
  table.innerHTML = "";
  const snap = await getDocs(collection(db, "users"));
  snap.forEach(d => {
    const t = d.data();
    if (t.role === "teacher") {
      table.innerHTML += `
        <tr>
          <td>${t.name}</td>
          <td>${t.department}</td>
          <td>${t.email}</td>
        </tr>`;
    }
  });
}
loadTeachers();