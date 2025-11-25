import { movies } from "./movies.js";

export function initHeroSlider() {
  const container = document.querySelector(".hero__container");
  if (!container || movies.length === 0) return;

  let currentIndex = 0;

  const slide = document.createElement("div");
  slide.className = "hero__slide";

  slide.innerHTML = `
    <div class="hero__content">
      <h3 class="hero__movie-title"></h3>
      <p class="hero__movie-description"></p>
    </div>
    <button class="hero__nav hero__nav--prev">&#10094;</button>
    <button class="hero__nav hero__nav--next">&#10095;</button>
  `;

  container.appendChild(slide);

  const titleEl = slide.querySelector(".hero__movie-title");
  const descEl = slide.querySelector(".hero__movie-description");
  const prevBtn = slide.querySelector(".hero__nav--prev");
  const nextBtn = slide.querySelector(".hero__nav--next");

  function renderMovie(index) {
    const movie = movies[index];
    titleEl.textContent = movie.title;
    descEl.textContent = movie.description;
    slide.style.backgroundImage = `url(${movie.image})`;
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    renderMovie(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % movies.length;
    renderMovie(currentIndex);
  });

  renderMovie(currentIndex);
}
