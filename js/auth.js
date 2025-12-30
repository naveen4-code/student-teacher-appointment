window.registerStudent = async () => {
  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const cls = document.getElementById("class").value;
  const section = document.getElementById("section").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !roll || !cls || !section || !email || !password) {
    alert("All fields are required");
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      role: "student",
      name,
      rollNo: roll,
      class: cls,
      section,
      email,
      approved: true
    });

    alert("Student registered successfully");
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
};
