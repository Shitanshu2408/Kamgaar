// Firebase CDN imports (IMPORTANT)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config (SAFE to expose on frontend)
const firebaseConfig = {
  apiKey: "AIzaSyBfle1FfGC8kF219fecMrgvcWly3Og7KQE",
  authDomain: "kamgaar1.firebaseapp.com",
  projectId: "kamgaar1",
  storageBucket: "kamgaar1.firebasestorage.app",
  messagingSenderId: "166684238888",
  appId: "1:166684238888:web:78ed983d964bac8847c11d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// GLOBAL VARIABLES
let selectedRole = null;
let confirmationResult;

window.selectRole = function (role) {
  selectedRole = role;
  alert("Selected role: " + role);
};

window.googleLogin = function () {
  if (!selectedRole) {
    alert("Please select Contractor or Worker first");
    return;
  }

  signInWithPopup(auth, provider)
    .then(() => {
      redirectUser();
    })
    .catch((error) => {
      alert(error.message);
    });
};


window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "normal"
  }
);

window.sendOTP = function () {
  if (!selectedRole) {
    alert("Select role first");
    return;
  }

  const phone = document.getElementById("phone").value;

  signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP sent");
    })
    .catch((error) => {
      alert(error.message);
    });
};

window.verifyOTP = function () {
  const otp = document.getElementById("otp").value;

  confirmationResult
    .confirm(otp)
    .then(() => {
      redirectUser();
    })
    .catch(() => {
      alert("Invalid OTP");
    });
};


function redirectUser() {
  if (selectedRole === "contractor") {
    window.location.href = "dashboard/contractor-dashboard.html";
  } else {
    window.location.href = "dashboard/worker-dashboard.html";
  }
}
