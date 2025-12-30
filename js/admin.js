import { db } from "./firebase.js";
import { collection, addDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.addTeacher = async () => {
  await addDoc(collection(db, "teachers"), {
    name: name.value,
    dept: dept.value
  });
  alert("Teacher added");
};
