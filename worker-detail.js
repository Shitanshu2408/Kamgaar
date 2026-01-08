const params = new URLSearchParams(window.location.search);

document.getElementById("name").innerText = params.get("name");
document.getElementById("summary").innerText = params.get("summary");
document.getElementById("experience").innerText =
  `${params.get("years")} years | ${params.get("days")} working days`;
document.getElementById("skills").innerText = params.get("skills");
document.getElementById("rating").innerText = "⭐".repeat(params.get("rating"));
document.getElementById("level").innerText = `Level ${params.get("level")}`;

