import { getMoviesAx, getTvShows } from "./api";

export function setupTabs() {
  const movieTab = document.querySelector(".movieTab");
  const tvTab = document.querySelector(".tvTab");
  const content = document.querySelector(".content");

  const updateContent = function (mesg) {
    content.innerHTML = "";
    const title = document.createElement("h1");
    title.textContent = mesg;
    content.appendChild(title);
  };

  movieTab.addEventListener("click", () => {
    //handling unnecessary API calls
    if (movieTab.classList.contains("active")) return;

    //Switching tabs
    movieTab.classList.add("active");
    tvTab.classList.remove("active");
    updateContent("Movie tab");

    // Logging movies
    (async function () {
      const data = await getMoviesAx();
      console.log(data);
    })();
  });

  tvTab.addEventListener("click", () => {
    //handling unnecessary API calls
    if (tvTab.classList.contains("active")) return;

    //Switching tabs
    movieTab.classList.remove("active");
    tvTab.classList.add("active");
    updateContent("Tv-shop tab");

    //Logging tvshows
    (async function () {
      const data = await getTvShows();
      console.log(data);
    })();
  });
}
