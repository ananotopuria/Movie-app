import { getMovies } from "./api";

const moviesContainer = document.querySelector(".movies");

function initSwiper() {
  new Swiper(".movies-swiper", {
    slidesPerView: "auto",
    slidesPerGroup: 1,
    spaceBetween: 22,
    loop: true,
    grabCursor: true,

    mousewheel: {
      forceToAxis: true,
      sensitivity: 0.3,
      releaseOnEdges: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

export const getFivePopular = async function () {
  const data = await getMovies();

  if (!data || data.length === 0) return;

  const firstFive = data.slice(0, 8);

  showMovies(firstFive);
};

const showMovies = function (movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const html = `
      <div class="swiper-slide movie-props">
            <img src="${posterUrl}" alt="${movie.title}" class="movie-img" />
            <p class="movie-name">${movie.title}</p>
      </div>
    `;

    moviesContainer.insertAdjacentHTML("beforeend", html);
  });

  initSwiper();
};
