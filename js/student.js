import { db } from "./firebase.js";
import { collection, getDocs, addDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("list");
const snap = await getDocs(collection(db, "teachers"));

snap.forEach(d => {
  list.innerHTML += `
    <div>${d.data().name}
    <button onclick="book('${d.id}')">Book</button></div>`;
});

window.book = async (id) => {
  await addDoc(collection(db, "appointments"), {
    teacherId: id,
    status: "Pending"
  });
  alert("Appointment requested");
};
