export const getDataFromApi = async (query) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=k-w3bvrd_rr6oorJqvFKxWkP-wd1D7kpO_x28gdBP74`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  const data = await response.json();
  return data.results;
};
