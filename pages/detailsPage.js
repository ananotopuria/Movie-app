import { renderHeader } from "../src/header";
import { getDetails } from "./apiForId";

renderHeader();

async function renderDetails() {
  const container = document.getElementById("movie-details");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const type = params.get("type");

  console.log(type);

  if (!id) {
    container.innerHTML = "<p>No movie / TV show selected.</p>";
    return;
  }

  const data = await getDetails(type, id);

  if (!data) {
    container.innerHTML = "<p>Details not found.</p>";
    return;
  }

  const title = type === "movie" ? data.title : data.name;
  const date = type === "movie" ? data.release_date : data.first_air_date;

  container.innerHTML = `
    <section class="details">
      <div class="details-poster">
        <img
          src="https://image.tmdb.org/t/p/w500${data.poster_path}"
          alt="${title}"
        />
      </div>

      <div class="details-info">
        <h1>${title}</h1>
        <p class="details-meta">
          ⭐ ${data.vote_average?.toFixed(1) || "N/A"}
          · ${date || "Unknown date"}
        </p>
        <p class="details-overview">
          ${data.overview || "No overview available."}
        </p>
      </div>
    </section>
  `;
}

renderDetails();

const movie = document.querySelector(".movieTab");
const tv = document.querySelector(".tvTab");

movie.addEventListener("click", async function () {
  window.location.href = `/`;
});

tv.addEventListener("click", async function () {
  window.location.href = `/`;
});
