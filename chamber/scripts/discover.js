import { attractions } from "../data/discover.mjs";

const gallery = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

const createCard = (place, index) => {
    const card = document.createElement("article");

    card.className = `discover-card area-${index + 1}`;

    const heading = document.createElement("h2");
    heading.textContent = place.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.alt;
    image.width = 300;
    image.height = 200;
    image.decoding = "async";

    // The first image is likely above the fold.
    // Other images are lazy-loaded.
    image.loading = index === 0 ? "eager" : "lazy";

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "learn-more";
    button.textContent = "Learn More";
    button.setAttribute(
        "aria-label",
        `Learn more about ${place.name}`
    );

    button.addEventListener("click", () => {
        alert(
            `${place.name}\n\n${place.address}\n\n${place.description}`
        );
    });

    card.append(
        heading,
        figure,
        address,
        description,
        button
    );

    return card;
};

attractions.forEach((place, index) => {
    gallery.appendChild(createCard(place, index));
});


/* Last Visit Message */

const storageKey = "discover-last-visit";
const currentVisit = Date.now();
const previousVisit = localStorage.getItem(storageKey);

if (!previousVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysSinceVisit = Math.floor(
        (currentVisit - Number(previousVisit)) / millisecondsPerDay
    );

    if (daysSinceVisit < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        const dayText = daysSinceVisit === 1 ? "day" : "days";

        visitMessage.textContent =
            `You last visited ${daysSinceVisit} ${dayText} ago.`;
    }
}

localStorage.setItem(storageKey, currentVisit);


/* Footer */

const year = document.querySelector("#year");
const lastModified = document.querySelector("#lastModified");

if (year) {
    year.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}