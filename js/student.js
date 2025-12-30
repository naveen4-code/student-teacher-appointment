import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }
  const uid = user.uid;
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    alert("Student record not found");
    return;
  }
  const s = snap.data();
  document.getElementById("studentInfo").innerHTML = `
    <h2>Welcome, ${s.name}</h2>
    <p>Roll No: ${s.rollNo}</p>
    <p>Class: ${s.class} - ${s.section}</p>
  `;
  const list = document.getElementById("teacherList");
  list.innerHTML = "";
  const teachers = await getDocs(collection(db, "users"));
  teachers.forEach(d => {
    const t = d.data();
    if (t.role === "teacher") {
      list.innerHTML += `
        <div>
          <strong>${t.name}</strong> (${t.department})
          <button onclick="book('${d.id}')">Book</button>
        </div>`;
    }
  });
  window.book = async function (teacherId) {
    await addDoc(collection(db, "appointments"), {
      studentId: uid,
      teacherId,
      status: "Pending",
      createdAt: new Date()
    });
    alert("Appointment requested");
  };
});