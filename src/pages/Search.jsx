import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { getSearchGifApi } from "../helpers/getGifsApi";
export const Search = () => {
  const { trendGifs, setTrendGifs } = useContext(SearchContext);
  const { image } = useParams();

  useEffect(() => {
    if (image) {
      const getSearch = async () => {
        const getSearchData = await getSearchGifApi(image);
        setTrendGifs({ ...trendGifs, gifsSearch: getSearchData });
      };

      getSearch();
    }
  }, [image]);

  return (
    <article className="home__content">
      {trendGifs.gifsSearch.length > 0 ? (
        <ul className="home__content-list">
          {trendGifs.gifsSearch.map((el) => (
            <li key={el.id}>
              {" "}
              <Link className="home__content-list-item" to={`/gif/${el.id}`}>
                <img
                  className="home__content-list-image"
                  src={el.urlGifImage}
                  alt={el.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            color: "gray",
            fontSize: "1.2rem",
            fontWeight: "normal",
            textAlign: "center",
          }}
        >
          Not search found!
        </p>
      )}
    </article>
  );
};
