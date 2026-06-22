const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const usersFile = path.join(__dirname, "users.json");

// Signup
app.post("/signup", (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  let users = fs.existsSync(usersFile) ? JSON.parse(fs.readFileSync(usersFile)) : [];
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already registered!" });
  }

  users.push({ username, email, password, role });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ message: "Signup successful!" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let users = fs.existsSync(usersFile) ? JSON.parse(fs.readFileSync(usersFile)) : [];

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: `Welcome, ${user.username}!`, role: user.role });
});

app.listen(PORT, () => console.log(`✅ Server running at http://127.0.0.1:${PORT}/auth.html`));
