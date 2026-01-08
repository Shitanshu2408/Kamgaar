// Future ready file
// Can be used to dynamically load worker data later
const passportList = document.querySelector(".passport-list");

const workers = [
  { name: "Ramesh Patil" },
  { name: "Suresh Yadav"},
  { name: "Imran Khan", },
  { name: "Vijay Shinde"},
  { name: "Akash Verma"},
  { name: "Rahul Jadhav"},
  { name: "Mohit Singh"},
  { name: "Salman Sheikh"},
  { name: "Amit Kulkarni" },
  { name: "Deepak Pawar"}
];

const summaries = [
  "Certified heavy equipment operator with strong site discipline",
  "Reliable operator experienced in infrastructure projects",
  "Skilled technician with zero incident safety record",
  "Senior operator handling complex construction machines",
  "Trained helper progressing steadily with discipline"
];

const skills = [
  "Excavator, Crane, Forklift",
  "Backhoe, Loader, Safety",
  "Forklift, Maintenance",
  "Crane, Rigging",
  "Excavator, Site Support"
];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stars(r) {
  return "⭐".repeat(r) + "☆".repeat(5 - r);
}

passportList.innerHTML = "";

workers.forEach(worker => {
  const years = rand(1, 9);
  const days = rand(80, 600);
  const rating = rand(3, 5);
  const level = rand(1, 4);
  const summary = summaries[rand(0, summaries.length - 1)];
  const skill = skills[rand(0, skills.length - 1)];

  passportList.innerHTML += `
    <div class="passport-card">
      <img src="" class="avatar">
      <div class="passport-info">
        <h3>${worker.name}</h3>
        <p class="summary">${summary}</p>
        <p><strong>Experience:</strong> ${years} years | ${days} working days</p>
        <p><strong>Skills:</strong> ${skill}</p>
        <div class="performance">
          ${stars(rating)}
          <span class="level">Level ${level}</span>
        </div>
        <div class="verified">Verified by Kamgaar</div>
        <button class="view-btn"
          onclick="viewDetails('${worker.name}','${summary}','${skill}','${years}','${days}','${rating}','${level}','${worker.img}')">
          View Detailed Passport
        </button>
      </div>
    </div>
  `;
});

function viewDetails(name, summary, skills, years, days, rating, level, img) {
  const url = `worker-detail.html?name=${encodeURIComponent(name)}
  &summary=${encodeURIComponent(summary)}
  &skills=${encodeURIComponent(skills)}
  &years=${years}&days=${days}
  &rating=${rating}&level=${level}&img=${img}`;
  window.location.href = url;
}
