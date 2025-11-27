import { getData } from "./tvseriesPageApi.js";

let allShows = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 20;

export async function initTvSeries() {
  const container = document.querySelector(".tvseries-container");
  if (!container) return;

  allShows = await getData("tv");
  setupPagination();
  renderTvSeries();
}

function renderTvSeries() {
  const container = document.querySelector(".tvseries-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = allShows.slice(start, end);

  const rows = chunkArray(pageItems, 5);

  rows.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("tv-row");

    row.forEach((show) => {
      const card = document.createElement("div");
      card.classList.add("tv-card");

      card.innerHTML = `
        <img
          src="https://image.tmdb.org/t/p/w300${show.poster_path}"
          alt="${show.name}"
        />
        <h3>${show.name}</h3>
        <p>⭐ ${show.vote_average}</p>
      `;
      card.addEventListener("click", () => {
        window.location.href = `tvseriesDetails.html?id=${show.id}`;
      });
      rowDiv.appendChild(card);
    });

    container.appendChild(rowDiv);
  });

  updatePageInfo();
}

function setupPagination() {
  const prevBtn = document.querySelector(".pagination-prev");
  const nextBtn = document.querySelector(".pagination-next");

  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTvSeries();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(allShows.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      renderTvSeries();
    }
  });
}

function updatePageInfo() {
  const info = document.querySelector(".pagination-info");
  if (!info) return;

  const totalPages = Math.ceil(allShows.length / ITEMS_PER_PAGE);
  info.textContent = `Page ${currentPage} of ${totalPages}`;
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
