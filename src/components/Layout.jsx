import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import logo from "../assets/gifsearch-logo.svg";
import "../pages/Home.css";

export const Layout = () => {
  const { filter, handleFilter, handleSearchSubmit } =
    useContext(SearchContext);
  return (
    <>
      <section className="home">
        <header className="home__header">
          <form className="home__form" onSubmit={handleSearchSubmit}>
            <Link to="/" className="home__logo-link">
              <img className="home__logo" src={logo} alt="logo" />
            </Link>
            <input
              className="home__form-input"
              type="text"
              placeholder="Type here for search Gifs..."
              onChange={handleFilter}
              value={filter}
            />
          </form>
        </header>
        <Outlet />
      </section>
      <footer className="footer">
        <p className="footer__text">
	  Created by <strong>Abgmz</strong> =&gt;{" "}
          <a className="footer__link" href="https://www.github.com/abgmz">
            GitHub
          </a>
        </p>
      </footer>
    </>
  );
};
