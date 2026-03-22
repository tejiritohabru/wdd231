const url = "data/members.json";
const cards = document.querySelector("#members");

async function getMembers() {
const response = await fetch(url);
const data = await response.json();
displayMembers(data);
}

function displayMembers(members){

members.forEach(member =>{

let card = document.createElement("section");

let name = document.createElement("h3");
let address = document.createElement("p");
let phone = document.createElement("p");
let website = document.createElement("a");
let img = document.createElement("img");

name.textContent = member.name;
address.textContent = member.address;
phone.textContent = member.phone;

website.textContent = "Visit Website";
website.href = member.website;
website.target = "_blank";

img.src = `images/${member.image}`;
img.alt = `${member.name} logo`;

let membership = document.createElement("p");

let level = "";

if (member.membership === 3) {
  level = "Gold Member";
} else if (member.membership === 2) {
  level = "Silver Member";
} else {
  level = "Bronze Member";
}

membership.textContent = level;

card.appendChild(membership);

card.appendChild(img);
card.appendChild(name);
card.appendChild(address);
card.appendChild(phone);
card.appendChild(website);

cards.appendChild(card);

});
}

getMembers();


document.getElementById("lastModified").textContent = document.lastModified;


const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#members");


gridbutton.addEventListener("click", () => {
cards.classList.add("grid");
cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
cards.classList.add("list");
cards.classList.remove("grid");
});

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
navigation.classList.toggle("open");
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent = document.lastModified;


