const url = "data/members.json";
const cards = document.querySelector("#members");

// ===============================
// FETCH MEMBERS
// ===============================
async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

// ===============================
// DISPLAY MEMBERS
// ===============================
function displayMembers(members) {
  members.forEach(member => {

    const card = document.createElement("section");

    const name = document.createElement("h3");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const website = document.createElement("a");
    const img = document.createElement("img");
    const membership = document.createElement("p");

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;

    website.textContent = "Visit Website";
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener";

    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;

    let level = "";
    if (member.membership === 3) {
      level = "Gold Member";
    } else if (member.membership === 2) {
      level = "Silver Member";
    } else {
      level = "Bronze Member";
    }

    membership.textContent = level;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(membership);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    cards.appendChild(card);
  });
}

// ===============================
// VIEW TOGGLE (GRID / LIST)
// ===============================
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

if (gridbutton && listbutton) {
  gridbutton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
  });

  listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
  });
}

// ===============================
// MENU TOGGLE
// ===============================
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
  });
}

// ===============================
// FOOTER
// ===============================
const year = document.getElementById("year");
const lastModified = document.getElementById("lastModified");

if (year) year.textContent = new Date().getFullYear();
if (lastModified) lastModified.textContent = document.lastModified;

// ===============================
// INIT
// ===============================
getMembers();