async function renderDetails() {
  const container = document.getElementById("tv-details");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    container.innerHTML = "<p>TV show not found.</p>";
    return;
  }

  const details = await getSeriesDetails(id);

  container.innerHTML = `
    <div class="details-card">
      <img
        src="https://image.tmdb.org/t/p/w500${details.poster_path}"
        alt="${details.name}"
      />

      <h1>${details.name}</h1>
      <p><strong>Rating:</strong> ⭐ ${details.vote_average}</p>
      <p><strong>Overview:</strong> ${details.overview}</p>
      <p><strong>First Air Date:</strong> ${details.first_air_date}</p>
      <p><strong>Genres:</strong> ${
        details.genres ? details.genres.map((g) => g.name).join(", ") : "N/A"
      }</p>
    </div>

    <section class="related-section">
      <h2>Related TV Series</h2>
      <div class="related-grid"></div>
    </section>
  `;

  const relatedShows = await getSimilarSeries(id);
  renderRelatedShows(relatedShows);
}

async function getSeriesDetails(id) {
  const API_KEY = "033f29c6b4fa6b2f27c3a25d195288f6";
  const BASE_URL = "https://api.themoviedb.org/3/tv/";

  const response = await fetch(`${BASE_URL}${id}?api_key=${API_KEY}`);
  return response.json();
}

async function getSimilarSeries(id) {
  const API_KEY = "033f29c6b4fa6b2f27c3a25d195288f6";
  const BASE_URL = "https://api.themoviedb.org/3/tv/";

  const response = await fetch(
    `${BASE_URL}${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results || [];
}

function renderRelatedShows(shows) {
  const grid = document.querySelector(".related-grid");
  if (!grid) return;

  grid.innerHTML = "";

  shows.slice(0, 10).forEach((show) => {
    const card = document.createElement("div");
    card.classList.add("related-card");

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

    grid.appendChild(card);
  });
}

renderDetails();
