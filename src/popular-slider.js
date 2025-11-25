import { getData } from "./api";
import { initSwiper } from "./swiper";

const moviesContainer = document.querySelector(".movies");
const tvsContainer = document.querySelector(".tvs");
let isMovie = true;

export const mostPopular = async function (params) {
  const data = await getData(params);

  if (!data || data.length === 0) return;

  const firstEight = data.slice(0, 8);

  displayMovie(firstEight, params);
};

const displayMovie = function (data, params) {
  if (params === "movie") {
    moviesContainer.innerHTML = "";
  } else {
    tvsContainer.innerHTML = "";
    isMovie = false;
  }

  data.forEach((el) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${el.poster_path}`;

    const html = `
      <div class="swiper-slide movie-props">
            <img src="${posterUrl}" alt="${
      isMovie ? el.title : el.name
    }" class="movie-img" />
            <p class="movie-name">${isMovie ? el.title : el.name}</p>
      </div>
    `;

    isMovie
      ? moviesContainer.insertAdjacentHTML("beforeend", html)
      : tvsContainer.insertAdjacentHTML("beforeend", html);
  });

  isMovie ? initSwiper("movies") : initSwiper("tvs");
};
