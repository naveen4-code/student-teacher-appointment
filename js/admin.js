import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  setDoc,
  doc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.addTeacher = async function () {
  const name = document.getElementById("tname").value;
  const dept = document.getElementById("dept").value;
  const email = document.getElementById("temail").value;
  const pass = document.getElementById("tpass").value;

  if (!name || !dept || !email || !pass) {
    alert("All fields required");
    return;
  }
  const res = await createUserWithEmailAndPassword(auth, email, pass);

  await setDoc(doc(db, "users", res.user.uid), {
    role: "teacher",
    name,
    department: dept,
    email
  });

  alert("Teacher added");
  loadTeachers();
};
async function loadTeachers() {
  const table = document.getElementById("teacherTable");
  table.innerHTML = "";

  const snap = await getDocs(collection(db, "users"));

  snap.forEach(docu => {
    const d = docu.data();
    if (d.role === "teacher") {
      table.innerHTML += `
        <tr>
          <td>${d.name}</td>
          <td>${d.department}</td>
          <td>${d.email}</td>
        </tr>`;
    }
  });
}
loadTeachers();