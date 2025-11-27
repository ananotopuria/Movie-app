import { getData } from "./api";
import { initSwiper } from "./swiper";

const moviesContainer = document.querySelector(".movies");
const tvsContainer = document.querySelector(".tvs");

export const mostPopular = async function (type, size = 8) {
  const data = await getData(type);
  if (!data?.length) return;

  const firstEight = data.slice(0, size);
  displayItems(firstEight, type);
};

export function displayItems(data, type) {
  const container = type === "movie" ? moviesContainer : tvsContainer;
  container.innerHTML = "";

  data.forEach((el) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
    const title = type === "movie" ? el.title : el.name;

    const html = `
      <div class="swiper-slide movie-props"
           data-id="${el.id}"
           data-type="${type}">
        <img src="${posterUrl}" class="movie-img" alt="${title}" />
        <p class="movie-name">${title}</p>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
  });

  container.querySelectorAll(".movie-props").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const type = card.dataset.type;

      goToDetails(id, type);
    });
  });

  initSwiper(type === "movie" ? "movies" : "tvs");
}

function goToDetails(id, type) {
  window.location.href = `../pages/detailsPage.html?id=${id}&type=${type}`;
}
