import { getData } from "../api";
import { updateContent } from "./updateContent";

let pageNumbersEl = document.querySelector(".page-numbers");
let currentPage = 1;
let currentType = "";

//
// main setup
//
export function setupTabs() {
  const movieTab = document.querySelector(".movieTab");
  const tvTab = document.querySelector(".tvTab");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (!movieTab || !tvTab) {
    console.error("Tabs not found in DOM");
    return;
  }

  movieTab.addEventListener("click", () =>
    onTabClick("movie", movieTab, tvTab)
  );
  tvTab.addEventListener("click", () => onTabClick("tv", tvTab, movieTab));

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) loadPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < 500) loadPage(currentPage + 1);
  });
}

//
// tab click handler
//
async function onTabClick(type, activateTab, deactivateTab) {
  if (activateTab.classList.contains("active")) {
    currentPage = 1;
  }

  currentType = type;
  currentPage = 1;

  const data = await getData(type);
  if (!data || data.length === 0) return;

  updateContent(data, type);
  renderPagination();

  setActiveTab(activateTab, deactivateTab);
}

//
// helper: set active tab
//
function setActiveTab(active, inactive) {
  active.classList.add("active");
  inactive.classList.remove("active");
}

//
// load by page
//
export async function loadPage(page) {
  const data = await getData(currentType, page);
  if (!data || data.length === 0) return;

  currentPage = page;

  updateContent(data, currentType);
  renderPagination();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

//
// pagination
//
export function renderPagination() {
  pageNumbersEl.innerHTML = "";

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(500, currentPage + 2);

  for (let i = start; i <= end; i++) {
    const btn = document.createElement("button");
    btn.className = "page-number" + (i === currentPage ? " active" : "");
    btn.textContent = i;

    btn.addEventListener("click", () => loadPage(i));
    pageNumbersEl.appendChild(btn);
  }
}
