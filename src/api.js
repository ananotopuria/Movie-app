import axios from "axios";

const API_KEY = "033f29c6b4fa6b2f27c3a25d195288f6";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getData(params, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/${params}/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${params}s: `, error);
    return [];
  }
}
