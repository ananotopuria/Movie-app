const API_KEY = "033f29c6b4fa6b2f27c3a25d195288f6";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getDetails(type, id) {
  try {
    const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`;
    console.log("Fetching:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
}
