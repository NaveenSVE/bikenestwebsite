const grid = document.getElementById("listing-grid");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const listingCount = document.getElementById("listing-count");
const emptyState = document.getElementById("browse-empty");
const filterChips = document.querySelectorAll(".filter-chip");

let activeFilter = "all";

function getCards() {
  return Array.from(grid.querySelectorAll(".bike-card"));
}

function matchesSearch(card, query) {
  if (!query) return true;
  const text = `${card.textContent} ${card.dataset.keywords}`.toLowerCase();
  return text.includes(query.toLowerCase());
}

function matchesFilter(card) {
  if (activeFilter === "all") return true;
  const brand = card.dataset.brand;
  const keywords = card.dataset.keywords;
  if (activeFilter === "scooter") return keywords.includes("scooter");
  return brand === activeFilter;
}

function sortCards(cards) {
  const sort = sortSelect.value;
  return cards.sort((a, b) => {
    const priceA = Number(a.dataset.price);
    const priceB = Number(b.dataset.price);
    const mileageA = Number(a.dataset.mileage);
    const mileageB = Number(b.dataset.mileage);

    if (sort === "price-low") return priceA - priceB;
    if (sort === "price-high") return priceB - priceA;
    if (sort === "mileage") return mileageA - mileageB;
    return 0;
  });
}

function applyFilters() {
  const query = searchInput.value.trim();
  const cards = getCards();
  let visible = 0;

  sortCards(cards).forEach((card) => {
    const show = matchesSearch(card, query) && matchesFilter(card);
    card.classList.toggle("is-hidden", !show);
    if (show) {
      grid.appendChild(card);
      visible += 1;
    }
  });

  listingCount.textContent = String(visible);
  emptyState.classList.toggle("is-hidden", visible > 0);
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    activeFilter = chip.dataset.filter;
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);
sortSelect.addEventListener("change", applyFilters);
