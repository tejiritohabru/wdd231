/* Responsive navigation and wayfinding */
"use strict";

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = !navMenu.classList.contains("hidden");
    navMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  });

  // Close the mobile menu after a navigation link is selected.
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Highlight the current page for clear wayfinding.
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("#nav-menu a").forEach(link => {
  const linkPage = link.getAttribute("href").split("/").pop();
  if (linkPage === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  } else {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  }
});
