const grid = document.querySelector("#resource-grid");
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector(".search-panel");
const emptyState = document.querySelector("#empty-state");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const filterLinks = Array.from(document.querySelectorAll("[data-filter-link]"));
const quoteSlots = Array.from(document.querySelectorAll("[data-quote-slot]"));

let activeFilter = "All";

function normalize(value) {
  return value.toLowerCase().trim();
}

function resourceMatches(resource, query) {
  const haystack = `${resource.title} ${resource.category} ${resource.description} ${resource.tag}`;
  const matchesSearch = !query || normalize(haystack).includes(query);
  const matchesFilter = activeFilter === "All" || resource.category === activeFilter;
  return matchesSearch && matchesFilter;
}

function renderResources() {
  const query = normalize(searchInput.value);
  const visibleResources = resources.filter((resource) => resourceMatches(resource, query));

  grid.innerHTML = visibleResources
    .map((resource) => {
      const isPlaceholder = resource.url === "#";
      const href = isPlaceholder ? "javascript:void(0)" : resource.url;
      const target = isPlaceholder ? "" : ' target="_blank" rel="noreferrer"';
      const label = isPlaceholder ? "Draft link" : "Open resource";

      return `
        <article class="resource-card">
          <div class="card-meta">
            <span>${resource.category}</span>
            <span>${resource.tag}</span>
          </div>
          <h3>${resource.title}</h3>
          <p>${resource.description}</p>
          <a class="${isPlaceholder ? "disabled-link" : ""}" href="${href}"${target}>${label}</a>
        </article>
      `;
    })
    .join("");

  emptyState.hidden = visibleResources.length > 0;
}

function setFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === filter);
  });
  renderResources();
}

function renderQuotes() {
  quoteSlots.forEach((slot) => {
    const quote = quotes.find((item) => item.position === slot.dataset.quoteSlot);
    if (!quote) {
      slot.remove();
      return;
    }

    const avatar = quote.avatar
      ? `<img src="${quote.avatar}" alt="${quote.person}">`
      : `<div class="quote-face" aria-hidden="true"><span></span><span></span></div>`;

    slot.innerHTML = `
      <aside class="side-quote" aria-label="Quote from ${quote.person}">
        ${avatar}
        <blockquote>
          <p>"${quote.text}"</p>
          <cite>- ${quote.person}</cite>
        </blockquote>
      </aside>
    `;
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderResources();
});

searchInput.addEventListener("input", renderResources);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

filterLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setFilter(link.dataset.filterLink);
  });
});

renderQuotes();
renderResources();
