import { getData } from "./api";

let movieTab;
let tvTab;
let content;
let hero;
let movieContent;
let tvShowContent;
let pageNumbersEl;
let prevBtn;
let nextBtn;
let pagination;

let isMovie = true;
let currentPage = 1;
let currentType = "";

export function updateContent(data, type) {
  content.innerHTML = "";
  hero.innerHTML = "";
  movieContent.style.display = "none";
  tvShowContent.style.display = "none";

  if (type !== "movie") isMovie = false;

  data.forEach((el) => {
    const postUrl = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
    const typeForCard = type;

    const html = `
    <div class="swiper-slide movie-props" data-id="${el.id}">
      <img class="movie-img" src="${postUrl}" />
      <p class="movie-name">${isMovie ? el.title : el.name}</p>
    </div>
  `;

    content.insertAdjacentHTML("beforeend", html);
    const newSlide = content.lastElementChild;
    newSlide.addEventListener("click", () => {
      goToDetails(el.id, typeForCard);
    });
  });

  pagination.classList.remove("hide");
  isMovie = true;
}

function goToDetails(id, type) {
  const page = "detailsPage.html";
  window.location.href = `../pages/${page}?id=${id}&type=${type}`;
}

export async function setupTabs() {
  movieTab = document.querySelector(".movieTab");
  tvTab = document.querySelector(".tvTab");
  content = document.querySelector(".main-flex");
  hero = document.querySelector(".hero");
  movieContent = document.querySelector(".movie-content");
  tvShowContent = document.querySelector(".tvshows-content");
  pageNumbersEl = document.querySelector(".page-numbers");
  prevBtn = document.querySelector(".prev");
  nextBtn = document.querySelector(".next");
  pagination = document.querySelector(".pagination");

  // safety check (optional)
  if (!movieTab || !tvTab) {
    console.error("Tabs not found in DOM");
    return;
  }

  movieTab.addEventListener("click", async function () {
    if (movieTab.classList.contains("active")) {
      currentPage = 1;
    }

    currentType = "movie";
    currentPage = 1;

    const movieData = await getData("movie");
    if (!movieData || movieData.length === 0) return;

    updateContent(movieData, "movie");
    renderPagination();

    movieTab.classList.add("active");
    tvTab.classList.remove("active");
  });

  tvTab.addEventListener("click", async function () {
    if (tvTab.classList.contains("active")) {
      currentPage = 1;
    }

    currentType = "tv";
    currentPage = 1;

    const tvData = await getData("tv");
    if (!tvData || tvData.length === 0) return;

    updateContent(tvData, "tv");
    renderPagination();

    movieTab.classList.remove("active");
    tvTab.classList.add("active");
  });

  // pagination buttons
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) loadPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < 500) loadPage(currentPage + 1);
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
