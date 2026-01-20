const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

/* ==========================
   LOAD THEME (DEFAULT = DARK)
========================== */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light-mode");
  toggleBtn.innerText = "🌙"; // switch to dark
} else {
  // default dark mode
  body.classList.remove("light-mode");
  toggleBtn.innerText = "☀️"; // switch to light
}

/* ==========================
   TOGGLE THEME
========================== */
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    toggleBtn.innerText = "🌙";
  } else {
    localStorage.setItem("theme", "dark");
    toggleBtn.innerText = "☀️";
  }
});
