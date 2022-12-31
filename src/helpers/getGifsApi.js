const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
export const getGifsApi = async () => {
  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12&rating=g`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Error");

  const { data } = await res.json();
  const trendsGifsData = data.map((el) => {
    return {
      id: el.id,
      title: el.title,
      urlGifImage: el.images.downsized_large.url,
    };
  });

  return trendsGifsData;
};

export const getSearchGifApi = async (filterText = "") => {
  let searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${filterText}&limit=12&offset=0&rating=g&lang=en`;
  const res = await fetch(searchUrl);
  const { data } = await res.json();
  const trendsGifsData = data.map((el) => {
    return {
      id: el.id,
      title: el.title,
      urlGifImage: el.images.downsized_large.url,
    };
  });

  return trendsGifsData;
};
