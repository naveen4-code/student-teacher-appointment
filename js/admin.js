import { db } from "./firebase.js";
import { logAction } from "./logger.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
async function addTeacher() {
  const name = tname.value;
  const dept = dept.value;
  const subject = sub.value;

  await addDoc(collection(db, "teachers"), { name, dept, subject });
  logAction("admin", "admin", "Added teacher");
  loadTeachers();
}
async function loadTeachers() {
  teachers.innerHTML = "";
  const snap = await getDocs(collection(db, "teachers"));
  snap.forEach(d => {
    teachers.innerHTML += `<li>${d.data().name}
      <button onclick="deleteTeacher('${d.id}')">Delete</button></li>`;
  });
}
async function deleteTeacher(id) {
  await deleteDoc(doc(db, "teachers", id));
  logAction("admin", "admin", "Deleted teacher");
  loadTeachers();
}
loadTeachers();
window.addTeacher = addTeacher;
window.deleteTeacher = deleteTeacher;
