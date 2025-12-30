import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  setDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.addTeacher = async () => {
  const name = tname.value;
  const dept = dept.value;
  const email = temail.value;
  const pass = tpass.value;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, pass);

    await setDoc(doc(db, "users", res.user.uid), {
      role: "teacher",
      name,
      department: dept,
      email
    });

    alert("Teacher account created");
  } catch (err) {
    alert(err.message);
  }
};
