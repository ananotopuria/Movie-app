import { setupTabs } from "./tabManager";
import { initHeroSlider } from "./hero.js";
import { mostPopular } from "./popular-slider.js";

setupTabs();
initHeroSlider();
mostPopular("movie");
mostPopular("tv");
