import axios from "axios";

const API_KEY = "033f29c6b4fa6b2f27c3a25d195288f6";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getData(type) {
  const allItems = [];
  let page = 1;
  const MAX_PAGES = 5;

  try {
    while (page <= MAX_PAGES) {
      const response = await axios.get(`${BASE_URL}/${type}/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: page,
        },
      });

      const items = response.data.results;
      allItems.push(...items);

      if (page >= response.data.total_pages) break;

      page++;
    }

    return allItems;
  } catch (error) {
    console.error(`Error fetching ${type}s:`, error);
    return [];
  }
}
