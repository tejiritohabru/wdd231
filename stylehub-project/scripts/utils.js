export function initNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  if (!menuButton || !navigation) return;
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("open", !expanded);
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }));
}
export function updateYear() {
  const yearElement = document.querySelector("#current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}
