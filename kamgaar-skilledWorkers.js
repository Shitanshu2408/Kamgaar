const workerCards = document.querySelectorAll(".worker-card");

function getRandomWorkers() {
  return Math.floor(Math.random() * 15) + 1; // 1–15 workers
}

function getRandomWeeks() {
  return Math.floor(Math.random() * 8) + 1; // 1–8 weeks availability
}

workerCards.forEach(card => {
  const role = card.getAttribute("data-role");
  const workers = getRandomWorkers();
  const weeks = getRandomWeeks();

  card.innerHTML = `
    <h3>${role}</h3>
    <div class="worker-meta">
      <p><strong>Available Workers:</strong> ${workers}</p>
      <p><strong>Location:</strong> Bangalore</p>
      <p><strong>Availability:</strong> ${weeks} week${weeks > 1 ? "s" : ""}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    alert("Please login to hire workers.");
  });
});
