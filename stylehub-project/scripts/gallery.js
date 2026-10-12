import { initNavigation, updateYear } from "./utils.js";
initNavigation();
updateYear();

const grid = document.querySelector("#fashion-grid");
const status = document.querySelector("#gallery-status");
const categoryFilter = document.querySelector("#category-filter");
const sortFilter = document.querySelector("#sort-filter");
const favoritesOnly = document.querySelector("#favorites-only");
const dialog = document.querySelector("#item-dialog");
const dialogContent = document.querySelector("#dialog-content");
const dialogClose = document.querySelector("#dialog-close");
let fashionItems = [];
const savedKey = "stylehub-favorites";
const preferenceKey = "stylehub-gallery-preferences";
let favorites = loadFavorites();

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(savedKey) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.warn("Could not read saved favorites.", error);
    return [];
  }
}
function saveFavorites() {
  try { localStorage.setItem(savedKey, JSON.stringify(favorites)); }
  catch (error) { console.warn("Favorites could not be saved in this browser.", error); }
}
function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceKey) || "{}");
    if (saved.category) categoryFilter.value = saved.category;
    if (saved.sort) sortFilter.value = saved.sort;
    favoritesOnly.checked = saved.favoritesOnly === true;
  } catch (error) { console.warn("Gallery preferences could not be loaded.", error); }
}
function savePreferences() {
  try { localStorage.setItem(preferenceKey, JSON.stringify({ category: categoryFilter.value, sort: sortFilter.value, favoritesOnly: favoritesOnly.checked })); }
  catch (error) { console.warn("Gallery preferences could not be saved.", error); }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
function getVisibleItems() {
  let visible = fashionItems.filter((item) => categoryFilter.value === "all" || item.categoryKey === categoryFilter.value);
  if (favoritesOnly.checked) visible = visible.filter((item) => favorites.includes(item.id));
  if (sortFilter.value === "price-low") visible.sort((a, b) => a.price - b.price);
  else if (sortFilter.value === "price-high") visible.sort((a, b) => b.price - a.price);
  else visible.sort((a, b) => a.name.localeCompare(b.name));
  return visible;
}
function renderGallery() {
  const visible = getVisibleItems();
  status.textContent = `${visible.length} fashion ${visible.length === 1 ? "item" : "items"} displayed.`;
  if (!visible.length) {
    grid.innerHTML = '<p class="content-panel">No items match these filters. Try another category or save a favorite.</p>';
    return;
  }
  grid.innerHTML = visible.map((item) => {
    const isFavorite = favorites.includes(item.id);
    return `<article class="fashion-card">
      <div class="fashion-art"><img class="fashion-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" width="600" height="450" loading="lazy" decoding="async"></div>
      <div class="fashion-card-body"><p class="eyebrow">${escapeHTML(item.category)}</p><h2>${escapeHTML(item.name)}</h2>
      <p>${escapeHTML(item.shortDescription)}</p><div class="item-meta"><span><strong>Price:</strong> ₦${item.price.toLocaleString("en-NG")}</span><span><strong>Best for:</strong> ${escapeHTML(item.occasion)}</span><span><strong>Style:</strong> ${escapeHTML(item.style)}</span></div>
      <div class="item-actions"><button class="small-button details-button" data-id="${item.id}">View details</button><button class="small-button favorite-button" data-id="${item.id}" aria-pressed="${isFavorite}">${isFavorite ? "★ Saved" : "☆ Save favorite"}</button></div></div></article>`;
  }).join("");
}
function openDetails(id) {
  const item = fashionItems.find((entry) => entry.id === Number(id));
  if (!item) return;
  dialogContent.innerHTML = `<img class="dialog-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" width="800" height="600"><p class="eyebrow">${escapeHTML(item.category)}</p><h2 id="dialog-title">${escapeHTML(item.name)}</h2><p>${escapeHTML(item.description)}</p><div class="item-meta"><span><strong>Price:</strong> ₦${item.price.toLocaleString("en-NG")}</span><span><strong>Occasion:</strong> ${escapeHTML(item.occasion)}</span><span><strong>Style:</strong> ${escapeHTML(item.style)}</span><span><strong>Material:</strong> ${escapeHTML(item.material)}</span></div><button class="button button-primary" id="dialog-favorite" aria-pressed="${favorites.includes(item.id)}">${favorites.includes(item.id) ? "Remove from favorites" : "Save to favorites"}</button>`;
  dialogContent.querySelector("#dialog-favorite").addEventListener("click", () => toggleFavorite(item.id));
  if (typeof dialog.showModal === "function") dialog.showModal();
  else status.textContent = `${item.name}: ${item.description}`;
}
function toggleFavorite(id) {
  if (favorites.includes(Number(id))) favorites = favorites.filter((favoriteId) => favoriteId !== Number(id));
  else favorites.push(Number(id));
  saveFavorites();
  renderGallery();
  if (dialog.open) openDetails(id);
}
grid.addEventListener("click", (event) => {
  const detailsButton = event.target.closest(".details-button");
  const favoriteButton = event.target.closest(".favorite-button");
  if (detailsButton) openDetails(detailsButton.dataset.id);
  if (favoriteButton) toggleFavorite(favoriteButton.dataset.id);
});
dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
[categoryFilter, sortFilter, favoritesOnly].forEach((control) => control.addEventListener("change", () => { savePreferences(); renderGallery(); }));

async function loadFashionData() {
  status.textContent = "Loading fashion ideas…";
  try {
    const response = await fetch("data/fashion.json");
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 15) throw new Error("The fashion data must contain at least 15 items.");
    fashionItems = data;
    const params = new URLSearchParams(window.location.search);
    const categoryFromURL = params.get("category");
    if (["clothing", "accessories", "traditional"].includes(categoryFromURL)) categoryFilter.value = categoryFromURL;
    else loadPreferences();
    renderGallery();
  } catch (error) {
    console.error("Unable to load the fashion data:", error);
    status.textContent = "Fashion items could not be loaded. Check your connection to the local JSON file and reload the page.";
    grid.innerHTML = '<div class="error-panel"><h2>We could not load the gallery.</h2><p>Please run this project through a local development server such as the VS Code Live Server extension. Fetch requests may not work when the HTML file is opened directly from your computer.</p></div>';
  }
}
loadFashionData();
