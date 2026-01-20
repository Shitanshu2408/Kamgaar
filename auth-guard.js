import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// 🔁 SAME Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBfle1FfGC8kF219fecMrgvcWly3Og7KQE",
  authDomain: "kamgaar1.firebaseapp.com",
  projectId: "kamgaar1",
  storageBucket: "kamgaar1.firebasestorage.app",
  messagingSenderId: "166684238888",
  appId: "1:166684238888:web:78ed983d964bac8847c11d"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  // 🚫 Not logged in
  if (!user) {
    window.location.href = "/login.html";
    return;
  }

  // 🔎 Fetch role
  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) {
    console.error("User document not found");
    return;
  }

  const role = snap.data().role;

  // 🔁 Redirect to correct dashboard
  if (role === "contractor") {
    if (!window.location.pathname.includes("contractor-dashboard")) {
      window.location.href = "/dashboard/contractor-dashboard.html";
    }
  } else if (role === "worker") {
    if (!window.location.pathname.includes("worker-dashboard")) {
      window.location.href = "/dashboard/worker-dashboard.html";
    }
  }
});
