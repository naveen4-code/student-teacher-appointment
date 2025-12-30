import { db } from "./firebase.js";
import { logAction } from "./logger.js";
import { collection, getDocs, addDoc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const snap = await getDocs(collection(db, "teachers"));
snap.forEach(d => {
  list.innerHTML += `<li>${d.data().name}
    <button onclick="book('${d.id}')">Book</button></li>`;
});
window.book = async (tid) => {
  await addDoc(collection(db, "appointments"), {
    teacherId: tid,
    status: "Pending"
  });
  logAction("student", "student", "Booked appointment");
};