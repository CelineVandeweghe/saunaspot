document.addEventListener("DOMContentLoaded", () => {
  // ⭐ Sterren-slider live bijwerken
  const slider = document.getElementById("sterren");
  const output = document.getElementById("sterren-waarde");

  function updateStars(val) {
    const filled = "★".repeat(val);
    const empty = "☆".repeat(5 - val);
    output.textContent = filled + empty;
  }

  updateStars(slider.value);

  slider.addEventListener("input", function () {
    updateStars(this.value);
  });

  // 📊 Sauna data
  const saunaData = [
    {
      naam: "Thermen Bussloo",
      locatie: "Voorst",
      coords: [52.2, 6.1],
      zwembad: true,
      massage: true,
      sterren: 5,
    },
    {
      naam: "SpaPuur",
      locatie: "Tilburg",
      coords: [51.56, 5.09],
      zwembad: false,
      massage: true,
      sterren: 4,
    },
    {
      naam: "Thermen Berendonck",
      locatie: "Wijchen",
      coords: [51.8, 5.7],
      zwembad: true,
      massage: true,
      sterren: 5,
    },
    {
      naam: "Elysium",
      locatie: "Bleiswijk",
      coords: [52.01, 4.52],
      zwembad: true,
      massage: false,
      sterren: 4,
    },
    {
      naam: "Fontana",
      locatie: "Nieuweschans",
      coords: [53.18, 7.2],
      zwembad: true,
      massage: true,
      sterren: 3,
    },
  ];

  // 🔍 Zoekfunctie
  function zoekSauna() {
    const naam = document.getElementById("search").value.toLowerCase();
    const zwembad = document.getElementById("zwembad").checked;
    const massage = document.getElementById("massage").checked;
    const sterren = parseInt(document.getElementById("sterren").value, 10);

    // Filter sauna’s
    const resultaten = saunaData.filter((sauna) => {
      const matchNaam =
        !naam || sauna.naam.toLowerCase().includes(naam.toLowerCase());
      const matchZwembad = !zwembad || sauna.zwembad;
      const matchMassage = !massage || sauna.massage;
      const matchSterren = sauna.sterren >= sterren;
      return matchNaam && matchZwembad && matchMassage && matchSterren;
    });

    // Resultaten-container leegmaken
    const resultatenContainer = document.getElementById("resultaten");
    resultatenContainer.innerHTML = "";

    if (resultaten.length === 0) {
      resultatenContainer.innerHTML =
        "<p class='no-results'>Geen sauna’s gevonden die aan de voorwaarden voldoen.</p>";
    } else if (resultaten.length === 1) {
      const sauna = resultaten[0];
      window.location.href = `detail.html?naam=${encodeURIComponent(
        sauna.naam
      )}&locatie=${encodeURIComponent(sauna.locatie)}`;
    } else {
      resultatenContainer.innerHTML = "<h3>Meerdere sauna’s gevonden:</h3>";
      const cards = document.createElement("div");
      cards.className = "cards";

      resultaten.forEach((sauna) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h4>${sauna.naam}</h4>
          <p>📍 ${sauna.locatie}</p>
          <p>⭐ ${"★".repeat(sauna.sterren)}${"☆".repeat(5 - sauna.sterren)}</p>
          <a href="detail.html?naam=${encodeURIComponent(
            sauna.naam
          )}&locatie=${encodeURIComponent(
          sauna.locatie
        )}" class="btn">Bekijk details</a>
        `;
        cards.appendChild(card);
      });

      resultatenContainer.appendChild(cards);
    }
  }

  window.zoekSauna = zoekSauna;

  // 🗺️ Leaflet kaart
  const map = L.map("map").setView([52.2, 5.3], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  saunaData.forEach((sauna) => {
    const marker = L.marker(sauna.coords).addTo(map);
    marker.bindPopup(
      `<strong>${sauna.naam}</strong><br>${sauna.locatie}<br><a href="detail.html?naam=${encodeURIComponent(
        sauna.naam
      )}&locatie=${encodeURIComponent(sauna.locatie)}">Bekijk sauna</a>`
    );
  });
});
