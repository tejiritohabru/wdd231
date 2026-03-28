const apiKey = "cdfc0602baf4134033b46880fade6e4a";
const city = "Benin City";

// WEATHER
async function getWeather() {
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
const response = await fetch(url);
const data = await response.json();

document.getElementById("temp").textContent = `Temperature: ${data.main.temp}°F`;
document.getElementById("desc").textContent = data.weather[0].description;
}

getWeather();

// FORECAST
async function getForecast() {
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
const response = await fetch(url);
const data = await response.json();

const forecastDiv = document.getElementById("forecast");

const days = ["Today", "Tomorrow", "Next Day"];

for (let i = 0; i < 3; i++) {
  let day = document.createElement("p");
  day.textContent = `${days[i]}: ${data.list[i].main.temp}°F`;
  forecastDiv.appendChild(day);
}
}

getForecast();

// SPOTLIGHTS
const url = "data/members.json";

async function getSpotlights() {
const response = await fetch(url);
const data = await response.json();

const filtered = data.filter(m => m.membership >= 2);

const random = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

displaySpotlights(random);
}

function displaySpotlights(members) {
  const container = document.getElementById("spotlights");

  members.forEach(member => {
    let card = document.createElement("section");

    let level = "";
    if (member.membership === 3) {
      level = "Gold";
    } else if (member.membership === 2) {
      level = "Silver";
    } else {
      level = "Bronze";
    }

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p><strong>${level} Member</strong></p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    container.appendChild(card);
  });
}


let level = member.membership === 3 ? "Gold" : "Silver";

getSpotlights();

// FOOTER
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// MENU
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});