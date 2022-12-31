import { createContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getGifsApi, getSearchGifApi } from "../helpers/getGifsApi";

const initialState = {
  gifs: [
    {
      id: "",
      title: "",
      urlGifImage: "",
    },
  ],
  gifsSearch: [],
  filterText: "",
  loading: false,
  error: false,
};

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [trendGifs, setTrendGifs] = useState(initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const filter = searchParams.get("filter") ?? "";

  useEffect(() => {
    try {
      setTrendGifs({ ...trendGifs, loading: true });
      const getTrendGifs = async () => {
        const trendsGifsData = await getGifsApi();
        setTrendGifs({ ...trendGifs, gifs: trendsGifsData, loading: false });
      };

      getTrendGifs();
    } catch (err) {
      setTrendGifs({ ...trendGifs, error: true, loading: false });
    }
  }, []);

  useEffect(() => {
    if (trendGifs.filterText) {
      const getSearchGifs = async () => {
        const gifsData = await getSearchGifApi(trendGifs.filterText);
        setTrendGifs({ ...trendGifs, gifsSearch: gifsData });
      };

      getSearchGifs();
    }
  }, [trendGifs.filterText]);

  const handleFilter = (e) => {
    const { value } = e.target;
    setSearchParams({ filter: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setTrendGifs({ ...trendGifs, filterText: filter });
    navigate(`/search/${filter}`);
  };

  const data = {
    trendGifs,
    handleFilter,
    handleSearchSubmit,
    setTrendGifs,
    filter,
  };

  return (
    <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
  );
};
