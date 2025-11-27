import { getData } from "./api";

const movieTab = document.querySelector(".movieTab");
const tvTab = document.querySelector(".tvTab");
const content = document.querySelector(".main-flex");
const hero = document.querySelector(".hero");
const movieContent = document.querySelector(".movie-content");
const tvShowContent = document.querySelector(".tvshows-content");
const pageNumbersEl = document.querySelector(".page-numbers");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const pagination = document.querySelector(".pagination");

let isMovie = true;
let currentPage = 1;
let currentType = "";

const updateContent = function (data, type) {
  content.innerHTML = "";
  hero.innerHTML = "";
  movieContent.style.display = "none";
  tvShowContent.style.display = "none";

  if (type !== "movie") isMovie = false;

  data.forEach((el) => {
    const postUrl = `https://image.tmdb.org/t/p/w500${el.poster_path}`;

    const html = `<div class="swiper-slide movie-props">
          <img class="movie-img" src="${postUrl}" />
          <p class="movie-name">${isMovie ? el.title : el.name}</p>
        </div>`;

    content.insertAdjacentHTML("beforeend", html);
  });

  pagination.classList.remove("hide");
  isMovie = true;
};

export async function setupTabs() {
  movieTab.addEventListener("click", async function () {
    //handling unnecessary API calls
    if (movieTab.classList.contains("active")) {
      currentPage = 1;
    }

    currentType = "movie";
    currentPage = 1;

    const movieData = await getData("movie");

    if (!movieData || movieData.length === 0) return;

    console.log(movieData);

    updateContent(movieData, "movie");

    renderPagination();
    //Switching tabs

    movieTab.classList.add("active");
    tvTab.classList.remove("active");
  });

  tvTab.addEventListener("click", async function () {
    //handling unnecessary API calls
    if (tvTab.classList.contains("active")) {
      currentPage = 1;
    }

    currentType = "tv";
    currentPage = 1;

    const tvData = await getData("tv");

    if (!tvData || tvData.length === 0) return;

    console.log(tvData);

    updateContent(tvData, "tv");

    renderPagination();
    // Switching tabs
    movieTab.classList.remove("active");
    tvTab.classList.add("active");

    // updateContent("Tv-shop tab");

    // Logging tvshows
    (async function () {
      const data = await getData("tv");
      // console.log(data);
    })();
  });
}

async function loadPage(page) {
  const data = await getData(currentType, page);
  if (!data || data.length === 0) return;

  currentPage = page;
  updateContent(data, currentType);
  await renderPagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function renderPagination() {
  pageNumbersEl.innerHTML = "";

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1 || i > 500) continue;

    const btn = document.createElement("button");
    btn.className = "page-number" + (i === currentPage ? " active" : "");
    btn.textContent = i;

    btn.addEventListener("click", () => loadPage(i));

    pageNumbersEl.appendChild(btn);
  }
}

// Prev
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) loadPage(currentPage - 1);
});

// Next
nextBtn.addEventListener("click", () => {
  if (currentPage < 500) loadPage(currentPage + 1);
});
