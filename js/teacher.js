import { db } from "./firebase.js";
import { logAction } from "./logger.js";
import { collection, getDocs, updateDoc, doc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const snap = await getDocs(collection(db, "appointments"));
snap.forEach(d => {
  apps.innerHTML += `<li>${d.id}
    <button onclick="approve('${d.id}')">Approve</button></li>`;
});
window.approve = async (id) => {
  await updateDoc(doc(db, "appointments", id), { status: "Approved" });
  logAction("teacher", "teacher", "Approved appointment");
};
