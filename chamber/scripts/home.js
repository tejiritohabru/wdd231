"use strict";

// ===============================
// CONFIG
// ===============================
const apiKey = "cdfc0602baf4134033b46880fade6e4a";
const city = "Benin City";

// ===============================
// FOOTER
// ===============================
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ===============================
// HAMBURGER MENU
// ===============================
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
  });
}

// ===============================
// WEATHER (CURRENT + 3 DAY)
// ===============================
async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.list) throw new Error("Weather data missing");

    const current = data.list[0];

    document.getElementById("temp").textContent =
      `Temperature: ${current.main.temp.toFixed(1)}°C`;

    document.getElementById("desc").textContent =
      current.weather[0].description;

    // 3-day forecast
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    const indexes = [0, 8, 16];

    indexes.forEach((i, index) => {
      const day = data.list[i];

      const card = document.createElement("div");
      card.innerHTML = `
        <p><strong>Day ${index + 1}</strong></p>
        <p>${day.main.temp.toFixed(1)}°C</p>
      `;

      forecastDiv.appendChild(card);
    });

  } catch (error) {
    console.error("Weather error:", error);
  }
}

getWeather();

// ===============================
// SPOTLIGHTS (GOLD + SILVER ONLY)
// ===============================
async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const filtered = members.filter(member =>
      member.membership === 2 || member.membership === 3
    );

    const shuffled = filtered.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);

  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

function displaySpotlights(members) {
  const container = document.getElementById("spotlights");
  if (!container) return;

  container.innerHTML = "";

  members.forEach(member => {
    const level = member.membership === 3 ? "Gold" : "Silver";

    const card = document.createElement("section");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p><strong>${level} Member</strong></p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

    container.appendChild(card);
  });
}

getSpotlights();