export const getAPI = async () => {
  const query = `https://pixabay.com/api/?key=${
    data.key
  }&q=${encodeURIComponent(data.q)}&image_type=${data.image_type}&orientation=${
    data.orientation
  }&safesearch=${data.safesearch}&per_page=${data.per_page}&page=${data.page}`;

  try {
    const response = await fetch(query);
    const images = await response.json();
    return images;
  } catch (error) {}
};
