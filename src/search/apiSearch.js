import axios from "axios";

const API_KEY = "033f29c6b4fa6b2f27c3a25d195288f6";
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMulti(query, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query,
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching multi search results: ", error);
    return [];
  }
}
