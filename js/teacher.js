import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("list");
const snap = await getDocs(collection(db, "appointments"));

snap.forEach(d => {
  list.innerHTML += `
  <div>${d.id} - ${d.data().status}
  <button onclick="approve('${d.id}')">Approve</button></div>`;
});

window.approve = async (id) => {
  await updateDoc(doc(db, "appointments", id), { status: "Approved" });
  alert("Approved");
};
