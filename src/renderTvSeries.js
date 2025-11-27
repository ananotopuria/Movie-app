// import { getData } from "./tvseriesPageApi.js";

// export async function renderTvSeries() {
//   const container = document.querySelector(".tvseries-container");

//   const shows = await getData("tv");

//   const rows = chunkArray(shows, 5);

//   container.innerHTML = "";

//   rows.forEach((row) => {
//     const rowDiv = document.createElement("div");
//     rowDiv.classList.add("tv-row");

//     row.forEach((show) => {
//       const card = document.createElement("div");
//       card.classList.add("tv-card");

//       card.innerHTML = `
//         <img
//           src="https://image.tmdb.org/t/p/w300${show.poster_path}"
//           alt="${show.name}"
//         />
//         <h3>${show.name}</h3>
//         <p>⭐ ${show.vote_average}</p>
//       `;

//       rowDiv.appendChild(card);
//     });

//     container.appendChild(rowDiv);
//   });
// }

// function chunkArray(arr, size) {
//   const chunks = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunks.push(arr.slice(i, i + size));
//   }
//   return chunks;
// }

// renderTvSeries();

import { getData } from "./tvseriesPageApi.js";

let allShows = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 20; // 4 rows * 5 per row

export async function initTvSeries() {
  const container = document.querySelector(".tvseries-container");
  if (!container) return;

  // 1) Fetch once and store
  allShows = await getData("tv");

  // 2) Setup buttons
  setupPagination();

  // 3) First render
  renderTvSeries();
}

function renderTvSeries() {
  const container = document.querySelector(".tvseries-container");
  container.innerHTML = "";

  // slice items for current page
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = allShows.slice(start, end);

  // keep your 5-per-row logic
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
