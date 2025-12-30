import { auth, db } from "./firebase.js";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export async function register(email, password, role) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    role,
    approved: role !== "student"
  });
}
