import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBfle1FfGC8kF219fecMrgvcWly3Og7KQE",
  authDomain: "kamgaar1.firebaseapp.com",
  projectId: "kamgaar1",
  storageBucket: "kamgaar1.firebasestorage.app",
  messagingSenderId: "166684238888",
  appId: "1:166684238888:web:78ed983d964bac8847c11d"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) {
    console.error("Logout button not found");
    return;
  }

  // Disable until auth confirmed
  logoutBtn.disabled = true;

  // Auth guard + enable button
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "/auth/login.html";
    } else {
      logoutBtn.disabled = false;
    }
  });

  // Logout click
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "/auth/login.html";
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  });
});
