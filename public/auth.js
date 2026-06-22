// Signup Logic
function signup() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.email === email)) {
        alert("Email already registered!");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    window.location.href = "login.html";
}

// Login Logic
function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Check if admin
        if (email === "admin@gmail.com") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        alert("Invalid credentials!");
    }
}
// Sign up
function signupFirebase() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const name = document.getElementById("name")?.value.trim();

  if (!email || !password || (name === undefined ? false : !name)) {
    return alert("All fields are required");
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCred => {
      const user = userCred.user;
      return user.updateProfile({ displayName: name });
    })
    .then(() => {
      alert("Signed up!");
      window.location.href = "login.html";
    })
    .catch(e => alert(e.message));
}
// Login
function loginFirebase() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCred => {
      const user = userCred.user;
      if (user.email === "admin@gmail.com") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "index.html";
      }
    })
    .catch(e => alert(e.message));
}
auth.onAuthStateChanged(user => {
  const ua = document.getElementById("userArea");
  if (user) {
    ua.innerHTML = `Welcome, ${user.displayName || user.email}! <button onclick="logout()">Logout</button>`;
  } else {
    ua.innerHTML = `<a href="login.html">Login</a>`;
  }
});
function logout() {
  auth.signOut().then(() => location.reload());
}
