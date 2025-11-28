// export function renderHeader() {
//   const headerRoot = document.querySelector("#site-header");
//   if (!headerRoot) return;

//   headerRoot.innerHTML = `
//     <header>
//       <div class="navigation-container">
//         <a href="/" class="logo">
//           <span>AnoMi</span>
//         </a>

//         <nav class="nav-menu">
//           <ul>
//             <li class="movieTab">Movies</li>
//             <li class="tvTab">
//                 Tv Series
//             </li>
//           </ul>
//         </nav>

//         <div class="search-wrapper">
//           <input
//             class="search-input"
//             type="text"
//             placeholder="Search movies..."
//           />
//         </div>
//       </div>
//     </header>
//   `;
// }

import { searchMulti } from "./search/apiSearch";
import { updateContentBySearch } from "./search/updateContentBySearch";
// import { updateContent } from "./tabs/updateContent";

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
            <li class="movieTab">Movies</li>
            <li class="tvTab">Tv Series</li>
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

  const searchInput = headerRoot.querySelector(".search-input");

  searchInput.addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchInput.value === "") return;
      const data = await searchMulti(searchInput.value);
      console.log("Search for:", data);
      updateContentBySearch(data, 1);
      searchInput.value = "";
    }
  });
}
