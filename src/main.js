import { setupTabs } from "./tabManager";
import { initHeroSlider } from "./hero.js";
import { mostPopular } from "./popular-slider.js";
import { renderHeader } from "./header.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  setupTabs();
});

initHeroSlider();
mostPopular("movie");
mostPopular("tv");
