import { renderHeader } from "./header.js";
import { initTvSeries } from "./renderTvSeries.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  initTvSeries();
});
