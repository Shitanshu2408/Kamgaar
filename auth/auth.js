// ==============================
// FIREBASE IMPORTS (CDN)
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ==============================
// FIREBASE CONFIG
// ==============================
const firebaseConfig = {
  apiKey: "AIzaSyBfle1FfGC8kF219fecMrgvcWly3Og7KQE",
  authDomain: "kamgaar1.firebaseapp.com",
  projectId: "kamgaar1",
  storageBucket: "kamgaar1.firebasestorage.app",
  messagingSenderId: "166684238888",
  appId: "1:166684238888:web:78ed983d964bac8847c11d"
};

// ==============================
// INIT
// ==============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ==============================
// GLOBAL STATE
// ==============================
let selectedRole = null;
let confirmationResult = null;

// ==============================
// reCAPTCHA (INIT ONCE)
// ==============================
window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  { size: "normal" }
);

// ==============================
// SAVE USER TO FIRESTORE
// ==============================
async function saveUserRole(role) {
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(doc(db, "users", user.uid), {
    role: role,
    name: user.displayName || "",
    email: user.email || "",
    phone: user.phoneNumber || "",
    createdAt: serverTimestamp()
  });
}

// ==============================
// GOOGLE LOGIN
// ==============================
window.startLogin = function (role, method) {
  selectedRole = role;

  if (method === "google") {
    signInWithPopup(auth, provider)
      .then(async () => {
        await saveUserRole(selectedRole);
        redirectUser();
      })
      .catch(err => alert(err.message));
  }
};

// ==============================
// SEND OTP
// ==============================
window.sendOTP = function (role) {
  selectedRole = role;

  const phoneInput = document.getElementById(`${role}-phone`);
  if (!phoneInput.value) {
    alert("Enter phone number");
    return;
  }

  signInWithPhoneNumber(
    auth,
    phoneInput.value,
    window.recaptchaVerifier
  )
    .then(result => {
      confirmationResult = result;
      alert("OTP sent");
    })
    .catch(err => alert(err.message));
};

// ==============================
// VERIFY OTP
// ==============================
window.verifyOTP = function (role) {
  selectedRole = role;

  const otpInput = document.getElementById(`${role}-otp`);
  if (!otpInput.value) {
    alert("Enter OTP");
    return;
  }

  confirmationResult.confirm(otpInput.value)
    .then(async () => {
      await saveUserRole(selectedRole);
      redirectUser();
    })
    .catch(() => alert("Invalid OTP"));
};

// ==============================
// REDIRECT BASED ON ROLE
// ==============================
function redirectUser() {
  if (selectedRole === "contractor") {
    window.location.href = "/dashboard/contractor-dashboard.html";
  } else if (selectedRole === "worker") {
    window.location.href = "/dashboard/worker-dashboard.html";
  } else {
    alert("Role not selected");
  }
}
