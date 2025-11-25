import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

import { getTvShows } from "./api.js";

export async function renderTvShowSlides() {
  const shows = await getTvShows();

  if (!Array.isArray(shows)) {
    console.error("getTvShows() did not return an array:", shows);
    return;
  }

  const wrapper = document.querySelector(".swiper-wrapper");
  if (!wrapper) {
    console.error("No .swiper-wrapper found!");
    return;
  }

  wrapper.innerHTML = "";

  shows.forEach((show) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
      <div class="tv-group">
            <div class="tv-card">
              <img
                src="https://image.tmdb.org/t/p/w200${show.poster_path}"
                alt="${show.name}"
              />
              <p class="tv-title">${show.name}</p>
            </div>
      </div
    `;

    wrapper.appendChild(slide);
  });

  new Swiper(".swiper", {
    slidesPerView: 5,
    slidesPerGroup: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTvShowSlides();
});
