let content = document.querySelector(".main-flex");
let hero = document.querySelector(".hero");
let movieContent = document.querySelector(".movie-content");
let tvShowContent = document.querySelector(".tvshows-content");
let pagination = document.querySelector(".pagination");

function goToDetails(id, type) {
  const page = "detailsPage.html";
  window.location.href = `../pages/${page}?id=${id}&type=${type}`;
}

export function updateContentBySearch(data) {
  content.innerHTML = "";
  hero.innerHTML = "";
  movieContent.style.display = "none";
  tvShowContent.style.display = "none";

  data.forEach((el) => {
    if (el.popularity < 1) return;
    const postUrl = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
    const typeForCard = el.media_type;

    const html = `
    <div class="swiper-slide movie-props" data-id="${el.id}">
      <img class="movie-img" src="${postUrl}" />
      <p class="movie-name">${
        el.media_type === "movie" ? el.title : el.name
      }</p>
    </div>
  `;

    content.insertAdjacentHTML("beforeend", html);
    const newSlide = content.lastElementChild;
    newSlide.addEventListener("click", () => {
      goToDetails(el.id, typeForCard);
    });
  });

  pagination.classList.remove("hide");
}
