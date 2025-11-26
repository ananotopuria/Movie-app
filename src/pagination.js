import { getData } from "./api";

export async function Pagination(func = getData) {
  const data = await func("movie", 10);
  console.log(data);

  function renderPagination() {
    const totalPages = Math.ceil(moviesData.length / perPage);

    pageNumbersEl.innerHTML = "";

    for (let i = 1; i <= 100; i++) {
      const btn = document.createElement("div");
      btn.className = "page-number" + (i === currentPage ? " active" : "");
      btn.textContent = i;

      btn.addEventListener("click", () => {
        currentPage = i;
        renderPagination();
        scrollToTop();
      });
      pageNumbersEl.appendChild(btn);
    }
  }

  renderPagination;
}

Pagination();
