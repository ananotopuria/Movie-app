import { getData } from "./tvseriesPageApi.js";

export async function renderTvSeries() {
  const container = document.querySelector(".tvseries-container");

  const shows = await getData("tv");

  const rows = chunkArray(shows, 5);

  container.innerHTML = "";

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
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

renderTvSeries();
