import { useContext } from "react";
import { Link } from "react-router-dom";
import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
import { SearchContext } from "../context/SearchContext";

export const Home = () => {
  const { trendGifs } = useContext(SearchContext);
  return (
    <>
      {trendGifs.error ? (
        <Error />
      ) : trendGifs.loading ? (
        <Loader />
      ) : (
        <article className="home__content">
          <ul className="home__content-list">
            {trendGifs.gifs.map((el) => (
              <li key={el.id}>
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
        </article>
      )}
    </>
  );
};
