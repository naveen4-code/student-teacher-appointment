import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }
  const teacherId = user.uid;
  const list = document.getElementById("appointmentList");
  list.innerHTML = "";
  const q = query(
    collection(db, "appointments"),
    where("teacherId", "==", teacherId)
  );
  const snap = await getDocs(q);
  if (snap.empty) {
    list.innerHTML = "<p>No appointments yet</p>";
    return;
  }
  for (const d of snap.docs) {
    const app = d.data();
    const studentSnap = await getDoc(doc(db, "users", app.studentId));
    const student = studentSnap.data();
    list.innerHTML += `
      <div class="list-item">
        <p><strong>Student:</strong> ${student.name}</p>
        <p>Roll No: ${student.rollNo}</p>
        <p>Class: ${student.class} - ${student.section}</p>
        <p>Status: <strong>${app.status}</strong></p>
        ${
          app.status === "Pending"
            ? `<button onclick="approve('${d.id}')">Approve</button>`
            : `<span>✔ Approved</span>`
        }
      </div>
    `;
  }
  window.approve = async (id) => {
    await updateDoc(doc(db, "appointments", id), {
      status: "Approved"
    });
    alert("Appointment approved");
    location.reload();
  };
});
