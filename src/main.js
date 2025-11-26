import { setupTabs } from "./tabManager";
import { initHeroSlider } from "./hero.js";
import { mostPopular } from "./popular-slider.js";
import { Pagination } from "./pagination.js";

setupTabs();
initHeroSlider();
mostPopular("movie");
mostPopular("tv");
