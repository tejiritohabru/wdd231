import { updateYear } from "./utils.js";
updateYear();
const summary = document.querySelector("#submission-summary");
const params = new URLSearchParams(window.location.search);
const fields = [
  ["Full name", "name"], ["Email address", "email"], ["Design title", "title"],
  ["Design category", "category"], ["Estimated price", "price"], ["Design description", "description"]
];
const hasSubmission = params.has("name") && params.has("email") && params.has("title");
if (!hasSubmission) {
  summary.innerHTML = '<div class="error-panel"><h2>No submission details found</h2><p>Please use the design form first so this page can display the values submitted through the URL.</p></div>';
} else {
  const rows = fields.map(([label, key]) => {
    let value = params.get(key)?.trim() || "Not provided";
    if (key === "price" && value !== "Not provided") value = `₦${Number(value).toLocaleString("en-NG")}`;
    return `<div class="summary-row"><strong>${label}</strong><p>${escapeHTML(value)}</p></div>`;
  }).join("");
  summary.innerHTML = `<h2>Thank you, ${escapeHTML(params.get("name"))}!</h2><p>Here are the details you submitted:</p><div class="summary-list">${rows}</div>`;
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
