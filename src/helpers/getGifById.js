const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const getGifById = async (gifId) => {
  const URL = `https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`;
  const res = await fetch(URL);

  if (!res) return new Error("Error");

  const {
    data: {
      title,
      images: {
        downsized_large: { url },
      },
      user: {
        avatar_url = "",
        profile_url = "",
        website_url = "",
        display_name = "",
        username = "",
        description = "",
      } = {
        avatar_url: "https://dummyimage.com/400x400/000/fff&text=not+image",
        display_name: "User",
        username: "theuser",
        description: "Not description D:",
      },
    },
  } = await res.json();
  const gifData = {
    avatar_url,
    profile_url,
    website_url,
    url,
    display_name,
    username,
    description,
    title,
  };
  return gifData;
};
