export function renderHeader() {
  const headerRoot = document.querySelector("#site-header");
  if (!headerRoot) return;

  headerRoot.innerHTML = `
    <header>
      <div class="navigation-container">
        <a href="/" class="logo">
          <span>AnoMi</span>
        </a>

        <nav class="nav-menu">
          <ul>
            <li class="movieTab active">Movies</li>
            <li class="tvTab">
                <a href="/pages/tvshow.html" class="tvTab__link">Tv Series</a>
            </li>
          </ul>
        </nav>

        <div class="search-wrapper">
          <input
            class="search-input"
            type="text"
            placeholder="Search movies..."
          />
        </div>
      </div>
    </header>
  `;
}
