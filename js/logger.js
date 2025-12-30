import { db } from "./firebase.js";
import { collection, addDoc, Timestamp } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export async function logAction(user, role, action) {
  console.log(`[${role}] ${action}`);
  await addDoc(collection(db, "logs"), {
    user,
    role,
    action,
    time: Timestamp.now()
  });
}