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
  const budget = type === "movie" ? `\$${data.budget.toLocaleString()}` : "N/A";
  const revenue =
    type === "movie" ? `\$${data.revenue.toLocaleString()}` : "N/A";

  container.innerHTML = `
  <section class="details">

    <div class="details-poster">
      <img class="image"
        src="https://image.tmdb.org/t/p/w500${data.poster_path}"
        alt="${title}"
      />
    </div>

    <div class="details-info">

      <p class="title">${title}</p>

      <p class="details-meta">
        ⭐ ${data.vote_average?.toFixed(1) || "N/A"}
        · ${date || "Unknown date"}
        · ${data.runtime ? data.runtime + " min" : ""}
      </p>

      ${data.tagline ? `<p class="details-tagline">"${data.tagline}"</p>` : ""}

      <div class="details-genres">
        ${data.genres
          ?.map((g) => `<span class="genre">${g.name}</span>`)
          .join("")}
      </div>

      <p class="details-overview">
        ${data.overview || "No overview available."}
      </p>

      <div class="details-extra">
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Revenue:</strong> ${revenue}</p>
        <p><strong>Production:</strong> ${data.production_companies
          ?.map((c) => c.name)
          .join(", ")}</p>
      </div>

      

    </div>
  </section>
`;

  document.querySelector("title").textContent = title;
}

renderDetails();

const movie = document.querySelector(".movieTab");
const tv = document.querySelector(".tvTab");

movie.addEventListener("click", () => {
  window.location.href = "/";
});

tv.addEventListener("click", async function () {
  window.location.href = `/`;
});
