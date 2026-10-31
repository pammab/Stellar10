// Astronomy Resources

const resourcesOpen = document.getElementById("resourcesOpen");
const resourcesClose = document.getElementById("resourcesClose");
const resourcesPanel = document.getElementById("resourcesPanel");

const filterButtons = document.querySelectorAll(
    ".resource-filters button"
);

const resourceCards = document.querySelectorAll(
    ".resource-card"
);

// Open panel
resourcesOpen.addEventListener("click", () => {
    resourcesPanel.classList.remove("hidden");
});

// Close panel
resourcesClose.addEventListener("click", () => {
    resourcesPanel.classList.add("hidden");
});

// Filter by category
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const category = button.dataset.category;

        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.toggle("active", btn === button);
        });

        // Show matching cards
        resourceCards.forEach(card => {

            const show =
                category === "all" ||
                card.dataset.category === category;

            card.classList.toggle("hidden", !show);

        });
    });
});

// Close using Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        resourcesPanel.classList.add("hidden");
    }
});