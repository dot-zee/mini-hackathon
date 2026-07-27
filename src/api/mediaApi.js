import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY;

export async function fetchPhotos(query, page = 1, per_page = 10) {
  const res = await axios.get("https://api.unsplash.com/search/photos",{
      params: {query, page, per_page},
      headers:{Authorization:`Client-ID ${UNSPLASH_KEY}`}
  });

//   console.log(res);
return res.data;
  
}


export async function fetchVideos(query, page = 1, per_page = 15) {
  const res = await axios.get("https://api.pexels.com/videos/search", {
    params: {
      query,
      per_page,
      page,   // 👈 this must be here
    },
    headers: {
      Authorization: import.meta.env.VITE_PEXELS_KEY,
    },
  });

  return res.data;
}


export async function fetchGIF(query, limit = 16, page = 1) {
  const offset = (page - 1) * limit;

  const res = await axios.get(
    "https://api.giphy.com/v1/gifs/search",
    {
      params: {
        api_key: import.meta.env.VITE_GIPHY_KEY,
        q: query,
        limit,
        offset,
        rating: "g",
      },
    }
  );

  return res.data;
}