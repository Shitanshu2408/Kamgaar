// Placeholder for future enhancements
// Example: clicking a job can redirect to login / apply page


const jobCards = document.querySelectorAll(".job-card");

function getRandomVacancies() {
  return Math.floor(Math.random() * 20) + 1; // 1–20 vacancies
}

function getRandomWeeks() {
  return Math.floor(Math.random() * 8) + 1; // 1–8 weeks
}

jobCards.forEach(card => {
  const role = card.getAttribute("data-role");
  const vacancies = getRandomVacancies();
  const weeks = getRandomWeeks();

  card.innerHTML = `
    <h3>${role}</h3>
    <div class="job-meta">
      <p><strong>Vacancies:</strong> ${vacancies}</p>
      <p><strong>Location:</strong> Bangalore</p>
      <p><strong>Time Period:</strong> ${weeks} week${weeks > 1 ? "s" : ""}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    alert("Please login to apply for this job.");
  });
});
