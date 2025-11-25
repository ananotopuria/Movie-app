import axios from "axios";

const API_KEY = "033f29c6b4fa6b2f27c3a25d195288f6";
const BASE_URL = "https://api.themoviedb.org/3";

// Movie Page
export async function getMovies() {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies: ", error);
    return [];
  }
}

// TV Show Page
export async function getTvShows() {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
}
